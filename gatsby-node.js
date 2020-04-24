require(`@babel/register`)({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["remove-graphql-queries"]
});

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // add maps metadata from maps pages
  if (node.internal.type === `SitePage`) {
    if (RegExp("\/maps\/.+").test(node.path)) {
        const { metadata } = require(node.component);

        Object.entries(metadata).forEach(
            ([key, val]) => createNodeField({
                node,
                name: key,
                value: val
            })
        );
    }
  }
};
