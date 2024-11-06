import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const familyHistoryRouter = createTRPCRouter({
  byPatientId: publicProcedure
    .input(z.object({ patientId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.familyHistory.findUnique({
        where: { patientId: input.patientId },
      });
    }),
  createOrUpdate: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        heartDisease: z.boolean(),
        geniticDisorder: z.boolean(),
        diabetes: z.boolean(),
        allergiesAndAsthma: z.boolean(),
        cancerHistory: z.boolean(),
        siblingsConditions: z.boolean(),
        developmentalDisorders: z.boolean(),
        gastricCondition: z.boolean(),
        pastMedicalTreatments: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingHistory = await ctx.prisma.familyHistory.findUnique({
        where: { patientId: input.patientId },
      });
      if (existingHistory) {
        return ctx.prisma.familyHistory.update({
          where: { patientId: input.patientId },
          data: input,
        });
      } else {
        return ctx.prisma.familyHistory.create({ data: input });
      }
    }),
});
