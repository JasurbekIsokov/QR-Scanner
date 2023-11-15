"use client";
import { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import { BrowserQRCodeReader } from "@zxing/library";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleOpenLink = (url: string) => {
      // Brauzerda linkni yangi oynasida ochish
      // Lekin aksariyat brauzerlar buni block qilgan va yangi oynani avtomatik ochmaydi.
      // Birinchi martada ruhsat berishni so'raydi agar ruhsat berilsa yangi oyna ochiladi
      window.open(url, "_blank");
    };

    if (videoRef.current) {
      const constraints: MediaStreamConstraints = {
        video: { facingMode: "environment" },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Kamera aktivlashda xatolik:", error);
        });

      const codeReader = new BrowserQRCodeReader();

      codeReader
        .decodeFromVideoDevice(null, videoRef.current, (result, error: any) => {
          if (error) {
            console.error("Skaner xatolik yuz berdi:", error);
          } else {
            const scannedUrl = result.getText();
            console.log("Skandirilgan kodi topdingiz:", scannedUrl);

            // Skan qilingan linkni yangi oynasida ochish
            handleOpenLink(scannedUrl);

            // Skan qilingan linkni alert orqali chiqaring
            alert(scannedUrl);
          }
        })
        .catch((error) => {
          console.error("Skaner xatolik yuz berdi:", error);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <video ref={videoRef} playsInline />
      </main>
    </div>
  );
}
