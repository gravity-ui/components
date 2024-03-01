import React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {DefinitionList, b} from '../DefinitionList';

const getComponent = (props = {}) =>
    render(
        <DefinitionList
            items={[
                {name: 'test1', content: 'value1'},
                {name: 'test2', content: 2},
                {name: 'test3', content: <div>node value</div>},
            ]}
            {...props}
        />,
    ).container;

describe('components: DefinitionList', () => {
    it('should render', () => {
        getComponent();
        const component = screen.getByRole('list');
        expect(component).toBeVisible();
    });
    it('should render passed className', () => {
        getComponent({className: 'testClassName'});
        const component = screen.getByRole('list');
        expect(component).toHaveClass('testClassName');
    });

    it('should render passed item title', () => {
        const items = [{name: 'test1', content: 'value1', title: 'title1'}];
        getComponent({items});
        const component = screen.getByText('value1');
        expect(component).toHaveAttribute('title', 'title1');
    });
    it('should not render clipboard button by default', () => {
        getComponent();
        const copyButton = screen.queryByRole('button');
        expect(copyButton).toBeNull();
    });
    it('should render clipboard button', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
        getComponent({items});

        const copyButton = screen.getByRole('button');

        expect(copyButton).toHaveClass(b('copy-button'));
    });
    it('should render in responsive mode', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
        getComponent({items, responsive: true});

        const component = screen.getByRole('list');
        expect(component).toHaveClass(b({responsive: true}));
    });
    it('should render with multiline term', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1', multilineName: true}];
        getComponent({items});

        const component = screen.getByRole('term');
        expect(component).toHaveClass(b('term-container', {multiline: true}));
    });
});
