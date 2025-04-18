import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";

const STORAGE_KEY = "code-snippets";
const LANGUAGES = [
	{ value: "plaintext", label: "Plaintext" },
	{ value: "1c", label: "1c" },
	{ value: "1c-query", label: "1cQuery" },
	{ value: "abap", label: "Abap" },
	{ value: "actionscript-3", label: "Actionscript3" },
	{ value: "ada", label: "Ada" },
	{ value: "adoc", label: "Adoc" },
	{ value: "angular-html", label: "AngularHtml" },
	{ value: "angular-ts", label: "AngularTs" },
	{ value: "apache", label: "Apache" },
	{ value: "apex", label: "Apex" },
	{ value: "apl", label: "Apl" },
	{ value: "applescript", label: "Applescript" },
	{ value: "ara", label: "Ara" },
	{ value: "asciidoc", label: "Asciidoc" },
	{ value: "asm", label: "Asm" },
	{ value: "astro", label: "Astro" },
	{ value: "awk", label: "Awk" },
	{ value: "ballerina", label: "Ballerina" },
	{ value: "bash", label: "Bash" },
	{ value: "bat", label: "Bat" },
	{ value: "batch", label: "Batch" },
	{ value: "be", label: "Be" },
	{ value: "beancount", label: "Beancount" },
	{ value: "berry", label: "Berry" },
	{ value: "bibtex", label: "Bibtex" },
	{ value: "bicep", label: "Bicep" },
	{ value: "blade", label: "Blade" },
	{ value: "bsl", label: "Bsl" },
	{ value: "c", label: "C" },
	{ value: "c#", label: "C#" },
	{ value: "c++", label: "C++" },
	{ value: "cadence", label: "Cadence" },
	{ value: "cairo", label: "Cairo" },
	{ value: "cdc", label: "Cdc" },
	{ value: "clarity", label: "Clarity" },
	{ value: "clj", label: "Clj" },
	{ value: "clojure", label: "Clojure" },
	{ value: "closure-templates", label: "ClosureTemplates" },
	{ value: "cmake", label: "Cmake" },
	{ value: "cmd", label: "Cmd" },
	{ value: "cobol", label: "Cobol" },
	{ value: "codeowners", label: "Codeowners" },
	{ value: "codeql", label: "Codeql" },
	{ value: "coffee", label: "Coffee" },
	{ value: "coffeescript", label: "Coffeescript" },
	{ value: "common-lisp", label: "CommonLisp" },
	{ value: "console", label: "Console" },
	{ value: "coq", label: "Coq" },
	{ value: "cpp", label: "Cpp" },
	{ value: "cql", label: "Cql" },
	{ value: "crystal", label: "Crystal" },
	{ value: "cs", label: "Cs" },
	{ value: "csharp", label: "Csharp" },
	{ value: "css", label: "Css" },
	{ value: "csv", label: "Csv" },
	{ value: "cue", label: "Cue" },
	{ value: "cypher", label: "Cypher" },
	{ value: "d", label: "D" },
	{ value: "dart", label: "Dart" },
	{ value: "dax", label: "Dax" },
	{ value: "desktop", label: "Desktop" },
	{ value: "diff", label: "Diff" },
	{ value: "docker", label: "Docker" },
	{ value: "dockerfile", label: "Dockerfile" },
	{ value: "dotenv", label: "Dotenv" },
	{ value: "dream-maker", label: "DreamMaker" },
	{ value: "edge", label: "Edge" },
	{ value: "elisp", label: "Elisp" },
	{ value: "elixir", label: "Elixir" },
	{ value: "elm", label: "Elm" },
	{ value: "emacs-lisp", label: "EmacsLisp" },
	{ value: "erb", label: "Erb" },
	{ value: "erl", label: "Erl" },
	{ value: "erlang", label: "Erlang" },
	{ value: "f", label: "F" },
	{ value: "f#", label: "F#" },
	{ value: "f03", label: "F03" },
	{ value: "f08", label: "F08" },
	{ value: "f18", label: "F18" },
	{ value: "f77", label: "F77" },
	{ value: "f90", label: "F90" },
	{ value: "f95", label: "F95" },
	{ value: "fennel", label: "Fennel" },
	{ value: "fish", label: "Fish" },
	{ value: "fluent", label: "Fluent" },
	{ value: "for", label: "For" },
	{ value: "fortran-fixed-form", label: "FortranFixedForm" },
	{ value: "fortran-free-form", label: "FortranFreeForm" },
	{ value: "fs", label: "Fs" },
	{ value: "fsharp", label: "Fsharp" },
	{ value: "fsl", label: "Fsl" },
	{ value: "ftl", label: "Ftl" },
	{ value: "gdresource", label: "Gdresource" },
	{ value: "gdscript", label: "Gdscript" },
	{ value: "gdshader", label: "Gdshader" },
	{ value: "genie", label: "Genie" },
	{ value: "gherkin", label: "Gherkin" },
	{ value: "git-commit", label: "GitCommit" },
	{ value: "git-rebase", label: "GitRebase" },
	{ value: "gjs", label: "Gjs" },
	{ value: "gleam", label: "Gleam" },
	{ value: "glimmer-js", label: "GlimmerJs" },
	{ value: "glimmer-ts", label: "GlimmerTs" },
	{ value: "glsl", label: "Glsl" },
	{ value: "gnuplot", label: "Gnuplot" },
	{ value: "go", label: "Go" },
	{ value: "gql", label: "Gql" },
	{ value: "graphql", label: "Graphql" },
	{ value: "groovy", label: "Groovy" },
	{ value: "gts", label: "Gts" },
	{ value: "hack", label: "Hack" },
	{ value: "haml", label: "Haml" },
	{ value: "handlebars", label: "Handlebars" },
	{ value: "haskell", label: "Haskell" },
	{ value: "haxe", label: "Haxe" },
	{ value: "hbs", label: "Hbs" },
	{ value: "hcl", label: "Hcl" },
	{ value: "hjson", label: "Hjson" },
	{ value: "hlsl", label: "Hlsl" },
	{ value: "hs", label: "Hs" },
	{ value: "html", label: "Html" },
	{ value: "html-derivative", label: "HtmlDerivative" },
	{ value: "http", label: "Http" },
	{ value: "hxml", label: "Hxml" },
	{ value: "hy", label: "Hy" },
	{ value: "imba", label: "Imba" },
	{ value: "ini", label: "Ini" },
	{ value: "jade", label: "Jade" },
	{ value: "java", label: "Java" },
	{ value: "javascript", label: "Javascript" },
	{ value: "jinja", label: "Jinja" },
	{ value: "jison", label: "Jison" },
	{ value: "jl", label: "Jl" },
	{ value: "js", label: "Js" },
	{ value: "json", label: "Json" },
	{ value: "json5", label: "Json5" },
	{ value: "jsonc", label: "Jsonc" },
	{ value: "jsonl", label: "Jsonl" },
	{ value: "jsonnet", label: "Jsonnet" },
	{ value: "jssm", label: "Jssm" },
	{ value: "jsx", label: "Jsx" },
	{ value: "julia", label: "Julia" },
	{ value: "kotlin", label: "Kotlin" },
	{ value: "kql", label: "Kql" },
	{ value: "kt", label: "Kt" },
	{ value: "kts", label: "Kts" },
	{ value: "kusto", label: "Kusto" },
	{ value: "latex", label: "Latex" },
	{ value: "lean", label: "Lean" },
	{ value: "lean4", label: "Lean4" },
	{ value: "less", label: "Less" },
	{ value: "liquid", label: "Liquid" },
	{ value: "lisp", label: "Lisp" },
	{ value: "lit", label: "Lit" },
	{ value: "llvm", label: "Llvm" },
	{ value: "log", label: "Log" },
	{ value: "logo", label: "Logo" },
	{ value: "lua", label: "Lua" },
	{ value: "luau", label: "Luau" },
	{ value: "make", label: "Make" },
	{ value: "makefile", label: "Makefile" },
	{ value: "markdown", label: "Markdown" },
	{ value: "marko", label: "Marko" },
	{ value: "matlab", label: "Matlab" },
	{ value: "md", label: "Md" },
	{ value: "mdc", label: "Mdc" },
	{ value: "mdx", label: "Mdx" },
	{ value: "mediawiki", label: "Mediawiki" },
	{ value: "mermaid", label: "Mermaid" },
	{ value: "mips", label: "Mips" },
	{ value: "mipsasm", label: "Mipsasm" },
	{ value: "mmd", label: "Mmd" },
	{ value: "mojo", label: "Mojo" },
	{ value: "move", label: "Move" },
	{ value: "nar", label: "Nar" },
	{ value: "narrat", label: "Narrat" },
	{ value: "nextflow", label: "Nextflow" },
	{ value: "nf", label: "Nf" },
	{ value: "nginx", label: "Nginx" },
	{ value: "nim", label: "Nim" },
	{ value: "nix", label: "Nix" },
	{ value: "nu", label: "Nu" },
	{ value: "nushell", label: "Nushell" },
	{ value: "objc", label: "Objc" },
	{ value: "objective-c", label: "ObjectiveC" },
	{ value: "objective-cpp", label: "ObjectiveCpp" },
	{ value: "ocaml", label: "Ocaml" },
	{ value: "pascal", label: "Pascal" },
	{ value: "perl", label: "Perl" },
	{ value: "perl6", label: "Perl6" },
	{ value: "php", label: "Php" },
	{ value: "plsql", label: "Plsql" },
	{ value: "po", label: "Po" },
	{ value: "polar", label: "Polar" },
	{ value: "postcss", label: "Postcss" },
	{ value: "pot", label: "Pot" },
	{ value: "potx", label: "Potx" },
	{ value: "powerquery", label: "Powerquery" },
	{ value: "powershell", label: "Powershell" },
	{ value: "prisma", label: "Prisma" },
	{ value: "prolog", label: "Prolog" },
	{ value: "properties", label: "Properties" },
	{ value: "proto", label: "Proto" },
	{ value: "protobuf", label: "Protobuf" },
	{ value: "ps", label: "Ps" },
	{ value: "ps1", label: "Ps1" },
	{ value: "pug", label: "Pug" },
	{ value: "puppet", label: "Puppet" },
	{ value: "purescript", label: "Purescript" },
	{ value: "py", label: "Py" },
	{ value: "python", label: "Python" },
	{ value: "ql", label: "Ql" },
	{ value: "qml", label: "Qml" },
	{ value: "qmldir", label: "Qmldir" },
	{ value: "qss", label: "Qss" },
	{ value: "r", label: "R" },
	{ value: "racket", label: "Racket" },
	{ value: "raku", label: "Raku" },
	{ value: "razor", label: "Razor" },
	{ value: "rb", label: "Rb" },
	{ value: "reg", label: "Reg" },
	{ value: "regex", label: "Regex" },
	{ value: "regexp", label: "Regexp" },
	{ value: "rel", label: "Rel" },
	{ value: "riscv", label: "Riscv" },
	{ value: "rs", label: "Rs" },
	{ value: "rst", label: "Rst" },
	{ value: "ruby", label: "Ruby" },
	{ value: "rust", label: "Rust" },
	{ value: "sas", label: "Sas" },
	{ value: "sass", label: "Sass" },
	{ value: "scala", label: "Scala" },
	{ value: "scheme", label: "Scheme" },
	{ value: "scss", label: "Scss" },
	{ value: "sdbl", label: "Sdbl" },
	{ value: "sh", label: "Sh" },
	{ value: "shader", label: "Shader" },
	{ value: "shaderlab", label: "Shaderlab" },
	{ value: "shell", label: "Shell" },
	{ value: "shellscript", label: "Shellscript" },
	{ value: "shellsession", label: "Shellsession" },
	{ value: "smalltalk", label: "Smalltalk" },
	{ value: "solidity", label: "Solidity" },
	{ value: "soy", label: "Soy" },
	{ value: "sparql", label: "Sparql" },
	{ value: "spl", label: "Spl" },
	{ value: "splunk", label: "Splunk" },
	{ value: "sql", label: "Sql" },
	{ value: "ssh-config", label: "SshConfig" },
	{ value: "stata", label: "Stata" },
	{ value: "styl", label: "Styl" },
	{ value: "stylus", label: "Stylus" },
	{ value: "svelte", label: "Svelte" },
	{ value: "swift", label: "Swift" },
	{ value: "system-verilog", label: "SystemVerilog" },
	{ value: "systemd", label: "Systemd" },
	{ value: "talon", label: "Talon" },
	{ value: "talonscript", label: "Talonscript" },
	{ value: "tasl", label: "Tasl" },
	{ value: "tcl", label: "Tcl" },
	{ value: "templ", label: "Templ" },
	{ value: "terraform", label: "Terraform" },
	{ value: "tex", label: "Tex" },
	{ value: "tf", label: "Tf" },
	{ value: "tfvars", label: "Tfvars" },
	{ value: "toml", label: "Toml" },
	{ value: "ts", label: "Ts" },
	{ value: "ts-tags", label: "TsTags" },
	{ value: "tsp", label: "Tsp" },
	{ value: "tsv", label: "Tsv" },
	{ value: "tsx", label: "Tsx" },
	{ value: "turtle", label: "Turtle" },
	{ value: "twig", label: "Twig" },
	{ value: "typ", label: "Typ" },
	{ value: "typescript", label: "Typescript" },
	{ value: "typespec", label: "Typespec" },
	{ value: "typst", label: "Typst" },
	{ value: "v", label: "V" },
	{ value: "vala", label: "Vala" },
	{ value: "vb", label: "Vb" },
	{ value: "verilog", label: "Verilog" },
	{ value: "vhdl", label: "Vhdl" },
	{ value: "vim", label: "Vim" },
	{ value: "viml", label: "Viml" },
	{ value: "vimscript", label: "Vimscript" },
	{ value: "vue", label: "Vue" },
	{ value: "vue-html", label: "VueHtml" },
	{ value: "vy", label: "Vy" },
	{ value: "vyper", label: "Vyper" },
	{ value: "wasm", label: "Wasm" },
	{ value: "wenyan", label: "Wenyan" },
	{ value: "wgsl", label: "Wgsl" },
	{ value: "wiki", label: "Wiki" },
	{ value: "wikitext", label: "Wikitext" },
	{ value: "wit", label: "Wit" },
	{ value: "wl", label: "Wl" },
	{ value: "wolfram", label: "Wolfram" },
	{ value: "xml", label: "Xml" },
	{ value: "xsl", label: "Xsl" },
	{ value: "yaml", label: "Yaml" },
	{ value: "yml", label: "Yml" },
	{ value: "zenscript", label: "Zenscript" },
	{ value: "zig", label: "Zig" },
	{ value: "zsh", label: "Zsh" },
	{ value: "文言", label: "文言" },
];

interface Snippet {
	id: string;
	title: string;
	lang: (typeof LANGUAGES)[number]["value"];
	code: string;
}

interface HighlightProps {
	children: ReactNode;
}

export function SnippetsApp() {
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [lang, setLang] = useState<(typeof LANGUAGES)[number]["value"]>("ts");
	const [title, setTitle] = useState("");
	const [code, setCode] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);

	const searchInputRef = useRef<HTMLInputElement>(null);
	const codeInputRef = useRef<HTMLTextAreaElement>(null);

	// Load snippets from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				setSnippets(JSON.parse(stored));
			} catch (error) {
				console.error("Failed to parse stored snippets:", error);
			}
		}
	}, []);

	// Save snippets to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
	}, [snippets]);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Allow Ctrl+Enter in inputs to save
			if (e.ctrlKey && e.key === "Enter") {
				e.preventDefault();
				if (code.trim() && title.trim()) {
					const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
					handleSave(fakeEvent);
				}
				return;
			}

			// Don't trigger other shortcuts if user is typing in a textarea
			if (e.target instanceof HTMLTextAreaElement) {
				return;
			}

			// For title input, allow shortcuts but prevent "/" from being typed
			if (e.target instanceof HTMLInputElement) {
				if (e.key === "/") {
					e.preventDefault();
				}
				return;
			}

			// Global shortcuts
			switch (e.key) {
				case "/": {
					e.preventDefault();
					searchInputRef.current?.focus();
					break;
				}
				case "n": {
					e.preventDefault();
					codeInputRef.current?.focus();
					break;
				}
				case "Escape": {
					e.preventDefault();
					if (editingId) {
						handleCancel();
					} else {
						if (document.activeElement instanceof HTMLElement) {
							document.activeElement.blur();
						}
					}
					break;
				}
				case "Delete":
				case "Backspace": {
					// Only handle delete if a snippet is focused
					const focusedSnippet =
						document.activeElement?.closest("[data-snippet-id]");
					if (focusedSnippet) {
						e.preventDefault();
						const snippetId = focusedSnippet.getAttribute("data-snippet-id");
						if (snippetId) handleDelete(snippetId);
					}
					break;
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [editingId, code, title]);

	const handleTabInTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Tab") {
			e.preventDefault();

			const textarea = e.currentTarget;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const value = textarea.value;

			if (e.shiftKey) {
				// Handle Shift+Tab to remove indent
				const beforeCursor = value.substring(0, start);
				const lineStart = beforeCursor.lastIndexOf("\n") + 1;
				const afterCursor = value.substring(end);
				const nextNewline = afterCursor.indexOf("\n");
				const lineEnd = nextNewline >= 0 ? end + nextNewline : value.length;
				const currentLine = value.substring(lineStart, lineEnd);

				if (currentLine.startsWith("\t")) {
					// Remove one tab from the beginning of the line
					const newValue = `${value.substring(0, lineStart)}${currentLine.substring(1)}${value.substring(lineEnd)}`;

					setCode(newValue);

					// Adjust cursor position
					const newCursorPos = Math.max(start - 1, lineStart);
					setTimeout(() => {
						textarea.selectionStart = textarea.selectionEnd = newCursorPos;
					}, 0);
				}
			} else {
				// Handle normal Tab to add indent
				const beforeCursor = value.substring(0, start);
				const afterCursor = value.substring(end);
				const newValue = `${beforeCursor}\t${afterCursor}`;
				setCode(newValue);

				setTimeout(() => {
					textarea.selectionStart = textarea.selectionEnd = start + 1;
				}, 0);
			}
		}
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();

		if (!code.trim() || !title.trim()) return;

		if (editingId !== null) {
			// Update existing snippet
			setSnippets(
				snippets.map((s) =>
					s.id === editingId ? { ...s, title, lang, code } : s,
				),
			);
			setEditingId(null);
		} else {
			// Add new snippet
			setSnippets([
				{ id: crypto.randomUUID(), title, lang, code },
				...snippets,
			]);
		}

		setCode("");
		setTitle("");
		setLang("ts");

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
		} catch (error) {
			console.error("Failed to save snippets:", error);
			alert("Failed to save snippet. Please try again.");
		}
	};

	const handleEdit = (id: string) => {
		const snippet = snippets.find((s) => s.id === id);
		if (snippet) {
			setTitle(snippet.title);
			setCode(snippet.code);
			setLang(snippet.lang);
			setEditingId(id);
		}
	};

	const handleDelete = (id: string) => {
		setSnippets(snippets.filter((s) => s.id !== id));

		if (editingId === id) {
			setEditingId(null);
			setCode("");
			setTitle("");
			setLang("ts");
		}
	};

	const handleCancel = () => {
		setEditingId(null);
		setCode("");
		setTitle("");
		setLang("ts");
	};

	const handleCopySnippet = (code: string) => {
		navigator.clipboard.writeText(code).catch(console.error);
	};

	const handleExportJson = () => {
		const dataStr = JSON.stringify(snippets, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "snippets.json";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const content = e.target?.result as string;
				const imported = JSON.parse(content);

				// Validate imported data structure
				if (
					Array.isArray(imported) &&
					imported.every(
						(item) =>
							typeof item === "object" &&
							typeof item.id === "string" &&
							typeof item.title === "string" &&
							typeof item.code === "string" &&
							typeof item.lang === "string",
					)
				) {
					setSnippets([...imported, ...snippets]);
				} else {
					alert(
						"Invalid file format. Please import a valid snippets JSON file.",
					);
				}
			} catch (error) {
				console.error("Failed to parse JSON:", error);
				alert(
					"Failed to import snippets. Please make sure the file is valid JSON.",
				);
			}
		};
		reader.readAsText(file);
		event.target.value = ""; // Reset input for repeated imports
	};

	// Filter snippets based on search query using microfuzz
	const filteredSnippets = useFuzzySearchList({
		list: snippets,
		queryText: searchQuery,
		getText: (snippet) => [snippet.title, snippet.code, snippet.lang],
		mapResultItem: ({
			item,
			matches: [titleMatches, codeMatches, langMatches],
		}) => ({
			...item,
			titleMatches,
			codeMatches,
			langMatches,
		}),
	});

	return (
		<div className="w-dvw h-dvh flex flex-col font-mono border-stone-100">
			<header className="border-b-2 border-black py-4 px-8 flex flex-row justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">snippets</h1>
				<div className="flex items-center gap-8">
					<div className="text-xs text-black/50 mt-1">
						<kbd className="px-1 py-0.5 bg-black/5 rounded">Ctrl + Enter</kbd>{" "}
						save
						<span className="mx-2">·</span>
						<kbd className="px-1 py-0.5 bg-black/5 rounded">/</kbd> search
						<span className="mx-2">·</span>
						<kbd className="px-1 py-0.5 bg-black/5 rounded">n</kbd> new
						<span className="mx-2">·</span>
						<kbd className="px-1 py-0.5 bg-black/5 rounded">Esc</kbd> cancel
						<span className="mx-2">·</span>
						<kbd className="px-1 py-0.5 bg-black/5 rounded">Del</kbd> delete
					</div>
					<div className="flex gap-2">
						<input
							type="file"
							accept=".json"
							onChange={handleImportJson}
							className="hidden"
							id="import-json"
						/>
						<label
							htmlFor="import-json"
							className="px-2 py-1 text-xs border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase cursor-pointer"
						>
							Import JSON
						</label>
						<button
							type="button"
							onClick={handleExportJson}
							className="px-2 py-1 text-xs border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase"
						>
							Export JSON
						</button>
					</div>
				</div>
			</header>

			<main className="flex-1 flex flex-col gap-6 p-8 overflow-y-auto">
				<form
					onSubmit={handleSave}
					className="w-full p-6 flex flex-col gap-4 bg-white border-2 border-black"
				>
					<div className="flex gap-2 items-end">
						<div className="flex flex-col flex-1">
							<span>TITLE</span>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="ENTER A TITLE..."
								className="px-3 py-2 bg-white border-2 border-black font-mono"
								required
							/>
						</div>
						<div className="flex flex-col">
							<span>LANGUAGE</span>
							<select
								value={lang}
								onChange={(e) => setLang(e.target.value)}
								className="w-40 px-3 py-2 bg-white border-2 border-black uppercase font-mono hover:bg-black hover:text-white cursor-pointer"
							>
								{LANGUAGES.map((l) => (
									<option key={l.value} value={l.value}>
										{l.label.toUpperCase()}
									</option>
								))}
							</select>
						</div>
						<div className="flex gap-2">
							<button
								type="submit"
								disabled={!code.trim() || !title.trim()}
								className="px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold"
							>
								{editingId !== null ? "Update" : "Save"}
							</button>

							{editingId !== null && (
								<button
									type="button"
									onClick={handleCancel}
									className="px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase font-bold"
								>
									Cancel
								</button>
							)}
						</div>
					</div>

					<textarea
						ref={codeInputRef}
						rows={6}
						value={code}
						onChange={(e) => setCode(e.target.value)}
						onKeyDown={handleTabInTextarea}
						placeholder="PASTE YOUR SNIPPET HERE..."
						className="w-full p-3 font-mono border-2 border-black resize-none focus:outline-black"
					/>
				</form>

				<div className="flex flex-col gap-4 w-full">
					<input
						ref={searchInputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search snippets..."
						className="w-full px-4 py-2 border-2 border-black focus:outline-black font-mono"
					/>

					<div className="flex flex-wrap flex-row gap-6 w-full">
						{filteredSnippets.map((snippet) => (
							<article
								key={snippet.id}
								data-snippet-id={snippet.id}
								aria-label={`Code snippet: ${snippet.title}`}
								className="bg-white border-2 border-black flex flex-col w-full outline-none focus-within:ring-2 focus-within:ring-black"
							>
								<div className="flex justify-between gap-2 p-2 border-b-2 border-black px-4 py-2">
									<div className="flex gap-4 items-center">
										<span className="font-bold">
											<Highlight
												text={snippet.title}
												ranges={snippet.titleMatches || []}
											/>
										</span>
										<span className="text-black/50">
											<Highlight
												text={snippet.lang}
												ranges={snippet.langMatches || []}
											/>
										</span>
									</div>
									<section className="flex gap-4">
										<button
											type="button"
											onClick={() => handleCopySnippet(snippet.code)}
											className="px-2 py-1 text-xs border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase"
											title="Copy snippet"
										>
											Copy
										</button>
										<button
											type="button"
											onClick={() => handleEdit(snippet.id)}
											className="px-2 py-1 text-xs border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase"
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() => handleDelete(snippet.id)}
											className="px-2 py-1 text-xs border-2 border-black bg-white text-black hover:bg-black hover:text-white uppercase"
										>
											Delete
										</button>
									</section>
								</div>
								<div className="overflow-x-auto">
									<pre
										// biome-ignore lint/a11y/noNoninteractiveTabindex: Disabled because it is needed for keyboard navigation
										tabIndex={0}
										className="py-2 px-4 bg-black text-white w-fit min-w-full cursor-pointer"
										onClick={(e) => {
											const selection = window.getSelection();
											const range = document.createRange();
											range.selectNodeContents(e.currentTarget);
											selection?.removeAllRanges();
											selection?.addRange(range);
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												const selection = window.getSelection();
												const range = document.createRange();
												range.selectNodeContents(e.currentTarget);
												selection?.removeAllRanges();
												selection?.addRange(range);
											}
										}}
									>
										<code>
											<Highlight
												text={snippet.code}
												ranges={snippet.codeMatches || []}
											/>
										</code>
									</pre>
								</div>
							</article>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
