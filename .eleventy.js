module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    return {
        dir: {
            input: "content",
            includes: "../templates/includes",
            layouts: "../templates/layouts",
            output: "docs"
        }
    };
};