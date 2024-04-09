'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
function weather() {
    const {city}=useParams()
    const [data, setData] = useState({
      base: "",
      clouds: { all: 0 },
      cod: 0,
      coord: { lat: 0 },
      dt: 0,
      id: 0,
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
      },
      name: "",
      sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      visibility: 0,
      weather: [],
      wind: { speed: 0, deg: 0 },
    });
    const APPID = "d745b0fe17c07075a92102e50fb05bcf";
    useEffect(()=>{
        axios.get("https://api.openweathermap.org/data/2.5/weather",{params:{q:city.toString().trim(),APPID:APPID}})
        .then((res:any)=>{
            console.log(res.data)
            setData(res.data)
            toast.success("Data Fetched");
        }).catch((err)=>{
          toast.error("this city not available Database")
        })
    },[])
  return (
    <div>
      <ToastContainer />
      <h1 className="text-center">Weather Page</h1>
      <div
        className={
          data?.main?.temp <= 100
            ? `bg-blue-300`
            : data?.main?.temp <= 200
            ? `bg-blue-100`
            : data?.main?.temp <= 300
            ? `bg-orange-300`
            : data?.main?.temp >= 301
            ? `bg-red-300`
            : null
        }
      >
        <h2>City: {data?.name}</h2>
        <h2>Country:{data?.sys?.country}</h2>
        <h2>Temperature : {Math.round(data?.main?.temp - 273.15)}%C</h2>
        <h2>
          weather description:
          {data?.weather.map((e:any) => {
            return e.description;
          })}
        </h2>
        <h2> humidity:{data?.main?.humidity}</h2>
        <h2>wind speed:{data?.wind?.speed}</h2>
        <h2>
          atmospheric:
          {data?.weather?.map((e:any) => {
            return e.main;
          })}
        </h2>
        <h2> pressure:{data?.main?.pressure}</h2>
      </div>
    </div>
  );
}

export default weather