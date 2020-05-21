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

  //const maps = await graphql(`
  //  query {
  //    allFile(
  //      filter: { sourceInstanceName: { eq: "maps_js" }, ext: { eq: ".js" } }
  //    ) {
  //      nodes {
  //        absolutePath
  //        name
  //      }
  //    }
  //  }
  //`);

  // make route for maps on top level (ex. gdv.us/map-name)
  //maps.data.allFile.nodes.forEach((node) => {
  //  createPage({
  //    path: `${node.name}`,
  //    component: node.absolutePath,
  //  });
  //});
};

const options = {
  secret: process.env.FAUNA_SECRET_KEY,
  index: "now",
  type: "now",
};

const faunadb = require("faunadb");
const q = faunadb.query;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  options
) => {
  const { createNode } = actions;
  const { secret, type, index, arguments: args = [] } = {
    secret: process.env.FAUNA_SECRET_KEY,
    index: "now",
    type: "now",
  };

  const client = new faunadb.Client({ secret });

  try {
    const size =
      options.size != null ? options.size + 1 : q.Count(q.Var("result"));

    const documents = await client.query(
      q.Let(
        { result: q.Match(q.Index(index), ...args) },
        q.Map(
          q.Select("data", q.Paginate(q.Var("result"), { size })),
          q.Lambda("ref", q.Get(q.Var("ref")))
        )
      )
    );

    console.log(documents);

    documents.forEach((document) => {
      const id = document.ref.id || document.ref["@ref"].id;
      if (document.data == null) {
        return;
      }

      createNode({
        ...document.data,
        id: createNodeId(`faunadb-${type}-${id}`),
        _id: document.ref.id,
        _ts: document.ts,
        parent: null,
        children: [],
        internal: {
          type: type,
          content: JSON.stringify(document.data),
          contentDigest: createContentDigest(document.data),
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};
