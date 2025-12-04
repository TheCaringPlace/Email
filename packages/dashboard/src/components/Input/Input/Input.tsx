import { AnimatePresence, motion } from "framer-motion";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { StyledLabel } from "../../Label/StyledLabel";
import { StyledInput } from "./StyledInput";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  min?: number;
  max?: number;
}

/**
 *
 * @param props
 * @param props.label
 * @param props.type
 * @param props.register
 * @param props.error
 * @param props.placeholder
 * @param props.className
 */
export default function Input(props: InputProps) {
  return (
    <div className={props.className}>
      <StyledLabel>
        {props.label}
        <div className="mt-1">
          <StyledInput
            autoComplete={"off"}
            type={props.type}
            min={props.type === "number" ? props.min : undefined}
            max={props.type === "number" ? props.max : undefined}
            placeholder={props.placeholder}
            {...props.register}
          />
        </div>
      </StyledLabel>
      <AnimatePresence>
        {props.error && (
          <motion.p initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-1 text-xs text-red-500">
            {props.error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
