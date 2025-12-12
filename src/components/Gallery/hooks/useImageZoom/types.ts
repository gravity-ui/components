export type Ref<T> = {readonly current: T};

export type Position = {
    readonly x: number;
    readonly y: number;
};

export type Size = {
    readonly width: number;
    readonly height: number;
};

export type ZoomState = {
    readonly scale: number;
    readonly position: Position;
};

export type ZoomActions = {
    setScale: (scale: number) => void;
    setPosition: (position: Position) => void;
    resetZoom: () => void;
};

export type ZoomConstraints = {
    imageSize: Size;
    containerSize: Size;
    imageSizeRef: Ref<Size>;
    containerSizeRef: Ref<Size>;
    constrainPosition: (pos: Position, scale: number) => Position;
    imageFitsContainer: boolean;
};
