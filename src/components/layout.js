import React from "react";

import "../styles/layout.scss";

const Layout = ({ children }) => {
    return (
        <div
        style={{
            width: "100%",
            height: "100%"
        }}
        >
            {children}
        </div>
    )
}

export default Layout