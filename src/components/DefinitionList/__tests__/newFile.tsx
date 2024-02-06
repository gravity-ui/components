import {screen} from '@testing-library/react';

import {b} from '../DefinitionList';

import {getComponent} from './DefinitionList.test';

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
        const copyButton = screen.getByRole('button');
        expect(copyButton).not.toBeVisible();
    });
    it('should render clipboard button', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
        getComponent({items});
        const component = screen.getByText('value1');
        const copyButton = screen.getByRole('button');

        expect(component).toHaveClass(b('copy-container'));
        expect(copyButton).toHaveClass(b('copy-button'));
    });

    // it('should render in responsive mode', () => {
    //     const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
    //     expect(getComponent({items, responsive: true})).toMatchSnapshot();
    // });
});
