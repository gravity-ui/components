import FuzzySearch from 'fuzzy-search';

const K_START = 8;

export type SearchValue = {
    search: string;
    sort?: number;
};

export const fuzzySearchScore = <T extends SearchValue>(item: T, search: string) => {
    let start = item.search.length;
    let maxSubstr = 1;

    for (let i = search.length; i > 0; i--) {
        const substr = search.slice(0, i);
        const idx = item.search.indexOf(substr);
        const idxLower = item.search.toLowerCase().indexOf(substr.toLowerCase());

        if (idx !== -1) {
            start = idx;
            maxSubstr = substr.length;
            break;
        }
        if (idxLower !== -1) {
            start = idxLower;
            maxSubstr = substr.length;
            break;
        }
    }

    const score = FuzzySearch.isMatch(item.search, search, false);

    if (!score) {
        return 0;
    }

    const tunedScore = Math.round(score + (start / maxSubstr) * K_START);

    return tunedScore || 0.00001;
};

export const sortSuggestions = <T extends SearchValue>(items: T[]) => {
    const itemsWithSort = items.filter((item) => item.sort !== undefined);
    const itemsWithoutSort = items.filter((item) => item.sort === undefined);

    return [...itemsWithSort.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)), ...itemsWithoutSort];
};

export const fuzzySearch = <T extends SearchValue>(items: T[], search: string) => {
    if (!search) {
        return items;
    }

    const scoredItems = items.map((item) => ({
        item,
        score: fuzzySearchScore(item, search),
    }));

    const filteredItems = scoredItems
        .filter(({score}) => score)
        .sort((a, b) => {
            const compare = a.score - b.score;

            if (compare === 0) {
                return a.item.search.localeCompare(b.item.search);
            }

            return compare;
        });

    return sortSuggestions(filteredItems.map(({item}) => item));
};
