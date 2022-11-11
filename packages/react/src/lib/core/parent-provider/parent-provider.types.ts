import { PropsWithChildren, ReactNode } from 'react';
import { VerticalAlign } from '../util/util.types';

export type ParentContextType = {
  width: number;
  verticalAlign?: VerticalAlign;
};
export type ParentProviderProps = PropsWithChildren<ParentContextType>;

export type OptionalParentConsumerProps = {
  children: React.ConsumerProps<ParentContextType>['children'] | ReactNode;
};
