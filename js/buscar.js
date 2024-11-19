// Função para buscar e exibir os produtos dinamicamente
function buscarProdutos() {
    const searchQuery = document.getElementById("search-input").value.toLowerCase();
    console.log("Valor da busca:", searchQuery);

    // Carrega os dados do arquivo JSON
    fetch('/json/produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const produtos = data.produtos; // Acessa a lista de produtos no JSON
            console.log("Produtos encontrados:", produtos.length);

            let encontrouProduto = false;

            // Limpa os produtos da página antes de adicionar os filtrados
            const containerProdutos = document.querySelector(".produtos");
            containerProdutos.innerHTML = ""; // Limpa a seção de produtos

            // Itera pelos produtos carregados
            produtos.forEach(produto => {
                // Verifica se o nome do produto contém a pesquisa
                if (produto.name.toLowerCase().includes(searchQuery)) {
                    encontrouProduto = true;

                    // Cria o elemento HTML do produto
                    const divProduto = document.createElement("div");
                    divProduto.classList.add("product", produto.id); // Adiciona as classes do produto

                    // Adiciona a imagem do produto
                    const img = document.createElement("img");
                    img.src = produto.image;
                    img.alt = produto.name;

                    // Adiciona o nome do produto
                    const h1 = document.createElement("h1");
                    h1.classList.add("product-name");
                    h1.textContent = produto.name;

                    // Adiciona os botões de detalhes e preço
                    const footer = document.createElement("footer");
                    footer.classList.add("footer");

                    const btnDetalhes = document.createElement("button");
                    btnDetalhes.classList.add("detalhes");
                    btnDetalhes.textContent = "Detalhes";
                    footer.appendChild(btnDetalhes);

                    const btnValor = document.createElement("button");
                    btnValor.classList.add("valor");
                    btnValor.textContent = `R$ ${produto.price.toFixed(2)}`;
                    btnValor.onclick = () => addToCart(produto);
                    footer.appendChild(btnValor);

                    // Adiciona os elementos à div do produto
                    divProduto.appendChild(img);
                    divProduto.appendChild(h1);
                    divProduto.appendChild(footer);

                    // Adiciona o produto à seção
                    containerProdutos.appendChild(divProduto);
                }
            });

            // Exibe ou esconde a mensagem de "Produto não encontrado"
            const mensagemNaoEncontrado = document.getElementById("mensagem-nao-encontrado");
            if (!encontrouProduto) {
                console.log("Produto não encontrado");
                if (!mensagemNaoEncontrado) {
                    const mensagem = document.createElement("p");
                    mensagem.id = "mensagem-nao-encontrado";
                    mensagem.textContent = "Produto não encontrado";
                    containerProdutos.appendChild(mensagem);
                } else {
                    mensagemNaoEncontrado.style.display = "block"; // Exibe a mensagem
                }
            } else if (mensagemNaoEncontrado) {
                mensagemNaoEncontrado.style.display = "none"; // Esconde a mensagem
            }

            // Esconde as Dúvidas Frequentes e mostra os Produtos
            document.getElementById("duvidas").style.display = "none"; // Esconde a seção de dúvidas
            document.getElementById("produtos").style.display = "block"; // Exibe a seção de produtos

            // Força a atualização do layout de grid
            const produtosContainer = document.querySelector('.produtos');
            produtosContainer.style.display = 'grid'; // Garante que o grid é exibido
            produtosContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))'; // Garante que o layout seja responsivo
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
}
