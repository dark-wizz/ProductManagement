import { useEffect, useMemo, useState } from "react";
import api from "./api";
import ProductForm from "./components/ProductForm";
import SearchSortBar from "./components/SearchSortBar";
import ProductList from "./components/ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      setEditing(null);
      setShowForm(false);
      await loadProducts();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
    filtered = filtered.sort((a, b) => {
      if (sortBy === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "stocks") {
        return order === "asc" ? a.stocks - b.stocks : b.stocks - a.stocks;
      }
      return 0;
    });
    return filtered;
  }, [products, search, sortBy, order]);

  return (
    <div className="min-vh-100 d-flex flex-column bg-gradient-to-br from-gray-50 to-blue-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-4">
        <div className="w-100" style={{ maxWidth: '800px' }}>
          <div className="bg-white rounded shadow-lg p-4 p-md-5 mx-2">
            <h1 className="mb-4 text-center fw-bold text-primary" style={{ fontSize: '2rem' }}>Product Management</h1>
            {error && (
              <div className="alert alert-danger text-center mb-3">{error}</div>
            )}
            <div className="mb-4">
              <SearchSortBar
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
              />
            </div>
            <div className="mb-4">
              <ProductList
                items={filteredProducts}
                onEdit={(prod) => { setEditing(prod); setShowForm(true); }}
                onDelete={handleDelete}
                loading={loading}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary px-4 py-2 fw-semibold shadow"
                onClick={() => { setEditing(null); setShowForm(true); }}
              >
                + Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Add/Update Product */}
      {showForm && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-2 p-md-4">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Update Product' : 'Add Product'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <ProductForm
                  onSave={handleSave}
                  onCancel={() => setShowForm(false)}
                  editing={editing}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto py-3 text-center text-muted bg-transparent">
        <small>Made with ❤️ for interview</small>
      </footer>
    </div>
  );
}