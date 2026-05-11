import React from 'react'
import useDailyStore from '../store/dailyStore';
import { useEffect } from 'react';
import useAuthStore from '../store/AuthStore';

const Water = () => {
  const { waterData, addWater, getWater } = useDailyStore();
  const{user}=useAuthStore();
 useEffect(() => {
  if (user?._id) {
    getWater();
  }
}, [user?._id]);

  return (
<>
{/* Water Tracker */}
<div className="bg-white rounded-2xl shadow-md p-6 border mt-10">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        Water Intake 💧
      </h2>

      <p className="text-gray-500 mt-1">
        Stay hydrated throughout the day
      </p>
    </div>

    <div className="text-right">
      <p className="text-3xl font-bold text-cyan-500">
        {waterData?.amount || 0} ml
      </p>

      <p className="text-gray-500 text-sm">
        Goal: {waterData?.goal || 2000} ml
      </p>
    </div>
  </div>

  {/* Progress */}
  <div className="w-full bg-gray-200 rounded-full h-4 mt-6 overflow-hidden">
    <div
      className="bg-cyan-500 h-4 rounded-full transition-all duration-500"
      style={{
        width: `${waterData?.progress || 0}%`,
      }}
    ></div>
  </div>

  <div className="flex items-center justify-between mt-3">
    <p className="text-gray-500">
      Remaining:
      <span className="font-semibold ml-2">
        {waterData?.remaining || 0} ml
      </span>
    </p>

    <p className="font-semibold text-cyan-500">
      {waterData?.progress || 0}%
    </p>
  </div>

  {/* Buttons */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
    <button
      onClick={async () => {
        await addWater(250);
        getWater();
      }}
      className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-all"
    >
      +250 ml
    </button>

    <button
      onClick={async () => {
        await addWater(500);
        getWater();
      }}
      className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-all"
    >
      +500 ml
    </button>

    <button
      onClick={async () => {
        await addWater(750);
        getWater();
      }}
      className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-all"
    >
      +750 ml
    </button>

    <button
      onClick={async () => {
        await addWater(1000);
        getWater();
      }}
      className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-all"
    >
      +1L
    </button>
  </div>
</div>
</>
  )
}

export default Water