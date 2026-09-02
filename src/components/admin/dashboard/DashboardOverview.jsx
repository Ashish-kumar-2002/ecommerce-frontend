import React from 'react'
import { formatRevenue } from '../../../utils/formatPrice';
const DashboardOverview = ({title,amount,Ican,revenue = false}) => {

    const convertedAmont = revenue ? Number(amount).toFixed(2):amount;
  return (
   
    <>
    <div className='x1:w-80 w-full space-y-4 text-center md:text-start px-5 py-8 '>
        <div className='flex md:justify-start justify-center items-center gap-2'>
            <h3 className='uppercase text-2xl text-slate-700 font-semibold'>{title}</h3>
            <Ican  className="text-slate-800 text-2xl"/>
        </div>
        <div className='font-bold text-slate-800 text-3xl'>
            {revenue ? "$" : null}
            {revenue ? formatRevenue(convertedAmont):convertedAmont}
        </div>
    </div>
    </>

  )
}

export default DashboardOverview;
