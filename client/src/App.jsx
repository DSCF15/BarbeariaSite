import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Corrigir ícone do Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
L.Marker.prototype.setIcon(DefaultIcon)

// IMPORTANTE: Se usares imagem local, importa assim:
// import bgHero from './assets/bg-barbearia.jpg' 
import logoBarber from './assets/logo/image-removebg-preview.png' // Confirma se o caminho está certo

// Imagens da Galeria (Mantive as tuas importações)
import gal1 from './assets/gallery/3-233x300.png'
import gal2 from './assets/gallery/2-233x300.png'
import gal3 from './assets/gallery/4-233x300.png'
import gal4 from './assets/gallery/6-233x300.png'
import gal5 from './assets/gallery/7-233x300.png'
import gal6 from './assets/gallery/8-233x300.png'
import gal7 from './assets/gallery/5-233x300.png'
import gal8 from './assets/gallery/9-233x300.png'
import gal9 from './assets/gallery/12-1-233x300.png'
import bgHero from './assets/Barbearia/stefan-schauberger-R4NC2ChuZSc-unsplash.jpg' // Imagem de fundo do hero
import interiorbarb from './assets/Barbearia/frantisek-canik-k6RsU8om2UE-unsplash.jpg' // Imagem do interior da barbearia
import victormatos from './assets/Barbeiros/victormatos.jpg' // Imagem da equipa
import afonsomendonca from './assets/Barbeiros/afonsomendonca.jpg' // Imagem da equipa
import inaciopinto from './assets/Barbeiros/inaciopinto.jpg' // Imagem da equipa
import joaomiranda from './assets/Barbeiros/joaomiranda.jpg' // Imagem da equipa  
import jota from './assets/Barbeiros/jota.jpg' // Imagem da equipa
import pedrobranco from './assets/Barbeiros/pedrobranco.jpg' // Imagem da equipa
// A imagem nova para o separador (Parallax)
import dividerImg from './assets/Barbearia/ivan-cortez-7AFDiiYumkE-unsplash.jpg'


// Componente Separador Ziguezague (SVG)
const ZigZag = () => (
  <svg className="w-full h-4 text-gray-800 my-4" preserveAspectRatio="none" viewBox="0 0 100 10">
    <path d="M0 5 L2 0 L4 5 L6 0 L8 5 L10 0 L12 5 L14 0 L16 5 L18 0 L20 5 L22 0 L24 5 L26 0 L28 5 L30 0 L32 5 L34 0 L36 5 L38 0 L40 5 L42 0 L44 5 L46 0 L48 5 L50 0 L52 5 L54 0 L56 5 L58 0 L60 5 L62 0 L64 5 L66 0 L68 5 L70 0 L72 5 L74 0 L76 5 L78 0 L80 5 L82 0 L84 5 L86 0 L88 5 L90 0 L92 5 L94 0 L96 5 L98 0 L100 5" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
  </svg>
)

// Componente do Mapa - Usando Leaflet puro (sem react-leaflet)
const MapComponent = ({ lat, lng, title }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Inicializar mapa
    const map = L.map(mapRef.current).setView([lat, lng], 15)

    // Adicionar tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)

    // Adicionar marker
    L.marker([lat, lng], { icon: DefaultIcon })
      .bindPopup(title)
      .addTo(map)

    mapInstanceRef.current = map

    // Cleanup
    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [lat, lng, title])

  return <div ref={mapRef} style={{ height: '300px', width: '100%' }} className="rounded-lg" />
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // --- LÓGICA DE SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      // Reveal Animation
      const reveals = document.querySelectorAll('.reveal')
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        if (elementTop < windowHeight - 100) {
          reveals[i].classList.add('active')
        }
      }

      // Menu Ativo
      const sections = ['sobre', 'equipa', 'servicos', 'galeria', 'contactos']
      let current = ''
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const sectionTop = element.offsetTop
          if (window.scrollY >= sectionTop - 250) { 
            current = section
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const galleryImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9]

  // --- DADOS DA EQUIPA (Textos Personalizados) ---
  const teamCanico = [
    { 
      name: 'PEDRO BRANCO', 
      img: pedrobranco, 
      role: 'BARBER',
      desc: 'O Pedro traz uma visão contemporânea à barbearia. Mestre nos degradês e cortes texturizados, a sua cadeira é o lugar onde o estilo urbano encontra a precisão técnica. Focado sempre em elevar a autoestima de quem o procura.' 
    },
    { 
      name: 'VICTOR', 
      img: victormatos, 
      role: 'BARBER',
      desc: 'Com uma técnica apurada e um gosto pelo clássico, o Victor é o especialista em cortes de tesoura e barbas tradicionais. A sua atenção ao detalhe garante que cada cliente saia com um visual impecável e duradouro.' 
    },
    { 
      name: 'AFONSO', 
      img: afonsomendonca, 
      role: 'BARBER',
      desc: 'Jovem talento com uma paixão inesgotável pela arte. O Afonso está sempre a par das últimas tendências mundiais, trazendo para o Caniço os cortes mais arrojados e modernos. Perfeccionista por natureza.' 
    },
  ]

  const teamCamacha = [
    { 
      name: 'JOTA', 
      img: jota, 
      role: 'MASTER BARBER',
      desc: 'A alma da Barbearia J. Com anos de experiência e uma tesoura que conta histórias, o Jota combina a liderança com a arte de bem receber. Especialista em visagismo, sabe exatamente o que funciona para cada rosto.' 
    },
    { 
      name: 'INÁCIO', 
      img: inaciopinto, 
      role: 'BARBER',
      desc: 'O Inácio representa a "Old School" com um twist moderno. Especialista no ritual da barba com toalha quente e navalha, proporciona aquela experiência de relaxamento que todo o homem merece. Rigor e excelência.' 
    },
    { 
      name: 'JOÃO', 
      img: joaomiranda, 
      role: 'BARBER',
      desc: 'Simpatia e técnica definem o João. A sua prioridade é entender o cliente e transformar o desejo em realidade. Versátil, domina tanto os cortes clássicos como os designs mais complexos.' 
    },
  ]

  // --- DADOS SERVIÇOS ---
  const servicesList = [
    { name: 'Corte Barbeiro', time: '30 min', price: '13,00 €' },
    { name: 'Corte Expresso', time: '10 min', price: '9,00 €' },
    { name: 'Corte Criança até 8 anos', time: '30 min', price: '12,00 €' },
    { name: 'Barba', time: '15 min', price: '8,00 €' },
    { name: 'Corte Barbeiro + Barba', time: '60 min', price: '21,00 €' },
    { name: 'Corte + Tratamento Pele', time: '60 min', price: '22,00 €' },
    { name: 'Ritual Completo (Cabelo+Barba+Pele)', time: '90 min', price: '28,00 €' },
  ]

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-100 overflow-x-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* --- HEADER --- */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300" 
        style={{ 
          height: '110px', 
          background: 'rgba(0, 0, 0, 0.75)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
        }}>
        
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-[#d4af37]">☰</button>

          <div className="hidden lg:flex items-center justify-center w-full relative h-full">
            <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
              <a href="#sobre" className={`transition-all hover:scale-105 ${activeSection === 'sobre' ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>Sobre</a>
              <a href="#equipa" className={`transition-all hover:scale-105 ${activeSection === 'equipa' ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>Equipa</a>
              <a href="#servicos" className={`transition-all hover:scale-105 ${activeSection === 'servicos' ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>Serviços</a>
            </div>

            <div className="mx-12 relative group">
              <a href="#">
                <img src={logoBarber} alt="Logo" className="h-24 w-auto transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
              </a>
            </div>

            <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
              <a href="#galeria" className={`transition-all hover:scale-105 ${activeSection === 'galeria' ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>Galeria</a>
              <a href="#contactos" className={`transition-all hover:scale-105 ${activeSection === 'contactos' ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>Contactos</a>
            </div>

            <div className="absolute right-0 flex flex-col gap-2 top-1/2 -translate-y-1/2">
              <a href="https://noona.pt/barbeariajcanico/book" target="_blank" className="bg-transparent border border-[#d4af37] text-[#d4af37] px-4 py-1 text-[10px] font-bold uppercase hover:bg-[#d4af37] hover:text-black transition-all">Caniço</a>
              <a href="https://noona.pt/barbeariajc/book" target="_blank" className="bg-[#d4af37] text-black px-4 py-1 text-[10px] font-bold uppercase hover:bg-white transition-all">Camacha</a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden bg-black/95 p-6 flex flex-col gap-4 text-center border-t border-gray-800">
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#equipa" onClick={() => setMenuOpen(false)}>Equipa</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
            <a href="#contactos" onClick={() => setMenuOpen(false)}>Contactos</a>
          </nav>
        )}
      </header>

      {/* --- HERO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.35)' }}></div>
        <div className="relative z-10 text-center px-4 mt-20 reveal active">
          <h2 className="text-[#d4af37] text-sm md:text-lg font-bold tracking-[0.5em] mb-4 uppercase">Estilo & Tradição</h2>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">BARBEARIA <span className="text-[#d4af37]">J</span></h1>
          <a href="#contactos" className="border-b border-[#d4af37] pb-1 text-[#d4af37] hover:text-white transition-colors uppercase text-sm tracking-widest">Ver Localizações</a>
        </div>
      </section>

      {/* --- SOBRE NÓS --- */}
      <section id="sobre" className="py-32 bg-[#0b0b0b]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal flex justify-center md:justify-end">
              <div className="relative max-w-sm">
                 <div className="absolute -inset-4 border border-[#d4af37]/30 z-0"></div>
                 <img src={interiorbarb} alt="Interior Barbearia" className="relative z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div className="reveal delay-200 text-left">
              <h2 className="text-3xl font-bold mb-6 text-white uppercase tracking-wider">Mais do que um <span className="text-[#d4af37]">Corte</span></h2>
              <p className="text-gray-400 leading-relaxed mb-6 font-light">
                Fomos a primeira barbearia moderna a nascer na Madeira. Não vendemos apenas cortes de cabelo; vendemos autoestima e uma experiência clássica num ambiente pensado para o homem moderno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEPARADOR PARALLAX --- */}
      <section className="relative h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${dividerImg})` }}>
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="relative z-10 text-center reveal">
            <h3 className="text-4xl font-black text-white uppercase tracking-widest mb-4">True <span className="text-[#d4af37]">Gentlemen</span></h3>
         </div>
      </section>

      {/* --- EQUIPA --- */}
      <section id="equipa" className="py-32 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 reveal">
             <h2 className="text-4xl font-black uppercase tracking-widest text-white">A Nossa <span className="text-[#d4af37]">Equipa</span></h2>
          </div>

          {/* Caniço Team */}
          <div className="mb-32 reveal">
            <div className="flex items-center justify-center mb-12">
               <div className="h-px bg-[#d4af37] w-12 mr-4"></div>
               <h3 className="text-2xl font-bold text-white uppercase tracking-[0.2em]">Caniço</h3>
               <div className="h-px bg-[#d4af37] w-12 ml-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {teamCanico.map((member, i) => (
                <div key={i} className="group bg-[#0b0b0b] p-6 hover:bg-[#151515] transition-all duration-500 border-t border-transparent hover:border-[#d4af37]">
                   <div className="h-80 overflow-hidden mb-6 relative">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <h4 className="text-xl font-black text-white uppercase mb-2">{member.name}</h4>
                   <p className="text-[#d4af37] text-xs font-bold tracking-widest mb-4 uppercase">{member.role}</p>
                   <p className="text-gray-400 text-sm leading-relaxed font-light">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Camacha Team */}
          <div className="reveal">
            <div className="flex items-center justify-center mb-12">
               <div className="h-px bg-[#d4af37] w-12 mr-4"></div>
               <h3 className="text-2xl font-bold text-white uppercase tracking-[0.2em]">Camacha</h3>
               <div className="h-px bg-[#d4af37] w-12 ml-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {teamCamacha.map((member, i) => (
                <div key={i} className="group bg-[#0b0b0b] p-6 hover:bg-[#151515] transition-all duration-500 border-t border-transparent hover:border-[#d4af37]">
                   <div className="h-80 overflow-hidden mb-6 relative">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <h4 className="text-xl font-black text-white uppercase mb-2">{member.name}</h4>
                   <p className="text-[#d4af37] text-xs font-bold tracking-widest mb-4 uppercase">{member.role}</p>
                   <p className="text-gray-400 text-sm leading-relaxed font-light">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVIÇOS (Estilo Printscreen) --- */}
      <section id="servicos" className="py-24 bg-[#0b0b0b]">
         <div className="container mx-auto px-6 max-w-3xl reveal">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">Menu de <span className="text-[#d4af37]">Serviços</span></h2>
               <p className="text-gray-500 text-xs uppercase tracking-widest">Escolhe o teu estilo</p>
            </div>
            
            <div className="bg-[#151515] p-8 rounded-lg border border-gray-800 shadow-2xl">
               <div className="space-y-6">
                  {servicesList.map((service, index) => (
                     <div key={index} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-[#222] flex items-center justify-center rounded text-gray-400 font-bold group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                              {service.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-gray-200 group-hover:text-[#d4af37] transition-colors">{service.name}</h4>
                              <span className="text-xs text-gray-500">{service.time}</span>
                           </div>
                        </div>
                        <div className="text-[#d4af37] font-bold">
                           {service.price}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- HORÁRIO & RECRUTAMENTO (Estilo Preto e Branco) --- */}
      <section className="py-20 bg-white text-black">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
               
               {/* Coluna Horário */}
               <div className="text-center reveal">
                  <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">Horário</h2>
                  
                  <div className="bg-black text-white py-2 mb-2 font-bold uppercase tracking-widest text-sm">De Segunda a Sexta</div>
                  <div className="text-6xl font-black mb-6 tracking-tighter">10:00 - 19:00</div>

                  <div className="bg-black text-white py-2 mb-2 font-bold uppercase tracking-widest text-sm">Sábado</div>
                  <div className="text-6xl font-black mb-6 tracking-tighter">10:00 - 14:00</div>

                  <div className="bg-black text-white py-2 mb-2 font-bold uppercase tracking-widest text-sm">Domingo</div>
                  <div className="mt-4">
                     <p className="text-2xl font-bold uppercase border-b-4 border-black inline-block pb-1">No Domingo</p>
                     <p className="text-2xl font-bold uppercase">Vamos à Missa</p>
                  </div>
               </div>

               {/* Coluna CV Form */}
               <div className="reveal delay-200">
                  <div className="text-center mb-8">
                     <h3 className="text-xl font-bold uppercase tracking-widest mb-1">Queres trabalhar connosco?</h3>
                     <p className="text-sm uppercase text-gray-600">Envia-nos o teu CV!</p>
                     <ZigZag />
                  </div>
                  
                  <form className="space-y-4">
                     <input type="text" placeholder="Nome" className="w-full bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-black transition-all text-sm uppercase placeholder:text-gray-400" />
                     <input type="email" placeholder="Email" className="w-full bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-black transition-all text-sm uppercase placeholder:text-gray-400" />
                     <input type="text" placeholder="Contacto" className="w-full bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-black transition-all text-sm uppercase placeholder:text-gray-400" />
                     <input type="file" className="w-full bg-gray-100 p-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" />
                     <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-colors">
                        Enviar
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* --- GALERIA (Efeitos Visuais) --- */}
      <section id="galeria" className="py-24 bg-[#111]">
        <div className="container mx-auto px-6 text-center mb-12 reveal">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-white">Galeria</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {galleryImages.map((img, index) => (
                <div key={index} className="reveal overflow-hidden relative group h-64 md:h-80 cursor-pointer">
                    <img src={img} alt="Corte" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 border-[6px] border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100"></div>
                </div>
            ))}
        </div>
      </section>

      {/* --- CONTACTOS (Cartões Brancos com Mapa) --- */}
      <section id="contactos" className="py-24 bg-[#0b0b0b] relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal">
               <div className="text-5xl mx-auto mb-4">📍</div>
               <h2 className="text-4xl font-bold text-white uppercase tracking-[0.2em]">Contactos</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Card Caniço */}
                <div className="bg-white text-black p-8 reveal shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
                    <h3 className="text-2xl font-black uppercase mb-1">Barbearia J</h3>
                    <p className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-600">Caniço</p>
                    <ZigZag />
                    
                    {/* MAPA LEAFLET - CANIÇO */}
                    <div className="w-full mb-6 rounded-lg overflow-hidden border-2 border-black">
                        <MapComponent lat={32.6416} lng={-16.8500} title="Barbearia J - Caniço" />
                    </div>

                    <p className="text-sm mb-2 font-semibold">Estr. do Garajau BL-2 R/C Loja G</p>
                    <p className="text-sm mb-6 text-gray-500">9125-067 Caniço, Madeira</p>
                    <a href="tel:+351291123456" className="text-lg font-black hover:text-[#d4af37] transition-colors">+351 291 123 456</a>
                </div>

                {/* Card Camacha */}
                <div className="bg-white text-black p-8 reveal delay-200 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
                    <h3 className="text-2xl font-black uppercase mb-1">Barbearia J</h3>
                    <p className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-600">Camacha</p>
                    <ZigZag />

                    {/* MAPA LEAFLET - CAMACHA */}
                    <div className="w-full mb-6 rounded-lg overflow-hidden border-2 border-black">
                        <MapComponent lat={32.6792} lng={-16.8427} title="Barbearia J - Camacha" />
                    </div>

                    <p className="text-sm mb-2 font-semibold">Shopping Piso 0, Loja 06</p>
                    <p className="text-sm mb-6 text-gray-500">9135-012 Camacha, Madeira</p>
                    <a href="tel:+351291123456" className="text-lg font-black hover:text-[#d4af37] transition-colors">+351 291 654 321</a>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-[10px] uppercase tracking-widest border-t border-gray-900 bg-black">
          © {new Date().getFullYear()} Barbearia J. Todos os direitos reservados.
      </footer>
    </div>
  )
}