const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = class {
    data() {
        return {
            permalink: "/search-index.json",
            eleventyExcludeFromCollections: true
        };
    }

    render() {
        const contentDir = path.resolve(__dirname); // ./content
        const pages = [];

        const walk = dir => {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory()) {
                    walk(fullPath);
                } else if (entry.name.endsWith(".md")) {
                    const raw = fs.readFileSync(fullPath, "utf-8");
                    const { data: frontmatter } = matter(raw);

                    const url = fullPath
                        .replace(contentDir, "")
                        .replace(/\\/g, "/")
                        .replace(/\.md$/, "/");

                    if (!frontmatter.keywords || !Array.isArray(frontmatter.keywords)) continue;

                    pages.push({
                        url: url.startsWith("/") ? url : "/" + url,
                        title: frontmatter.title || path.basename(entry.name, ".md"),
                        keywords: frontmatter.keywords
                    });
                }
            }
        };

        walk(contentDir);

        return JSON.stringify(pages, null, 2);
    }
};
