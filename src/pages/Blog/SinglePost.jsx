import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "../../axios";

const SpinIcon = () => (
  <svg
    className="animate-spin -ml-1 h-8 w-8 md:h-10 md:w-10 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="#000000"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="#000000"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const SinglePost = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => fetchPost(), [params]);

  return (
    <>
      <Navbar />
      <div className="px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-20">
        {loading ? (
          <div className="text-center flex justify-center items-center min-h-screen">
            <SpinIcon />
          </div>
        ) : (
          <div>
            <h5 className="mb-2 mb-8 text-4xl font-extrabold leading-none md:pl-2">
              {post?.title}
            </h5>
            <div className="">{post?.body}</div>
            <div className="flex items-center mt-10">
              <a href="/" aria-label="Author" title="Author" className="mr-3">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="avatar"
                  className="object-cover w-10 h-10 rounded-full shadow-sm"
                />
              </a>
              <div>
                <Link
                  to={`/account/${post.user_id}`}
                  aria-label="Author"
                  title="Author"
                  className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Vasile Melinte
                </Link>
                <p className="text-sm font-medium leading-4 text-gray-600">
                  Author
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost;
