import * as React from 'react';

import {block} from '../../../../utils/cn';

import './DocumentView.scss';

const cnDocumentView = block('gallery-document-view');

export type DocumentViewProps = {
    className?: string;
    name: string;
    src: string;
    sandbox?: string;
} & React.HTMLAttributes<HTMLIFrameElement>;

export const DocumentView = ({className, name, ...props}: DocumentViewProps) => {
    return <iframe title={name} className={cnDocumentView(null, className)} {...props} />;
};
