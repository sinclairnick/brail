import React from 'react';
import { PropType } from '../../template/types';
import { handleMjmlProps } from '../utils';

export const createMjmlElement = <P extends PropType = {}>(name: string) => {
  return (props: P) => {
    const { children = null, ...rest } = props;
    return React.createElement(name, handleMjmlProps(rest), children);
  };
};
