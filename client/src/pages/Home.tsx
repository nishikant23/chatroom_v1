import { useNavigate } from "react-router-dom";


export const Home = () => {
    const navigate = useNavigate() 

    const navigateSignup = () => {
        navigate("/signup")
    }
    const navigateSignin = () => {
        navigate("/signin")
    }
    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-600 via-black to-blue-700 flex flex-col items-center justify-center text-white">
          <div className="container mx-auto px-4 py-16 flex flex-col items-center">
            {/* Logo and Header */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 mr-3 bg-white rounded-lg flex items-center justify-center text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">ChatSphear</h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl text-center font-light mb-8 max-w-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-blue-300">The next generation messaging platform for seamless communication</span>
            </h2>
            
            {/* Hero Section */}
            <div className="w-full max-w-5xl bg-gradient-to-br from-black/40 to-blue-900/20 backdrop-blur-md p-8 rounded-2xl mb-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Connect Instantly</h3>
                    </div>
                    <p className="text-gray-200 pl-11">
                      Experience real-time messaging with crystal clear audio and video quality that brings your conversations to life.
                    </p>
                  </div>
                  
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Secure by Design</h3>
                    </div>
                    <p className="text-gray-200 pl-11">
                      Your privacy matters. All messages are end-to-end encrypted, ensuring your conversations stay between you and your recipients.
                    </p>
                  </div>
                  
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Global Reach</h3>
                    </div>
                    <p className="text-gray-200 pl-11">
                      Connect with friends, family, and colleagues around the world with our reliable global infrastructure.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg blur opacity-75"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                      alt="Messaging illustration" 
                      className="relative rounded-lg shadow-lg max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button onClick={navigateSignup}
               className="group relative px-8 py-4 overflow-hidden rounded-full bg-white text-blue-900 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Sign Up
                </span>
              </button>
              <button onClick={navigateSignin}
               className="group relative px-8 py-4 overflow-hidden rounded-full border-2 border-white font-semibold text-lg hover:border-blue-300 transition-colors duration-300">
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Sign In
                </span>
              </button>
            </div>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
              <div className="bg-gradient-to-br from-black/30 to-red-900/10 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 shadow-lg transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Platform</h3>
                <p className="text-gray-200">Available on all your devices, keeping you connected wherever you go.</p>
              </div>
              
              <div className="bg-gradient-to-br from-black/30 to-blue-900/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polyline points="16 3 21 3 21 8"></polyline>
                    <line x1="4" y1="20" x2="21" y2="3"></line>
                    <polyline points="21 16 21 21 16 21"></polyline>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                    <line x1="4" y1="4" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Integrations</h3>
                <p className="text-gray-200">Seamlessly connect with your favorite apps and services for enhanced productivity.</p>
              </div>
              
              <div className="bg-gradient-to-br from-black/30 to-purple-900/10 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-lg transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                    <path d="M20.3 4.3a10 10 0 0 1 0 14.1L12 12l8.3-7.7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-200">Intelligent suggestions and automated responses save you time and enhance your communication.</p>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="w-full max-w-5xl mb-16">
              <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">S</div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-300">Marketing Director</p>
                    </div>
                  </div>
                  <p className="text-gray-200 italic">"ChtSper has transformed how our team communicates. The interface is intuitive and the features are exactly what we needed for seamless collaboration."</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white font-bold text-xl">M</div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Michael Chen</h4>
                      <p className="text-sm text-gray-300">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-gray-200 italic">"The security features and reliability of ChtSper are unmatched. As someone who values privacy, I appreciate the end-to-end encryption and thoughtful design."</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="w-full max-w-3xl bg-gradient-to-r from-red-900/30 to-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg mb-16">
              <h3 className="text-2xl font-bold mb-4 text-center">Stay Updated</h3>
              <p className="text-center mb-6">Join our newsletter to receive the latest updates and exclusive offers.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="w-full max-w-5xl border-t border-white/10 pt-8 pb-4">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4">ChtSper</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Blog</li>
                    <li>Press</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">Product</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Enterprise</li>
                    <li>Security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">Resources</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Documentation</li>
                    <li>Tutorials</li>
                    <li>Support</li>
                    <li>API</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4">Legal</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Cookie Policy</li>
                    <li>GDPR</li>
                  </ul>
                </div>
              </div>
              <div className="text-sm text-gray-400 text-center">
                <p>© 2025 ChatSphear. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      );
}