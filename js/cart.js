
document.addEventListener("DOMContentLoaded", function() {
    function fetchPurchasedProducts() {
        const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
        const produtosContainer = document.getElementById('produtos-comprados');
        produtosContainer.innerHTML = '';

        if (purchasedProducts.length === 0) {
            produtosContainer.innerHTML = '<p>Nenhum produto comprado ainda.</p>';
        } else {
            purchasedProducts.forEach(produto => {
                const produtoElement = `
                    <div class="produto-card">
                        <div class="img-produto">
                            <img src="http://localhost:3000${produto.imagem}" alt="${produto.nome}" />
                        </div>
                        <div class="content-produto">
                            <h2>${produto.nome}</h2>
                            <h3>R$ ${produto.preco.toFixed(2)}</h3>
                            <p>${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2)}</p>
                        </div>
                    </div>
                `;
                produtosContainer.innerHTML += produtoElement;
            });
        }
    }

    function logout() {
        localStorage.removeItem('purchasedProducts');
        window.location.href = '../index.html';
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    fetchPurchasedProducts();
});
