export default {
    get: {
      tags: ["Blog API"],
      summary: "Get all blogs",
      operationId: "getAllBlogs",
      parameters: [],
      responses: {
        200: {
          description: "Blogs retrieved successfully",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                title: { type: "string" },
                content: { type: "string" },
                image: { type: "string" },
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  };