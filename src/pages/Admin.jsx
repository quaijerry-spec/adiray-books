import { useState } from "react";
import booksData from "../books";

export default function Admin() {
  const [books, setBooks] = useState(booksData);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addBook = () => {
    const newBook = {
      id: Date.now(),
      title,
      price: Number(price),
      image,
    };

    setBooks([...books, newBook]);
    alert("Book added (local only)");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Upload</h1>

      <input
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Price"
        className="border p-2 w-full mb-2"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL"
        className="border p-2 w-full mb-4"
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        onClick={addBook}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Add Book
      </button>
    </div>
  );
    }
