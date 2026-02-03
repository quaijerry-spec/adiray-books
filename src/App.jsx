import books from "./books";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        AdiRay Books
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-40 h-56 object-cover mx-auto"
            />
            <h3 className="mt-3 font-semibold text-sm">
              {book.title}
            </h3>
            <p className="text-gray-700 mt-1">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
