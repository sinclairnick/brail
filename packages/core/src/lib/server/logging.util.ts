import chalk from 'chalk';

const brand = chalk.magenta.bold`:: brail`;
let isEnabled = true;

export class Logger {
  static disable() {
    isEnabled = false;
  }

  static enable() {
    isEnabled = true;
  }

  static log(message: string) {
    if (isEnabled) {
      console.log(`${brand} - ${chalk.blue(message)}`);
    }
  }

  static warn(message: string) {
    if (isEnabled) {
      console.warn(`${brand} - ${chalk.yellow(message)}`);
    }
  }
}
