import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { sanityClient } from '../../sanity';
import { PostType } from '../../typings';
import Footer from '../../components/Footer';
import Comments from '../../components/Comments';
import Post from '../../components/Post';

interface Props{
    post: PostType,
}

function PostPage({ post }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="max-w-[1500px] lg:w-4/5 lg:mt-4 mx-auto space-y-2 mb-4">
        <Post post={post} />
        <Comments comments={post.comments} postId={post._id} />
      </main>
      <Footer />
    </div>
  );
}

export default PostPage;

export const getStaticPaths = async () => {
  const query = /* groq */ `*[_type == 'post']{
 _id,
  slug {
      current
  }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map(
    (post:PostType) => ({ params: { slug: post.slug.current } }),
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = /* groq */ `
  *[_type=='post' && slug.current==$slug][0]{
      _id,
      _createdAt,
    title,
    author->{
      name,
      image
    },
     'comments':*[
      _type=='comment' 
      && post._ref==^._id
      && approved==true
    ],
    description,
    mainImage,
    slug,
    body,
  }
  `;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60,
  };
};
