
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(form);

        fetch('http://localhost:3000/api/users/register', {
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
