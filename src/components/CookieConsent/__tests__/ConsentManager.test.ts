import {COOKIE_NAME, ConsentManager, ConsentMode} from '../ConsentManager';

afterEach(() => {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
});

test('Restores false consent values and ignores unrelated cookie fields', () => {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify({necessary: true, analytics: false, unknown: true}))}; path=/`;
    const manager = new ConsentManager(ConsentMode.Manage);
    expect(manager.getConsents()).toEqual({necessary: true, analytics: false});
});

test('Subscribers receive only changed consent fields, including false values', () => {
    const manager = new ConsentManager(ConsentMode.Manage, undefined, {path: '/'});
    manager.setConsents('All');
    const onChange = jest.fn();
    manager.subscribe(onChange);

    manager.setConsents({necessary: true, analytics: false});
    expect(onChange).toHaveBeenCalledWith(
        {analytics: false},
        expect.objectContaining({necessary: true, analytics: false}),
    );
});
