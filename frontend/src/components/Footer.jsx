const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10 px-6 font-[poppins] flex flex-col justify-center items-center w-full mt-auto">
      {/* Top section */}
      <div className="mb-10 md:flex w-full max-w-6xl items-center justify-between">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold">Join</h3>
          <h3 className="text-2xl md:text-4xl font-semibold mb-2 font-['Microgramma_D_Extended'] text-primary">
            Sarkin <span className="text-white">Mota</span>
          </h3>
          <p className="mb-3 text-gray-300 text-xs md:text-sm">
            Receive Price Updates, Blog Notifications & More.
          </p>
        </div>

        <form className="w-full md:w-[50vw] inline-flex gap-2 flex-wrap justify-center">
          <div className="items-center justify-between p-1 flex w-full rounded-full bg-white/30 h-15 relative">
            <div className="h-full items-center flex w-full">
              <input
                type="text"
                placeholder="Enter your email"
                className="input w-full border-none bg-transparent text-white placeholder:text-white shadow-none px-4 focus:outline-none"
              />
            </div>
            <div className="h-full flex justify-end">
              <button className="btn px-6 btn-primary rounded-full h-full font-normal">
                Join
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Links section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-6">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-300 mb-4 md:mb-0">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="/services" className="hover:text-primary transition-colors">
            Services
          </a>
          <a href="/inventory" className="hover:text-primary transition-colors">
            Inventory
          </a>
          <a href="/contact" className="hover:text-primary transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
        </div>

        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Car Dealership. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
