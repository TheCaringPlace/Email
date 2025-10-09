import { DataSchema, email, ProjectEntitySchema, subscribed } from "./common";

export const ContactSchema = ProjectEntitySchema.extend({
  email,
  data: DataSchema,
  subscribed,
});

export const ContactSchemas = {
  create: ContactSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
  update: ContactSchema.omit({
    createdAt: true,
    updatedAt: true,
    project: true,
  }),
};
