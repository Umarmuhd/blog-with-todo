import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/posts");
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => fetchPosts(), []);

  return (
    <>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="mb-10 border-t border-b divide-y">
          {posts.map((post) => (
            <div key={post.id} className="grid py-8 sm:grid-cols-4">
              <div className="mb-4 sm:mb-0">
                <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                  <a
                    href="/"
                    className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    aria-label="Category"
                  >
                    Books
                  </a>
                  <p className="text-gray-600">5 Jan 2020</p>
                </div>
              </div>
              <div className="sm:col-span-3 lg:col-span-2">
                <div className="mb-3">
                  <Link
                    to={`/blog/${post.id}`}
                    aria-label="Article"
                    className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                      {post.title}
                    </p>
                  </Link>
                </div>
                <p className="text-gray-700">{post.body.slice(0, 100)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            See all articles
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
