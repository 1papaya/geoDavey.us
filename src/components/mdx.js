import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { PageTransitionLink } from "./layouts/page";
import theme from "prism-react-renderer/themes/nightOwlLight";
import Highlight, { defaultProps } from "prism-react-renderer";

const Code = (props) => {
  const language = props.className.replace(/language-/, "");

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="text-xs p-2 overflow-x-auto"
          style={{ ...style }}
        >
          {tokens.map((line, i) => {
            if (i !== tokens.length - 1)
              // ignore last line
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
          })}
        </pre>
      )}
    </Highlight>
  );
};

const components = {
  code: (props) => <Code {...props} />,
  a: (props) => {
    console.log(props);
    if (props.href.indexOf("//") === -1)
      return (
        <PageTransitionLink to={props.href}>
          {props.children}
        </PageTransitionLink>
      );
    else return <a {...props} />;
  },
  PageTransitionLink
};

export default (props) => (
  <MDXProvider components={components}>
    <MDXRenderer>{props.children}</MDXRenderer>
  </MDXProvider>
);
