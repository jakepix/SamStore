// 🛒 Carrinho (inicia vazio ou do localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// 🧩 Função pra mostrar os produtos na página principal
function displayProducts() {
  const container = document.getElementById('produtos');
  container.innerHTML = ''; // limpa antes de criar

  productsData.forEach(produto => {
    container.innerHTML += `
      <div class="product-card">
        ${produto.tag ? `<div class="tag">${produto.tag}</div>` : ''}
        <img src="${produto.img}" alt="${produto.name}">
        <h3>${produto.name}</h3>
        <p class="details">${produto.details}</p>
        <div class="price-buy">
          <span class="price">MT ${produto.price.toLocaleString()}</span>
          <button class="buy-btn" data-id="${produto.id}">Comprar</button>
          <button onclick="verMais('${produto.id}')">Ver mais</button>
        </div>
      </div>
    `;
  });

  // 🧠 Depois que criar os cards, adiciona os eventos nos botões "Comprar"
  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      addToCart(id);
    });
  });

  // ✨ Animação nos cards (aparecer com efeito)
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

  // 🔗 Clique no card abre a página do modelo (menos nos botões)
  cards.forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('buy-btn') && e.target.tagName !== 'BUTTON') {
        const nome = card.querySelector('h3').innerText;
        const produto = productsData.find(p => p.name === nome);
        if (produto) {
          window.location.href = `${produto.id}.html`;
        }
      }
    });
  });
}

// 🔍 Função para abrir página de detalhes
function verMais(id) {
  window.location.href = `${id}.html`;
}

// 🧨 (Opcional) página genérica de produto
function verProduto(id) {
  window.location.href = `produto.html?id=${id}`;
}

// 🛍️ Adiciona produto ao carrinho
function addToCart(productId) {
  if (cart[productId]) {
    cart[productId].qty++;
  } else {
    const produto = productsData.find(p => p.id === productId);
    cart[productId] = { ...produto, qty: 1 };
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Produto adicionado ao carrinho! 🛒');
}

// 🔢 Atualiza o contador do carrinho
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const totalQty = Object.values(cart).reduce((acc, item) => acc + item.qty, 0);
  countEl.textContent = totalQty;
}

// 🧾 Mostra itens no carrinho (se tiver área pra isso)
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;

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

// 🔄 Muda quantidade do item no carrinho
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

// 🚀 Inicializa tudo
displayProducts();
updateCartCount();
displayCart();

