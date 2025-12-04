// biome-ignore-all lint/a11y/noLabelWithoutControl: Used as a component
import type { LabelHTMLAttributes } from "react";

export const LightLabel = (props: LabelHTMLAttributes<unknown>) => (
  <label className={`text-xs font-light ${props.className}`} {...props}>
    {props.children}
  </label>
);
