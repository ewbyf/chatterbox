import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router"
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if(router.pathname.startsWith(`/app`)) {
    return (
      <AnimatePresence mode="wait">
        <Layout>
          <Component {...pageProps} key={router.pathname} />
        </Layout>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
  
}
