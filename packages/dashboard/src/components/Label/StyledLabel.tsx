// biome-ignore-all lint/a11y/noLabelWithoutControl: Used as a component
import type { LabelHTMLAttributes } from "react";

export const StyledLabel = (props: LabelHTMLAttributes<unknown>) => (
  <label {...props} className={`${props.className ?? ""} block text-sm font-medium text-neutral-700`}>
    {props.children}
  </label>
);
