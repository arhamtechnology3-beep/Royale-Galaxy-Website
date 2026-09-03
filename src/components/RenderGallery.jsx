import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from 'lucide-react';

export default function RenderGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const renders = [
    {
      src: '/assets/3d-views/CAM-02 (ARIAL VIEW).jpg',
      title: 'Aerial View of Royale Galaxy',
      category: 'aerial',
      desc: 'Bird\'s eye perspective showcasing the majestic tower, terrace park, and lush surrounding skyline.'
    },
    {
      src: '/assets/3d-views/CAM-07 (TERRACE TOP VIEW).jpg',
      title: 'Terrace Top Sky View',
      category: 'terrace',
      desc: 'Top-down visualization of the exclusive rooftop sky park and gazebo lounging zones.'
    },
    {
      src: '/assets/3d-views/MAIN HEIGHT BACK VIEW CAM-05.jpg',
      title: 'Tower Elevation & Facade',
      category: 'aerial',
      desc: 'Refined architectural facade standing tall with modern urban glasswork and structured lighting.'
    },
    {
      src: '/assets/3d-views/CAM-08 (NIGHT VIEW).jpg',
      title: 'Illuminated Night Elevation',
      category: 'aerial',
      desc: 'Stunning nocturnal perspective highlighting the architectural facade, crown lighting, and ambient glow.'
    },
    {
      src: '/assets/3d-views/CAM-09 (GRAND ENTRANCE).jpg',
      title: 'Grand Entrance Arch & Facade',
      category: 'aerial',
      desc: 'Majestic entrance gate with ornate archway, security plaza, and luxury storefront elevation.'
    },
    {
      src: '/assets/3d-views/CAM-10 (DAY ELEVATION).jpg',
      title: 'Daylight Elevation & Boulevard',
      category: 'aerial',
      desc: 'Full front architectural elevation rendered in crisp daylight showcasing the residential floors and surrounding greenery.'
    },
    {
      src: '/assets/3d-views/Enterance Lobby.jpg',
      title: 'Double-Height Entrance Lobby',
      category: 'lobby',
      desc: 'Grand double-height arrival lobby adorned with marble finishes, luxury chandeliers, and visitor lounge.'
    },
    {
      src: '/assets/3d-views/GYM-01.jpg',
      title: 'High-Tech Gymnasium',
      category: 'amenities',
      desc: 'State-of-the-art fitness center with premium cardio, strength training, and workout stations.'
    },
    {
      src: '/assets/3d-views/INDOOR GAME CAM -01.jpg',
      title: 'Indoor Gaming Arena',
      category: 'amenities',
      desc: 'Vibrant indoor gaming lounge designed for fun, recreation, and family entertainment.'
    },
    {
      src: '/assets/3d-views/INDOOR GAME CAM -02.jpg',
      title: 'Recreation Lounge Angle 2',
      category: 'amenities',
      desc: 'Spacious recreation zone designed for family bonding and active leisure time.'
    },
    {
      src: '/assets/3d-views/LIBRARY AND WORKSTATION ROOM CAM-02.jpg',
      title: 'Library & Co-Working Space',
      category: 'amenities',
      desc: 'Peaceful workstation and reading library for remote professionals and students.'
    },
    {
      src: '/assets/3d-views/MULTIPURPOSE HALL CAM -03.jpg',
      title: 'Grand Multipurpose Hall',
      category: 'amenities',
      desc: 'An elegant air-conditioned banquet hall for community celebrations and social events.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-01.jpg',
      title: 'Rooftop Sky Terrace Promenade',
      category: 'terrace',
      desc: 'Lush landscaped garden walkway with comfortable seating under the open sky.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-02.jpg',
      title: 'Sky Gazebo & Stargazing Deck',
      category: 'terrace',
      desc: 'Pergola gazebo seating zone designed for evening relaxation and celestial viewing.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-03.jpg',
      title: 'Rooftop Meditation & Yoga Deck',
      category: 'terrace',
      desc: 'Peaceful rooftop space designed for yoga, meditation, and moments of mindful relaxation.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-04.jpg',
      title: 'Sky Children\'s Play Area',
      category: 'terrace',
      desc: 'Safe, rubberized play park with modern play equipment on the terrace floor.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-05.jpg',
      title: 'Rooftop Open Air Fitness Zone',
      category: 'terrace',
      desc: 'Calisthenics and outdoor exercise station amidst natural high-altitude cross ventilation.'
    },
    {
      src: '/assets/3d-views/TERRECE GARDEN CAM-06.jpg',
      title: 'Sky Lounge & Acupressure Walk',
      category: 'terrace',
      desc: 'Therapeutic pebble walkway with comfortable seating spaces for relaxation and rejuvenation.'
    }
  ];

  const filteredRenders = activeCategory === 'all'
    ? renders
    : renders.filter(r => r.category === activeCategory);

  const openLightbox = (index) => {
    const item = filteredRenders[index];
    const originalIndex = renders.findIndex(r => r.src === item.src);
    setSelectedImageIndex(originalIndex);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % renders.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + renders.length) % renders.length);
    }
  };

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> 3D Architectural Visuals
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)',
              color: '#FFF',
              marginBottom: '14px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            Immerse In The <span className="text-gold" style={{ display: 'inline-block' }}>Royale Aesthetic</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Explore high-resolution 3D renders capturing our arrival lobby, sky terrace garden, indoor sports arena, and architectural elevation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="horizontal-scroll-track" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '32px', width: '100%' }}>
          {[
            { id: 'all', label: `All Renders (${renders.length})` },
            { id: 'aerial', label: 'Aerial & Facade' },
            { id: 'lobby', label: 'Grand Lobby' },
            { id: 'terrace', label: 'Rooftop Sky Park' },
            { id: 'amenities', label: 'Clubhouse & Fitness' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                border: activeCategory === tab.id ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeCategory === tab.id ? 'var(--gold-gradient)' : 'rgba(14, 20, 34, 0.7)',
                color: activeCategory === tab.id ? '#070A10' : 'var(--text-secondary)',
                fontWeight: activeCategory === tab.id ? '700' : '500',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontSize: '0.82rem',
                textAlign: 'center'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Render Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredRenders.map((render, idx) => (
            <div
              key={idx}
              className="glass-card hover-card-lift hover-img-card"
              onClick={() => openLightbox(idx)}
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="img-zoom-wrapper" style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
                <img
                  src={render.src}
                  alt={render.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 10, 16, 0.9) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px'
                  }}
                >
                  <div
                    className="icon-glow-target"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#070A10',
                      marginLeft: 'auto'
                    }}
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <h3 className="font-serif title-glow-target" style={{ color: '#FFF', fontSize: '1.05rem', marginBottom: '4px' }}>
                  {render.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  {render.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(4, 6, 10, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <X size={20} />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: '12px',
              background: 'rgba(212, 175, 55, 0.3)',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-light)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'rgba(212, 175, 55, 0.3)',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-light)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Image Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '1000px',
              width: '95vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={renders[selectedImageIndex].src}
              alt={renders[selectedImageIndex].title}
              style={{
                maxWidth: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)'
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <h3 className="font-display text-gold" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                {renders[selectedImageIndex].title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '500px' }}>
                {renders[selectedImageIndex].desc}
              </p>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
                Image {selectedImageIndex + 1} of {renders.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
