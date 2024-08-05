
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#loginForm');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');
    const showPasswordIcon = document.querySelector('#showPassword');

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

    emailInput.addEventListener('input', () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (emailPattern.test(emailInput.value)) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            passwordError.style.display = 'none';
        } else {
            passwordError.style.display = 'block';
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const senha = passwordInput.value;

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

            // Limpa os produtos comprados do localStorage do usuário anterior
            localStorage.removeItem('purchasedProducts');
            
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

    showPasswordIcon.addEventListener('click', togglePasswordVisibility);
});
