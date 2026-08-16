import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = { title: 'Flux One — Work at the speed of now', description: 'A focused operating system for teams that move fast.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#090a0f', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
