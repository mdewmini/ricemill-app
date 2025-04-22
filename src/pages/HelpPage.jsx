import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaPhone, FaPlus, FaMinus, FaSyncAlt, FaSearch, FaBell } from 'react-icons/fa';
import '../styles/HelpPage.css';
import logo from '../assets/logo.png';

const HelpPage = () => {
  const navigate = useNavigate ();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    setSuccessMessage('Message sent successfully');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSync = () => {
    setSuccessMessage('Data synced successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const faqs = [
    {
      question: 'How does offline mode work?',
      answer:
        'Our offline mode allows you to continue working without an internet connection. All your changes will be synchronized automatically once you\'re back online.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'Our support team is available. You can reach us through email, phone.',
    },
    {
      question: 'How do I update my profile information?',
      answer:
        'Go to the Settings page, navigate to Profile Settings, update your details, and click "Save Changes".',
    },
    {
      question: 'What should I do if the app is running slow?',
      answer:
        'Try clearing your browser cache, ensure a stable internet connection, or contact support for further assistance.',
    },
  ];

  const tips = [
    {
      icon: <FaSyncAlt className="help-tip-icon" />,
      title: 'Sync Regularly',
      description: 'Click the "Synced" button to ensure your data is up to date.',
    },
    {
      icon: <FaSearch className="help-tip-icon" />,
      title: 'Use Search in User Management',
      description: 'Quickly find users by typing their name or email in the search bar.',
    },
    {
      icon: <FaBell className="help-tip-icon" />,
      title: 'Enable Notifications',
      description: 'Turn on email or SMS notifications to stay updated on important events.',
    },
  ];

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="help-page">
      <header className="help-header">
        <div className="help-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <div className="help-header-right">
          <button className="help-dashboard-btn" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
          <button className="help-synced-btn" onClick={handleSync}>
            <FaCheckCircle /> Synced
          </button>
        </div>
      </header>
      <div className="help-container">
        <nav className="help-sidebar">
          <button className="help-sidebar-btn help-sidebar-btn-active">
            Help Center
          </button>
        </nav>
        <main className="help-content">
          <section className="help-section">
            <h2>Help Center</h2>
            <p>Get assistance with your account and system features.</p>

            <div className="help-tips-card">
              <h3>Quick Tips</h3>
              <p>Useful tips to get the most out of the system.</p>
              <div className="help-tips">
                {tips.map((tip, index) => (
                  <div key={index} className="help-tip-item">
                    <div className="help-tip-header" onClick={() => toggleTip(index)}>
                      <div className="help-tip-info">
                        {tip.icon}
                        <h4>{tip.title}</h4>
                      </div>
                      {expandedTip === index ? <FaMinus /> : <FaPlus />}
                    </div>
                    {expandedTip === index && (
                      <p className="help-tip-description">{tip.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="help-faq-card">
              <h3>Frequently Asked Questions</h3>
              <p>Find answers to common questions.</p>
              <div className="help-faq">
                {faqs.map((faq, index) => (
                  <div key={index} className="help-faq-item">
                    <div className="help-faq-header" onClick={() => toggleFaq(index)}>
                      <h4>{faq.question}</h4>
                      {expandedFaq === index ? <FaMinus /> : <FaPlus />}
                    </div>
                    {expandedFaq === index && (
                      <p className="help-faq-answer">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="help-contact-card">
              <h3>Contact Support</h3>
              <p>Reach out to our support team for assistance.</p>
              <div className="help-contact">
                <div className="help-contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="help-form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="help-form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="help-form-group">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message"
                      />
                    </div>
                    <button type="submit" className="help-save-btn">
                      Send Message
                    </button>
                  </form>
                </div>
                <div className="help-contact-info">
                  <div className="help-contact-item">
                    <FaEnvelope className="help-contact-icon" />
                    <div>
                      <h4>Email</h4>
                      <p>info@ricemill.lk</p>
                    </div>
                  </div>
                  <div className="help-contact-item">
                    <FaPhone className="help-contact-icon" />
                    <div>
                      <h4>Phone</h4>
                      <p>+94 112 345 678</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {successMessage && (
        <div className="help-success-message">
          <FaCheckCircle /> {successMessage}
        </div>
      )}
    </div>
  );
};

export default HelpPage;