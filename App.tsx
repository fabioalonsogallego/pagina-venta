
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  ChevronDown, 
  ShoppingBag, 
  Star, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  UtensilsCrossed, 
  Camera 
} from 'lucide-react';

// --- Types ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

// --- Helper for Meta Pixel Tracking ---
const trackCheckout = () => {
  if (typeof (window as any).fbq !== 'undefined') {
    (window as any).fbq('track', 'InitiateCheckout');
  }
};

// --- Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  href?: string;
  pulse?: boolean;
}> = ({ children, className = '', onClick, href, pulse }) => {
  const baseClasses = `px-10 py-5 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${pulse ? 'animate-pulse' : ''}`;
  
  const handleClick = (e: React.MouseEvent) => {
    trackCheckout();
    if (onClick) onClick();
  };

  if (href) {
    return (
      <a href={href} onClick={handleClick} className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`py-24 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 59, seconds: 59 });
  
  // Image States
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1535141192574-5d4897c825a0?q=80&w=1920&auto=format&fit=crop");
  const [anxietyImage, setAnxietyImage] = useState<string>("https://images.unsplash.com/photo-1543158266-0066955047b1?q=80&w=600&auto=format&fit=crop");
  const [fruitImage, setFruitImage] = useState<string>("https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=600&auto=format&fit=crop");

  // Input Refs
  const heroInputRef = useRef<HTMLInputElement>(null);
  const anxietyInputRef = useRef<HTMLInputElement>(null);
  const fruitInputRef = useRef<HTMLInputElement>(null);

  // Urgency Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setter(imageUrl);
    }
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sofía Martínez",
      role: "Madrid, España",
      content: "Siempre pensé que comer saludable era aburrido. Estas tortas no solo son ricas, ¡son mejores que las tradicionales! Mi favorita es la de chocolate y avellanas.",
      rating: 5
    },
    {
      id: 2,
      name: "Lucas Berger",
      role: "Berlín, Alemania",
      content: "Como deportista, cuido mucho mi alimentación pero amo el dulce. Este e-book cambió mis meriendas. Digestión perfecta y energía al 100%.",
      rating: 5
    },
    {
      id: 3,
      name: "Elodie Dubois",
      role: "París, Francia",
      content: "¡Increíble! Los ingredientes son fáciles de conseguir y las recetas muy claras. Mis hijos ni se dieron cuenta que no tienen azúcar.",
      rating: 5
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "¿Necesito experiencia en cocina?",
      answer: "Para nada. El recetario está diseñado con pasos claros y sencillos para que cualquier persona, sin importar su nivel, logre resultados profesionales desde la primera vez."
    },
    {
      question: "¿Son ingredientes fáciles de conseguir?",
      answer: "Sí, todos los ingredientes se encuentran fácilmente en cualquier supermercado local en España, Francia o Alemania. Priorizamos lo natural y accesible."
    },
    {
      question: "¿Cómo recibo el e-book?",
      answer: "El acceso es inmediato. Una vez realizado el pago, recibirás un correo electrónico de Hotmart con el enlace de descarga para disfrutarlo en tu móvil, tablet o PC."
    },
    {
      question: "¿Es apto para diabéticos?",
      answer: "¡Sí! Al ser recetas 100% sin azúcar refinada y con índices glucémicos controlados, es una excelente opción. Siempre recomendamos consultar con tu médico de confianza."
    },
    {
      question: "¿Funciona si quiero comer saludable sin dejar los postres?",
      answer: "¡Definitivamente! Ese es nuestro objetivo principal: que disfrutes de la dulzura de la vida sin comprometer tus objetivos de bienestar y salud."
    }
  ];

  const mainCheckout = "https://pay.hotmart.com/S103613397R";
  const anxietyCheckout = "https://pay.hotmart.com/M103614818T";
  const fruitCheckout = "https://pay.hotmart.com/H103615003J";

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      {/* Top Banner - Urgency */}
      <div className="bg-black text-white py-2 px-4 text-center text-sm font-bold sticky top-0 z-50 shadow-md">
        ¡OFERTA RELÁMPAGO! 60% DE DESCUENTO FINALIZA EN: 
        <span className="ml-2 font-mono bg-white/10 px-2 py-0.5 rounded">
          {timeLeft.hours.toString().padStart(2, '0')}:
          {timeLeft.minutes.toString().padStart(2, '0')}:
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Torta saludable" 
            className="w-full h-full object-cover brightness-[0.85] scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#FDFBF7]/40"></div>
        </div>

        <div className="absolute top-12 right-8 z-20">
          <input 
            type="file" 
            ref={heroInputRef} 
            onChange={(e) => handleImageUpload(e, setHeroImage)} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={() => heroInputRef.current?.click()}
            className="flex items-center gap-2 bg-black/80 backdrop-blur-xl hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-black tracking-tighter uppercase transition-all shadow-xl border border-white/20"
          >
            <Camera size={14} /> Cambiar portada
          </button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="mb-8 inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg animate-bounce">
            <Sparkles size={14} /> Calidad Premium
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 text-black leading-[0.9] font-black tracking-tighter drop-shadow-sm">
            <span className="block opacity-100">Recetario de</span>
            <span className="italic block">30 Tortas</span>
            <span className="relative inline-block mt-4 text-4xl md:text-6xl lg:text-7xl">
              <span className="relative z-10 px-4 py-1">Saludables</span>
              <span className="absolute inset-x-0 bottom-2 h-4 bg-white/60 -z-10 rotate-1"></span>
            </span>
          </h1>

          <p className="text-xl md:text-3xl mb-12 text-black max-w-3xl mx-auto leading-tight font-bold">
            El secreto para disfrutar de postres irresistibles <br className="hidden md:block"/>
            <span className="border-b-4 border-black pb-1">Sin Gluten y Sin Azúcar</span> <br className="hidden md:block"/>
            sin sacrificar el placer del sabor real.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Button 
              href={mainCheckout}
              className="bg-black text-white hover:bg-zinc-800 text-xl md:text-2xl w-full md:w-auto shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-8 px-16"
              pulse
            >
              ¡QUIERO COMER DULCE SIN CULPA!
            </Button>
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-zinc-200">
              <p className="text-sm font-black text-black uppercase tracking-widest">
                Precio Especial Hoy: <span className="line-through text-zinc-400 mr-2">$25 USD</span> 
                <span className="text-3xl ml-1">$10 USD</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#2D2926]">¿Por qué elegir nuestro Recetario?</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Heart className="text-black" size={32} />, 
              title: "Placer Sin Culpa", 
              desc: "Disfruta de tus postres favoritos sabiendo que estás nutriendo tu cuerpo, no dañándolo." 
            },
            { 
              icon: <ShieldCheck className="text-black" size={32} />, 
              title: "100% Saludable", 
              desc: "Todas las recetas son libres de gluten y azúcar refinada, ideales para celíacos y diabéticos." 
            },
            { 
              icon: <Sparkles className="text-black" size={32} />, 
              title: "Digestión Ligera", 
              desc: "Olvídate de la pesadez. Nuestros ingredientes naturales promueven un bienestar intestinal real." 
            },
            { 
              icon: <UtensilsCrossed className="text-black" size={32} />, 
              title: "Recetas Probadas", 
              desc: "30 recetas exclusivas que garantizan sabor, textura y humedad en cada bocado." 
            },
            { 
              icon: <Clock className="text-black" size={32} />, 
              title: "Fáciles y Rápidas", 
              desc: "No necesitas ser un experto. Instrucciones paso a paso para resultados deliciosos en minutos." 
            },
            { 
              icon: <ShoppingBag className="text-black" size={32} />, 
              title: "Acceso Inmediato", 
              desc: "Descarga tu e-book al instante y comienza a hornear hoy mismo desde cualquier dispositivo." 
            }
          ].map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 hover:shadow-2xl transition-all duration-500 bg-[#FDFBF7] hover:-translate-y-2">
              <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl mb-3 font-bold text-black">{benefit.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product Mockup Section */}
      <Section className="bg-[#F5EFE6]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-all"></div>
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop" 
              alt="Ebook Mockup" 
              className="relative rounded-2xl shadow-2xl w-full transform -rotate-2 hover:rotate-0 transition-all duration-700"
            />
            <div className="absolute -bottom-6 -right-6 bg-black text-white px-8 py-6 rounded-3xl shadow-2xl text-center transform rotate-6 border border-zinc-800">
              <span className="block text-xs uppercase font-black tracking-widest opacity-70">Calidad</span>
              <span className="block text-2xl font-black">PREMIUM</span>
              <div className="flex justify-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="white" className="text-white" />)}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl text-black leading-[1.1] font-black tracking-tight">
              Más que un libro, es tu nueva <span className="italic">Libertad Dulce</span>.
            </h2>
            <p className="text-xl text-zinc-700 leading-relaxed">
              Hemos seleccionado las 30 mejores recetas de tortas que han enamorado paladares en toda Europa. 
              Sin procesos complicados, solo ingredientes reales para resultados extraordinarios.
            </p>
            <ul className="grid grid-cols-1 gap-4">
              {[
                "30 Recetas detalladas paso a paso",
                "Lista de sustitutos saludables",
                "Tips de horneado para principiantes",
                "Fotografías HD que te inspirarán",
                "Formato digital PDF universal"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-black font-bold">
                  <div className="bg-black p-1 rounded-full">
                    <CheckCircle className="text-white" size={18} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              href={mainCheckout}
              className="bg-zinc-800 text-white hover:bg-black w-full md:w-auto shadow-xl"
            >
              Comprar Ahora por $10 USD
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4 text-black font-black">Lo que dicen nuestras alumnas</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#FDFBF7] p-10 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="black" className="text-black" />
                ))}
              </div>
              <p className="text-lg italic text-zinc-700 mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-black">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-black">{t.name}</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing / CTA Section */}
      <Section className="bg-black text-white text-center py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl mb-8 font-black tracking-tighter">Tu transformación <br/> comienza hoy</h2>
          <p className="text-xl md:text-2xl mb-12 text-zinc-400 font-medium">
            Únete a las miles de personas que ya disfrutan del dulce sin poner en riesgo su salud.
          </p>
          
          <div className="bg-white text-black p-12 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden mb-12 transform hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 bg-black text-white px-10 py-3 transform translate-x-12 translate-y-6 rotate-45 text-sm font-black tracking-widest uppercase shadow-lg">
              Oferta Hoy
            </div>
            <p className="text-xs uppercase tracking-[0.3em] font-black text-zinc-400 mb-4">Acceso Inmediato & Permanente</p>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">Recetario 30 Tortas Saludables</h3>
            <div className="flex items-center justify-center gap-6 mb-10">
              <span className="text-3xl text-zinc-300 line-through font-bold">$25.00</span>
              <div className="flex flex-col items-start leading-none">
                <span className="text-8xl font-black text-black tracking-tighter">$10</span>
                <span className="text-xl font-black uppercase tracking-widest opacity-40">USD</span>
              </div>
            </div>
            <Button 
              href={mainCheckout}
              className="bg-black text-white hover:bg-zinc-800 w-full text-2xl py-10 shadow-2xl"
            >
              ¡SÍ, QUIERO MI COPIA AHORA!
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-zinc-400">
              <span className="flex items-center gap-2"><ShieldCheck size={20} className="text-black" /> PAGO 100% SEGURO</span>
              <span className="flex items-center gap-2"><Clock size={20} className="text-black" /> ACCESO DE POR VIDA</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Cross-Selling Section */}
      <Section className="bg-[#FDFBF7]">
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white px-6 py-3 rounded-full font-black text-xs mb-6 uppercase tracking-widest">
            💎 Completa tu pedido y ahorra más
          </div>
          <h2 className="text-4xl md:text-5xl text-black mb-4 font-black tracking-tight">Potencia tus resultados</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Por la compra de tu recetario hoy, llévate estos complementos exclusivos con 50% de DESCUENTO adicional.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Complementary 1: Anxiety */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 flex flex-col justify-between hover:shadow-2xl transition-all relative">
            <div>
              <div className="h-64 rounded-3xl bg-zinc-100 mb-8 overflow-hidden group relative">
                <img src={anxietyImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Ansiedad Azúcar" />
                <div className="absolute top-4 right-4 z-20">
                  <input 
                    type="file" 
                    ref={anxietyInputRef} 
                    onChange={(e) => handleImageUpload(e, setAnxietyImage)} 
                    className="hidden" 
                    accept="image/*"
                  />
                  <button 
                    onClick={() => anxietyInputRef.current?.click()}
                    className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-black transition-all shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-3xl mb-4 text-black font-black leading-tight tracking-tight">Método Invisible: Ansiedad por el Azúcar</h3>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed font-medium">Aprende técnicas mentales y nutricionales para dejar de depender del dulce refinado para siempre.</p>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-8">
              <div>
                <span className="text-zinc-400 line-through block text-sm font-bold">$10.00</span>
                <span className="text-3xl font-black text-black">$5.00 USD</span>
              </div>
              <Button href={anxietyCheckout} className="bg-zinc-100 text-black hover:bg-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest font-black">
                Añadir ahora
              </Button>
            </div>
          </div>

          {/* Complementary 2: Fruit */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 flex flex-col justify-between hover:shadow-2xl transition-all relative">
            <div>
              <div className="h-64 rounded-3xl bg-zinc-100 mb-8 overflow-hidden group relative">
                <img src={fruitImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fruta Consciente" />
                <div className="absolute top-4 right-4 z-20">
                  <input 
                    type="file" 
                    ref={fruitInputRef} 
                    onChange={(e) => handleImageUpload(e, setFruitImage)} 
                    className="hidden" 
                    accept="image/*"
                  />
                  <button 
                    onClick={() => fruitInputRef.current?.click()}
                    className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-black transition-all shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-3xl mb-4 text-black font-black leading-tight tracking-tight">Ritual Diario: Fruta Consciente</h3>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed font-medium">Aprende a consumir la fruta de forma inteligente para maximizar beneficios sin picos de insulina.</p>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-8">
              <div>
                <span className="text-zinc-400 line-through block text-sm font-bold">$10.00</span>
                <span className="text-3xl font-black text-black">$5.00 USD</span>
              </div>
              <Button href={fruitCheckout} className="bg-zinc-100 text-black hover:bg-black hover:text-white px-8 py-4 text-sm uppercase tracking-widest font-black">
                Añadir ahora
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-black mb-4 font-black">Preguntas Frecuentes</h2>
            <p className="text-xl text-zinc-600">Resolvemos tus dudas para que compres con total confianza.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 border-zinc-100 rounded-3xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <span className="font-black text-xl text-black tracking-tight">{faq.question}</span>
                  <div className={`p-2 rounded-full bg-zinc-100 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-zinc-500" />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="p-8 pt-0 text-lg text-zinc-600 bg-[#FDFBF7] animate-fadeIn leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-[#F5EFE6] text-center py-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black p-4 rounded-full inline-block mb-8 shadow-xl">
            <Heart className="text-white" size={48} />
          </div>
          <h2 className="text-5xl md:text-7xl text-black mb-10 font-black tracking-tighter leading-[0.9]">
            Mereces comer delicioso <br/>
            <span className="italic">todos los días</span>.
          </h2>
          <p className="text-2xl text-zinc-700 mb-12 font-medium max-w-2xl mx-auto">
            Únete a nuestra comunidad hoy y recibe tu recetario premium por solo <span className="font-black text-black">$10 USD</span>.
          </p>
          <Button 
            href={mainCheckout}
            className="bg-black text-white hover:bg-zinc-800 text-2xl py-10 px-20 inline-flex shadow-2xl"
          >
            SÍ, QUIERO EMPEZAR HOY <ArrowRight size={28} />
          </Button>
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={20} /> Garantía de satisfacción Hotmart
            </p>
            <div className="flex gap-4 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="Paypal" />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-100 text-center text-zinc-400 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-3xl font-black mb-8 text-black tracking-tighter">Recetario Premium</p>
          <div className="flex flex-wrap justify-center gap-10 mb-10 text-xs uppercase tracking-[0.3em] font-black">
            <a href="#" className="hover:text-black transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-black transition-colors">Privacidad</a>
            <a href="#" className="hover:text-black transition-colors">Contacto</a>
          </div>
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-[#FDFBF7] border border-zinc-100">
            <p className="text-[10px] leading-relaxed text-zinc-400 font-bold uppercase tracking-wider">
              Hotmart es el responsable de la venta y entrega del producto. Al comprarlo, recibirás acceso inmediato al contenido digital. Consulta siempre con un profesional de la salud antes de realizar cambios drásticos en tu dieta. 
              © 2024 Recetario Saludable - Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
