import {TokenizedInput} from '../TokenizedInput';
import {TokenValueBase} from '../types';

export type TokenizedComponentType<T extends TokenValueBase> = typeof TokenizedInput<T>;
