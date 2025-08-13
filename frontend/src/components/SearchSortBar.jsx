export default function SearchSortBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  return (
    <div className="row g-2 align-items-end bg-light rounded p-3 mb-2 shadow-sm">
      <div className="col-md-7">
        <label className="form-label">Search</label>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="btn btn-outline-secondary" type="button" onClick={() => setSearch("")}>Clear</button>
          )}
        </div>
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
        </select>
      </div>
      <div className="col-md-2">
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
