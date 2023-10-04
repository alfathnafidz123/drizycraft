const JumbotronSection = () => {
  return <section className="mt-[100px] mb-[100px]">
  <div className="container mx-auto">
    <div className="flex justify-center h-[325px] gap-[100px]">
      <div className="flex flex-wrap w-[440px] bg-[#D9D9D9] rounded-[12px]">
        <div className="px-4">
          <h1 className="pt-4">Lorem, ipsum dolor.</h1>
          <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="py-4 text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A deserunt et corrupti quis sapiente. Iste necessitatibus, commodi explicabo rerum cupiditate, reprehenderit nihil a quis non cum, et sunt libero corrupti!</p>
        </div>
        <div className="flex flex-grow justify-end items-end mb-[31px] mr-[31px]">
          <a href="" className="flex items-center justify-center w-[200px] h-[50px] text-[24px] border-2 border-[#000]  rounded-[12px]">Button</a>
        </div>
      </div>
      <div className="w-[700px] bg-[#D9D9D9] rounded-[12px]"></div>
    </div>
  </div>
</section>
};

export default JumbotronSection;
