
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Cancellation/Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Have questions? Reach out to us at<br />
              <a href="mailto:support@marvello.com" className="text-primary hover:underline">
                support@marvello.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Marvello. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
