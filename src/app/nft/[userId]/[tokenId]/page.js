"use client";
import NFT from "@/components/NFT";
import { useParams } from "next/navigation";

export default function CreateNFTPage() {
  const { userId, tokenId } = useParams();
  return (
    <main className="flex flex-col items-center gap-5">
      <NFT userId={userId} tokenId={tokenId} />
    </main>
  );
}
