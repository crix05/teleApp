"use client";
import Image from "next/image";
import styles from "./page.module.css";
import WebApp from '@twa-dev/sdk'
import Script from 'next/script';
import { useEffect,useState } from "react";


export default function Home() {
  const [data, setData] = useState<any>('');
  const [params, setParams] = useState<any>([]);

  useEffect(()=>{
    if (typeof window != 'undefined'){
      WebApp.ready();
      const urlParams = new URLSearchParams(window.location.search);
      const startParam = urlParams.get('start')
      // console.log(initData);
      setParams(startParam);
    }
  },[])

  function handleInvite(){
    const text = "Hello"
    const startParam = "testing";
    const url = `https://t.me/testGoat_bot?start=${encodeURIComponent(startParam)}`;
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  }

  useEffect(() => {
      if (typeof window != 'undefined'){
        // setData(WebApp);
        (window as any).onTelegramAuth = function(user: { first_name: string; last_name: string; id: string; username: string; }) {
          alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
      }
    };
  }, []);

  return (
   <div>{JSON.stringify(data)}
   <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        strategy="beforeInteractive" 
        data-telegram-login="testGoat_bot"
        data-size="medium"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
      <button onClick={handleInvite}>invite</button>
      <div>{params}</div>
   </div>
  );
}
