import { type HTMLMotionProps, motion } from "framer-motion";

export const SecondaryButton = ({ children, ...props }: HTMLMotionProps<"button">) => (
  <motion.button
    {...props}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-3 inline-flex w-full justify-center rounded-sm border border-neutral-300 bg-white px-6 py-2 text-base font-medium text-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
  >
    {children}
  </motion.button>
);
