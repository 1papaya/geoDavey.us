import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.siteTitle
    
    return (
        <Layout>
            <SEO title="home" />

            Hello world! {siteTitle}
        </Layout>
    )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`