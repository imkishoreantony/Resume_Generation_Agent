import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-gray-300 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              🤖 AI Resume Builder
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Build ATS-friendly resumes, generate professional
              cover letters, review resumes using AI, and
              land your dream job faster.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#stats" className="hover:text-white transition">
                  Why Choose Us
                </a>
              </li>

              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How It Works
                </a>
              </li>

              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Technologies */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Built With
            </h3>

            <ul className="space-y-4">

              <li>⚛️ React</li>

              <li>🐍 Django REST</li>

              <li>🤖 Gemini AI</li>

              <li>🎨 Tailwind CSS</li>

              <li>🔐 JWT Authentication</li>

            </ul>

          </div>

          {/* Developer */}

          <div>

            <h3 className="text-xl font-bold text-white mb-6">
              Developer
            </h3>

            <p className="font-semibold text-lg">
              👨‍💻 Kishore Antony
            </p>

            <p className="mt-2 text-gray-400">
              Full Stack Developer
            </p>

            <div className="flex gap-5 mt-8 text-2xl">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:your@email.com"
                className="hover:text-white transition"
              >
                <FaEnvelope />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <hr className="my-10 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} AI Resume Builder.
            All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-400">

            Made with

            <FaHeart className="text-red-500" />

            in India 🇮🇳

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;