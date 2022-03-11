import * as React from 'react';
import { handleMjmlProps } from '../utils';

export const createMjmlElement = <P extends { [key: string]: any } = {}>(
  name: string
) => {
  return (props: P) => {
    const { children = null, ...rest } = props;
    return React.createElement(name, handleMjmlProps(rest), children);
  };
};
