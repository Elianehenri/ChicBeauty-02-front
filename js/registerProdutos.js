
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Função para preencher o select de categorias com dados do servidor
    function populateCategories() {
        fetch('http://localhost:3000/api/categories') // Supondo que a rota é /api/categories
            .then(response => response.json())
            .then(categorias => {
                const categoriaSelect = document.getElementById('categoria');
                categoriaSelect.innerHTML = ''; // Limpa as opções existentes
                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria._id; // O valor é o ID da categoria
                    option.textContent = categoria.nome;
                    categoriaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar categorias:', error));
    }

    // Função para carregar os dados do produto (se estiver editando um produto existente)
    function loadProduct() {
        if (!productId) return; // Não faz nada se não há ID de produto

        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nome').value = data.nome;
                document.getElementById('preco').value = data.preco;
                document.getElementById('categoria').value = data.categoria._id || ''; // Assumindo que a categoria é um objeto com _id
                document.getElementById('parcelas').value = data.parcelas;

                // Exibe a imagem, se disponível
                const imageElement = document.getElementById('product-image');
                if (data.imagem) {
                    imageElement.src = `http://localhost:3000${data.imagem}`;
                    imageElement.alt = data.nome || 'Imagem do produto';
                }
            })
            .catch(error => console.error('Erro ao carregar produto:', error));
    }
 


    // Função para lidar com o envio do formulário de cadastro
    function handleFormSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(document.getElementById('product-form'));
    
        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: formData // Envia o FormData diretamente
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Erro ${response.status}: ${errorData.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Produto cadastrado com sucesso!');
            document.querySelector('.formulario__acoes').style.display = 'none';
            document.querySelector('.post-submission').style.display = 'flex';
        })
        .catch(error => console.error('Erro ao cadastrar produto:', error));
    }
    

    // Preenche as categorias e configura o listener de submissão do formulário
    populateCategories();
    document.getElementById('product-form').addEventListener('submit', handleFormSubmit);

    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = '../pages/produtos.html'; // Redireciona para a página de produtos
    });

    document.getElementById('add-more-button').addEventListener('click', function() {
        window.location.reload(); // Recarrega a página para adicionar mais produtos
    });

    // Carrega o produto se o ID estiver presente na URL
    loadProduct();
});
