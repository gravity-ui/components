import React from 'react';

import {Icon, useTheme} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n/index';

import './Notifications.scss';

const b = block('notifications');

const nothingFoundSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#E3EBF2" fill-opacity=".9" d="M34.4 46.365c0-8.26 6.697-14.956 14.957-14.956h58.33c8.261 0 14.957 6.696 14.957 14.956v58.331c0 8.26-6.696 14.956-14.957 14.956h-58.33c-8.26 0-14.957-6.696-14.957-14.956v-58.33Z"/><path stroke="#262626" stroke-linejoin="bevel" stroke-width="1.496" d="M105.323 59.991c-13.377 5.885-26.954 2.761-33.69-2.408 14.613 47.822 6.297 71.213-6.237 72.455-19.19 1.902-25.334-40.183-14.268-44.09 11.066-3.908 20.42 34.102-4.389 69.024a94.306 94.306 0 0 1-3.861 5.063"/><g filter="url(#a)"><path fill="#5282FF" fill-opacity=".9" d="M88.992 50.104a8.974 8.974 0 0 1 8.974-8.974h26.922a8.974 8.974 0 0 1 8.974 8.974v26.922A8.974 8.974 0 0 1 124.888 86H97.966a8.974 8.974 0 0 1-8.974-8.974V50.104Z"/></g><g filter="url(#b)"><path fill="#fff" fill-opacity=".8" fill-rule="evenodd" d="M99.91 58.081a2.742 2.742 0 1 0 0-5.484 2.742 2.742 0 0 0 0 5.484Zm6.889-4.25a1.508 1.508 0 1 0 0 3.016h17.481a1.508 1.508 0 1 0 0-3.016h-17.481Zm0 16.452a1.508 1.508 0 1 0 0 3.016h17.481a1.508 1.508 0 1 0 0-3.016h-17.481Zm-1.508-6.718c0-.833.675-1.508 1.508-1.508h17.481a1.508 1.508 0 1 1 0 3.016h-17.481a1.508 1.508 0 0 1-1.508-1.508Zm-2.639 0a2.742 2.742 0 1 1-5.484 0 2.742 2.742 0 0 1 5.484 0ZM99.91 74.533a2.742 2.742 0 1 0 0-5.484 2.742 2.742 0 0 0 0 5.484Z" clip-rule="evenodd"/></g><path fill="#262626" d="m125.404 109.343 7.31-1.755a1.496 1.496 0 0 0 1.147-1.454v-.062c0-.606-.367-1.153-.928-1.383L113.9 96.871a1.588 1.588 0 0 0-2.072 2.073l7.817 19.033c.23.561.777.927 1.383.927h.062c.692 0 1.293-.474 1.454-1.146l1.755-7.31a1.494 1.494 0 0 1 1.105-1.105Z"/><defs><filter id="a" width="50.852" height="50.852" x="86.001" y="38.139" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="1.496"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3666_191029"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_3666_191029" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1.122"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect2_innerShadow_3666_191029"/></filter><filter id="b" width="28.62" height="21.936" x="97.168" y="52.597" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation=".748"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect1_innerShadow_3666_191029"/></filter></defs></svg>`;

const nothingFoundDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="172" height="172" fill="none"><path fill="#E3EBF2" fill-opacity=".9" d="M34.4 46.365c0-8.26 6.697-14.956 14.957-14.956h58.33c8.261 0 14.957 6.696 14.957 14.956v58.331c0 8.26-6.696 14.956-14.957 14.956h-58.33c-8.26 0-14.957-6.696-14.957-14.956v-58.33Z"/><path stroke="#fff" stroke-linejoin="bevel" stroke-width="1.496" d="M105.324 59.991c-13.377 5.885-26.954 2.761-33.69-2.408 14.613 47.822 6.297 71.213-6.237 72.455-19.19 1.902-25.334-40.183-14.268-44.09 11.066-3.908 20.42 34.102-4.389 69.024a94.306 94.306 0 0 1-3.861 5.063"/><g filter="url(#a)"><path fill="#5282FF" fill-opacity=".9" d="M88.992 50.104a8.974 8.974 0 0 1 8.974-8.974h26.922a8.974 8.974 0 0 1 8.974 8.974v26.922A8.974 8.974 0 0 1 124.888 86H97.966a8.974 8.974 0 0 1-8.974-8.974V50.104Z"/></g><g filter="url(#b)"><path fill="#fff" fill-opacity=".8" fill-rule="evenodd" d="M99.91 58.081a2.742 2.742 0 1 0 0-5.484 2.742 2.742 0 0 0 0 5.484Zm6.889-4.25a1.508 1.508 0 1 0 0 3.016h17.481a1.508 1.508 0 1 0 0-3.016h-17.481Zm0 16.452a1.508 1.508 0 1 0 0 3.016h17.481a1.508 1.508 0 1 0 0-3.016h-17.481Zm-1.508-6.718c0-.833.675-1.508 1.508-1.508h17.481a1.508 1.508 0 1 1 0 3.016h-17.481a1.508 1.508 0 0 1-1.508-1.508Zm-2.639 0a2.742 2.742 0 1 1-5.484 0 2.742 2.742 0 0 1 5.484 0ZM99.91 74.533a2.742 2.742 0 1 0 0-5.484 2.742 2.742 0 0 0 0 5.484Z" clip-rule="evenodd"/></g><path fill="#fff" d="m125.404 109.343 7.31-1.755a1.496 1.496 0 0 0 1.147-1.454v-.062c0-.606-.367-1.153-.928-1.383L113.9 96.871a1.588 1.588 0 0 0-2.072 2.073l7.817 19.033c.23.561.777.927 1.383.927h.062c.692 0 1.293-.474 1.454-1.146l1.755-7.31a1.494 1.494 0 0 1 1.105-1.105Z"/><defs><filter id="a" width="50.852" height="50.852" x="86.001" y="38.139" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="1.496"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_157_23037"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_157_23037" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1.122"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect2_innerShadow_157_23037"/></filter><filter id="b" width="28.619" height="21.936" x="97.168" y="52.597" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation=".748"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect1_innerShadow_157_23037"/></filter></defs></svg>`;

type Props = {image?: React.ReactNode; content: React.ReactNode};

export const NotificationsEmptyState = React.memo(function NotificationsEmptyState(props: Props) {
    const theme = useTheme();

    return (
        <div className={b('empty')}>
            {props.image ? (
                props.image
            ) : (
                <Icon data={theme === 'light' ? nothingFoundSvg : nothingFoundDarkSvg} size={172} />
            )}
            <div className={b('empty-message')}>
                <div className={b('empty-title')}>{i18n('no-notifications')}</div>
                {props.content ? (
                    <div className={b('empty-message-content')}>{props.content}</div>
                ) : null}
            </div>
        </div>
    );
});
