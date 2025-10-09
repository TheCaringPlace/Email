import { useRouter } from "next/router";
import { useEffect } from "react";
import { FullscreenLoader } from "../../components/";
import { useUser } from "../../lib/hooks/users";
import { network } from "../../lib/network";

/**
 *
 */
export default function Index() {
  const router = useRouter();

  const { error, mutate } = useUser();

  if (error) {
    void router.push("/");
  }

  useEffect(() => {
    void network.fetch("/auth/logout", { method: "POST" }).then(async () => {
      await mutate(undefined);
      await router.push("/");
    });
  }, [mutate, router.push]);

  return <FullscreenLoader />;
}
