import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Header from '@/components/Header';

export default function Explore() {

    return (
    <>
      <Head>
        <title>Chatterbox | Explore</title>
      </Head>
      <main>
        <Header back handler={() => {console.log("A")}}>Explore Page</Header>
      </main>
    </>
  )
}
