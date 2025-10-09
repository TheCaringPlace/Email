import { useRouter } from "next/router";
import { useEffect } from "react";

export interface RedirectProps {
  to: string;
}

/**
 * @param root0
 * @param root0.to
 */
export default function Redirect({ to }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    void router.push(to);
  }, [to, router.push]);

  return null;
}
