import type { Metadata } from 'next'
import { Sansita } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})


// const sairaCondensed = Saira_Condensed({weight:"400"})

export const metadata: Metadata = {
  title: 'HeadsUp',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sansita.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
