import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const messageRouter = createTRPCRouter({
  roomList: publicProcedure.query(async ({ ctx }) => {
    const messages = await db.message.findMany({
      distinct: ["phoneNumberId"],
      orderBy: {
        createdAt: "desc",
      },
      select: {
        waAccountId: true,
        body: true,
        createdAt: true,
        profileName: true,
        phoneNumberId: true,
      },
    });
    return messages;
  }),
  messages: publicProcedure
    .input(
      z.object({
        phoneNumberId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const messages = await db.message.findMany({
        where: {
          phoneNumberId: input.phoneNumberId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return messages;
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
