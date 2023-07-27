import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import Header from "@/app/(components)/Header"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({
  weight: '400',
  subsets: ['arabic'],
  display: "auto"
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibm_plex_sans_arabic.className}>
      <Header />
      {children}
      </body>
    </html>
  )
}
