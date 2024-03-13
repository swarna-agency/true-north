import type { LinksFunction } from "@remix-run/node";
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
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta property="og:url"           content="https://www.your-domain.com/your-page.html" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The True North" />
        <meta
          property="og:description"
          content="Check out The True North album player from Peter Garrett."
        />
        {/* <meta
          property="og:image"
          content="https://www.your-domain.com/images/cd-cover.png"
        /> */}
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
