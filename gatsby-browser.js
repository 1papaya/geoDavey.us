const { wrapWithProvider } = require("./src/state/wrap-with-provider");
import("./src/styles/site.scss");

module.exports = {
    wrapRootElement: wrapWithProvider,
    disableCorePrefetching: () => true
}