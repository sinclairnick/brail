import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

// Default rollup config
export default [
  {
    input: 'src/index.server.ts',
    output: {
      file: pkg.exports['.'].require,
      format: 'cjs',
    },
    plugins: [commonjs(), typescript({ target: 'es5' })],
  },
  {
    input: 'src/index.client.ts',
    output: {
      file: pkg.exports['.'].default,
      format: 'es',
    },
    plugins: [commonjs(), typescript({ target: 'es6' })],
  },
];
