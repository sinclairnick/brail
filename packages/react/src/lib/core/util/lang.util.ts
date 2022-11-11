export class LangUtil {
  static pick<O, K extends keyof O>(object: O, keys: K[]) {
    const picked = {} as { [key in K]: O[key] };
    for (const key of keys) {
      picked[key] = object[key];
    }
    return picked;
  }

  static omit<O, K extends keyof O>(object: O, keys: K[]) {
    const picked: Record<string, any> = {};
    for (const key of Object.keys(object ?? {})) {
      if (keys.includes(key as any)) continue;

      picked[key] = (object ?? {})[key];
    }
    return picked as { [key in Exclude<keyof O, K>]: O[key] };
  }
}
