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
      await loadProducts();
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? products.filter(
          (p) =>
            (p.name || "").toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q),
        )
      : products.slice();

    filtered.sort((a, b) => {
      const A = a[sortBy],
        B = b[sortBy];
      let comp = 0;
      if (typeof A === "string") comp = A.localeCompare(B);
      else comp = Number(A) - Number(B);
      return order === "asc" ? comp : -comp;
    });

    return filtered;
  }, [products, search, sortBy, order]);

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h2 className="fw-bold">Product Manager</h2>
        <p className="text-muted mb-0">
          Add, search, sort, edit, and delete products easily.
        </p>
      </header>

      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <div>{error}</div>
          <button className="btn-close" onClick={() => setError("")} />
        </div>
      )}

      <div className="mb-3">
        <SearchSortBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />
      </div>

      <div className="mb-3">
        <ProductForm
          editing={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      </div>

      <ProductList
        items={filteredSorted}
        onEdit={(p) => setEditing(p)}
        onDelete={handleDelete}
        loading={loading}
      />

      <footer className="pt-4 text-center text-muted">
        <small>Built with React + Bootstrap • Responsive & simple</small>
      </footer>
    </div>
  );
}
