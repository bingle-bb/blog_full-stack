import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Create from "./Create";
import Post from "./Post";
import Edit from "./Edit";
import blogApi from "../api/blogApi"; // ← import global axios

const List = () => {
  const { theme } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [validateErr, setValidateErr] = useState({});

  const getTitle = useRef();
  const getContent = useRef();

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await blogApi.get("/blog"); // ← use global axios
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleCreate = () => setIsCreate(!isCreate);

  const editPost = (id) => {
    const post = posts.find((p) => p.id === id);
    setEditId(id);
    setTitle(post.title);
    setContent(post.content);
    setIsEdit(true);
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await blogApi.delete(`/blog/${id}`);
      fetchPosts();
    }
  };

  const saveTitleToState = (e) => setTitle(e.target.value);
  const saveContentToState = (e) => setContent(e.target.value);

  const savePost = async (event) => {
    event.preventDefault();
    const titleVal = getTitle.current?.value;
    const contentVal = getContent.current?.value;

    if (!titleVal || !contentVal) {
      const err = {};
      if (!titleVal) err.title = "This field is required!";
      if (!contentVal) err.content = "This field is required!";
      setValidateErr(err);
      return;
    }

    await blogApi.post("/blog", { title: titleVal, content: contentVal });
    fetchPosts();
    getTitle.current.value = "";
    getContent.current.value = "";
    setValidateErr({});
    setIsCreate(false);
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const titleVal = getTitle.current?.value;
    const contentVal = getContent.current?.value;

    if (!titleVal || !contentVal) {
      const err = {};
      if (!titleVal) err.title = "This field is required!";
      if (!contentVal) err.content = "This field is required!";
      setValidateErr(err);
      return;
    }

    await blogApi.put(`/blog/${editId}`, {
      title: titleVal,
      content: contentVal,
    });
    fetchPosts();
    getTitle.current.value = "";
    getContent.current.value = "";
    setIsEdit(false);
    setEditId(null);
    setValidateErr({});
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setTitle("");
    setContent("");
    setEditId(null);
    setValidateErr({});
  };

  if (isCreate) {
    return (
      <Create
        titleRef={getTitle}
        contentRef={getContent}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        savePost={savePost}
        cancelCreate={toggleCreate}
        validateErr={validateErr}
      />
    );
  }

  if (isEdit) {
    return (
      <Edit
        title={title}
        content={content}
        titleRef={getTitle}
        contentRef={getContent}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        updatePost={updatePost}
        cancelEdit={cancelEdit}
        validateErr={validateErr}
      />
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h1 className="text-center mb-4 fw-bold">Blog Posts</h1>
      <div className="table-responsive">
        <table
          className={`table text-center ${
            theme === "dark" ? "table-dark" : "table-warning"
          }`}
        >
          <thead>
            <tr style={{ height: "60px" }}>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 fw-bold">
                  There are no posts yet.
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <Post
                  key={post.id}
                  index={index + 1}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-warning fw-bold"
        onClick={() => setIsCreate(true)}
      >
        <i className="fas fa-plus me-1"></i> Create New Post
      </button>
    </div>
  );
};

export default List;
