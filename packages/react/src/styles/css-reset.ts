// Borrowed from https://stackoverflow.design/email/templates/promotional/
export const CSS_RESET = `
		/* What it does: Remove spaces around the email design added by some email clients. */
		/* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
		html,
		body {
				margin: 0 auto !important;
				padding: 0 !important;
				height: 100% !important;
				width: 100% !important;
		}

		/* What it does: Stops email clients resizing small text. */
		* {
				-ms-text-size-adjust: 100%;
				-webkit-text-size-adjust: 100%;
		}

		/* What it does: Stops Outlook from adding extra spacing to tables. */
		table,
		td {
				mso-table-lspace: 0pt !important;
				mso-table-rspace: 0pt !important;
		}

		/* What it does: Fixes webkit padding issue. */
		table {
				border: 0;
				border-spacing: 0;
				border-collapse: collapse;
		}

		/* What it does: Forces Samsung Android mail clients to use the entire viewport. */
		#MessageViewBody,
		#MessageWebViewDiv {
				width: 100% !important;
		}

		/* What it does: Uses a better rendering method when resizing images in IE. */
		img {
				-ms-interpolation-mode: bicubic;
		}

		/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
		a {
				text-decoration: none;
		}

		/* What it does: A work-around for email clients automatically linking certain text strings. */
		/* iOS */
		a[x-apple-data-detectors],
		.unstyle-auto-detected-links a,
		.aBn {
				border-bottom: 0 !important;
				cursor: default !important;
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
		}
		u + #body a,        /* Gmail */
	#MessageViewBody a  /* Samsung Mail */ {
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
		}

		/* What it does: Prevents Gmail from changing the text color in conversation threads. */
		.im {
				color: inherit !important;
		}

		/* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
		.a6S {
				display: none !important;
				opacity: 0.01 !important;
		}
		/* If the above doesn't work, add a .g-img class to any image in question. */
		img.g-img + div {
				display: none !important;
		}

`
  .trim()
  .replace(/\/\*.*\*\//g, "");
