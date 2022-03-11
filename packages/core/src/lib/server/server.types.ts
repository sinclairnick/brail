import { NextApiHandler } from 'next';
import { TemplatePage } from '../template/types';

export type HandlerFn = NextApiHandler<string>;

export type HandlersMap = { [key: string]: HandlerFn };

export type SuppliedTemplateMap = { [key: string]: TemplatePage<any> };
