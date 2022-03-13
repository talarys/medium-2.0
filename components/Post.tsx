import { PortableText } from '@portabletext/react';
import { urlFor } from '../sanity';
import { PostType } from '../typings';

interface Props{
    post: PostType,
}

function Post({ post }:Props) {
  return (
    <div>
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
        {/* Comments */}
      </div>
    </div>
  );
}

export default Post;
