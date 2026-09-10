import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectOverview from './components/ProjectOverview';
import RenderGallery from './components/RenderGallery';
import FloorPlanExplorer from './components/FloorPlanExplorer';
import AmenitiesGrid from './components/AmenitiesGrid';
import LocationSection from './components/LocationSection';
import EmiCalculator from './components/EmiCalculator';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import { Phone, Calendar } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState('Book VIP Site Visit');

  const handleOpenLeadModal = (intent = 'Book VIP Site Visit') => {
    setModalIntent(intent);
    setModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      {/* Header Bar */}
      <Header onOpenLeadModal={handleOpenLeadModal} />

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }} className="main-content">
        <HeroSection onOpenLeadModal={handleOpenLeadModal} />
        <ProjectOverview onOpenLeadModal={handleOpenLeadModal} />
        <RenderGallery />
        <FloorPlanExplorer onOpenLeadModal={handleOpenLeadModal} />
        <AmenitiesGrid onOpenLeadModal={handleOpenLeadModal} />
        <LocationSection onOpenLeadModal={handleOpenLeadModal} />
        <EmiCalculator onOpenLeadModal={handleOpenLeadModal} />
      </main>

      {/* Footer */}
      <Footer onOpenLeadModal={handleOpenLeadModal} />

      {/* Global Lead Capture Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIntent={modalIntent}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/918422861469?text=Hi,%20I%20am%20interested%20in%20Royale%20Galaxy%20Kalyan%20East.%20Please%20send%20brochure%20and%20pricing%20details."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ fill: 'currentColor', stroke: 'none' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 2a10 10 0 0 0-8.485 15.318L2 22l4.808-1.262A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.086-1.121l-.293-.174-2.857.75.763-2.787-.19-.302A8 8 0 1 1 12 20z"/>
        </svg>
        <span className="whatsapp-pulse" />
      </a>

      {/* Floating Sticky Action Bar for Quick Mobile Access */}
      <div
        className="mobile-sticky-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(7, 10, 16, 0.96)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-gold)',
          padding: '10px 14px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          boxShadow: '0 -8px 24px rgba(0,0,0,0.8)'
        }}
      >
        <a
          href="tel:+919152525268"
          className="btn-outline-gold"
          style={{ flex: 1, padding: '9px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
        >
          <Phone size={14} /> Call Sales
        </a>
        <button
          onClick={() => handleOpenLeadModal('Book Site Visit')}
          className="btn-gold"
          style={{ flex: 1, padding: '9px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
        >
          <Calendar size={14} /> Book Visit
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .main-content {
            padding-bottom: 60px !important;
          }
        }
        @media (min-width: 768px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
