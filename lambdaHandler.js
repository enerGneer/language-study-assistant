import { handler } from "./server/lambda/handler.mjs";

export const handler = async (event) => {
  return handler(event);
};
