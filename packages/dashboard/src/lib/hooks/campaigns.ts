import type { Campaign, Email } from "@plunk/shared";
import useSWR from "swr";
import { useActiveProject } from "./projects";

/**
 *
 * @param id
 */
export function useCampaign(id: string) {
  const activeProject = useActiveProject();
  return useSWR<Campaign>(activeProject ? `/projects/${activeProject.id}/campaigns/${id}` : null);
}

/**
 *
 */
export function useCampaignsWithEmails() {
  const activeProject = useActiveProject();
  return useSWR<(Campaign & { emails: Email[] })[]>(activeProject ? `/projects/${activeProject.id}/campaigns/all?embed=emails` : null);
}
