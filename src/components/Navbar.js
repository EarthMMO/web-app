import Button from "components/Button";
import FirstTimeModal from "components/LoginModal";
import Image from "next/image";
import LoginModal from "components/LoginModal";
import gravatar from "gravatar";
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ClipLoader } from "react-spinners";
import { Fragment, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { apiRequest, classNames } from "utils";
import { connectWallet } from "utils/auth";
import { useState } from "react";

//const user = {
//  name: "Chelsea Hagon",
//  email: "chelseahagon@example.com",
//  imageUrl:
//    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Popular", href: "#", icon: FireIcon, current: false },
  { name: "Communities", href: "#", icon: UserGroupIcon, current: false },
  { name: "Trending", href: "#", icon: TrendingUpIcon, current: false },
];

export default function Navbar() {
  const [connecting, setConnecting] = useState(false);
  const [isFirstTimeModalOpen, setIsFirstTimeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function setProviderAndSigner() {
  //     const { provider, signer } = await connectWallet();
  //     setProvider(provider);
  //     setSigner(signer);
  //   }

  //   // async function fetchCurrentUser() {
  //   //   const currentUser = await apiRequest(
  //   //     `user/${window.ethereum.selectedAddress}`,
  //   //     "GET"
  //   //   );
  //   //   setUser(currentUser);
  //   // }

  //   if (window.ethereum.selectedAddress !== null) {
  //     setProviderAndSigner();
  //     fetchCurrentUser();
  //   }
  // }, []);

  /* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */
  return (
    <div>
      <LoginModal
        isFirstTimeModalOpen={isFirstTimeModalOpen}
        isModalOpen={isLoginModalOpen}
        setConnecting={setConnecting}
        setIsFirstTimeModalOpen={setIsFirstTimeModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
        setUser={setUser}
      />
      <FirstTimeModal
        isModalOpen={isFirstTimeModalOpen}
        setIsModalOpen={setIsFirstTimeModalOpen}
        setUser={setUser}
      />
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-3">
                  <div className="flex-shrink-0 flex items-center">
                    <a className="flex items-center w-auto" href="#">
                      <Image src="/lfp.svg" height={30} width={30} />
                      <span className="hidden lg:block ml-2 font-philosopher font-bold text-2xl">
                        Looking for Party
                      </span>
                    </a>
                  </div>
                </div>
                <div
                  className={classNames(
                    user ? "xl:col-span-6" : "xl:col-span-7",
                    "min-w-0 flex-1 md:px-8 lg:px-0"
                  )}
                >
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                {user ? (
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3">
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      Events
                    </a>
                    <a
                      href="#"
                      className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </a>

                    {/* Profile dropdown */}
                    <Menu as="div" className="flex-shrink-0 relative ml-5 mr-6">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full pointer-events-none"
                            src={gravatar.url(
                              user.userId,
                              {
                                d: "identicon",
                                s: "200",
                              },
                              { protocol: "https" }
                            )}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Button label={"New event"} />
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-2">
                    {/*<a
                      href="#"
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      Assets
                    </a>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 hover:underline ml-6"
                    >
                      Leaderboard
                    </a>*/}
                    <a
                      href="#"
                      className="ml-6 w-full max-w-[135px] inline-flex items-center px-4 py-2 border border-transparent text-sm justify-center font-medium rounded-md shadow-sm text-white bg-neutral-800 hover:bg-neutral-900"
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      {connecting ? (
                        <ClipLoader color={"#fff"} size={18} />
                      ) : (
                        "Connect wallet"
                      )}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {user && (
              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={gravatar.url(
                          user.userId,
                          {
                            d: "identicon",
                            s: "200",
                          },
                          { protocol: "https" }
                        )}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                  >
                    New Post
                  </a>

                  <div className="mt-6 flex justify-center">
                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:underline"
                    >
                      Go Premium
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            )}
          </>
        )}
      </Popover>
    </div>
  );
}
