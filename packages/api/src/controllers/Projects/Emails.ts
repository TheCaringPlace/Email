import { z } from "@hono/zod-openapi";
import { EmailPersistence } from "@plunk/lib";
import { EmailSchema } from "@plunk/shared";
import type { AppType } from "../../app";
import { registerProjectEntityReadRoutes } from "./ProjectEntity";

export const registerEmailsRoutes = (app: AppType) => {
  registerProjectEntityReadRoutes(app, {
    entityPath: "emails",
    entityName: "Email",
    embeddable: [],
    getSchema: EmailSchema,
    listQuerySchema: z.enum(["messageId"]),
    getPersistence: (projectId: string) => new EmailPersistence(projectId),
  });
};
