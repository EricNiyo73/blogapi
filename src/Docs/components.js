export default {
    component: {
      schemas: {
        // user schema
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string", 
              description: "User identification number",
              example: "ytyVgh", 
            },
            email: {
              type: "string", 
              description: "User's email", 
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
              example: "password123", 
            },
          },
        },
      },
  
      // blog schema
      Blog: {
        type: "object", 
        properties: {
          _id: {
            type: "string", 
            description: "Blog identification number", 
            example: "ytyVgh", 
          },
          title: {
            type: "string", 
            description: "Blog's title", 
            example: "5 Tips for Writing a Great Blog Post", 
          },
          content: {
            type: "string", 
            description: "Blog's content", 
            example:
              "Lorem ipsum dolor sit amet, consectetur adipiscing", 
          },
          image: {
            type: "string", 
            description: "Blog's image url", 
            example: "https://example.com/blog/image.jpg", 
          },
          comments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                author: {
                  type: "string",
                  description: "Username of the person who made the comment",
                  example: "JohnDoe",
                },
                comment: {
                  type: "string",
                  description: "The comment made by the user",
                  example: "Good blog, I like it",
                },
              },
            },
          },
        },
      },
    },
  };