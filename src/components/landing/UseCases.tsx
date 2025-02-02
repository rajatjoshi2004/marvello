export default function UseCases() {
  const users = [
    "Small Business Owners",
    "Professionals like Doctors, Lawyers",
    "Hotel and Restaurant Owners",
    "Coaches & Consultants",
    "E-commerce Owners",
    "Solopreneurs / Self-Employed",
    "Makeup Artists & Bakers",
    "Real Estate Owners & Agents"
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1),transparent_40%)]"></div>
      </div>
      <div className="mx-auto max-w-7xl relative">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          Who Can Use Marvello QR Codes?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => (
            <div 
              key={index} 
              className="rounded-xl bg-white dark:bg-gray-700 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-primary/5 hover:to-brand-yellow/5"
            >
              <p className="font-medium text-gray-900 dark:text-white">{user}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}