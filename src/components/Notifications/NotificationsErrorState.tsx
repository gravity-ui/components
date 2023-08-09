import React from 'react';

import {Icon, useTheme} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n/index';

import './Notifications.scss';

const b = block('notifications');

const errorSvg = `<svg width="172" height="172" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M75.705 34.774c1.716-6.402 8.296-10.2 14.697-8.486l49.052 13.144c6.402 1.715 10.201 8.295 8.486 14.697l-.176.655c-1.715 6.402-8.295 10.2-14.697 8.485l.034.01c6.383 1.71 10.171 8.27 8.46 14.654-1.71 6.383-8.271 10.17-14.654 8.46l-.033-.009c6.401 1.716 10.2 8.296 8.485 14.697l-.176.655c-1.715 6.402-8.295 10.201-14.697 8.486L71.434 97.078c-6.401-1.715-10.2-8.295-8.485-14.697l.175-.655c1.716-6.401 8.296-10.2 14.697-8.485l-.033-.01c-6.383-1.71-10.171-8.27-8.461-14.653 1.71-6.384 8.271-10.172 14.654-8.461l.034.009c-6.402-1.715-10.2-8.295-8.485-14.697l.175-.655Z" fill="#FF5958" fill-opacity=".9"/></g><g filter="url(#b)"><path fill-rule="evenodd" clip-rule="evenodd" d="M96.098 56.554a2.243 2.243 0 1 1 3.886-2.243l6.281 10.88 10.88-6.282a2.244 2.244 0 0 1 2.243 3.886l-10.879 6.281 6.281 10.88a2.243 2.243 0 1 1-3.886 2.243l-6.281-10.88-10.88 6.282a2.244 2.244 0 0 1-2.243-3.886l10.879-6.281-6.28-10.88Z" fill="#fff" fill-opacity=".72"/></g><path fill-rule="evenodd" clip-rule="evenodd" d="M80.64 88.483a8.226 8.226 0 0 0-3.832-4.995l-22.87-13.204a8.226 8.226 0 0 0-6.243-.822l-22.414 6.006a8.226 8.226 0 0 0-5.816 10.075l14.71 54.898a8.226 8.226 0 0 0 10.074 5.817l40.452-10.839a8.226 8.226 0 0 0 5.816-10.075l-9.877-36.86Zm-3.085-6.29a9.722 9.722 0 0 1 4.53 5.903l9.877 36.861c1.39 5.186-1.688 10.517-6.874 11.907l-40.452 10.839c-5.186 1.389-10.517-1.689-11.906-6.875L18.02 85.93c-1.39-5.186 1.688-10.517 6.874-11.907l22.414-6.005a9.722 9.722 0 0 1 7.377.97l22.87 13.205Z" fill="#262626"/><path fill-rule="evenodd" clip-rule="evenodd" d="m97.639 131.898 2.084-5.557 2.122-5.661h-10.89a2.1 2.1 0 0 0-1.95 1.321l-6.515 16.286a.59.59 0 0 0 .548.809H96.827l-2.007 5.518-3.034 8.343a1.165 1.165 0 0 0 1.943 1.196l19.507-20.727a.907.907 0 0 0-.66-1.528H97.639Zm7.477-8.226.695-1.853c.953-2.541-.925-5.252-3.639-5.252H90.954a6.213 6.213 0 0 0-5.768 3.906l-6.515 16.286a4.704 4.704 0 0 0 4.367 6.45h7.916l-1.495 4.113-1.538 4.229c-1.252 3.442 1.297 7.082 4.96 7.082a5.277 5.277 0 0 0 3.843-1.661l19.507-20.727a5.02 5.02 0 0 0-3.655-8.46H103.574l1.542-4.113Z" fill="#A6BCD2" fill-opacity=".9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M82.367 33.526c2.398-.335 4.348.319 5.739 2.074 1.113 1.406 1.34 3.175.768 5.224-.578 2.066-1.96 4.36-3.976 6.666-4.028 4.608-10.435 9.096-17.321 11.733-3.938 1.509-7.986 2.395-11.81 2.378.226-.486.455-.969.69-1.447 4.883-10 11.458-18.069 17.548-22.634 3.05-2.287 5.924-3.654 8.362-3.994ZM54.15 61.538c.312-.688.633-1.368.961-2.04C60.076 49.333 66.79 41.06 73.108 36.323c3.154-2.364 6.265-3.89 9.052-4.278 2.827-.395 5.342.385 7.118 2.627 1.486 1.876 1.7 4.177 1.036 6.554-.66 2.36-2.192 4.848-4.29 7.248-4.2 4.806-10.817 9.429-17.912 12.146-4.261 1.632-8.746 2.595-13.014 2.466-8.63 19.688-10.294 45.576 9.605 66.784l-1.09 1.024C43.34 109.288 44.918 82.97 53.512 62.985c-2.26-.22-4.441-.77-6.475-1.716-6.345-2.954-11.034-9.655-12.286-21.566l1.487-.156c1.218 11.58 5.714 17.705 11.43 20.366 2.009.935 4.195 1.455 6.483 1.625Z" fill="#262626"/><defs><filter id="a" x="54.537" y="17.877" width="101.814" height="100.757" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7270_551996"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_7270_551996" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect2_innerShadow_7270_551996"/></filter><filter id="b" x="90.377" y="53.189" width="30.133" height="30.133" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect1_innerShadow_7270_551996"/></filter></defs></svg>`;

const errorDarkSvg = `<svg width="172" height="172" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M75.705 34.774c1.716-6.402 8.296-10.2 14.697-8.486l49.052 13.144c6.402 1.715 10.201 8.295 8.486 14.697l-.176.655c-1.715 6.402-8.295 10.2-14.697 8.485l.034.01c6.383 1.71 10.171 8.27 8.46 14.654-1.71 6.383-8.271 10.17-14.654 8.46l-.033-.009c6.401 1.716 10.2 8.296 8.485 14.697l-.176.655c-1.715 6.402-8.295 10.201-14.697 8.486L71.434 97.078c-6.401-1.715-10.2-8.295-8.485-14.697l.175-.655c1.716-6.401 8.296-10.2 14.697-8.485l-.033-.01c-6.383-1.71-10.171-8.27-8.461-14.653 1.71-6.384 8.271-10.172 14.654-8.461l.034.009c-6.402-1.715-10.2-8.295-8.485-14.697l.175-.655Z" fill="#FF5958" fill-opacity=".9"/></g><g filter="url(#b)"><path fill-rule="evenodd" clip-rule="evenodd" d="M96.098 56.554a2.243 2.243 0 1 1 3.886-2.243l6.281 10.88 10.88-6.282a2.244 2.244 0 0 1 2.243 3.886l-10.879 6.281 6.281 10.88a2.243 2.243 0 1 1-3.886 2.243l-6.281-10.88-10.88 6.282a2.244 2.244 0 0 1-2.243-3.886l10.879-6.281-6.28-10.88Z" fill="#fff" fill-opacity=".72"/></g><path fill-rule="evenodd" clip-rule="evenodd" d="M80.64 88.483a8.226 8.226 0 0 0-3.832-4.995l-22.87-13.204a8.226 8.226 0 0 0-6.243-.822l-22.414 6.006a8.226 8.226 0 0 0-5.816 10.075l14.71 54.898a8.226 8.226 0 0 0 10.074 5.817l40.452-10.839a8.226 8.226 0 0 0 5.816-10.075l-9.877-36.86Zm-3.085-6.29a9.722 9.722 0 0 1 4.53 5.903l9.877 36.861c1.39 5.186-1.688 10.517-6.874 11.907l-40.452 10.839c-5.186 1.389-10.517-1.689-11.906-6.875L18.02 85.93c-1.39-5.186 1.688-10.517 6.874-11.907l22.414-6.005a9.722 9.722 0 0 1 7.377.97l22.87 13.205Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="m97.639 131.898 2.084-5.557 2.122-5.661h-10.89a2.1 2.1 0 0 0-1.95 1.321l-6.515 16.286a.59.59 0 0 0 .548.809H96.827l-2.007 5.518-3.034 8.343a1.165 1.165 0 0 0 1.943 1.196l19.507-20.727a.907.907 0 0 0-.66-1.528H97.639Zm7.477-8.226.695-1.853c.953-2.541-.925-5.252-3.639-5.252H90.954a6.213 6.213 0 0 0-5.768 3.906l-6.515 16.286a4.704 4.704 0 0 0 4.367 6.45h7.916l-1.495 4.113-1.538 4.229c-1.252 3.442 1.297 7.082 4.96 7.082a5.277 5.277 0 0 0 3.843-1.661l19.507-20.727a5.02 5.02 0 0 0-3.655-8.46H103.574l1.542-4.113Z" fill="#A6BCD2" fill-opacity=".9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M82.367 33.526c2.398-.335 4.348.319 5.739 2.074 1.113 1.406 1.34 3.175.768 5.224-.578 2.066-1.96 4.36-3.976 6.666-4.028 4.608-10.435 9.096-17.321 11.733-3.938 1.509-7.986 2.395-11.81 2.378.226-.486.455-.969.69-1.447 4.883-10 11.458-18.069 17.548-22.634 3.05-2.287 5.924-3.654 8.362-3.994ZM54.15 61.538c.312-.688.633-1.368.961-2.04C60.076 49.333 66.79 41.06 73.108 36.323c3.154-2.364 6.265-3.89 9.052-4.278 2.827-.395 5.342.385 7.118 2.627 1.486 1.876 1.7 4.177 1.036 6.554-.66 2.36-2.192 4.848-4.29 7.248-4.2 4.806-10.817 9.429-17.912 12.146-4.261 1.632-8.746 2.595-13.014 2.466-8.63 19.688-10.294 45.576 9.605 66.784l-1.09 1.024C43.34 109.288 44.918 82.97 53.512 62.985c-2.26-.22-4.441-.77-6.475-1.716-6.345-2.954-11.034-9.655-12.286-21.566l1.487-.156c1.218 11.58 5.714 17.705 11.43 20.366 2.009.935 4.195 1.455 6.483 1.625Z" fill="#fff"/><defs><filter id="a" x="54.537" y="17.877" width="101.814" height="100.757" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7270_552011"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_7270_552011" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect2_innerShadow_7270_552011"/></filter><filter id="b" x="90.377" y="53.189" width="30.133" height="30.133" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/><feBlend in2="shape" result="effect1_innerShadow_7270_552011"/></filter></defs></svg>`;

type Props = {image?: React.ReactNode; content: React.ReactNode};

export const NotificationsErrorState = React.memo(function NotificationsEmptyState(props: Props) {
    const theme = useTheme();

    return (
        <div className={b('empty')}>
            {props.image ? (
                props.image
            ) : (
                <Icon data={theme === 'light' ? errorSvg : errorDarkSvg} size={172} />
            )}
            <div className={b('empty-message')}>
                <div className={b('empty-title')}>{i18n('notifications-error')}</div>
                {props.content ? (
                    <div className={b('empty-message-content')}>{props.content}</div>
                ) : null}
            </div>
        </div>
    );
});
