import {z} from 'zod';
import type {unitFormSchema, unitSchema} from './schemas';

export type Unit = z.infer<typeof unitSchema>;
export type TUnitFormSchema = z.infer<typeof unitFormSchema>;
