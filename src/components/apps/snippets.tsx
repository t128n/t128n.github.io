import { useState, useEffect, useRef } from "react";
import type { BundledLanguage } from "shiki";

const STORAGE_KEY = "code-snippets";
const LANGUAGES = [
	{ value: "plaintext", label: "Plaintext" },
	{ value: "1c" as BundledLanguage, label: "1c" },
	{ value: "1c-query" as BundledLanguage, label: "1cQuery" },
	{ value: "abap" as BundledLanguage, label: "Abap" },
	{ value: "actionscript-3" as BundledLanguage, label: "Actionscript3" },
	{ value: "ada" as BundledLanguage, label: "Ada" },
	{ value: "adoc" as BundledLanguage, label: "Adoc" },
	{ value: "angular-html" as BundledLanguage, label: "AngularHtml" },
	{ value: "angular-ts" as BundledLanguage, label: "AngularTs" },
	{ value: "apache" as BundledLanguage, label: "Apache" },
	{ value: "apex" as BundledLanguage, label: "Apex" },
	{ value: "apl" as BundledLanguage, label: "Apl" },
	{ value: "applescript" as BundledLanguage, label: "Applescript" },
	{ value: "ara" as BundledLanguage, label: "Ara" },
	{ value: "asciidoc" as BundledLanguage, label: "Asciidoc" },
	{ value: "asm" as BundledLanguage, label: "Asm" },
	{ value: "astro" as BundledLanguage, label: "Astro" },
	{ value: "awk" as BundledLanguage, label: "Awk" },
	{ value: "ballerina" as BundledLanguage, label: "Ballerina" },
	{ value: "bash" as BundledLanguage, label: "Bash" },
	{ value: "bat" as BundledLanguage, label: "Bat" },
	{ value: "batch" as BundledLanguage, label: "Batch" },
	{ value: "be" as BundledLanguage, label: "Be" },
	{ value: "beancount" as BundledLanguage, label: "Beancount" },
	{ value: "berry" as BundledLanguage, label: "Berry" },
	{ value: "bibtex" as BundledLanguage, label: "Bibtex" },
	{ value: "bicep" as BundledLanguage, label: "Bicep" },
	{ value: "blade" as BundledLanguage, label: "Blade" },
	{ value: "bsl" as BundledLanguage, label: "Bsl" },
	{ value: "c" as BundledLanguage, label: "C" },
	{ value: "c#" as BundledLanguage, label: "C#" },
	{ value: "c++" as BundledLanguage, label: "C++" },
	{ value: "cadence" as BundledLanguage, label: "Cadence" },
	{ value: "cairo" as BundledLanguage, label: "Cairo" },
	{ value: "cdc" as BundledLanguage, label: "Cdc" },
	{ value: "clarity" as BundledLanguage, label: "Clarity" },
	{ value: "clj" as BundledLanguage, label: "Clj" },
	{ value: "clojure" as BundledLanguage, label: "Clojure" },
	{ value: "closure-templates" as BundledLanguage, label: "ClosureTemplates" },
	{ value: "cmake" as BundledLanguage, label: "Cmake" },
	{ value: "cmd" as BundledLanguage, label: "Cmd" },
	{ value: "cobol" as BundledLanguage, label: "Cobol" },
	{ value: "codeowners" as BundledLanguage, label: "Codeowners" },
	{ value: "codeql" as BundledLanguage, label: "Codeql" },
	{ value: "coffee" as BundledLanguage, label: "Coffee" },
	{ value: "coffeescript" as BundledLanguage, label: "Coffeescript" },
	{ value: "common-lisp" as BundledLanguage, label: "CommonLisp" },
	{ value: "console" as BundledLanguage, label: "Console" },
	{ value: "coq" as BundledLanguage, label: "Coq" },
	{ value: "cpp" as BundledLanguage, label: "Cpp" },
	{ value: "cql" as BundledLanguage, label: "Cql" },
	{ value: "crystal" as BundledLanguage, label: "Crystal" },
	{ value: "cs" as BundledLanguage, label: "Cs" },
	{ value: "csharp" as BundledLanguage, label: "Csharp" },
	{ value: "css" as BundledLanguage, label: "Css" },
	{ value: "csv" as BundledLanguage, label: "Csv" },
	{ value: "cue" as BundledLanguage, label: "Cue" },
	{ value: "cypher" as BundledLanguage, label: "Cypher" },
	{ value: "d" as BundledLanguage, label: "D" },
	{ value: "dart" as BundledLanguage, label: "Dart" },
	{ value: "dax" as BundledLanguage, label: "Dax" },
	{ value: "desktop" as BundledLanguage, label: "Desktop" },
	{ value: "diff" as BundledLanguage, label: "Diff" },
	{ value: "docker" as BundledLanguage, label: "Docker" },
	{ value: "dockerfile" as BundledLanguage, label: "Dockerfile" },
	{ value: "dotenv" as BundledLanguage, label: "Dotenv" },
	{ value: "dream-maker" as BundledLanguage, label: "DreamMaker" },
	{ value: "edge" as BundledLanguage, label: "Edge" },
	{ value: "elisp" as BundledLanguage, label: "Elisp" },
	{ value: "elixir" as BundledLanguage, label: "Elixir" },
	{ value: "elm" as BundledLanguage, label: "Elm" },
	{ value: "emacs-lisp" as BundledLanguage, label: "EmacsLisp" },
	{ value: "erb" as BundledLanguage, label: "Erb" },
	{ value: "erl" as BundledLanguage, label: "Erl" },
	{ value: "erlang" as BundledLanguage, label: "Erlang" },
	{ value: "f" as BundledLanguage, label: "F" },
	{ value: "f#" as BundledLanguage, label: "F#" },
	{ value: "f03" as BundledLanguage, label: "F03" },
	{ value: "f08" as BundledLanguage, label: "F08" },
	{ value: "f18" as BundledLanguage, label: "F18" },
	{ value: "f77" as BundledLanguage, label: "F77" },
	{ value: "f90" as BundledLanguage, label: "F90" },
	{ value: "f95" as BundledLanguage, label: "F95" },
	{ value: "fennel" as BundledLanguage, label: "Fennel" },
	{ value: "fish" as BundledLanguage, label: "Fish" },
	{ value: "fluent" as BundledLanguage, label: "Fluent" },
	{ value: "for" as BundledLanguage, label: "For" },
	{ value: "fortran-fixed-form" as BundledLanguage, label: "FortranFixedForm" },
	{ value: "fortran-free-form" as BundledLanguage, label: "FortranFreeForm" },
	{ value: "fs" as BundledLanguage, label: "Fs" },
	{ value: "fsharp" as BundledLanguage, label: "Fsharp" },
	{ value: "fsl" as BundledLanguage, label: "Fsl" },
	{ value: "ftl" as BundledLanguage, label: "Ftl" },
	{ value: "gdresource" as BundledLanguage, label: "Gdresource" },
	{ value: "gdscript" as BundledLanguage, label: "Gdscript" },
	{ value: "gdshader" as BundledLanguage, label: "Gdshader" },
	{ value: "genie" as BundledLanguage, label: "Genie" },
	{ value: "gherkin" as BundledLanguage, label: "Gherkin" },
	{ value: "git-commit" as BundledLanguage, label: "GitCommit" },
	{ value: "git-rebase" as BundledLanguage, label: "GitRebase" },
	{ value: "gjs" as BundledLanguage, label: "Gjs" },
	{ value: "gleam" as BundledLanguage, label: "Gleam" },
	{ value: "glimmer-js" as BundledLanguage, label: "GlimmerJs" },
	{ value: "glimmer-ts" as BundledLanguage, label: "GlimmerTs" },
	{ value: "glsl" as BundledLanguage, label: "Glsl" },
	{ value: "gnuplot" as BundledLanguage, label: "Gnuplot" },
	{ value: "go" as BundledLanguage, label: "Go" },
	{ value: "gql" as BundledLanguage, label: "Gql" },
	{ value: "graphql" as BundledLanguage, label: "Graphql" },
	{ value: "groovy" as BundledLanguage, label: "Groovy" },
	{ value: "gts" as BundledLanguage, label: "Gts" },
	{ value: "hack" as BundledLanguage, label: "Hack" },
	{ value: "haml" as BundledLanguage, label: "Haml" },
	{ value: "handlebars" as BundledLanguage, label: "Handlebars" },
	{ value: "haskell" as BundledLanguage, label: "Haskell" },
	{ value: "haxe" as BundledLanguage, label: "Haxe" },
	{ value: "hbs" as BundledLanguage, label: "Hbs" },
	{ value: "hcl" as BundledLanguage, label: "Hcl" },
	{ value: "hjson" as BundledLanguage, label: "Hjson" },
	{ value: "hlsl" as BundledLanguage, label: "Hlsl" },
	{ value: "hs" as BundledLanguage, label: "Hs" },
	{ value: "html" as BundledLanguage, label: "Html" },
	{ value: "html-derivative" as BundledLanguage, label: "HtmlDerivative" },
	{ value: "http" as BundledLanguage, label: "Http" },
	{ value: "hxml" as BundledLanguage, label: "Hxml" },
	{ value: "hy" as BundledLanguage, label: "Hy" },
	{ value: "imba" as BundledLanguage, label: "Imba" },
	{ value: "ini" as BundledLanguage, label: "Ini" },
	{ value: "jade" as BundledLanguage, label: "Jade" },
	{ value: "java" as BundledLanguage, label: "Java" },
	{ value: "javascript" as BundledLanguage, label: "Javascript" },
	{ value: "jinja" as BundledLanguage, label: "Jinja" },
	{ value: "jison" as BundledLanguage, label: "Jison" },
	{ value: "jl" as BundledLanguage, label: "Jl" },
	{ value: "js" as BundledLanguage, label: "Js" },
	{ value: "json" as BundledLanguage, label: "Json" },
	{ value: "json5" as BundledLanguage, label: "Json5" },
	{ value: "jsonc" as BundledLanguage, label: "Jsonc" },
	{ value: "jsonl" as BundledLanguage, label: "Jsonl" },
	{ value: "jsonnet" as BundledLanguage, label: "Jsonnet" },
	{ value: "jssm" as BundledLanguage, label: "Jssm" },
	{ value: "jsx" as BundledLanguage, label: "Jsx" },
	{ value: "julia" as BundledLanguage, label: "Julia" },
	{ value: "kotlin" as BundledLanguage, label: "Kotlin" },
	{ value: "kql" as BundledLanguage, label: "Kql" },
	{ value: "kt" as BundledLanguage, label: "Kt" },
	{ value: "kts" as BundledLanguage, label: "Kts" },
	{ value: "kusto" as BundledLanguage, label: "Kusto" },
	{ value: "latex" as BundledLanguage, label: "Latex" },
	{ value: "lean" as BundledLanguage, label: "Lean" },
	{ value: "lean4" as BundledLanguage, label: "Lean4" },
	{ value: "less" as BundledLanguage, label: "Less" },
	{ value: "liquid" as BundledLanguage, label: "Liquid" },
	{ value: "lisp" as BundledLanguage, label: "Lisp" },
	{ value: "lit" as BundledLanguage, label: "Lit" },
	{ value: "llvm" as BundledLanguage, label: "Llvm" },
	{ value: "log" as BundledLanguage, label: "Log" },
	{ value: "logo" as BundledLanguage, label: "Logo" },
	{ value: "lua" as BundledLanguage, label: "Lua" },
	{ value: "luau" as BundledLanguage, label: "Luau" },
	{ value: "make" as BundledLanguage, label: "Make" },
	{ value: "makefile" as BundledLanguage, label: "Makefile" },
	{ value: "markdown" as BundledLanguage, label: "Markdown" },
	{ value: "marko" as BundledLanguage, label: "Marko" },
	{ value: "matlab" as BundledLanguage, label: "Matlab" },
	{ value: "md" as BundledLanguage, label: "Md" },
	{ value: "mdc" as BundledLanguage, label: "Mdc" },
	{ value: "mdx" as BundledLanguage, label: "Mdx" },
	{ value: "mediawiki" as BundledLanguage, label: "Mediawiki" },
	{ value: "mermaid" as BundledLanguage, label: "Mermaid" },
	{ value: "mips" as BundledLanguage, label: "Mips" },
	{ value: "mipsasm" as BundledLanguage, label: "Mipsasm" },
	{ value: "mmd" as BundledLanguage, label: "Mmd" },
	{ value: "mojo" as BundledLanguage, label: "Mojo" },
	{ value: "move" as BundledLanguage, label: "Move" },
	{ value: "nar" as BundledLanguage, label: "Nar" },
	{ value: "narrat" as BundledLanguage, label: "Narrat" },
	{ value: "nextflow" as BundledLanguage, label: "Nextflow" },
	{ value: "nf" as BundledLanguage, label: "Nf" },
	{ value: "nginx" as BundledLanguage, label: "Nginx" },
	{ value: "nim" as BundledLanguage, label: "Nim" },
	{ value: "nix" as BundledLanguage, label: "Nix" },
	{ value: "nu" as BundledLanguage, label: "Nu" },
	{ value: "nushell" as BundledLanguage, label: "Nushell" },
	{ value: "objc" as BundledLanguage, label: "Objc" },
	{ value: "objective-c" as BundledLanguage, label: "ObjectiveC" },
	{ value: "objective-cpp" as BundledLanguage, label: "ObjectiveCpp" },
	{ value: "ocaml" as BundledLanguage, label: "Ocaml" },
	{ value: "pascal" as BundledLanguage, label: "Pascal" },
	{ value: "perl" as BundledLanguage, label: "Perl" },
	{ value: "perl6" as BundledLanguage, label: "Perl6" },
	{ value: "php" as BundledLanguage, label: "Php" },
	{ value: "plsql" as BundledLanguage, label: "Plsql" },
	{ value: "po" as BundledLanguage, label: "Po" },
	{ value: "polar" as BundledLanguage, label: "Polar" },
	{ value: "postcss" as BundledLanguage, label: "Postcss" },
	{ value: "pot" as BundledLanguage, label: "Pot" },
	{ value: "potx" as BundledLanguage, label: "Potx" },
	{ value: "powerquery" as BundledLanguage, label: "Powerquery" },
	{ value: "powershell" as BundledLanguage, label: "Powershell" },
	{ value: "prisma" as BundledLanguage, label: "Prisma" },
	{ value: "prolog" as BundledLanguage, label: "Prolog" },
	{ value: "properties" as BundledLanguage, label: "Properties" },
	{ value: "proto" as BundledLanguage, label: "Proto" },
	{ value: "protobuf" as BundledLanguage, label: "Protobuf" },
	{ value: "ps" as BundledLanguage, label: "Ps" },
	{ value: "ps1" as BundledLanguage, label: "Ps1" },
	{ value: "pug" as BundledLanguage, label: "Pug" },
	{ value: "puppet" as BundledLanguage, label: "Puppet" },
	{ value: "purescript" as BundledLanguage, label: "Purescript" },
	{ value: "py" as BundledLanguage, label: "Py" },
	{ value: "python" as BundledLanguage, label: "Python" },
	{ value: "ql" as BundledLanguage, label: "Ql" },
	{ value: "qml" as BundledLanguage, label: "Qml" },
	{ value: "qmldir" as BundledLanguage, label: "Qmldir" },
	{ value: "qss" as BundledLanguage, label: "Qss" },
	{ value: "r" as BundledLanguage, label: "R" },
	{ value: "racket" as BundledLanguage, label: "Racket" },
	{ value: "raku" as BundledLanguage, label: "Raku" },
	{ value: "razor" as BundledLanguage, label: "Razor" },
	{ value: "rb" as BundledLanguage, label: "Rb" },
	{ value: "reg" as BundledLanguage, label: "Reg" },
	{ value: "regex" as BundledLanguage, label: "Regex" },
	{ value: "regexp" as BundledLanguage, label: "Regexp" },
	{ value: "rel" as BundledLanguage, label: "Rel" },
	{ value: "riscv" as BundledLanguage, label: "Riscv" },
	{ value: "rs" as BundledLanguage, label: "Rs" },
	{ value: "rst" as BundledLanguage, label: "Rst" },
	{ value: "ruby" as BundledLanguage, label: "Ruby" },
	{ value: "rust" as BundledLanguage, label: "Rust" },
	{ value: "sas" as BundledLanguage, label: "Sas" },
	{ value: "sass" as BundledLanguage, label: "Sass" },
	{ value: "scala" as BundledLanguage, label: "Scala" },
	{ value: "scheme" as BundledLanguage, label: "Scheme" },
	{ value: "scss" as BundledLanguage, label: "Scss" },
	{ value: "sdbl" as BundledLanguage, label: "Sdbl" },
	{ value: "sh" as BundledLanguage, label: "Sh" },
	{ value: "shader" as BundledLanguage, label: "Shader" },
	{ value: "shaderlab" as BundledLanguage, label: "Shaderlab" },
	{ value: "shell" as BundledLanguage, label: "Shell" },
	{ value: "shellscript" as BundledLanguage, label: "Shellscript" },
	{ value: "shellsession" as BundledLanguage, label: "Shellsession" },
	{ value: "smalltalk" as BundledLanguage, label: "Smalltalk" },
	{ value: "solidity" as BundledLanguage, label: "Solidity" },
	{ value: "soy" as BundledLanguage, label: "Soy" },
	{ value: "sparql" as BundledLanguage, label: "Sparql" },
	{ value: "spl" as BundledLanguage, label: "Spl" },
	{ value: "splunk" as BundledLanguage, label: "Splunk" },
	{ value: "sql" as BundledLanguage, label: "Sql" },
	{ value: "ssh-config" as BundledLanguage, label: "SshConfig" },
	{ value: "stata" as BundledLanguage, label: "Stata" },
	{ value: "styl" as BundledLanguage, label: "Styl" },
	{ value: "stylus" as BundledLanguage, label: "Stylus" },
	{ value: "svelte" as BundledLanguage, label: "Svelte" },
	{ value: "swift" as BundledLanguage, label: "Swift" },
	{ value: "system-verilog" as BundledLanguage, label: "SystemVerilog" },
	{ value: "systemd" as BundledLanguage, label: "Systemd" },
	{ value: "talon" as BundledLanguage, label: "Talon" },
	{ value: "talonscript" as BundledLanguage, label: "Talonscript" },
	{ value: "tasl" as BundledLanguage, label: "Tasl" },
	{ value: "tcl" as BundledLanguage, label: "Tcl" },
	{ value: "templ" as BundledLanguage, label: "Templ" },
	{ value: "terraform" as BundledLanguage, label: "Terraform" },
	{ value: "tex" as BundledLanguage, label: "Tex" },
	{ value: "tf" as BundledLanguage, label: "Tf" },
	{ value: "tfvars" as BundledLanguage, label: "Tfvars" },
	{ value: "toml" as BundledLanguage, label: "Toml" },
	{ value: "ts" as BundledLanguage, label: "Ts" },
	{ value: "ts-tags" as BundledLanguage, label: "TsTags" },
	{ value: "tsp" as BundledLanguage, label: "Tsp" },
	{ value: "tsv" as BundledLanguage, label: "Tsv" },
	{ value: "tsx" as BundledLanguage, label: "Tsx" },
	{ value: "turtle" as BundledLanguage, label: "Turtle" },
	{ value: "twig" as BundledLanguage, label: "Twig" },
	{ value: "typ" as BundledLanguage, label: "Typ" },
	{ value: "typescript" as BundledLanguage, label: "Typescript" },
	{ value: "typespec" as BundledLanguage, label: "Typespec" },
	{ value: "typst" as BundledLanguage, label: "Typst" },
	{ value: "v" as BundledLanguage, label: "V" },
	{ value: "vala" as BundledLanguage, label: "Vala" },
	{ value: "vb" as BundledLanguage, label: "Vb" },
	{ value: "verilog" as BundledLanguage, label: "Verilog" },
	{ value: "vhdl" as BundledLanguage, label: "Vhdl" },
	{ value: "vim" as BundledLanguage, label: "Vim" },
	{ value: "viml" as BundledLanguage, label: "Viml" },
	{ value: "vimscript" as BundledLanguage, label: "Vimscript" },
	{ value: "vue" as BundledLanguage, label: "Vue" },
	{ value: "vue-html" as BundledLanguage, label: "VueHtml" },
	{ value: "vy" as BundledLanguage, label: "Vy" },
	{ value: "vyper" as BundledLanguage, label: "Vyper" },
	{ value: "wasm" as BundledLanguage, label: "Wasm" },
	{ value: "wenyan" as BundledLanguage, label: "Wenyan" },
	{ value: "wgsl" as BundledLanguage, label: "Wgsl" },
	{ value: "wiki" as BundledLanguage, label: "Wiki" },
	{ value: "wikitext" as BundledLanguage, label: "Wikitext" },
	{ value: "wit" as BundledLanguage, label: "Wit" },
	{ value: "wl" as BundledLanguage, label: "Wl" },
	{ value: "wolfram" as BundledLanguage, label: "Wolfram" },
	{ value: "xml" as BundledLanguage, label: "Xml" },
	{ value: "xsl" as BundledLanguage, label: "Xsl" },
	{ value: "yaml" as BundledLanguage, label: "Yaml" },
	{ value: "yml" as BundledLanguage, label: "Yml" },
	{ value: "zenscript" as BundledLanguage, label: "Zenscript" },
	{ value: "zig" as BundledLanguage, label: "Zig" },
	{ value: "zsh" as BundledLanguage, label: "Zsh" },
	{ value: "文言" as BundledLanguage, label: "文言" },
];

interface Snippet {
	id: string;
	lang: BundledLanguage;
	code: string;
}

// Simple fuzzy search helper
function fuzzySearch(text: string, query: string): boolean {
	const pattern = query
		.split("")
		.map((char) => `[^${char}]*${char}`)
		.join("");
	const regex = new RegExp(pattern, "i");
	return regex.test(text);
}

export function SnippetsApp() {
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [lang, setLang] = useState<BundledLanguage>("ts");
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
			// Don't trigger shortcuts if user is typing in an input
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				// Only handle Ctrl+Enter in textarea
				if (
					e.target instanceof HTMLTextAreaElement &&
					e.ctrlKey &&
					e.key === "Enter"
				) {
					e.preventDefault();
					if (code.trim()) {
						const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
						handleSave(fakeEvent);
					}
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
	}, [editingId, code]);

	const handleTabInTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Tab") {
			e.preventDefault();

			const textarea = e.currentTarget;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			// Get the value and find the start of the current line
			const value = textarea.value;
			const lineStart = value.lastIndexOf("\n", start - 1) + 1;

			// Insert tab at the start of the line
			const newValue = `${value.substring(0, lineStart)}\t${value.substring(lineStart)}`;

			// Update the value and restore cursor position
			setCode(newValue);

			// Need to wait for the next tick to set selection
			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd = end + 1;
			}, 0);
		}
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();

		if (!code.trim()) return;

		if (editingId !== null) {
			// Update existing snippet
			setSnippets(
				snippets.map((s) => (s.id === editingId ? { ...s, lang, code } : s)),
			);
			setEditingId(null);
		} else {
			// Add new snippet
			setSnippets([{ id: crypto.randomUUID(), lang, code }, ...snippets]);
		}

		setCode("");
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
			setLang("ts");
		}
	};

	const handleCancel = () => {
		setEditingId(null);
		setCode("");
		setLang("ts");
	};

	// Filter snippets based on search query
	const filteredSnippets = snippets.filter(
		(snippet) =>
			searchQuery === "" ||
			fuzzySearch(snippet.code, searchQuery) ||
			fuzzySearch(snippet.lang, searchQuery),
	);

	return (
		<div className="w-dvw h-dvh flex flex-col font-mono border-stone-100">
			<header className="border-b-2 border-black py-4 px-8 flex flex-row justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">snippets</h1>
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
			</header>

			<main className="flex-1 flex flex-col gap-6 p-8 overflow-y-auto">
				<form
					onSubmit={handleSave}
					className="w-full p-6 flex flex-col gap-4 bg-white border-2 border-black"
				>
					<div className="flex gap-2 items-end">
						<div className="flex flex-col">
							<span>LANGUAGE</span>
							<select
								value={lang}
								onChange={(e) => setLang(e.target.value as BundledLanguage)}
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
								disabled={!code.trim()}
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
								aria-label={`Code snippet in ${snippet.lang}`}
								className="bg-white border-2 border-black flex flex-col w-full outline-none focus-within:ring-2 focus-within:ring-black"
							>
								<div className="flex justify-between gap-2 p-2 border-b-2 border-black px-4 py-2">
									<span>{snippet.lang}</span>
									<section className="flex gap-4">
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
									<pre className="py-2 px-4 bg-black text-white w-fit min-w-full">
										<code>{snippet.code}</code>
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
