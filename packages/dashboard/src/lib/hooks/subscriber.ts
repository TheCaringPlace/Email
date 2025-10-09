import type { Subscriber } from "@plunk/shared";
import useSWR from "swr";

export function useSubscriber(email: string) {
  return useSWR<Subscriber>(`/subscriber?email=${email}`);
}
