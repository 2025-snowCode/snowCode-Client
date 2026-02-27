import type {z} from 'zod';
import type {assignmentSchema} from './schemas';

export type Assignment = z.infer<typeof assignmentSchema>;
