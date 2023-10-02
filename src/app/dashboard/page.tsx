import { CountryInterface } from '@/interfaces/dashboard.interfaces';

async function getCountries(): Promise<CountryInterface[]> {
  const res = await fetch(`http://localhost:3000/api/country?q=ind`);
  const countries = await res.json();
  return countries;
}

const DashboardPage = async () => {
  const countries = await getCountries();

  return (
    <div className='flex w-80 flex-col gap-2 p-5'>
      {countries.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}
    </div>
  );
};

export default DashboardPage;
