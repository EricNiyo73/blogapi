export default {
    get: {
      tags: ["Blog API"],
      summary: "Get all blogs",
      operationId: "getAllBlogs",
      parameters: [],
      responses: {
        200: {
          description: " you have retrieved Blogs  successfully",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                title: { type: "string" },
                desc: { type: "string" },
                photo: { type: "string" },
                username: { type: "string" },
                categories: { type: "string" },
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