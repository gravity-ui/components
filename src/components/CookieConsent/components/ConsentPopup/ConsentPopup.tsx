import React from 'react';

import {ArrowLeft, Xmark} from '@gravity-ui/icons';
import {Button, Icon, Link, Modal, Text, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {ConsentType} from '../../ConsentManager';
import type {Consents} from '../../ConsentManager';
import i18n from '../../i18n';
import {FoldableList} from '../FoldableList/FoldableList';

import {
    ConsentPopupCookieListItem,
    ConsentPopupProps,
    ConsentPopupStep,
    FooterProps,
    HeaderProps,
} from './types';

import './ConsentPopup.scss';

const b = block('consent-popup');

const Header = ({currentStep, initialStep, onClose, onChangeStep, isMobile}: HeaderProps) => {
    const buttonsEnabled = currentStep === ConsentPopupStep.Manage;
    const isBackButtonVisible = buttonsEnabled && initialStep === ConsentPopupStep.Main;

    return (
        <div className={b('header')}>
            <div>
                {isBackButtonVisible ? (
                    <Button
                        className={b('arrow-button')}
                        view="flat"
                        size="s"
                        onClick={onChangeStep(ConsentPopupStep.Main)}
                    >
                        <Icon data={ArrowLeft} size={16} />
                    </Button>
                ) : null}
                <Text
                    className={b('title')}
                    variant={buttonsEnabled && !isMobile ? 'body-3' : 'header-1'}
                >
                    {i18n(buttonsEnabled ? 'label_title_manage' : 'label_title_main')}
                </Text>
            </div>
            {buttonsEnabled && !isBackButtonVisible ? (
                <Button className={b('close-button')} view="flat" size="s" onClick={onClose}>
                    <Icon data={Xmark} size={16} />
                </Button>
            ) : null}
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
}: FooterProps) => {
    const isManageStep = currentStep === ConsentPopupStep.Manage;
    const onButtonClick = (onlyNecessary?: boolean) => {
        return () => {
            onAction(onlyNecessary ? 'OnlyNecessary' : 'All');
        };
    };
    const confirmSelectedConsent = () => {
        onAction(currentConsents);
    };

    return (
        <div className={b('buttons')}>
            <Button
                key="reject"
                className={b('button')}
                onClick={onButtonClick(true)}
                size="l"
                view="normal"
            >
                {buttonNecessaryText}
            </Button>
            <Button
                key="confirm"
                className={b('button')}
                onClick={isManageStep ? confirmSelectedConsent : onButtonClick()}
                size="l"
                view="action"
            >
                {isManageStep ? buttonConfirmText : buttonAcceptText}
            </Button>
        </div>
    );
};

export const ConsentPopup = ({
    policyLink,
    onAction,
    className,
    policyLinkText = i18n('label_policy_extended'),
    text,
    manageLabelText = i18n('manage_label_text_extended'),
    step = ConsentPopupStep.Main,
    cookieList,
    onClose,
    consentManager,
    ...buttonsParams
}: ConsentPopupProps) => {
    const mobile = useMobile();
    const [currentConsents, setCurrentConsents] = React.useState<Consents>(
        consentManager.getConsents(),
    );
    const [currentStep, setCurrentStep] = React.useState<`${ConsentPopupStep}`>(step);
    const onChangeStep = (newStep: `${ConsentPopupStep}`) => {
        return () => setCurrentStep(newStep);
    };
    const isManageStep = currentStep === ConsentPopupStep.Manage;
    const preparedCookieList = React.useMemo(() => {
        return cookieList?.map((item) => {
            const isNecessaryItem = item.type === ConsentType.Necessary;

            return {
                checked: Boolean(currentConsents[item.type]),
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
            contentClassName={b('modal-content', {step: currentStep, mobile})}
            onClose={onClose}
        >
            <div className={b(null, className)}>
                <Header
                    currentStep={currentStep}
                    initialStep={step}
                    onClose={onClose}
                    onChangeStep={onChangeStep}
                    isMobile={mobile}
                />
                <div className={b('body', {step})}>
                    {isManageStep ? (
                        <React.Fragment>
                            <Text
                                className={b('text')}
                                variant={mobile ? 'header-1' : 'subheader-2'}
                            >
                                {i18n('manage_subtitle_extended')}
                            </Text>
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
                            {preparedCookieList ? (
                                <FoldableList
                                    isMobile={mobile}
                                    className={b('cookie-list')}
                                    items={preparedCookieList}
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
                            <div className={b('text')}>
                                <Button
                                    onClick={onChangeStep(ConsentPopupStep.Manage)}
                                    view="outlined-action"
                                >
                                    {i18n('label_manage_cookie_link_text')}
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <Footer
                    currentStep={currentStep}
                    onAction={onAction}
                    currentConsents={currentConsents}
                    {...buttonsParams}
                />
            </div>
        </Modal>
    );
};
