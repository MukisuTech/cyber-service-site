const searchInput = document.getElementById('searchInput');
const serviceGrid = document.getElementById('serviceGrid');
const orderButtons = document.querySelectorAll('.btn-order');
const whatsappChat = document.getElementById('whatsappChat');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const fadeElements = document.querySelectorAll('.fade-up');
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const spinner = document.getElementById('spinner');

const WHATSAPP_ORDER_NUMBER = '0112087299';
const WHATSAPP_CHAT_NUMBER = '254112087299';

const setTheme = (mode) => {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem('site-theme', mode);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};

const filterServices = () => {
  const query = searchInput.value.trim().toLowerCase();
  const cards = [...serviceGrid.querySelectorAll('.service-card')];

  cards.forEach((card) => {
    const service = card.dataset.service.toLowerCase();
    const matches = service.includes(query);
    card.style.display = matches ? 'grid' : 'none';
  });
};

const openWhatsAppOrder = (serviceName) => {
  const message = `Hello Infinity Solutions Online Cyber. I would like to order ${serviceName}.`;
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encoded}`, '_blank');
};

const handleScroll = () => {
  if (window.scrollY > 260) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
};

const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach((element) => observer.observe(element));
};

const toggleNavigation = () => {
  navbar.classList.toggle('mobile-open');
};

const closeNavigation = () => {
  navbar.classList.remove('mobile-open');
};

window.addEventListener('load', () => {
  if (spinner) {
    spinner.style.opacity = 0;
    setTimeout(() => spinner.remove(), 500);
  }
  animateOnScroll();
});

window.addEventListener('scroll', handleScroll);

if (searchInput) {
  searchInput.addEventListener('input', filterServices);
}

orderButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const serviceName = button.dataset.service || 'service';
    openWhatsAppOrder(serviceName);
  });
});

if (whatsappChat) {
  whatsappChat.addEventListener('click', () => {
    window.open(`https://wa.me/${WHATSAPP_CHAT_NUMBER}`, '_blank');
  });
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const activeMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(activeMode);
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    toggleNavigation();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    closeNavigation();
  });
});

initTheme();

