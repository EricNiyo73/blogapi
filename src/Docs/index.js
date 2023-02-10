import servers from "./server.js";
import components from "./components.js";
import tags from "./tags.js";
import getswaggers from "./swaggers/index.js";
import {blogSpec } from "./swagger.js";

export default {
  ...servers,
  ...components,
  ...tags,
  ...getswaggers,
  ...blogSpec,
};
