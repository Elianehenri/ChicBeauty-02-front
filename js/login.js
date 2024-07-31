/* The above code is a JavaScript script that handles a login form functionality. Here is a breakdown
of what the code does: */
/* 
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');
    const showPasswordIcon = document.querySelector('#showPassword');

    // Função para alternar a visibilidade da senha
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPasswordIcon.classList.remove('fa-eye');
            showPasswordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            showPasswordIcon.classList.remove('fa-eye-slash');
            showPasswordIcon.classList.add('fa-eye');
        }
    }

    // Validação de email em tempo real
    emailInput.addEventListener('input', () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (emailPattern.test(emailInput.value)) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
    });

    // Validação de senha em tempo real
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
        }
    });

    // Função para lidar com o envio do formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de submissão

        const email = emailInput.value;
        const senha = passwordInput.value;

        // Validação final antes do envio
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailPattern.test(email) || senha.length < 6) {
            if (!emailPattern.test(email)) {
                emailError.style.display = 'block';
            }
            if (senha.length < 6) {
                passwordError.style.display = 'block';
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas.');
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);

            // Redirecionar para a tela principal (index.html) após o login bem-sucedido
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Erro:', error.message);
            alert('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
        }
    });

    // Adiciona um event listener para o clique no ícone de mostrar senha
    showPasswordIcon.addEventListener('click', togglePasswordVisibility);
});


 */

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');
    const showPasswordIcon = document.querySelector('#showPassword');

    // Função para alternar a visibilidade da senha
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPasswordIcon.classList.remove('fa-eye');
            showPasswordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            showPasswordIcon.classList.remove('fa-eye-slash');
            showPasswordIcon.classList.add('fa-eye');
        }
    }

    // Validação de email em tempo real
    emailInput.addEventListener('input', () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (emailPattern.test(emailInput.value)) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
    });

    // Validação de senha em tempo real
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
        }
    });

    // Função para lidar com o envio do formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de submissão

        const email = emailInput.value;
        const senha = passwordInput.value;

        // Validação final antes do envio
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailPattern.test(email) || senha.length < 6) {
            if (!emailPattern.test(email)) {
                emailError.style.display = 'block';
            }
            if (senha.length < 6) {
                passwordError.style.display = 'block';
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas.');
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);

            // Armazena os dados do usuário no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirecionar para a tela principal (index.html) após o login bem-sucedido
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Erro:', error.message);
            alert('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
        }
    });

    // Adiciona um event listener para o clique no ícone de mostrar senha
    showPasswordIcon.addEventListener('click', togglePasswordVisibility);
});
