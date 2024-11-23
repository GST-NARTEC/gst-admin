import { motion } from "framer-motion";

export default function OverlayLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-[#1B365D]/20 border-t-[#1B365D] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner pulse */}
        <motion.div
          className="absolute inset-0 border-2 border-[#335082]/40 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Text below */}
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#1B365D] font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
