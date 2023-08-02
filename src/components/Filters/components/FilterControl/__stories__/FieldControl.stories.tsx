import React, {useState} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FilterControl} from '../FilterControl';
import {Checkbox} from '@gravity-ui/uikit';

export default {
    title: 'Components/FieldControl(unstable)',
    component: FilterControl,
} as ComponentMeta<typeof FilterControl>;

function FieldControlContent(props: {
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
                <FieldControlContent
                    displayName="Included"
                    value={value}
                    onClose={onClose}
                    onChange={() => setValue((v) => !v)}
                />
            )}
        </FilterControl>
    );
};
