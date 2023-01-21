import { initTRPC } from "@trpc/server";
import { z } from "zod";

const posts = [{ name: "first post" }];

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure.query(() => "world"),
  postGet: publicProcedure.query(() => posts),
  postCreate: publicProcedure.input(z.object({
    name: z.string(),
  })).mutation<{name: string}>((req) => {
    posts.push(req.input);
    return req.input;
  }),
});

export type AppRouter = typeof appRouter;
