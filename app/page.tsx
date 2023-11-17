"use client";

import React, { useState } from "react";
import BarcodeScanner from "./components/Scanner";

const Home: React.FC = () => {
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  const handleBarcodeScan = (data: string) => {
    setBarcodeData(data);
  };

  return (
    <div>
      <h1>Scanned Barcode: {barcodeData}</h1>
      <BarcodeScanner onScan={handleBarcodeScan} />
    </div>
  );
};

export default Home;
