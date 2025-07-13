let lunrIndex;
let searchData = [];

function initPageScripts() {
    // --- Табки ---
    document.querySelectorAll(".tab-buttons").forEach(tabGroup => {
        const buttons = tabGroup.querySelectorAll(".tab-button");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-tab");
                const container = tabGroup.parentElement;

                buttons.forEach(b => b.classList.remove("active"));
                button.classList.add("active");

                container.querySelectorAll(".tab-content").forEach(div => {
                    div.style.display = div.id === targetId ? "block" : "none";
                });
            });
        });
    });

    // --- Кнопка "Наверх" ---
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Оглавление ---
    const tocToggle = document.getElementById("toc-toggle");
    const tocPopup = document.getElementById("toc-popup");
    const tocDynamic = document.getElementById("toc-dynamic");
    const pageToc = document.querySelector(".page-toc");

    if (!tocToggle || !tocPopup || !tocDynamic || !pageToc) return;

    tocDynamic.innerHTML = pageToc.innerHTML;

    tocToggle.replaceWith(tocToggle.cloneNode(true));
    const newTocToggle = document.getElementById("toc-toggle");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            newTocToggle.style.display = "block";
        } else {
            newTocToggle.style.display = "none";
            tocPopup.classList.add("hidden");
        }
    });

    newTocToggle.addEventListener("click", () => {
        tocPopup.classList.toggle("hidden");
    });
}
