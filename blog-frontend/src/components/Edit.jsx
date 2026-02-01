import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Edit = ({
  updatePost,
  title,
  content,
  saveTitleToState,
  saveContentToState,
  cancelEdit,
  titleRef,
  contentRef,
  validateErr,
}) => {
  const { theme } = useContext(ThemeContext);

  const formBg = theme === "dark" ? "#333333" : "#FFF3CD";
  const inputBg = theme === "dark" ? "#555555" : "#ffffff";
  const inputColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Edit Post</h2>
      <form
        onSubmit={updatePost}
        className="p-4 rounded"
        style={{ backgroundColor: formBg, color: inputColor }}
      >
        <div className="mb-3 fw-bold">
          <label htmlFor="edit-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="edit-title"
            className="form-control mb-2"
            placeholder="Enter new title"
            value={title}
            ref={titleRef}
            onChange={saveTitleToState}
            style={{
              backgroundColor: inputBg,
              color: inputColor,
              border: theme === "dark" ? "1px solid #888" : "1px solid #ccc",
            }}
          />
          {validateErr.title && (
            <p className="text-danger">{validateErr.title}</p>
          )}
        </div>

        <div className="mb-3 fw-bold">
          <label htmlFor="edit-content" className="form-label">
            Content
          </label>
          <textarea
            id="edit-content"
            className="form-control mb-2"
            placeholder="Enter updated content"
            rows="4"
            value={content}
            ref={contentRef}
            onChange={saveContentToState}
            style={{
              backgroundColor: inputBg,
              color: inputColor,
              border: theme === "dark" ? "1px solid #888" : "1px solid #ccc",
            }}
          ></textarea>
          {validateErr.content && (
            <p className="text-danger">{validateErr.content}</p>
          )}
        </div>

        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-success me-2">
            <i className="fas fa-edit me-2"></i>Update Post
          </button>
          <button
            type="button"
            className="btn btn-danger fw-bold"
            onClick={cancelEdit}
          >
            <i className="fas fa-times me-2"></i>Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
