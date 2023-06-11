import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { getCategories } from '@/services'
import { useRouter } from 'next/router';

const Header = () => {
    const [categories, setCategories] = useState([])
    const router = useRouter();
    const isSlugAdmin = router.asPath === '/admin';

    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories))
    }, [])
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href='/'>
                    <span className={!isSlugAdmin ? 'cursor-pointer font-bold text-4xl text-white' : 'cursor-pointer font-bold text-4xl text-black'}>
                        A Blogger's Blog
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
            {isSlugAdmin ?? categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
            {category.name}
          </span>
        </Link>
      ))}
            </div>
        </div>
    </div>
  )
}

export default Header