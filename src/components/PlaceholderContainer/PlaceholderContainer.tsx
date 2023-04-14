import React from 'react';

import {eventBroker} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {Action, PlaceholderContainerAction} from './PlaceholderContainerAction';

import './PlaceholderContainer.scss';

const ImageSize = {
    s: 100,
    m: 150,
    l: 230,
    promo: 200,
};

const Direction = {
    Row: 'row',
    Column: 'column',
} as const;
const Align = {
    Left: 'left',
    Center: 'center',
} as const;

interface YfmProps {
    html: string;
}

const Yfm: React.FC<YfmProps> = ({html}) => {
    const handleClickCapture = React.useCallback((event: React.SyntheticEvent) => {
        const target = event.target as Element | undefined;
        if (target?.tagName === 'A') {
            eventBroker.publish({
                componentId: 'Yfm',
                eventId: 'click',
                domEvent: event,
            });
        }
    }, []);

    return (
        <div
            className={'yfm'}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
            onClickCapture={handleClickCapture}
        />
    );
};

type PlaceholderContainerImageNodeProps = NonNullable<React.ReactElement> | Element;

type PlaceholderContainerImageSettingsProps = {
    url: string;
    alt?: string;
    size?: number;
};

interface PlaceholderContainerGeneralProps {
    title?: string;
    description?: React.ReactNode;
    html?: string | (() => Promise<string>);
    action?: Action | Action[];
    className?: string;
    image: PlaceholderContainerImageNodeProps | PlaceholderContainerImageSettingsProps;
}

interface PlaceholderContainerDefaultProps {
    entity: string;
    size: 's' | 'm' | 'l' | 'promo';
    direction: (typeof Direction)[keyof typeof Direction];
    align: (typeof Align)[keyof typeof Align];
}

type PlaceholderContainerInnerProps = PlaceholderContainerGeneralProps &
    PlaceholderContainerDefaultProps;

export interface PlaceholderContainerProps
    extends PlaceholderContainerGeneralProps,
        Partial<PlaceholderContainerDefaultProps> {}

interface PlaceholderContainerState {
    html: string | undefined;
}

const b = block('placeholder-container');

export class PlaceholderContainer extends React.Component<
    PlaceholderContainerInnerProps,
    PlaceholderContainerState
> {
    static Direction = Direction;
    static Align = Align;

    static defaultProps: PlaceholderContainerDefaultProps = {
        entity: 'generic/generic',
        size: 'l',
        direction: Direction.Row,
        align: Align.Center,
    };

    state = {
        html: undefined,
    };

    componentDidMount() {
        const {html} = this.props;

        if (html) {
            if (typeof html === 'string') {
                this.setState({html});
            } else {
                html()
                    .then((html) => this.setState({html}))
                    .catch(() => {});
            }
        }
    }

    render() {
        const {direction, align, size} = this.props;
        const className: string = this.props.className || b();

        return (
            <div className={b({direction, align, size}, [className])}>
                <div className={b('image')}>{this.renderImage()}</div>
                {this.renderContent()}
            </div>
        );
    }

    private renderImage() {
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
        const {html} = this.state;

        if (html) {
            return (
                <div className={b('html')}>
                    <div className={b('html-content')}>
                        <Yfm html={html!} />
                    </div>
                    <div className={b('html-action')}>{this.renderAction()}</div>
                </div>
            );
        }

        return (
            <div className={b('content')}>
                {this.renderTitle()}
                {this.renderDescription()}
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
                <div className={b('action')}>
                    {action.map((actionItem) => (
                        <PlaceholderContainerAction key={actionItem.text} action={actionItem} />
                    ))}
                </div>
            );
        }

        return (
            <div className={b('action')}>
                <PlaceholderContainerAction action={action} />
            </div>
        );
    }
}
