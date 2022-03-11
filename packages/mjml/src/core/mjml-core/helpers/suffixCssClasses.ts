export default (classes: any, suffix: any) =>
  classes
    ? classes
        .split(' ')
        .map((c: any) => `${c}-${suffix}`)
        .join(' ')
    : ''
