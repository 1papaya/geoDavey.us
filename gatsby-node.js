const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve(`src/templates/blog.js`);

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              blurb
              date
              image
              tags
              slug
              title
            }
            html
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: blogTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
