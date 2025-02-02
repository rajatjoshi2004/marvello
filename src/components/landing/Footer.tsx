export default function Footer() {
  return (
    <footer className="border-t py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/logo-icon.svg" alt="Marvello Logo" className="w-6 h-6" />
          <span className="text-lg font-semibold text-primary">
            Marvello
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Marvello. All rights reserved.
        </p>
      </div>
    </footer>
  );
}