const { wrapWithProvider } = require("./src/state/wrap-with-provider");
require("./src/styles/site.scss");

module.exports = {
    wrapRootElement: wrapWithProvider,
    disableCorePrefetching: () => true
}