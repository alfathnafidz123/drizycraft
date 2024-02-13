const SeasonCategories = () => {
  return (
    <div className='group'>
      <div className='flex h-[150px] w-[150px] items-center justify-center px-2.5 '>
        <img
          loading='lazy'
          src='https://img.freepik.com/premium-photo/background-from-ripe-juicy-strawberries-fruit-summer-background_1048944-8456341.jpg?w=360'
          className='aspect-square rounded-full border-[9px] border-stone-300 hover:border-[#FFBB3C] hover:border-[4px] transition-all'
        />
      </div>
      <div className='text-center pt-1 font-katide-bold text-black group-hover:underline underline-offset-[7px] decoration-2'>Fall</div>
    </div >
  );
}

export default SeasonCategories;