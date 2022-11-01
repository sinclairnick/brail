import type { AppProps } from 'next/app';
import { BrailLayout } from '@brail/web';
import 'swagger-ui-react/swagger-ui.css'; // Makes OpenAPI tab look nicer

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BrailLayout template={Component}>
      <Component {...pageProps} />
    </BrailLayout>
  );
}
