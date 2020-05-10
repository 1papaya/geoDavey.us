const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const projTemplate = path.resolve(`src/templates/project.js`);

  const result = await graphql(`
    query {
      allProjects: allFile(filter: {sourceInstanceName: {eq: "projects"}, ext: {eq: ".md"}}) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              blurb
              date
              slug
              title
              tags
              url
            }
          }
        }
      }
    }
  `);

  result.data.allProjects.nodes.forEach((node) => {
    let md = node.childMarkdownRemark;

    createPage({
      path: `${md.frontmatter.url}`,
      component: projTemplate,
      context: {
        slug: md.frontmatter.slug,
      },
    });
  });
};
