import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, PostWidget, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const [category, setCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const url = window.location.pathname;
    const stringAfterLastSlash = url.split('/');
    const categorySlug = stringAfterLastSlash[stringAfterLastSlash.length - 1];
    setCategory(categorySlug);
  }, []);

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {category && <PostWidget categories={[category]} />}
            <Categories currentCategory={category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
