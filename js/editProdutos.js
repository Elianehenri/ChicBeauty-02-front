document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Função para preencher o select de categorias
    function populateCategories() {
        fetch('http://localhost:3000/api/categories') // Supondo que você tenha uma rota para categorias
            .then(response => response.json())
            .then(data => {
                const categoriaSelect = document.getElementById('categoria');
                data.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria._id;
                    option.textContent = categoria.nome;
                    categoriaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar categorias:', error));
    }

    // Preenche o select de categorias ao carregar a página
    populateCategories();

    // Função para carregar os dados do produto
    function loadProduct() {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('product-id').value = data._id;
                document.getElementById('nome').value = data.nome;
                document.getElementById('preco').value = data.preco;
                document.getElementById('categoria').value = data.categoria._id; // Assumindo que a categoria é um objeto com _id
                document.getElementById('parcelas').value = data.parcelas;
            })
            .catch(error => console.error('Erro ao carregar produto:', error));
    }

    // Carrega os dados do produto ao carregar a página
    loadProduct();

    // Adiciona o evento de submit para o formulário de edição
    document.getElementById('edit-product-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Produto atualizado com sucesso!');
            window.location.href = 'produtos.html'; // Redireciona para a página de produtos
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
    });
});
