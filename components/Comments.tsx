import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormarInput{
  _id:string;
  name:string;
  email:string;
  comment:string;
}

function Comments({ postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormarInput>();

  const onSubmit: SubmitHandler<IFormarInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((d) => console.log(d))
      .catch((err) => console.error(err));
  };

  return (
    <div className="px-4 sm:px-20 max-w-4xl mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr className="max-w-lg my-5 mx-auto border border-[#ffc017]" />
        {/* Hidden post id  */}
        <input
          {...register('_id')}
          type="hidden"
          name="_id"
          value={postId}

        />
        <p className="text-[#ffc017]">Enjoyed the article?</p>
        <h1 className="text-3xl bold">Leave a comment below!</h1>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <label>
            <span className="">Name</span>
            <input
              {...register('name', { required: true })}
              className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${errors.name && 'border-red-500'}`}
              placeholder="John Appleseed"
              type="text"
            />
          </label>
          <label>
            <span className="">Email</span>
            <input
              {...register('email', { required: true })}
              className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${errors.email && 'border-red-500'}`}
              placeholder="John@appleseed.com"
              type="email"
            />
          </label>
        </div>
        <label>
          <span>Comment</span>
          <textarea
            {...register('comment', { required: true })}
            className={`w-full focus:ring-0 border-gray-400 focus:border-[#ffc017] shadow-md rounded ${errors.comment && 'border-red-500'}`}
            rows={8}
          />
        </label>
        <div className="flex flex-col p-5">
          {errors.name && (
            <span className="text-red-500"> - The Name Field is required </span>
          )}
          {errors.email && (
            <span className="text-red-500"> - The Email Field is required </span>
          )}
          {errors.comment && (
            <span className="text-red-500"> - The Comment Field is required </span>
          )}
        </div>
        <input
          type="submit"
          className="shadow hover:bg-yellow-400 bg-[#ffc017] w-full cursor-pointer text-white text-bold px-4 py-2 rounded"
        />
      </form>
    </div>
  );
}

export default Comments;
