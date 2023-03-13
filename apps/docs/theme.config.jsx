/** @type {import("nextra").ThemeConfig} */
export default {
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
  banner: {
    key: "beta-release",
    text: (
      <a href="/docs/introduction">
        🎉 Brail Beta has been released. Read more →
      </a>
    ),
  },
  head: () => {
    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-config" content="/images/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </>
    );
  },
};
