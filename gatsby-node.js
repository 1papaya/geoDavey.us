const path = require("path");
require("dotenv").config();

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  //
  // PROJECTS
  //
  const projTemplate = path.resolve(`src/templates/project.js`);

  const result = await graphql(`
    query {
      allProjects: allFile(
        filter: {
          sourceInstanceName: { eq: "projects" }
          ext: { eq: ".md" }
          childMarkdownRemark: { frontmatter: { display: { eq: true } } }
        }
      ) {
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

  //
  // MAPS
  //

  const maps = await graphql(`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "maps_js" }, ext: { eq: ".js" } }
      ) {
        nodes {
          absolutePath
          name
        }
      }
    }
  `);

  // make route for maps on top level (ex. gdv.us/map-name)
  maps.data.allFile.nodes.forEach((node) => {
    createPage({
      path: `${node.name}/`,
      component: node.absolutePath,
      context: {
        isMap: true
      }
    });
  });
};
