module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    return {
        dir: {
            input: "content",
            includes: "../templates",
            layouts: "../templates/layouts",
            output: "docs"
        }
    };
};