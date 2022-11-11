export class LangUtil {
  static pick<O extends Record<string, unknown>, K extends keyof O>(
    object: O,
    keys: K[]
  ) {
    const picked = {} as { [key in K]: O[key] };
    for (const key of keys) {
      picked[key] = object[key];
    }
    return picked;
  }
}
