export default {
    get: {
      tags: ["User API"],
      description: "Get all users",
      operationId: "getUser",
      parameters: [],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  };