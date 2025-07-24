import * as React from 'react';

import {useDirection} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import './NavigationButton.scss';

const cnNavigationButton = block('gallery-navigation-button');

export type NavigationButtonProps = {
    position: 'start' | 'end';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const NavigationButton = ({position, onClick}: NavigationButtonProps) => {
    const direction = useDirection();

    const invertedPosition = position === 'start' ? 'end' : 'start';

    return (
        <button onClick={onClick} type="button" className={cnNavigationButton({position})}>
            <svg
                className={cnNavigationButton('icon', {
                    position: direction === 'rtl' ? invertedPosition : position,
                })}
                width="34"
                height="31"
                viewBox="0 0 34 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_67706_1812)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.125 12C27.125 11.3787 26.6213 10.875 26 10.875L10.716 10.875L14.7955 6.7955C15.2348 6.35616 15.2348 5.64385 14.7955 5.20451C14.3562 4.76517 13.6438 4.76517 13.2045 5.20451L7.20451 11.2045C6.76517 11.6438 6.76517 12.3562 7.20451 12.7955L13.2045 18.7955C13.6438 19.2348 14.3562 19.2348 14.7955 18.7955C15.2348 18.3562 15.2348 17.6438 14.7955 17.2045L10.716 13.125L26 13.125C26.6213 13.125 27.125 12.6213 27.125 12Z"
                        fill="white"
                        stroke="black"
                        strokeOpacity="0.3"
                        strokeWidth="0.611111"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_67706_1812"
                        x="-1"
                        y="-1"
                        width="36"
                        height="36"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="5" />
                        <feGaussianBlur stdDeviation="3" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_67706_1812"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_67706_1812"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        </button>
    );
};
