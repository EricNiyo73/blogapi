import getUser from "./userSwagga/getUser";
import postUser from "./userSwagga/postUser";
import deleteUser from "./userSwagga/deleteUser";
import login from "./logInSwagger/login";

import createBlog from "./blogSwagger/createBlog";
import getSingleBlog from "./blogSwagger/getSingleBlog";
import getAllBlogs from "./blogSwagger/getAllBllogs";
import updateBlog from "./blogSwagger/updateBlog";
import deleteBlog from "./blogSwagger/deleteBlog";

import addComment from "./blogSwagger/CommentSwagger/addComment";


export default {
  paths: {
    "/api/auth/login": {
      ...login,
    },

    "/api/auth/signup": {
      ...postUser,
    },
    "/api/users/{id}": {
      ...deleteUser,
      ...getUser,
    },
    "/api/posts/create": {
      ...createBlog,
    },
    "/api/posts/": {
      ...getAllBlogs,
    },
    "/api/posts/{id}": {
      ...getSingleBlog,
      ...updateBlog,
      ...deleteBlog,
    },

    "/api/comment/blogs/:blogId/comments": {
      ...addComment,
    },
  },
};
