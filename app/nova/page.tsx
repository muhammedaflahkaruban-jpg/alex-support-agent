import React from "react";
import "../../styles/home.css";

export default function Page() {
  return (
    <article id="top" className="page">
      {/* Hero with subtle animated background and prominent CTA */}
      <section className="hero" aria-label="Introduction">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__inner">
          <h1 className="hero__title">Design that scales with you</h1>
          <p className="hero__subtitle">
            Nova delivers fast, accessible interfaces with fluid layouts and impeccable typography.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#cta">Start free</a>
            <a className="btn btn--ghost" href="#features">Explore features</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section features" aria-label="Key features">
        <header className="section__header">
          <h2 className="section__title">Built for modern teams</h2>
          <p className="section__lead">Responsive by default. Accessible at every step.</p>
        </header>
        <div className="features__grid">
          <article className="feature-card u-inview">
            <h3 className="feature-card__title">Fluid layouts</h3>
            <p className="feature-card__text">Scale across devices with Grid, Flexbox, and fluid spacing.</p>
          </article>
          <article className="feature-card u-inview">
            <h3 className="feature-card__title">Accessible by design</h3>
            <p className="feature-card__text">WCAG-compliant contrast, clear focus, and keyboard-friendly paths.</p>
          </article>
          <article className="feature-card u-inview">
            <h3 className="feature-card__title">Performance-first</h3>
            <p className="feature-card__text">GPU-friendly animations and zero JavaScript overhead.</p>
          </article>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="section showcase" aria-label="Product showcase">
        <header className="section__header">
          <h2 className="section__title">Real results, real speed</h2>
          <p className="section__lead">Craft delightful experiences that load fast and feel effortless.</p>
        </header>
        <div className="showcase__grid">
          <figure className="showcase-card u-inview">
            {/* Use loading="lazy" decoding="async" on real images */}
            <img className="showcase-card__img" src="/images/dashboard.svg" alt="Nova dashboard overview" />
            <figcaption className="showcase-card__caption">Unified dashboard with adaptive panels</figcaption>
          </figure>
          <figure className="showcase-card u-inview">
            <img className="showcase-card__img" src="/images/analytics.svg" alt="Analytics panel with insights" />
            <figcaption className="showcase-card__caption">Analytics that stay readable on any screen</figcaption>
          </figure>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section pricing" aria-label="Pricing plans">
        <header className="section__header">
          <h2 className="section__title">Simple pricing</h2>
          <p className="section__lead">Transparent plans designed to grow with you.</p>
        </header>
        <div className="pricing__grid">
          <article className="price-card u-inview">
            <h3 className="price-card__tier">Starter</h3>
            <p className="price-card__price">$0</p>
            <p className="price-card__note">Ship a lightweight site today.</p>
            <a className="btn btn--secondary" href="#cta">Choose Starter</a>
          </article>
          <article className="price-card price-card--featured u-inview" aria-label="Most popular plan">
            <h3 className="price-card__tier">Pro</h3>
            <p className="price-card__price">$19</p>
            <p className="price-card__note">Scale features and support.</p>
            <a className="btn btn--primary" href="#cta">Choose Pro</a>
          </article>
          <article className="price-card u-inview">
            <h3 className="price-card__tier">Teams</h3>
            <p className="price-card__price">$49</p>
            <p className="price-card__note">Collaborate with confidence.</p>
            <a className="btn btn--secondary" href="#cta">Choose Teams</a>
          </article>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials" aria-label="Testimonials">
        <header className="section__header">
          <h2 className="section__title">What customers say</h2>
          <p className="section__lead">Reliable performance, elegant design.</p>
        </header>
        <div className="testimonials__list">
          <blockquote className="testimonial u-inview">
            <p className="testimonial__text">“Nova made our app feel instant and polished.”</p>
            <footer className="testimonial__author">Jordan, Product Lead</footer>
          </blockquote>
          <blockquote className="testimonial u-inview">
            <p className="testimonial__text">“Accessibility without compromise. Ship with confidence.”</p>
            <footer className="testimonial__author">Casey, Frontend Engineer</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq" aria-label="Frequently asked questions">
        <header className="section__header">
          <h2 className="section__title">Answers at a glance</h2>
          <p className="section__lead">Everything you need to know before you start.</p>
        </header>
        <div className="faq__list">
          <details className="faq-item u-inview">
            <summary className="faq-item__summary">Is Nova accessible?</summary>
            <p className="faq-item__content">Yes. We prioritize semantic HTML, keyboard support, and strong contrast.</p>
          </details>
          <details className="faq-item u-inview">
            <summary className="faq-item__summary">Do I need JavaScript?</summary>
            <p className="faq-item__content">No. Core interactions use CSS-only techniques for speed and reliability.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="section cta" aria-label="Call to action">
        <div className="cta__inner">
          <h2 className="cta__title">Ready to launch?</h2>
          <p className="cta__subtitle">Create a fast, accessible experience today.</p>
          <a className="btn btn--primary" href="#top">Get started free</a>
        </div>
      </section>
    </article>
  );
}