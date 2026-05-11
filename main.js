const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const menuItems = document.querySelectorAll('.nav-links a');
const revealEls = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');
const generateButton = document.getElementById('generate-message');
const copyButton = document.getElementById('copy-message');
const nameInput = document.getElementById('visitor-name');
const messageOutput = document.getElementById('message-output');
const copyStatus = document.getElementById('copy-status');

const openings = [
  'Today is perfect for a fresh start',
  'Momentum is building around you',
  'A surprising opportunity is close',
  'Your creativity is about to level up',
  'A bold idea is worth trying now',
  'Good energy is following your effort',
  'This is a strong day to make progress'
];

const focusAreas = [
  'frontend practice',
  'debugging a tricky bug',
  'clean code refactoring',
  'learning a new framework',
  'building portfolio projects',
  'better UI hierarchy and spacing',
  'writing more reliable JavaScript'
];

const actions = [
  'ship a small feature before noon',
  'write code in 25-minute focus blocks',
  'review one concept and teach it back',
  'replace one bad habit with a better one',
  'finish one task and celebrate progress',
  'document your next three coding goals',
  'turn one idea into a working prototype'
];

const mood = [
  'calm and focused',
  'bold and experimental',
  'curious and patient',
  'disciplined and steady',
  'creative and confident'
];

const encouragement = [
  'Progress beats perfection every time.',
  'Consistency will separate you from the crowd.',
  'Small wins today become big results tomorrow.',
  'You are closer than you think.',
  'Trust your process and keep building.',
  'Strong habits make strong developers.',
  'Every attempt improves your skill set.'
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generateMessage = (name = '') => {
  const trimmedName = name.trim();
  const greeting = trimmedName ? `Hey ${trimmedName},` : 'Hey there,';

  return [
    greeting,
    `${getRandomItem(openings)}.`,
    `Your focus: ${getRandomItem(focusAreas)}.`,
    `Your mode: ${getRandomItem(mood)}.`,
    `Next move: ${getRandomItem(actions)}.`,
    getRandomItem(encouragement)
  ].join('\n');
};

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

if (generateButton && messageOutput) {
  const renderMessage = () => {
    const visitorName = nameInput ? nameInput.value : '';
    messageOutput.textContent = generateMessage(visitorName);

    if (copyStatus) {
      copyStatus.textContent = '';
    }
  };

  generateButton.addEventListener('click', renderMessage);

  if (nameInput) {
    nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        renderMessage();
      }
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const text = messageOutput.textContent.trim();

      if (!text || text === 'Your random message appears here.') {
        if (copyStatus) {
          copyStatus.textContent = 'Generate a message first.';
        }

        return;
      }

      try {
        await navigator.clipboard.writeText(text);

        if (copyStatus) {
          copyStatus.textContent = 'Message copied to clipboard.';
        }
      } catch (error) {
        if (copyStatus) {
          copyStatus.textContent = 'Copy failed. Please try again.';
        }
      }
    });
  }
}
