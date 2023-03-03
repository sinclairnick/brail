import { SpacingStyleProps } from ".";

export const OUTLOOK_DPI_NORMALIZATION = `
<!--[if mso]>
	<style type="text/css">
		body, table, td, .mobile-text {
		font-family:Arial, Helvetica, sans-serif !important;
		}
	</style>
	<xml>
		<o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
<![endif]-->
`.trim();

export const getOutlookProps = (
  styles: Record<string, unknown>,
  attrs: Record<string, unknown>
) => {
  return {
    table: {
      attrs: {},
      styles: {},
    },
    td: {
      attrs: {},
      styles: {},
    },
  } satisfies {
    table: { styles: Record<string, unknown>; attrs: Record<string, unknown> };
    td: { styles: Record<string, unknown>; attrs: Record<string, unknown> };
  };
};
