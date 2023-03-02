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
