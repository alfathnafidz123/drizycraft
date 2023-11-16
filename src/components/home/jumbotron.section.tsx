import Button from "@/components/buttons/Button";
import Image from 'next/image'

const JumbotronSection = () => {
  return <section className="pt-[125px] mb-[100px]">
    <div className="flex flex-col px-[20px] md:flex-row md:gap-[190px] md:items-center md:justify-center">
      <div className="flex flex-col items-center justify-center md:max-w-[520px] md:items-start md:pt-24">
        <h2 className="font-bold text-xl md:text-3xl">Lorem Ipsum Dolor Sit Amet</h2>
        <p className="text-center mt-[12px] mb-[12px] text-sm md:text-start md:text-base">consectetur a dipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <Button className="bg-[#0151C6] border-none text-lg px-6 rounded-xl transition duration-200 hover:bg-[#0151C6]/70 md:px-8">
          Button
        </Button>  
      </div>
      <div className="mt-10">
      <Image className="" src="/images/edu.png" width={500} height={358} alt="edu"/>
      </div>
    </div>
</section>
};

export default JumbotronSection;