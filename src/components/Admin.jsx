export default function Admin() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <p>Upload books (UI only)</p>

      <input placeholder="Book Title" />
      <input placeholder="Price" />
      <input type="file" />

      <button>Add Book</button>
    </div>
  );
}
