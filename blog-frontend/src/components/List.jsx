import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import Post from "./Post";
import Create from "./Create";
import Edit from "./Edit";
import blogApi from "../api/blogApi";

const List = () => {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validateErr, setValidateErr] = useState({});

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await blogApi.get("/blog");
      setPosts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const savePost = async (e) => {
    e.preventDefault();
    const t = titleRef.current?.value;
    const c = contentRef.current?.value;

    if (!t || !c) {
      setValidateErr({
        title: !t ? "Required" : "",
        content: !c ? "Required" : "",
      });
      return;
    }

    try {
      await blogApi.post("/blog", { title: t, content: c }); // token included automatically
      fetchPosts();
      setIsCreate(false);
      setValidateErr({});
      titleRef.current.value = "";
      contentRef.current.value = "";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to save post. Make sure you are logged in.");
    }
  };

  const editPost = (id) => {
    const post = posts.find((p) => p.id === id);
    setEditId(id);
    setTitle(post.title);
    setContent(post.content);
    setIsEdit(true);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const t = titleRef.current?.value;
    const c = contentRef.current?.value;

    if (!t || !c) {
      setValidateErr({
        title: !t ? "Required" : "",
        content: !c ? "Required" : "",
      });
      return;
    }

    try {
      await blogApi.put(`/blog/${editId}`, { title: t, content: c });
      fetchPosts();
      setIsEdit(false);
      setEditId(null);
      setValidateErr({});
      titleRef.current.value = "";
      contentRef.current.value = "";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update post.");
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await blogApi.delete(`/blog/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete post.");
    }
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditId(null);
    setValidateErr({});
  };

  if (isCreate)
    return (
      <Create
        titleRef={titleRef}
        contentRef={contentRef}
        saveTitleToState={(e) => setTitle(e.target.value)}
        saveContentToState={(e) => setContent(e.target.value)}
        savePost={savePost}
        cancelCreate={() => setIsCreate(false)}
        validateErr={validateErr}
      />
    );

  if (isEdit)
    return (
      <Edit
        title={title}
        content={content}
        titleRef={titleRef}
        contentRef={contentRef}
        saveTitleToState={(e) => setTitle(e.target.value)}
        saveContentToState={(e) => setContent(e.target.value)}
        updatePost={updatePost}
        cancelEdit={cancelEdit}
        validateErr={validateErr}
      />
    );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Blog Posts</h1>

        {user ? (
          <div>
            <button
              className="btn btn-warning fw-bold me-2"
              onClick={() => setIsCreate(true)}
            >
              <i className="fas fa-plus me-1"></i> Create New Post
            </button>
            <button
              className="btn btn-danger fw-bold"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline-warning fw-bold">
            Login to create a post
          </Link>
        )}
      </div>

      <div className="row g-3">
        {posts.length === 0 ? (
          <p className="text-center fw-bold">No posts yet.</p>
        ) : (
          posts.map((post, idx) => (
            <Post
              key={post.id}
              user={user}
              index={idx + 1}
              {...post}
              editPost={() => editPost(post.id)}
              deletePost={() => deletePost(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default List;
