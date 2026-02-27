import {z} from 'zod';

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({success: z.boolean(), response: dataSchema});

export const errorResponseSchema = apiResponseSchema(
  z.object({
    errorCode: z.string(),
    errorMessage: z.string(),
    errors: z.object({
      additionalProp1: z.string(),
      additionalProp2: z.string(),
      additionalProp3: z.string(),
    }),
  })
);

export const semesterCodeSchema = z.enum([
  'FIRST',
  'SECOND',
  'SUMMER',
  'WINTER',
]);

export const submissionStatusSchema = z.enum([
  'NOT_SUBMITTED',
  'CORRECT',
  'INCORRECT',
]);
