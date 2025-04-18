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

	return (
		<div className="w-dvw h-dvh flex flex-col items-center font-mono">
			<textarea
				className="max-w-[90ch] px-4 w-full sm:min-w-[40ch] flex-1 text-base py-16 resize-none focus:outline-none"
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
