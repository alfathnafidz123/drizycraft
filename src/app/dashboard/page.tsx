"use client"

import { CityInterface, CountryInterface } from "@/interfaces/dashboard.interface"
import { useState, useEffect } from "react"
import axios from 'axios';
import Button from "@/components/buttons/Button";
import { ImSpinner } from "react-icons/im";


const Page = () => {

  const [getCountry, setgetCountry] = useState("")
  const [loading, setloading] = useState<boolean>(false)

  // const [city, setcity] = useState<CityInterface[]>([])
  // useEffect(() => {
  //   getDataCity()
  // }, [])

  // useEffect(() => {
  //   console.log(city)
  // }, [city])


  // async function getDataCity() {
  //   const res = await axios.get("https://api-dev.talentvibes.io/api/master-data/city/102?search=&size=50")
  //   setcity(res.data.data)
  // }


  const [country, setcountry] = useState<CountryInterface[]>([])
  // useEffect(() => {
  //   getDataCountry()
  // }, [])

  useEffect(() => {
    console.log(country)
  }, [country])

  async function getDataCountry() {
    try {
      setloading(true);
      const res = await axios.get(`https://api-dev.talentvibes.io/api/master-data/country?search=${getCountry}&size=50`);
      setcountry(res.data.data);
    } catch (error) {
      console.error(error)
    } finally {
      setloading(false)
    }
  };


  return (
    // <div className="w-full gap-5 mt-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 p-4">
    //   {city.map((item) => (
    //     <div className="bg-transparent border-2 border-red-600 px-6 py-7 rounded-xl hover:bg-red-600 hover:text-white transition duration-200 ease-in">
    //       <ul>
    //         <li key={item.id}>
    //           <h4>{item.name} (id: {item.id})</h4>
    //           <p>Country id: {item.countryId}</p>
    //         </li>
    //       </ul>
    //     </div>
    //   ))}
    // </div>

    <div className="flex items-center flex-col gap-2 mt-6">
      <input type="text" onChange={(e) => { setgetCountry(e.target.value) }} value={getCountry} ></input>
      <Button onClick={() => { getDataCountry() }}>Submit</Button>
      {loading && (
        <ImSpinner className="animate-spin" />
      )}

      {country.map((item, i) => (
        <p key={i}>
          {item.name}
        </p>
      ))}
    </div>
  )
}

export default Page