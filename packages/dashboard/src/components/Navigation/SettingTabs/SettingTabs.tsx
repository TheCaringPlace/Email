import { useRouter } from "next/router";
import { Tabs } from "../Tabs";

/**
 *
 */
export default function SettingTabs() {
  const router = useRouter();

  const links = [
    { to: "/settings/project", text: "Project Settings", active: router.route === "/settings/project" },
    { to: "/settings/api", text: "API Keys", active: router.route === "/settings/api" },
    { to: "/settings/identity", text: "Verified Domain", active: router.route === "/settings/identity" },
    { to: "/settings/members", text: "Members", active: router.route === "/settings/members" },
  ];

  return <Tabs links={links} />;
}
