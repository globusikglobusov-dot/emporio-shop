window.addEventListener('scroll', function() {
  const box = document.getElementById('logoBox');
  const strL = document.getElementById('stripeL');
  const strR = document.getElementById('stripeR');
  const body = document.body;
  let s = window.scrollY;

  if (s <= 550) {
    let tr = s * 0.8;
    strL.style.transform = 
      `rotate(-25deg) translate(${-tr}px,${-tr}px)`;
    strR.style.transform = 
      `rotate(-25deg) translate(${tr}px,${tr}px)`;
  }

  if (s > 140) {
    box.classList.add('sticky');
    body.classList.add('scrolled');
  } else {
    box.classList.remove('sticky');
    body.classList.remove('scrolled');
  }
});

const quotes = [
  "🤫 Самый <span>легальный криминал</span>",
  "🙍‍♂️ Джо в сделку <span>не входил...</span>",
  "🕶️ Предложения, от которых кошелек <span>не откажется</span>",
  "💣 Быстрее, чем малыш Томми <span>выпускает обойму</span>",
  "🩸 Никаких улик. <span>Только гейминг</span>"
];

const rand = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').innerHTML = rand;