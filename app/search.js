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
