function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {

    return (
  
      <div className="flex gap-4 mb-10">
  
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-5 py-3 rounded-lg bg-zinc-900 text-white outline-none"
        />
  
        <button
          onClick={handleSearch}
          className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Search
        </button>
  
      </div>
  
    )
  }
  
  export default SearchBar