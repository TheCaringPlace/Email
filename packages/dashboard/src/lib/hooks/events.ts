import type { Event } from "@sendra/shared";
import useSWR from "swr";
import { useActiveProject } from "./projects";

export type EventType = {
  name: string;
  _embed: {
    events: Event[];
  };
};

/**
 *
 */
export function useEventTypes() {
  const activeProject = useActiveProject();

  return useSWR<{ eventTypes: { name: string }[] }>(activeProject ? `/projects/${activeProject.id}/event-types/all` : null);
}

export function useEventTypesWithEvents() {
  const activeProject = useActiveProject();

  return useSWR<{ eventTypes: EventType[] }>(activeProject ? `/projects/${activeProject.id}/event-types/all?embed=events` : null);
}
