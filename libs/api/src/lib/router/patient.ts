import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const patientRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.patient.findMany();
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.patient.findUnique({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1),
        birthDate: z.string(),
        gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
        nutritionalStatus: z.enum([
          'NORMAL',
          'WASTING',
          'STUNTING',
          'UNDERWEIGHT',
          'OBESE',
        ]),
        email: z.string().email(),
        mobileNumber: z.string(),
        telephoneNumber: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.patient.create({
        data: input,
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        fullName: z.string().optional(),
        birthDate: z.string().optional(),
        gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
        nutritionalStatus: z
          .enum(['NORMAL', 'WASTING', 'STUNTING', 'UNDERWEIGHT', 'OBESE'])
          .optional(),
        email: z.string().email().optional(),
        mobileNumber: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.patient.update({ where: { id }, data });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.patient.delete({ where: { id: input } });
  }),
});
