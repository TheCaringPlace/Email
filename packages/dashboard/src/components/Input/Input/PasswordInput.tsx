import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, useState } from "react";
import type { FieldError } from "react-hook-form";
import { StyledLabel } from "../../Label/StyledLabel";
import { StyledInput } from "./StyledInput";

export const PasswordInput = (props: Omit<InputHTMLAttributes<unknown> & { error?: FieldError; label: string }, "type" | "placeholder">) => {
  const { error, label, ...rest } = props;
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <>
      <StyledLabel>
        {label}
        <div className="relative mt-1">
          <StyledInput type={hidePassword ? "password" : "text"} placeholder={hidePassword ? "•••••••••••••" : label} autoComplete="password" {...rest} />
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
            {hidePassword ? <Eye onClick={() => setHidePassword(!hidePassword)} /> : <EyeOff onClick={() => setHidePassword(!hidePassword)} />}
          </div>
        </div>
      </StyledLabel>
      <AnimatePresence>
        {error?.message && (
          <motion.p initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-1 text-xs text-red-500">
            Password must be at least 6 characters long
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};
