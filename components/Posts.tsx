import Link from 'next/link';
import { urlFor } from '../sanity';
import type { PostType } from '../typings';

interface Props{
  posts:[PostType]
}

function Posts({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-5 cursor-pointer max-w-[1500px] mx-auto">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`} passHref>
          {/* Post  */}
          <div className="shadow-md overflow-hidden border rounded-lg group">
            <img
              className="group-hover:scale-105 transition ease-in-out w-full"
              src={urlFor(post.mainImage).url()!}
            />
            <div className="flex space-y-2 bg-white justify-between p-2">
              <p className="font-semibold">{post.title}</p>
              <img
                className="w-12 h-12 rounded-full"
                src={urlFor(post?.author?.image).url()!}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
