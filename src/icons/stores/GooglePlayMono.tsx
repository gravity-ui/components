import * as React from 'react';

import {a11yHiddenSvgProps} from '../utils';

export const GooglePlayMono = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        height="40" 
        width="40" 
        fill="none" 
        viewBox="0 0 40 40" 
        xmlns="http://www.w3.org/2000/svg"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <rect height="40" width="40" fill="#262626" rx="10"/>
        <path d="M26.1416 24.4688L13.3105 31.6104C12.758 31.9172 12.2499 31.9786 11.8516 31.834L22.7559 21.1524L26.1416 24.4688ZM22.042 20.4532L11.1475 31.1241C11.0534 30.8953 11 30.6209 11 30.3038V10.6045C11 10.2874 11.0531 10.0124 11.1475 9.78325L22.042 20.4532ZM31.0469 19.169C32.3174 19.8762 32.3174 21.0331 31.0469 21.7413L27.0537 23.9629L23.4707 20.4532L27.0508 16.9454L31.0469 19.169ZM11.8516 9.07329C12.2498 8.92879 12.7583 8.99166 13.3105 9.29888L26.1396 16.4375L22.7559 19.753L11.8516 9.07329Z" fill="white"/>
    </svg>
);