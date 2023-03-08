const { useRouter } = require("next/router");

/** @type {import("nextra").ThemeConfig} */
const config = {
  logo: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <img src="/icon.png" width={30} />
      <span>
        <b>Brail</b>
      </span>
    </div>
  ),
  docsRepositoryBase: "https://github.com/sinclairnick/brail/apps/docs",
  project: {
    link: "https://github.com/sinclairnick/brail",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Brail",
    };
  },
  footer: {
    text: (
      <span>
        Apache {new Date().getFullYear()} ©{" "}
        <a href="https://nextra.site" target="_blank">
          Brail
        </a>
        .
      </span>
    ),
  },
};

export default config;
