import { NextApiHandler } from 'next';
import { TemplateMeta } from '../types';

export type HandlerResponse = {
  meta: TemplateMeta;
  html: string;
};

export type HandlerFn = NextApiHandler<HandlerResponse>;

export type HandlersMap = { [key: string]: HandlerFn };
