import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://leandroeguia.com.ar"),
  title: "Leandro Eguia — Software Engineer",
  description:
    "Leandro Eguia, Computer Engineer (UNLP) and SSr. Backend Software Engineer at Mercado Libre. Java, Python, event-driven systems, and data engineering.",
  alternates: { canonical: "/" },
  icons: { icon: "/assets/img/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Leandro Eguia",
    title: "Leandro Eguia — Software Engineer",
    url: "/",
    description:
      "SSr. Backend Software Engineer at Mercado Libre. Java, Python, event-driven architecture, and data engineering.",
    images: [
      { url: "/assets/img/social-preview.png", width: 1200, height: 630 },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport = { themeColor: "#171916" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{let theme;try{theme=localStorage.getItem('portfolio-theme')}catch{}if(theme!=='light'&&theme!=='dark')theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=theme})()`,
          }}
        />
        <link
          rel="preload"
          href="/assets/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
