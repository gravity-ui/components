import React from 'react';

import {GraduationCap} from '@gravity-ui/icons';
import {Button} from '@gravity-ui/uikit';
import {actions} from '@storybook/addon-actions';
import type {Meta, StoryFn} from '@storybook/react';

import type {OnboardingMenuProps} from '../OnboardingMenu';
import {OnboardingMenu} from '../OnboardingMenu';

export default {
    title: 'Components/OnboardingMenu',
    component: OnboardingMenu,
} as Meta;

const actionsButtonHandlers = () => actions('onClick').onClick('Click on the button');
const actionsButtonComplete = () => actions('onClick').onClick('Click on the end button');

const DefaultTemplate: StoryFn<OnboardingMenuProps> = (args) => {
    const [expanded, setExpanded] = React.useState(false);

    const actionsOnboardingMenuHandlers = (expanded: boolean) => {
        actions('onHeaderClick').onHeaderClick('Click on the header');
        setExpanded(expanded);
    };

    return (
        <div style={{margin: '20px'}}>
            <OnboardingMenu
                {...args}
                expanded={expanded}
                icon={GraduationCap}
                onExpand={actionsOnboardingMenuHandlers}
                onCompleteClick={actionsButtonComplete}
            />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithItems = DefaultTemplate.bind({});
export const WithManyItems = DefaultTemplate.bind({});
export const SomeIcons = DefaultTemplate.bind({});
export const LongHeader = DefaultTemplate.bind({});
export const WithLoader = DefaultTemplate.bind({});
export const WithoutArrow = DefaultTemplate.bind({});
export const CustomButtonText = DefaultTemplate.bind({});
export const Custom = DefaultTemplate.bind({});

Default.args = {
    title: 'Header text',
    progress: 30,
};

LongHeader.args = {
    title: 'Test loooooooooooooooooooong header text',
    progress: 30,
};

WithLoader.args = {
    title: 'Header text',
    progress: 30,
    children: [
        <OnboardingMenu.Item
            key={'testItem'}
            title="Test element"
            loading
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_3'}>
                    Button 3
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_4'}>
                    Button 4
                </Button>,
            ]}
        >
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="The test element"
            hasDivider={false}
            loading
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_5'}>
                    Button 5
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_6'}>
                    Button 6
                </Button>,
            ]}
        >
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
    ],
};

WithItems.args = {
    title: 'Header text',
    progress: 30,
    children: [
        <OnboardingMenu.Item
            key={'testItem'}
            title="Text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_7'}>
                    Button 7
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_8'}>
                    Button 8
                </Button>,
            ]}
        >
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_9'}>
                    Button 9
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_10'}>
                    Button 10
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            hasDivider={false}
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
                <OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />,
            ]}
        </OnboardingMenu.Item>,
    ],
};

WithManyItems.args = {
    title: 'Header text',
    progress: 30,
    children: [
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
                <OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />,
            ]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item
            key={'testItem'}
            title="Image and text"
            hasDivider={false}
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[
                <OnboardingMenu.ItemImage
                    src="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png"
                    alt="2019"
                    key={'testItem'}
                />,
            ]}
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
    ],
};

SomeIcons.args = {
    title: 'Header text',
    progress: 30,
    children: [
        <OnboardingMenu.Item status="completed" key={'testItem'} title="finished">
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item status="pending" key={'testItem'} title="pending">
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
        <OnboardingMenu.Item key={'testItem'} title="default" hasDivider={false}>
            {[<OnboardingMenu.ItemText text={'Test text'} key={'testItem'} />]}
        </OnboardingMenu.Item>,
    ],
};

WithoutArrow.args = {
    title: 'Header text',
    progress: 30,
    children: [<OnboardingMenu.Item status="completed" key={'testItem'} title="finished" />],
};

CustomButtonText.args = {
    title: 'Header text',
    progress: 30,
    collapseButtonText: 'left button',
    completeButtonText: 'right button',
};

Custom.args = {
    title: 'Different icons',
    progress: 30,
    className: 'testName',
    children: [
        'Custom reaction node',
        <Button key={'customButton'}>Custom reaction node (button)</Button>,
    ],
};
