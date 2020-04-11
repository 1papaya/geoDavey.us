import React from "react"

const Layout = ({ children }) => {
    return (
        <div
        style={{
            marginLeft: 'auto',
            marginRight: 'auto'
        }}
        >
            <main>{children}</main>
        </div>
    )
}

export default Layout