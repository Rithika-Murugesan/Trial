/* src/Components/Home.jsx*/
import React, { useEffect, useState } from "react";
import "../styles/BNPParibas.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

  const [activeModal, setActiveModal] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveModal(section);
  };

  const navigate = useNavigate();

const handleAuthClick = (type) => {
  if (type === "login") {
    navigate("/login");
  } else {
    navigate("/signup"); // if you add a SignUp page later
  }
};


  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCSS);

    // Load Bootstrap JS
    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js';
    document.head.appendChild(bootstrapJS);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      try {
        if (document.head.contains(bootstrapCSS)) document.head.removeChild(bootstrapCSS);
        if (document.head.contains(bootstrapJS)) document.head.removeChild(bootstrapJS);
      } catch (e) {
        console.log('Cleanup error:', e);
      }
    };
  }, []);

  const renderAboutModal = () => (
    <div className={`modal-overlay ${activeModal === 'about' ? 'active' : ''}`} onClick={closeModal}>
      <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        <div className="modal-hero">
          <div className="modal-hero-bg"></div>
          <div className="modal-hero-content">
            <h1 className="display-2 fw-bold text-white mb-3">About BNP Paribas</h1>
            <p className="lead text-white opacity-90">A Legacy of Banking Excellence Since 1848</p>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="about-section">
                <div className="section-icon">🏛️</div>
                <h3 className="fw-bold mb-3">Our Heritage</h3>
                <p className="text-muted mb-4">Founded in 1848 in Paris, BNP Paribas has grown from a French bank to become one of the world's leading financial institutions, serving over 30 million customers across 65 countries.</p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <h4 className="text-primary fw-bold">1848</h4>
                    <small>Founded</small>
                  </div>
                  <div className="stat-item">
                    <h4 className="text-primary fw-bold">€2.3T</h4>
                    <small>Assets</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-section">
                <div className="section-icon">🌍</div>
                <h3 className="fw-bold mb-3">Global Reach</h3>
                <p className="text-muted mb-4">With presence in 65 countries and nearly 190,000 employees, we combine global expertise with local knowledge to serve diverse markets and communities worldwide.</p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <h4 className="text-success fw-bold">65</h4>
                    <small>Countries</small>
                  </div>
                  <div className="stat-item">
                    <h4 className="text-success fw-bold">190K+</h4>
                    <small>Employees</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-section">
                <div className="section-icon">💡</div>
                <h3 className="fw-bold mb-3">Innovation</h3>
                <p className="text-muted mb-4">Leading the digital transformation of banking with AI-powered solutions, blockchain technology, and sustainable finance initiatives that shape the future of the industry.</p>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-section">
                <div className="section-icon">🎯</div>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="text-muted mb-4">To be the trusted partner for our clients' financial needs, driving positive change in society while maintaining the highest standards of integrity and excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactModal = () => (
    <div className={`modal-overlay ${activeModal === 'contact' ? 'active' : ''}`} onClick={closeModal}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        <div className="modal-hero">
          <div className="modal-hero-bg contact-bg"></div>
          <div className="modal-hero-content">
            <h1 className="display-2 fw-bold text-white mb-3">Get In Touch</h1>
            <p className="lead text-white opacity-90">Connect with our banking experts worldwide</p>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h5 className="fw-bold mb-3">Global Headquarters</h5>
                <p className="text-muted mb-3">16 Boulevard des Italiens<br />75009 Paris, France</p>
                <button className="btn btn-outline-primary rounded-pill">Get Directions</button>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h5 className="fw-bold mb-3">24/7 Support</h5>
                <p className="text-muted mb-3">International: +33 1 40 14 45 46<br />Available Worldwide</p>
                <button className="btn btn-outline-primary rounded-pill">Call Now</button>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h5 className="fw-bold mb-3">Email Support</h5>
                <p className="text-muted mb-3">General Inquiries<br />contact@bnpparibas.com</p>
                <button className="btn btn-outline-primary rounded-pill">Send Email</button>
              </div>
            </div>
          </div>
          
          <div className="quick-contact-form">
            <h4 className="fw-bold mb-4 text-center">Quick Contact Form</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="col-md-6">
                <input type="email" className="form-control" placeholder="Email Address" />
              </div>
              <div className="col-12">
                <select className="form-select">
                  <option>Select Service</option>
                  <option>Personal Banking</option>
                  <option>Corporate Banking</option>
                  <option>Investment Services</option>
                  <option>Digital Banking</option>
                </select>
              </div>
              <div className="col-12">
                <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-primary btn-lg rounded-pill px-5">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavbar = () => (
    <nav className={`navbar navbar-expand-md navbar-dark fixed-top navbar-bnp ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://logos-world.net/wp-content/uploads/2021/02/BNP-Paribas-Logo.png" alt="BNP Paribas" height="40" className="me-2" />
          BNP Paribas
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link nav-link-hover" href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                <span className="nav-icon">ℹ️</span> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-hover" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                <span className="nav-icon">📞</span> Contact
              </a>
            </li>
          </ul>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light rounded-pill px-4 btn-hover" onClick={() => handleAuthClick('login')}>Login</button>
            <button className="btn btn-light text-dark rounded-pill px-4 fw-semibold btn-hover" onClick={() => handleAuthClick('signup')}>Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <main>
      {renderNavbar()}
      
      {/* Hero Carousel */}
      <div id="myCarousel" className="carousel slide hero-carousel mb-0" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Banking Excellence" className="carousel-image" />
            <div className="carousel-overlay"></div>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1 className="display-3 fw-bold mb-4 animate-slide-up">Banking Excellence <br /><span className="text-warning">Redefined</span></h1>
                <p className="lead opacity-90 mb-4 animate-slide-up" style={{animationDelay: '0.2s'}}>Experience world-class banking solutions with BNP Paribas</p>
                <div className="d-flex gap-3 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <a className="btn-bnp" href="#services">Explore Services</a>
                  <a className="btn-outline-bnp" href="#contact">Contact Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Global Network" className="carousel-image" />
            <div className="carousel-overlay"></div>
            <div className="container">
              <div className="carousel-caption">
                <h1 className="display-3 fw-bold mb-4">Global Network <br /><span className="text-info">Local Expertise</span></h1>
                <p className="lead opacity-90 mb-4">65 countries, 190,000+ employees, 30M+ customers worldwide</p>
                <div className="row text-center mt-5">
                  <div className="col-md-4"><span className="stats-counter text-white">65</span><p className="text-white">Countries</p></div>
                  <div className="col-md-4"><span className="stats-counter text-white">190K+</span><p className="text-white">Employees</p></div>
                  <div className="col-md-4"><span className="stats-counter text-white">30M+</span><p className="text-white">Customers</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80" alt="Digital Innovation" className="carousel-image" />
            <div className="carousel-overlay"></div>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1 className="display-3 fw-bold mb-4">Digital <br /><span className="text-success">Innovation</span></h1>
                <p className="lead opacity-90 mb-4">Leading the future of banking with cutting-edge solutions</p>
                <a className="btn-bnp" href="#innovation">Discover Innovation</a>
              </div>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Marketing Section */}
      <div className="marketing-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-dark mb-3">Why Choose BNP Paribas</h2>
            <p className="lead text-muted">Trusted by millions worldwide</p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="feature-card text-center">
                <div className="feature-icon">🌍</div>
                <h3 className="fw-bold mb-3">Global Presence</h3>
                <p className="text-muted mb-4">International network spanning 65 countries with local expertise.</p>
                <a className="btn btn-outline-primary rounded-pill" href="#">Learn More →</a>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="feature-card text-center">
                <div className="feature-icon">💡</div>
                <h3 className="fw-bold mb-3">Digital Innovation</h3>
                <p className="text-muted mb-4">AI-powered solutions and seamless digital experiences.</p>
                <a className="btn btn-outline-primary rounded-pill" href="#">Explore Tech →</a>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="feature-card text-center">
                <div className="feature-icon">🛡️</div>
                <h3 className="fw-bold mb-3">Trusted Security</h3>
                <p className="text-muted mb-4">World-class security measures and regulatory compliance.</p>
                <a className="btn btn-outline-primary rounded-pill" href="#">Security Info →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featurettes */}
      <div className="featurette-section">
        <div className="container">
          <div className="row featurette align-items-center mb-5">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-bold mb-4">Customer Satisfaction <span className="text-primary">At Its Peak</span></h2>
              <p className="lead mb-4">94% customer satisfaction rate with exceptional service delivery.</p>
              <div className="row">
                <div className="col-6"><h3 className="text-primary fw-bold">94%</h3><p>Satisfaction</p></div>
                <div className="col-6"><h3 className="text-primary fw-bold">4.8★</h3><p>Rating</p></div>
              </div>
            </div>
            <div className="col-md-5">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="featurette-image img-fluid" alt="Happy Customers" />
            </div>
          </div>

          <div className="row featurette align-items-center mb-5">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-bold mb-4">Smart Investment <span className="text-success">Solutions</span></h2>
              <p className="lead mb-4">Comprehensive portfolio management and financial advisory services.</p>
              <div className="row">
                <div className="col-6"><h3 className="text-success fw-bold">€2.3T</h3><p>Assets Under Management</p></div>
                <div className="col-6"><h3 className="text-success fw-bold">12.5%</h3><p>Average Returns</p></div>
              </div>
            </div>
            <div className="col-md-5 order-md-1">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="featurette-image img-fluid" alt="Investment Growth" />
            </div>
          </div>

          <div className="row featurette mb-5">
            <div className="col-md-12 text-center mb-5">
              <h2 className="featurette-heading fw-bold mb-4">What Our Clients Say</h2>
              <p className="lead">Hear from satisfied customers</p>
            </div>
            
            <div className="row">
              <div className="col-md-4">
                <div className="testimonial-card">
                  <div className="star-rating">★★★★★</div>
                  <p className="mb-3">"Exceptional digital platform and outstanding support."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" className="rounded-circle me-3" width="50" height="50" alt="Client" />
                    <div><h6 className="mb-0">Michel Dubois</h6><small className="text-muted">Business Owner</small></div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="testimonial-card">
                  <div className="star-rating">★★★★★</div>
                  <p className="mb-3">"Investment advisory team helped achieve my financial goals."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b9f3?w=50&h=50&fit=crop&crop=face" className="rounded-circle me-3" width="50" height="50" alt="Client" />
                    <div><h6 className="mb-0">Sophie Laurent</h6><small className="text-muted">Tech Executive</small></div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="testimonial-card">
                  <div className="star-rating">★★★★★</div>
                  <p className="mb-3">"Seamless international transfers and excellent mobile app."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" className="rounded-circle me-3" width="50" height="50" alt="Client" />
                    <div><h6 className="mb-0">Jean-Pierre Martin</h6><small className="text-muted">International Trader</small></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5>BNP Paribas</h5>
              <p className="text-muted">Leading the future of banking with innovation, trust, and excellence.</p>
            </div>
            <div className="col-md-4 text-end">
              <a href="#myCarousel" className="btn btn-outline-light rounded-pill">Back to Top ↑</a>
            </div>
          </div>
        </div>
      </footer>
    
      {/* Modals */}
      {renderAboutModal()}
      {renderContactModal()}
    </main>

    
  );
}

export default Home;