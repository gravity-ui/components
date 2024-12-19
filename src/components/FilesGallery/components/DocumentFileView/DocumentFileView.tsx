import React from 'react';

import {block} from '../../../utils/cn';

import './DocumentFileView.scss';

const cnDocumentFileView = block('document-file-view');

export type DocumentFileViewProps = {
    className?: string;
    name: string;
    src: string;
    sandbox?: string;
} & React.HTMLAttributes<HTMLIFrameElement>;

export const DocumentFileView = ({className, name, ...props}: DocumentFileViewProps) => {
    return <iframe title={name} className={cnDocumentFileView(null, className)} {...props} />;
};
