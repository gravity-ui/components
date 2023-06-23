import {FileType} from './FilePreview';

const isFileTypeEnum = (str: string): str is FileType =>
    Object.values(FileType).includes(str.toLowerCase() as FileType);

export function getFileType(fileType: File['type']): FileType;
export function getFileType(file: File): FileType;

export function getFileType(arg: File | File['type']): FileType {
    const fileType: File['type'] = typeof arg === 'string' ? arg : arg.type;

    if (isFileTypeEnum(fileType)) {
        return fileType;
    }

    const splittedFileType = fileType.split('/')[0];

    if (isFileTypeEnum(splittedFileType)) {
        return splittedFileType;
    }

    return FileType.Default;
}
