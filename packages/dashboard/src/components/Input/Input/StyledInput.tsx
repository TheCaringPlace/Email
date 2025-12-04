import type { InputHTMLAttributes } from "react";

export const StyledInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`rounded-sm border-neutral-300 transition ease-in-out focus:border-neutral-800 focus:ring-neutral-800 sm:text-sm ${props.className ?? "block w-full"}`} />
);
