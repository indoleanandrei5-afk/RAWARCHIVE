"use client";

import { motion } from "framer-motion";

export default function SoftDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.94 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="hairline-divider"
    />
  );
}
