import { useEffect, useRef, useState } from "react";

export function ScratchpadApp() {
	const [text, setText] = useState("");
	const autoSaveTimeoutRef = useRef<number | null>(null);
	const TIMEOUT_DELAY = 100;

	useEffect(() => {
		const saved = localStorage.getItem("zen-note");
		if (saved !== null) setText(saved);
	}, []);

	useEffect(() => {
		if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);

		autoSaveTimeoutRef.current = window.setTimeout(() => {
			localStorage.setItem("zen-note", text);
		}, TIMEOUT_DELAY);

		return () => {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
		};
	}, [text]);

	// Add keyboard shortcut handler
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "s") {
				e.preventDefault();
				handleDownload();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []); // No need for text dependency since handleDownload has closure access

	const handleDownload = () => {
		const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `scratchpad-${new Date().toISOString().split("T")[0]}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="w-dvw h-dvh flex flex-col items-center font-mono">
			<div className="w-full max-w-[90ch] flex justify-end pt-4 px-4">
				<button
					type="button"
					onClick={handleDownload}
					className="px-4 py-2 text-xs text-black/30 hover:text-black transition-colors"
					title="Download as text file (Ctrl + S)"
				>
					download
				</button>
			</div>
			<textarea
				className="max-w-[90ch] px-4 w-full sm:min-w-[40ch] flex-1 text-base py-8 resize-none focus:outline-none"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Just start typing. No formatting, no distractions. Content is saved automatically."
				spellCheck="false"
				autoCapitalize="none"
				autoCorrect="off"
			/>
		</div>
	);
}
