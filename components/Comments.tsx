function Comments() {
  return (
    <div className="px-4 sm:px-20 max-w-4xl mx-auto ">
      <form>
        <hr className="max-w-lg my-5 mx-auto border border-[#ffc017]" />
        <p className="text-[#ffc017]">Enjoyed the article?</p>
        <h1 className="text-3xl bold">Leave a comment below!</h1>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <label>
            <span className="">Name</span>
            <input
              className="w-full focus:ring-0 border-gray-400 focus:border-[#ffc017]  shadow-md"
              placeholder="John Appleseed"
              type="text"
            />
          </label>
          <label>
            <span className="">Email</span>
            <input
              className="w-full focus:ring-0 border-gray-400 focus:border-[#ffc017]  shadow-md"
              placeholder="John@appleseed.com"
              type="text"
            />
          </label>
        </div>
        <label>
          <span>Comment</span>
          <textarea
            className="w-full focus:ring-0 border-gray-400 focus:border-[#ffc017]  shadow-md"
            type="text"
            rows={8}
          />
        </label>
      </form>
    </div>
  );
}

export default Comments;
