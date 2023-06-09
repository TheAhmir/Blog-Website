import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getPosts, getPostDetails } from '@/services';

import { PostDetail, Categories, Author, Comments, CommentsForm, PostWidget, Loader } from '../../components';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponents(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm post={post} slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            {showComponents && (
              <>
                <PostWidget  />
                <Categories />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
