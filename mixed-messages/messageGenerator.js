const readline = require("readline");

const openings = [
  "Today is perfect for a fresh start",
  "Momentum is building around you",
  "A surprising opportunity is close",
  "Your creativity is about to level up",
  "A bold idea is worth trying now",
  "Good energy is following your effort",
  "This is a strong day to make progress"
];

const focusAreas = [
  "frontend practice",
  "debugging a tricky bug",
  "clean code refactoring",
  "learning a new framework",
  "building portfolio projects",
  "better UI hierarchy and spacing",
  "writing more reliable JavaScript"
];

const actions = [
  "ship a small feature before noon",
  "write code in 25-minute focus blocks",
  "review one concept and teach it back",
  "replace one bad habit with a better one",
  "finish one task and celebrate progress",
  "document your next three coding goals",
  "turn one idea into a working prototype"
];

const mood = [
  "calm and focused",
  "bold and experimental",
  "curious and patient",
  "disciplined and steady",
  "creative and confident"
];

const encouragement = [
  "Progress beats perfection every time.",
  "Consistency will separate you from the crowd.",
  "Small wins today become big results tomorrow.",
  "You are closer than you think.",
  "Trust your process and keep building.",
  "Strong habits make strong developers.",
  "Every attempt improves your skill set."
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generateMessage = (name = "") => {
  const trimmedName = name.trim();
  const greeting = trimmedName ? `Hey ${trimmedName},` : "Hey there,";

  return [
    greeting,
    `${getRandomItem(openings)}.`,
    `Your focus: ${getRandomItem(focusAreas)}.`,
    `Your mode: ${getRandomItem(mood)}.`,
    `Next move: ${getRandomItem(actions)}.`,
    getRandomItem(encouragement)
  ].join("\n");
};

const cliName = process.argv.slice(2).join(" ");

if (cliName.trim()) {
  console.log("=== Mixed Messages ===");
  console.log(generateMessage(cliName));
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter your name (or press Enter to skip): ", (answer) => {
    console.log("=== Mixed Messages ===");
    console.log(generateMessage(answer));
    rl.close();
  });
}
