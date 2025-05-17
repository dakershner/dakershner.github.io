import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = 'Dan Kershner' }: LayoutProps) {
  const router = useRouter()
  
  const isActive = (path: string) => router.pathname === path
  
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Data & Analytics Engineering Leader" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <header className="site-header">
        <nav className="main-nav">
          <Link href="/">
            <a className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</a>
          </Link>
          <Link href="/about">
            <a className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</a>
          </Link>
          <Link href="/writing">
            <a className={`nav-link ${isActive('/writing') ? 'active' : ''}`}>Writing</a>
          </Link>
          <Link href="/photography">
            <a className={`nav-link ${isActive('/photography') ? 'active' : ''}`}>Photography</a>
          </Link>
          <Link href="/contact">
            <a className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</a>
          </Link>
        </nav>
      </header>

      <main className="content">
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Dan Kershner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 