import chalk from 'chalk';

const brand = ':::: brail';
const coloredBrand = chalk.magenta.bold`${brand}`;
let isEnabled = true;
const INDENT = Array.from({ length: (brand + ' - ').length }).join(' ');

export class Logger {
  static disable() {
    isEnabled = false;
  }

  static debug(message: string) {
    if (isEnabled && Number(process.env.BRAIL_DEBUG) > 0) {
      console.log(`${coloredBrand} - ${chalk.blue(message)}`);
    }
  }

  static indent(message: string) {
    return `${INDENT} ${message}`;
  }

  static enable() {
    isEnabled = true;
  }

  static log(message: string) {
    if (isEnabled) {
      console.log(`${coloredBrand} - ${chalk.blue(message)}`);
    }
  }

  static warn(message: string) {
    if (isEnabled) {
      console.warn(`${coloredBrand} - ${chalk.yellow(message)}`);
    }
  }
}
