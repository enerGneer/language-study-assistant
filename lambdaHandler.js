import { handler as serverHandler } from "./server/lambda/handler.js";

export const handler = async (event) => {
  return serverHandler(event);
};
