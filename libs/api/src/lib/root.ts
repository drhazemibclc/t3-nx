import { authRouter } from './router/auth';
import { patientRouter } from './router/patient';
import { familyHistoryRouter } from './router/familyHistory';
import { medicalChartRouter } from './router/medicalChart';
import { userRouter } from './router/user';
import { treatmentRouter } from './router/treatment';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  patient: patientRouter,
  familyHistory: familyHistoryRouter,
  medicalChart: medicalChartRouter,
  user: userRouter,
  treatment: treatmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
