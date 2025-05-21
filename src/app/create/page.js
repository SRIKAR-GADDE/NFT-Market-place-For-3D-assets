import CreateNft from "@/components/CreateNft";

export default function CreateNFTPage() {
  return (
    <main className="flex flex-col py-6 items-center gap-5">
      <h1 className="text-5xl font-bold">Mint Your NFT</h1>
      <CreateNft />
    </main>
  );
}
export const metadata = {
  title: "Create NFT",
  description: "Create your NFT",
};
