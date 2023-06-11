import React, { useState, useEffect } from 'react';
import { getPosts, getTotalComments } from '@/services';
import { TbSquareRoundedPlusFilled } from 'react-icons/tb';
import Worker from './admin_helper/Worker';

const Admin = () => {
  const [numPosts, setNumPosts] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [picked, setPicked] = useState('Add Post');

  useEffect(() => {
    getPosts().then((result) => setNumPosts(result.length));
    getTotalComments().then((result) => setNumComments(result));
  }, []);

  const adminControls = ['Add Post', 'Categories'];

  return (
    <div className='position-relative'>
      <div className='position-fixed pt-0 pl-0 w-full h-full'></div>
      <div className='container mx-auto px-10 py-10 mb-8 overflow-y-auto'>
        <div className=''>
        <div className='bg-white border-b-4 shadow-lg rounded-lg p-8 mb-8'>
          <div className='flex text-lg mb-8 font-semibold border-b'>
            <h1 className='text-3xl'>Admin</h1>
            <h2 className='flex-1 font-normal text-center'>
              <span className='font-semibold'>{numPosts}</span> Total Posts
            </h2>
            <h2 className='flex-1 font-normal text-center'>
              <span className='font-semibold'>{numComments}</span> Total Comments
            </h2>
          </div>
          <div className='grid grid-cols-2 gap-10'>
            {adminControls.map((title) => (
              <div
                className={`border-none py-6 flex items-center ${
                  title === 'Add Post' ? 'pr-4 justify-end' : 'pl-4 justify-start'
                }`}
              >
                {title === 'Add Post' && (
                  <TbSquareRoundedPlusFilled className='h-[30px] w-[30px] text-red-700 mr-2' />
                )}
                <h1
                  className={picked === title ? 'text-pink-700 cursor-pointer' : 'text-black cursor-pointer'}
                  onClick={() => setPicked(title)}
                >
                  {title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        </div>
        <Worker picked={picked} />
      </div>
    </div>
  );
};

export default Admin;
