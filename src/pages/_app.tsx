import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
  
}
