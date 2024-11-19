// Função para carregar os dados do carrinho do localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

// Função para calcular o subtotal
function calculateSubtotal(cart) {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Função para preencher o resumo do carrinho
function updateCartSummary() {
    const cart = loadCart(); // Carrega o carrinho do localStorage
    const cartItemsList = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Limpa a lista de itens do carrinho
    cartItemsList.innerHTML = "";

    // Adiciona os itens ao resumo do carrinho
    cart.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.name} (x${product.quantity})</span>
            <span>R$ ${(product.price * product.quantity).toFixed(2)}</span>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Calcula o subtotal
    const subtotal = calculateSubtotal(cart);

    // Exibe o subtotal e o total (por enquanto, o total é igual ao subtotal)
    subtotalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
    totalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
}

// Função para aplicar o cupom EASYBLACK com 30% de desconto
function applyCoupon() {
    const couponCode = document.getElementById("coupon-code").value.trim().toUpperCase(); // Cupom em letras maiúsculas
    const totalElement = document.getElementById("total");
    const subtotal = parseFloat(document.getElementById("subtotal").innerText.replace("R$", "").trim());

    // Verifica se o cupom digitado é válido
    if (couponCode === "EASYBLACK") {
        const discount = subtotal * 0.30; // Calcula 30% de desconto
        const total = subtotal - discount; // Subtrai o desconto do subtotal
        totalElement.innerText = `R$ ${total.toFixed(2)}`; // Atualiza o total
        alert(`Cupom "${couponCode}" aplicado! Você recebeu R$ ${discount.toFixed(2)} de desconto.`);
    } else {
        alert("Cupom inválido ou expirado!"); // Mensagem para cupom inválido
    }
}

// Evento DOMContentLoaded para inicializar a página de checkout
document.addEventListener("DOMContentLoaded", () => {
    updateCartSummary(); // Atualiza o resumo do carrinho
});

// Evento para aplicar o cupom ao clicar no botão
document.getElementById("apply-coupon").addEventListener("click", () => {
    applyCoupon();
});


