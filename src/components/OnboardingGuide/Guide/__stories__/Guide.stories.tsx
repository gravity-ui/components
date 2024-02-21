import React from 'react';

import {PencilToSquare} from '@gravity-ui/icons';
import {Button} from '@gravity-ui/uikit';
import {actions} from '@storybook/addon-actions';
import type {Meta, Story} from '@storybook/react';

import {GuideMenuItem} from '../../GuideMenuItem/GuideMenuItem';
import {addImage} from '../../GuideMenuItem/frequentFunctions/GuideMenuItemImage/GuideMenuItemImage';
import {addText} from '../../GuideMenuItem/frequentFunctions/GuideMenuItemText/GuideMenuItemText';
import type {GuideProps} from '../Guide';
import {Guide} from '../Guide';

export default {
    title: 'Components/Guide',
    component: Guide,
} as Meta;

const actionsButtonHandlers = () => actions('onClick').onClick('Click on the button');
const actionsButtonComplete = () => actions('onClick').onClick('Click on the end button');

const DefaultTemplate: Story<GuideProps> = (args) => {
    const actionsGuideHandlers = () => {
        actions('onHeaderClick').onHeaderClick('Click on the header');
    };

    return (
        <div style={{margin: '20px'}}>
            <Guide
                {...args}
                icon={PencilToSquare}
                onHeaderClick={actionsGuideHandlers}
                onCompleteClick={actionsButtonComplete}
            />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithItems = DefaultTemplate.bind({});
export const SomeIcons = DefaultTemplate.bind({});
export const LongHeader = DefaultTemplate.bind({});
export const WithLoader = DefaultTemplate.bind({});
export const CustomButtonText = DefaultTemplate.bind({});
export const Custom = DefaultTemplate.bind({});

Default.args = {
    title: 'Test header',
};

LongHeader.args = {
    title: 'Test loooooooooooooooooooong header text',
};

WithLoader.args = {
    isLoading: true,
    title: 'Test header',
    defaultExpand: true,
    children: [
        <GuideMenuItem
            key={'testItem'}
            title="Test element"
            isLoading
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_3'}>
                    Button 3
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_4'}>
                    Button 4
                </Button>,
            ]}
        >
            {[addText('Test text')]}
        </GuideMenuItem>,
        <GuideMenuItem
            key={'testItem'}
            title="The test element"
            showDivider={false}
            isLoading
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_5'}>
                    Button 5
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_6'}>
                    Button 6
                </Button>,
            ]}
        >
            {[addText('Test text')]}
        </GuideMenuItem>,
    ],
};

WithItems.args = {
    title: 'Test header header text',
    progressBarCurrentValue: 30,
    defaultExpand: true,
    children: [
        <GuideMenuItem
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
            {[addText('Test text')]}
        </GuideMenuItem>,
        <GuideMenuItem
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
                addImage(
                    'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png',
                    'new year 2019',
                ),
            ]}
        </GuideMenuItem>,
        <GuideMenuItem
            key={'testItem'}
            title="Image and text"
            showDivider={false}
            buttons={[
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_11'}>
                    Button 11
                </Button>,
                <Button view="normal" size="m" onClick={actionsButtonHandlers} key={'button_12'}>
                    Button 12
                </Button>,
            ]}
        >
            {[addText('Test text')]}
            {[
                addImage(
                    'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png',
                    '2019',
                ),
            ]}
        </GuideMenuItem>,
    ],
};

SomeIcons.args = {
    title: 'Different icons',
    progressBarCurrentValue: 30,
    defaultExpand: true,
    children: [
        <GuideMenuItem status="finished" key={'testItem'} title="finished">
            {[addText('Test text')]}
        </GuideMenuItem>,
        <GuideMenuItem status="inProgress" key={'testItem'} title="inProgress">
            {[addText('Test text')]}
        </GuideMenuItem>,
        <GuideMenuItem key={'testItem'} title="default" showDivider={false}>
            {[addText('Test text')]}
        </GuideMenuItem>,
    ],
};

CustomButtonText.args = {
    title: 'Custom button Text',
    defaultExpand: true,
    rollUpbuttonText: 'left button',
    completeButtontext: 'right button',
};

Custom.args = {
    title: 'Different icons',
    progressBarCurrentValue: 30,
    defaultExpand: true,
    children: [
        'Custom reaction node',
        <Button key={'customButton'}>Custom reaction node (button)</Button>,
    ],
};
