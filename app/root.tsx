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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
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
