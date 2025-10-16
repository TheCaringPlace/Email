import z from "zod";
import { id, ProjectEntitySchema } from "./common";

export const GroupSchema = ProjectEntitySchema.extend({
  name: z.string(),
  contacts: z.array(id),
});

export const GroupSchemas = {
  create: GroupSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
  update: GroupSchema.omit({
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
};
