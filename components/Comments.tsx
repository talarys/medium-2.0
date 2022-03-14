import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import type { Comment } from '../typings';

interface IFormarInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  postId: string
  comments: Comment[]
}

function Comments({ postId, comments }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormarInput>();

  const onSubmit: SubmitHandler<IFormarInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success('Comment submitted succesfully.');
        resetField('name');
        resetField('email');
        resetField('comment');
        setSubmitted(true);
      })
      .catch((err) => {
        toast.success('Something went wrong', err);
      });
  };

  return (
    <div className="px-4 sm:px-20 max-w-4xl mx-auto">
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr className="max-w-lg my-5 mx-auto border border-[#ffc017]" />
          {/* Hidden post id  */}
          <input {...register('_id')} type="hidden" name="_id" value={postId} />
          <p className="text-[#ffc017]">Enjoyed the article?</p>
          <h1 className="text-3xl bold">Leave a comment below!</h1>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <label>
              <span className="">Name</span>
              <input
                {...register('name', { required: true })}
                className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${
                  errors.name && 'border-red-500'
                }`}
                placeholder="John Appleseed"
                type="text"
              />
            </label>
            <label>
              <span className="">Email</span>
              <input
                {...register('email', { required: true })}
                className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${
                  errors.email && 'border-red-500'
                }`}
                placeholder="John@appleseed.com"
                type="email"
              />
            </label>
          </div>
          <label>
            <span>Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${
                errors.comment && 'border-red-500'
              }`}
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">
                {' '}
                - The Name Field is required
                {' '}
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                {' '}
                - The Email Field is required
                {' '}
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                {' '}
                - The Comment Field is required
                {' '}
              </span>
            )}
          </div>
          <input
            value="Submit comment"
            type="submit"
            className="shadow hover:bg-yellow-400 bg-[#ffc017] w-full cursor-pointer text-white text-bold px-4 py-2 rounded"
          />
        </form>
      ) : (
        <div className="text-center bg-[#ffc017] text-white p-5">
          <h1 className="text-2xl font-bold">
            Thanks for submitting you comment!
          </h1>
          <p className="text-lg">
            Once it has been approved, it will appear down below!
          </p>
        </div>
      )}
      {/* Comments Section */}
      <div className="shadow mt-4 p-4 shadow-[#ffc017]">
        {comments.length ? (
          <div>
            <h3 className="text-3xl">Comments</h3>
            <hr className="py-1" />
            {comments.map((comment) => (
              <div key={comment._id}>
                <div className="flex space-x-2">
                  <p className="font-semibold text-[#ffc017]">{`${comment.name} :`}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl">
              Sorry there are no comments for this post
            </h3>
            <h3 className="text-xl">
              Be the first one to leave one
            </h3>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Comments;
