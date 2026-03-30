import isEqual from 'lodash/isEqual';

type UndoRedoState<T extends unknown> = {
    value: T;
    next: T[];
    prev: T[];
};

export class UndoRedoManager<T extends unknown> {
    _state: UndoRedoState<T> | undefined = undefined;

    constructor(value: T) {
        this._state = {
            value:
                typeof structuredClone === 'function'
                    ? structuredClone(value)
                    : JSON.parse(JSON.stringify(value)),
            next: [],
            prev: [],
        };
    }

    private get state() {
        if (!this._state) {
            return {
                value: {} as T,
                next: [],
                prev: [],
            };
        }

        return this._state;
    }

    init(value: T) {
        this._state = {
            value:
                typeof structuredClone === 'function'
                    ? structuredClone(value)
                    : JSON.parse(JSON.stringify(value)),
            next: [],
            prev: [],
        };
    }

    update(value: T, force?: boolean) {
        if (isEqual(value, this.state.value)) {
            return;
        }

        const prev = force
            ? [...this.state.prev]
            : [
                  ...this.state.prev,
                  typeof structuredClone === 'function'
                      ? structuredClone(this.state.value)
                      : JSON.parse(JSON.stringify(this.state.value)),
              ];

        this._state = {
            value:
                typeof structuredClone === 'function'
                    ? structuredClone(value)
                    : JSON.parse(JSON.stringify(value)),
            next: [],
            prev,
        };

        if (this.state.prev.length > 100) {
            this.state.prev.shift();
        }
    }

    undo(): T {
        const prevState = this.state.prev.pop();

        if (!prevState) {
            return this.getValue();
        }

        const newNext =
            typeof structuredClone === 'function'
                ? structuredClone(this.state.value)
                : JSON.parse(JSON.stringify(this.state.value));

        this._state = {
            ...this.state,
            value:
                typeof structuredClone === 'function'
                    ? structuredClone(prevState)
                    : JSON.parse(JSON.stringify(prevState)),
            next: [...this.state.next, newNext],
        };

        return this.getValue();
    }

    redo(): T {
        const nextState = this.state.next.pop();

        if (!nextState) {
            return this.getValue();
        }

        const newPrev =
            typeof structuredClone === 'function'
                ? structuredClone(this.state.value)
                : JSON.parse(JSON.stringify(this.state.value));

        this._state = {
            ...this.state,
            value:
                typeof structuredClone === 'function'
                    ? structuredClone(nextState)
                    : JSON.parse(JSON.stringify(nextState)),
            prev: [...this.state.prev, newPrev],
        };

        return this.getValue();
    }

    getValue(): T {
        return typeof structuredClone === 'function'
            ? structuredClone(this.state.value)
            : JSON.parse(JSON.stringify(this.state.value));
    }
}
