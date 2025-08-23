"use client";

import NextError from "next/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.error(error); // Log errors to console instead of Sentry

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
