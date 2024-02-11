import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center px-16 pt-12 pb-7 text-white bg-[#1A214C] max-md:px-5">
      <form className="flex flex-col mt-16 w-full max-w-[1173px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-start max-md:flex-wrap max-md:max-w-full">
          <nav className="flex flex-col flex-1 text-sm leading-6 whitespace-nowrap">
            <h2 className="text-lg font-bold leading-5">Find</h2>
            <div className="mt-11 max-md:mt-10">Blogs</div>
            <div className="mt-6">Newest</div>
            <div className="mt-6">Popular</div>
          </nav>
          <nav className="flex flex-col flex-1 text-sm leading-6 whitespace-nowrap">
            <h2 className="text-lg font-bold leading-5">Categories</h2>
            <div className="mt-10">Shadow box</div>
            <div className="mt-6">Paper Cut Template</div>
            <div className="mt-5">Sublimation</div>
            <div className="mt-6">Vector</div>
          </nav>
          <nav className="flex flex-col flex-1 text-sm leading-6">
            <h2 className="text-lg font-bold leading-5">Legal</h2>
            <div className="mt-10 max-md:mt-10">License</div>
            <div className="mt-6 whitespace-nowrap">Terms & Conditions</div>
            <div className="mt-6">Privacy Policy</div>
          </nav>
          <nav className="flex flex-col text-sm flex-1 leading-6 whitespace-nowrap">
            <h2 className="text-lg font-bold leading-5">Help</h2>
            <div className="mt-10">Help Center</div>
            <div className="mt-6">FAQ</div>
            <div className="mt-6">Contact Us</div>
            <div className="mt-6">About Us</div>
          </nav>
          <nav className="flex flex-col flex-1 self-stretch">
            <div className="flex flex-col px-2.5">
              <h2 className="text-lg leading-5">Follow us</h2>
              <div className="flex gap-5 justify-between mt-5 text-xl whitespace-nowrap">
                <a href="#" aria-label="Facebook">
                </a>
                <a href="#" aria-label="Twitter">
                  
                </a>
                <a href="#" aria-label="Youtube">
                  
                </a>
                <a href="#" aria-label="Instagram">
                  
                </a>
              </div>
            </div>
            <img
              loading="lazy"
              src=""
              className="self-center mt-12 aspect-[2.78] w-[207px] max-md:mt-10"
              alt="Blog Finder Logo"
            />
          </nav>
        </div>
        <div className="shrink-0 mt-11 h-px bg-white bg-opacity-30 max-md:mt-10 max-md:max-w-full" />
        <div className="self-center mt-6 text-sm leading-6 text-center">
          ©2024 Drizy Studio - All rights reserved.
        </div>
      </form>

    </footer>
  );
};

export default Footer;
