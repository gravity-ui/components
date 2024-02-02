import {configure} from '@testing-library/dom';

configure({testIdAttribute: 'data-qa'});

global.ResizeObserver = class implements ResizeObserver {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_callback: ResizeObserverCallback) {}
    disconnect() {}
    observe(_target: Element, _options?: ResizeObserverOptions) {}
    unobserve(_target: Element) {}
};
