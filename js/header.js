
document.addEventListener("DOMContentLoaded", function() {
    function loadHeader() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("header-container").innerHTML = this.responseText;
                setupHeaderEvents();
                updateHeaderForLoggedInUser();
                loadProductScript(); // Carrega o script produto.js após o cabeçalho ser carregado
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

    function loadProductScript() {
        var script = document.createElement('script');
        script.src = './produtos.js'; // Caminho para o seu script produto.js
        script.onload = function() {
            console.log('Script produto.js carregado com sucesso.');
        };
        script.onerror = function() {
            console.error('Erro ao carregar o script produto.js.');
        };
        document.head.appendChild(script);
    }

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

    function updateHeaderForLoggedInUser() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            const loginLink = document.getElementById('loginLink');
            const personIcon = document.querySelector('#desktopLoginOption .material-symbols-outlined');
            const desktopUserDetails = document.getElementById('desktopUserDetails');
            const userNameDesktop = document.getElementById('userNameDesktop');
            const logoutButtonDesktop = document.getElementById('logoutButtonDesktop');

            if (loginLink) loginLink.style.display = 'none';
            if (personIcon) personIcon.style.display = 'none';

            if (desktopUserDetails) {
                desktopUserDetails.style.display = 'flex';
                if (userNameDesktop) userNameDesktop.textContent = user.nome;
            }

            const mobileUserDetails = document.getElementById('mobileUserDetails');
            const userNameMobile = document.getElementById('userNameMobile');
            const mobileLoginOption = document.getElementById('mobileLoginOption');
            const logoutButtonMobile = document.getElementById('logoutButtonMobile');

            if (mobileLoginOption) mobileLoginOption.style.display = 'none';
            if (mobileUserDetails) {
                mobileUserDetails.style.display = 'flex';
                if (userNameMobile) userNameMobile.textContent = user.nome;
            }

            const logoutButtons = document.querySelectorAll('.logoutButton');
            logoutButtons.forEach(button => {
                button.addEventListener('click', function() {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.reload();
                });
            });
        }
    }

    loadHeader();
    loadCarousel();
    loadProdutos();
    loadFooter();
});
