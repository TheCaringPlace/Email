import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export const LoadingButton = ({ label, state }: { label: string; state: "loading" | "error" | "idle" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    type="submit"
    className="flex w-full items-center justify-center rounded-md bg-neutral-800 py-2.5 text-sm font-medium text-white"
  >
    {state === "loading" ? <LoaderCircle className="animate-spin" size={18} /> : label}
  </motion.button>
);
