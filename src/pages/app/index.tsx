import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Explore() {
    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
          setUserToken(token);
        }
        else {
            Router.push({
                pathname: "/login",
            });
        }
    }, []);


    return (
    <>
      <Head>
        <title>Chatterbox | Explore</title>
      </Head>
    </>
  )
}
