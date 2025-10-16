import { motion } from "framer-motion";
import { useState } from "react";
import { Dropdown, MetadataFilterEditor, MultiselectDropdown, Skeleton } from "../../components";
import { useEventTypes } from "../../lib/hooks/events";
import { useActiveProject } from "../../lib/hooks/projects";
import useFilterContacts from "./filter";
import type { ContactWithEvents, FilterQuery } from "./types";

/**
 *
 */
export default function ContactFilterForm({ contacts, onSelect }: { contacts: ContactWithEvents[]; onSelect: (contacts: ContactWithEvents[]) => void }) {
  const project = useActiveProject();
  const { data: eventTypes } = useEventTypes();

  const [query, setQuery] = useState<FilterQuery>({});
  const filteredContacts = useFilterContacts(contacts, query);

  if (!project || !eventTypes) {
    return <Skeleton type="form" />;
  }

  return (
    <>
      <div className={"sm:col-span-2"}>
        <label htmlFor={"event"} className="block text-sm font-medium text-neutral-700">
          Has triggers for events
        </label>
        <MultiselectDropdown
          onChange={(e) =>
            setQuery(
              e.length > 0
                ? { ...query, events: e }
                : {
                    ...query,
                    events: undefined,
                    last: undefined,
                  },
            )
          }
          values={[
            ...eventTypes
              .filter((e) => !query.notevents?.includes(e.id))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((e) => {
                return {
                  name: e.name,
                  value: e.id,
                };
              }),
          ]}
          selectedValues={query.events ?? []}
        />
      </div>

      <div className={"sm:col-span-2"}>
        {query.events && query.events.length > 0 && (
          <>
            <label htmlFor={"event"} className="block text-sm font-medium text-neutral-700">
              Has triggered {query.events.length} selected events
            </label>
            <Dropdown
              onChange={(e) =>
                setQuery({
                  ...query,
                  last: (e as "" | "day" | "week" | "month") === "" ? undefined : (e as "day" | "week" | "month"),
                })
              }
              values={[
                { name: "Anytime", value: "" },
                { name: "In the last day", value: "day" },
                { name: "In the last week", value: "week" },
                { name: "In the last month", value: "month" },
              ]}
              selectedValue={query.last ?? ""}
            />
          </>
        )}
      </div>

      <div className={"sm:col-span-2"}>
        <label htmlFor={"event"} className="block text-sm font-medium text-neutral-700">
          No triggers for events
        </label>
        <MultiselectDropdown
          onChange={(e) => {
            setQuery(
              e.length > 0
                ? { ...query, notevents: e }
                : {
                    ...query,
                    notevents: undefined,
                    notlast: undefined,
                  },
            );
          }}
          values={[
            ...eventTypes
              .filter((e) => !query.events?.includes(e.id))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((e) => {
                return {
                  name: e.name,
                  value: e.id,
                };
              }),
          ]}
          selectedValues={query.notevents ?? []}
        />
      </div>

      <div className={"sm:col-span-2"}>
        {query.notevents && query.notevents.length > 0 && (
          <>
            <label htmlFor={"event"} className="block text-sm font-medium text-neutral-700">
              Not triggered {query.notevents.length} selected events
            </label>
            <Dropdown
              onChange={(e) =>
                setQuery({
                  ...query,
                  notlast: (e as "" | "day" | "week" | "month") === "" ? undefined : (e as "day" | "week" | "month"),
                })
              }
              values={[
                { name: "Anytime", value: "" },
                { name: "In the last day", value: "day" },
                { name: "In the last week", value: "week" },
                { name: "In the last month", value: "month" },
              ]}
              selectedValue={query.notlast ?? ""}
            />
          </>
        )}
      </div>

      <MetadataFilterEditor onChange={(filter) => setQuery({ ...query, metadataFilter: filter })} contacts={contacts} />

      <div className={"sm:col-span-4"}>
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            onSelect(filteredContacts);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={"ml-auto flex items-center justify-center gap-x-0.5 rounded bg-neutral-800 px-8 py-2 text-center text-sm font-medium text-white"}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5.75V18.25" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.25 12L5.75 12" />
          </svg>
          Select {filteredContacts.length} contacts
        </motion.button>
      </div>
    </>
  );
}
