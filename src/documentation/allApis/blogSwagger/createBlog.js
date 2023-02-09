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
                  description: "Title of the blog post",
                  example: "How to Build a RESTful API",
                },
                content: {
                  type: "string",
                  description: "Content of the blog post",
                  example: "Building a RESTful API is a great way to...",
                },
                image: {
                  type: "file",
                  description: "Image for the blog post",
                },
              },
              required: ["title", "content", "image"],
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
              content: {
                type: "string",
                description: "Content of the created blog post",
              },
              image: {
                type: "string",
                description: "Image URL of the created blog post",
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