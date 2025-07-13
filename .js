const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 1599,
    image: "https://cdn-icons-png.flaticon.com/512/1060/1060386.png",
    description: "Powerful gaming laptop with latest GPU",
    category: "Laptop",
    rating: 4.9
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 399,
    image: "https://cdn-icons-png.flaticon.com/512/2972/2972557.png",
    description: "Stylish smartwatch with fitness tracking",
    category: "Mobile",
    rating: 4.6
  },
  {
    id: 3,
    name: "Tablet Pro",
    price: 899,
    image: "https://cdn-icons-png.flaticon.com/512/3794/3794556.png",
    description: "High-performance tablet for work and play",
    category: "Mobile",
    rating: 4.7
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 149,
    image: "https://cdn-icons-png.flaticon.com/512/727/727245.png",
    description: "Loud and portable speaker",
    category: "Household Appliance",
    rating: 4.5
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 499,
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920253.png",
    description: "Capture every moment in HD",
    category: "Household Appliance",
    rating: 4.3
  },
  {
    id: 6,
    name: "Office Laptop",
    price: 999,
    image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    description: "Slim and efficient laptop for office use",
    category: "Laptop",
    rating: 4.4
  },
  {
    id: 7,
    name: "Budget Smartphone",
    price: 299,
    image: "https://cdn-icons-png.flaticon.com/512/284/284276.png",
    description: "Affordable smartphone with powerful features",
    category: "Mobile",
    rating: 4.2
  },
  {
    id: 8,
    name: "Smart TV 50\"",
    price: 799,
    image: "https://cdn-icons-png.flaticon.com/512/2226/2226179.png",
    description: "4K UHD Smart TV with streaming support",
    category: "TV",
    rating: 4.6
  },
  {
    id: 9,
    name: "household appliances",
    price: 899,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046750.png",
    description: "cooking",
    category: "household appliances",
    rating: 4.6
  }
];

let cart = [];

function navigate(tab) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('bg-blue-100', 'text-blue-700'));
  document.getElementById(`tab-${tab}`)?.classList.add('bg-blue-100', 'text-blue-700');

  switch (tab) {
    case 'home': renderHome(); break;
    case 'products': renderProducts(); break;
    case 'features': renderFeatures(); break;
    case 'contact': renderContact(); break;
    case 'cart': renderCart(); break;
  }
}

function renderHome() {
  document.getElementById('main-content').innerHTML = `
    <section class="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-center min-h-screen flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold mb-4">Premium Electronics & Gadgets</h2>
      <p class="text-lg">Discover the latest technology with unbeatable prices and fast shipping</p>
      <button onclick="navigate('products')" class="mt-6 px-6 py-2 bg-white text-pink-600 rounded shadow">Shop Now</button>
    </section>
  `;
  lucide.createIcons();
}
  function renderProducts() {
  const html = products.map(p => `
    <div class="bg-white rounded-lg shadow p-4 text-center flex flex-col items-center justify-between h-full">
      <img src="${p.image}" alt="${p.name}" class="mx-auto h-24 w-24 object-contain" />
      <h3 class="text-lg font-semibold mt-4">${p.name}</h3>
      <p class="text-gray-600">${p.description}</p>
      <p class="text-red-500 font-bold mt-1">$${p.price}</p>
      <button onclick='addToCart(${p.id})' class="mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 w-full">Add to Cart</button>
    </div>
  `).join('');

  document.getElementById('main-content').innerHTML = `
    <section class="py-12 max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${html}
      </div>
    </section>
  `;
  lucide.createIcons();
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartIcon();
 showToast("✅ Added to cart!");

}

function updateCartIcon() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  if (cart.length === 0) {
    document.getElementById('main-content').innerHTML = `
      <section class="text-center py-20">
        <i data-lucide="shopping-cart" class="mx-auto w-12 h-12 text-gray-400"></i>
        <p class="text-gray-600 mt-4">Your cart is empty</p>
      </section>
    `;
    lucide.createIcons();
    return;
  }

  const items = cart.map(item => `
    <div class="flex justify-between items-center border-b py-4">
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p>$${item.price} × ${item.quantity}</p>
      </div>
      <div>$${item.price * item.quantity}</div>
    </div>
  `).join('');

  const total = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  document.getElementById('main-content').innerHTML = `
    <section class="py-12 max-w-xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Your Cart</h2>
      ${items}
      <div class="mt-6 text-right font-bold text-lg">Total: $${total}</div>

      <div class="mt-10">
        <h3 class="text-xl font-semibold mb-4">Payment Details</h3>
        <form class="space-y-4 bg-white p-6 rounded shadow">
          <input type="text" placeholder="Cardholder Name" class="w-full p-3 border rounded" />
          <input type="text" placeholder="Card Number" maxlength="16" class="w-full p-3 border rounded" />
          <div class="flex space-x-4">
            <input type="text" placeholder="MM/YY" maxlength="5" class="w-1/2 p-3 border rounded" />
            <input type="text" placeholder="CVV" maxlength="3" class="w-1/2 p-3 border rounded" />
          </div>
          <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full">Pay Now</button>
        </form>
      </div>
    </section>
  `;

  lucide.createIcons();
}


function renderFeatures() {
  document.getElementById('main-content').innerHTML = `
    <section class="py-20 text-center">
      <h2 class="text-3xl font-bold mb-4">Why Choose TechStore?</h2>
      <p class="text-gray-600">Fast checkout, quality products, and 24/7 support</p>
    </section>
  `;
  lucide.createIcons();
}

function renderContact() {
  document.getElementById('main-content').innerHTML = `
    <section class="py-12 max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">Contact Us</h2>
      <form class="space-y-4">
        <input type="text" placeholder="Your Name" class="w-full p-3 border rounded" />
        <input type="email" placeholder="Your Email" class="w-full p-3 border rounded" />
        <textarea placeholder="Your Message" rows="5" class="w-full p-3 border rounded"></textarea>
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">Send Message</button>
      </form>
    </section>
  `;
  lucide.createIcons();
}

// Initial load
navigate('home');
lucide.createIcons();
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = "bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-slide-in";
  toast.innerText = message;

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
  function handlePayment(event) {
  event.preventDefault();
  showToast("💳 Payment Successful!");
}

}
