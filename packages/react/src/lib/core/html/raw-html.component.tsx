import React from 'react';

export type RawHtmlProps = { html: string };

export const RawHtml = (props: RawHtmlProps) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `</script>${props.html}\n<script>`,
      }}
    />
  );
};
