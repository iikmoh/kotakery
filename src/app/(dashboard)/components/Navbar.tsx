'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  BuildingStorefrontIcon,
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useContext, useState } from 'react';
import { classNames } from '@/utils/helpers';
import { AuthContext, AuthContextType } from '@/contexts/auth';
import Image from 'next/image';
import ConfirmSignout from './ConfirmSignout';

export default function Navbar() {
  const { merchant } = useContext(AuthContext) as AuthContextType;

  const [signOutVisible, setSignOutVisible] = useState<boolean>(false);

  return (
    <>
      <nav className="border-b border-slate-200 bg-white/90">
        <div className="container px-4 py-3 md:px-0 mx-auto flex items-center">
          <Link
            href={'/dashboard'}
            className="font-semibold text-lg text-red-500 mr-auto select-none flex items-center"
          >
            <Image
              src={'/icons/icon.png'}
              width={24}
              height={24}
              alt="kotakery"
              className="mr-1"
            />
            <span>Kotakery</span>
          </Link>
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <BuildingStorefrontIcon
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
                <span className="hidden md:block text-slate-600">
                  {merchant?.name ?? 'Toko'}
                </span>
                <ChevronDownIcon
                  className="ml-3 -mr-1 h-5 w-5 text-slate-400 hidden md:block"
                  aria-hidden="true"
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={`/${merchant?.username}`}
                        target="_blank"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'w-full px-4 py-2 text-left text-sm flex items-center'
                        )}
                      >
                        <BuildingStorefrontIcon className="w-5 h-5 mr-3" />
                        <span className="flex-1">Halaman Toko</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-3 text-slate-400" />
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'px-4 py-2 text-sm flex items-center w-full border-b border-slate-200/50'
                        )}
                      >
                        <AdjustmentsVerticalIcon className="w-5 h-5 mr-3" />
                        Pengaturan Toko
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setSignOutVisible(true)}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'w-full px-4 py-2 text-left text-sm flex items-center'
                        )}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-red-500" />
                        Keluar
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
      <ConfirmSignout
        visible={signOutVisible}
        onDismiss={() => setSignOutVisible(false)}
      />
    </>
  );
}
