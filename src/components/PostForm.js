import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./post.css";

function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://electro-bkend.onrender.com/api/posts",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsSubmitted(true);
      window.alert("Post created successfully!");
      navigate("/bloglist")
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card">
      <h1>Create your task</h1>
      <form onSubmit={handleSubmit}>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required/>
        </label>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostForm;
