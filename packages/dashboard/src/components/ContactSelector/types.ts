import type { Contact, Event } from "shared/dist/types";
import type { MetadataFilterGroupType } from "../Input/MetadataFilter/types";

export type FilterQuery = {
  events?: string[];
  last?: "day" | "week" | "month";
  notevents?: string[];
  notlast?: "day" | "week" | "month";
  metadataFilter?: MetadataFilterGroupType;
};

export type ContactWithEvents = Contact & { _embed: { events: Event[] } };
