import { Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'
import { NATIVE } from '@sushiswap/core-sdk'
import useMenu from 'app/components/Header/useMenu'
import Web3Status from 'app/components/Web3Status'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'app/services/web3'
import { useETHBalances } from 'app/state/wallet/hooks'
import Link from 'next/link'
import { sidebarContext } from 'pages/_app'
import React, { FC, Fragment, useState } from 'react'

import { NavigationItem } from './NavigationItem'

const HEADER_HEIGHT = 64

const Desktop: FC = ({ children }) => {
  const menu = useMenu()
  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const isCoinbaseWallet = useIsCoinbaseWallet()

  const { open, setOpen } = React.useContext(sidebarContext)

  console.log(open, "sidebar");


  return (
    <>
      <header
        className={`flex items-center justify-between min-h-[64px] h-[64px] px-4 ${open && 'pl-[225px]'}`}
        style={{ backgroundColor: '#191818' }}
      >
        <div
          className={`flex flex-grow justify-between horizontal-header  ${open ? 'ml-[225px] w-[calc(100%_-_225px)]' : 'w-full'
            }`}
          style={{ backgroundColor: '#191818' }}
        >
          <div className="p-2 hover:bg-white/10 rounded-full m-4">
            <MenuIcon
              width={28}
              className="hover:text-white text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex items-center w-auto text-sm font-bold border-2 rounded shadow cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-900 whitespace-nowrap mr-[24px]">
            {account && chainId && userEthBalance && (
              <Link href="/balances" passHref={true}>
                <a className="hidden px-3 text-high-emphesis text-bold md:block">
                  {/*@ts-ignore*/}
                  {userEthBalance?.toSignificant(4)} {NATIVE[chainId || 1].symbol}
                </a>
              </Link>
            )}
            <Web3Status />
          </div>
        </div>
        <Transition.Root show={open} as={Fragment}>
          {/* <Dialog as="div" className="fixed inset-0 " onClose={() => {}}> */}
          <div className="absolute inset-0">
            {/* <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-dark-1000 bg-opacity-0 transition-opacity hidden" />
              </Transition.Child> */}

            <div className="fixed inset-y-0 left-0 pr-10 max-w-[265px] flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-[-100%]"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[-100%]"
              >
                <div className="w-screen max-w-sm">
                  <div className="h-full flex flex-col py-6  shadow-xl" style={{ backgroundColor: '#191818' }}>
                    <div className="flex w-40 mx-8 mb-4 items-center">
                      <Link href="/swap" passHref={true}>
                        <img
                          src="https://eus1-api.asm.skype.com/v1/objects/0-eus-d11-843bed29e3a1aa86d5cbaca7f3e63170/views/imgpsh_fullsize_anim"
                          alt="Sushi logo"
                          width="100%"
                          height="100%"
                        />
                      </Link>
                    </div>

                    <nav className="flex-1 pl-6" aria-label="Sidebar">
                      {menu.map((node) => {
                        return <NavigationItem node={node} key={node.key} />
                      })}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
          {/* </Dialog> */}
        </Transition.Root>
        <div className={`height-100 content ${open ? 'ml-[225px] w-[calc(100%_-_225px)]' : 'w-full'}`}>
          {children}
        </div>
      </header>
    </>
  )
}

export default Desktop
