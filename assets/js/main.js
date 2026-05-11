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

// ── Year ──────────────────────────────────────────────────────────────────────
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ── Mobile nav ────────────────────────────────────────────────────────────────
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

// ── Scroll reveals ─────────────────────────────────────────────────────────────
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

// ── Restaurant Random Order Generator ─────────────────────────────────────────
const mains = [
  'Double Smash Burger with cheddar and house sauce',
  'Crispy Chicken Burger with garlic mayo',
  'Margherita Pizza with extra mozzarella',
  'Spicy BBQ Chicken Pizza',
  'Beef & Cheese Wrap with chipotle sauce',
  'Grilled Chicken Taco Box (x3 tacos)',
  'Sweet Chilli Noodle Box with crispy tofu',
  'Teriyaki Beef Noodle Box',
  'Loaded Veggie Burger with halloumi',
  'Inferno Challenge Burger (hot!)'
];

const sides = [
  'Seasoned Fries',
  'Loaded Cheese Fries',
  'Sweet Potato Fries',
  'Onion Rings',
  'Halloumi Bites',
  'Loaded Nachos',
  'Coleslaw & Dip',
  'Garlic Bread (4 slices)',
  'Spicy Wings x6',
  'Mac & Cheese Pot'
];

const drinks = [
  'Brown Sugar Bubble Tea',
  'Taro Milk Tea',
  'Strawberry Boba',
  'Mango Smoothie',
  'Classic Vanilla Milkshake',
  'Sparkling Lemonade',
  'Watermelon Juice',
  'Matcha Bubble Tea',
  'Chocolate Milkshake',
  'Fresh Orange Juice'
];

const desserts = [
  'Cookie Dough Pot with ice cream',
  'Churros with chocolate dipping sauce',
  'Warm Brownie with whipped cream',
  'Strawberry Cheesecake slice',
  'Lotus Biscoff Milkshake'
];

const kitchenMessages = [
  'Chef says this combo is absolutely legendary.',
  'Our kitchen team highly approves this selection.',
  'This order has main character energy.',
  'Warning: this meal may cause extreme happiness.',
  'Bold choices. We respect it.',
  'The kitchen is already hyped for this one.',
  'Certified crowd-pleaser. Outstanding pick.',
  'Your taste buds are about to have the time of their life.'
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const estimatedTime = () => `${Math.floor(Math.random() * 10) + 20}–${Math.floor(Math.random() * 5) + 30} mins`;

const generateOrder = (name = '') => {
  const trimmedName = name.trim();
  const greeting = trimmedName ? `Order for ${trimmedName}:` : 'Your order:';
  const main = getRandomItem(mains);
  const side = getRandomItem(sides);
  const drink = getRandomItem(drinks);
  const dessert = getRandomItem(desserts);
  const eta = estimatedTime();
  const message = getRandomItem(kitchenMessages);

  return [
    `🧾 ${greeting}`,
    ``,
    `🍽️  Main:    ${main}`,
    `🍟  Side:    ${side}`,
    `🥤  Drink:   ${drink}`,
    `🍰  Dessert: ${dessert}`,
    ``,
    `🚗  Estimated delivery: ${eta}`,
    `💬  "${message}"`
  ].join('\n');
};

// ── Generator button ──────────────────────────────────────────────────────────
if (generateButton && messageOutput) {
  const renderOrder = () => {
    const visitorName = nameInput ? nameInput.value : '';
    messageOutput.textContent = generateOrder(visitorName);
    if (copyStatus) copyStatus.textContent = '';
  };

  generateButton.addEventListener('click', renderOrder);

  if (nameInput) {
    nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        renderOrder();
      }
    });
  }

  // ── Copy button ─────────────────────────────────────────────────────────────
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const text = messageOutput.textContent.trim();

      if (!text || text === 'Your random order will appear here...') {
        if (copyStatus) copyStatus.textContent = 'Generate an order first.';
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        if (copyStatus) copyStatus.textContent = '✅ Order copied to clipboard!';
      } catch (error) {
        if (copyStatus) copyStatus.textContent = 'Copy failed — please try again.';
      }
    });
  }
}
