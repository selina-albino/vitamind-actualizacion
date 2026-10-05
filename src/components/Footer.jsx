import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__grid">
        <div>
          <img src="/img/logo-vitamind.png" alt="Vitamind" width="160" height="56" className="footer__logo" />
          <p>Nutrición inteligente para una vida plena.</p>
        </div>

        <address className="footer__contacto">
          <h2 className="footer__titulo">Contacto</h2>
          <a href="mailto:vitamind.oficial@gmail.com">vitamind.oficial@gmail.com</a>
          <a href="tel:+59179417954">+591 79417954</a>
          <span>Avenida América entre Calle Pando 495</span>
        </address>

        <div>
          <h2 className="footer__titulo">Síguenos</h2>
          <ul className="footer__redes">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
          </ul>
        </div>
      </div>

      <p className="contenedor footer__legal">© 2026 Vitamind. Todos los derechos reservados.</p>
    </footer>
  )
}
