import Button from "@/components/buttons/Button";
import { features } from "@/constant/data";
import Image from "next/image";

const PricingSection = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-[50px] mb-[100px] px-4">
      <h1 className="mb-[60px]">Choose Your Package</h1>

      <div className="flex flex-col md:flex-row justify-center items-center md:gap-[150px] gap-[150px] mt-[50px] flex-wrap">
        {features.map((feature, i) => (
          <div key={i} className="group relative flex flex-col justify-start items-center flex-wrap">
            <div className="text-center bg-blue-500 rounded-[12px] px-6 max-md:px-8 py-3 absolute md:-top-11 -top-10 left-0 pb-[25px]">
              <h3 className="text-slate-300 group-hover:text-white group-hover:-translate-y-2 transition duration-200 ease-in-out">{feature.title}</h3>
            </div>

            <div className="relative z-[999] bg-gray-100 bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.2rem] rounded-[12px] p-8 py-[40px] w-full">
              <h3 className="text-center text-[40px] border-b-2 border-blue-500 pb-5 mb-[20px] pl-4 w-full">
                <span className="absolute text-xl top-8 -translate-x-[100%] font-semibold">Rp</span>{feature.value}
              </h3>
              {feature.featureItem.map((item) => (
                <div key={item.title} className="flex items-center gap-4 mt-[15px] hover:scale-105 transition">
                  <Image src={item.imgUrl} alt="" width={20} height={20}></Image>
                  <p className="text-[18px]">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-9 right-0">
              <Button className="bg-blue-500 px-10 pb-2 pt-[20px] rounded-[12px] border-none hover:bg-blue-800 transition duration-200 ease-in">
                <span className="text-xl font-semibold max-md:text-lg">Choose</span>
              </Button>
            </div>
          </div>

        ))}
      </div>
    </section>
  )
};

export default PricingSection;
