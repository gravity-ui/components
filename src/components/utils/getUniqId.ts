import {NAMESPACE} from './cn';

let id = 1;
export function getUniqId() {
    return `${NAMESPACE}uniqid-${id++}`;
}
