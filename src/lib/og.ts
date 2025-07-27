import { readFile } from "node:fs/promises";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

async function generateMarkup(
	title: string,
	description: string,
	path: string,
) {
	const styles = {
		background: "#fff",
		color: "#000",
		colorSecondary: "#656565",
		fontBold: "700",
		fontMono: "'SF Mono', monospace",
		fontSans: "'Inter', sans-serif",
		textSm: "24px",
		textBase: "32px",
		textLg: "48px",
		contentWidth: "2172px",
		readableLineLength: "960px",
		contentPadding: "48px 64px",
		lineClamp: (maxLines: number) =>
			`overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical;`,
	};

	// Favicon URL as base64
	const faviconPath = `${process.cwd()}/public/favicon.svg`;
	const faviconBase64 = await readFile(faviconPath, "base64");

	const markup = html`
  <div
    style="
    height: 100%; width: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
    background-color: ${styles.background};
    color: ${styles.color};
    padding: ${styles.contentPadding};
    font-family: ${styles.fontMono};
    "
  >
    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;">
    <img src="data:image/svg+xml;base64,${faviconBase64}" alt="[t128n] Logo" style="width: 128px; height: 128px; border-radius: 50%;" />
    <span style="font-size: ${styles.textBase}; color: ${styles.colorSecondary}; font-weight: ${styles.fontBold};">
      Torben Haack [t128n]
    </span>
    </div>
    <div style="
    display: flex; flex-direction: column;
    max-width: ${styles.readableLineLength};
    ">
    <h2 style="
      padding: 0; margin: 0; 
      font-size: ${styles.textLg};
      ${styles.lineClamp(2)}
    ">
      ${title}
    </h2>
    <p style="
      color: ${styles.colorSecondary};
      font-size: ${styles.textBase};
      font-family: ${styles.fontSans};
      ${styles.lineClamp(3)}
    ">
      ${description}
    </p>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
    <span style="
      font-size: ${styles.textSm}; font-weight: ${styles.fontBold}; color: ${styles.colorSecondary};
      max-width: ${styles.contentWidth};
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    ">
      t128n.github.io/${path}
    </span>
    </div>
  </div>`;

	return markup;
}

export async function renderSvgOgImage(
	title: string,
	description: string,
	path: string,
) {
	const fontPaths = {
		sfMonoRegular: `${process.cwd()}/public/fonts/LigaSFMonoNerdFont-Regular.otf`,
		sfMonoBold: `${process.cwd()}/public/fonts/LigaSFMonoNerdFont-Bold.otf`,
		interRegular: `${process.cwd()}/public/fonts/Inter-Regular.otf`,
	};
	const [sfMonoregularFontFile, sfMonoboldFontFile, interRegularFontFile] =
		await Promise.all([
			readFile(fontPaths.sfMonoRegular),
			readFile(fontPaths.sfMonoBold),
			readFile(fontPaths.interRegular),
		]);

	const markup = await generateMarkup(title, description, path);
	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "SF Mono",
				data: sfMonoregularFontFile,
				style: "normal",
				weight: 400,
			},
			{
				name: "SF Mono",
				data: sfMonoboldFontFile,
				style: "normal",
				weight: 700,
			},
			{
				name: "Inter",
				data: interRegularFontFile,
				style: "normal",
				weight: 400,
			},
		],
	});

	return svg;
}

export async function generateOgImageResponse(
	title: string,
	description: string,
	path: string,
) {
	const svg = await renderSvgOgImage(title, description, path);
	const png = sharp(Buffer.from(svg)).png();
	const response = await png.toBuffer();

	return new Response(response, {
		headers: {
			"Content-Type": "image/png",
		},
	});
}

/**
 * Generates a valid Open Graph image URL for a given site and pathname.
 * Ensures no double slashes, and uses /index/og-image.png for the root path.
 *
 * @param {string | URL | undefined} site - The base site URL (with or without trailing slash). Can be a string, URL, or undefined.
 * @param {string} pathname - The pathname of the current route (should start with '/').
 * @returns {string} The absolute URL to the og-image.png for the given route.
 *
 * @example
 * getOgImageUrl('https://t128n.github.io/', '/') // 'https://t128n.github.io/index/og-image.png'
 * getOgImageUrl('https://t128n.github.io/', '/about/') // 'https://t128n.github.io/about/og-image.png'
 * getOgImageUrl(new URL('https://t128n.github.io/'), '/blog/') // 'https://t128n.github.io/blog/og-image.png'
 */
export function getOgImageUrl(
	site: string | URL | undefined,
	pathname: string,
): string {
	// Return empty string if no site is provided
	if (!site) return "";

	// Remove trailing slash from the site URL (string or URL)
	const base =
		typeof site === "string"
			? site.replace(/\/$/, "")
			: site.href.replace(/\/$/, "");

	// Remove trailing slash from the pathname (except for root)
	const cleanPath = pathname.replace(/\/$/, "");

	// Special case: root path should use /index/og-image.png
	if (pathname === "/") {
		return `${base}/index/og-image.png`;
	}

	// All other paths: /{path}/og-image.png
	return `${base}${cleanPath}/og-image.png`;
}