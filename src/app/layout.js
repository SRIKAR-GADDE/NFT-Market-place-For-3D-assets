"use client";

import { useEffect, useState } from "react";

import "@/app/globals.css";
import { NearContext } from "../context";
import { Navigation } from "../components/Navigation";
import { MarketplaceContract, MintContract, NetworkId } from "../config";

import { Wallet } from "@/wallets/near";
import Footer from "@/components/Footer";

const wallet = new Wallet({
  networkId: NetworkId,
  createAccessKeyFor: MarketplaceContract, MintContract
});

// Layout Component
export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <html lang="en">
      <body>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Navigation />
          {children}
          <Footer />
        </NearContext.Provider>
      </body>
    </html>
  );
}
