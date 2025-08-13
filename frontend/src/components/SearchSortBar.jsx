export default function SearchSortBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  return (
    <div className="row g-2 align-items-end">
      <div className="col-md-6">
        <label className="form-label">Search</label>
        <input
          className="form-control"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">Sort by</label>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stocks">Stocks</option>
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Order</label>
        <select
          className="form-select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
}
