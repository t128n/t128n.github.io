import type { APIRoute } from "astro";

const getOpenSearchXML = (site: URL | undefined) => `\
<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>t128n Blog Search</ShortName>
  <Description>Search the t128n blog posts</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" method="get" template="https://${site}search?q={searchTerms}"/>
  <Image height="16" width="16" type="image/svg+xml">https://${site}favicon.svg</Image>
  <Developer>Torben Haack</Developer>
  <Attribution>${site}</Attribution>
</OpenSearchDescription>
`;

export const GET: APIRoute = ({ site }) => {
	return new Response(getOpenSearchXML(site), {
		headers: {
			"Content-Type": "application/opensearchdescription+xml",
		},
	});
};
