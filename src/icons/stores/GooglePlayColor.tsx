import * as React from 'react';

import {a11yHiddenSvgProps} from '../utils';

export const GooglePlayColor = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        height="40"
        width="40"
        fill="none"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <rect height="40" width="40" fill="#262626" rx="10" />
        <path
            d="M11.4275 9.35533C11.1638 9.63147 11.0092 10.0591 11.0092 10.6025V30.307C11.0092 30.8593 11.1638 31.2869 11.4275 31.5542L11.4912 31.6165L22.7597 20.5884V20.4547V20.3211L11.4912 9.29297L11.4275 9.35533Z"
            fill="url(#paint0_linear_105_5493)"
        />
        <path
            d="M26.5159 24.2679L22.7598 20.5888V20.4552V20.3216L26.5159 16.6426L26.5978 16.6871L31.0452 19.1636C32.3184 19.8673 32.3184 21.0253 31.0452 21.738L26.5978 24.2144L26.5159 24.2679Z"
            fill="url(#paint1_linear_105_5493)"
        />
        <path
            d="M26.5973 24.2232L22.7593 20.4551L11.4271 31.5545C11.8455 31.991 12.5367 32.0444 13.3189 31.6079L26.5973 24.2232Z"
            fill="url(#paint2_linear_105_5493)"
        />
        <path
            d="M26.5973 16.6955L13.3097 9.30187C12.5275 8.86538 11.8363 8.91882 11.418 9.35532L22.7592 20.4547L26.5973 16.6955Z"
            fill="url(#paint3_linear_105_5493)"
        />
        <path
            d="M26.5155 24.1331L13.3098 31.4822C12.5731 31.892 11.9092 31.8652 11.4908 31.4911L11.4271 31.5535L11.4908 31.6158C11.9182 31.9899 12.5731 32.0167 13.3098 31.6069L26.5973 24.2132L26.5155 24.1331Z"
            fill="black"
            opacity="0.2"
        />
        <path
            d="M11.4275 31.43C11.1638 31.1538 11.0092 30.7263 11.0092 30.1829V30.3165C11.0092 30.8688 11.1638 31.2964 11.4275 31.5636L11.4912 31.5013L11.4275 31.43Z"
            fill="black"
            opacity="0.12"
        />
        <path
            d="M31.0458 21.6131L26.5074 24.1341L26.5893 24.2143L31.0367 21.7378C31.6733 21.3815 31.9916 20.9183 31.9916 20.4551C31.9462 20.8738 31.6278 21.2924 31.0458 21.6131Z"
            fill="black"
            opacity="0.12"
        />
        <path
            d="M13.3101 9.42658L31.045 19.2967C31.618 19.6174 31.9454 20.0272 32 20.4547C32 19.9915 31.6817 19.5194 31.045 19.172L13.3101 9.30187C12.0368 8.59814 11 9.18607 11 10.6114V10.745C11 9.31078 12.0459 8.72285 13.3101 9.42658Z"
            fill="white"
            opacity="0.25"
        />
        <defs>
            <linearGradient
                id="paint0_linear_105_5493"
                gradientUnits="userSpaceOnUse"
                x1="21.7589"
                x2="6.8123"
                y1="10.3974"
                y2="25.6574"
            >
                <stop stopColor="#00A0FF" />
                <stop offset="0.00657445" stopColor="#00A1FF" />
                <stop offset="0.2601" stopColor="#00BEFF" />
                <stop offset="0.5122" stopColor="#00D2FF" />
                <stop offset="0.7604" stopColor="#00DFFF" />
                <stop offset="1" stopColor="#00E3FF" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_105_5493"
                gradientUnits="userSpaceOnUse"
                x1="32.7043"
                x2="10.6976"
                y1="20.4566"
                y2="20.4566"
            >
                <stop stopColor="#FFE000" />
                <stop offset="0.4087" stopColor="#FFBD00" />
                <stop offset="0.7754" stopColor="#FFA500" />
                <stop offset="1" stopColor="#FF9C00" />
            </linearGradient>
            <linearGradient
                id="paint2_linear_105_5493"
                gradientUnits="userSpaceOnUse"
                x1="24.5118"
                x2="4.24297"
                y1="22.5005"
                y2="43.1944"
            >
                <stop stopColor="#FF3A44" />
                <stop offset="1" stopColor="#C31162" />
            </linearGradient>
            <linearGradient
                id="paint3_linear_105_5493"
                gradientUnits="userSpaceOnUse"
                x1="8.56873"
                x2="17.6197"
                y1="2.79571"
                y2="12.0364"
            >
                <stop stopColor="#32A071" />
                <stop offset="0.0685" stopColor="#2DA771" />
                <stop offset="0.4762" stopColor="#15CF74" />
                <stop offset="0.8009" stopColor="#06E775" />
                <stop offset="1" stopColor="#00F076" />
            </linearGradient>
        </defs>
    </svg>
);
