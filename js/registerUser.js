

/* document.addEventListener('DOMContentLoaded', function() {
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
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form); // Usa FormData para incluir o arquivo do avatar

        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            body: formData // Envia o FormData que inclui o arquivo
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
