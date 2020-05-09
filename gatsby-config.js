require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `🌍 🌎 🌏 🌍 🌎 🌏 🌍 🌎 🌏`,
    author: {
      name: `geoDavey`,
    },
    description: `geoDavey website`,
    siteUrl: `https://geoDavey.us/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        maxResults: 500,
        context: true,
        tags: true,
      },
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        maxResults: 500,
        context: true,
        tags: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
       resolve: "gatsby-plugin-transition-link",
       options: {
           layout: require.resolve(`./src/components/layouts/page.js`)
         }
    },
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")],
      },
    },
    `gatsby-transformer-remark`,
    { 
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true,
        whitelist: ["transitioning", "tl-edges", "tl-wrapper"]
      }
    }
  ],
};
