import React, { useState, useRef, useEffect } from 'react';
import { Download, BookOpen, Star, Clock, User, TrendingUp, Search, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import FeaturedSuccessStories from '@/components/FeaturedSuccessStories';
import { motion, useAnimation, useInView } from 'framer-motion';

// Animation component for spiral effect
const SpiralReveal = ({ children, delay = 0, index = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Calculate spiral position based on index
  const angle = index * 30; // Degrees between each element
  const radius = index * 5; // Spiral radius increases with index
  const startX = Math.cos(angle * Math.PI / 180) * radius;
  const startY = Math.sin(angle * Math.PI / 180) * radius;
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0,
          x: startX,
          y: startY,
          scale: 0.8,
          rotate: -5 + (index % 3) * 5 // Slight varied rotation
        },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          scale: 1,
          rotate: 0,
          transition: { 
            duration: 0.8, 
            delay: delay + index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const EbookPage = () => {
  const ebook = {
    title: "The Complete Guide to Generative AI in Fitness",
    description: "A comprehensive guide covering AI implementation strategies, ROI calculations, and real-world case studies from leading fitness brands. Learn how to transform your fitness business with cutting-edge AI technology.",
    author: "DXFactor Team",
    pages: "50+ pages",
    downloadCount: "2.4K",
    rating: "4.9",
    category: "AI Strategy",
    image: "/logos/Ebook_GenAI.png",
    pdfUrl: "/docz/eboook.pdf"
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = (pdfUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title.replace(/\s+/g, '-') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      handleDownload(ebook.pdfUrl, ebook.title);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Enhanced Header Section */}
      <div className="relative bg-gray-900 border-b border-gray-200 pt-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ 
              filter: 'brightness(0.7)',
              mixBlendMode: 'normal'
            }}
          >
            <source src="/videos/futurecityh.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/50 mix-blend-multiply"></div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-16 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SpiralReveal delay={0.1} index={0}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-4">
                <BookOpen className="w-3 h-3 mr-1" />
                EBOOKS & GUIDES
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Download expert guides and<br />
                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  actionable resources
                </span>
              </h1>
              <p className="text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Get instant access to our comprehensive guide designed to help 
                you implement AI and transform your fitness business.
              </p>
            </div>
          </SpiralReveal>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Ebook */}
        <SpiralReveal delay={0.1} index={0}>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative h-64 lg:h-80 bg-gray-100">
                <img 
                  src={ebook.image} 
                  alt={ebook.title}
                  className="w-full h-full object-contain p-8"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    FEATURED
                  </span>
                </div>
              </div>
              <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                    {ebook.category}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {ebook.title}
                </h2>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {ebook.description}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By: {ebook.author}</span>
                    <span>•</span>
                    <span>{ebook.pages}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{ebook.rating}</span>
                    </div>
                  </div>
                </div>
                
                {isSubmitted ? (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    <div>
                      <p className="font-bold">Thank you for your interest!</p>
                      <p>Your download should begin automatically. If not, <a href={ebook.pdfUrl} download={ebook.title.replace(/\s+/g, '-') + '.pdf'} className="underline hover:text-green-800">click here</a>.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <input 
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <input 
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    <button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 w-full justify-center disabled:bg-gray-400"
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                    >
                      <Download className="w-4 h-4" />
                      Download Free
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </SpiralReveal>
      </div>
      
      {/* Featured Success Stories */}
      <FeaturedSuccessStories />
      
      <ContactForm />
      <Footer />
    </div>
  );
};

export default EbookPage; 