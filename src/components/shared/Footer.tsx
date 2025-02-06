
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Marvello by Webbicles. All rights reserved.
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/about" className="hover:text-primary">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">Contact Us</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-primary">Pricing</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-primary">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/cancellation-policy" className="hover:text-primary">Cancellation/Refund Policy</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
