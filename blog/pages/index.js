import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostCard, Categories, PostWidget, Loader } from '../components';
import { getPosts } from '../services';

export default function Home({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (
            <PostCard post={post.node} title={post.title} />
          ))}
        </div>
        <div className='lg:col-span-4 clo-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getPosts() || [];

  return {
    props: { posts }
  };
}
