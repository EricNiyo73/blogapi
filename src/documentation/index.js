import servers from "./server.js";
import components from "./components.js";
import tags from "./tags.js";
import {getAllBlogs} from "./allApis/index.js";
import { loginSpec, userSpec, blogSpec } from "./swagger.js";

export default {
  ...servers,
  ...components,
  ...tags,
  ...getAllBlogs,
  ...loginSpec,
  ...userSpec,
  ...blogSpec,
};
