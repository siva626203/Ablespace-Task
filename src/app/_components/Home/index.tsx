'use client'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
function Index() {
  const [data,setData]=useState([])
  const [search, setSearch] = useState<number | undefined>(1);
  const [query,setQuery]=useState([])
  const [input,setInput]=useState("")
  const inpuRef=useRef()
  useEffect(()=>{
    axios.get(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
    ).then((res:any)=>{
      setData(res.data.results)
      console.log(res.data)
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  },[search])
  const Search=(e:any)=>{
    setInput(e)
    if(e===""){
      setSearch(Math.random())
      setQuery([])
    }else{
      setQuery([]);
const filteredData: any = data.filter((item) => {
  
  setQuery((prev) => [...prev, item.name]);
  return Object.values(item).join("").toLowerCase().includes(e.toLowerCase());
});
setData(filteredData);
    }
    

  }
  const select=(e:any)=>{
    console.log(e)
    setQuery([document.getElementById("se")?.innerHTML]);
    setInput(document.getElementById('se')?.innerHTML)
    Search(document.getElementById("se")?.innerHTML);
  }
  return (
    <div className="relative overflow-x-auto">
      <input
        type="text"
        className="border-2 rounded-md border-spacing-5 border-cyan-400"
        value={input}
        onChange={(e) => Search(e.target.value)}
        placeholder="search..."
        id="in"
        ref={inpuRef}
      />
      <span className='absolute'>
        {query.map((e) => {
          return (
            <ul
              className="bg-slate-400"
              id="se"
              onClick={(e) => select(e)}
            >
              {e}
            </ul>
          );
        })}
      </span>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              city
            </th>
            <th scope="col" className="px-6 py-3">
              country
            </th>
            <th scope="col" className="px-6 py-3">
              timezone
            </th>
            <th scope="col" className="px-6 py-3">
              population
            </th>
            <th scope="col" className="px-6 py-3">
              timezone
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" className="px-6 py-4">
                  <Link href={`/weather/${e.name}`}>{e.name}</Link>
                </td>
                <td scope="row" className="px-6 py-4">
                  {e.cou_name_en}
                </td>
                <td className="px-6 py-4">{e.timezone}</td>
                <td className="px-6 py-4">{e.population}</td>
                <td className="px-6 py-4">{e.timezone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Index