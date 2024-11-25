import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Portfolio
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
        <Button>Hire Me</Button>
      </div>
    </header>
  )
}

