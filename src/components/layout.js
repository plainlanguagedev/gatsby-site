import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Image from "gatsby-image"
import "./style.css"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }

    return (
      <StaticQuery
        query={bioQuery}
        render={data => {
          return (
            <div style={{ height: "100%" }}>
              <div
                style={{
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  maxWidth: rhythm(30),
                  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <header style={{ textAlign: "center" }}>
                    <Image
                      fixed={data.avatar.childImageSharp.fixed}
                      alt="PlainLanguage.dev"
                      style={{
                        marginRight: rhythm(1 / 2),
                        marginBottom: 0,
                        minWidth: 50,
                        borderRadius: `100%`,
                      }}
                      imgStyle={{
                        borderRadius: `50%`,
                      }}
                    />
                    {header}
                  </header>
                  <main>{children}</main>
                </div>
                <footer style={{ textAlign: "center", marginTop: "10px" }}>
                  <hr />© {new Date().getFullYear()} PlainLanguage.dev
                  <br />
                  Built with <span style={{ color: "#FF0000" }}>
                    &hearts;
                  </span>{" "}
                  using
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Layout
