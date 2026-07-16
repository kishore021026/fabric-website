export default function Footer() {
  return (
    <footer className="bg-[#F7F6F3] border-t border-stone-200 px-8 md:px-24 py-16 text-stone-600 font-sans relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col space-y-4 md:col-span-1">
          <h2 className="font-serif text-2xl text-stone-950 tracking-tight">AMIRTHA KNETS</h2>
          <p className="font-light leading-relaxed max-w-xs">
            Honest materials and impeccable weaves, ethically sourced for the modern aesthetic.
          </p>
        </div>

        {/* Column 2: Contact & Address */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-xs text-stone-950 mb-1">Headquarters</h3>
          <p className="font-light leading-relaxed">
            124 Silk Road, Suite 300<br />
            Coimbatore, Tamil Nadu 641001<br />
            India
          </p>
          <div className="flex flex-col space-y-1 mt-2">
            <a href="mailto:contact@amirthaknets.com" className="hover:text-[#2E473B] transition-colors font-light">
              E: contact@amirthaknets.com
            </a>
            <a href="tel:+919876543210" className="hover:text-[#2E473B] transition-colors font-light">
              T: +91 98765 43210
            </a>
          </div>
        </div>

        {/* Column 3: Retail Partners */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-xs text-stone-950 mb-1">Available On</h3>
          <a href="#" className="hover:text-[#8B6E4E] transition-colors font-light">Amazon ↗</a>
          <a href="#" className="hover:text-[#8B6E4E] transition-colors font-light">Flipkart ↗</a>
        </div>

        {/* Column 4: Socials */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-xs text-stone-950 mb-1">Social</h3>
          <a href="#" className="hover:text-[#2E473B] transition-colors font-light">Instagram</a>
          <a href="#" className="hover:text-[#2E473B] transition-colors font-light">Pinterest</a>
          <a href="#" className="hover:text-[#2E473B] transition-colors font-light">LinkedIn</a>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs font-light">
        <p>© {new Date().getFullYear()} Amirtha Knets. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-stone-950 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-stone-950 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}