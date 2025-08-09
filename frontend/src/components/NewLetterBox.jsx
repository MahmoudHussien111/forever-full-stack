import React from 'react'

const NewLetterBox = () => {
  return (
    <div className='text-center my-8'>
        <div className="m-auto space-y-3">
            <h1 className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</h1>
            <p className='text-gray-400'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <form className='w-full sm:w-1/2 border flex items-center border-gray-200 pl-3 mx-auto gap-3'>
                <input type="text" placeholder='Enter Your Email' className='w-full flex-1 outline-none' />
                <input type="submit" className='px-10 text-xs py-4 bg-black text-white' value="SUBSCRIBE" />
            </form>
        </div>
    </div>
  )
}

export default NewLetterBox