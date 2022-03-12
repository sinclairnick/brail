import { NextApiHandler } from 'next';
import { TemplatePage } from '../types';

export type HandlerFn = NextApiHandler<string>;

export type HandlersMap = { [key: string]: HandlerFn };
