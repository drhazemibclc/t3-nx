import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const medicalChartRouter = createTRPCRouter({
  byPatientId: publicProcedure
    .input(z.object({ patientId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.medicalChart.findUnique({
        where: { patientId: input.patientId },
      });
    }),
  createOrUpdate: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        birthComplications: z.string().optional(),
        hospitalAdmissions: z.string().optional(),
        immunizationRecords: z.string().optional(),
        allergies: z.string().optional(),
        operations: z.string().optional(),
        growthDevelopmentIssues: z.string().optional(),
        congenitalDisorders: z.boolean(),
        respiratoryConditions: z.boolean(),
        cardiacConditions: z.boolean(),
        neurologicalIssues: z.boolean(),
        gastrointestinalIssues: z.boolean(),
        skinConditions: z.boolean(),
        headache: z.boolean(),
        fever: z.boolean(),
        currentMedications: z.string().optional(),
        breastfeeding: z.boolean(),
        behaviorconcerns: z.boolean(),
        parentConcernOfAny: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingChart = await ctx.prisma.medicalChart.findUnique({
        where: { patientId: input.patientId },
      });
      if (existingChart) {
        return ctx.prisma.medicalChart.update({
          where: { patientId: input.patientId },
          data: input,
        });
      } else {
        return ctx.prisma.medicalChart.create({ data: input });
      }
    }),
});
