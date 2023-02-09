export default {
    patch: {
      tags: ["Blog API"],
      summary: "Update a blog by id",
      operationId: "updateBlog",
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of the blog to update",
          required: true,
          type: "string",
        },
      ],
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
              required: ["title", "content"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Blog updated successfully",
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