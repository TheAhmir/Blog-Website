import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/services';

const Categories = ({ currentCategory }) => {
  const [categories, setCategories] = useState([]);
  const [curCat, setCurCat] = useState('');

  const updateCategory = (someCategory) => {
    setCurCat(someCategory);
  };

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Categories</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span
            onClick={() => updateCategory(category.name)} // Use a callback function here
            className={`cursor-pointer block pb-3 mb-3 ${
              curCat ? (curCat === category.name ? 'text-pink-600' : 'text-gray-600') : ''
            }`}
          >
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
