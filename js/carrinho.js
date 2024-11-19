let cart = []; // Array para armazenar os produtos do carrinho

// Função para mostrar a notificação
function showNotification(message) {
    // Cria o elemento da notificação
    const notification = document.createElement("div");
    notification.classList.add("notification");

    // Adiciona o ícone de verificação e a mensagem
    notification.innerHTML = `<i class="bi bi-check2-circle"></i> ${message}`;

    // Adiciona a notificação ao container
    const notificationContainer = document.getElementById("notification-container");
    notificationContainer.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 3000);
}

// Função para carregar e salvar o carrinho no localStorage
function handleLocalStorage(action) {
    if (action === "load") {
        const storedCart = localStorage.getItem("cart");
        cart = storedCart ? JSON.parse(storedCart) : [];
    } else if (action === "save") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Função para adicionar item ao carrinho
function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    handleLocalStorage("save");
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

window.addToCart = addToCart;

// Função para alterar a quantidade de um item no carrinho
function updateQuantity(productId, change) {
    const product = cart.find((item) => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId);
        }
        handleLocalStorage("save");
        updateCart();
    }
}

// Função para calcular o subtotal
function calculateSubtotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Função para atualizar a visualização do carrinho
function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const itemCount = document.getElementById("item-count");
    const cartDropdown = document.getElementById("cart-dropdown");

    // Limpa a lista de itens
    cartItemsList.innerHTML = "";

    // Adiciona cada produto ao carrinho
    cart.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <span>${product.name}</span>
            <span class="product-price">R$ ${(product.price * product.quantity).toFixed(2)}</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${product.id}', -1); event.stopPropagation();">-</button>
                <span>${product.quantity}</span>
                <button onclick="updateQuantity('${product.id}', 1); event.stopPropagation();">+</button>
                <button onclick="updateQuantity('${product.id}', -${product.quantity}); event.stopPropagation();">Remover</button>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Atualiza o contador de itens no carrinho
    itemCount.innerText = cart.reduce((total, product) => total + product.quantity, 0);

    // Exibe o subtotal no carrinho
    const subtotal = calculateSubtotal();
    const subtotalElement = document.createElement("div");
    subtotalElement.className = "cart-subtotal";
    subtotalElement.innerText = `Subtotal: R$ ${subtotal.toFixed(2)}`;
    cartItemsList.appendChild(subtotalElement);

    // Adiciona botão de checkout
    const checkoutButton = document.createElement("button");
    checkoutButton.className = "checkout-button";
    checkoutButton.innerText = "Ir para o Checkout";
    checkoutButton.onclick = () => {
        window.location.href = "/pages/checkout.html";
    };
    cartItemsList.appendChild(checkoutButton);

    // Fecha o dropdown se o carrinho estiver vazio
    if (cart.length === 0) {
        cartDropdown.classList.remove("open");
    }
}

// Função para alternar a exibição do dropdown do carrinho
function toggleCartDropdown() {
    const cartDropdown = document.getElementById("cart-dropdown");

    if (cart.length === 0) {
        showNotification("Seu carrinho está vazio!");
        return;
    }

    cartDropdown.classList.toggle("open");
}

// Event listener para fechar o dropdown clicando fora
window.addEventListener("click", (event) => {
    const cartDropdown = document.getElementById("cart-dropdown");
    const cartIcon = document.getElementById("cart-icon");

    if (cartDropdown && cartIcon) {
        if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
            cartDropdown.classList.remove("open");
        }
    }
});

// Carregamento inicial do carrinho
document.addEventListener("DOMContentLoaded", () => {
    handleLocalStorage("load");
    updateCart();
});

// Tornando funções acessíveis globalmente
window.updateQuantity = updateQuantity;
window.toggleCartDropdown = toggleCartDropdown;
