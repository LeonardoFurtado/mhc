export default class OpenAI {
  constructor() {}

  responses = {
    create: jest.fn().mockResolvedValue({
      output: [
        {
          content: [{ text: "mocked response" }],
        },
      ],
    }),
  };
}
