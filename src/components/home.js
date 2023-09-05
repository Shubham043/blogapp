import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

function BlogList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("https://electro-bkend.onrender.com/api/posts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data.body);
                setPosts(response.data.body);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const handleDeletePost = async (postId) => {
        const confirmation = window.confirm(" Are you sure you want to delete");
        if(confirmation){  
             try {
                 const response = await axios.delete(
                     `https://electro-bkend.onrender.com/api/posts/${postId}`,
                     {
                         headers: {
                             Authorization: `Bearer ${localStorage.getItem(
                                 "token"
                             )}`,
                         },
                     }
                 );
                 console.log(response.data);
                 // Remove the deleted post from the state
                 setPosts(posts.filter((post) => post._id !== postId));
             } catch (error) {
                 console.error(error);
             }
        }
      
    };

    const handledone = async (postId) => {
      console.log(postId);
      try {
        
          const response = await axios.patch(
              `https://electro-bkend.onrender.com/api/posts/${postId}`,
              { done: true }, 
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                          "token"
                      )}`,
                  },
              }
          );
  
          console.log(response.data);
          const updatedPosts = posts.map((post) =>
              post._id === postId ? { ...post, done: true } : post
          );
          setPosts(updatedPosts);
      } catch (error) {
          console.error(error);
      }
  };
  

    const handleUpdatePost = async (postId, updatedPost = {}) => {
        try {
            const newTitle = prompt("Enter a new title:", updatedPost.title);
            const newDescription = prompt(
                "Enter a new description:",
                updatedPost.description
            );
            const updatedData = {
                title: newTitle,
                description: newDescription,
            };
            const response = await axios.put(
                `https://electro-bkend.onrender.com/api/posts/${postId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(response.data);
         
            const updatedPosts = posts.map((post) =>
                post._id === postId ? response.data.body : post
            );
            setPosts(updatedPosts);
            navigate("/postform");
        } catch (error) {
            console.error(error);
        }
    };

    const donePosts = posts.filter((post) => post.done === true);
    console.log(donePosts);
    const notDonePosts = posts.filter((post) => post.done === false);

    return (
        <div className="home">
            <div>
                <h2>Todo List</h2>

                <div className="post-table">
                    {posts.map((post, index) => (
                        <div className="post-card" key={index}>
                            <div className="head">
                                <h3>{post.title}</h3>
                                <button onClick={()=>handledone(post._id)}>Done</button>
                            </div>
                            <p>{post.description}</p>


                            <div className="icons">
                                <span className="created"> Created At:{post.createdAt}</span>
                                <i
                                    className="icon1"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
                                            fill="rgba(238,16,16,1)"
                                        ></path>
                                    </svg>
                                </i>
                                <i
                                    className="icon2"
                                    onClick={() => handleUpdatePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path d="M19.0007 3.9993C18.3797 3.9993 17.7647 4.1743 17.2947 4.4443L15.5357 6.2033L17.7967 8.4643L19.5557 6.7033C19.9267 6.3323 20.0007 5.8223 19.7807 5.3893L20.7107 4.4603C20.4587 4.2083 20.1587 4.0283 19.8387 3.9383C19.6487 3.8893 19.3287 3.9993 19.0007 3.9993ZM14.2357 7.4843L3.5007 18.2193V20.9993H6.2807L17.0157 10.2653L14.2357 7.4843ZM2.58968 17.3853C2.29968 17.6753 2.10368 18.0543 2.02668 18.4573L1.06168 22.4093L5.01368 21.4443C5.41668 21.3673 5.79468 21.1703 6.08368 20.8813L18.7077 8.2563C19.2877 7.6763 19.2877 6.7363 18.7077 6.1563L16.5737 4.0223C15.9937 3.4423 15.0537 3.4423 14.4737 4.0223L2.58968 17.3853Z" />
                                    </svg>
                                </i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border"></div>
            <div>
                <h2>Doing</h2>
                <div className="post-table">
                    {notDonePosts.map((post, index) => (
                        <div className="post-card" key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <div className="icons">
                                <i
                                    className="icon1"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
                                            fill="rgba(238,16,16,1)"
                                        ></path>
                                    </svg>
                                </i>
                                <i
                                    className="icon2"
                                    onClick={() => handleUpdatePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path d="M19.0007 3.9993C18.3797 3.9993 17.7647 4.1743 17.2947 4.4443L15.5357 6.2033L17.7967 8.4643L19.5557 6.7033C19.9267 6.3323 20.0007 5.8223 19.7807 5.3893L20.7107 4.4603C20.4587 4.2083 20.1587 4.0283 19.8387 3.9383C19.6487 3.8893 19.3287 3.9993 19.0007 3.9993ZM14.2357 7.4843L3.5007 18.2193V20.9993H6.2807L17.0157 10.2653L14.2357 7.4843ZM2.58968 17.3853C2.29968 17.6753 2.10368 18.0543 2.02668 18.4573L1.06168 22.4093L5.01368 21.4443C5.41668 21.3673 5.79468 21.1703 6.08368 20.8813L18.7077 8.2563C19.2877 7.6763 19.2877 6.7363 18.7077 6.1563L16.5737 4.0223C15.9937 3.4423 15.0537 3.4423 14.4737 4.0223L2.58968 17.3853Z" />
                                    </svg>
                                </i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border"></div>
            <div>
                <h2>Done</h2>
                <div className="post-table">
                    {donePosts.map((post, index) => (
                        <div className="post-card" key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <div className="icons">
                                <i
                                    className="icon1"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
                                            fill="rgba(238,16,16,1)"
                                        ></path>
                                    </svg>
                                </i>
                                <i
                                    className="icon2"
                                    onClick={() => handleUpdatePost(post._id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path d="M19.0007 3.9993C18.3797 3.9993 17.7647 4.1743 17.2947 4.4443L15.5357 6.2033L17.7967 8.4643L19.5557 6.7033C19.9267 6.3323 20.0007 5.8223 19.7807 5.3893L20.7107 4.4603C20.4587 4.2083 20.1587 4.0283 19.8387 3.9383C19.6487 3.8893 19.3287 3.9993 19.0007 3.9993ZM14.2357 7.4843L3.5007 18.2193V20.9993H6.2807L17.0157 10.2653L14.2357 7.4843ZM2.58968 17.3853C2.29968 17.6753 2.10368 18.0543 2.02668 18.4573L1.06168 22.4093L5.01368 21.4443C5.41668 21.3673 5.79468 21.1703 6.08368 20.8813L18.7077 8.2563C19.2877 7.6763 19.2877 6.7363 18.7077 6.1563L16.5737 4.0223C15.9937 3.4423 15.0537 3.4423 14.4737 4.0223L2.58968 17.3853Z" />
                                    </svg>
                                </i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogList;
