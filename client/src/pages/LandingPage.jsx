import {
  BookOpen,
  Users,
  FileText,
  Phone,
  Search,
  ArrowRight,
  Zap,
  Globe,
  Shield,
  User,
  Edit3Icon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  {
    to: "/publisher",
    label: "Publisher Details",
    desc: "Learn about our publisher, editorial board, and publishing standards.",
    icon: Users,
  },
  {
    to: "/issn",
    label: "ISSN Details",
    desc: "View ISSN registration, journal metrics, and indexing information.",
    icon: FileText,
  },
  {
    to: "/research",
    label: "Research Articles",
    desc: "Explore our extensive collection of peer-reviewed research publications.",
    icon: Search,
  },
  {
    to: "/editions",
    label: "Journal Editions",
    desc: "Browse current and archived journal issues with complete article details and editorial information.",
    icon: BookOpen,
  },
  {
    to: "/editorial-board",
    label: "Editorial Board",
    desc: "Meet our editorial board and contributing scholars.",
    icon: Users,
  },
  {
    to: "/ethics",
    label: "Ethics",
    desc: "Read about our publication ethics and standards.",
    icon: Shield,
  },
  {
    to: "/plagiarism",
    label: "Plagiarism Policy",
    desc: "Understand our strict anti-plagiarism policy.",
    icon: FileText,
  },
  {
    to: "/contact-us",
    label: "Contact Info",
    desc: "Get in touch with our editorial team or technical support.",
    icon: Phone,
  },
];

const features = [
  {
    icon: Zap,
    title: "Rigorous Review Process",
    desc: "Double-blind peer review ensuring the highest academic standards with transparent evaluation criteria",
  },
  {
    icon: Globe,
    title: "International Indexing",
    desc: "Published articles are indexed in leading academic databases for maximum scholarly visibility",
  },
  {
    icon: Shield,
    title: "Editorial Excellence",
    desc: "Managed by distinguished scholars and experts committed to advancing academic discourse",
  },
];

const LandingPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen">
      {/* Header with Navigation */}
      <header className="bg-bg-light border-b border-accent-light">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-text">
                  Journal Management
                </h1>
                <p className="text-xs text-subtext uppercase tracking-wide">
                  Academic Publishing Platform
                </p>
              </div>
            </div>
            <div className="relative flex gap-2" ref={dropdownRef}>
              <button
                onClick={() => navigate("/editorial-board")}
                className="flex items-center space-x-2 px-4 text-text hover:text-primary py-2 border border-muted rounded bg-white hover:border-primary hover:bg-primary-light transition-colors"
                aria-label="Editorial Board"
              >
                <Edit3Icon className="w-4 h-4" />
                <span className="text-sm">Editorial Board</span>
              </button>
              <button
                onClick={() => navigate("/editions")}
                className="flex items-center space-x-2 px-4 text-text hover:text-primary py-2 border border-muted rounded bg-white hover:border-primary hover:bg-primary-light transition-colors"
                aria-label="Journal Editions"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Journal Editions</span>
              </button>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center space-x-2 px-4 text-text hover:text-primary py-2 border border-muted rounded bg-white hover:border-primary hover:bg-primary-light transition-colors"
                aria-label="Account Menu"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Account</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-accent-light rounded shadow-lg py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-light"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/signup");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary-light"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      {/* <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto mb-8">
            <span className="inline-block px-4 py-1 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
              Established Academic Publishing
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-text leading-tight mb-6">
              Law, Diplomacy, Technology &<br />
              <span className="text-primary">Public Policy Review</span>
            </h1>
            <p className="text-xl text-text leading-relaxed max-w-3xl mx-auto mb-12">
              A premier scholarly journal dedicated to advancing
              interdisciplinary research at the intersection of law, diplomacy,
              technology, and public policy through rigorous peer-reviewed
              publications.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/research"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
            >
              Browse Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/publisher"
              className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded hover:border-primary-dark hover:bg-primary-light transition-colors"
            >
              About the Journal
            </Link>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-accent-light rounded-lg p-8 shadow-sm">
              <div className="bg-bg-light rounded h-80 flex items-center justify-center">
                <img
                  src="https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am91cm5hbHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Academic journal and research materials"
                  className="w-full h-full object-cover rounded opacity-90"
                />
              </div>
              <p className="text-sm text-primary mt-4 text-center italic">
                Supporting scholarly excellence through rigorous academic
                standards
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="bg-white pt-20">
        <div className="flex gap-12 justify-center">
          <div className="flex ml-16 gap-5">
            <div className="flex flex-col gap-5 justify-start">
              <img
                src="https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am91cm5hbHxlbnwwfHwwfHx8MA%3D%3D"
                className="h-[350px] w-[300px] object-cover rounded shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8am91cm5hbHxlbnwwfHwwfHx8MA%3D%3D"
                className="h-[350px] w-[300px] object-cover rounded shadow"
              />
            </div>
            <div className="flex flex-col gap-5 justify-end">
              <img
                src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpvdXJuYWx8ZW58MHx8MHx8fDA%3D"
                className="h-[350px] w-[300px] object-cover rounded shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1513542992587-cd39ba97057c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvdXJuYWx8ZW58MHx8MHx8fDA%3D"
                className="h-[200px] w-[300px] object-cover rounded shadow"
              />
            </div>
          </div>

          <div className="max-w-6xl px-12 flex flex-col justify-center text-left">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
                Established Academic Publishing
              </span>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-text leading-tight mb-6">
                Law, Diplomacy, Tech &<br />
                <span className="text-primary">Policy Review</span>
              </h1>
              <p className="text-xl text-text leading-relaxed max-w-3xl mb-12">
                A premier scholarly journal dedicated to advancing
                interdisciplinary research at the intersection of law,
                diplomacy, technology, and public policy through rigorous
                peer-reviewed publications.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                to="/research"
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
              >
                Browse Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/publisher"
                className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded hover:border-primary-dark hover:bg-primary-light transition-colors"
              >
                About the Journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20 bg-primary-light/25">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">
              Journal Resources
            </h2>
            <p className="text-lg text-text max-w-2xl mx-auto">
              Access comprehensive information about our journal, submission
              guidelines, and scholarly resources
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="group bg-white border border-gray-200 shadow-sm rounded-lg p-8 hover:border-primary hover:shadow-md transition-all duration-300 text-left w-full"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-light rounded-lg mb-4 transition-colors">
                    <link.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary-dark mb-3">
                    {link.label}
                  </h3>
                  <p className="text-text leading-relaxed mb-4">{link.desc}</p>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:text-accent">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-serif font-bold mb-2">2,500+</div>
            <div className="text-muted text-sm uppercase tracking-wide">
              Published Articles
            </div>
          </div>
          <div>
            <div className="text-4xl font-serif font-bold mb-2">180+</div>
            <div className="text-muted text-sm uppercase tracking-wide">
              Editorial Board Members
            </div>
          </div>
          <div>
            <div className="text-4xl font-serif font-bold mb-2">75+</div>
            <div className="text-muted text-sm uppercase tracking-wide">
              Countries Represented
            </div>
          </div>
          <div>
            <div className="text-4xl font-serif font-bold mb-2">15</div>
            <div className="text-muted text-sm uppercase tracking-wide">
              Years Publishing
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards Section */}
      <section className="py-20 bg-primary-light">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-dark mb-6">
            Editorial Excellence
          </h2>
          <p className="text-lg text-text max-w-3xl mx-auto mb-16">
            Our commitment to scholarly rigor and academic integrity defines
            every aspect of our publishing process
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-dark rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-dark mb-4">
                  {feature.title}
                </h3>
                <p className="text-primary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-dark mb-6">
            Submit Your Research
          </h2>
          <p className="text-lg text-text mb-8 max-w-2xl mx-auto">
            Join our community of distinguished scholars and contribute to the
            advancement of interdisciplinary research
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
            >
              Submission Guidelines
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded hover:border-primary-dark hover:bg-primary-light transition-colors"
            >
              Editorial Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text border-t border-accent-light py-12 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-bg-light rounded flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-dark" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-bg-light">LDTPPR</h3>
                <p className="text-xs text-white">
                  Law, Diplomacy, Tech & Public Policy Review
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              A peer-reviewed academic journal committed to rigorous research
              and interdisciplinary dialogue across global issues.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-bg-light mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["Blog", "/blog"],
                ["Research Archive", "/research"],
                ["Publisher Info", "/publisher"],
                ["ISSN Details", "/issn"],
                ["Editorial Board", "/editorial-board"],
                ["Contact Us", "/contact-us"],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="text-white hover:text-muted transition-colors text-left"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center border-t border-white/20 pt-6 mt-6 text-sm text-bg-light">
          &copy; {new Date().getFullYear()} Law, Diplomacy, Technology & Public
          Policy Review. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
