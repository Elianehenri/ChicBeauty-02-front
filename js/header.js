
document.addEventListener("DOMContentLoaded", function() {
    // Funções para carregar conteúdo
    function loadHeader() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("header-container").innerHTML = this.responseText;
                setupHeaderEvents();
                updateHeaderForLoggedInUser();
            }
        };
        xhttp.open("GET", "../pages/header.html", true);
        xhttp.send();
    }

    function loadCarousel() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("carousel-container").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "../pages/carousel.html", true);
        xhttp.send();
    }

    function loadProdutos() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("produtos-container").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "../pages/produtos.html", true);
        xhttp.send();
    }

    function loadFooter() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("footer-container").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "../pages/footer.html", true);
        xhttp.send();
    }

    loadHeader();
    loadCarousel();
    loadProdutos();
    loadFooter();

    // Função para filtrar produtos
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

    // Configura eventos do cabeçalho após carregar conteúdo
    function setupHeaderEvents() {
        const categoryLinks = document.querySelectorAll(".category-link");

        categoryLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const category = event.target.dataset.category;
                filterProducts(category);

                let menu = document.querySelector(".menu");
                menu.classList.remove("menu-selected");
            });
        });

        filterProducts("all");

        let iconMobile = document.querySelector(".icon-mobile span");
        let buttonClose = document.querySelector(".menu span.close");

        if (iconMobile) {
            iconMobile.addEventListener("click", () => {
                document.querySelector(".menu").classList.add("menu-selected");
                buttonClose.style.display = "flex";
            });
        }

        if (buttonClose) {
            buttonClose.addEventListener("click", (event) => {
                let menu = document.querySelector(".menu");
                menu.style.animation = "slideOut 0.2s forwards";
                setTimeout(() => {
                    menu.style.animation = "";
                    menu.classList.remove("menu-selected");
                }, 200);
                event.stopPropagation();
            });
        }
    }

    // Atualizar cabeçalho para usuário logado
    function updateHeaderForLoggedInUser() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            const loginLink = document.getElementById('loginLink');
            const userDetails = document.getElementById('userDetails');
            const userAvatar = document.getElementById('userAvatar');
            const userName = document.getElementById('userName');
            const personIcon = document.querySelector('.login-option span.material-symbols-outlined');

            // Ocultar o link de login e o ícone de pessoa
            if (loginLink) loginLink.style.display = 'none';
            if (personIcon) personIcon.style.display = 'none';

           // Exibir os detalhes do usuário
        if (userDetails) userDetails.style.display = 'flex';
        if (userAvatar) userAvatar.src = `http://localhost:3000/${user.avatar}`;
        if (userName) userName.textContent = user.nome;

        // Atualizar menu mobile
        const mobileUserDetails = document.getElementById('mobileUserDetails');
        const userAvatarMobile = document.getElementById('userAvatarMobile');
        const userNameMobile = document.getElementById('userNameMobile');
        const mobileLoginOption = document.getElementById('mobileLoginOption');

        // Ocultar login no mobile e mostrar detalhes do usuário
        mobileLoginOption.style.display = 'none';
        if (mobileUserDetails) {
            mobileUserDetails.style.display = 'flex';
            userAvatarMobile.src = `http://localhost:3000/${user.avatar}`;
            userNameMobile.textContent = user.nome;
        }
        }
    }
});

// Função para atualizar o contador de itens do carrinho
function updateCartCounter(count) {
    const cartCounter = document.getElementById("cart-counter");
    const mobileCartCounter = document.getElementById("mobile-cart-counter");
    cartCounter.textContent = count;
    mobileCartCounter.textContent = count;
}
