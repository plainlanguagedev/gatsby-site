import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: "" }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const filteredPosts = posts.filter(
      post =>
        post.node.frontmatter.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase().trim()) ||
        (post.node.frontmatter.aka || "")
          .toLowerCase()
          .includes(this.state.search.toLowerCase().trim())
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {!this.state.search && (
          <p style={{ textAlign: "center" }}>
            All the software development concepts you keep hearing
            about&mdash;in plain language.
          </p>
        )}
        <h3 style={{ marginTop: this.state.search ? 10 : 40 }}>
          What would you like to learn about?
        </h3>
        <input
          type="text"
          onChange={this.handleSearchChange}
          style={{ width: "100%", padding: "5px" }}
          placeholder="(e.g., server-side rendering)"
        />
        {this.state.search &&
          filteredPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3 style={{ margin: "30px 0 0 0" }}>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                {node.frontmatter.aka && (
                  <small>aka: {node.frontmatter.aka}</small>
                )}
              </div>
            )
          })}
        {this.state.search && filteredPosts.length === 0 && (
          <h3>No results.</h3>
        )}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            aka
          }
        }
      }
    }
  }
`
