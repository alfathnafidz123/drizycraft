

const AffiliateBanner = () => {
  return (
    <div className="flex flex-col z-20 justify-center text-center text-white bg-[#3D5DD1] font-montserrat">
      <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-12 w-full min-h-[321px] max-md:px-5 max-md:max-w-full">
        <img
          src=""
          alt="Affiliate"
        />
        <div className="flex flex-col items-center mt-12 mb-6 max-w-full w-[341px] max-md:mt-10">
          <div className="text-2xl leading-9 whitespace-nowrap">Share &amp; Earn</div>
          <p className="mt-4 text-xs leading-5 w-[254px]">
            Get The Extra Money With Only Few Clicks
            <br /> 30% Commission
          </p>
          <button className="w-80 h-16 mt-4 bg-[#FFBB3C] rounded-[47px] border-[3px] border-indigo-950 justify-center shadow-md items-center gap-2.5 hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#ECA014]">
            <div className="text-center text-black font-katide-semibold">Become an Affiliator</div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default AffiliateBanner;
