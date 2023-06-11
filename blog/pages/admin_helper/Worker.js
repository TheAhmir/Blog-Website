import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { submitComment, submitImage } from '@/services'

// Dynamically import QuillEditor component only on the client-side
const QuillEditor = dynamic(() => import('../../components/QuillEditor'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const Worker = ({ picked }) => {
  const [image, setImage] = useState(null);
  const title = useRef();
  const [body, setBody] = useState('');
  const summary = useRef();

  const handleBodyChange = (text) => {
    setBody(text);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const removeHTMLTags = (html) => {
    console.log(html)
    const tmp = document.createElement('div');
    tmp.innerHTML = html.replace(/\n+/g, '<br>');
    return tmp.textContent || tmp.innerText || '';
  };

  const downloadTextFile = () => {
    const formattedBody = removeHTMLTags(body);
    const element = document.createElement('a');
  
    // Create a new FileReader instance
    const reader = new FileReader();
  
    // Read the image file as a data URL
    reader.readAsDataURL(image);
  
    // When the file is loaded
    reader.onloadend = () => {
      // Retrieve the data URL
      const imageDataURL = reader.result;
  
      const fileContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title.current.value}</title>
          </head>
          <body>
            <img src="${imageDataURL}" alt="Image">
            <h1>${title.current.value}</h1>
            <div>${body}</div>
            <p>${summary.current.value}</p>
          </body>
        </html>
      `;
  
      const file = new Blob([fileContent], { type: 'text/html' });
      element.href = URL.createObjectURL(file);
      element.download = 'myFile.html';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };
  };
  
  

  const submissionHandler = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    const temp = title.current.value
    const slug = temp.replace(/\s+/g, '-')

    console.log(body)
    downloadTextFile()
    reader.onloadend = () => {
        submitImage(reader.result)
    }
  };

  return (
    picked === 'Add Post' ? (
      <div>
        <div className='bg-white shadow-lg rounded-lg pt-8 mb-4'>
          <div className='px-10 pb-8 text-center'>
            <h1 className='pb-4 text-xl font-semibold'>Image Upload</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />

          </div>
        </div>
        <div className='bg-white w-fit mx-auto shadow-lg rounded-lg pt-8'>
          <div className='px-10 pb-8 text-center'>
            <h1 className='pb-4 text-xl font-semibold'>Title</h1>
            <input
              type="text"
              ref={title}
              className="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text"
            />
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-lg pt-8 mt-4 relative'>
          <div className='px-10 pb-8'>
            <h1 className='pb-4 text-xl font-semibold text-center'>Post Body</h1>
            <div className='border-2'>
              {/* Render QuillEditor component only on the client-side */}
              {typeof window !== 'undefined' && <QuillEditor value={body} onChange={handleBodyChange} />}
            </div>
          </div>
        </div>

        <div className='bg-white shadow-lg rounded-lg pt-8 mt-4 relative'>
          <div className='px-10 pb-8 text-center'>
            <h1 className='pb-4 text-xl font-semibold'>Summary</h1>
            <textarea
              type="text"
              ref={summary}
              className="px-2 py-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text"
            />
          </div>
        </div>
        <div className='w-fit mx-auto pt-6'>
          <button
            type="button"
            onClick={submissionHandler}
            className='transition duration-500 ease hover:bg-green-600 bg-indigo-900 inline-block text-lg rounded-full text-white px-8 py-3 cursor-pointer'
          >Post Comment</button>
        </div>
      </div>
    ) : (
      <p>{picked}</p>
    )
  );
};

export default Worker