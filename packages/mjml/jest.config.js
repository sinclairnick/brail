const fs = require('fs');
const { exclude: _, ...testConfig } = JSON.parse(
  fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8')
);

module.exports = {
  displayName: 'mjml',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/mjml',
};
