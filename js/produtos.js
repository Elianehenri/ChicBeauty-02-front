
document.addEventListener("DOMContentLoaded", function() {
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

    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const category = event.target.dataset.category || 'all';
            filterProducts(category);
        });
    });

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
                                        <p>${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2)}</p>
                                        ${window.location.pathname.includes('produtos.html') 
                                            ? `<button class="btn btn-primary edit-button" onclick="window.location.href='../pages/editProdutos.html?id=${produto._id}'">Editar Produto</button>` 
                                            : ''}
                                        <button class="btn btn-success buy-button" onclick="buyProduct('${produto._id}')">Comprar</button>
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

    window.buyProduct = function(productId) {
        // Recupera o usuário atual do localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
    
        if (!currentUser) {
            // Usuário não está logado, exibe um alerta e retorna
            alert('Você precisa estar logado para comprar um produto. Faça login e tente novamente.');
            return;
        }
    
        // Se o usuário estiver logado, continue com a compra
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                console.log(`Produto ${productId} comprado!`);
    
                // Recupera produtos comprados do localStorage
                let purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
    
                // Adiciona o produto comprado com informações do usuário
                purchasedProducts.push({
                    ...product,
                    userId: currentUser._id // Adiciona o ID do usuário aos produtos comprados
                });
    
                // Armazena os produtos comprados no localStorage
                localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts));
                
                alert('Produto comprado com sucesso!');
    
                // Redireciona para a página de carrinho
                window.location.href = '../pages/cart.html';
            })
            .catch(error => console.error('Erro ao comprar o produto:', error));
    };
    
    fetchProducts();
});
