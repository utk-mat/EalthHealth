import React from 'react';
import HomeHero from '../components/layout/HomeHero';
import QuickAccessCards from '../components/layout/QuickAccessCards';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // Placeholder handlers for search and prescription upload
  const handleSearch = (query) => {
    // TODO: Implement search navigation or filtering
    console.log('Search:', query);
  };
  const handlePrescriptionUpload = (file) => {
    // TODO: Implement prescription upload logic
    alert('Prescription uploaded: ' + file.name);
  };
  const handleCardClick = (title) => {
    if (title === 'Medicine') {
      navigate('/medicines');
    } else {
      alert('Clicked: ' + title);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8faff 0%, #e3f0ff 100%)', // Soft, subtle gradient for the whole page
      }}
    >
      {/* Main Content - unified, no extra boxes */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px 0 16px' }}>
        <h1 style={{
          color: '#222',
          fontWeight: 800,
          fontSize: '2.3rem',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          What are you looking for?
        </h1>
        <div style={{ width: '100%', maxWidth: 540, margin: '0 auto 32px auto' }}>
          <HomeHero
            onSearch={handleSearch}
            onPrescriptionUpload={handlePrescriptionUpload}
          />
        </div>
        <div style={{ marginTop: 32 }}>
          <QuickAccessCards onCardClick={handleCardClick} />
        </div>
        {/* Feature Cards Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          margin: '48px auto 0 auto',
          maxWidth: 1200,
          flexWrap: 'wrap',
        }}>
          <div className="feature-card" style={{ background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.07)', padding: '40px 32px', flex: 1, minWidth: 300, maxWidth: 380, textAlign: 'center', margin: '12px 0', transition: 'box-shadow 0.3s, transform 0.3s' }}>
            <span className="feature-icon" style={{ display: 'inline-block', marginBottom: 18, transition: 'transform 0.3s' }}>
              <LocalShippingIcon style={{ fontSize: 56, color: '#2563eb' }} />
            </span>
            <h3 style={{ fontWeight: 700, fontSize: 26, marginBottom: 10 }}>Fast Delivery</h3>
            <p style={{ color: '#555', fontSize: 18 }}>Quick and reliable delivery to your location, every time.</p>
          </div>
          <div className="feature-card" style={{ background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.07)', padding: '40px 32px', flex: 1, minWidth: 300, maxWidth: 380, textAlign: 'center', margin: '12px 0', transition: 'box-shadow 0.3s, transform 0.3s' }}>
            <span className="feature-icon" style={{ display: 'inline-block', marginBottom: 18, transition: 'transform 0.3s' }}>
              <VerifiedUserIcon style={{ fontSize: 56, color: '#a78bfa' }} />
            </span>
            <h3 style={{ fontWeight: 700, fontSize: 26, marginBottom: 10 }}>Authentic Products</h3>
            <p style={{ color: '#555', fontSize: 18 }}>Guaranteed genuine medicines and high-quality healthcare products.</p>
          </div>
          <div className="feature-card" style={{ background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.07)', padding: '40px 32px', flex: 1, minWidth: 300, maxWidth: 380, textAlign: 'center', margin: '12px 0', transition: 'box-shadow 0.3s, transform 0.3s' }}>
            <span className="feature-icon" style={{ display: 'inline-block', marginBottom: 18, transition: 'transform 0.3s' }}>
              <HeadsetMicIcon style={{ fontSize: 56, color: '#ec4899' }} />
            </span>
            <h3 style={{ fontWeight: 700, fontSize: 26, marginBottom: 10 }}>24/7 Support</h3>
            <p style={{ color: '#555', fontSize: 18 }}>Our dedicated team is here to assist you round-the-clock.</p>
          </div>
        </div>
        <style>{`
          .feature-card:hover {
            box-shadow: 0 16px 48px 0 rgba(59,130,246,0.18);
            transform: translateY(-10px) scale(1.03);
          }
          .feature-card:hover .feature-icon {
            transform: scale(1.18) rotate(-6deg);
          }
        `}</style>
        {/* Personalized Advice Banner */}
        <div style={{
          margin: '56px auto 0 auto',
          maxWidth: 1200,
          borderRadius: 40,
          background: 'linear-gradient(90deg, #a18cd1 0%, #fa71cd 50%, #21d4fd 100%)',
          textAlign: 'center',
          padding: '56px 24px 48px 24px',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10)',
        }}>
          <h2 style={{ fontWeight: 800, fontSize: 38, marginBottom: 18 }}>Need Personalized Advice?</h2>
          <p style={{ fontSize: 22, marginBottom: 36 }}>Our experienced pharmacists are ready to assist you with your health needs.</p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '1.25rem',
              padding: '16px 40px',
              borderRadius: 40,
              boxShadow: '0 4px 24px 0 rgba(59,130,246,0.10)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Contact Our Pharmacists &nbsp; <span style={{fontSize: '1.3em', verticalAlign: 'middle'}}>&#8594;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
