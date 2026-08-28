import React, { useState } from 'react';
import { Sun, Dumbbell, Moon, Users, BookOpen, Smile, Sparkles, Trophy, HeartPulse } from 'lucide-react';

export default function AmenitiesGrid({ onOpenLeadModal }) {
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const amenities = [
    {
      id: 'gazebo',
      icon: <Moon size={22} />,
      title: 'Gazebo & Star Gazing Zone',
      category: 'Rooftop Sky Park',
      image: '/assets/3d-views/TERRECE GARDEN CAM-02.jpg',
      desc: 'Unwind under an open starlit sky in private gazebo pavilions designed for serene evening conversations.'
    },
    {
      id: 'yoga',
      icon: <Sun size={22} />,
      title: 'Rooftop Meditation & Yoga Deck',
      category: 'Rooftop Sky Park',
      image: '/assets/3d-views/TERRECE GARDEN CAM-03.jpg',
      desc: 'Peaceful rooftop space designed for yoga, meditation, and moments of mindful relaxation.'
    },
    {
      id: 'open-gym',
      icon: <HeartPulse size={22} />,
      title: 'Open Air Sky Fitness',
      category: 'Rooftop Sky Park',
      image: '/assets/3d-views/TERRECE GARDEN CAM-05.jpg',
      desc: 'Outdoor calisthenics workout equipment with uninterrupted cross-ventilation and elevated city views.'
    },
    {
      id: 'play-area',
      icon: <Smile size={22} />,
      title: 'Children\'s Play Zone',
      category: 'Rooftop Sky Park',
      image: '/assets/3d-views/TERRECE GARDEN CAM-04.jpg',
      desc: 'Safe, rubberized play park featuring modern slides, swings, and climbing frames for kids.'
    },
    {
      id: 'acupressure',
      icon: <Sparkles size={22} />,
      title: 'Sky Lounge & Acupressure Walk',
      category: 'Rooftop Sky Park',
      image: '/assets/3d-views/TERRECE GARDEN CAM-06.jpg',
      desc: 'Therapeutic pebble walkway with comfortable seating spaces for relaxation and rejuvenation.'
    },
    {
      id: 'indoor-gym',
      icon: <Dumbbell size={22} />,
      title: 'High-Tech Indoor Gymnasium',
      category: 'Clubhouse Level',
      image: '/assets/3d-views/GYM-01.jpg',
      desc: 'Air-conditioned fitness center equipped with commercial treadmills, ellipticals, weights, and mirrors.'
    },
    {
      id: 'indoor-games',
      icon: <Trophy size={22} />,
      title: 'Indoor Gaming Arena',
      category: 'Clubhouse Level',
      image: '/assets/3d-views/INDOOR GAME CAM -01.jpg',
      desc: 'Vibrant indoor gaming lounge designed for fun, recreation, and family entertainment.'
    },
    {
      id: 'library',
      icon: <BookOpen size={22} />,
      title: 'Library & Workstation Room',
      category: 'Clubhouse Level',
      image: '/assets/3d-views/LIBRARY AND WORKSTATION ROOM CAM-02.jpg',
      desc: 'Quiet co-working desks, high-speed Wi-Fi, and reading nooks for remote workers and students.'
    },
    {
      id: 'hall',
      icon: <Users size={22} />,
      title: 'Grand Multipurpose Celebration Hall',
      category: 'Clubhouse Level',
      image: '/assets/3d-views/MULTIPURPOSE HALL CAM -03.jpg',
      desc: 'Spacious banquet hall designed for birthday parties, family gatherings, and community events.'
    }
  ];

  return (
    <section id="amenities" className="section-padding" style={{ background: 'var(--bg-darker)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> Rooftop & Lifestyle Amenities
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
            A Sanctuary Of <span className="text-gold" style={{ display: 'inline-block' }}>Leisure & Wellness</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Royale Galaxy elevates your daily routine with rooftop sky amenities and an air-conditioned indoor clubhouse. Designed to foster fitness, community, and peace of mind.
          </p>
        </div>

        {/* Grid of Amenities */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {amenities.map((item) => (
            <div
              key={item.id}
              className="glass-card shimmer-card hover-card-lift hover-img-card"
              onClick={() => setSelectedAmenity(item)}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="img-zoom-wrapper" style={{ position: 'relative', height: '180px', width: '100%' }}>
                <img
                  src={item.image}
                  alt={item.title}
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
                    top: '10px',
                    left: '10px',
                    background: 'rgba(7, 10, 16, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: 'var(--gold-light)'
                  }}
                >
                  {item.category}
                </div>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="icon-glow-target" style={{ color: 'var(--gold-primary)', flexShrink: 0, padding: '4px', borderRadius: '6px' }}>{item.icon}</div>
                  <h3 className="font-serif title-glow-target" style={{ fontSize: '1.05rem', color: '#FFF' }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action card */}
        <div
          className="glass-panel hover-card-lift shimmer-card"
          style={{
            marginTop: '48px',
            padding: '28px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <h3 className="font-display text-gold" style={{ fontSize: '1.4rem' }}>
            Experience The Rooftop Life In Person
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.88rem' }}>
            Book a complimentary site visit and walk through our model flat, lobby, and rooftop elevation experience.
          </p>
          <button
            onClick={() => onOpenLeadModal('Book Site Visit - Amenities')}
            className="btn-gold"
            style={{ padding: '11px 22px', fontSize: '0.88rem' }}
          >
            Schedule Experience Visit
          </button>
        </div>
      </div>
    </section>
  );
}
