import React from 'react';

import {DocsContext} from '@storybook/addon-docs';

const readmeCache: Record<string, {default: string}> = {};

function importAllReadme(ctx: __WebpackModuleApi.RequireContext) {
    const path = ctx.id.split(' ')[0].replace('./', '') + '/';
    ctx.keys().forEach((key) => {
        const dirPath = key.replace(/^\.\//, path).replace(/\/readme\.md$/i, '');
        readmeCache[dirPath] = ctx(key);
    });
}

importAllReadme(require.context('../src/components', true, /readme\.md$/i));

export const Docs = () => {
    const context = React.useContext(DocsContext);
    const fileName = context?.parameters?.fileName;
    const kind = context.kind;
    let isComponent = false;
    if (kind && /Components\//.test(kind)) {
        isComponent = true;
    }

    let dirPath;
    if (isComponent && fileName) {
        const pathArr = fileName.split('/');
        dirPath = pathArr.slice(1, pathArr.length - 2).join('/');
    }

    let sourceBadgeContent;
    if (dirPath) {
        sourceBadgeContent = (
            <a
                href={`https://github.com/gravity-ui/components/tree/main/${dirPath}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    alt=""
                    src="https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/icons/github-badge.svg"
                />
            </a>
        );
    }

    let readmeContent;
    if (dirPath && readmeCache[dirPath]) {
        readmeContent = (
            <div
                className="yfm yfm_only-light"
                dangerouslySetInnerHTML={{__html: readmeCache[dirPath].default}}
            />
        );
    }

    return (
        <React.Fragment>
            {sourceBadgeContent}
            {readmeContent}
        </React.Fragment>
    );
};
