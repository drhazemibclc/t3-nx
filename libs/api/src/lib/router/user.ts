import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  byUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        password: z.string().min(6),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({ where: { username: input } });
  }),
});
