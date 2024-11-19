function menuShow() {
    const menu = document.querySelector('.mobile-menu');
    
    // Alterna a visibilidade do menu
    if (menu.style.display === 'block') {
        menu.style.display = 'none'; // Esconde o menu
        document.removeEventListener('click', handleOutsideClick); // Remove o listener ao fechar
    } else {
        menu.style.display = 'block'; // Exibe o menu
        setTimeout(() => { // Adiciona o listener após abrir o menu
            document.addEventListener('click', handleOutsideClick);
        }, 0);
    }
}

function handleOutsideClick(event) {
    const menu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-icon');

    // Verifica se o clique foi fora do menu e do botão de abrir
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.style.display = 'none'; // Esconde o menu
        document.removeEventListener('click', handleOutsideClick); // Remove o listener
    }
}
