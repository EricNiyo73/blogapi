import { loginSpec, userSpec, blogSpec } from "./swagger";
export default {
    ...loginSpec,
    ...userSpec,
    ...blogSpec,
  };
  