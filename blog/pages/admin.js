import React, { useState, useEffect } from 'react'
import { getPosts, getTotalComments } from '@/services'

const Admin = () => {
    const [numPosts, setNumPosts] = useState(0)
    const [numComments, setNumComments] = useState(0)

    useEffect(() => {
      getPosts().then((result) => setNumPosts(result.length))

      getTotalComments().then((result) => setNumComments(result))
    }, [])
    

    const adminControls = ['New Post', 'Categories']
  return (
    <div className='position-relative'>
  <div className='position-fixed pt-0 pl-0 w-[100%] h-[100%] bg-red-900 bg-opacity-80'></div>
  <div className='container mx-auto px-10 mb-8'>
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h1 className='flex text-lg mb-8 font-semibold border-b pb-4'>
        <span className='text-3xl font-bold'>Admin</span>
        <h2 className="flex-1 font-normal text-center">
          <span className='font-semibold'>{numPosts}</span> Total Posts
        </h2>
        <h2 className="flex-1 font-normal text-center">
          <span className='font-semibold'>{numComments}</span> Total Comments
        </h2>
      </h1>
      <div>
        {/* Add your content here */}
      </div>
    </div>
  </div>
</div>

  )
}

export default Admin
