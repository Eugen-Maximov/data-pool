let ENEMIES_INDEX = null;

async function loadEnemiesIndex() {
    if (ENEMIES_INDEX) return ENEMIES_INDEX;

    const url = window.__BASE_PATH__ + "data/enemies/enemies-index.json";
    console.log("Fetching enemies index from:", url);

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Не удалось загрузить enemies.json: " + res.status);
    }

    ENEMIES_INDEX = await res.json();
    console.log("Enemies index:", ENEMIES_INDEX);
    return ENEMIES_INDEX;
}

async function loadEnemyFile(path) {
    const cleanPath = path.replace(/^\//, "");
    const url = window.__BASE_PATH__ + cleanPath;
    console.log("Fetching enemy file:", url);
    const res = await fetch(url);
    if (!res.ok) {
        console.error("Enemy file fetch error:", res.status, url);
        return null;
    }
    return await res.json();
}

function buildEnemyTierMenu(data) {
    const tierContainer = document.getElementById("enemy-tier-buttons");
    const typeContainer = document.getElementById("enemy-type-buttons");
    if (!tierContainer || !typeContainer) {
        console.warn("Нет контейнеров enemy-tier-buttons / enemy-type-buttons в разметке");
        return;
    }

    tierContainer.innerHTML = "";
    typeContainer.innerHTML = "";

    const tiers = Array.isArray(data.tiers) ? data.tiers : [];
    if (!tiers.length) {
        console.warn("В enemies.json нет tiers или он пустой", data);
        return;
    }

    tiers.forEach(tier => {
        const btn = document.createElement("button");
        btn.className = "enemy-tier-btn";
        btn.textContent = tier.name || tier.id;

        btn.addEventListener("click", () => {
            tierContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            buildEnemyTypeMenu(tier);
        });

        tierContainer.appendChild(btn);
    });

    tierContainer.querySelector("button")?.classList.add("active");
    buildEnemyTypeMenu(tiers[0]);
}

function buildEnemyTypeMenu(tier) {
    const typeContainer = document.getElementById("enemy-type-buttons");
    const detailsContainer = document.getElementById("enemy-details");
    if (!typeContainer || !detailsContainer) {
        console.warn("Нет enemy-type-buttons / enemy-details");
        return;
    }

    typeContainer.innerHTML = "";
    detailsContainer.innerHTML = "<p>Выбери противника слева.</p>";

    if (!tier || !Array.isArray(tier.types)) {
        console.error("У tier нет поля types", tier);
        return;
    }

    tier.types.forEach(type => {
        const btn = document.createElement("button");
        btn.className = "enemy-type-btn";
        btn.textContent = type.name || type.id;

        btn.addEventListener("click", async () => {
            typeContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const enemy = await loadEnemyFile(type.file);
            if (!enemy) return;

            buildEnemyDetails(enemy);
        });

        typeContainer.appendChild(btn);
    });
    if (tier.types[0]) {
        typeContainer.querySelector("button")?.classList.add("active");

        (async () => {
            const enemy = await loadEnemyFile(tier.types[0].file);
            if (enemy) buildEnemyDetails(enemy);
        })();
    }
}

function buildEnemyDetails(enemy) {
    const container = document.getElementById("enemy-details");

    if (!enemy || !enemy.stats) {
        console.error("buildEnemyDetails: enemy без stats", enemy);
        container.innerHTML = "<p>Ошибка: нет данных по врагу.</p>";
        return;
    }

    container.innerHTML = `
        <div class="enemy-layout">

            <div class="enemy-column stats-column">
                <h2>${enemy.name}</h2>

                <div class="stat"><b>HP:</b> ${enemy.stats.hp}</div>
                <div class="stat"><b>SAVE:</b> ${enemy.stats.save}</div>
                <div class="stat"><b>REF:</b> ${enemy.stats.ref}</div>
                <div class="stat"><b>BODY:</b> ${enemy.stats.body}</div>

                <h3>Характеристики</h3>
                <ul>
                    ${Object.entries(enemy.stats)
        .map(([key, value]) => `<li><b>${key.toUpperCase()}:</b> ${value}</li>`)
        .join("")}
                </ul>
            </div>

            <div class="enemy-column center-column">
                 <div class="silhouette-box">
                     <div class="silhouette-wrapper">
                        <img src="${window.__BASE_PATH__}images/content/enemies/silhouette.png" class="silhouette-img">
                        <div class="slot slot-head">Шлем</div>
                        <div class="slot slot-body">Броня</div>
                        <div class="slot slot-hand">Оружие</div>
                     </div>
                 </div>

                <h3>Экипировка</h3>
                <div class="equipment">
                    <p><b>Шлем:</b> ${enemy.equipment?.helmet?.name || "-"}</p>
                    <p><b>Броня:</b> ${enemy.equipment?.armor?.name || "-"}</p>

                    <h4>Оружие</h4>
                    <ul>
                        ${(enemy.equipment?.weapons || [])
        .map(w => `<li>${w.name} (${w.dmg})</li>`)
        .join("")}
                    </ul>

                    <h4>Снаряжение</h4>
                    <ul>
                        ${(enemy.equipment?.gear || [])
        .map(g => `<li>${g.name}: ${g.count}</li>`)
        .join("")}
                    </ul>
                </div>
            </div>

            <div class="enemy-column skills-column">
                <h3>Навыки</h3>
                <div class="skills-list">
                    ${Object.entries(enemy.skills || {})
        .map(([group, skills]) => formatSkillGroup(group, skills))
        .join("")}
                </div>
            </div>

        </div>
    `;
}

function formatSkillGroup(group, skills) {
    return `
        <div class="skill-group">
            <h4>${group}</h4>
            <ul>
                ${Object.entries(skills)
        .map(([name, value]) => {
            if (Array.isArray(value)) {
                return `<li>${name}: ${value.map(v => `${v.name} (${v.level})`).join(", ")}</li>`;
            }
            return `<li>${name}: ${value}</li>`;
        })
        .join("")}
            </ul>
        </div>
    `;
}

async function initEnemiesModule() {
    try {
        const index = await loadEnemiesIndex();
        buildEnemyTierMenu(index);
    } catch (e) {
        console.error("initEnemiesModule error:", e);
    }
}