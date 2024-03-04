import { handler } from "./server/lambda/handler.js";

export const handler = async (event) => {
  return handler(event);
};
