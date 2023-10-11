
const Footer = () => {
  return (
    <footer className="h-[500px] w-full bg-[#D9D9D9]">
    <div className="mb-[100px] flex">
      <div
        className="mx-auto mt-[100px] h-[100px] w-[500px] rounded-[12px] bg-[#B9B9B9]"
      ></div>
    </div>
  
    <div>
      <div className="mb-[50px] flex justify-between p-[50px] ">
        <div className="h-[50px]  w-[200px] rounded-[12px] bg-[#B9B9B9]"></div>
  
        <div className="pl-30 flex gap-[32.43px]">
          <div className="h-[50px] w-[108px] rounded-[12px] bg-[#B9B9B9]"></div>
          <div className="h-[50px] w-[108px] rounded-[12px] bg-[#B9B9B9]"></div>
          <div className="h-[50px] w-[108px] rounded-[12px] bg-[#B9B9B9]"></div>
        </div>
  
        <div className="flex gap-[10px]">
          <div className="h-[50px] w-[50px] rounded-[12px] bg-[#B9B9B9]"></div>
          <div className="h-[50px] w-[50px] rounded-[12px] bg-[#B9B9B9]"></div>
          <div className="h-[50px] w-[50px] rounded-[12px] bg-[#B9B9B9]"></div>
          <div className="h-[50px] w-[50px] rounded-[12px] bg-[#B9B9B9]"></div>
        </div>
      </div>
      <div className="  bg-[#D9D9D9] px-[50px] pb-[50px]">
        <p className="pb border-t-2 border-[#B9B9B9] pt-3 text-end">
          Copyright © 2023 All Right Deserved
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
