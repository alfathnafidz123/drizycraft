
function ProductCard() {
  return (
    <div className='main-container w-[281px] h-[335px] relative mx-1'>
      <div className='flex w-[64px] h-[37px] pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[8px] justify-center items-center flex-nowrap rounded-[8px] border-solid border-2 border-[#b1b1b1] relative z-[9] mt-[285.868px] mr-0 mb-0 ml-[205px]'>
        <div className='w-[26px] h-[24px] shrink-0 bg-[url()] bg-cover bg-no-repeat relative z-10' />
      </div>

      {/* badge sale */}
      <div className='w-[83.578px] h-[43.543px] bg-[url()] bg-cover bg-no-repeat absolute top-[-1px] right-[12.422px] overflow-hidden z-[8]' />

      <div className='flex w-[281px] h-[335px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] flex-col gap-[24px] items-start flex-nowrap bg-[#fff] rounded-[12px] absolute top-0 left-0 shadow-xl'>
        <div className='h-[172px] self-stretch shrink-0 bg-[url(https://img.freepik.com/premium-photo/background-from-ripe-juicy-strawberries-fruit-summer-background_1048944-8456341.jpg?w=360)] bg-cover bg-no-repeat rounded-[6px] relative z-[1]' />
        <span className="flex w-[257px] h-[54px] justify-start items-start self-stretch shrink-0 text-[16px] font-semibold leading-[17.6px] text-[#1a204c] relative text-left overflow-hidden z-[2]">
          Girl and Fox by The Forest
          <br />
          3D Shadow Box - Winter
          <br />
          SVG Paper Cut
        </span>
        <button className='flex w-[182px] h-[37px] pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#2a3b80] rounded-[8px] border-none relative z-[3] pointer'>
          <span className="flex w-[18px] h-[16px] justify-end items-start shrink-0 basis-auto text-[20px] font-bold leading-[16px] text-[#fff] tracking-[0.2px] relative text-right whitespace-nowrap z-[5]">
            $1
          </span>
        </button>
      </div>
      <div className='w-[39px] h-[39px] bg-[url()] bg-cover bg-no-repeat absolute top-[5px] left-[7px] z-[6]' />
      <div className='w-[39px] h-[39px] bg-[] bg-cover bg-no-repeat absolute top-[5px] left-[55px] z-[7]' />
    </div>
  );
}

export default ProductCard;

