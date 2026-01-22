import React, { useState, useEffect } from 'react'
import heroCam from './assets/optimized/hero1.jpg'
import heroCan from './assets/optimized/hero2.jpg'
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
  const [location, setLocation] = useState('Camacha')
  const [heroIndex, setHeroIndex] = useState(0)
  useReveal()

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const path = window.location.pathname.toLowerCase()
    setLocation(path.includes('canico') ? 'Canico' : 'Camacha')
    const onPop = () => {
      const p = window.location.pathname.toLowerCase()
      setLocation(p.includes('canico') ? 'Canico' : 'Camacha')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigateTo = (page) => {
    const path = page === 'Canico' ? '/canico' : '/camacha'
    window.history.pushState({}, '', path)
    setLocation(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const locations = {
    Camacha: {
      name: 'Camacha',
      phone: '+351 291 618 236',
      address: 'Camacha Shopping, Piso 0, Loja 06 — Camacha',
      noonaUrl: 'https://noona.io/your-salon'
    },
    Canico: {
      name: 'Caniço',
      phone: '+351 291 618 236',
      address: 'Edifício Plaza, Estr. do Garajau BL-2 R/C Loja G — Caniço',
      noonaUrl: 'https://noona.io/your-salon-canico'
    }
  }

  const locData = locations[location]

  const services = [
    { title: 'Corte Irreverente', price: '14€', icon: '✂️' },
    { title: 'Corte Clássico', price: '10€', icon: '💈' },
    { title: 'Corte Clássico Moderno', price: '15€', icon: '🎨' },
    { title: 'Harmonização de Barba', price: '10€', icon: '🧔' },
    { title: 'Descoloração', price: '30€', icon: '💫' },
    { title: 'Corte Kids', price: '11€', icon: '👦' }
  ]

  const barbers = [
    { name: 'Miguel Silva', role: 'Founder & Master Barber', desc: 'Especializado em cortes clássicos e modernos.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&crop=faces' },
    { name: 'João Costa', role: 'Barber Senior', desc: 'Especialista em harmonização de barba.', img: 'https://images.unsplash.com/photo-1545996124-4c2f8c9f4f3c?q=80&w=800&auto=format&fit=crop&crop=faces' },
    { name: 'Rui Pereira', role: 'Stylist & Artist', desc: 'Criatividade e inovação nos cortes.', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop&crop=faces' }
  ]

  const testimonials = [
    { name: 'Sónia Loureiro', text: 'Ótimos profissionais, ótimo ambiente e simpatia.' },
    { name: 'Tiago Dias', text: 'Experiência 5*, recomendo vivamente. Obrigado 😊' },
    { name: 'Nuno Duarte', text: 'Espaço muito agradável, ambiente fantástico, profissionais muito bons.' }
  ]

  const amenities = [
    { icon: '📶', name: 'Wifi Livre', desc: 'Conexão rápida' },
    { icon: '🎨', name: 'Old & New School', desc: 'Decoração única' },
    { icon: '📺', name: 'TV/Streaming', desc: 'Entretenimento' },
    { icon: '🍹', name: 'Bar', desc: 'Bebidas' },
    { icon: '🎮', name: 'Videojogos', desc: 'Diversão' },
    { icon: '⏰', name: 'Horário Alargado', desc: 'Aberto até 22h' }
  ]

  const whyUs = [
    { icon: '📍', title: 'Boa Localização', desc: 'Fácil acesso' },
    { icon: '🚗', title: 'Estacionamento', desc: 'Bastante lugar' },
    { icon: '👨‍⚕️', title: 'Profissionais', desc: 'Equipa competente' },
    { icon: '🏡', title: 'Espaço Acolhedor', desc: 'Preço justo' },
    { icon: '✨', title: 'Personalizado', desc: 'Serviço 100%' }
  ]

  const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
  const heroSrc = location === 'Canico' ? heroCan : heroCam

  return (
    <div className="min-h-screen theme-dark text-gray-100 relative overflow-hidden">
      <header className="fixed-top bg-black/60 backdrop-blur-md relative z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-black text-yellow-400">💈</div>
            <span className="font-bold text-lg text-gray-100">BarbeariaJ</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="hover:text-yellow-300 transition">Sobre</a>
            <a href="#servicos" className="hover:text-yellow-300 transition">Serviços</a>
            <a href="#galeria" className="hover:text-yellow-300 transition">Galeria</a>
            <a href="#contato" className="hover:text-yellow-300 transition">Contacto</a>
            <div className="flex items-center gap-2">
              <button onClick={() => navigateTo('Camacha')} className={`px-3 py-1 rounded text-sm ${location === 'Camacha' ? 'bg-yellow-400 text-black font-bold' : 'bg-white/10'}`}>Camacha</button>
              <button onClick={() => navigateTo('Canico')} className={`px-3 py-1 rounded text-sm ${location === 'Canico' ? 'bg-yellow-400 text-black font-bold' : 'bg-white/10'}`}>Caniço</button>
            </div>
            <a href={locData.noonaUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300">Agendar</a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 text-white">☰</button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-black/90 border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-3">
              <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
              <a href="#servicos" onClick={() => setOpen(false)}>Serviços</a>
              <a href="#galeria" onClick={() => setOpen(false)}>Galeria</a>
              <a href="#contato" onClick={() => setOpen(false)}>Contacto</a>
              <a href={locData.noonaUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-yellow-400 text-black font-bold rounded text-center">Agendar</a>
            </div>
          </div>
        )}
      </header>

      <section className="hero-slider relative min-h-[90vh] overflow-hidden mt-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={heroIndex === 0 ? heroSrc : heroSrc} alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">Bem-vindo à BarbeariaJ</h1>
            <p className="text-2xl md:text-3xl mb-4 font-light">Barbearia Urbana — {location}</p>
            <p className="text-lg md:text-xl mb-8 text-gray-200">Qualidade, estilo e profissionalismo em cada corte.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href={locData.noonaUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition text-lg">Agendar Agora</a>
              <a href="#servicos" className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition text-lg">Ver Serviços</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button onClick={() => setHeroIndex(0)} className={`w-3 h-3 rounded-full transition ${heroIndex === 0 ? 'bg-white' : 'bg-white/50'}`}></button>
          <button onClick={() => setHeroIndex(1)} className={`w-3 h-3 rounded-full transition ${heroIndex === 1 ? 'bg-white' : 'bg-white/50'}`}></button>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16 relative z-10">

        <section id="sobre" className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">A Nossa História</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-lg">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4 text-lg">BarbeariaJ nasce da ideia de conciliar o estilo NewSchool ao OldSchool. Inaugurada em 2019, é um espaço que se caracteriza por ter uma atmosfera alegre, descontraída e informal.</p>
              <p className="text-gray-300 leading-relaxed text-lg">Desde cortes tradicionais até aos mais criativos, em BarbeariaJ podem contar sempre com profissionais capazes de tornar a vossa experiência numa memória inolvidável. 💈</p>
            </div>
            <div className="flex gap-6 items-center justify-center">
              <div className="text-6xl font-black text-yellow-400">2019</div>
              <div className="border-l-4 border-yellow-400 pl-6"><p className="text-gray-400 text-lg">Ano de fundação com visão de criar um espaço único e memorável.</p></div>
            </div>
          </div>
        </section>

        <section id="servicos" className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">Serviços & Preços</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-white/10">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-yellow-400 font-bold text-2xl">{s.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">Testemunhos</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg border border-white/10">
                <p className="text-gray-300 mb-4 italic text-lg">"{t.text}"</p>
                <div className="font-bold text-yellow-400">{t.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">Os Fundadores</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {barbers.map((b, i) => (
              <div key={i} className="bg-white/5 rounded-lg overflow-hidden hover:shadow-2xl transition border border-white/10">
                <div className="h-72 overflow-hidden bg-gray-700">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover hover:scale-105 transition" />
                </div>
                <div className="p-6">
                  <div className="font-bold text-lg mb-1">{b.name}</div>
                  <div className="text-yellow-400 font-semibold text-sm mb-3">{b.role}</div>
                  <p className="text-gray-400 text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">O Nosso Espaço</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {amenities.map((a, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg text-center border border-white/10 hover:bg-white/10 transition">
                <div className="text-5xl mb-4">{a.icon}</div>
                <div className="font-bold text-lg mb-2">{a.name}</div>
                <div className="text-sm text-gray-400">{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">Porquê Cortar Connosco</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {whyUs.map((w, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-400/10 to-transparent p-6 rounded-lg text-center border border-yellow-400/20 hover:border-yellow-400/50 transition">
                <div className="text-4xl mb-3">{w.icon}</div>
                <div className="font-bold text-sm mb-1">{w.title}</div>
                <div className="text-xs text-gray-400">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <Gallery images={galleryImages} />

        <section id="contato" className="py-12" data-reveal>
          <h2 className="text-4xl font-black mb-8 text-center">Contactos & Localização</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-8 rounded-lg text-center border border-white/10">
              <div className="text-5xl mb-4">📞</div>
              <div className="font-bold text-lg text-yellow-400 mb-2">Telefonar</div>
              <a href={`tel:${locData.phone.replace(/\s|\+/g, '')}`} className="text-gray-300 hover:text-yellow-400 transition text-lg">{locData.phone}</a>
            </div>
            <div className="bg-white/5 p-8 rounded-lg text-center border border-white/10">
              <div className="text-5xl mb-4">📍</div>
              <div className="font-bold text-lg text-yellow-400 mb-2">{location}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{locData.address}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg text-center border border-white/10">
              <div className="text-5xl mb-4">⏰</div>
              <div className="font-bold text-lg text-yellow-400 mb-2">Horário</div>
              <p className="text-gray-400 text-sm leading-relaxed">{location === 'Camacha' ? 'Seg–Sex 10:00–19:00\nSáb 10:00–14:00\nDom: Encerrado' : 'Seg–Sex 10:00–19:00\nSáb 10:00–17:00\nDom: Encerrado'}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400/10 to-transparent p-8 rounded-lg text-center border border-yellow-400/20">
            <p className="text-gray-300 mb-6 text-lg">Pronto para um corte inesquecível? Agende connosco agora!</p>
            <a href={locData.noonaUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition inline-block text-lg">Agendar via Noona</a>
          </div>
        </section>

      </main>

      <footer className="bg-black/30 border-t border-white/10 py-8 relative z-10">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BarbeariaJ — Corte connosco. Na ProStudio, a sua experiência ficará numa memória inolvidável. 💈</p>
          <p className="mt-2">Desenvolvido com ❤️ para oferecer a melhor experiência</p>
        </div>
      </footer>
    </div>
  )
}
