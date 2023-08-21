/* Source https://github.com/sciactive/tinygesture/blob/master/src/TinyGesture.ts */

export interface Options {
    pressThreshold: number;
    velocityThreshold: number;
}

export interface Events {
    panend: MouseEvent | TouchEvent;
    panmove: MouseEvent | TouchEvent;
    panstart: MouseEvent | TouchEvent;
    swipeleft: MouseEvent | TouchEvent;
    swiperight: MouseEvent | TouchEvent;
}

export type Handler<E> = (event: E) => void;

export type Handlers = {
    [E in keyof Events]: Handler<Events[E]>[];
};

const DEFAULT_OPTIONS: Options = {
    velocityThreshold: 10,
    pressThreshold: 8,
};

export class HorizontalSwiper<Element extends HTMLElement = HTMLElement> {
    touchMoveX: number | null = null;
    element: Element;

    private opts: Options;
    private touchStartX: number | null = null;
    private touchStartY: number | null = null;
    private touchEndX: number | null = null;
    private touchEndY: number | null = null;
    private velocityX: number | null = null;

    private thresholdX = 0;
    private disregardVelocityThresholdX = 0;

    private swipedHorizontal = false;

    private handlers: Handlers = {
        panstart: [],
        panmove: [],
        panend: [],
        swipeleft: [],
        swiperight: [],
    };

    private _onTouchStart: (typeof this)['onTouchStart'] = this.onTouchStart.bind(this);
    private _onTouchMove: (typeof this)['onTouchMove'] = this.onTouchMove.bind(this);
    private _onTouchEnd: (typeof this)['onTouchEnd'] = this.onTouchEnd.bind(this);

    constructor(elem: Element, options?: Partial<Options>) {
        this.element = elem;
        this.opts = Object.assign({}, DEFAULT_OPTIONS, options);

        this.element.addEventListener('touchstart', this._onTouchStart);
        this.element.addEventListener('touchmove', this._onTouchMove);
        this.element.addEventListener('touchend', this._onTouchEnd);

        if (!('ontouchstart' in window)) {
            this.element.addEventListener('mousedown', this._onTouchStart);

            document.addEventListener('mousemove', this._onTouchMove);
            document.addEventListener('mouseup', this._onTouchEnd);
        }
    }

    get getTouchMoveX() {
        return this.touchMoveX;
    }

    destroy() {
        this.element.removeEventListener('touchstart', this._onTouchStart);
        this.element.removeEventListener('touchmove', this._onTouchMove);
        this.element.removeEventListener('touchend', this._onTouchEnd);
        this.element.removeEventListener('mousedown', this._onTouchStart);

        document.removeEventListener('mousemove', this._onTouchMove);
        document.removeEventListener('mouseup', this._onTouchEnd);
    }

    on<E extends keyof Events>(type: E, fn: Handler<Events[E]>) {
        if (!this.handlers[type]) return;

        this.handlers[type].push(fn);

        return {
            type,
            fn,
            cancel: () => this.off(type, fn),
        };
    }

    off<E extends keyof Events>(type: E, fn: Handler<Events[E]>) {
        if (this.handlers[type]) {
            const idx = this.handlers[type].indexOf(fn);
            if (idx !== -1) {
                this.handlers[type].splice(idx, 1);
            }
        }
    }

    fire<E extends keyof Events>(type: E, event: Events[E]) {
        for (let i = 0; i < this.handlers[type].length; i++) {
            this.handlers[type][i](event);
        }
    }

    onTouchStart(event: MouseEvent | TouchEvent) {
        this.thresholdX = this.threshold();
        this.disregardVelocityThresholdX = this.disregardVelocityThreshold(this);
        this.touchStartX =
            event.type === 'mousedown'
                ? (event as MouseEvent).screenX
                : (event as TouchEvent).changedTouches[0].screenX;
        this.touchStartY =
            event.type === 'mousedown'
                ? (event as MouseEvent).screenY
                : (event as TouchEvent).changedTouches[0].screenY;
        this.touchMoveX = null;
        this.touchEndX = null;
        this.touchEndY = null;

        this.fire('panstart', event);
    }

    onTouchMove(event: MouseEvent | TouchEvent) {
        if (event.type === 'mousemove' && (!this.touchStartX || this.touchEndX !== null)) {
            return;
        }
        const touchMoveX =
            (event.type === 'mousemove'
                ? (event as MouseEvent).screenX
                : (event as TouchEvent).changedTouches[0].screenX) - (this.touchStartX ?? 0);
        this.velocityX = touchMoveX - (this.touchMoveX ?? 0);
        this.touchMoveX = touchMoveX;

        this.fire('panmove', event);
    }

    onTouchEnd(event: MouseEvent | TouchEvent) {
        if (event.type === 'mouseup' && (!this.touchStartX || this.touchEndX !== null)) {
            return;
        }

        this.touchEndX =
            event.type === 'mouseup'
                ? (event as MouseEvent).screenX
                : (event as TouchEvent).changedTouches[0].screenX;
        this.touchEndY =
            event.type === 'mouseup'
                ? (event as MouseEvent).screenY
                : (event as TouchEvent).changedTouches[0].screenY;

        this.fire('panend', event);

        const x = this.touchEndX - (this.touchStartX ?? 0);
        const absX = Math.abs(x);
        const y = this.touchEndY - (this.touchStartY ?? 0);
        const absY = Math.abs(y);

        if (absX > this.thresholdX) {
            this.swipedHorizontal = absX >= absY && absX > this.thresholdX;

            if (this.swipedHorizontal) {
                if (x < 0) {
                    // Left swipe.
                    if (
                        (this.velocityX ?? 0) < -this.opts.velocityThreshold ||
                        x < -this.disregardVelocityThresholdX
                    ) {
                        this.fire('swipeleft', event);
                    }
                } else {
                    // Right swipe.
                    if (
                        (this.velocityX ?? 0) > this.opts.velocityThreshold ||
                        x > this.disregardVelocityThresholdX
                    ) {
                        this.fire('swiperight', event);
                    }
                }
            }
        }
    }

    threshold() {
        return Math.max(25, Math.floor(0.15 * (window.innerWidth || document.body.clientWidth)));
    }

    disregardVelocityThreshold(self: HorizontalSwiper) {
        return Math.floor(0.5 * self.element.clientWidth);
    }
}
