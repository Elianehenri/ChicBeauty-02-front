/* 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');
    const nascimentoInput = document.getElementById('nascimento');
    const idadeError = document.getElementById('idadeError');

    // Adicionar um evento de envio ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form);

        // Enviar dados para o backend
        fetch(`${window.NEXT_PUBLIC_API_URL}/api/users/register`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o usuário. Código HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Verificar a resposta do servidor
            if (data.success) {
                // Redirecionar para a página de login
                window.location.href = 'login.html';
            } else {
                // Exibir mensagem de erro do servidor
                throw new Error('Erro ao cadastrar o usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
 */

/* document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    // Adicionar um evento de envio ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form);

        // Log dos dados do formulário
        console.log('Dados do formulário:', Object.fromEntries(formData.entries()));

        // Enviar dados para o backend
        fetch(`http://localhost:3000/api/users/register`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o usuário. Código HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Verificar a resposta do servidor
            console.log('Resposta do servidor:', data); // Log da resposta do servidor
            if (data.newUser) {
                // Redirecionar para a página de login
                window.location.href = 'login.html';
            } else {
                throw new Error('Erro ao cadastrar o usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
 */

/* document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form);
        console.log("Form Data:", {
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha'),
        });

        fetch(`http://localhost:3000/api/users/register`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o usuário. Código HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.newUser) {
                window.location.href = 'login.html';
            } else {
                throw new Error('Erro ao cadastrar o usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
 */
/* 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form);
        console.log("Form Data:", {
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha'),
        });

        // Enviar dados para o backend
        fetch(`http://localhost:3000/api/users/register`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log("Response Status:", response.status); // Log do status da resposta
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o usuário. Código HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response Data:", data); // Log dos dados da resposta
            if (data.newUser) {
                window.location.href = 'login.html';
            } else {
                throw new Error('Erro ao cadastrar o usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        console.log("Form Data:", formData);

        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log("Response Status:", response.status); 
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o usuário. Código HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response Data:", data); 
            if (data.newUser) {
                window.location.href = 'login.html';
            } else {
                throw new Error('Erro ao cadastrar o usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
