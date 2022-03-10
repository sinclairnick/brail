import { NextApiHandler } from 'next';

export type HandlerFn = NextApiHandler<string>;

export type HandlersMap = { [key: string]: HandlerFn };
