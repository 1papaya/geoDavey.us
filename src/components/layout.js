import React from "react";
import { graphql, useStaticQuery } from "gatsby";

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      gD_lite256: file(relativePath: { eq: "img/gD_lite.png" }) {
        childImageSharp {
          fixed(width: 256, height: 256) {
            src
          }
        }
      }
    }
  `);

  return (
    <div className="w-full h-full">
      <div className="w-full md:min-h-full flex justify-center sm:items-start md:items-center">
        <div className="flex m-8 rounded-lg">
          <div className="flex flex-col mr-4" style={{ maxWidth: 80 }}>
            <img
              alt="geoDavey logo"
              src={data.gD_lite256.childImageSharp.fixed.src}
            />
            <div className="text-sm mt-2 text-right font-palanquin">
              <div className="p-1">home &raquo;</div>
              <div className="p-1 hover:cursor-pointer">blog &raquo;</div>
              <div className="p-1 hover:cursor-pointer">projects &raquo;</div>
              <div className="p-1">contact &raquo;</div>
              <div className="p-1 hover:cursor-pointer">&lt;3 &raquo;</div>
            </div>
          </div>

          <div
            className="flex p-2 flex-wrap relative rounded-lg overflow-hidden"
            style={{
              width: 512,
              height: 2000,
              background: "rgba(0,0,0,0.075)",
            }}
          >
            { children }
          </div>
        </div>
      </div>
    </div>
  );
};