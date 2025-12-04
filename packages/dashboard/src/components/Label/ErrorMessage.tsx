import { AnimatePresence, motion } from "framer-motion";
import type { FieldError } from "react-hook-form";

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => (
  <AnimatePresence>
    {error?.message && (
      <motion.p initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-1 text-xs text-red-500">
        {error.message}
      </motion.p>
    )}
  </AnimatePresence>
);
