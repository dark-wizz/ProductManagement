import { useEffect, useState } from "react";

export default function ProductForm({ onSave, onCancel, editing }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stocks: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name ?? "",
        price: editing.price ?? "",
        description: editing.description ?? "",
        stocks: editing.stocks ?? "",
      });
    } else {
      setForm({ name: "", price: "", description: "", stocks: "" });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      stocks: parseInt(form.stocks, 10),
    };
    if (!payload.name) return alert("Name is required");
    if (isNaN(payload.price) || payload.price < 0)
      return alert("Price must be 0 or more");
    if (isNaN(payload.stocks) || payload.stocks < 0)
      return alert("Stocks must be 0 or more");

    onSave(payload);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {editing ? "Edit Product" : "Add Product"}
        </h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Apple iPad"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Price</label>
            <input
              className="form-control"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="999.99"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Stocks</label>
            <input
              className="form-control"
              name="stocks"
              type="number"
              min="0"
              value={form.stocks}
              onChange={handleChange}
              placeholder="10"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="2"
              value={form.description}
              onChange={handleChange}
              placeholder="Short product description..."
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
