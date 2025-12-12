import type {Position, Ref, Size} from './types';

export function checkImageFitsContainer(
    imageSize: Size,
    containerSize: Size,
    scale: number,
): boolean {
    if (
        imageSize.width === 0 ||
        imageSize.height === 0 ||
        containerSize.width === 0 ||
        containerSize.height === 0
    ) {
        return true;
    }

    const scaledWidth = imageSize.width * scale;
    const scaledHeight = imageSize.height * scale;

    return scaledWidth <= containerSize.width && scaledHeight <= containerSize.height;
}

/**
 * Creates a function that constrains pan position to keep image within visible bounds
 *
 * Logic:
 * 1. Calculate displayed image dimensions (how image fits in container)
 * 2. Calculate scaled image dimensions (displaySize * scale)
 * 3. Calculate maximum allowed offset: maxOffset = (scaledSize - displaySize) / 2
 * 4. Clamp position to [-maxOffset, +maxOffset]
 *
 * @param imageSizeRef - Reference to current image size
 * @param containerSizeRef - Reference to current container size
 * @returns Function that constrains position based on scale
 */
export function createConstrainPosition(
    imageSizeRef: Ref<Size>,
    containerSizeRef: Ref<Size>,
): (pos: Position, currentScale: number) => Position {
    return (pos: Position, currentScale: number): Position => {
        if (
            imageSizeRef.current.width === 0 ||
            imageSizeRef.current.height === 0 ||
            containerSizeRef.current.width === 0 ||
            containerSizeRef.current.height === 0
        ) {
            return {x: 0, y: 0};
        }

        // Calculate display dimensions (how image fits in container)
        const imageAspect = imageSizeRef.current.width / imageSizeRef.current.height;
        const containerAspect = containerSizeRef.current.width / containerSizeRef.current.height;

        let displayWidth: number;
        let displayHeight: number;

        if (imageAspect > containerAspect) {
            // Image is wider - constrained by width
            displayWidth = containerSizeRef.current.width;
            displayHeight = containerSizeRef.current.width / imageAspect;
        } else {
            // Image is taller - constrained by height
            displayHeight = containerSizeRef.current.height;
            displayWidth = containerSizeRef.current.height * imageAspect;
        }

        // Calculate scaled dimensions
        const scaledWidth = displayWidth * currentScale;
        const scaledHeight = displayHeight * currentScale;

        // Calculate max offset (how far we can pan)
        const maxOffsetX = Math.max(0, (scaledWidth - displayWidth) / 2);
        const maxOffsetY = Math.max(0, (scaledHeight - displayHeight) / 2);

        // Clamp position
        return {
            x: Math.max(-maxOffsetX, Math.min(maxOffsetX, pos.x)),
            y: Math.max(-maxOffsetY, Math.min(maxOffsetY, pos.y)),
        };
    };
}
