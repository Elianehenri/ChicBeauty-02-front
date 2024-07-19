
document.addEventListener("DOMContentLoaded", function() {
    // Lista de categorias para mapeamento
    const categorias = [
        { id: '6696cc572b69d0e5d852e268', nome: 'perfumaria' },
        { id: '6696cbd52b69d0e5d852e261', nome: 'corpo-e-banho' },
        { id: '6696cc382b69d0e5d852e264', nome: 'cabelos' },
        { id: '6696cc462b69d0e5d852e266', nome: 'make' }
    ];

    function getCategoriaNome(categoriaId) {
        const categoria = categorias.find(cat => cat.id === categoriaId);
        return categoria ? categoria.nome : null;
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

    // Filtra os produtos para mostrar todos inicialmente
    filterProducts("all");

    // Função para buscar produtos e adicioná-los às categorias corretas
    function fetchProducts() {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verifique os dados retornados

                const produtosContainers = document.querySelectorAll('.produtos-container');
                produtosContainers.forEach(container => container.innerHTML = '');

                const categoryProductsMap = {};

                // Agrupa os produtos por categoria
                data.forEach(produto => {
                    const categoriaNome = produto.categoria;
                    if (!categoryProductsMap[categoriaNome]) {
                        categoryProductsMap[categoriaNome] = [];
                    }
                    categoryProductsMap[categoriaNome].push(produto);
                });

                // Adiciona até 4 produtos por categoria
                Object.keys(categoryProductsMap).forEach(category => {
                    const products = categoryProductsMap[category].slice(0, 4);
                    const categoryContainer = document.querySelector(`.produtos[data-category="${category}"] .produtos-container`);
                    if (categoryContainer) {
                        products.forEach(produto => {
                            const produtoElement = `
                                <div class="produto-single">
                                    <div class="img-produto">
                                        <img src="${produto.imagem}" alt="${produto.nome}" />
                                    </div>
                                    <div class="content-produto">
                                        <h2>${produto.nome}</h2>
                                        <h3>R$ ${produto.preco.toFixed(2)}</h3>
                                        <p>3x de R$ ${(produto.preco / 3).toFixed(2)}</p>
                                        <button>COMPRAR</button>
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

    fetchProducts();
});
