export type SearchValue = {
    search: string;
    sort?: number;
};

export const sortSuggestions = <T extends SearchValue>(items: T[]) => {
    const itemsWithSort = items.filter((item) => item.sort !== undefined);
    const itemsWithoutSort = items.filter((item) => item.sort === undefined);

    return [...itemsWithSort.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)), ...itemsWithoutSort];
};

export const simpleFilterSuggestions = <T extends SearchValue>(items: T[], search: string) => {
    if (!search) {
        return items;
    }

    const searchLower = search.toLowerCase();

    const filteredItems = items
        .map((item) => ({
            ...item,
            search: item.search.toLowerCase(),
        }))
        .filter((item) => item.search.includes(searchLower))
        .sort((a, b) => {
            const startA = a.search.indexOf(searchLower);
            const startB = b.search.indexOf(searchLower);

            if (startA === startB) {
                return a.search.localeCompare(b.search);
            }

            return startA - startB;
        });

    return sortSuggestions(filteredItems);
};
