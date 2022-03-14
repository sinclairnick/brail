import chalk from 'chalk';

type LogType = typeof console.log;
type WarnType = typeof console.warn;

export class Logger {
  static log: LogType = (...args) => {
    console.log(chalk.black.bgCyan('brail'), ...args);
  };
  static warn: WarnType = (...args) => {
    console.log(chalk.black.bgYellow('brail'), ...args);
  };
}
