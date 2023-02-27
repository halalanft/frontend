import React from 'react'
import Image from 'next/image'

const CardSpecial = ({ icon, title, description }) => {
  return (
    <div className="card mx-auto bg-white shadow-xl">
      <div className="card-body">
        <div className="card-title text-[#171717]">
          <div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
            <Image
              src={require('../../assets/images/' + icon + '.svg')}
              alt={icon}
              width={20}
              className="self-center items-center "
            />
          </div>
          {title}
        </div>
        <p className="text-[#171717] opacity-[0.68]">{description}</p>
      </div>
    </div>
  )
}

export default CardSpecial
