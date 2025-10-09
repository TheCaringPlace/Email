import z from "zod";
import { id, ProjectEntitySchema } from "./common";

export const TriggerSchema = ProjectEntitySchema.extend({
  event: id,
  contact: id,
  action: id.optional(),
  email: id.optional(),
  data: z.record(z.string(), z.any()).optional(),
});

export const TriggerSchemas = {
  create: TriggerSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
  update: TriggerSchema.omit({
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
};

export const ClickSchema = ProjectEntitySchema.extend({
  email: id,
  link: z.string(),
});
