 const productsData = [
  {
    id: 'samsungA10',
    name: 'Samsung A10',
    price: 8999,
    img: 'A10.jpg',
    stars: '⭐⭐⭐⭐',
    rating: 4.0,
    details: 'Cores: Preto, Azul | Capacidade: 32GB, 64GB',
    tag: 'Mais vendido'
  },
  {
    id: 'samsungA11',
    name: 'Samsung A11',
    price: 9499,
    img: 'A11.jpg',
    stars: '⭐⭐⭐⭐',
    rating: 4.1,
    details: 'Cores: Preto, Branco | Capacidade: 32GB, 64GB',
    tag: 'Novo'
  },
  {
    id: 'samsungA12',
    name: 'Samsung A12',
    price: 10299,
    img: 'samsungA12.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Azul, Branco | Capacidade: 64GB, 128GB',
    tag: ''
  },
  {
    id: 'samsungA13',
    name: 'Samsung A13',
    price: 11199,
    img: 'samsungA13.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco | Capacidade: 64GB, 128GB, 256GB',
    tag: 'Oferta'
  },
  {
    id: 'samsungA14',
    name: 'Samsung A14',
    price: 11999,
    img: 'samsungA14.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Verde | Capacidade: 64GB, 128GB',
    tag: ''
  },
  {
    id: 'samsungA15',
    name: 'Samsung A15',
    price: 12799,
    img: 'samsungA15.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco, Vermelho | Capacidade: 128GB, 256GB',
    tag: ''
  },
  {
    id: 'samsungA16',
    name: 'Samsung A16',
    price: 13499,
    img: 'samsungA16.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco | Capacidade: 64GB, 128GB',
    tag: 'Novo'
  },
  {
    id: 'samsungS20',
    name: 'Samsung S20',
    price: 28999,
    img: 'samsungS20.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Azul, Cinza | Capacidade: 128GB, 256GB',
    tag: 'Premium'
  },
  {
    id: 'samsungS21',
    name: 'Samsung S21',
    price: 34999,
    img: 'samsungS21.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco, Prata | Capacidade: 128GB, 256GB, 512GB',
    tag: ''
  },
  {
    id: 'samsungS22',
    name: 'Samsung S22',
    price: 39999,
    img: 'samsungS22.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Verde, Roxo | Capacidade: 128GB, 256GB, 512GB',
    tag: 'Oferta'
  },
  {
    id: 'samsungS23',
    name: 'Samsung S23',
    price: 44999,
    img: 'samsungS23.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco | Capacidade: 128GB, 256GB, 512GB',
    tag: ''
  },
  {
    id: 'samsungS24',
    name: 'Samsung S24',
    price: 49999,
    img: 'samsungS24.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Azul | Capacidade: 256GB, 512GB',
    tag: ''
  },
  {
    id: 'samsungS25',
    name: 'Samsung S25',
    price: 54999,
    img: 'samsungS25.jpg',
    stars: '',
    rating: 0,
    details: 'Cores: Preto, Branco | Capacidade: 256GB, 512GB, 1TB',
    tag: 'Novo'
  }
];


  // Depois que os cards estão criados, adiciona eventos nos botões
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      addToCart(id);
    });
  });

  // Configura a animação dos cards após renderizar
  const cards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach(card => observer.observe(card));

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId].qty++;
  } else {
    const product = productsData.find(p => p.id === productId);
    cart[productId] = { ...product, qty: 1 };
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Produto adicionado ao carrinho! 🛒');
}

function displayCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
    document.getElementById('cart-total').innerText = 'MZN 0';
    return;
  }
  let total = 0;
  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${id}', -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${id}', 1)">+</button>
        </div>
        <div class="cart-item-price">MZN ${(item.price * item.qty).toLocaleString()}</div>
      </div>
    `;
    cartItems.appendChild(div);
  }
  document.getElementById('cart-total').innerText = `MZN ${total.toLocaleString()}`;
}

function changeQty(productId, amount) {
  if (!cart[productId]) return;
  cart[productId].qty += amount;
  if (cart[productId].qty <= 0) {
    delete cart[productId];
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Inicializa
displayProducts();
updateCartCount();
displayCart();

// Faz cada card abrir a página de detalhes
document.querySelectorAll('.product-card').forEach(card => {
  const nome = card.querySelector('h3').innerText;
  const produto = productsData.find(p => p.name === nome);
  if (produto) {
    card.addEventListener('click', () => {
      window.location.href = `produto.html?id=${produto.id}`;
    });
  }
});
