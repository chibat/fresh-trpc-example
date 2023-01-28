import { HandlerContext } from "$fresh/server.ts";
import { appRouter } from "../../../trpc/router.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../trpc/context.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const trpcRes = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

  return new Response(trpcRes.body, {
    headers: trpcRes.headers,
    status: trpcRes.status,
  });
};
