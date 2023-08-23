import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import {Button, DropdownMenu, Icon} from '@gravity-ui/uikit';

import {cn} from '../../utils/cn';
import {Action} from '../PlaceholderContainerAction';
import {PlaceholderContainer, PlaceholderContainerProps} from '../index';

import './PlaceholderContainerShowcase.scss';

const b = cn('placeholder-container-showcase');

const ImageComponentTest = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="230" height="230" viewBox="0 0 230 230">
            <rect width="100%" height="100%" fill="#DDDDDD" />
            <path
                d="M53.79 122.64L59.54 122.64Q60.16 122.64 60.53 122.99Q60.89 123.34 60.89 123.91L60.89 123.91L60.89 126.21L45.51 126.21L45.51 124.94Q45.51 124.55 45.68 124.12Q45.84 123.70 46.20 123.35L46.20 123.35L53 116.53Q53.85 115.67 54.53 114.88Q55.20 114.09 55.65 113.31Q56.10 112.54 56.34 111.74Q56.58 110.94 56.58 110.06L56.58 110.06Q56.58 109.25 56.35 108.64Q56.12 108.03 55.69 107.61Q55.26 107.19 54.67 106.98Q54.07 106.77 53.33 106.77L53.33 106.77Q52.64 106.77 52.06 106.96Q51.48 107.16 51.03 107.51Q50.58 107.85 50.27 108.32Q49.96 108.78 49.81 109.34L49.81 109.34Q49.54 110.06 49.13 110.29Q48.71 110.52 47.92 110.40L47.92 110.40L45.90 110.04Q46.13 108.43 46.80 107.21Q47.47 105.99 48.47 105.18Q49.47 104.37 50.76 103.96Q52.05 103.55 53.54 103.55L53.54 103.55Q55.09 103.55 56.38 104.00Q57.67 104.46 58.58 105.30Q59.49 106.13 60.01 107.31Q60.52 108.49 60.52 109.93L60.52 109.93Q60.52 111.17 60.15 112.23Q59.79 113.28 59.18 114.24Q58.56 115.20 57.74 116.10Q56.92 117.00 56.02 117.93L56.02 117.93L50.97 123.09Q51.70 122.87 52.42 122.76Q53.14 122.64 53.79 122.64L53.79 122.64ZM66.00 110.40L63.99 110.04Q64.22 108.43 64.89 107.21Q65.56 105.99 66.55 105.18Q67.55 104.37 68.85 103.96Q70.14 103.55 71.63 103.55L71.63 103.55Q73.18 103.55 74.43 103.99Q75.68 104.43 76.56 105.21Q77.44 105.99 77.92 107.05Q78.39 108.10 78.39 109.33L78.39 109.33Q78.39 110.40 78.15 111.21Q77.91 112.02 77.46 112.63Q77.01 113.23 76.34 113.65Q75.68 114.07 74.84 114.35L74.84 114.35Q76.85 114.98 77.85 116.29Q78.84 117.59 78.84 119.56L78.84 119.56Q78.84 121.23 78.22 122.52Q77.60 123.80 76.54 124.68Q75.49 125.56 74.10 126.01Q72.72 126.45 71.17 126.45L71.17 126.45Q69.48 126.45 68.22 126.07Q66.97 125.68 66.04 124.92Q65.11 124.16 64.45 123.06Q63.80 121.96 63.34 120.52L63.34 120.52L65.03 119.82Q65.69 119.54 66.28 119.67Q66.86 119.81 67.12 120.30L67.12 120.30Q67.40 120.84 67.73 121.37Q68.07 121.90 68.53 122.31Q69.00 122.72 69.62 122.97Q70.25 123.23 71.12 123.23L71.12 123.23Q72.10 123.23 72.82 122.91Q73.55 122.59 74.04 122.08Q74.53 121.57 74.77 120.94Q75.01 120.32 75.01 119.68L75.01 119.68Q75.01 118.88 74.84 118.22Q74.67 117.56 74.13 117.09Q73.58 116.63 72.57 116.36Q71.55 116.10 69.85 116.10L69.85 116.10L69.85 113.37Q71.26 113.36 72.19 113.11Q73.12 112.86 73.67 112.42Q74.22 111.98 74.44 111.36Q74.65 110.74 74.65 109.99L74.65 109.99Q74.65 108.41 73.77 107.59Q72.89 106.77 71.41 106.77L71.41 106.77Q70.73 106.77 70.16 106.96Q69.58 107.16 69.13 107.51Q68.67 107.85 68.36 108.32Q68.05 108.78 67.90 109.34L67.90 109.34Q67.63 110.06 67.21 110.29Q66.78 110.52 66.00 110.40L66.00 110.40ZM97.50 115L97.50 115Q97.50 117.93 96.87 120.09Q96.25 122.25 95.14 123.66Q94.03 125.08 92.52 125.76Q91.01 126.45 89.25 126.45L89.25 126.45Q87.50 126.45 86.01 125.76Q84.51 125.08 83.41 123.66Q82.31 122.25 81.69 120.09Q81.07 117.93 81.07 115L81.07 115Q81.07 112.06 81.69 109.90Q82.31 107.75 83.41 106.34Q84.51 104.93 86.01 104.24Q87.50 103.55 89.25 103.55L89.25 103.55Q91.01 103.55 92.52 104.24Q94.03 104.93 95.14 106.34Q96.25 107.75 96.87 109.90Q97.50 112.06 97.50 115ZM93.55 115L93.55 115Q93.55 112.57 93.19 110.97Q92.84 109.37 92.24 108.43Q91.64 107.48 90.87 107.10Q90.09 106.72 89.25 106.72L89.25 106.72Q88.43 106.72 87.67 107.10Q86.90 107.48 86.31 108.43Q85.72 109.37 85.37 110.97Q85.02 112.57 85.02 115L85.02 115Q85.02 117.43 85.37 119.03Q85.72 120.63 86.31 121.57Q86.90 122.52 87.67 122.90Q88.43 123.28 89.25 123.28L89.25 123.28Q90.09 123.28 90.87 122.90Q91.64 122.52 92.24 121.57Q92.84 120.63 93.19 119.03Q93.55 117.43 93.55 115ZM122.11 121.08L120.08 123.08L114.83 117.82L109.53 123.11L107.50 121.11L112.80 115.79L107.75 110.74L109.76 108.72L114.81 113.78L119.84 108.75L121.88 110.77L116.84 115.81L122.11 121.08ZM140.78 122.64L146.53 122.64Q147.15 122.64 147.51 122.99Q147.88 123.34 147.88 123.91L147.88 123.91L147.88 126.21L132.50 126.21L132.50 124.94Q132.50 124.55 132.66 124.12Q132.83 123.70 133.18 123.35L133.18 123.35L139.99 116.53Q140.84 115.67 141.51 114.88Q142.19 114.09 142.64 113.31Q143.09 112.54 143.33 111.74Q143.57 110.94 143.57 110.06L143.57 110.06Q143.57 109.25 143.33 108.64Q143.10 108.03 142.68 107.61Q142.25 107.19 141.65 106.98Q141.06 106.77 140.31 106.77L140.31 106.77Q139.63 106.77 139.05 106.96Q138.47 107.16 138.02 107.51Q137.57 107.85 137.26 108.32Q136.95 108.78 136.79 109.34L136.79 109.34Q136.53 110.06 136.11 110.29Q135.69 110.52 134.90 110.40L134.90 110.40L132.89 110.04Q133.12 108.43 133.79 107.21Q134.45 105.99 135.45 105.18Q136.45 104.37 137.75 103.96Q139.04 103.55 140.53 103.55L140.53 103.55Q142.08 103.55 143.37 104.00Q144.65 104.46 145.57 105.30Q146.48 106.13 146.99 107.31Q147.50 108.49 147.50 109.93L147.50 109.93Q147.50 111.17 147.14 112.23Q146.78 113.28 146.16 114.24Q145.55 115.20 144.73 116.10Q143.91 117.00 143.01 117.93L143.01 117.93L137.96 123.09Q138.68 122.87 139.40 122.76Q140.13 122.64 140.78 122.64L140.78 122.64ZM152.99 110.40L150.98 110.04Q151.21 108.43 151.87 107.21Q152.54 105.99 153.54 105.18Q154.54 104.37 155.83 103.96Q157.13 103.55 158.62 103.55L158.62 103.55Q160.17 103.55 161.41 103.99Q162.66 104.43 163.55 105.21Q164.43 105.99 164.90 107.05Q165.38 108.10 165.38 109.33L165.38 109.33Q165.38 110.40 165.13 111.21Q164.89 112.02 164.44 112.63Q164.00 113.23 163.33 113.65Q162.66 114.07 161.83 114.35L161.83 114.35Q163.84 114.98 164.83 116.29Q165.82 117.59 165.82 119.56L165.82 119.56Q165.82 121.23 165.20 122.52Q164.58 123.80 163.53 124.68Q162.48 125.56 161.09 126.01Q159.70 126.45 158.15 126.45L158.15 126.45Q156.46 126.45 155.21 126.07Q153.95 125.68 153.02 124.92Q152.09 124.16 151.44 123.06Q150.79 121.96 150.32 120.52L150.32 120.52L152.01 119.82Q152.68 119.54 153.26 119.67Q153.84 119.81 154.11 120.30L154.11 120.30Q154.39 120.84 154.72 121.37Q155.05 121.90 155.52 122.31Q155.98 122.72 156.61 122.97Q157.24 123.23 158.11 123.23L158.11 123.23Q159.08 123.23 159.81 122.91Q160.54 122.59 161.03 122.08Q161.52 121.57 161.76 120.94Q162.00 120.32 162.00 119.68L162.00 119.68Q162.00 118.88 161.83 118.22Q161.66 117.56 161.11 117.09Q160.57 116.63 159.55 116.36Q158.54 116.10 156.83 116.10L156.83 116.10L156.83 113.37Q158.25 113.36 159.18 113.11Q160.11 112.86 160.66 112.42Q161.21 111.98 161.42 111.36Q161.64 110.74 161.64 109.99L161.64 109.99Q161.64 108.41 160.76 107.59Q159.87 106.77 158.40 106.77L158.40 106.77Q157.72 106.77 157.14 106.96Q156.57 107.16 156.11 107.51Q155.66 107.85 155.35 108.32Q155.04 108.78 154.88 109.34L154.88 109.34Q154.62 110.06 154.19 110.29Q153.77 110.52 152.99 110.40L152.99 110.40ZM184.49 115L184.49 115Q184.49 117.93 183.86 120.09Q183.23 122.25 182.12 123.66Q181.01 125.08 179.50 125.76Q177.99 126.45 176.24 126.45L176.24 126.45Q174.49 126.45 172.99 125.76Q171.50 125.08 170.40 123.66Q169.30 122.25 168.68 120.09Q168.06 117.93 168.06 115L168.06 115Q168.06 112.06 168.68 109.90Q169.30 107.75 170.40 106.34Q171.50 104.93 172.99 104.24Q174.49 103.55 176.24 103.55L176.24 103.55Q177.99 103.55 179.50 104.24Q181.01 104.93 182.12 106.34Q183.23 107.75 183.86 109.90Q184.49 112.06 184.49 115ZM180.53 115L180.53 115Q180.53 112.57 180.18 110.97Q179.82 109.37 179.22 108.43Q178.63 107.48 177.85 107.10Q177.08 106.72 176.24 106.72L176.24 106.72Q175.42 106.72 174.65 107.10Q173.88 107.48 173.30 108.43Q172.71 109.37 172.36 110.97Q172.01 112.57 172.01 115L172.01 115Q172.01 117.43 172.36 119.03Q172.71 120.63 173.30 121.57Q173.88 122.52 174.65 122.90Q175.42 123.28 176.24 123.28L176.24 123.28Q177.08 123.28 177.85 122.90Q178.63 122.52 179.22 121.57Q179.82 120.63 180.18 119.03Q180.53 117.43 180.53 115Z"
                fill="#999999"
            />
        </svg>
    );
};

const ContentComponentTest = () => {
    return (
        <div>
            <h3>There is any custom title here</h3>
            <p>
                You can add <strong>here</strong> any long text with custom content and use custom
                content size for displaying very long texts.
            </p>
        </div>
    );
};

const ActionComponentTest = () => {
    return (
        <div className={b('custom-action')}>
            <DropdownMenu
                defaultSwitcherProps={{view: 'flat-secondary'}}
                items={[
                    {text: 'text 1', action: () => {}},
                    {text: 'text 2', action: () => {}},
                ]}
                onSwitcherClick={(e) => e?.stopPropagation()}
                switcher={
                    <Button>
                        Text
                        <Icon data={ChevronDown} size={16} />
                    </Button>
                }
            />
        </div>
    );
};

const actionMainProps: Action = {
    text: 'Main button',
    view: 'normal',
    handler: () => alert('Click by main button'),
};

const actionAdditionalBtnProps: Action = {
    text: 'Additional button',
    view: 'flat-secondary',
    handler: () => alert('Click by additional button'),
};

const baseProps = {
    title: 'Container with one button & image component',
    image: <ImageComponentTest />,
    className: 'placeholder-container',
};

const placeholderContainerProps: PlaceholderContainerProps = {
    ...baseProps,
    action: {
        ...actionMainProps,
    },
    align: 'center',
};

const actionsProps = {
    action: [actionMainProps, actionAdditionalBtnProps],
};

const placeholderContainerCustomRenderedProps: PlaceholderContainerProps = {
    ...placeholderContainerProps,
    renderContent: () => <ContentComponentTest />,
};

const placeholderContainerCustomActionProps: PlaceholderContainerProps = {
    ...placeholderContainerProps,
    renderAction: () => <ActionComponentTest />,
};

const descriptionProps = {
    description:
        'Some long descriptionProps text that can contain of long long very long text etc. It can be repeated like this. Some long descriptionProps text that can contain of long long very long text etc.',
};

const imageProps = {
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2Y6U4iQRSF5/3fwAX3aGKMonHBHVFxxy3unmfpyalYpGlAZeJ4Sjw/btIWt6Tq+27dbvoPgMyBZBj8US/AAQtBwoXgEwK9BAuBHryFQA/bQqAHbCHQQ7UQ6EFaCPTwLAR6YBYCPSQLgR6MhSQAAwmEX51AL8FCoAdvIdDDthDoAVsI9FAtBHqQFgI9PAuBHpiFQA/JQqAHYyEJwEAC4Vcn0EuwEOjBWwj0sC0EesAWAj1UC4EepIVAD89CoAdmIdBDshDowVhIAjCQQPjVCfQSLAR68BYCPWwLgR6whUAP1UKgB2kh0MOzEOiB/SghNzc32fb2dnZ1ddX22evra3Z4eJhtbGxke3t72cPDQ1vO/f19Vq1WQ069Xg9z/sem7+7uwjovLi46rvP4+DisgWthbjHn8fExq9VqIefg4CB7fn5OT8jp6WlWKpWygYGBALy4genp6fBZDOY2Go1mDq9Lb/NjzMzMZE9PT18qg98zOjoa/v/m5mbLZwQ7Ozvbsobh4eGwt3zRxfkxpqamQjElI4QCBgcHmwssClleXg7ja2trAfDR0VHIn5iYCBXJGB8fz4aGhkJ1Moe5nLOysvJlMnjqCDiusyiEFc/xpaWlsIazs7OQPzIy0iyMWFjxZGxtbYW/FxYW0hDC9sQFcaGVSqVNyMvLS3NTvI7j5XI55J6cnITgdblcbpnHOZybnxeDc+bm5lraBdvI4uJix1bH1sMimJycbEIsChkbGws5PNFxbHV1NeTu7+8398pTlJ/HwuK8Tm1YckIIh2B2d3fbhFxeXoYxwsvPYX/mOKsyVma1Wm3J4RyO838UvzO2OMLhd1MGcwmw2zpZ8ax03suKQigsFlbxVHGcp5z7imvO5/BExeJKQkiMTkJi9XPR3TbKtsTrer3e00ajFPbwj2Tko5OQboVzfn4exufn50N+p8KJnYFF8auFAMjW19dDDtvNZ592frWQz7Ssbhude6dlMWKb4r0n377+RcivaVkf3dT5SMno9aZeK9wziveUXoV8dFPnU9WPuam/J+Szj728HurhsZd5bBX5MUrhd330g7KbkL547M0f2WJw0d1+GHKT3/3DsPLW64uxs7PTXz8MeeNjCynG7e1tUq9OGo1Gx3VeX1/336sTBywEfVgIPiHQS7AQ6MFbCPSwLQR6wBYCPVQLgR6khUAPz0KgB2Yh0EOyEOjBWEgCMJBA+NUJ9BIsBHrwFgI9bAuBHrCFQA/VQqAHaSHQw7MQ6IFZCPSQLAR6MBaSAAwkEH51Ar0EC4EevIVAD9tCoAdsIdBDtRDoQVoI9PAsBHpgFgI9JAuBHoyFJAADCYRfnUAvwUKgB28h0MO2EOgBWwj0UC0EepAWAj08C4EemIVAD+k7hfwFjRtJ9Zn/PDYAAAAASUVORK5CYII=',
    alt: 'image alt text',
};

export const PlaceholderContainerShowcase: React.FC = () => {
    return (
        <div className={b()}>
            <div className={b('placeholder-examples')}>
                <h2 className={b('title')}>PlaceholderContainer</h2>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Sizes:</h3>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="s"
                            title="Size s"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="s"
                            title="Size s"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="m"
                            title="Size m"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="m"
                            title="Size m"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="l"
                            title="Size l"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="l"
                            title="Size l"
                        />
                    </div>
                    <div className={b('examples-row')}>
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="row"
                            size="promo"
                            title="Size promo"
                        />
                        <PlaceholderContainer
                            {...placeholderContainerProps}
                            {...descriptionProps}
                            direction="column"
                            size="promo"
                            title="Size promo"
                        />
                    </div>
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>With buttons:</h3>
                    <PlaceholderContainer
                        className={b('single')}
                        {...placeholderContainerProps}
                        {...actionsProps}
                        direction="row"
                        size="s"
                        title="With buttons"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>With image props:</h3>
                    <PlaceholderContainer
                        className={b('single')}
                        {...placeholderContainerProps}
                        image={imageProps}
                        direction="row"
                        size="s"
                        title="With image props"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Custom content:</h3>
                    <PlaceholderContainer
                        {...placeholderContainerCustomRenderedProps}
                        direction="row"
                        size="s"
                        title="Size s"
                    />
                </div>
                <div className={b('section')}>
                    <h3 className={b('sub-title')}>Custom action:</h3>
                    <PlaceholderContainer
                        {...placeholderContainerCustomActionProps}
                        {...descriptionProps}
                        direction="row"
                        size="m"
                        title="Size m"
                    />
                </div>
            </div>
        </div>
    );
};
