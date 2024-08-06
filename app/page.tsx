"use client";
import Image from "next/image";
import styles from "./page.module.css";
import WebApp from '@twa-dev/sdk'

export default function Home() {
  if (typeof window != 'undefined'){
    console.log(WebApp);
  }
  return (
   <div>Hello</div>
  );
}
