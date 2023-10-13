import Button from "@/components/buttons/Button";

const JumbotronSection = () => {
  return <section className="pt-[200px] mb-[100px]">
  <div className="flex flex-row justify-center items-center gap-[100px]">
    <div className="grid w-[440px] h-[325px] bg-[#D9D9D9] rounded-[12px] content-between">
      <h2 className="p-4">Lorem, ipsum dolor.</h2>
      <div className="flex justify-end items-end pb-[30px] pr-[20px]">
      <Button className="flex w-[200px] h-[50px] bg-transparent text-black !text-[24px] items-center justify-center rounded-[20px] border-2 border-black">Button</Button>
      </div>
    </div>
    <div className="w-[700px] h-[325px] bg-[#D9D9D9] rounded-[12px]"></div>
  </div>
</section>
};

export default JumbotronSection;