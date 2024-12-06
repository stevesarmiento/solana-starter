"use client"

import { useSolanaWallet } from '@/solana';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedText } from '../ui/animated-text'
import { IconSailboatFill } from 'symbols-react'
import { CopyText } from '../ui/copy-text'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const LOGOS = [
  { name: 'Next.js', dark: '/logo-next.png', light: '/logo-next-dark.png' },
  { name: 'Turbopack', dark: '/logo-turbopack.png', light: '/logo-turbopack-dark.png' },
  { name: 'Tanstack Query', dark: '/logo-tanstack.png', light: '/logo-tanstack-dark.png' },
  { name: 'Tailwind CSS', dark: '/logo-tailwind.png', light: '/logo-tailwind-dark.png' },
  { name: 'Shadcn UI', dark: '/logo-shadcn.png', light: '/logo-shadcn-dark.png' },
  { name: 'Solana', dark: '/logo-solana.png', light: '/logo-solana-dark.png' },
  { name: 'Plausible', dark: '/logo-plausible.png', light: '/logo-plausible-dark.png' },
  { name: 'Fumadocs', dark: '/logo-fuma.png', light: '/logo-fuma-dark.png' },
] as const;

export function LandingPage() {
  const router = useRouter()
  const [selectedWalletAccount] = useSolanaWallet()
  const { theme } = useTheme();

  useEffect(() => {
    if (selectedWalletAccount) {
      router.replace('/dashboard')
    }
  }, [selectedWalletAccount, router])

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen px-4 text-center">
      <div className="inline-flex ring-1 ring-foreground/10 bg-foreground/5 rounded-2xl p-2 px-4 gap-2 mb-8">
        <IconSailboatFill className="w-[16px] h-[16px] fill-foreground/50" />
        <h2 className="text-[12px] line-height-[16px] font-semibold tracking-tight text-foreground/70 font-mono">
          Start Shipping Now
        </h2>
      </div>
      <h1 className="font-mono text-5xl z-10 text-center leading-tight max-w-4xl">
        <AnimatedText text="Lightweight Production Ready Solana Starter" />
      </h1>
      <p className="mt-4 text-xl text-muted-foreground font-normal font-sans max-w-2xl">
        A lightweight Solana starter template designed to get you up and running so you can just start building - it&apos;s fully open-source.
      </p>
      <div className="mt-10 mb-8">
        <CopyText value="bunx degit stevesarmiento/solana-starter my-solana-app" />
      </div>
      <div className="mt-10 flex flex-col justify-center gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xs text-muted-foreground font-mono font-semibold">
            Featuring:
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {LOGOS.map((logo) => (
            <div 
              key={logo.name}
              className="grayscale hover:grayscale-0 transition-all duration-200"
            >
              <Image
                src={theme === 'dark' ? logo.dark : logo.light}
                alt={logo.name}
                width={162}
                height={162}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex items-center justify-center gap-x-4">
        <GithubStarsButton />
      </div> */}
    </div>
  )
}