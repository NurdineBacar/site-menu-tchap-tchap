'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Check, Menu, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP =
  'https://wa.me/258845636664?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Menu%20Tchap-Tchap'
const EMAIL = 'mailto:nuridnebacar@gmail.com'
const LOGO =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu_tchap_tchap_logo_clean-2gkW7mEr7R4TMgvSYCeszr4SIMb547.png'

const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como', label: 'Como funciona' },
  { href: '#servico', label: 'O serviço' },
  { href: '#contacto', label: 'Contacto' },
]

const flow = [
  'A mesa pede mais cedo, sem ficar à espera da carta.',
  'A cozinha recebe o pedido certo, com menos idas e voltas.',
  'O menu no telemóvel tem a cara do vosso restaurante.',
  'A conta pede-se na hora e o fecho fica mais simples.',
]

const brands = ['A Mesa Verde', 'O Forno Velho', 'Cozinha de Autor', 'Bar do Porto', 'Terra & Mar', 'O Sítio']

const pillars = [
  {
    title: 'Quem recebe o cliente',
    text: 'Apresentação, upsell e acolhimento. O menu digital reforça a presença humana, não a substitui, e os tradicionalistas continuam a receber a carta em mãos.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Quem cozinha',
    text: 'Pedidos legíveis e organizados, na ordem em que chegam, vindos do QR ou da mão do garçom, tudo num único fluxo.',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Quem gere o restaurante',
    text: 'Identidade, menu e fluxo à vista, sem perder o controlo do serviço nem a alma do lugar.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80',
  },
]

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    alt: 'Prato gourmet em cerâmica, fotografia editorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    alt: 'Vinho servido à mesa, momento íntimo de restaurante',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
    alt: 'Sobremesa com frutos vermelhos',
  },
  {
    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
    alt: 'Chef a finalizar um prato na cozinha',
  },
]

export function TchapHome() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [hideSticky, setHideSticky] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [booting, setBooting] = useState(true)
  const [ready, setReady] = useState(false)

  const close = () => {
    setOpen(false)
    document.body.classList.remove('nav-open')
  }

  const toggle = () => {
    setOpen((value) => {
      document.body.classList.toggle('nav-open', !value)
      return !value
    })
  }

  useLayoutEffect(() => {
    if (!ready) {
      document.body.classList.add('is-loading')
      const show = window.setTimeout(() => setBooting(false), 2500)
      const unlock = window.setTimeout(() => {
        setReady(true)
        document.body.classList.remove('is-loading')
      }, 3000)
      return () => {
        window.clearTimeout(show)
        window.clearTimeout(unlock)
        document.body.classList.remove('is-loading')
      }
    }

    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const contact = document.getElementById('contacto')
    const io = new IntersectionObserver(
      ([entry]) => setHideSticky(entry.isIntersecting),
      { threshold: 0.25 },
    )
    if (contact) io.observe(contact)

    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el))
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible?.target.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => spy.observe(section))

    const mm = gsap.matchMedia()
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions?.reduce) return

        gsap.from('.nav', { y: -20, autoAlpha: 0, duration: 0.55, ease: 'power3.out' })
        gsap.from('.hero-copy > *', {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.12,
          ease: 'power3.out',
        })
        gsap.from('.hero-card', { y: 36, autoAlpha: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' })
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 84%' },
          })
        })
      },
      root,
    )

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
      spy.disconnect()
      mm.revert()
      document.body.classList.remove('nav-open')
    }
  }, [ready])

  return (
    <main ref={root} className="site">
      <div className={`loader${booting ? '' : ' is-done'}`} aria-busy={booting} aria-label="A carregar Menu Tchap-Tchap">
        <div className="loader-inner">
          <img src="/logo-tchap.png" alt="Menu Tchap-Tchap" />
          <span className="loader-track">
            <i className="loader-bar" />
          </span>
        </div>
      </div>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#topo" className="brand" aria-label="Menu Tchap-Tchap, início">
            <span className="brand-mark">
              <img src={LOGO} alt="" />
            </span>
            <span className="brand-name">Menu Tchap-Tchap</span>
          </a>
          <div className="nav-links">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link${active === item.href ? ' is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-end">
            <a className="btn btn-mint nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
              Falar no WhatsApp <ArrowUpRight size={15} />
            </a>
            <button
              className="menu-toggle"
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={toggle}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`drawer ${open ? 'is-open' : ''}`}>
        <div className="drawer-links">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href ? 'is-active' : ''}
              onClick={close}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="drawer-actions">
          <a className="btn btn-mint" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={close}>
            Falar no WhatsApp <ArrowUpRight size={16} />
          </a>
          <a className="btn btn-ghost" href={EMAIL} onClick={close}>
            Enviar email
          </a>
        </div>
      </div>

      <header id="topo" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">Portal do menu digital & pedidos por QR</p>
            <h1>O menu digital com a cara do seu restaurante.</h1>
            <p className="lede">
              Modernize o restaurante sem abolir a carta. Os clientes pedem no telemóvel ou o garçom
              regista o pedido. A sua identidade fica em cada mesa.
            </p>
            <div className="hero-actions">
              <a className="btn btn-mint" href="#contacto">
                Quero isto no meu restaurante
              </a>
              <a className="btn btn-ghost" href="#como">
                Ver como funciona
              </a>
            </div>
            <ul className="hero-points">
              <li>Digital na mesa</li>
              <li>Carta quando quiser</li>
              <li>Feito para o serviço real</li>
            </ul>
          </div>
          <aside className="hero-card">
            <p>
              Não é mais um ecrã genérico. É o vosso restaurante a falar a língua do cliente, com a
              vossa identidade, e o menu de papel continua no sítio dele.
            </p>
            <div className="duo">
              <div className="duo-item">
                <strong>Carta física</strong>
                <span>Quem prefere o papel, recebe a carta em mãos. Nada se perde.</span>
              </div>
              <div className="duo-item">
                <strong>Pedido por QR</strong>
                <span>Quem quer o telemóvel, pede. Tudo entra no mesmo fluxo.</span>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section id="sobre" className="section cream">
        <div className="wrap split reveal">
          <div className="split-copy">
            <p className="kicker dark">O restaurante de sempre</p>
            <h2>Esperar pelo menu ainda custa mesas e presença.</h2>
            <p>
              Há uma dança delicada entre quem serve e quem espera. Garçons que correm, mesas que
              demoram a pedir, contas que se arrastam. Tudo isso é serviço, mas não precisa de ser lento.
            </p>
            <p>
              Um menu digital não apaga o papel. Dá ao restaurante mais ritmo e deixa a equipa presente
              onde realmente conta: na mesa, na conversa, no detalhe.
            </p>
            <p className="quote">“Modernizar o serviço também é cuidar da imagem do sítio.”</p>
          </div>
          <div className="media">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80"
              alt="Clientes a jantar num restaurante, mesas ocupadas e serviço em movimento"
            />
          </div>
        </div>
      </section>

      <section id="como" className="section paper">
        <div className="wrap">
          <div className="how-top reveal">
            <div className="split-copy">
              <p className="kicker dark">A mudança</p>
              <h2>Um QR na mesa. A carta pode ficar.</h2>
              <p className="lede ink">
                O Menu Tchap-Tchap celebra a coexistência: o código QR convive com a carta impressa, e o
                pedido entra no mesmo fluxo, seja do telemóvel do cliente ou da mão do garçom.
              </p>
              <ul className="flow">
                {flow.map((item) => (
                  <li key={item}>
                    <Check size={18} strokeWidth={2.4} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="stage">
              <div className="devices">
                <article className="paper-menu" aria-hidden="true">
                  <small>Carta da casa</small>
                  <strong>Menu de hoje</strong>
                  <i />
                  <i />
                  <i />
                  <i style={{ width: '70%' }} />
                </article>
                <div className="phone">
                  <div className="phone-screen">
                    <span className="phone-kicker">Casa do Tchap</span>
                    <h3>Menu de hoje</h3>
                    <div className="dish">
                      <i style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=200&q=70)' }} />
                      <span>
                        Peixe do dia
                        <small>batata, ervas e limão</small>
                      </span>
                      <b>18€</b>
                    </div>
                    <div className="dish">
                      <i style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=70)' }} />
                      <span>
                        Arroz de forno
                        <small>tomate, alho e coentros</small>
                      </span>
                      <b>14€</b>
                    </div>
                    <div className="feature">
                      <small>Destaque</small>
                      <strong>Entrada da casa</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="brands">
            <p className="kicker dark">Eles já pedem com estilo</p>
            <div className="brand-track">
              {brands.concat(brands).map((brand, index) => (
                <span key={`${brand}-${index}`}>{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servico" className="section forest">
        <div className="wrap">
          <div className="section-intro reveal">
            <h2>Feito para quem vive o serviço.</h2>
            <p className="lede">
              Não é só um ecrã. É uma ferramenta que entende o ritmo do restaurante e adapta-se a ele.
            </p>
          </div>
          <div className="pillars">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="pillar reveal">
                <div className="pillar-image">
                  <img src={pillar.image} alt="" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="identity-head reveal">
            <div>
              <p className="kicker dark">Na mesa e além</p>
              <h2>Um restaurante que se sente atual e se reconhece.</h2>
              <p className="lede ink" style={{ marginTop: '1rem' }}>
                Cada template é um espelho da marca. Cores, tipografia e fotos que fazem o cliente sentir
                que está no vosso espaço, mesmo quando lê no telemóvel.
              </p>
            </div>
            <p className="identity-line">
              Não é mais um ecrã genérico. É o vosso restaurante a falar a língua do cliente, com a
              vossa identidade.
            </p>
          </div>
          <div className="gallery reveal">
            {gallery.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
          <div id="demo" className="demo reveal">
            <h3>Veja o Menu Tchap-Tchap em ação</h3>
            <p>Um exemplo de como o vosso restaurante pode aparecer no telemóvel dos clientes.</p>
            <a className="btn btn-mint" href="#contacto">
              Pedir demonstração
            </a>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap quotes">
          <article className="quote-block reveal">
            <p>“Os pedidos chegam mais limpos, e o restaurante respira.”</p>
            <div className="person">
              <img
                src="https://images.unsplash.com/photo-1522529592750-1ee5dad30e44?auto=format&fit=crop&w=400&q=80"
                alt="Paulo"
              />
              <div>
                <strong>Paulo</strong>
                <span>Dono de restaurante</span>
              </div>
            </div>
          </article>
          <article className="quote-block reveal">
            <p>“Quem quer a carta, tem. Quem quer o telemóvel, pede. Nós focamos em servir.”</p>
            <div className="person">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80"
                alt="Amina"
              />
              <div>
                <strong>Amina</strong>
                <span>Chefe de sala</span>
              </div>
            </div>
          </article>
          <p className="note">Pensado para o serviço real: turnos longos, mesas cheias.</p>
        </div>
      </section>

      <section id="contacto" className="section forest contact">
        <div className="wrap reveal">
          <h2>Pronto para modernizar o restaurante com a vossa identidade?</h2>
          <p className="lede">
            Fale connosco. Mostramos o Menu Tchap-Tchap no contexto do vosso restaurante, entre carta, QR
            e operação, sem lista de preços nesta página.
          </p>
          <div className="contact-actions">
            <a className="btn btn-mint" href={EMAIL}>
              Pedir conversa <ArrowUpRight size={18} />
            </a>
            <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <h3>Menu Tchap-Tchap</h3>
              <p style={{ marginTop: '0.8rem', maxWidth: '18rem' }}>
                Menu digital e pedidos por QR para restaurantes. O portal que moderniza o restaurante
                sem abandonar o menu físico.
              </p>
            </div>
            <div>
              <h4>Menu</h4>
              <ul>
                <li>
                  <a href="#sobre">Sobre</a>
                </li>
                <li>
                  <a href="#como">Como funciona</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={EMAIL}>Email</a>
                </li>
                <li>
                  <a href="#contacto">Demonstração</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Newsletter</h4>
              <form className="news" action={EMAIL} method="get">
                <input type="email" name="body" placeholder="O vosso email" required />
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
          <div className="legal">
            <p>© 2026 Menu Tchap-Tchap</p>
            <div className="legal-links">
              <a href={EMAIL}>Privacidade</a>
              <a href={EMAIL}>Termos</a>
            </div>
          </div>
        </div>
      </footer>

      <a
        className={`btn btn-mint sticky-cta ${hideSticky ? 'is-hidden' : ''}`}
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
      >
        Falar no WhatsApp <ArrowUpRight size={16} />
      </a>
    </main>
  )
}
