export default {
    post: {
      tags: ["User API"],
      description: "Create a new user",
      operationId: "createUser",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "User's email address",
                  example: "brenda@example.com",
                },
                username: {
                  type: "string",
                  description: "User's username",
                  example: "Brenda",
                },
                password: {
                  type: "string",
                  description: "User's password",
                  example: "test123",
                },
              },
              required: [
                "username",
                "email",
                "password",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
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