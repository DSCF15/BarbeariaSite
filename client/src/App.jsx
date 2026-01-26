import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// --- CONFIGURAÇÃO LEAFLET ---
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

// --- IMPORTAÇÃO DE IMAGENS ---
import logoBarber from './assets/logo/image-removebg-preview.png' 

// Galeria
import gal1 from './assets/gallery/3-233x300.png'
import gal2 from './assets/gallery/2-233x300.png'
import gal3 from './assets/gallery/4-233x300.png'
import gal4 from './assets/gallery/6-233x300.png'
import gal5 from './assets/gallery/7-233x300.png'
import gal6 from './assets/gallery/8-233x300.png'
import gal7 from './assets/gallery/5-233x300.png'
import gal8 from './assets/gallery/9-233x300.png'
import gal9 from './assets/gallery/12-1-233x300.png'
import gal10 from './assets/gallery/images (1).jpg'
import gal12 from './assets/gallery/images.jpg'
import gal11 from './assets/gallery/transferir.jpg'
// IMAGENS DE FUNDO
import headerBg from './assets/Barbearia/redd-francisco-BBGyxhtPpC0-unsplash.jpg' 
import contactDivider from './assets/Barbearia/cshong-ls07IscXplg-unsplash.jpg' 
// Separador 1: Sobre -> Equipa
import divider1 from './assets/Barbearia/ivan-cortez-7AFDiiYumkE-unsplash.jpg' 
// Separador 2: Equipa -> Serviços
import dividerTeamServices from './assets/Barbearia/klara-kulikova-lhUQ27MEx0c-unsplash.jpg' 
// Separador 3: Serviços -> Galeria (NOVO)
import dividerServicesGallery from './assets/Barbearia/nathon-oski-EW_rqoSdDes-unsplash.jpg' 
// Separador 4: Galeria -> Horário
import dividerGalleryHours from './assets/Barbearia/frantisek-canik-4pV_ZGTTFsk-unsplash.jpg' 

// Equipa
import victormatos from './assets/Barbeiros/victormatos.jpg'
import afonsomendonca from './assets/Barbeiros/afonsomendonca.jpg' 
import inaciopinto from './assets/Barbeiros/inaciopinto.jpg' 
import joaomiranda from './assets/Barbeiros/joaomiranda.jpg'  
import jota from './assets/Barbeiros/jota.jpg' 
import pedrobranco from './assets/Barbeiros/pedrobranco.jpg' 

// --- ÍCONES SVG ---
const FacebookIcon = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

// --- COMPONENTES AUXILIARES ---

const ZigZag = () => (
  <svg className="w-full h-4 text-white my-6 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 10">
    <path d="M0 5 L2 0 L4 5 L6 0 L8 5 L10 0 L12 5 L14 0 L16 5 L18 0 L20 5 L22 0 L24 5 L26 0 L28 5 L30 0 L32 5 L34 0 L36 5 L38 0 L40 5 L42 0 L44 5 L46 0 L48 5 L50 0 L52 5 L54 0 L56 5 L58 0 L60 5 L62 0 L64 5 L66 0 L68 5 L70 0 L72 5 L74 0 L76 5 L78 0 L80 5 L82 0 L84 5 L86 0 L88 5 L90 0 L92 5 L94 0 L96 5 L98 0 L100 5" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
  </svg>
)

const MapComponent = ({ lat, lng, title }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([lat, lng], 15)
        return
    }
    if (!mapRef.current) return

    const map = L.map(mapRef.current).setView([lat, lng], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(map)
    L.marker([lat, lng], { icon: DefaultIcon }).bindPopup(title).addTo(map)
    mapInstanceRef.current = map
    
    return () => { map.remove(); mapInstanceRef.current = null }
  }, [lat, lng, title])

  return <div ref={mapRef} style={{ height: '100%', width: '100%', minHeight: '350px' }} className="rounded-lg shadow-inner grayscale hover:grayscale-0 transition-all duration-500" />
}

const ParallaxDivider = ({ img, title, subtitle }) => (
  <section className="relative h-80 bg-fixed bg-center bg-cover flex items-center justify-center" 
     style={{ backgroundImage: `url(${img})` }}>
     <div className="absolute inset-0 bg-black/50"></div>
     <div className="relative z-10 text-center border-4 border-white/20 p-8 backdrop-blur-sm reveal">
        {title && <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">{title}</h3>}
        {subtitle && <p className="text-[#d4af37] uppercase tracking-[0.5em] font-bold">{subtitle}</p>}
     </div>
  </section>
)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLocation, setActiveLocation] = useState('Camacha') 
  const [activeSection, setActiveSection] = useState('') 
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
        setScrollY(window.scrollY)
        
        // Reveal Animations
        const reveals = document.querySelectorAll('.reveal')
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight
            if (reveals[i].getBoundingClientRect().top < windowHeight - 50) {
                reveals[i].classList.add('active')
            }
        }

        // Menu Active State
        const sections = ['sobre', 'equipa', 'servicos', 'galeria', 'contactos']
        let current = ''
        sections.forEach(section => {
            const element = document.getElementById(section)
            if (element && window.scrollY >= element.offsetTop - 150) { 
                current = section
            }
        })
        setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- DADOS DINÂMICOS ---
  const locationsData = {
      Camacha: {
          name: 'Camacha',
          address: 'Shopping Piso 0, Loja 06',
          fullAddress: 'Camacha Shopping, Piso 0, Loja 06 — 9135-012 Camacha',
          phone: '+351 291 654 321', 
          coords: { lat: 32.67523907951756, lng: -16.85248252079321 },
          bookingLink: 'https://noona.pt/barbeariajc/book',
          hours: 'Seg–Sex: 10:00–19:00\nSáb: 10:00–14:00'
      },
      Canico: {
          name: 'Caniço',
          address: 'Edifício Plaza, Estr. do Garajau',
          fullAddress: 'Edifício Plaza, Estr. do Garajau BL-2 R/C Loja G — 9125-067 Caniço',
          phone: '+351 291 123 456', 
          coords: { lat:32.64763450742683 , lng: -16.844603075120062 },
          bookingLink: 'https://noona.pt/barbeariajcanico/book',
          hours: 'Seg–Sex: 10:00–19:00\nSáb: 10:00–17:00'
      }
  }

  const currentLoc = locationsData[activeLocation]
  const galleryImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9,gal10,gal11,gal12]
  
  // --- BARBEIROS (Separados por Loja) ---
  const barbersData = {
      Camacha: [
        { name: 'JOTA', img: jota, role: 'MASTER BARBER', desc: 'A alma da Barbearia J. Com anos de experiência, combina liderança com a arte de bem receber.' },
        { name: 'INÁCIO', img: inaciopinto, role: 'BARBER', desc: 'O Inácio representa a "Old School" com um twist moderno. Especialista no ritual da barba com navalha.' },
        { name: 'JOÃO', img: joaomiranda, role: 'BARBER', desc: 'Simpatia e técnica definem o João. A sua prioridade é entender o cliente e transformar o desejo em realidade.' },
      ],
      Canico: [
        { name: 'PEDRO BRANCO', img: pedrobranco, role: 'BARBER', desc: 'O Pedro traz uma visão contemporânea à barbearia. Mestre nos degradês e cortes texturizados.' },
        { name: 'VICTOR', img: victormatos, role: 'BARBER', desc: 'Com uma técnica apurada e um gosto pelo clássico, o Victor é o especialista em cortes de tesoura.' },
        { name: 'AFONSO', img: afonsomendonca, role: 'BARBER', desc: 'Jovem talento com uma paixão inesgotável pela arte. O Afonso está sempre a par das últimas tendências.' },
      ]
  }

  const activeBarbers = barbersData[activeLocation]

  const servicesData = {
    // Lista do Print (Mais completa/Atualizada)
    Canico: [
        { title: 'Corte Barbeiro', price: '13,00 €', time: '30 min' },
        { title: 'Corte Expresso', price: '9,00 €', time: '10 min' },
        { title: 'Corte Criança até 8 anos', price: '12,00 €', time: '30 min' },
        { title: 'Barba', price: '8,00 €', time: '15 min' },
        { title: 'Corte Expresso (1 pente) + Barba', price: '17,00 €', time: '30 min' },
        { title: 'Corte Barbeiro + Barba', price: '21,00 €', time: '60 min' },
        { title: 'Corte barbeiro + tratamento de pele', price: '22,00 €', time: '60 min' },
        { title: 'Corte barbeiro + barba + tratamento de pele', price: '28,00 €', time: '90 min' }
    ],
    // Lista "Menos" (Antiga/Simples)
    Camacha: [
       { title: 'Corte Barbeiro', price: '13,00 €', time: '30 min' },
        { title: 'Corte Expresso', price: '9,00 €', time: '10 min' },
        { title: 'Corte Criança até 8 anos', price: '12,00 €', time: '30 min' },
      { title: 'Corte Expresso (1 pente) + Barba', price: '17,00 €', time: '30 min' },
        { title: 'Corte Barbeiro + Barba', price: '21,00 €', time: '60 min' },
         { title: 'Barba', price: '8,00 €', time: '15 min' },
          { title: 'Extras', price: '2,00 €', time: '5 min' },
    ]
  }

  const activeServices = servicesData[activeLocation]

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-100 overflow-x-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-md py-2 border-b border-[#d4af37]/20' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
            {/* Esquerda: Toggle */}
            <div className="hidden lg:flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
                <button onClick={() => setActiveLocation('Camacha')} className={`px-6 py-2 text-xs font-bold uppercase rounded-full transition-all duration-300 ${activeLocation === 'Camacha' ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}>Camacha</button>
                <button onClick={() => setActiveLocation('Canico')} className={`px-6 py-2 text-xs font-bold uppercase rounded-full transition-all duration-300 ${activeLocation === 'Canico' ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}>Caniço</button>
            </div>
            
            {/* Centro: Logo */}
            <a href="#" className="flex-shrink-0"><img src={logoBarber} alt="Logo" className="h-16 lg:h-20 w-auto hover:scale-105 transition duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" /></a>
            
            {/* Direita: Menu, Ícones e CTA */}
            <div className="hidden lg:flex items-center gap-6">
                <nav className="flex gap-6">
                    <a href="#sobre" className={`text-xs font-bold uppercase tracking-widest transition ${activeSection === 'sobre' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] text-gray-300'}`}>Sobre</a>
                    <a href="#equipa" className={`text-xs font-bold uppercase tracking-widest transition ${activeSection === 'equipa' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] text-gray-300'}`}>Equipa</a>
                    <a href="#servicos" className={`text-xs font-bold uppercase tracking-widest transition ${activeSection === 'servicos' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] text-gray-300'}`}>Serviços</a>
                    <a href="#contactos" className={`text-xs font-bold uppercase tracking-widest transition ${activeSection === 'contactos' ? 'text-[#d4af37]' : 'hover:text-[#d4af37] text-gray-300'}`}>Contactos</a>
                </nav>
                
                {/* Ícones Sociais Header */}
                <div className="flex gap-3 border-l border-white/20 pl-4">
                    <a href="https://www.facebook.com/BarbeariaJcamacha" target="_blank" className="text-gray-400 hover:text-[#d4af37] transition"><FacebookIcon className="w-4 h-4"/></a>
                    <a href="https://www.instagram.com/barbearia__j/" target="_blank" className="text-gray-400 hover:text-[#d4af37] transition"><InstagramIcon className="w-4 h-4"/></a>
                </div>

                <a href={currentLoc.bookingLink} target="_blank" className="border border-[#d4af37] text-[#d4af37] px-6 py-2 text-xs font-bold uppercase hover:bg-[#d4af37] hover:text-black transition-all duration-300">Marcar - {currentLoc.name}</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl text-[#d4af37]">☰</button>
        </div>
        {menuOpen && (
            <div className="lg:hidden bg-black/95 p-6 border-t border-[#d4af37]/20 text-center space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                    <button onClick={() => setActiveLocation('Camacha')} className={`flex-1 py-2 text-xs font-bold uppercase border ${activeLocation === 'Camacha' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'text-gray-500 border-gray-700'}`}>Camacha</button>
                    <button onClick={() => setActiveLocation('Canico')} className={`flex-1 py-2 text-xs font-bold uppercase border ${activeLocation === 'Canico' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'text-gray-500 border-gray-700'}`}>Caniço</button>
                </div>
                <a href="#sobre" className="block text-sm font-bold uppercase" onClick={() => setMenuOpen(false)}>Sobre</a>
                <a href="#equipa" className="block text-sm font-bold uppercase" onClick={() => setMenuOpen(false)}>Equipa</a>
                <a href="#servicos" className="block text-sm font-bold uppercase" onClick={() => setMenuOpen(false)}>Serviços</a>
                <a href="#contactos" className="block text-sm font-bold uppercase" onClick={() => setMenuOpen(false)}>Contactos</a>
                <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
                    <a href="https://www.facebook.com/BarbeariaJcamacha" target="_blank" className="text-gray-400 hover:text-[#d4af37]"><FacebookIcon className="w-6 h-6"/></a>
                    <a href="https://www.instagram.com/barbearia__j/" target="_blank" className="text-gray-400 hover:text-[#d4af37]"><InstagramIcon className="w-6 h-6"/></a>
                </div>
            </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${headerBg})`, backgroundAttachment: 'fixed' }}></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
            <p className="text-[#d4af37] text-sm md:text-base font-bold tracking-[0.5em] mb-4 uppercase">Estilo & Tradição</p>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter shadow-black drop-shadow-2xl">BARBEARIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceabb]">J</span></h1>
            <p className="text-gray-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
                A excelência do corte clássico num ambiente moderno na Madeira.
                <br /><span className="text-[#d4af37]/80 text-xs mt-3 block font-bold uppercase tracking-widest">Loja Selecionada: {currentLoc.name}</span>
            </p>
            <a href={currentLoc.bookingLink} target="_blank" className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-black transition-all duration-300 bg-[#d4af37] rounded hover:bg-white hover:text-black focus:outline-none ring-offset-2 focus:ring-2">
                <span className="relative uppercase tracking-widest">MARCAR AGORA - {currentLoc.name}</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </a>
        </div>
      </section>

      {/* --- SOBRE NÓS --- */}
      <section id="sobre" className="py-24 bg-[#0b0b0b] border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal flex justify-center md:justify-end">
              <div className="relative max-w-sm w-full p-8 border border-[#d4af37]/20 bg-white/5 rounded-lg backdrop-blur-sm">
                 <div className="absolute -inset-2 border border-[#d4af37]/10 z-0"></div>
                 <img src={logoBarber} alt="Logo Barbearia J" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition duration-500" />
              </div>
            </div>
            <div className="reveal delay-200 text-left">
              <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-6">A Nossa <span className="text-[#d4af37]">Arte</span></h2>
              <p className="text-gray-400 leading-relaxed mb-6 font-light text-lg">
                Fomos a primeira barbearia moderna a nascer na Madeira. Não vendemos apenas cortes de cabelo; vendemos autoestima e uma experiência clássica num ambiente pensado para o homem moderno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEPARADOR 1 (Sobre -> Equipa) --- */}
      <ParallaxDivider img={divider1} title="True Gentlemen" subtitle="Classic Atmosphere" />

      {/* --- EQUIPA --- */}
      <section id="equipa" className="py-24 bg-[#111] border-b border-white/5">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal">
                <h2 className="text-3xl font-black text-white uppercase tracking-widest">Equipa <span className="text-[#d4af37]">{activeLocation}</span></h2>
                <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 justify-center">
                {activeBarbers.map((b, i) => (
                    <div key={i} className="group relative bg-[#0b0b0b] border border-gray-800 hover:border-[#d4af37] transition-all duration-500 reveal">
                        <div className="h-80 overflow-hidden relative">
                            <img src={b.img} alt={b.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-white font-bold uppercase text-xl mb-1">{b.name}</h3>
                            <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-4">{b.role}</p>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- SEPARADOR 2 (Equipa -> Serviços) --- */}
      <ParallaxDivider img={dividerTeamServices} title="Qualidade" subtitle="Premium" />

      {/* --- SERVIÇOS (DINÂMICO CANIÇO VS CAMACHA) --- */}
      <section id="servicos" className="py-32 bg-[#0b0b0b] relative">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 blur-[100px]"></div>
         <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-16 reveal">
               <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em]">Menu {activeLocation}</span>
               <h2 className="text-5xl font-black text-white uppercase mt-2">Serviços</h2>
               <div className="w-20 h-1 bg-[#d4af37] mx-auto mt-6"></div>
            </div>
            <div className="space-y-8 reveal">
               {activeServices.map((s, i) => (
                  <div key={i} className="group flex items-end justify-between hover:pl-4 transition-all duration-500 cursor-default">
                     <div className="relative z-10  pr-4">
                        <h3 className="text-2xl font-bold text-white uppercase group-hover:text-[#d4af37] transition-colors">{s.title}</h3>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.time}</p>
                     </div>
                     <div className="flex-grow border-b border-dashed border-gray-800 mb-2 relative -top-1 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative z-10 pl-4">
                        <span className="text-2xl font-light text-[#d4af37]">{s.price}</span>
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-20 text-center reveal">
               <a href={currentLoc.bookingLink} target="_blank" className="inline-block border border-[#d4af37] text-[#d4af37] px-12 py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all duration-300">Agendar Serviço ({currentLoc.name})</a>
            </div>
         </div>
      </section>

      {/* --- SEPARADOR 3 (Serviços -> Galeria) --- */}
      <ParallaxDivider img={dividerServicesGallery} title="Atmosfera" subtitle="Incomparável" />

      {/* --- GALERIA --- */}
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

      {/* --- SEPARADOR 4 (Galeria -> Horário) --- */}
      <ParallaxDivider img={dividerGalleryHours} title="Estilo" subtitle="Único" />

      {/* --- HORÁRIO & RECRUTAMENTO --- */}
      <section id="recrutamento" className="py-24 bg-[#0b0b0b] relative">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
               
               {/* Coluna Horário */}
               <div className="text-center reveal p-8 border border-[#333] relative bg-[#0b0b0b]/50 backdrop-blur-sm rounded-lg hover:border-[#d4af37] transition-colors duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b0b0b] px-4 border border-[#333] rounded-full">
                     <span className="text-3xl">⏰</span>
                  </div>
                  <h2 className="text-5xl font-black mb-8 uppercase tracking-tight text-white">Horário</h2>
                  <div className="space-y-8">
                     <div>
                        <div className="bg-[#d4af37] text-black inline-block px-4 py-1 mb-2 font-bold uppercase tracking-widest text-xs">De Segunda a Sexta</div>
                        <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">10:00 - 19:00</div>
                     </div>
                     <div>
                        <div className="bg-[#d4af37] text-black inline-block px-4 py-1 mb-2 font-bold uppercase tracking-widest text-xs">Sábado</div>
                        <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">10:00 - 14:00</div>
                     </div>
                     <div>
                        <div className="bg-[#d4af37] text-black inline-block px-4 py-1 mb-2 font-bold uppercase tracking-widest text-xs">Domingo</div>
                        <div className="mt-2">
                            <p className="text-xl font-black uppercase mt-1 text-gray-300">Encerrado</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Coluna CV Form */}
               <div className="reveal delay-200 p-8 bg-[#111] border border-gray-800 shadow-xl relative rounded-lg">
                  <div className="text-center mb-8">
                      <h3 className="text-2xl font-black uppercase tracking-widest mb-2 text-white">Quer Trabalhar Connosco?</h3>
                      <p className="text-sm uppercase text-gray-400 font-bold tracking-wider">Envie-nos o seu CV!</p>
                      <ZigZag />
                  </div>
                  <form className="space-y-5">
                     <div className="group">
                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block group-hover:text-[#d4af37] transition-colors">Nome Completo</label>
                        <input type="text" className="w-full bg-[#0b0b0b] text-white border-b-2 border-gray-800 p-3 outline-none focus:border-[#d4af37] transition-all text-sm font-bold uppercase placeholder-gray-700" placeholder="O seu nome" />
                     </div>
                     <div className="group">
                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block group-hover:text-[#d4af37] transition-colors">Email</label>
                        <input type="email" className="w-full bg-[#0b0b0b] text-white border-b-2 border-gray-800 p-3 outline-none focus:border-[#d4af37] transition-all text-sm font-bold uppercase placeholder-gray-700" placeholder="exemplo@email.com" />
                     </div>
                     <div className="group">
                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block group-hover:text-[#d4af37] transition-colors">Contacto</label>
                        <input type="text" className="w-full bg-[#0b0b0b] text-white border-b-2 border-gray-800 p-3 outline-none focus:border-[#d4af37] transition-all text-sm font-bold uppercase placeholder-gray-700" placeholder="+351 9..." />
                     </div>
                     <div className="pt-2">
                        <label className="cursor-pointer flex items-center justify-center w-full bg-[#0b0b0b] border-2 border-dashed border-gray-700 p-6 hover:border-[#d4af37] transition-colors group">
                           <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-white transition-colors">📎 Carregar Ficheiro (PDF)</span>
                           <input type="file" className="hidden" />
                        </label>
                     </div>
                     <button className="w-full bg-[#d4af37] text-black py-4 font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-lg mt-4">
                        Enviar Candidatura
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
      
      {/* --- SEPARADOR 5 (Recrutamento -> Contactos) --- */}
      <ParallaxDivider img={contactDivider} title="Visite-nos" subtitle="Hoje Mesmo" />

      {/* --- CONTACTOS --- */}
      <section id="contactos" className="py-32 bg-[#0b0b0b] relative">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal">
               <h2 className="text-5xl font-black text-white uppercase tracking-tight">Contactos</h2>
               <p className="text-gray-500 mt-4 text-sm uppercase tracking-widest">A ver informações da loja: <span className="text-[#d4af37] font-bold text-lg">{currentLoc.name}</span></p>
               
               <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setActiveLocation('Camacha')} className={`text-xs uppercase font-bold border-b pb-1 transition ${activeLocation === 'Camacha' ? 'text-white border-[#d4af37]' : 'text-gray-600 border-transparent hover:text-white'}`}>Ver Camacha</button>
                  <button onClick={() => setActiveLocation('Canico')} className={`text-xs uppercase font-bold border-b pb-1 transition ${activeLocation === 'Canico' ? 'text-white border-[#d4af37]' : 'text-gray-600 border-transparent hover:text-white'}`}>Ver Caniço</button>
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto shadow-2xl border border-gray-800 reveal">
               <div className="bg-[#111] p-12 lg:p-16 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-yellow-800"></div>
                  <h3 className="text-4xl font-black text-white uppercase mb-10">{currentLoc.name}</h3>
                  <div className="space-y-10">
                     <div className="flex items-start gap-6 group">
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition">📍</span>
                        <div>
                           <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-1">Morada</p>
                           <p className="text-white text-xl md:text-2xl font-light leading-snug">{currentLoc.address}</p>
                           <p className="text-gray-500 text-sm mt-1">{activeLocation === 'Camacha' ? '9135-012 Camacha, Madeira' : '9125-067 Caniço, Madeira'}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-6 group">
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition">📞</span>
                        <div>
                           <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-1">Telefone</p>
                           <a href={`tel:${currentLoc.phone}`} className="text-white text-2xl md:text-3xl font-bold hover:text-[#d4af37] transition-colors">{currentLoc.phone}</a>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="relative min-h-[400px] w-full bg-[#1a1a1a]">
                  <MapComponent key={activeLocation} lat={currentLoc.coords.lat} lng={currentLoc.coords.lng} title={`Barbearia J - ${currentLoc.name}`} />
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 text-center">
        <div className="flex justify-center items-center gap-6 mb-6">
           <a href="https://www.facebook.com/BarbeariaJcamacha" target="_blank" className="text-gray-400 hover:text-[#d4af37] transition"><FacebookIcon className="w-6 h-6"/></a>
           <a href="https://www.instagram.com/barbearia__j/" target="_blank" className="text-gray-400 hover:text-[#d4af37] transition"><InstagramIcon className="w-6 h-6"/></a>
        </div>
        <p className="text-gray-600 text-xs uppercase tracking-widest">© {new Date().getFullYear()} Barbearia J. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}