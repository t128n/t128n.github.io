import title from "title";

export default (text: string): string => {
	return title(text, {
		special: ["t128n", "AP2", "AI", "github.io"],
	});
};
