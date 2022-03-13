import { GetStaticProps } from 'next';
import { PortableText } from '@portabletext/react';
import { disconnect } from 'process';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post as PostType } from '../../typings';
import Footer from '../../components/Footer';
import Comments from '../../components/Comments';

interface Props{
    post: PostType,
}

function Post({ post }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main>
        {/* Container */}
        <div className="w-full lg:w-4/5 lg:mt-4 mx-auto space-y-2 mb-4">
          {/* Main Image */}
          <img src={urlFor(post.mainImage).url()!} />
          {/* Post */}
          <div className="px-4">
            {/* Title */}
            <h1 className="font-bold text-2xl">{post.title}</h1>
            {/* Author info + date */}
            <div className="flex items-center space-x-2 mt-4 ">
              <img className="rounded-full" src={urlFor(post.author.image).width(40)?.url()!} />
              <p>
                Blog post by
                {' '}
                <span className="text-gray-600">
                  {post.author.name}
                </span>
                {' '}
                - Published at
                {' '}
                {new Date(post._createdAt).toLocaleString()}
              </p>
            </div>
            { /* Description / TLDR */ }
            <p className=" my-4">
              TLDR:
              {' '}
              {post.description}
            </p>
            {/* Main body of article */}
            <PortableText value={post.body} />
            <p />
          </div>
          {/* Comments */}
          <Comments />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Post;

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
