export const metadata = {
  title: "Nova — Elevate Your Web Experience",
  description: "Modern, accessible, and performance-first web design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Prefer user color scheme; themes defined via CSS variables */}
      <body className="u-flow">
        <a className="u-skip-link" href="#main">Skip to content</a>
        <header className="site-header" role="banner">
          <div className="site-header__inner">
            <a className="site-header__brand" href="#top" aria-label="Nova home">Nova</a>
            <nav className="site-header__nav" aria-label="Primary">
              <ul className="site-header__nav-list">
                <li><a className="site-header__nav-link" href="#features">Features</a></li>
                <li><a className="site-header__nav-link" href="#showcase">Showcase</a></li>
                <li><a className="site-header__nav-link" href="#pricing">Pricing</a></li>
                <li><a className="site-header__nav-link" href="#faq">FAQ</a></li>
              </ul>
            </nav>
            <a className="site-header__cta btn btn--primary" href="#cta">Get Started</a>
          </div>
        </header>
        <main id="main" className="site-main" role="main">
          {children}
        </main>
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__inner">
            <p className="site-footer__copy">© {new Date().getFullYear()} Nova. Built for speed and accessibility.</p>
            <nav className="site-footer__nav" aria-label="Footer">
              <ul className="site-footer__nav-list">
                <li><a className="site-footer__nav-link" href="#pricing">Pricing</a></li>
                <li><a className="site-footer__nav-link" href="#faq">Support</a></li>
                <li><a className="site-footer__nav-link" href="#top">Back to top</a></li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

import "../../styles/globals.css";