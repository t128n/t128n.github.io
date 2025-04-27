import { useEffect, useRef, useState } from "react";

interface CharInfo {
	char: string;
	code: number;
	isInvisible: boolean;
}

export function AsciiApp() {
	const [inputText, setInputText] = useState("");
	const [stats, setStats] = useState({ chars: 0, words: 0, readTime: "0s" });
	const [tooltipInfo, setTooltipInfo] = useState<{
		char: string;
		code: number;
		desc: string;
	} | null>(null);
	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
	const tooltipRef = useRef<HTMLDivElement>(null);
	const autoProcessTimeoutRef = useRef<number | null>(null);

	// Process the text and update statistics
	useEffect(() => {
		if (autoProcessTimeoutRef.current)
			clearTimeout(autoProcessTimeoutRef.current);

		autoProcessTimeoutRef.current = window.setTimeout(() => {
			// Update statistics
			const chars = inputText.length;
			const words =
				inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
			const readingTimeSeconds = Math.ceil((words / 200) * 60);

			let readTimeDisplay = `${readingTimeSeconds}s`;
			if (readingTimeSeconds >= 60) {
				const minutes = Math.floor(readingTimeSeconds / 60);
				const seconds = readingTimeSeconds % 60;
				readTimeDisplay = `${minutes}m ${seconds}s`;
			}

			setStats({
				chars,
				words,
				readTime: readTimeDisplay,
			});
		}, 150);

		return () => {
			if (autoProcessTimeoutRef.current)
				clearTimeout(autoProcessTimeoutRef.current);
		};
	}, [inputText]);

	// Load from localStorage on initial render
	useEffect(() => {
		const saved = localStorage.getItem("ascii-analyzer-text");
		if (saved !== null) setInputText(saved);
	}, []);

	// Save to localStorage when text changes
	useEffect(() => {
		localStorage.setItem("ascii-analyzer-text", inputText);
	}, [inputText]);

	// Hash function to generate consistent colors
	const hashCode = (str: string) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	};

	// Generate color based on character
	const getCharColor = (char: string) => {
		const hash = hashCode(char);
		const hue = Math.abs(hash) % 360;
		return `hsl(${hue}, 65%, 88%)`;
	};

	// Format invisible characters for display
	const formatInvisibleChar = (code: number) => {
		const mapping: Record<number, string> = {
			0: "NUL",
			9: "→", // Tab
			10: "↵", // Line feed
			13: "⏎", // Carriage return
			32: "␣", // Space
		};

		return mapping[code] || `\\x${code.toString(16).padStart(2, "0")}`;
	};

	// Get special character description
	const getSpecialCharDesc = (code: number) => {
		const specialChars: Record<number, string> = {
			0: "NULL",
			9: "TAB",
			10: "LINE FEED",
			13: "CARRIAGE RETURN",
			32: "SPACE",
		};

		return specialChars[code] || "";
	};

	// Parse text into character info objects
	const parseText = (text: string): CharInfo[] => {
		return Array.from(text).map((char) => {
			const code = char.charCodeAt(0);
			return {
				char,
				code,
				isInvisible: code < 32 || code === 127,
			};
		});
	};

	// Handle mouse over character
	const handleCharHover = (
		e: React.MouseEvent<HTMLSpanElement>,
		charInfo: CharInfo,
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const desc = getSpecialCharDesc(charInfo.code);

		setTooltipInfo({
			char: charInfo.char,
			code: charInfo.code,
			desc,
		});

		// Position the tooltip (calculated after render in useEffect)
		setTooltipPos({
			x: rect.left + rect.width / 2,
			y: rect.top,
		});
	};

	// Handle mouse leave
	const handleCharLeave = () => {
		setTooltipInfo(null);
	};

	// Adjust tooltip position after it renders
	useEffect(() => {
		if (tooltipInfo && tooltipRef.current) {
			const tooltipHeight = tooltipRef.current.offsetHeight;
			const tooltipWidth = tooltipRef.current.offsetWidth;

			// Check if tooltip would go off screen at the top
			let yPos = tooltipPos.y - tooltipHeight - 10;
			if (yPos < 10) {
				// Position below instead
				yPos = tooltipPos.y + 25;
			}

			// Center horizontally but keep on screen
			let xPos = tooltipPos.x - tooltipWidth / 2;
			const maxX = window.innerWidth - tooltipWidth - 10;
			xPos = Math.max(10, Math.min(xPos, maxX));

			tooltipRef.current.style.top = `${yPos}px`;
			tooltipRef.current.style.left = `${xPos}px`;
		}
	}, [tooltipInfo, tooltipPos]);

	// Parsed character data
	const charInfos = parseText(inputText);

	return (
		<div className="min-h-dvh bg-gray-100 font-mono text-black">
			<div className="max-w-7xl mx-auto p-4">
				<header className="border-b-2 border-black pb-4 mb-6">
					<h1 className="text-2xl font-bold tracking-tight">
						ASCII CHARACTER ANALYZER
					</h1>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Input Section */}
					<div className="flex flex-col">
						<div className="border-b-2 border-black pb-2 mb-4">
							<h2 className="font-bold">INPUT</h2>
						</div>
						<textarea
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							placeholder="Type or paste text here..."
							className="flex-1 min-h-52 p-4 border-2 border-black bg-white text-base resize-y focus:outline-none"
							spellCheck="false"
						/>
					</div>

					{/* Stats Section - Only visible on mobile between input and output */}
					<div className="md:hidden flex flex-row gap-4">
						<StatBox label="CHARS" value={stats.chars.toString()} />
						<StatBox label="WORDS" value={stats.words.toString()} />
						<StatBox label="READ" value={stats.readTime} />
					</div>

					{/* Output Section */}
					<div className="flex flex-col">
						<div className="border-b-2 border-black pb-2 mb-4">
							<h2 className="font-bold">OUTPUT</h2>
						</div>
						<div className="flex-1 min-h-52 p-4 border-2 border-black bg-white overflow-x-auto whitespace-pre-wrap">
							{charInfos.map((charInfo, index) => (
								<span
									key={`${index}-${charInfo.code}`}
									className={`inline-block text-center py-0.5 px-0 m-0.5 leading-6 min-w-[1em] h-6 ${
										charInfo.isInvisible
											? "border border-dashed border-black text-sm"
											: ""
									}`}
									style={{ backgroundColor: getCharColor(charInfo.char) }}
									onMouseEnter={(e) => handleCharHover(e, charInfo)}
									onMouseLeave={handleCharLeave}
								>
									{charInfo.isInvisible
										? formatInvisibleChar(charInfo.code)
										: charInfo.char}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Stats Section - Visible on desktop below the main grid */}
				<div className="hidden md:grid grid-cols-3 gap-4 mt-6">
					<StatBox label="CHARS" value={stats.chars.toString()} />
					<StatBox label="WORDS" value={stats.words.toString()} />
					<StatBox label="READ" value={stats.readTime} />
				</div>
			</div>

			{/* Tooltip */}
			{tooltipInfo && (
				<div
					ref={tooltipRef}
					className="fixed bg-black text-white py-2 px-3 pointer-events-none z-50 flex flex-col text-xs"
					style={{
						display: tooltipInfo ? "block" : "none",
						position: "fixed",
					}}
				>
					<span className="text-base mb-1">
						"{tooltipInfo.char}"
						{(tooltipInfo.code < 32 || tooltipInfo.code === 127) &&
							` (${formatInvisibleChar(tooltipInfo.code)})`}
					</span>
					<span>
						ASCII: {tooltipInfo.code} (0x
						{tooltipInfo.code.toString(16).padStart(2, "0")})
					</span>
					{tooltipInfo.desc && <span>Description: {tooltipInfo.desc}</span>}
				</div>
			)}
		</div>
	);
}

// Stats box component
function StatBox({ label, value }: { label: string; value: string }) {
	return (
		<div className="border-2 border-black bg-white p-2 text-center">
			<div className="text-sm font-bold">{label}</div>
			<div className="text-xl font-bold">{value}</div>
		</div>
	);
}
