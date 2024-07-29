

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Lista de categorias para mapeamento
    const categorias = [
        { id: '6696cc572b69d0e5d852e268', nome: 'perfumaria' },
        { id: '6696cbd52b69d0e5d852e261', nome: 'corpo-e-banho' },
        { id: '6696cc382b69d0e5d852e264', nome: 'cabelos' },
        { id: '6696cc462b69d0e5d852e266', nome: 'make' }
    ];

    // Função para preencher o select de categorias
    function populateCategories() {
        const categoriaSelect = document.getElementById('categoria');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.nome;
            categoriaSelect.appendChild(option);
        });
    }

    // Função para carregar os dados do produto
    function loadProduct() {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nome').value = data.nome;
                document.getElementById('preco').value = data.preco;
                document.getElementById('categoria').value = data.categoria._id; // Assumindo que a categoria é um objeto com _id
                document.getElementById('parcelas').value = data.parcelas;
            })
            .catch(error => console.error('Erro ao carregar produto:', error));
    }

    // Função para lidar com o envio do formulário de cadastro
    function handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById('product-form'));

        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
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
});
