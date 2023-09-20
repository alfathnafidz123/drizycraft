'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';

import Button from '@/components/buttons/Button';

import {cityInterface,countryInterface,} from '@/interfaces/dashboard.interface';

const Page = () => {
  const [getCountry, setGetCountry] = useState('');
  const [loading, setLoading] = useState<boolean>(false)

  // Country
  const [country, setCountry] = useState<countryInterface[]>([]);

  // useEffect(() => {
  //   getDataCountry();
  // }, []);

  useEffect(() => {
    console.log(country);
  }, [country]);

  async function getDataCountry() {
    try {
    setLoading(true)
    const res = await axios.get(
      `https://api-dev.talentvibes.io/api/master-data/country?search=${getCountry}&size=50`)
      setCountry(res.data.data)
    } catch(error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
    
  }
  

  // City
  const [city, setCity] = useState<cityInterface[]>([]);

  useEffect(() => {
    getDataCity();
  }, []);

  useEffect(() => {
    console.log(city);
  }, [city]);

  async function getDataCity() {
    const res = await axios.get(
      `https://api-dev.talentvibes.io/api/master-data/city/102?search=&size=50`
    );
    setCity(res.data.data);
  }

  return (
    <div className='mt-2 flex flex-col items-center gap-2'>
      <input type='text' onChange={(e) => {setGetCountry(e.target.value)}}value={getCountry}/>

      <Button onClick={(e) => {getDataCountry()}}> Cari </Button>

      {loading && (
        <ImSpinner className='animate-spin'/>
      )}
      {country.map ((item,i) => (
        <p key={i}>
          {item.name}
        </p>
      ))
      
      }

    </div>

    // <div className="container mx-auto">
    //   <div className="flex">
    //     <div className="w-full self-start text-center"><h1>List of Countries</h1>
    //   <ul>
    //     {country.map((countryItem) => (
    //       <li key={countryItem.id}>{countryItem.name}</li>
    //     ))}
    //   </ul>
    //   </div>
    //   <div className="w-full self-end text-center"><h1>List of Cities</h1>
    //   <ul>
    //     {city.map((cityItem) => (
    //       <li key={cityItem.id}>{cityItem.name}</li>
    //     ))}
    //   </ul></div>
    //   </div>

    // <div className='container mx-auto flex'>
    //   <div className='w-full self-start text-center'>
    //     {country.map((item, i) => (
    //       <h1 key={i}>{item.name}</h1>
    //     ))}
    //   </div>

    //   <div className='w-full self-end text-center'>
    //     {city.map((item, i) => (
    //       <h1 key={i}>{item.name}</h1>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Page;
