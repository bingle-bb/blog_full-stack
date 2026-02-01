const Post = ({ index, id, title, content, editPost, deletePost }) => {
  return (
    <div className="card p-3">
      <h5>
        {index}. {title}
      </h5>
      <p>{content}</p>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-warning" onClick={() => editPost(id)}>
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deletePost(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
