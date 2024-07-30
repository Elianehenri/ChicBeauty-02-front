
document.addEventListener("DOMContentLoaded", function() {
    // Função para preencher o <select> com categorias
    function populateCategories() {
        const categoriaSelect = document.getElementById('categoria');

        if (!categoriaSelect) {
            console.warn('Elemento <select> com ID "categoria" não encontrado. A função populateCategories não será executada.');
            return; // Retorna se o elemento não for encontrado
        }

        fetch('http://localhost:3000/api/categories')
            .then(response => response.json())
            .then(categories => {
                categoriaSelect.innerHTML = '<option value="">Selecione</option>';

                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category._id;
                    option.textContent = category.nome;
                    categoriaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao obter categorias:', error));
    }

    // Função para filtrar os produtos
    function filterProducts(category) {
        const allProducts = document.querySelectorAll(".produtos");

        allProducts.forEach(productSection => {
            if (category === "all" || productSection.dataset.category === category) {
                productSection.style.display = "block";
            } else {
                productSection.style.display = "none";
            }
        });
    }

    // Adiciona evento de clique nos links do menu de categorias
    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const category = event.target.dataset.category;
            filterProducts(category);
        });
    });

    // Função para buscar produtos e adicioná-los às categorias corretas
    function fetchProducts() {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);

                const produtosContainers = document.querySelectorAll('.produtos-container');
                produtosContainers.forEach(container => container.innerHTML = '');

                const categoryProductsMap = {};

                data.forEach(produto => {
                    const categoriaNome = produto.categoria;
                    if (!categoryProductsMap[categoriaNome]) {
                        categoryProductsMap[categoriaNome] = [];
                    }
                    categoryProductsMap[categoriaNome].push(produto);
                });

                Object.keys(categoryProductsMap).forEach(category => {
                    const products = categoryProductsMap[category];
                    const displayProducts = window.location.pathname.includes('produtos.html') ? products : products.slice(0, 4);
                    const categoryContainer = document.querySelector(`.produtos[data-category="${category}"] .produtos-container`);
                    if (categoryContainer) {
                        displayProducts.forEach(produto => {
                            const produtoElement = `
                                <div class="produto-single">
                                    <div class="img-produto">
                                        <img src="http://localhost:3000${produto.imagem}" alt="${produto.nome}" />
                                    </div>
                                    <div class="content-produto">
                                        <h2>${produto.nome}</h2>
                                        <h3>R$ ${produto.preco.toFixed(2)}</h3>
                                        <p>3x de R$ ${(produto.preco / 3).toFixed(2)}</p>
                                        <button>COMPRAR</button>
                                        ${window.location.pathname.includes('produtos.html') ? `<button class="btn btn-primary edit-button" onclick="window.location.href='../pages/editProdutos.html?id=${produto._id}'">Editar Produto</button>` : ''}
                                    </div>
                                </div>
                            `;
                            categoryContainer.innerHTML += produtoElement;
                        });
                    } else {
                        console.error('Contêiner não encontrado para a categoria:', category);
                    }
                });
            })
            .catch(error => console.error('Erro:', error));
    }

    // Exibe ou oculta o botão "Cadastrar Novo Produto" conforme a página
    const cadastrarNovoProduto = document.getElementById('cadastrar-novo-produto');
    if (cadastrarNovoProduto) {
        cadastrarNovoProduto.style.display = window.location.pathname.includes('produtos.html') ? 'block' : 'none';
    }

    // Exibe ou oculta o link para a página inicial conforme a página
    const paginaInicial = document.getElementById('pagina-inicial');
    if (paginaInicial) {
        paginaInicial.innerHTML = window.location.pathname.includes('produtos.html') 
            ? '<p>Pagina Inicial <a href="../index.html">Inicio</a></p>' 
            : '';
    }

    // Preenche as categorias e busca os produtos quando a página carregar
    populateCategories();
    fetchProducts();
});
