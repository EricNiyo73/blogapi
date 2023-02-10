export default {
    get: {
      tags: ["Blog API"],
      summary: "Get a single blog by ID",
      operationId: "getSingleBlog",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of the blog to retrieve",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: " You have retrieved one blog  successfully",
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "ID of the blog post",
              },
              title: {
                type: "string",
                description: "Title of the blog post",
              },
              desc: {
                type: "string",
                description: "Content of the blog post",
              },
              photo: {
                type: "string",
                description: "Image URL of the blog post",
              },
            },
          },
        },
        400: {
          description: "Invalid input provided",
        },
        404: {
          description: "Blog not found",
        },
        500: {
          description: "Server error",
        },
      },
    },
  };