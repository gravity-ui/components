import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import {Icon, Select, SelectProps} from '@gravity-ui/uikit';
import difference from 'lodash/difference';
import throttle from 'lodash/throttle';

import {block} from '../utils/cn';

import {DEFAULT_BREAK_POINTS_CONFIG} from './constants';
import {i18n} from './i18n';

import './AdaptiveTabs.scss';

const SMALL_CONTAINER_WIDTH_NAME = 'small';
const LARGE_CONTAINER_WIDTH_NAME = 'large';
const READY_STATE_COMPLETE = 'complete';
const OUT_OF_SCREEN_POSITION = -99999;

const b = block('adaptive-tabs');
const TAB_CLASS_NAME = b('tab');
const getSortObjectKeysByValuesFunc =
    (objectToSort: Record<string, any>) => (a: string, b: string) => {
        if (objectToSort[a] > objectToSort[b]) {
            return 1;
        }
        if (objectToSort[a] < objectToSort[b]) {
            return -1;
        }
        return 0;
    };

// https://github.com/gravity-ui/uikit/issues/552
type RenderControlProps = Parameters<NonNullable<SelectProps['renderControl']>>[0];
type OpenChangeProps = Parameters<NonNullable<SelectProps['onOpenChange']>>[0];

/*
    THE GENERAL PRINCIPLES OF THE COMPONENT:
    - If all the tabs do not fit into the width of the container, the incomplete tabs will be hidden and a switcher will appear with the text
        "N more", where N - the number of tabs that don't fit, and when you click on it you will see a dropdown list where you can
        Select one of the tabs that didn't fit, and the selected tab will "stand" in place of the last visible one.
    - There are two closely related features:
        1 - configurable maximum width of the tab (tab text is hidden behind "..." if it does not fit -
            we will further call such tabs "overflowing")
        2 - use the whole width of the container - adjust the width of the overflowing tabs to fill the whole width
            of the container width (in practice this means that if you choose the widest of
            to fill the whole width of the container).
        Therefore, when calculating the layout, the following stages are logically separated: the preparation stage (hereinafter referred to as "measuring") - calculation
        tabs width taking into account the active breakpoint (maximum width at this breakpoint), calculation of the real
        tabs width (without the maximum width restriction), calculation of the switcher width, the tabs indentation value, and
        etc.) and two main phases:) 1) finding the index of the first tab that doesn't fit, and 2) adjusting the width
        2) adjusting the width of the overflowing tabs to the width of the container (hereinafter phases 1 and 2)
 */

export interface TabProps {
    id: string;
    title?: string | React.ReactNode;
    hint?: string | React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: (id: string, event: React.MouseEvent) => void;
}

// https://github.com/gravity-ui/components/issues/7
class Tab extends React.Component<TabProps> {
    render() {
        const {active, disabled, hint, title = this.props.id} = this.props;
        const stringTitle = hint ?? ((typeof title === 'string' && title) || '');
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className={b('tab', {active, disabled})}
                title={typeof stringTitle === 'string' ? stringTitle : undefined}
                onClick={disabled ? undefined : this.onClick}
            >
                {title}
            </div>
        );
    }

    onClick = (event: React.MouseEvent) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.id, event);
        }
    };
}

export type TabItem<T> = T & {
    id: string;
    title?: React.ReactNode;
    hint?: string;
    disabled?: boolean;
};

export type TabsSize = 'm' | 'l' | 'xl';

export interface AdaptiveTabsProps<T> {
    /** Array of tabs */
    items: TabItem<T>[];
    /** Active tab id */
    activeTab?: string;
    /** Breakpoints config which control the thersholds of tab size */
    breakpointsConfig: Record<string, number>;
    /** Select tab handler */
    onSelectTab: (tabId: string, event?: React.MouseEvent) => void;
    /** Allows to wrap TabItem into another component or render custom tab */
    // FIXME: https://github.com/gravity-ui/components/issues/26
    wrapTo?(
        item: TabItem<T> | undefined,
        node: React.ReactNode,
        index: number | undefined,
    ): React.ReactNode;
    /** Class name for the tabs container */
    className?: string;
    /** Tabs size */
    size?: TabsSize;
    /** Allows you not to specify activeTab */
    allowNotSelected?: boolean;
    /** Settings to control popup with hidden tabs list */
    moreControlProps?: Pick<SelectProps, 'virtualizationThreshold' | 'popupWidth'>;
}

interface AdaptiveTabsState {
    /* a flag indicating whether the "unmetered" stage has occurred */
    dimensionsWereCollected: boolean;
    /* index of the first hidden tab */
    firstHiddenTabIndex: number;
    /* in a certain case, there is a need to know the previous index value of the first hidden tab */
    firstHiddenTabIndexBeforeRecollection: number | null;
    /* because after one of the incomplete tabs has been selected by the switcher and the selected tab is "inserted"
    in place of the last visible tab, the list of visible (currently rendered tabs) will NOT be in
    consecutive order (for example, the 1st, 2nd and 5th (chosen by the switcher) tabs will be rendered,
    the 3rd and 4th are hidden), therefore we need to store the ID of switched on tab */
    tabChosenFromSelectId: string | null;
    /*
    the "name" of the current container width - to determine the active breakpoint, depends on the value in the
    "breakpointsConfig" property (for example, if breakpointsConfig={ '400': 33, '1200': 22 }, if the width of the container
    <= 400 currentContainerWidthName would be "small", at > 1200 it would be "large", and at container widths between 400 and
    1200 - "400-1200")
    */
    currentContainerWidthName: string | null | undefined;
    // flag for opened/closed status of select
    isSelectOpened: boolean;
}

export class AdaptiveTabs<T> extends React.Component<AdaptiveTabsProps<T>, AdaptiveTabsState> {
    static defaultProps = {
        /* default values of breakpoint configuration - object where the key is the width of the container element, the value is
         maximum width of tab as a percentage of the container width, (so, for default values, if the width of
         container width from 401px to 500px the maximum tab width will be 33%, from 501px to 700px 30%, etc.)
         the width of the container is the minimum of the values defined in the object keys (the default value is 400)
         instead of tabs, select is rendered occupying the entire width of the container. */
        breakpointsConfig: DEFAULT_BREAK_POINTS_CONFIG,
    };

    private readonly breakpoints: number[];
    private readonly tabMaxWidthInPercentsForScreenSize: Record<string, number>;
    private readonly throttledHandleResize: () => void;
    private resizeObserver?: ResizeObserver;
    private tabItemPaddingRight = 0;
    private switcherWidth = 0;

    /* for the convenience of calculations, you will need three objects, whose keys are tab indices and values are tab widths,
     the real width of tabs is considered separately (as if there were no max width limitations)
     and the current tabs width (taking into account max width constraints and width adjustment):
     - real width of the tabs, the values for all tabs will be written */
    private tabsRealWidth: Record<string, number> = {};

    /* - the same, but only values for overflowing tabs will be written (it is necessary to have such an object with the values of
     of the overflowed tabs is necessary for calculations of width adjustment of the overflowed tabs) */
    private overflownTabsRealWidth: Record<string, number> = {};

    /* - current width of tabs, again, only for crowded tabs */
    private overflownTabsCurrentWidth: Record<string, number> = {};

    /* in addition, the array will store the current width of all the tabs, the array is convenient for calculating
     the width of N visible tabs, for example, from the first to the fifth. */
    private tabsWidth: number[] = [];

    /* a flag indicating that the initial acquisition of the dimensions required for further calculations has already taken place */
    private dimensionsWereInitiallyCollected = true;

    private selectSwitcherNode = React.createRef<HTMLDivElement>();
    private tabsRootNode = React.createRef<HTMLDivElement>();
    private tabsListNode = React.createRef<HTMLDivElement>();

    get activeTab() {
        const {activeTab, items, allowNotSelected} = this.props;
        if (activeTab) {
            return activeTab;
        }

        if (allowNotSelected || items.length === 0) {
            return undefined;
        }

        const [firstTab] = items;
        return firstTab.id;
    }

    constructor(props: AdaptiveTabsProps<T>) {
        super(props);

        this.state = {
            dimensionsWereCollected: false,
            firstHiddenTabIndex: this.props.items.length,
            firstHiddenTabIndexBeforeRecollection: null,
            tabChosenFromSelectId: null,
            currentContainerWidthName: null,
            isSelectOpened: false,
        };

        this.breakpoints = Object.keys(props.breakpointsConfig)
            .map(Number)
            .sort((a, b) => a - b);

        /* save the object, where the keys are the "name" of the current container width, the values are the maximum width of the tab for
        the corresponding container width (in percent of the container width) */
        this.tabMaxWidthInPercentsForScreenSize = this.breakpoints.reduce(
            (accum: Record<string, number>, currentBreakpointWidth, index, breakpointsArray) => {
                const nextBreakpointWidth = breakpointsArray[index + 1];

                let breakpointName = `${currentBreakpointWidth}-${nextBreakpointWidth}`;

                if (!nextBreakpointWidth) {
                    breakpointName = LARGE_CONTAINER_WIDTH_NAME;
                }

                accum[breakpointName] = props.breakpointsConfig[currentBreakpointWidth] || 100;

                return accum;
            },
            {},
        );

        this.handleResize = this.handleResize.bind(this);
        this.throttledHandleResize = throttle(this.handleResize, 350);
    }

    componentDidMount() {
        if (!this.tabsRootNode.current) {
            return;
        }

        this.setState({currentContainerWidthName: this.getCurrentContainerWidthName()});

        if (this.tabsRootNode.current.clientWidth > this.breakpoints[0]) {
            if ((document as any).fonts) {
                (document as any).fonts.ready.then(this.initialCollectDimensions);
            } else if ((document as any).readyState === READY_STATE_COMPLETE) {
                setTimeout(this.initialCollectDimensions, 0);
            } else {
                window.addEventListener('load', this.initialCollectDimensions);
            }
        } else {
            this.subscribeForResize();
        }
    }

    subscribeForResize = () => {
        if (!this.tabsRootNode.current) {
            return;
        }

        this.resizeObserver = new ResizeObserver(this.throttledHandleResize);
        this.resizeObserver.observe(this.tabsRootNode.current);
    };

    componentDidUpdate(prevProps: AdaptiveTabsProps<T>) {
        if (!this.dimensionsWereInitiallyCollected) {
            return;
        }

        if (this.wasItemsListUpdated(this.props.items, prevProps.items)) {
            this.setState(
                {
                    dimensionsWereCollected: false,
                    firstHiddenTabIndex: this.props.items.length,
                    firstHiddenTabIndexBeforeRecollection: null,
                },
                () => {
                    if (this.state.currentContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
                        this.collectDimensions();
                    }
                },
            );
        }
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        window.removeEventListener('load', this.collectDimensions);
    }

    initialCollectDimensions = () => {
        /* Because we are expecting fonts to be loaded to measure tab sizes and subscribe to container resize, it is possible
       case that by the time the fonts are loaded the component is already unmounted, so it's necessary to check that the ref at the root
       node exists */
        if (this.tabsRootNode.current) {
            this.dimensionsWereInitiallyCollected = true;
            this.recollectDimensions();
            this.subscribeForResize();
        }
    };

    /*
       The "taking measurements" stage. Once the width of the tabs and some associated dimensions/indentation are calculated
     */
    collectDimensions = () => {
        if (!this.tabsRootNode.current || !this.tabsListNode.current) {
            return;
        }
        const tabsListNode = this.tabsListNode.current;
        const tabs = tabsListNode.children;

        this.tabsWidth = [];

        const tabElement = tabsListNode.firstElementChild;

        if (tabElement) {
            const paddingRightValue = window
                .getComputedStyle(tabElement)
                .getPropertyValue('padding-right');

            /* save the value of the right padding (the distance between tabs, which can be different depending on
            the value of css variable --gc-tabs-space-between) */
            this.tabItemPaddingRight = paddingRightValue ? parseInt(paddingRightValue, 10) : 0;
        }

        this.overflownTabsRealWidth = {};
        this.tabsRealWidth = {};

        /* bypass all the tabs in the loop and write the current width of each tab to the array this.tabsWidth
        "fill" the objects this.tabsRealWidth and this.overflownTabsRealWidth */
        for (let i = 0; i < tabs.length; i++) {
            const {width} = tabs[i].getBoundingClientRect();

            const tabTextNode = tabs[i].querySelector(`.${TAB_CLASS_NAME}`)!;

            if (tabTextNode.scrollWidth > tabTextNode.clientWidth) {
                // when overflow and "..." exists
                const widthCorrector = this.tabItemPaddingRight;
                this.overflownTabsRealWidth[i] = tabTextNode.scrollWidth + widthCorrector;
                this.tabsRealWidth[i] = this.overflownTabsRealWidth[i];
            } else {
                this.tabsRealWidth[i] = width;
            }

            this.tabsWidth[i] = width;
        }

        this.switcherWidth = this.selectSwitcherNode.current?.getBoundingClientRect().width || 0;

        this.setState({dimensionsWereCollected: true});

        this.recalculateTabs();
    };

    getCurrentContainerWidthName = () => {
        for (let index = 0; index < this.breakpoints.length; index++) {
            const breakpointWidth = this.breakpoints[index];
            const prevBreakpointWidth = this.breakpoints[index - 1];
            const nextBreakpointWidth = this.breakpoints[index + 1];

            const containerWidth = this.tabsRootNode.current?.clientWidth || 0;
            const containerWidthLowerOrEqualThanBreakpointWidth = containerWidth <= breakpointWidth;
            const containerWidthBiggerThanBreakpointWidth = containerWidth > breakpointWidth;
            const containerWidthBiggerThanPrevBreakpointWidth = containerWidth < breakpointWidth;

            if (containerWidthLowerOrEqualThanBreakpointWidth && !prevBreakpointWidth) {
                return SMALL_CONTAINER_WIDTH_NAME;
            } else if (containerWidthBiggerThanBreakpointWidth && !nextBreakpointWidth) {
                return LARGE_CONTAINER_WIDTH_NAME;
            } else if (
                containerWidthBiggerThanPrevBreakpointWidth &&
                containerWidthLowerOrEqualThanBreakpointWidth
            ) {
                return `${prevBreakpointWidth}-${breakpointWidth}`;
            }
        }

        return;
    };

    /*
        Recalculating the Layout - Phases 1 and 2
     */
    // eslint-disable-next-line complexity
    recalculateTabs = () => {
        if (!this.tabsRootNode.current) {
            return;
        }
        // Phases 1 - calculating index of first hidden tab
        const activeTabId = this.activeTab;
        const {
            tabChosenFromSelectId,
            firstHiddenTabIndexBeforeRecollection: prevFirstHiddenTabIndex,
        } = this.state;
        /* activeTabId is ID of the active tab, tabChosenFromSelectId is ID of the tab selected via the switch,
         the tab selected via the switcher becomes active immediately after selection (in this case, these values coincide)
         but if after the user switches (clicks) to the neighboring tab, they will be different again */

        const {items} = this.props;
        const {width: tabsRootNodeWidth} = this.tabsRootNode.current.getBoundingClientRect();

        const activeTabIndex = items.findIndex((item) => item.id === activeTabId);
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );

        let renderedTabsSumWidth = 0;

        /* firstHiddenTabIndexForSequentialCase - index of the first hidden tab for the case when the tabs are located in
         serial sequence and without taking into account the maximal width of the hidden tab (it is necessary only for
         intermediate calculations)
         firstHiddenTabIndex - index of the first hidden tab in a particular situation (taking into account the width of the tab selected
         through the switch
         by the switcher and the maximum width of the missing tabs (to be stored in the stack)
         firstHiddenTabIndexForSequentialCase and the maximal
         width among the hidden tabs, then in the reverse loop, starting from the tab with the index
         firstHiddenTabIndexForSequentialCase - 1, it is determined how many tabs should be "moved" into
         incomplete, so that even if a tab with the maximum width is chosen by the switcher, its width + width of the visible
         tabs would not exceed the width of the container */
        let firstHiddenTabIndexForSequentialCase = null;
        let firstHiddenTabIndex = items.length;
        /* if we have bypassed all the widths of the tabs without exceeding the container width, the firstHiddenTabIndex
         value equal to the number of tabs will be written, in this way all the tabs will be rendered */

        let maxHiddenTabWidth = 0;
        let emptySpace = 0;

        /* all tab width values will be bypassed in the loop and summed up until the sum + value of
         of the switcher width will not exceed the width of the container */
        for (let i = 0; i < this.tabsWidth.length; i++) {
            renderedTabsSumWidth = renderedTabsSumWidth + this.tabsWidth[i];
            const switcherWidthCorrection = i === items.length - 1 ? 0 : this.switcherWidth;
            const isOverflown = renderedTabsSumWidth + switcherWidthCorrection > tabsRootNodeWidth;

            if (firstHiddenTabIndexForSequentialCase === null && isOverflown) {
                firstHiddenTabIndexForSequentialCase = i;
                /* emptySpace - "empty" space in pixels - the difference between the width of the container and the width
                 of the rendered tabs and the switcher */
                emptySpace =
                    tabsRootNodeWidth -
                    (renderedTabsSumWidth - this.tabsWidth[i] + this.switcherWidth);
            }

            if (firstHiddenTabIndexForSequentialCase !== null) {
                const currentTabWidth =
                    this.tabsWidth[i] + (i === items.length - 1 ? this.tabItemPaddingRight : 0);

                maxHiddenTabWidth = Math.max(maxHiddenTabWidth, currentTabWidth);
            }
        }

        if (tabChosenFromSelectIndex > -1) {
            maxHiddenTabWidth = this.tabsWidth[tabChosenFromSelectIndex];
        }

        if (maxHiddenTabWidth && typeof firstHiddenTabIndexForSequentialCase === 'number') {
            let rightSpace = maxHiddenTabWidth - emptySpace;

            // If firstHiddenTabIndexForSequentialCase exists, then we should
            // start firstHiddenTabIndex from firstHiddenTabIndexForSequentialCase,
            // reducing it until everything is correct
            firstHiddenTabIndex = firstHiddenTabIndexForSequentialCase;

            for (let j = firstHiddenTabIndexForSequentialCase - 1; j >= 0; j--) {
                rightSpace = rightSpace - this.tabsWidth[j];

                if (rightSpace < 0) {
                    firstHiddenTabIndex = j + (tabChosenFromSelectIndex > j ? 0 : 1);

                    break;
                }
            }
        }

        const activeTabWasNotChosenBySelect =
            tabChosenFromSelectId && tabChosenFromSelectId !== activeTabId;
        const newFirstHiddenTabIndexLowerThanPrevious =
            firstHiddenTabIndex < prevFirstHiddenTabIndex!;

        /* there are two narrow cases that arise during resizing that require changing the value of tabChosenFromSelectId and
         recalculate the layout:
         1) previously selecting one of the hidden tabs via the switcher, the user switched by click to another tab and reduced
         screen so that the tab chosen earlier by the switcher would no longer fit; in such a case, we reset
         tabChosenFromSelectId value and start recalculation */
        if (activeTabWasNotChosenBySelect && newFirstHiddenTabIndexLowerThanPrevious) {
            this.setState({tabChosenFromSelectId: null}, this.recalculateTabs);
            return false;
        }

        /* 2) the active tab is not selected via a switcher, the screen size is reduced so that the standard
         sequence, the active tab should not be rendered, but because it is active, it simply can't be
         hide it, so we write its ID into tabChosenFromSelectId and start recalculation */
        if (
            this.state.tabChosenFromSelectId !== activeTabId &&
            activeTabIndex >= firstHiddenTabIndex &&
            activeTabId !== undefined
        ) {
            this.setState({tabChosenFromSelectId: activeTabId}, this.recalculateTabs);
            return false;
        }

        this.setState({firstHiddenTabIndex});

        if (firstHiddenTabIndex > tabChosenFromSelectIndex) {
            this.setState({tabChosenFromSelectId: null});
        }

        /*phase 1 is complete, call the method of adjusting the width of the overflowing tabs to fill the entire width of the container*/
        this.setUpOverflownTabs(firstHiddenTabIndex, activeTabIndex, tabsRootNodeWidth);

        return;
    };

    setUpOverflownTabs(
        firstHiddenTabIndex: number,
        _activeTabIndex: number,
        tabsRootNodeWidth: number,
    ) {
        const {tabChosenFromSelectId} = this.state;
        const {items} = this.props;
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );
        const allTabsWillBeVisible = firstHiddenTabIndex === items.length;
        const withTabChosenFromSelect = tabChosenFromSelectIndex >= firstHiddenTabIndex;
        /* firstTabParticipatedInShiftingIndex - index of the first tab which participates in the change of the selected tab when
         it is the index of the first tab which participates in switching of the selected tab (in other words it can appear in the dropdown list at the current width of the container)
         it is either the last visible tab (if the selection is not made by the switcher yet) or the first of hidden tabs.
         (otherwise) */
        const firstTabParticipatedInShiftingIndex =
            firstHiddenTabIndex - (withTabChosenFromSelect ? 0 : 1);

        const alwaysVisibleTabsWidth = this.tabsWidth
            .slice(
                0,
                firstHiddenTabIndex - (allTabsWillBeVisible || withTabChosenFromSelect ? 0 : 1),
            )
            .reduce((sum, val) => sum + val, 0);

        /*index of the widest (real width) tab of those that participate in the change of the selected tab*/
        let widestTabParticipatedInShiftingIndex: number | null = null;
        let widestHiddenTabRealWidth = 0;

        for (let i = firstTabParticipatedInShiftingIndex; i < items.length; i++) {
            const currentHiddenTabWidth = this.tabsRealWidth[i];
            widestHiddenTabRealWidth = Math.max(currentHiddenTabWidth, widestHiddenTabRealWidth);

            if (widestHiddenTabRealWidth === currentHiddenTabWidth) {
                widestTabParticipatedInShiftingIndex = i;
            }
        }

        const switcherAndMaxHiddenTabWidth = allTabsWillBeVisible
            ? 0
            : this.tabsWidth[widestTabParticipatedInShiftingIndex!] + this.switcherWidth;

        const overflownTabsKeys = Object.keys(this.overflownTabsRealWidth);

        /* it is necessary to have a separate array of indexes of overflown tabs which at the moment
         visible (overflownAndVisibleTabsKeys) and separately an array of indexes of overflown tabs which are not currently
         visible (overflownAndHiddenTabsKeys) */
        const overflownAndVisibleTabsKeys = overflownTabsKeys.filter(
            (tabIndex) =>
                Number(tabIndex) < firstTabParticipatedInShiftingIndex ||
                Number(tabIndex) === widestTabParticipatedInShiftingIndex,
        );

        const isLastTabChosenFromSelectAndOverflown =
            tabChosenFromSelectIndex === items.length - 1 &&
            overflownAndVisibleTabsKeys.indexOf(String(tabChosenFromSelectIndex)) >= 0;

        /* the main idea of adjusting the width of overflowing tabs, to fill the entire width of the container - calculate,
         what "empty" space will be left if the user chose the tab with the maximum width through the switcher and
         divide this space among the overflowing tabs - i.e. increase their width to occupy the full width
         container */
        let emptySpace = tabsRootNodeWidth - alwaysVisibleTabsWidth - switcherAndMaxHiddenTabWidth;

        if (isLastTabChosenFromSelectAndOverflown) {
            emptySpace = emptySpace - this.tabItemPaddingRight;
        }

        const overflownAndHiddenTabsKeys = difference(
            overflownTabsKeys,
            overflownAndVisibleTabsKeys,
        );

        const overflownAndVisibleTabsIndexesSortedByWidth = overflownAndVisibleTabsKeys
            .sort(getSortObjectKeysByValuesFunc(this.overflownTabsRealWidth))
            .map(Number);

        /*additionPixelsToFitEmptySpace - the value of how many pixels will be added to the width of the crowded tabs */
        let additionPixelsToFitEmptySpace = emptySpace / overflownAndVisibleTabsKeys.length;
        let numberOfTabsToShareEmptySpace = overflownAndVisibleTabsKeys.length;

        this.overflownTabsCurrentWidth = {};

        overflownAndVisibleTabsIndexesSortedByWidth.forEach((overflownTabIndex) => {
            const realTabWidth = this.overflownTabsRealWidth[overflownTabIndex];
            const tabWidthWithAdditional =
                this.tabsWidth[overflownTabIndex] + additionPixelsToFitEmptySpace;

            if (realTabWidth < tabWidthWithAdditional) {
                /* It can happen that the value "current width of the overflowing tab + additionPixelsToFitEmptySpace"
                 is greater than the real width of the tab, in which case the current width becomes equal to the real width, and
                 it means that we haven't used all the pixels from the
                 overflowing tabs and then we pass those pixels (diff) for the remaining tabs, i.e. those whose width
                 have not been incremented by the current iteration (if there are any). */
                numberOfTabsToShareEmptySpace--;
                const diff = tabWidthWithAdditional - realTabWidth;
                additionPixelsToFitEmptySpace =
                    additionPixelsToFitEmptySpace + diff / numberOfTabsToShareEmptySpace;
                this.tabsWidth[overflownTabIndex] = realTabWidth;
            } else {
                this.tabsWidth[overflownTabIndex] = tabWidthWithAdditional;
            }

            this.overflownTabsCurrentWidth[overflownTabIndex] = this.tabsWidth[overflownTabIndex];
        });

        overflownAndHiddenTabsKeys.map(Number).forEach((overflownTabIndex) => {
            const realTabWidth = this.overflownTabsRealWidth[overflownTabIndex];
            const tabWidthWithAdditional =
                this.tabsWidth[overflownTabIndex] + additionPixelsToFitEmptySpace;

            if (realTabWidth < tabWidthWithAdditional) {
                this.tabsWidth[overflownTabIndex] = realTabWidth;
            } else {
                this.tabsWidth[overflownTabIndex] = tabWidthWithAdditional;
            }

            this.overflownTabsCurrentWidth[overflownTabIndex] = this.tabsWidth[overflownTabIndex];
        });
    }

    recollectDimensions = () => {
        this.setState(
            (state) => ({
                dimensionsWereCollected: false,
                firstHiddenTabIndex: this.props.items.length,
                firstHiddenTabIndexBeforeRecollection: state.firstHiddenTabIndex,
            }),
            this.collectDimensions,
        );
    };

    selectTab(tabId: string, event?: React.MouseEvent) {
        if (this.props.onSelectTab) {
            this.props.onSelectTab(tabId, event);
        }
    }

    /*
        A check which is called in the componentDidUpdate method and checks if the tabs "come" with new props have the same
        order and title as the previous ones. If this is not the case, the collectDimensions method will be called to
        memorize the new props and run the subsequent phases of recalculating the layout
     */
    wasItemsListUpdated = (currentItems: TabItem<unknown>[], prevItems: TabItem<unknown>[]) => {
        if (currentItems.length !== prevItems.length) {
            return true;
        }

        for (let i = 0; i < currentItems.length; i++) {
            const currentItem = currentItems[i];
            const prevItem = prevItems[i];
            const currentItemTitle = currentItem.title || currentItem.id;
            const prevItemTitle = prevItem.title || prevItem.id;

            if (currentItemTitle !== prevItemTitle) {
                return true;
            }
        }

        return false;
    };

    handleResize = () => {
        if (this.state.isSelectOpened) {
            this.setState({isSelectOpened: false});
        }

        const newContainerWidthName = this.getCurrentContainerWidthName();

        if (this.state.currentContainerWidthName !== newContainerWidthName) {
            this.setState({currentContainerWidthName: newContainerWidthName}, () => {
                if (newContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
                    this.recollectDimensions();
                }
            });
        } else if (newContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
            this.recollectDimensions();
        }
    };

    onChooseTabFromSelect = (tabChosenFromSelectIds: string[]) => {
        const tabChosenFromSelectId = tabChosenFromSelectIds[0];
        this.selectTab(tabChosenFromSelectId);

        this.setState({tabChosenFromSelectId});
        this.recollectDimensions();
    };

    onTabClick = (tabId: string, event?: React.MouseEvent<Element, MouseEvent>) => {
        if (tabId === this.activeTab) {
            return;
        }

        this.selectTab(tabId, event);
    };

    /*
        Calculates what value of the inline-start property should be set to the absolutely positioned switcher at
        the current set of rendered tabs
     */
    calcSelectSwitcherInlineStartPosition = () => {
        const {tabChosenFromSelectId, firstHiddenTabIndex} = this.state;
        const {items} = this.props;
        let tabChosenFromSelectIndex = null;

        if (tabChosenFromSelectId) {
            tabChosenFromSelectIndex = this.props.items.findIndex(
                (item) => item.id === tabChosenFromSelectId,
            );
        }

        let widthCorrection =
            tabChosenFromSelectId && tabChosenFromSelectIndex! > firstHiddenTabIndex
                ? this.tabsWidth[tabChosenFromSelectIndex!]
                : 0;

        /* if the last tab is selected, the right margin must be taken into account, because in the position where
           all tabs fit into the container width and there is no switcher, the right margin is not needed for the last tab.
           all tabs do not fit into the container width and there is a switcher to the right of this tab,
           then a margin is needed to prevent the switcher from being flattened */
        if (tabChosenFromSelectIndex === items.length - 1) {
            widthCorrection = widthCorrection + this.tabItemPaddingRight;
        }

        return this.tabsWidth && firstHiddenTabIndex < items.length
            ? this.tabsWidth
                  .slice(0, firstHiddenTabIndex)
                  .reduce((sum, val) => sum + val, widthCorrection)
            : OUT_OF_SCREEN_POSITION;
    };

    renderSwitcherForMoreSelect = (switcherProps: RenderControlProps) => {
        const {firstHiddenTabIndex, tabChosenFromSelectId} = this.state;
        const {items} = this.props;
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );
        const itemsNum =
            items.length -
            firstHiddenTabIndex -
            (tabChosenFromSelectIndex > firstHiddenTabIndex ? 1 : 0);
        const hint = i18n('label_more', {count: itemsNum});

        return this.renderSwitcher({...switcherProps, text: hint});
    };

    renderSwitcherForTabsAsSelect = (switcherProps: RenderControlProps) => {
        const {items} = this.props;
        const activeTab = items.find((item) => item.id === this.activeTab);
        const tab = activeTab ?? items[0];
        const hint = tab.hint ?? (tab.title || tab.id);

        return this.renderSwitcher({...switcherProps, text: hint, active: Boolean(activeTab)});
    };

    renderSwitcher = (
        switcherProps: RenderControlProps & {
            text: string | React.ReactNode;
            active?: boolean;
        },
    ) => {
        const {wrapTo} = this.props;
        const {active, ref, text, triggerProps} = switcherProps;

        const title = (
            <div className={b('switcher-tab-content')}>
                <span className={b('switcher-tab-text')}>{text}</span>
                <span className={b('switcher-tab-icon')}>
                    <Icon className={b('chevron-icon')} data={ChevronDown} />
                </span>
            </div>
        );

        const switcherTabProps = {title, hint: text, id: 'switcher-tab'};
        const tabItemNode = <Tab {...switcherTabProps} active={Boolean(active)} />;

        return (
            <div
                {...triggerProps}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                key="switcher"
                className={b('tab-container', {'switcher-tab': true})}
                ref={ref as React.LegacyRef<HTMLDivElement>} // https://github.com/gravity-ui/uikit/issues/552
            >
                {wrapTo ? wrapTo(undefined, tabItemNode, undefined) : tabItemNode}
            </div>
        );
    };

    renderTabs = () => {
        const {items} = this.props;
        const {firstHiddenTabIndex, tabChosenFromSelectId} = this.state;
        let tabChosenFromSelectIndex: number | null = null;

        if (tabChosenFromSelectId) {
            tabChosenFromSelectIndex = this.props.items.findIndex(
                (item) => item.id === tabChosenFromSelectId,
            );
        }

        const needToAddTabChosenFromSelect =
            tabChosenFromSelectId && tabChosenFromSelectIndex! > firstHiddenTabIndex;

        return items
            .slice(0, firstHiddenTabIndex)
            .concat(needToAddTabChosenFromSelect ? items[tabChosenFromSelectIndex!] : [])
            .map((item, index) =>
                this.renderTabItem(
                    item,
                    index < firstHiddenTabIndex ? index : tabChosenFromSelectIndex!,
                ),
            );
    };

    renderTabItem = (item: TabItem<T>, tabIndex: number) => {
        const {items, wrapTo} = this.props;
        const activeTabID = this.activeTab;
        const {dimensionsWereCollected, currentContainerWidthName} = this.state;

        const needSetMaxWidth =
            dimensionsWereCollected && tabIndex in this.overflownTabsCurrentWidth;
        const isLastTab = item.id === items[items.length - 1].id && tabIndex === items.length - 1;
        const noOverflow =
            needSetMaxWidth &&
            this.overflownTabsRealWidth[tabIndex] ===
                this.overflownTabsCurrentWidth[tabIndex] + this.tabItemPaddingRight;

        const maxWidth =
            dimensionsWereCollected && typeof this.overflownTabsCurrentWidth[tabIndex] === 'number'
                ? this.overflownTabsCurrentWidth[tabIndex] - this.tabItemPaddingRight
                : `${this.tabMaxWidthInPercentsForScreenSize[currentContainerWidthName!]}%`;

        const tabNode = <Tab {...item} active={item.id === activeTabID} />;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
                key={item.id}
                style={{maxWidth: items.length > 1 ? maxWidth : '100%'}}
                className={b('tab-container', {'last-tab': isLastTab, 'no-overflow': noOverflow})}
                onClick={(e) => {
                    if (!item.disabled) {
                        this.onTabClick(item.id, e);
                    }
                }}
            >
                {wrapTo ? wrapTo(item, tabNode, tabIndex) : tabNode}
            </div>
        );
    };

    renderSelect() {
        const activeTabID = this.activeTab;
        const {firstHiddenTabIndex, tabChosenFromSelectId, isSelectOpened} = this.state;
        const {items, moreControlProps} = this.props;

        const itemsForSelect = items
            .slice(firstHiddenTabIndex, items.length)
            .filter((item) => {
                return item.id !== activeTabID && item.id !== tabChosenFromSelectId;
            })
            .map((item) => ({
                value: item.id,
                content: item.title || item.id,
                key: item.id,
                disabled: item.disabled,
            }));

        return (
            <Select
                open={isSelectOpened}
                onUpdate={this.onChooseTabFromSelect}
                options={itemsForSelect}
                value={[]}
                filterable={false}
                renderControl={this.renderSwitcherForMoreSelect}
                onOpenChange={this.handleOpenSelectChange}
                {...moreControlProps}
            />
        );
    }

    handleTabsAsSelectUpdate = (ids: string[]) => {
        const tabId = ids[0];
        this.selectTab(tabId);
        this.setState({tabChosenFromSelectId: tabId});
    };

    handleOpenSelectChange = (isSelectOpened: OpenChangeProps) => {
        this.setState({isSelectOpened});
    };

    renderTabsAsSelect() {
        const activeTabID = this.activeTab;
        const {items} = this.props;

        const itemsForSelect = items.map((item) => ({
            value: item.id,
            content: item.title || item.id,
            key: item.id,
            disabled: item.disabled,
        }));

        return (
            <Select
                className={b('tabs-as-select-control')}
                onUpdate={this.handleTabsAsSelectUpdate}
                options={itemsForSelect}
                value={activeTabID === undefined ? [] : [activeTabID]}
                filterable={false}
                renderControl={this.renderSwitcherForTabsAsSelect}
                onOpenChange={this.handleOpenSelectChange}
            />
        );
    }

    render() {
        const {items, className, size = 'm'} = this.props;

        return (
            <div
                ref={this.tabsRootNode}
                className={b(
                    {
                        size: size,
                        visible: this.state.dimensionsWereCollected,
                    },
                    [className],
                )}
            >
                {(this.state.currentContainerWidthName === SMALL_CONTAINER_WIDTH_NAME ||
                    this.state.firstHiddenTabIndex === 0) &&
                items.length > 1 ? (
                    this.renderTabsAsSelect()
                ) : (
                    <React.Fragment>
                        <div ref={this.tabsListNode} className={b('tabs-list')}>
                            {this.renderTabs()}
                        </div>
                        <div
                            ref={this.selectSwitcherNode}
                            className={b('select-switcher')}
                            style={{insetInlineStart: this.calcSelectSwitcherInlineStartPosition()}}
                        >
                            {this.renderSelect()}
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}
