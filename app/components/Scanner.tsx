// components/BarcodeScanner.tsx
import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner: React.FC<{ onScan: (data: string) => void }> = ({
  onScan,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const handleScan = (result: any) => {
      if (result && result.text) {
        onScan(result.text);
      }
    };

    codeReader.decodeFromInputVideoDevice(
      undefined,
      videoRef.current,
      handleScan
    );

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return <video ref={videoRef} style={{ width: "100%" }} playsInline />;
};

export default BarcodeScanner;
