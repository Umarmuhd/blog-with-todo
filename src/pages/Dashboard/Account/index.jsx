import Navbar from "../../../components/Navbar";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "../../../axios";

export default function Account() {
  const params = useParams();
  const [user, setUser] = useState(null);
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

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users/${params.id}`);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => fetchUser(), [params]);

  return (
    <div>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {user?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-lg">
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
          </div>
        </section>
      </main>
    </div>
  );
}
