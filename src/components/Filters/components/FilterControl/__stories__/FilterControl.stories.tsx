import React, {useState} from 'react';

import {Checkbox} from '@gravity-ui/uikit';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {FilterControl} from '../FilterControl';

export default {
    title: 'Components/FilterControl(unstable)',
    component: FilterControl,
} as ComponentMeta<typeof FilterControl>;

function FilterControlContent(props: {
    onClose: VoidFunction;
    onChange: VoidFunction;
    displayName: string;
    value: boolean;
}) {
    return (
        <React.Fragment>
            {props.displayName}: <Checkbox checked={props.value} onChange={props.onChange} />
        </React.Fragment>
    );
}

export const Default: ComponentStory<typeof FilterControl> = () => {
    const [value, setValue] = useState(false);

    return (
        <FilterControl
            sheetId="included"
            fieldName="Included"
            fieldValue={value ? 'Yes' : 'No'}
            onClear={() => setValue(false)}
        >
            {({onClose}) => (
                <FilterControlContent
                    displayName="Included"
                    value={value}
                    onClose={onClose}
                    onChange={() => setValue((v) => !v)}
                />
            )}
        </FilterControl>
    );
};
