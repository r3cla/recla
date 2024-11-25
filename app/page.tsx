import Header from './components/header'
import Hero from './components/hero'
import Portfolio from './components/portfolio'
import Pricing from './components/pricing'
import Contact from './components/contact'
import Footer from './components/footer'
import './styles/glitch-animation.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Pricing />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

