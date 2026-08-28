import React, { useState } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, FileText, Loader2, Mail } from 'lucide-react';

export default function LeadModal({ isOpen, onClose, initialIntent = 'Book Site Visit' }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [unitType, setUnitType] = useState('1 BHK');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || isSubmitting) return;

    let hasError = false;

    // Email validation
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setEmailError('Please enter a valid email address to receive confirmation.');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Strict Indian 10-digit mobile number validation
    const cleanDigits = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (hasError) return;

    setIsSubmitting(true);

    const formattedPhone = `+91 ${cleanDigits}`;
    const autoresponseMessage = `Dear ${fullName.trim()},\n\nThank you for expressing interest in Royale Galaxy Kalyan East!\n\nWe have successfully received your inquiry for: ${initialIntent} (${unitType}).\n\nOur official sales desk team will contact you shortly at ${formattedPhone} to provide complete details, unit floor plans, pricing sheets, and priority site visit arrangements.\n\nWarm regards,\nRoyale Galaxy Sales Team\nEmail: Royalegalaxysales@gmail.com\nWebsite: www.royalegroup.org`;

    const payload = {
      name: fullName.trim(),
      email: cleanEmail,
      phone: formattedPhone,
      configuration: unitType,
      intent: initialIntent,
      project: 'Royale Galaxy Kalyan East',
      submittedAt: new Date().toLocaleString(),
      _subject: `🚨 New Royale Galaxy Lead: ${fullName.trim()} (${formattedPhone})`,
      _replyto: cleanEmail,
      _autoresponse: autoresponseMessage,
      _template: 'table',
      _captcha: 'false'
    };

    // Store local backup lead record & mark content unlocked
    try {
      const existing = JSON.parse(localStorage.getItem('royale_galaxy_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('royale_galaxy_leads', JSON.stringify(existing));
      localStorage.setItem('royale_galaxy_unlocked', 'true');
      window.dispatchEvent(new Event('royale_unlocked'));
    } catch (err) {
      console.error('Local backup save error:', err);
    }

    // Send lead directly to Royalegalaxysales@gmail.com via FormSubmit (from submissions@formsubmit.co)
    try {
      await fetch('https://formsubmit.co/ajax/Royalegalaxysales@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Email lead delivery error:', error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleBrochureDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/docs/brochure.pdf';
    link.download = 'Royale_Galaxy_Official_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCertificateDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/docs/certificate.pdf';
    link.download = 'Royale_Galaxy_MahaRERA_Certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(4, 6, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px 20px',
          position: 'relative',
          background: 'rgba(14, 20, 34, 0.96)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <img
                src="/assets/royale-group-logo-light-cropped.png"
                alt="Royale Group Logo"
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
              />
              <div className="badge-gold">
                <ShieldCheck size={12} /> Official Inquiry
              </div>
            </div>
            <h3 className="font-display text-gold" style={{ fontSize: '1.4rem', marginBottom: '6px' }}>
              {initialIntent}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '20px' }}>
              Connect with our official sales lounge team for instant price sheets, floor plan PDFs, and priority site visit slots.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px', fontWeight: '600' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(7, 10, 16, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px', fontWeight: '600' }}>
                  Email Address (For Confirmation Mail) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onBlur={() => {
                    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                      setEmailError('Please enter a valid email address.');
                    } else {
                      setEmailError('');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(7, 10, 16, 0.8)',
                    border: emailError ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                {emailError && (
                  <div style={{ color: '#F87171', fontSize: '0.76rem', marginTop: '4px', fontWeight: '500' }}>
                    {emailError}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px', fontWeight: '600' }}>
                  Mobile Number (10-Digit Indian Mobile) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      color: 'var(--gold-light)',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      userSelect: 'none',
                      pointerEvents: 'none'
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      if (phoneError) setPhoneError('');
                    }}
                    onBlur={() => {
                      if (phone && !/^[6-9]\d{9}$/.test(phone)) {
                        setPhoneError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
                      } else {
                        setPhoneError('');
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 48px',
                      borderRadius: '8px',
                      background: 'rgba(7, 10, 16, 0.8)',
                      border: phoneError ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      letterSpacing: '1px',
                      outline: 'none'
                    }}
                  />
                </div>
                {phoneError && (
                  <div style={{ color: '#F87171', fontSize: '0.76rem', marginTop: '4px', fontWeight: '500' }}>
                    {phoneError}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px', fontWeight: '600' }}>
                  Configuration Interested
                </label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(7, 10, 16, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="1 BHK">1 BHK Balcony Flat</option>
                  <option value="2 BHK">2 BHK Master Suite Flat</option>
                  <option value="3 BHK">3 BHK Custom Combination Flat</option>
                  <option value="4 BHK">4 BHK Custom Luxury Suite</option>
                  <option value="Commercial Shop">Ground Floor Commercial Shop</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '6px', opacity: isSubmitting ? 0.75 : 1 }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting Lead...
                  </span>
                ) : (
                  'Submit & Request Callback'
                )}
              </button>
            </form>

            {/* Direct Instant PDF Download Links */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', gap: '10px' }}>
              <button
                onClick={handleBrochureDownload}
                className="btn-outline-gold"
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.75rem', justifyContent: 'center' }}
              >
                <Download size={12} /> Brochure PDF
              </button>
              <button
                onClick={handleCertificateDownload}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.75rem', justifyContent: 'center' }}
              >
                <FileText size={12} /> RERA Certificate
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={50} style={{ color: 'var(--gold-primary)', margin: '0 auto 12px' }} />
            <h3 className="font-display text-gold" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
              Inquiry Confirmed!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '14px' }}>
              Thank you, <strong>{fullName}</strong>. A confirmation email has been sent to <strong style={{ color: 'var(--gold-light)' }}>{email}</strong> from <strong>Royalegalaxysales@gmail.com</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '20px' }}>
              Our Royale Galaxy sales team will contact you at <strong>{phone}</strong> shortly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handleBrochureDownload} className="btn-gold" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>
                <Download size={16} /> Download Official Brochure PDF
              </button>
              <button onClick={onClose} className="btn-secondary" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

