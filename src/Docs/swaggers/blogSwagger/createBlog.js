export default {
    post: {
      tags: ["Blog API"],
      description: "Create a new blog post",
      operationId: "createBlog",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the blog",
                  example: "Best way to study Node js",
                },
                content: {
                  type: "string",
                  description: "Content of the blog post",
                  example: "Node js is the best programming language language",
                },
                photo: {
                  type: "file",
                  description: "Image for the blog post",
                },
                username: {
                  type: "string",
                  description: "your name",
                },
                categories: {
                  type: "string",
                  description: "categories of the blog post",
                },
              },
              required: ["title", "content", "image", "author", "categories"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Blog post created successfully",
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "ID of the created blog post",
              },
              title: {
                type: "string",
                description: "Title of the created blog post",
              },
              desc: {
                type: "string",
                description: "Content of the created blog post",
              },
              photo: {
                type: "string",
                description: "Image URL of the created blog post",
              },
              username: {
                type: "string",
                description: "success",
              },
              category: {
                type: "string",
                description: "category added successfully",
              },
            },
          },
        },
        400: {
          description: "Invalid input provided",
        },
        500: {
          description: "Server error",
        },
      },
    },
  };