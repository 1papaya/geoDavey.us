import React from "react"

const Layout = ({ children }) => {
    return (
        <div
        style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: "100%",
            height: "100%"
        }}
        >
            <main>{children}</main>
        </div>
    )
}

export default Layout