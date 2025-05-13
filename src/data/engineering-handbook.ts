export interface Insight {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  source?: string;
  date?: string;
}

export const insights: Insight[] = [
  {
    id: "1",
    title: "The Rule of Three",
    content: "When you find yourself repeating code three times, it's time to refactor. This principle helps maintain DRY (Don't Repeat Yourself) code and improves maintainability.",
    category: "Code Quality",
    tags: ["refactoring", "best-practices", "code-quality"],
    source: "Clean Code by Robert C. Martin"
  },
  {
    id: "2",
    title: "Single Responsibility Principle",
    content: "A class should have only one reason to change. This means that a class should have only one job or responsibility. This principle helps create more maintainable and flexible code.",
    category: "SOLID Principles",
    tags: ["solid", "architecture", "best-practices"],
    source: "Clean Architecture by Robert C. Martin"
  },
  {
    id: "3",
    title: "Fail Fast Principle",
    content: "Fail fast is a philosophy that values detecting errors early and immediately stopping execution. This approach helps identify problems quickly and reduces debugging time.",
    category: "Error Handling",
    tags: ["error-handling", "debugging", "best-practices"]
  },
  {
    id: "4",
    title: "The Boy Scout Rule",
    content: "Leave the code cleaner than you found it. Make small improvements whenever you touch code, even if you're just fixing a bug or adding a feature.",
    category: "Code Quality",
    tags: ["clean-code", "maintenance", "best-practices"],
    source: "Clean Code by Robert C. Martin"
  },
  {
    id: "5",
    title: "The Pareto Principle in Testing",
    content: "80% of bugs are found in 20% of the code. Focus your testing efforts on the most critical and complex parts of your application.",
    category: "Testing",
    tags: ["testing", "quality-assurance", "best-practices"]
  },
  {
    id: "6",
    title: "The Broken Window Theory",
    content: "One broken window (bad code) left unfixed leads to more broken windows. Fix issues as soon as they're discovered to maintain code quality.",
    category: "Code Quality",
    tags: ["maintenance", "code-quality", "best-practices"],
    source: "The Pragmatic Programmer"
  },
  {
    id: "7",
    title: "The Principle of Least Surprise",
    content: "Code should behave in a way that's least surprising to other developers. Use clear naming, follow conventions, and make the code's behavior predictable.",
    category: "Code Quality",
    tags: ["readability", "maintainability", "best-practices"]
  },
  {
    id: "8",
    title: "The Law of Demeter",
    content: "A method should only call methods of objects that are: 1) The object itself, 2) Objects passed as parameters, 3) Objects created within the method, 4) Objects stored in instance variables.",
    category: "Object-Oriented Design",
    tags: ["object-oriented", "design", "best-practices"]
  },
  {
    id: "9",
    title: "The Interface Segregation Principle",
    content: "Clients should not be forced to depend on interfaces they do not use. Break down large interfaces into smaller, more specific ones.",
    category: "SOLID Principles",
    tags: ["solid", "architecture", "best-practices"],
    source: "Clean Architecture by Robert C. Martin"
  },
  {
    id: "10",
    title: "The Dependency Inversion Principle",
    content: "High-level modules should not depend on low-level modules. Both should depend on abstractions. This principle helps create more flexible and maintainable systems.",
    category: "SOLID Principles",
    tags: ["solid", "architecture", "best-practices"],
    source: "Clean Architecture by Robert C. Martin"
  },
  {
    id: "11",
    title: "Never Just - Acknowledge Hidden Complexity",
    content: "Every technical problem exists within a dense web of constraints—legacy systems, business rules, time pressure, or interdependent components. When someone offers a solution prefaced with 'just,' they often ignore the intricate context the original problem-solver is navigating. This minimizes effort already invested and overlooks the real-world limitations that make so-called 'simple' fixes infeasible. The key insight: behind most hard problems are layers of invisible decisions and discarded options.",
    category: "Communication",
    tags: ["communication", "problem-solving", "best-practices"],
    source: "neverjust.net"
  },
  {
    id: "12",
    title: "Never Just - Avoid Dismissive Language",
    content: "Using language like 'just do X' often undermines the person seeking help. It frames their struggle as a failure to see the obvious rather than an intelligent response to complex constraints. This can damage trust, halt meaningful dialogue, and make people less likely to seek help in the future. Actionable shift: replace assumptions with curiosity. Instead of jumping to conclusions, ask what's already been tried or what's making the issue difficult.",
    category: "Communication",
    tags: ["communication", "teamwork", "best-practices"],
    source: "neverjust.net"
  },
  {
    id: "13",
    title: "Never Just - Build Collaborative Problem-Solving Habits",
    content: "The alternative to 'just' is empathy-driven collaboration. Ask questions that surface context, share thoughts as possibilities, and validate the challenge being faced. This not only leads to better solutions but strengthens team dynamics. Adopt phrases like 'Have you considered…?' or 'I wonder if…' to create space for joint exploration rather than accidental condescension. Respecting complexity isn't just about etiquette—it's how deep, sustainable solutions emerge.",
    category: "Communication",
    tags: ["communication", "teamwork", "problem-solving"],
    source: "neverjust.net"
  },
  {
    id: "14",
    title: "The X-Y Problem - Start with the Real Goal",
    content: "Many people accidentally mislead themselves and others by asking how to achieve Y—a step they believe leads to their real goal, X. But when you ask for help with Y without revealing X, you lock collaborators into solving the wrong problem. Action: Clearly state the actual outcome you want, even if you're also exploring potential methods. Lead with the goal, not your current idea for getting there.",
    category: "Problem Solving",
    tags: ["problem-solving", "communication", "best-practices"],
    source: "xyproblem.info"
  },
  {
    id: "15",
    title: "The X-Y Problem - Invite Context",
    content: "The XY problem thrives in environments where problem context is hidden, and surface-level questions dominate. It wastes time, causes confusion, and derails problem-solving. Action: Share what you've already tried, what you've ruled out, and why. Explain assumptions and constraints upfront. This allows helpers to see beyond your current tunnel vision and guide you more effectively toward real solutions.",
    category: "Problem Solving",
    tags: ["problem-solving", "communication", "best-practices"],
    source: "xyproblem.info"
  },
  {
    id: "16",
    title: "The X-Y Problem - Asking Is Debugging",
    content: "If you already had the perfect mental model of the problem, you'd likely have solved it. The act of asking is part of discovering that model. Action: Be willing to let go of your initial theory. Don't defend Y if it's not working—explore X with curiosity. Allow others to help debug your thinking, not just your code.",
    category: "Problem Solving",
    tags: ["problem-solving", "communication", "best-practices"],
    source: "xyproblem.info"
  },
  {
    id: "17",
    title: "Don't Ask to Ask - Lead with the Problem",
    content: "Typing 'Anyone here know Java?' is a subtle way of asking others to pre-commit without knowing the issue. It burdens them with implicit responsibility and excludes those who might help but don't self-identify as experts. Action: Skip the pre-check. Start directly with your question, including relevant context, technologies, and what you've tried so far.",
    category: "Communication",
    tags: ["communication", "best-practices", "teamwork"],
    source: "dontasktoask.com"
  },
  {
    id: "18",
    title: "Don't Ask to Ask - Respect Others' Time",
    content: "'Can I ask a question?' or 'Is this the right place?' can read as signals of hesitation or laziness. They often delay meaningful discussion and turn away potential helpers. Action: Put in the effort to clearly state your issue. Even if it's imperfect, a real question is more valuable than a vague intro.",
    category: "Communication",
    tags: ["communication", "best-practices", "teamwork"],
    source: "dontasktoask.com"
  },
  {
    id: "19",
    title: "Don't Ask to Ask - Trust the Room",
    content: "You're not the gatekeeper of who gets to answer. Sometimes people with adjacent knowledge—or strong reasoning skills—can help even without deep domain expertise. Action: Let people decide for themselves if they can contribute. Good questions invite engagement; vague requests repel it.",
    category: "Communication",
    tags: ["communication", "best-practices", "teamwork"],
    source: "dontasktoask.com"
  },
  {
    id: "20",
    title: "Faster Horses - Vision vs. Expectation",
    content: "Ford said, 'If I had asked people, they would have said faster horses.' Sometimes users can't imagine radical change, so innovators must look beyond requests.",
    category: "Innovation",
    tags: ["innovation", "product", "vision"],
    source: "Attributed to Henry Ford"
  },
  {
    id: "21",
    title: "Faster Horses - When Incremental Wins",
    content: "Sometimes a 'faster horse' is exactly what's needed. Small improvements can be more practical than big leaps.",
    category: "Product Development",
    tags: ["incremental", "improvement", "product", "pragmatism"]
  },
  {
    id: "22",
    title: "Faster Horses - Find the Balance",
    content: "Great solutions mix user feedback with vision. Sometimes it's a car, sometimes just a better horse.",
    category: "Product Development",
    tags: ["innovation", "user-feedback", "balance"]
  }
];