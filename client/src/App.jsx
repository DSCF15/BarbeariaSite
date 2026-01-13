import { useState, useEffect } from 'react'
import HeroSVG from './assets/barber-hero.svg'
import BlobSVG from './assets/shape-blob.svg'
import ScissorsIcon from './assets/icon-scissors.svg'
import Gallery from './components/Gallery'
import img1 from './assets/gallery/3-233x300.png'
import img2 from './assets/gallery/2-233x300.png'
import img3 from './assets/gallery/4-233x300.png'
import img4 from './assets/gallery/6-233x300.png'
import img5 from './assets/gallery/7-233x300.png'
import img6 from './assets/gallery/8-233x300.png'
import img7 from './assets/gallery/5-233x300.png'
import img8 from './assets/gallery/9-233x300.png'
import img9 from './assets/gallery/12-1-233x300.png'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function App() {
  const [open, setOpen] = useState(false)
  useReveal()
  const noonaUrl = 'https://noona.io/your-salon' // substitua pelo link real da Noona

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 relative overflow-hidden">
      <img src={BlobSVG} alt="blob" className="gradient-blob float -right-32 -top-16 w-96 h-96 md:w-[480px] md:h-[480px]" />

      <header className="bg-transparent relative z-10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-pink-500 rounded flex items-center justify-center text-white font-bold shadow-lg">B</div>
            <span className="font-semibold text-lg">BarbeariaJ</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="hover:text-indigo-600">Serviços</a>
            <a href="#sobre" className="hover:text-indigo-600">Sobre</a>
            <a href="#contato" className="hover:text-indigo-600">Contacto</a>
            <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded shadow">Agendar (Noona)</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 rounded-md bg-white shadow">{open ? 'Fechar' : 'Menu'}</button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="px-6 py-4 flex flex-col gap-3">
              <a href="#servicos" onClick={() => setOpen(false)}>Serviços</a>
              <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
              <a href="#contato" onClick={() => setOpen(false)}>Contacto</a>
              <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded text-center">Agendar (Noona)</a>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div data-reveal className="reveal">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Cortes e barbearias com estilo moderno</h1>
            <p className="text-gray-600 mb-6">Profissionais experientes que cuidam do seu visual. Agende através da Noona para um processo simples e seguro.</p>
            <div className="flex gap-4">
              <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow">Agendar (Noona)</a>
              <a href="#servicos" className="px-6 py-3 border rounded-lg">Ver serviços</a>
            </div>
            <div className="mt-8 flex gap-4 items-center text-sm text-gray-500">
              <img src={ScissorsIcon} alt="scissors" className="w-6 h-6" />
              <span>Produtos premium • Ambiente acolhedor</span>
            </div>
          </div>

          <div data-reveal className="reveal">
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl card-hover">
                <img src={HeroSVG} alt="hero" className="w-full h-auto block" />
              </div>
              <div className="absolute -bottom-6 left-6 w-44 h-28 glass rounded-xl flex items-center justify-center text-sm text-gray-700 shadow">Promoções semanais</div>
            </div>
          </div>
        </section>

        <section id="servicos" className="mt-16">
          <h2 className="text-2xl font-bold mb-6" data-reveal>Serviços</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow card-hover reveal" data-reveal>
              <h3 className="font-semibold mb-2">Corte Masculino</h3>
              <p className="text-sm text-gray-600 mb-3">Cortes personalizados com tesoura e máquina.</p>
              <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">Agendar</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow card-hover reveal" data-reveal>
              <h3 className="font-semibold mb-2">Barba</h3>
              <p className="text-sm text-gray-600 mb-3">Modelagem, navalha e hidratação da pele.</p>
              <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">Agendar</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow card-hover reveal" data-reveal>
              <h3 className="font-semibold mb-2">Tratamentos</h3>
              <p className="text-sm text-gray-600 mb-3">Tratamentos capilares e produtos profissionais.</p>
              <a href={noonaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">Agendar</a>
            </div>
          </div>
        </section>

        <Gallery images={[img1, img2, img3, img4, img5, img6, img7, img8, img9]} />

        <section id="sobre" className="mt-16" data-reveal>
          <h2 className="text-2xl font-bold mb-4">Sobre nós</h2>
          <p className="text-gray-600">BarbeariaJ combina técnica e cuidado — o seu estilo em boas mãos.</p>
        </section>

        <section id="contato" className="mt-16" data-reveal>
          <h2 className="text-2xl font-bold mb-4">Contacto</h2>
          <p className="text-gray-600">Telefone: <a href="tel:+351291618236" className="text-indigo-600">+351 291 618 236</a></p>
          <p className="text-gray-600">Endereço: Camacha Shopping, Piso 0, Loja 06 — Camacha</p>
        </section>
      </main>

      <footer className="bg-transparent relative z-10 border-t mt-16">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} BarbeariaJ — Agende via Noona</div>
      </footer>
    </div>
  )
}
