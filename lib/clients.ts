import { createActionClient } from "./data/server";

export const createAction = createActionClient({
  onError: (error) => {
    console.error("🚨 Action error:", error);
  },
});
