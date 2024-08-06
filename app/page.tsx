"use client";
import Image from "next/image";
import styles from "./page.module.css";
import WebApp from '@twa-dev/sdk'
import Script from 'next/script';
import { useEffect,useState } from "react";
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';

const initDataRaw = new URLSearchParams([
  ['user', JSON.stringify({
    id: 99281932,
    first_name: 'Andrew',
    last_name: 'Rogue',
    username: 'rogue',
    language_code: 'en',
    is_premium: true,
    allows_write_to_pm: true,
  })],
  ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  ['auth_date', '1716922846'],
  ['start_param', 'debug'],
  ['chat_type', 'sender'],
  ['chat_instance', '8428209589180549439'],
]).toString();

mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: parseInitData(initDataRaw),
  initDataRaw,
  version: '7.2',
  platform: 'tdesktop',
});

export default function Home() {
  const [data, setData] = useState({});
  const [params, setParams] = useState<any>('');

  useEffect(()=>{
    if (typeof window != 'undefined'){
      console.log(WebApp);
      const  { initData } = retrieveLaunchParams()
      setParams(initData);
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
