import React from 'react';

import {block} from '../utils/cn';

import {Action, PlaceholderContainerAction} from './PlaceholderContainerAction';

import './PlaceholderContainer.scss';

const ImageSize = {
    s: 100,
    m: 150,
    l: 230,
    promo: 230,
};

const Direction = {
    Row: 'row',
    Column: 'column',
} as const;
const Align = {
    Left: 'left',
    Center: 'center',
} as const;

type Size = 's' | 'm' | 'l' | 'promo';

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactNode>;

type PlaceholderContainerImageSettingsProps = {
    url: string;
    alt?: string;
    size?: number;
};

interface PlaceholderContainerGeneralProps {
    title?: string;
    description?: React.ReactNode;
    renderContent?: () => React.ReactNode;
    action?: Action | Action[];
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageSettingsProps;
}

interface PlaceholderContainerDefaultProps {
    size: Size;
    direction: (typeof Direction)[keyof typeof Direction];
    align: (typeof Align)[keyof typeof Align];
}

type PlaceholderContainerInnerProps = PlaceholderContainerGeneralProps &
    PlaceholderContainerDefaultProps;

export interface PlaceholderContainerProps
    extends PlaceholderContainerGeneralProps,
        Partial<PlaceholderContainerDefaultProps> {}

interface PlaceholderContainerState {}

const b = block('placeholder-container');

export class PlaceholderContainer extends React.Component<
    PlaceholderContainerInnerProps,
    PlaceholderContainerState
> {
    static Direction = Direction;
    static Align = Align;

    static defaultProps: PlaceholderContainerDefaultProps = {
        size: 'l',
        direction: Direction.Row,
        align: Align.Center,
    };

    render() {
        const {direction, align, size} = this.props;
        const className: string = this.props.className || b();

        return (
            <div className={b({direction, align, size}, [className])}>
                <div className={b('body')}>
                    <div className={b('image', {size})}>{this.renderImage()}</div>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    private renderImage(): NonNullable<React.ReactNode> {
        if (typeof this.props.image === 'object' && 'url' in this.props.image) {
            const image: PlaceholderContainerImageSettingsProps = this.props.image;
            return (
                <img
                    src={image.url}
                    alt={image.alt || ''}
                    width={image.size || ImageSize.l}
                    height={image.size || ImageSize.l}
                />
            );
        }

        return this.props.image;
    }

    private renderContent() {
        const {size} = this.props;
        const content = this.props.renderContent ? (
            this.props.renderContent()
        ) : (
            <>
                {this.renderTitle()}
                {this.renderDescription()}
            </>
        );

        return (
            <div className={b('content', {size})}>
                {content}
                {this.renderAction()}
            </div>
        );
    }

    private renderTitle() {
        const {title} = this.props;

        if (!title) {
            return null;
        }

        return <div className={b('title')}>{title}</div>;
    }

    private renderDescription() {
        const {description} = this.props;

        if (!description) {
            return null;
        }

        return <div className={b('description')}>{description}</div>;
    }

    private renderAction() {
        const {action} = this.props;

        if (!action) {
            return null;
        }

        if (Array.isArray(action)) {
            if (!action.length) {
                return null;
            }

            return (
                <div className={b('actions')}>
                    {action.map((actionItem) => (
                        <PlaceholderContainerAction key={actionItem.text} action={actionItem} />
                    ))}
                </div>
            );
        }

        return (
            <div className={b('actions')}>
                <PlaceholderContainerAction action={action} />
            </div>
        );
    }
}
