import {type SearchValue, fuzzySearch} from './utils';

const itemsMapper = (items: string[]): SearchValue[] => {
    return items.map((search) => ({search}));
};

const itemsSortReversedMapper = (items: SearchValue[]): SearchValue[] => {
    return items.map(({search}, i) => ({search, sort: items.length - i}));
};

describe('fuzzySearch', () => {
    it('should return all items if search is empty', () => {
        const items = itemsMapper(['apple', 'banana', 'grape']);
        const search = '';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(items);
    });

    it('should return items that include the search string regardless of case', () => {
        const items = itemsMapper(['Apple', 'Banana', 'Grape', 'Pineapple']);
        const search = 'aPpLe';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['Apple', 'Pineapple']));
    });

    it('should return an empty array if no items match the search', () => {
        const items = itemsMapper(['apple', 'banana', 'grape']);
        const search = 'orange';
        const result = fuzzySearch(items, search);
        expect(result).toEqual([]);
    });

    it('should return the subset of items that match the search', () => {
        const items = itemsMapper(['apple', 'banana', 'grape', 'pineapple']);
        const search = 'ap';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['apple', 'grape', 'pineapple']));
    });

    it('should handle search with skipped letters', () => {
        const items = itemsMapper(['apple', 'application', 'apparatus']);
        const search = 'apl';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['apple', 'application']));
    });

    it('should handle short search (1 character), sorted by start character', () => {
        const items = itemsMapper(['apple', 'banana', 'grape', 'apricot']);
        const search = 'a';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['apple', 'apricot', 'banana', 'grape']));
    });

    it('should handle search with spaces', () => {
        const items = itemsMapper(['apple pie', 'banana bread', 'grape juice']);
        const search = 'pie';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['apple pie', 'grape juice']));
    });

    it('should handle search with mixed case', () => {
        const items = itemsMapper(['app', 'Apple', 'Banana', 'Grape', 'Apricot']);
        const search = 'aPp';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(itemsMapper(['app', 'Apple']));
    });

    it('should handle search with mixed case, with sort reversed', () => {
        const items = itemsSortReversedMapper(
            itemsMapper(['app', 'Apple', 'Banana', 'Grape', 'Apricot']),
        );
        const search = 'aP';
        const result = fuzzySearch(items, search);
        expect(result).toEqual(items.filter((i) => i.search !== 'Banana').reverse());
    });
});
