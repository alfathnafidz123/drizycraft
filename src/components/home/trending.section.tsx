
import SectionContainer from "@/components/container/sectionContainer";
import NextImage from "@/components/NextImage";

import { HomepageDataI } from "@/interfaces/product.interface";

import { trend1, trend2, trend3, trend4 } from "~/images";



const TrendingSection = ({ homeProduct }: { homeProduct: HomepageDataI }) => {
  return (
    <>
      <SectionContainer>
        <div className="flex w-full flex-col max-md:max-w-full mt-8">
          <div className="font-katide-bold text-2xl text-indigo-950 px-4 lg:px-0">
            Find what’s trending right now!
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 py-4 px-2 lg:px-0">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center h-full bg-white p-3 rounded-xl group">
            <div className="rounded-xl transition-all duration-300 group-hover:shadow-lg">
              <div className="bg-[#C2E5FF] rounded-xl mb-4 w-full aspect-[273/370] relative overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <NextImage
                    src={trend1.src}
                    alt="Crafted with precision"
                    layout="responsive"
                    width={273}
                    height={390}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#61657D]">Crafted with precision</h3>
              <p className="text-sm text-[#61657D] mt-2 mb-4 px-5">
                Unleash your space's charm with laser-cut artistry.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center text-center h-full bg-white p-3 rounded-xl group">
            <div className="rounded-xl transition-all duration-300 group-hover:shadow-lg">
              <div className="bg-[#C2E5FF] rounded-xl mb-4 w-full aspect-[273/370] relative overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <NextImage
                    src={trend2.src}
                    alt="Crafted with precision"
                    layout="responsive"
                    width={273}
                    height={390}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#61657D]">Surprise in every fold</h3>
              <p className="text-sm text-[#61657D] mt-2 mb-4 px-5">
                Bring your greetings to life with pop-up magic.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center text-center h-full bg-white p-3 rounded-xl group">
            <div className="rounded-xl transition-all duration-300 group-hover:shadow-lg">
              <div className="bg-[#C2E5FF] rounded-xl mb-4 w-full aspect-[273/370] relative overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <NextImage
                    src={trend3.src}
                    alt="Crafted with precision"
                    layout="responsive"
                    width={273}
                    height={390}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#61657D]">Wear your humor</h3>
              <p className="text-sm text-[#61657D] mt-2 mb-4 px-5">
                Sublimated fun that keeps the laughs going.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center h-full bg-white p-3 rounded-xl group">
            <div className="rounded-xl transition-all duration-300 group-hover:shadow-lg">
              <div className="bg-[#C2E5FF] rounded-xl mb-4 w-full aspect-[273/370] relative overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <NextImage
                    src={trend4.src}
                    alt="Crafted with precision"
                    layout="responsive"
                    width={273}
                    height={390}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#61657D]">Made just for you</h3>
              <p className="text-sm text-[#61657D] mt-2 mb-4 px-5">
                Unique gifts crafted with your special touch.
              </p>
            </div>
          </div>
        </div>

      </SectionContainer>
    </>
  )
}

export default TrendingSection;