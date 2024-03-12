import React from 'react'
import { MdLocationOn } from 'react-icons/md';

export default function Page1({weatherData }) {

  return (
    <div className="" 
    >
    
      <div className='flex space-x-3 items-center pt-32 pl-10 '>
      <div className='text-white'><MdLocationOn /></div>
      <p className='text-white text-xs'>CURRENT LOCATION</p>

      </div>
      {weatherData && (
        <div className='pl-8'>
          <p className='text-white font-semibold text-4xl pt-12'>{weatherData.city.name},</p>
          <p className='text-white font-semibold text-4xl pt-4'>{weatherData.city.fullCountryName}</p>
          
        </div>
      )}
    </div>
  )
}
