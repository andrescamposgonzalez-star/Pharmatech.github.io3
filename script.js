const products = [
  {
    name: "Paracetamol 500 mg",
    category: "medicamentos",
    description: "Analgesico y antipiretico de uso comun para botiquin familiar.",
    price: "$2.990",
    tag: "Esencial",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Ibuprofeno 400 mg",
    category: "medicamentos",
    description: "Antiinflamatorio para molestias leves segun indicacion profesional.",
    price: "$3.490",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Suero Oral",
    category: "medicamentos",
    description: "Solucion de rehidratacion para recuperar sales y liquidos.",
    price: "$1.990",
    tag: "Hidratacion",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Vitamina C 1000 mg",
    category: "vitaminas",
    description: "Suplemento diario para apoyar defensas y bienestar general.",
    price: "$7.990",
    tag: "Oferta",
    image: "https://images.unsplash.com/photo-1622484211148-1f9784e27502?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Multivitaminico Adulto",
    category: "vitaminas",
    description: "Formula equilibrada con vitaminas y minerales esenciales.",
    price: "$10.490",
    tag: "Bienestar",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Omega 3 Capsulas",
    category: "vitaminas",
    description: "Aceite de pescado en capsulas para complementar la nutricion diaria.",
    price: "$12.990",
    tag: "Corazon",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Protector Solar FPS 50",
    category: "cuidado",
    description: "Proteccion facial y corporal de textura ligera para uso diario.",
    price: "$11.990",
    tag: "Dermocuidado",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Crema Hidratante",
    category: "cuidado",
    description: "Hidratacion intensiva para piel seca y sensible.",
    price: "$8.490",
    tag: "2x1",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Gel Antibacterial",
    category: "cuidado",
    description: "Formato familiar para higiene de manos en casa o trabajo.",
    price: "$2.490",
    tag: "Higiene",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Pañales Premium",
    category: "infantil",
    description: "Absorcion prolongada y cubierta suave para piel delicada.",
    price: "$14.990",
    tag: "Infantil",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Termometro Digital",
    category: "infantil",
    description: "Medicion rapida y precisa para control familiar en casa.",
    price: "$6.990",
    tag: "Control",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Shampoo Hipoalergenico",
    category: "cuidado",
    description: "Limpieza suave para cabello y cuero cabelludo sensible.",
    price: "$5.990",
    tag: "Suave",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=700&q=80"
  }
];

const productGrid = document.querySelector("#productGrid");
const productSearch = document.querySelector("#productSearch");
const emptyState = document.querySelector("#emptyState");
const categoryButtons = document.querySelectorAll(".category");
let activeCategory = "todos";

function renderProducts() {
  const query = productSearch.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-body">
        <span class="product-tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price-row">
          <span class="price">${product.price}</span>
          <button class="cart-btn" type="button" aria-label="Agregar ${product.name} al carro">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.style.display = filtered.length ? "none" : "block";
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

productSearch.addEventListener("input", renderProducts);
renderProducts();

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const slides = [...document.querySelectorAll(".slide")];
const dotsContainer = document.querySelector(".carousel-dots");
let currentSlide = 0;
let carouselTimer;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Ir a promocion ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = [...dotsContainer.querySelectorAll("button")];

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 5500);
}

document.querySelector(".prev").addEventListener("click", () => showSlide(currentSlide - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(currentSlide + 1));
showSlide(0);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  status.textContent = "Gracias por escribirnos. Te contactaremos pronto.";
  event.currentTarget.reset();
});
