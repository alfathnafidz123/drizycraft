"use client"
import Button from "@/components/buttons/Button"
import { CityInterface, CountryInterface } from "@/interfaces/dashboard.interface"
import axios from "axios"
import { useEffect, useState } from "react"
import { ImSpinner } from "react-icons/im"

// negara
const Page = () => {
  const [country, setcountry] = useState<CountryInterface[]>([])
  const [getcountry, setgetcountry] = useState('')
  const [loading, setloading] = useState<boolean>(false)


  // useEffect(() => {
  //   getDataCountry()

  // }, [])

  useEffect(() => {
    console.log(country)
  }, [country])




  // kota

  const [city, setcity] = useState<CityInterface[]>([])
  useEffect(() => {
    getDataCity()


  }, [])




  async function getDataCountry() {
    try {
      setloading(true)
      const res = await axios.get(`https://api-dev.talentvibes.io/api/master-data/country?search=${getcountry}&size=50`)
      setcountry(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setloading(false)
    }
  }


  async function getDataCity() {

    const res = await axios.get('https://api-dev.talentvibes.io/api/master-data/city/102?search=&size=500');
    setcity(res.data.data)
  }


  return (

    <div className="flex items-center flex-col gap-2 mt-5 ">
      <input type='text' onChange={(e) => { setgetcountry(e.target.value) }} value={getcountry}></input>
      <Button onClick={(e) => { getDataCountry() }} >Submit</Button>
      {loading && (
        <ImSpinner className='animate-spinn' />
      )}
      {country.map((item, i) => (
        <p key={i}>
          {item.name}
        </p>
      ))}

    </div>





    // <div>
    //   {country.map((item, i) => (
    //     <p key={i}>{item.name}</p>
    //   ))}

    // </div>


    // <div className='text-center grid grid-cols-4'>
    //   {city.map((item, i) => (
    //     <div key={i}>

    //       <h3>{item.name}</h3>
    //       <p>{item.countryId}</p>
    //     </div>

    //   ))}
    // </div>


  );
};

export default Page
