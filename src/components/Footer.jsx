import React from 'react';
import { Phone, Mail, Globe, MapPin, ShieldCheck, Download, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenLeadModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#04060A', borderTop: '1px solid var(--border-gold)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <img
                src="/assets/royale-group-logo-light-cropped.png"
                alt="Royale Group Logo"
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
                }}
              />
              <div style={{ height: '30px', width: '1px', background: 'rgba(212, 175, 55, 0.4)' }} />
              <div className="font-display" style={{ fontSize: '1.25rem', color: 'var(--gold-light)', letterSpacing: '1px' }}>
                ROYALE GALAXY
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              A flagship luxury residential project by <strong>Royale Group</strong>. Over 20 years of building trust and shaping modern living spaces in Kalyan.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <div className="badge-gold">
                <ShieldCheck size={14} /> RERA: PR1330002502267
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="font-serif" style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Project Overview', href: '#overview' },
                { name: '3D Render Gallery', href: '#gallery' },
                { name: 'Floor Plans & Layouts', href: '#floorplans' },
                { name: 'Rooftop Sky Amenities', href: '#amenities' },
                { name: 'Location & Map', href: '#location' },
                { name: 'EMI Calculator', href: '#calculator' }
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="hover-slide-item"
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    display: 'inline-block',
                    padding: '2px 0'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--gold-light)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Official Contact Info */}
          <div>
            <h4 className="font-serif" style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px' }}>
              Sales Lounge & Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>Survey No. 36 Hissa 4 & S.No 45 H.No 9/3, Near Varsha Complex, Malang Road, Adivali Dhokali, Kalyan (E), Thane - 421306</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <a href="tel:+919152525268" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  +91 91 52 52 52 68
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>info@royalegroup.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>www.royalegroup.org</span>
              </div>
            </div>
          </div>

          {/* Brochure Download */}
          <div>
            <h4 className="font-serif" style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px' }}>
              Project Documentation
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Fill a quick inquiry form to unlock and download the official brochure PDF.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onOpenLeadModal('Download Brochure')}
                className="btn-outline-gold"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <Download size={14} /> Download E-Brochure PDF
              </button>
            </div>
          </div>
        </div>

        {/* MahaRERA Official Disclaimer */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '28px', color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '12px' }}>
            <strong>MahaRERA Registration No: PR1330002502267</strong> | Available at website: <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-light)' }}>https://maharera.maharashtra.gov.in/</a> under registered project name <strong>ROYALE GALAXY</strong> by promoter Prospire Realty Private Limited.
          </p>
          <p>
            <em>Disclaimer:</em> The information, plans, 3D visual renders, drawings, amenities, and specifications contained in this website are indicative of the kind of development proposed. Subject to approval of respective authorities, the developer reserves the right to alter layout plans or specifications without prior obligation.
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            marginTop: '28px',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div className="footer-copyright-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span>© {new Date().getFullYear()} Royale Group. All Rights Reserved.</span>
            <span className="footer-divider" style={{ opacity: 0.4 }}>|</span>
            <span>
              Design & Developed by{' '}
              <a
                href="https://arhamtechnology.com/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--gold-light)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--gold-light)')}
              >
                Arham Technology
              </a>
            </span>
          </div>
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-light)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
