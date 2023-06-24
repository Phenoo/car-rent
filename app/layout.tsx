import './globals.css'
import { Inter } from 'next/font/google'

import Navigation from '@/components/Navbar/Navigation'
import ModalProvider from './providers/ModalProvider'
import getCurrentUser from './actions/getCurrentUser'
import MobileNav from '@/components/Navbar/MobileNav'
import RentButton from '@/components/RentButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Desco Car Rentals',
  description: 'A website to rent cars',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
          <ModalProvider />
          <Navigation currentUser={currentUser} />
          {children}
          <RentButton currentUser={currentUser} />
          <MobileNav />
      </body>
    </html>
  )
}
