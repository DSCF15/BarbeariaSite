import React from 'react'

export default function ProductCard({ title, price, desc, cta }){
  return (
    <div className="p-6 rounded-lg shadow card-hover bg-white/5">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-4">{desc}</p>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{price}</div>
        <button className="px-4 py-2 rounded btn-accent">{cta || 'Agendar'}</button>
      </div>
    </div>
  )
}
