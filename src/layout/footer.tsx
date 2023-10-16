import { BsWhatsapp, BsInstagram, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="h-[368px] w-full bg-[#0158C6]">
      <div className="flex">
        <h1
          className="w-full mt-[50px] h-[100px] text-[24px] text-semibold  text-center text-white"
        >Let’s Get Started and Use Our Product Today
        </h1>
      </div>

      <div>
        <div className="flex justify-between">
          <div className="ml-[50px] h-[50px] w-[200px]">
            <a href="">
              <img src="/images/quadra.png" width='50' height='50' />
            </a>
          </div>

          <ul className="w-[470px] flex gap-[30px]">
            <li className="font-poppins font-bold text-[16px] text-white pr-[42.23px]">
              <a href="#">Home</a>
            </li>
            <li className="font-poppins font-bold text-[16px] text-white pr-[30px]">
              <a href="#">Features</a>
            </li>
            <li className="font-poppins font-bold text-[16px] text-white pr-[30px]">
              <a href="#">Contact</a>
            </li>
            <li className="font-poppins font-bold text-[16px] text-white">
              <a href="#">About</a>
            </li>


          </ul>

          <div className="flex pr-[50px] ">
            <div className="flex">
              <a href="#" target="_blank" className="text-white text-bold text-[30px] pr-[20px] ">
                {/* Whatsapp */}
                <BsWhatsapp />
              </a>

              < a href="#" target="_blank" className="text-white text-bold text-[30px] pr-[20px]">
                {/* Instagram */}
                <BsInstagram />
              </a>
              <a href="#" target="_blank" className="text-white text-bold text-[30px]">
                {/* LinkedIn */}
                <BsLinkedin />
              </a>


            </div>

          </div>
        </div>
        <div className=" font-poppins pt-[50px] px-[50px]">
          <div className="flex justify-end border-t-2  border-white text-[14px] pt-[20px] pb-[46px] text-end text-white ">
            <p className="pr-[10px] font-medium">Copyright</p> <span className="text-[24px] " >©</span> <p className="pl-[10px] pr-[10px] font-medium "> 2023</p> <p className="font-medium">Right Deserved</p>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
