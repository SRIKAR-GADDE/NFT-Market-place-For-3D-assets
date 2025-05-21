import Image from "next/image";
import Link from "next/link";
import { IconMenu3, IconWallet } from "@tabler/icons-react";
import { useEffect, useState, useContext, act } from "react";
import { CgProfile } from "react-icons/cg";
import { NearContext } from "@/context";
import { AnimatePresence, motion } from "framer-motion";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");
  const [open, setOpen] = useState(false);
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "marketplace", href: "/market" },
    { title: "create", href: "/create" },
    { title: "Contact", href: "/" },
  ];
  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel("Connect");
    }
  }, [signedAccountId, wallet]);

  const handleSidebar = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };
  return (
    <header
      className={`self-stretch bg-black flex flex-row items-center justify-between py-[0.5rem] px-[3.125rem] max-[768px]:px-[1.125rem] box-border top-[0] z-[99] sticky max-w-full gap-[1.25rem] text-center text-[1rem] text-croc-primary-white font-segoe-ui mq1050:pl-[1.563rem] mq1050:pr-[1.563rem] mq1050:box-border`}
    >
      <h2 className="flex flex-row items-center justify-start cursor-pointer">
        NFT Marketplace
      </h2>
      <div className="flex flex-row items-center justify-end gap-[0.625rem] max-w-full mq750:hidden max-[768px]:hidden">
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.75rem] px-[1.25rem] gap-[0.75rem]">
          <img
            className="h-[1.25rem] w-[1.25rem] relative hidden"
            alt=""
            src="/rocketlaunch.svg"
          />
          <div className="w-[2.75rem] relative leading-[140%] font-semibold inline-block min-w-[2.75rem]">
            <Link href={"/"}>Home</Link>
          </div>
        </div>
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.75rem] px-[1.25rem] gap-[0.75rem]">
          <div className="w-[2.938rem] relative leading-[140%] font-semibold inline-block min-w-[2.938rem]">
            <Link href={"/create"}>Create</Link>
          </div>
        </div>
        <div className="rounded-xl flex flex-row items-center justify-center py-[0.75rem] px-[1.25rem] gap-[0.75rem]">
          <img
            className="h-[1.25rem] w-[1.25rem] relative hidden"
            alt=""
            src="/rocketlaunch.svg"
          />
          <div className="w-[5.625rem] relative leading-[140%] font-semibold inline-block min-w-[5.625rem]">
            <Link href={"/market"}>Marketplace</Link>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="cursor-pointer py-[1.062rem] px-[1.812rem] bg-chocolate-300 rounded-xl flex flex-row items-center justify-center gap-[0.75rem] border-[1px] border-solid border-chocolate-200 hover:bg-coral-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-coral-100"
          onClick={action}
        >
          <IconWallet />
          <div className="w-full max-w-52 relative text-[1rem] leading-[140%] font-semibold font-segoe-ui text-croc-primary-white text-center inline-block min-w-[3.75rem]">
            {label}
          </div>
        </button>
        <div className="md:hidden" onClick={handleSidebar}>
          <IconMenu3 />
        </div>
        <Link href="/u">
          <CgProfile />
        </Link>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top  bg-stone-950 p-10 text-[2.375rem]  font-basebody-work-sans"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-xl text-white">Portfolio</h1>
                <p
                  className="cursor-pointer text-md text-white"
                  onClick={handleSidebar}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden">
                      <Link href={link.href}>
                        <p className="text-white">{link.title}</p>
                      </Link>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const metadata = {
  title: "Create NFT",
  discription: "Create your NFT",
};
