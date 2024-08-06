"use client";
import Image from "next/image";
import styles from "./page.module.css";
import WebApp from '@twa-dev/sdk'
import Script from 'next/script';
import { useEffect,useState } from "react";

export default function Home() {
  const [data, setData] = useState({});
  if (typeof window != 'undefined'){
    console.log(WebApp);
  }

  useEffect(() => {
      if (typeof window != 'undefined'){
        setData(WebApp);
        (window as any).onTelegramAuth = function(user: { first_name: string; last_name: string; id: string; username: string; }) {
          alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
      }
    };
  }, []);


  return (
   <div>{JSON.stringify(data)}
   <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        strategy="beforeInteractive" // Ensures the script loads before the page becomes interactive
        data-telegram-login="testGoat_bot"
        data-size="medium"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
   </div>
  );
}
