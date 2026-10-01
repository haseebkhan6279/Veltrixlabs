"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923240497250";
const WHATSAPP_TEXT =
  "Hi Veltrix Labs, I found your site and want to discuss a project.";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
      target="_blank"
      rel="noopener noreferrer"
      data-track="Opened WhatsApp"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 left-4 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 sm:bottom-6 sm:left-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span>Chat on WhatsApp</span>
    </motion.a>
  );
}
