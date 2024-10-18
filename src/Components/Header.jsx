import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount, useWriteContract } from "wagmi";
// import { ConnectButton } from "../ConnectButton";
import WalletWrapper from "../WalletWrapper";
import PharmVerifyLogo from "../../public/img/PharmVerifyLogo.png";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import Image from "next/image";
import { parseAbi } from "viem";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const navigation = [
  { name: "Home", href: "/#home", current: true },
  { name: "About", href: "/#about", current: false },
  { name: "Team", href: "/#team", current: false },
  { name: "Pricing", href: "/#pricing", current: false },
  { name: "Contact", href: "/#contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();
  const account = useAccount();
  const { isConnected } = useAccount();
  const abi = parseAbi(["function checkManufacturer(address) returns (bool)"]);

  return (
    <Disclosure as="nav" className="bg-gray-800 z-50 relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start -ml-20 sm:ml-0">
            {/* Logo and Text */}
            <div className="flex items-center">
              <Image
                src={PharmVerifyLogo}
                className="xl:-mr-3 ml-24 xl:ml-0 sm:-mr-6" // Adjusted image height/width
                width={120}
                height={120}
                alt="PharmVerify Logo"
              />
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-2xl ">
                <a
                  href="https://pharmverify.vercel.app/"
                  className="hidden xl:block"
                >
                  PharmVerify
                </a>
              </h2>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 mt-11">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative bg-white p-3 font-bold mr-4  rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={async (e) => {
                e.preventDefault();

                if (!isConnected) {
                  toast.error("Please connect your Wallet!");
                  return;
                }
                try {
                  await writeContractAsync(
                    {
                      address: pharmVerifyContract.address,
                      abi: abi,
                      functionName: "checkManufacturer",
                      args: [account.address],
                    },
                    {
                      onSettled(data, error) {
                        if (error) {
                          toast.error(`Transaction failed: ${error}`);
                        } else {
                          toast.success("Login Successful");
                          router.push("/dashboard/addProduct");
                        }
                        console.log("Settled", { data, error });
                      },
                    }
                  );
                } catch (error) {
                  console.error("Transaction failed", error);
                }
              }}
            >
              <span className="absolute -inset-1.5" />
              Login
            </button> */}
            {/* <ConnectButton /> */}
            <WalletWrapper text="Connect Wallet" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
