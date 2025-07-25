import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, Link, Modal, Text, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {ConsentType} from '../../ConsentManager';
import type {Consents} from '../../ConsentManager';
import {i18n} from '../../i18n';
import {FoldableList} from '../FoldableList/FoldableList';
import {FoldableListItem} from '../FoldableList/types';

import {
    ConsentPopupCookieListItem,
    ConsentPopupProps,
    ConsentPopupStep,
    FooterProps,
    HeaderProps,
} from './types';

import './ConsentPopup.scss';

const b = block('consent-popup');

const Header = ({
    currentStep,
    initialStep,
    onClose,
    isMobile,
    manageTitleText,
    mainTitleText,
}: HeaderProps) => {
    const renderTitle = () => {
        if (currentStep === ConsentPopupStep.Manage) {
            return manageTitleText || i18n('label_title_manage');
        }
        return mainTitleText || i18n('label_title_main');
    };

    return (
        <div className={b('header')}>
            <div>
                <Text
                    className={b('title')}
                    variant={
                        currentStep === ConsentPopupStep.Manage && !isMobile ? 'body-3' : 'header-1'
                    }
                >
                    {renderTitle()}
                </Text>
            </div>
            {initialStep === ConsentPopupStep.Main ? null : (
                <Button className={b('close-button')} view="flat" size="s" onClick={onClose}>
                    <Icon data={Xmark} size={16} />
                </Button>
            )}
        </div>
    );
};

const Footer = ({
    onAction,
    currentStep,
    currentConsents,
    buttonAcceptText = i18n('button_accept_all'),
    buttonNecessaryText = i18n('button_necessary'),
    buttonConfirmText = i18n('button_confirm'),
    onChangeStep,
    initialStep,
}: FooterProps) => {
    const isManageStep = currentStep === ConsentPopupStep.Manage;
    const onButtonClick = (onlyNecessary: boolean) => {
        return () => {
            onAction(onlyNecessary ? 'OnlyNecessary' : 'All');
        };
    };
    const confirmSelectedConsent = () => {
        onAction(currentConsents);
    };

    const buttons = {
        onlyNecessary: () => (
            <Button
                key="onlyNecessary"
                className={b('button')}
                onClick={onButtonClick(true)}
                size="l"
                view="flat-secondary"
            >
                {buttonNecessaryText}
            </Button>
        ),
        confirm: () => (
            <Button
                key="confirm"
                className={b('button')}
                onClick={confirmSelectedConsent}
                size="l"
                view="action"
            >
                {buttonConfirmText}
            </Button>
        ),
        allowAll: (view: 'action' | 'flat-secondary') => (
            <Button
                key="allowAll"
                className={b('button')}
                onClick={onButtonClick(false)}
                size="l"
                view={view}
            >
                {buttonAcceptText}
            </Button>
        ),
        manageCookies: () => (
            <Button
                key="manage"
                className={b('button')}
                onClick={() => onChangeStep(ConsentPopupStep.Manage)}
                size="l"
                view="flat-secondary"
            >
                {i18n('label_manage_cookie_link_text')}
            </Button>
        ),
        back: () => (
            <Button
                key="back"
                className={b('button')}
                onClick={() => onChangeStep(ConsentPopupStep.Main)}
                size="l"
                view="flat-secondary"
            >
                {i18n('button_back')}
            </Button>
        ),
    };

    if (isManageStep && initialStep === ConsentPopupStep.Manage) {
        return (
            <div className={b('buttons')}>
                <div> {buttons.allowAll('flat-secondary')}</div>

                <div className={b('action-buttons')}>
                    {buttons.onlyNecessary()}
                    {buttons.confirm()}
                </div>
            </div>
        );
    }

    return (
        <div className={b('buttons')}>
            <div>{isManageStep ? buttons.back() : buttons.manageCookies()}</div>

            <div className={b('action-buttons')}>
                {buttons.onlyNecessary()}
                {isManageStep ? buttons.confirm() : buttons.allowAll('action')}
            </div>
        </div>
    );
};

export const ConsentPopup = ({
    policyLink,
    onAction,
    className,
    modalClassName,
    policyLinkText = i18n('label_policy_extended'),
    text,
    manageLabelText = i18n('manage_label_text_extended'),
    manageTitleText,
    mainTitleText,
    noSubtitle,
    step = ConsentPopupStep.Main,
    cookieList,
    onClose,
    consentManager,
    disableHeightTransition,
    ...buttonsParams
}: ConsentPopupProps) => {
    const mobile = useMobile();
    const [currentConsents, setCurrentConsents] = React.useState<Consents>(
        consentManager.getConsents(),
    );
    const [currentStep, setCurrentStep] = React.useState<`${ConsentPopupStep}`>(step);
    const onChangeStep = (newStep: `${ConsentPopupStep}`) => {
        setCurrentStep(newStep);
    };
    const isManageStep = currentStep === ConsentPopupStep.Manage;
    const foldableListItems = React.useMemo(() => {
        return cookieList?.map((item): FoldableListItem => {
            const isNecessaryItem = item.type === ConsentType.Necessary;

            return {
                checked: Boolean(currentConsents[item.type]),
                defaultChecked: item.defaultChecked,
                disabled: isNecessaryItem,
                defaultExpand: isNecessaryItem,
                title: item.title || i18n(`cookie_${item.type}_title`),
                text: item.text || i18n(`cookie_${item.type}_text`),
                link: item.link
                    ? {
                          href: item.link?.href,
                          title: item.link?.title || i18n(`cookie_link_text`),
                      }
                    : undefined,
                titleLabel: item.titleLabel,
            };
        });
    }, [cookieList, currentConsents]);

    const onChoose = (checkedItems: number[]) => {
        if (!cookieList) return;

        setCurrentConsents(
            cookieList.reduce((acc: Consents, item: ConsentPopupCookieListItem, index: number) => {
                acc[item.type] = checkedItems.includes(index);

                return acc;
            }, {}),
        );
    };

    return (
        <Modal
            open
            disableOutsideClick
            disableEscapeKeyDown
            className={modalClassName}
            contentClassName={b('modal-content', {step: currentStep, mobile})}
            onClose={onClose}
            disableHeightTransition={disableHeightTransition}
        >
            <div className={b(null, className)}>
                <Header
                    currentStep={currentStep}
                    initialStep={step}
                    onClose={onClose}
                    isMobile={mobile}
                    manageTitleText={manageTitleText}
                    mainTitleText={mainTitleText}
                />
                <div className={b('body', {step})}>
                    {isManageStep ? (
                        <React.Fragment>
                            {noSubtitle ? null : (
                                <Text
                                    className={b('text')}
                                    variant={mobile ? 'header-1' : 'subheader-2'}
                                >
                                    {i18n('manage_subtitle_extended')}
                                </Text>
                            )}
                            <div className={b('text')}>
                                {manageLabelText}
                                {policyLink && policyLinkText && (
                                    <React.Fragment>
                                        {' '}
                                        <Link href={policyLink} target="_blank">
                                            {policyLinkText}
                                        </Link>
                                    </React.Fragment>
                                )}
                                .
                            </div>
                            {foldableListItems ? (
                                <FoldableList
                                    isMobile={mobile}
                                    className={b('cookie-list')}
                                    items={foldableListItems}
                                    onChooseItem={onChoose}
                                />
                            ) : null}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className={b('text')}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: text ? text : i18n('label_text_extended'),
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <Footer
                    currentStep={currentStep}
                    onAction={onAction}
                    currentConsents={currentConsents}
                    onChangeStep={onChangeStep}
                    initialStep={step}
                    {...buttonsParams}
                />
            </div>
        </Modal>
    );
};
