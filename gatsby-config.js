module.exports = {
  siteMetadata: {
    title: `geoDavey.us`,
    author: {
        name: `geoDavey`
    },
    description: `geoDavey website`,
    siteUrl: `https://geoDavey.us/`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ],
};