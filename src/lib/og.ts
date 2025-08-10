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
		background: "#ffffff",
		color: "#000000",
		colorSecondary: "#606060",
		fontRegular: "400",
		fontBold: "700",
		fontMono: "'JetBrains Mono', monospace",
		textSm: "22px",
		textBase: "28px",
		textLg: "42px",
		textXl: "52px",
		contentWidth: "2172px",
		readableLineLength: "1080px",
		contentPadding: "64px",
		border: "1px solid #000000",
		lineClamp: (maxLines: number) =>
			`overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical;`,
	};

	const markup = html`
  <div
    style="
    height: 100%; width: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
    background-color: ${styles.background};
    color: ${styles.color};
    padding: ${styles.contentPadding};
    font-family: ${styles.fontMono};
    font-weight: ${styles.fontRegular};
    "
  >
    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;">
      <div style="display: flex; flex-direction: row; align-items: center;">
        <span style="font-size: ${styles.textLg}; font-weight: ${styles.fontBold};">[t128n]</span>
      </div>
      <span style="font-size: ${styles.textSm}; color: ${styles.colorSecondary};">
        Torben Haack
      </span>
    </div>
    
    <div style="
      display: flex; flex-direction: column;
      max-width: ${styles.readableLineLength};
    ">
      <h1 style="
        padding: 0; margin: 0; 
        font-size: ${styles.textLg};
        font-weight: ${styles.fontBold};
        line-height: 1.2;
      ">
        ${title}
      </h1>
      <p style="
        color: ${styles.colorSecondary};
        font-size: ${styles.textBase};
        font-weight: ${styles.fontRegular};
        line-height: 1.4;
        margin-top: 16px;
      ">
        ${description}
      </p>
    </div>
    
    <div style="display: flex; flex-direction: row; justify-content: flex-start;">
      <span style="
        font-size: ${styles.textSm}; 
        color: ${styles.colorSecondary};
        font-weight: ${styles.fontRegular};
      ">
        t128n.github.io${path === "index" ? "" : "/" + path}
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
		jetbrainsMonoRegular: `${process.cwd()}/public/fonts/JetBrainsMono-Regular.ttf`,
		jetbrainsMonoBold: `${process.cwd()}/public/fonts/JetBrainsMono-Bold.ttf`,
	};
	const [jetbrainsMonoRegularFile, jetbrainsMonoBoldFile] = await Promise.all([
		readFile(fontPaths.jetbrainsMonoRegular),
		readFile(fontPaths.jetbrainsMonoBold),
	]);

	const markup = await generateMarkup(title, description, path);
	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "JetBrains Mono",
				data: jetbrainsMonoRegularFile,
				style: "normal",
				weight: 400,
			},
			{
				name: "JetBrains Mono",
				data: jetbrainsMonoBoldFile,
				style: "normal",
				weight: 700,
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
