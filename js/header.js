

document.addEventListener("DOMContentLoaded", function() {
    // Funções para carregar conteúdo
    function loadHeader() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("header-container").innerHTML = this.responseText;
                setupHeaderEvents();
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
});

// Função para atualizar o contador de itens do carrinho
function updateCartCounter(count) {
    const cartCounter = document.getElementById("cart-counter");
    const mobileCartCounter = document.getElementById("mobile-cart-counter");
    cartCounter.textContent = count;
    mobileCartCounter.textContent = count;
}
 

