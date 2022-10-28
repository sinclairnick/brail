import type { AppProps } from 'next/app';
import { BrailLayout } from '@brail/web';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BrailLayout template={Component}>
      <Component {...pageProps} />;
    </BrailLayout>
  );
}
