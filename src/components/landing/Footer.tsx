
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Marvello by Webbicles. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
