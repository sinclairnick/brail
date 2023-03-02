/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
const config = {
  root: true,
  plugins: ["@brail"],
  extends: ["plugin:@brail/recommended"],
	settings: {
		warnLevel: "partial",
		withTable: false,
	}
};

module.exports = config;
