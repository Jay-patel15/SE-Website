type JsonLdProps = {
  data: Record<string, unknown>;
};

// Escape every "<" as a JSON unicode escape so a value containing "</script>" cannot break out of
// the tag (stored XSS). JSON.parse turns it back into "<", so the structured data is unchanged.
export const serializeJsonLd = (data: Record<string, unknown>) => JSON.stringify(data).replace(/</g, "\\u003c");

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
