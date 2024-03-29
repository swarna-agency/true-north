import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "./styles/main-style.css";
import tabletStyle from "./styles/tablet-style.css";
import w1000Style from "./styles/w-1000-style.css";
import w500Style from "./styles/w-500-style.css";
import w300Style from "./styles/w-300-style.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: tabletStyle,
    media: "(max-width: 1024px) and (orientation: portrait)",
  },
  {
    rel: "stylesheet",
    href: w1000Style,
    media: "(max-width: 1000px)",
  },
  {
    rel: "stylesheet",
    href: w500Style,
    media: "(max-width: 500px)",
  },
  {
    rel: "stylesheet",
    href: w300Style,
    media: "(max-width: 300px)",
  },
];

export const meta: MetaFunction = () => {
  return [];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KXDJHVF6');`,
          }}
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <noscript>
          <iframe
            title="GTM"
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXDJHVF6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
