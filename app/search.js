let lunrIndex;
let searchData = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(window.__BASE_PATH__ + "search-index.json");
        searchData = await res.json();

        lunrIndex = lunr(function () {
            this.use(lunr.ru);
            this.ref("url");
            this.field("title");
            this.field("keywords");

            searchData.forEach(doc => {
                this.add({
                    url: doc.url,
                    title: doc.title,
                    keywords: Array.isArray(doc.keywords) ? doc.keywords.join(" ") : ""
                });
            });
        });

        const input = document.getElementById("search-input");
        const resultsList = document.getElementById("search-results");

        input.addEventListener("input", () => {
            const query = input.value.trim();
            resultsList.innerHTML = "";
            if (!query) {
                resultsList.style.display = "none";
                return;
            }

            const results = lunrIndex.search(query);
            if (results.length === 0) {
                resultsList.innerHTML = "<li>Ничего не найдено</li>";
                resultsList.style.display = "block";
                return;
            }

            for (const result of results) {
                const page = searchData.find(d => d.url === result.ref);
                const item = document.createElement("li");
                const link = document.createElement("a");
                link.href = window.__BASE_PATH__ + page.url;
                link.textContent = page.title;
                item.appendChild(link);
                resultsList.appendChild(item);
            }

            resultsList.style.display = "block";
        });

    } catch (err) {
        console.error("Ошибка загрузки search-index.json", err);
    }
});

document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

document.getElementById("scrollToTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", () => {
    const tocToggle = document.getElementById("toc-toggle");
    const tocPopup = document.getElementById("toc-popup");
    const tocDynamic = document.getElementById("toc-dynamic");
    const pageToc = document.querySelector(".page-toc");

    if (!pageToc || !tocToggle || !tocDynamic) return;

    tocDynamic.innerHTML = pageToc.innerHTML;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            tocToggle.style.display = "block";
        } else {
            tocToggle.style.display = "none";
            tocPopup.classList.add("hidden");
        }
    });

    tocToggle.addEventListener("click", () => {
        tocPopup.classList.toggle("hidden");
    });
});