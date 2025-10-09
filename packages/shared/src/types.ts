import type { z } from "@hono/zod-openapi";
import type {
  ActionSchema,
  ActionSchemas,
  BaseSchema,
  CampaignSchema,
  CampaignSchemas,
  ClickSchema,
  ContactSchema,
  ContactSchemas,
  EmailSchema,
  EventSchema,
  EventSchemas,
  MembershipRoleSchema,
  MembershipSchema,
  MembershipSchemas,
  ProjectKeysSchema,
  ProjectSchema,
  ProjectSchemas,
  PublicProjectSchema,
  SEND_TYPES,
  SubscriberSchema,
  SubscriberUpdateSchema,
  TaskSchema,
  TEMPLATE_STYLES,
  TemplateSchema,
  TemplateSchemas,
  TriggerSchema,
  UserSchema,
  UserSchemas,
} from "./schemas";

export type Action = z.infer<typeof ActionSchema>;
export type ActionCreate = z.infer<typeof ActionSchemas.create>;
export type ActionUpdate = z.infer<typeof ActionSchemas.update>;

export type BaseType = z.infer<typeof BaseSchema>;

export type Click = z.infer<typeof ClickSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type ContactCreate = z.infer<typeof ContactSchemas.create>;
export type ContactUpdate = z.infer<typeof ContactSchemas.update>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type CampaignCreate = z.infer<typeof CampaignSchemas.create>;
export type CampaignUpdate = z.infer<typeof CampaignSchemas.update>;
export type Credentials = z.infer<typeof UserSchemas.credentials>;
export type Email = z.infer<typeof EmailSchema>;
export type Event = z.infer<typeof EventSchema>;
export type EventTrack = z.infer<typeof EventSchemas.track>;

export type Membership = z.infer<typeof MembershipSchema>;
export type MembershipRole = z.infer<typeof MembershipRoleSchema>;
export type MembershipInvite = z.infer<typeof MembershipSchemas.invite>;
export type MembershipKick = z.infer<typeof MembershipSchemas.kick>;

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectCreate = z.infer<typeof ProjectSchemas.create>;
export type ProjectUpdate = z.infer<typeof ProjectSchemas.update>;
export type ProjectKeys = z.infer<typeof ProjectKeysSchema>;
export type PublicProject = z.infer<typeof PublicProjectSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;

export type Template = z.infer<typeof TemplateSchema>;
export type TemplateCreate = z.infer<typeof TemplateSchemas.create>;
export type TemplateUpdate = z.infer<typeof TemplateSchemas.update>;

export type SendTypes = (typeof SEND_TYPES)[number];
export type Subscriber = z.infer<typeof SubscriberSchema>;
export type SubscriberUpdate = z.infer<typeof SubscriberUpdateSchema>;
export type TemplateStyles = (typeof TEMPLATE_STYLES)[number];

export type User = z.infer<typeof UserSchema>;
export type UserGet = z.infer<typeof UserSchemas.get>;
