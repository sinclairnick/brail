import { useRouter } from 'next/router';

export function useQueryParam(name: string, defaultValue: string) {
  const router = useRouter();
  const value: string = router.query[name]?.toString() ?? defaultValue;

  const setValue = (value: string) => {
    router.push({ query: { ...router.query, [name]: value } }, undefined, {
      shallow: true,
    });
  };

  return [value, setValue] as const;
}
