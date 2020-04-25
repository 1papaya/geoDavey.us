import React from "react";
import { css } from "@emotion/core";

function Postcard(props) {
  return (
    <div
      className="postcard-container relative"
      style={{
        width: "100%",
        paddingBottom: "54%",
      }}
    >
      <div
        className="postcard absolute flex text-sm p-1 h-full w-full bg-cover rounded-lg"
        style={{
          background: `url(${props.background})`,
        }}
      >
        <div className="text h-full w-8/12 flex-col">
          <textarea
            className="w-full h-full resize-none rounded-lg"
            style={{
              background: "rgba(255,255,255,0.5)",
            }}
            css={css`
              &::placeholder {
                  font-family: "BadScript";
                  text-align: center;
                  color: #000;
                  font-size: 3rem;
              }
            `}
            placeholder={props.placeholder}
          ></textarea>
        </div>

        <div className="w-4/12 flex-col">
          <div className="stamp inline-block border-black border p-1 pt-3 pb-3 mb-3 float-right">
              send
          </div>
          <div className="address clear-both  m-2">
            {props.address.map((f) => {
              return (
                <div key={f} className="border-b border-black">
                  {f}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Postcard.defaultProps = {
  background: "rgba(255,255,255,0.5)",
  placeholder: "write me a postcard! :)",
  address: ["geoDavey", "7 Shoelace Ln", "Lovin', IT 36525"],
  stamp: null,
};

export default Postcard;
