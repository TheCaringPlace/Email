import dynamic from "next/dynamic";

export const EmailEditor = dynamic(() => import("./EmailEditor"), { ssr: false });
