import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Create = ({ titleRef, contentRef, savePost, cancelCreate }) => {
  const { theme } = useContext(ThemeContext);
  const formBg = theme === "dark" ? "#333" : "#FFF3CD";
  const inputBg = theme === "dark" ? "#555" : "#fff";
  const inputColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Create New Post</h2>
      <form
        onSubmit={savePost}
        style={{ backgroundColor: formBg, color: inputColor }}
        className="p-4 rounded"
      >
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          ref={titleRef}
          style={{ backgroundColor: inputBg, color: inputColor }}
        />
        <textarea
          className="form-control mb-2"
          rows="4"
          placeholder="Content"
          ref={contentRef}
          style={{ backgroundColor: inputBg, color: inputColor }}
        />
        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            Save Post
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelCreate}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
