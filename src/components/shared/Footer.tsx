
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Mobile-first layout with stacked elements */}
        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-center">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Marvello by Webbicles. All rights reserved.
            </p>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="grid grid-cols-2 gap-4 text-center md:flex md:flex-row md:gap-6 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link to="/cancellation-policy" className="hover:text-primary transition-colors">Cancellation/Refund Policy</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
