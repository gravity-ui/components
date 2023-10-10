import React from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {cn} from '../../utils/cn';
import {PasswordInput} from '../PasswordInput';

import './PasswordInputStories.scss';

const b = cn('password-input-stories');

export default {
    title: 'Components/PasswordInput',
    component: PasswordInput,
} as Meta;

const DefaultTemplate: StoryFn<React.ComponentProps<typeof PasswordInput>> = () => {
    const [value, setValue] = React.useState('');

    return (
        <PasswordInput
            showCopyButton={true}
            showVisibilityButton={true}
            onUpdate={setValue}
            value={value}
        />
    );
};

export const Default = DefaultTemplate.bind({});

const WithGenerateRandomValueTemplate: StoryFn<React.ComponentProps<typeof PasswordInput>> = (
    props: React.ComponentProps<typeof PasswordInput>,
) => {
    const [value, setValue] = React.useState('');

    const generateRandomValue = React.useCallback(() => {
        let randomValue = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;

        while (counter < charactersLength) {
            randomValue += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        setValue(randomValue);
    }, []);

    return (
        <div className={b()}>
            <PasswordInput {...props} onUpdate={setValue} value={value} />
            <Button onClick={generateRandomValue} className={b('button-generate-random-value')}>
                Generate random value
            </Button>
        </div>
    );
};

export const WithGenerateRandomValue = WithGenerateRandomValueTemplate.bind({});
