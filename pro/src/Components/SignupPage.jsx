import React, { useState, useEffect } from 'react';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    mobileOtp: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: '',
    idProof: null,
    panCard: null,
    accountNumber: '',
    fingerprintCaptured: false
  });
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const sendMobileOtp = () => {
    setOtpTimer(120);
    alert('OTP sent to your mobile number');
  };

  const captureFingerprint = () => {
    setLoading(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, fingerprintCaptured: true }));
      setLoading(false);
      alert('Fingerprint captured successfully!');
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitForm = async () => {
  try {
    setLoading(true);

    // Create FormData object to handle files
    const data = new FormData();
    data.append('username', formData.fullName);
    data.append('email', formData.email);
    data.append('dob', formData.dateOfBirth);
    data.append('nationality', formData.nationality || 'IN');
    data.append('mobileNumber', formData.mobileNumber);
    data.append('address', formData.address);
    data.append('password', formData.password);
    data.append('account_no', formData.accountNumber || '');
    if (formData.idProof) data.append('idProof', formData.idProof);
    if (formData.panCard) data.append('panCard', formData.panCard);

    // Call backend API
    const response = await fetch('http://10.102.148.10:3000/api/register', {
      method: 'POST',
      body: data
    });

    const result = await response.json();

    if (result.success) {
      alert('Account created successfully! Welcome to BNP Paribas!');
      // Optionally reset form or redirect
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        mobileOtp: '',
        dateOfBirth: '',
        address: '',
        password: '',
        confirmPassword: '',
        idProof: null,
        panCard: null,
        accountNumber: '',
        fingerprintCaptured: false
      });
      setCurrentStep(1);
    } else {
      alert(result.message || 'Something went wrong');
    }
    
    setLoading(false);
  } catch (error) {
    console.error(error);
    alert('Server error! Please try again.');
    setLoading(false);
  }
};


  const progressWidth = ((currentStep - 1) / 4) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="text-center mb-5">
              <div className="mb-3">
                <i className="fas fa-user-circle text-primary" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="fw-bold mb-2">Personal Information</h2>
              <p className="text-muted">Let's start with your basic details</p>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-2"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <label htmlFor="fullName">
                    <i className="fas fa-user me-2"></i>Full Name *
                  </label>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control border-2"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                  <label htmlFor="email">
                    <i className="fas fa-envelope me-2"></i>Email Address *
                  </label>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control border-2"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="dateOfBirth">
                    <i className="fas fa-calendar me-2"></i>Date of Birth *
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select className="form-select border-2" id="nationality">
                    <option value="IN">🇮🇳 India</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="US">🇺🇸 United States</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    <option value="DE">🇩🇪 Germany</option>
                  </select>
                  <label htmlFor="nationality">
                    <i className="fas fa-globe me-2"></i>Nationality
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <div className="text-center mb-5">
              <div className="mb-3">
                <i className="fas fa-mobile-alt text-primary" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="fw-bold mb-2">Mobile Verification</h2>
              <p className="text-muted">Secure your account with OTP verification</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card border-0 shadow-sm p-4">
                  <div className="row g-3 mb-4">
                    <div className="col-4">
                      <div className="form-floating">
                        <select className="form-select border-2">
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+1">🇺🇸 +1</option>
                        </select>
                        <label>Country</label>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="input-group">
                        <div className="form-floating flex-grow-1">
                          <input
                            type="tel"
                            className="form-control border-2"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            required
                          />
                          <label htmlFor="mobileNumber">Mobile Number *</label>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-primary px-4"
                          onClick={sendMobileOtp}
                          disabled={!formData.mobileNumber || otpTimer > 0}
                        >
                          {otpTimer > 0 ? (
                            <><i className="fas fa-clock me-1"></i>{otpTimer}s</>
                          ) : (
                            <><i className="fas fa-paper-plane me-1"></i>Send OTP</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {otpTimer > 0 && (
                    <div className="otp-section">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-2 text-center fs-4"
                          id="mobileOtp"
                          name="mobileOtp"
                          value={formData.mobileOtp}
                          onChange={handleInputChange}
                          placeholder="000000"
                          maxLength="6"
                          required
                        />
                        <label htmlFor="mobileOtp">
                          <i className="fas fa-shield-alt me-2"></i>Enter 6-Digit OTP
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <div className="text-center mb-5">
              <div className="mb-3">
                <i className="fas fa-shield-alt text-primary" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="fw-bold mb-2">Security & Address</h2>
              <p className="text-muted">Protect your account with a strong password</p>
            </div>
            <div className="row g-4">
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control border-2"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    style={{height: '120px'}}
                    required
                  />
                  <label htmlFor="address">
                    <i className="fas fa-map-marker-alt me-2"></i>Complete Address *
                  </label>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control border-2"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create strong password"
                    required
                  />
                  <label htmlFor="password">
                    <i className="fas fa-lock me-2"></i>Password *
                  </label>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">Password Strength</span>
                    <span className={`small fw-bold ${
                      passwordStrength === 0 ? 'text-danger' : 
                      passwordStrength <= 2 ? 'text-warning' :
                      passwordStrength <= 3 ? 'text-info' :
                      'text-success'
                    }`}>
                      {passwordStrength === 0 ? 'Very Weak' : 
                       passwordStrength <= 2 ? 'Weak' :
                       passwordStrength <= 3 ? 'Medium' :
                       passwordStrength <= 4 ? 'Strong' : 'Very Strong'}
                    </span>
                  </div>
                  <div className="progress" style={{height: '6px'}}>
                    <div 
                      className={`progress-bar ${
                        passwordStrength <= 2 ? 'bg-danger' :
                        passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{width: `${(passwordStrength / 5) * 100}%`}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control border-2"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock me-2"></i>Confirm Password *
                  </label>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="text-danger small mt-2">
                    <i className="fas fa-exclamation-triangle me-1"></i>Passwords don't match
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <div className="text-center mb-5">
              <div className="mb-3">
                <i className="fas fa-file-alt text-primary" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="fw-bold mb-2">KYC Documents</h2>
              <p className="text-muted">Upload your identity documents for verification</p>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-2 h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-id-card me-2 text-primary"></i>ID Proof *
                    </h5>
                    <div 
                      className="border-2 border-dashed rounded p-4 text-center cursor-pointer"
                      onClick={() => document.getElementById('idProof').click()}
                      style={{cursor: 'pointer', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                      <input
                        type="file"
                        id="idProof"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload(e, 'idProof')}
                        hidden
                      />
                      {formData.idProof ? (
                        <div>
                          <i className="fas fa-check-circle text-success mb-2" style={{fontSize: '3rem'}}></i>
                          <p className="mb-0 fw-bold">{formData.idProof.name}</p>
                          <small className="text-success">Successfully uploaded</small>
                        </div>
                      ) : (
                        <div>
                          <i className="fas fa-cloud-upload-alt mb-3 text-muted" style={{fontSize: '3rem'}}></i>
                          <p className="mb-2 fw-bold">Click to upload ID proof</p>
                          <small className="text-muted">Aadhaar, Passport, or Driving License<br/>JPG, PNG, PDF (Max 5MB)</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card border-2 h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-credit-card me-2 text-primary"></i>PAN Card *
                    </h5>
                    <div 
                      className="border-2 border-dashed rounded p-4 text-center cursor-pointer"
                      onClick={() => document.getElementById('panCard').click()}
                      style={{cursor: 'pointer', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                      <input
                        type="file"
                        id="panCard"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload(e, 'panCard')}
                        hidden
                      />
                      {formData.panCard ? (
                        <div>
                          <i className="fas fa-check-circle text-success mb-2" style={{fontSize: '3rem'}}></i>
                          <p className="mb-0 fw-bold">{formData.panCard.name}</p>
                          <small className="text-success">Successfully uploaded</small>
                        </div>
                      ) : (
                        <div>
                          <i className="fas fa-cloud-upload-alt mb-3 text-muted" style={{fontSize: '3rem'}}></i>
                          <p className="mb-2 fw-bold">Click to upload PAN card</p>
                          <small className="text-muted">PAN Card document<br/>JPG, PNG, PDF (Max 5MB)</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-2"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter preferred account number"
                  />
                  <label htmlFor="accountNumber">
                    <i className="fas fa-university me-2"></i>Preferred Account Number
                  </label>
                </div>
                <div className="form-text">
                  <i className="fas fa-info-circle me-1"></i>
                  Leave blank for auto-generation or enter preferred number (subject to availability)
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="step-content">
            <div className="text-center mb-5">
              <div className="mb-3">
                <i className="fas fa-fingerprint text-primary" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="fw-bold mb-2">Biometric Verification</h2>
              <p className="text-muted">Complete your account setup with fingerprint authentication</p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="text-center">
                  <div 
                    className={`mx-auto rounded-circle border-3 d-flex align-items-center justify-content-center ${
                      loading ? 'border-primary' : formData.fingerprintCaptured ? 'border-success bg-success bg-opacity-10' : 'border-secondary'
                    }`}
                    style={{width: '200px', height: '200px'}}
                  >
                    {formData.fingerprintCaptured ? (
                      <div>
                        <i className="fas fa-check-circle text-success" style={{fontSize: '4rem'}}></i>
                        <p className="mt-2 fw-bold text-success mb-0">Captured!</p>
                      </div>
                    ) : (
                      <div>
                        <i className={`fas fa-fingerprint ${loading ? 'text-primary' : 'text-muted'}`} style={{fontSize: '4rem'}}></i>
                        <p className="mt-2 text-muted mb-0">
                          {loading ? 'Scanning...' : 'Place finger here'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <button 
                      className={`btn btn-lg px-4 ${formData.fingerprintCaptured ? 'btn-success' : 'btn-primary'}`}
                      onClick={captureFingerprint}
                      disabled={loading || formData.fingerprintCaptured}
                    >
                      {loading ? (
                        <><i className="fas fa-spinner fa-spin me-2"></i>Scanning...</>
                      ) : formData.fingerprintCaptured ? (
                        <><i className="fas fa-check me-2"></i>Completed</>
                      ) : (
                        <><i className="fas fa-fingerprint me-2"></i>Start Scan</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div>
                  <h4 className="mb-4">
                    <i className="fas fa-shield-alt text-primary me-2"></i>
                    Why Biometric Authentication?
                  </h4>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item border-0 px-0">
                      <i className="fas fa-lock text-success me-3"></i>
                      <div className="d-inline-block">
                        <strong>Enhanced Security</strong>
                        <p className="text-muted mb-0 small">Your unique fingerprint provides unbreachable security</p>
                      </div>
                    </div>
                    <div className="list-group-item border-0 px-0">
                      <i className="fas fa-bolt text-warning me-3"></i>
                      <div className="d-inline-block">
                        <strong>Quick Access</strong>
                        <p className="text-muted mb-0 small">Lightning-fast login without passwords</p>
                      </div>
                    </div>
                    <div className="list-group-item border-0 px-0">
                      <i className="fas fa-user-shield text-info me-3"></i>
                      <div className="d-inline-block">
                        <strong>Identity Protection</strong>
                        <p className="text-muted mb-0 small">Advanced fraud prevention technology</p>
                      </div>
                    </div>
                    <div className="list-group-item border-0 px-0">
                      <i className="fas fa-medal text-primary me-3"></i>
                      <div className="d-inline-block">
                        <strong>Banking Compliance</strong>
                        <p className="text-muted mb-0 small">Meets international banking security standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />

      <div 
        className="min-vh-100 d-flex align-items-center py-5"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <button 
          className="btn btn-outline-light position-absolute top-0 start-0 m-4"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left me-2"></i>Back
        </button>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9">
              <div 
                className="card border-0 shadow-lg overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px'
                }}
              >
                {/* Header */}
                <div 
                  className="card-header border-0 text-white text-center py-5"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <div 
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <i className="fas fa-university" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h1 className="display-5 fw-bold mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                    Premium Banking Experience
                  </h1>
                  <p className="lead opacity-90">Join BNP Paribas - Where Innovation Meets Excellence</p>
                </div>

                {/* Progress Section */}
                <div className="card-body bg-light border-bottom py-4">
                  <div className="progress mb-4" style={{height: '6px'}}>
                    <div 
                      className="progress-bar bg-gradient"
                      style={{
                        width: `${progressWidth}%`,
                        background: 'linear-gradient(90deg, #667eea, #764ba2)'
                      }}
                    />
                  </div>
                  <div className="row text-center g-2">
                    {[
                      {num: 1, label: 'Personal Info', desc: 'Basic details'},
                      {num: 2, label: 'Mobile Verify', desc: 'OTP validation'},
                      {num: 3, label: 'Security Setup', desc: 'Password & address'},
                      {num: 4, label: 'KYC Documents', desc: 'Identity verification'},
                      {num: 5, label: 'Biometric Auth', desc: 'Fingerprint scan'}
                    ].map((step) => (
                      <div key={step.num} className="col">
                        <div 
                          className={`mx-auto rounded-circle d-flex align-items-center justify-content-center fw-bold mb-2 ${
                            currentStep > step.num 
                              ? 'bg-success text-white' 
                              : currentStep === step.num 
                                ? 'bg-primary text-white' 
                                : 'bg-light text-muted border'
                          }`}
                          style={{width: '50px', height: '50px'}}
                        >
                          {currentStep > step.num ? <i className="fas fa-check"></i> : step.num}
                        </div>
                        <div className="small">
                          <div className="fw-semibold">{step.label}</div>
                          <div className="text-muted" style={{fontSize: '0.75rem'}}>{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="card-body py-5">
                  {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="card-footer bg-light border-0 py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <button 
                      className="btn btn-outline-secondary px-4"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <i className="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    
                    {currentStep < 5 ? (
                      <button 
                        className="btn btn-primary px-4"
                        onClick={nextStep}
                      >
                        Next Step<i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-success px-4"
                        onClick={submitForm}
                        disabled={loading || !formData.fingerprintCaptured}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Creating Account...
                          </>
                        ) : (
                          <>Create Account<i className="fas fa-check ms-2"></i></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;