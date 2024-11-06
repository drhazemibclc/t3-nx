import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const treatmentRouter = createTRPCRouter({
  byPatientId: publicProcedure
    .input(z.object({ patientId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.treatment.findMany({
        where: { patientId: input.patientId },
        orderBy: { serviceDate: 'desc' },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        service: z.string(),
        serviceDate: z.string(),
        prescription: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.treatment.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.treatment.delete({ where: { id: input } });
  }),
});
