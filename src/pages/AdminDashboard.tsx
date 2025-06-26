import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api/products";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  badge?: string;
}

interface ProductForm {
  name: string;
  price: string;
  description: string;
  image: string;
  badge?: string;
}

export default function AdminDashboard() {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>({ name: '', price: '', description: '', image: '', badge: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch products
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Product[]) => { setProducts(data); setLoading(false); })
      .catch(() => { setError('Failed to fetch products'); setLoading(false); });
  }, []);

  // Start editing a product
  const startEdit = (product: Product) => {
    setEditing(product.id);
    setForm({ name: product.name, price: product.price, description: product.description, image: product.image, badge: product.badge || '' });
  };

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'price') {
      // Auto-prepend $ if not present
      let val = value.startsWith('$') ? value : ('$' + value.replace(/[^\d.]/g, ''));
      setForm({ ...form, price: val });
    } else if (name === 'image' && files && files[0]) {
      // Upload image as base64 (preview only)
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Save edits
  const saveEdit = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('affluent_token')}`
      },
      body: JSON.stringify(form),
    })
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to update');
        return res.json();
      })
      .then((updated: Product) => {
        setProducts(products.map(p => (p.id === id ? updated : p)));
        setEditing(null);
        setForm({ name: '', price: '', description: '', image: '', badge: '' });
        setToast({ type: 'success', message: 'Product updated successfully!' });
      })
      .catch(err => {
        setEditing(null);
        setForm({ name: '', price: '', description: '', image: '', badge: '' });
        setToast({ type: 'error', message: err.message || 'Failed to update' });
      });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(null);
  };

  // Add new product
  const addProduct = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('affluent_token')}`
      },
      body: JSON.stringify(form),
    })
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to add');
        return res.json();
      })
      .then((newProduct: Product) => {
        setProducts([...products, newProduct]);
        setForm({ name: '', price: '', description: '', image: '', badge: '' });
        setToast({ type: 'success', message: 'Product added successfully!' });
      })
      .catch(err => {
        setForm({ name: '', price: '', description: '', image: '', badge: '' });
        setToast({ type: 'error', message: err.message || 'Failed to add product' });
      });
  };

  // Delete product
  const deleteProduct = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('affluent_token')}`
      }
    })
      .then(() => setProducts(products.filter((p) => p.id !== id)));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-1 sm:px-2">
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {toast.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4 sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">Admin Product Dashboard</h1>
          <button onClick={() => navigate('/')} className="ml-4 border border-gray-400 rounded px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold">Logout</button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <table className="w-full mb-8 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2"><img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" /></td>
                    <td className="p-2">
                      {editing === product.id ? (
                        <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                      ) : product.name}
                    </td>
                    <td className="p-2">
                      {editing === product.id ? (
                        <input name="price" value={form.price} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                      ) : product.price}
                    </td>
                    <td className="p-2">
                      {editing === product.id ? (
                        <>
                          <input name="badge" value={form.badge} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-1" placeholder="e.g. Best Seller, Limited Edition" />
                          <input name="description" value={form.description} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                        </>
                      ) : (
                        <>
                          {product.badge && <div className="text-xs text-blue-600 font-semibold mb-1">{product.badge}</div>}
                          {product.description}
                        </>
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      {editing === product.id ? (
                        <>
                          <button onClick={() => saveEdit(product.id)} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                          <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(product)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                          <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Add New Product</h2>
              <div className="bg-gray-50 rounded-lg shadow-inner p-4 max-w-md mx-auto w-full flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="price">Price</label>
                  <input id="price" name="price" value={form.price} onChange={handleChange} placeholder="$0.00" className="border rounded px-4 py-2 w-full" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="image">Image</label>
                  <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="Image URL or upload below" className="border rounded px-4 py-2 w-full mb-2" />
                  <input type="file" accept="image/*" name="image" onChange={handleChange} className="w-full" />
                  {form.image && form.image.startsWith('data:') && (
                    <img src={form.image} alt="Preview" className="h-16 w-16 object-cover rounded mt-2 mx-auto" />
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="badge">Badge</label>
                  <select
                    id="badge"
                    name="badge"
                    value={['Best Seller','Limited Edition','New Drop','Featured','None'].includes(form.badge || '') ? form.badge : 'Custom'}
                    onChange={e => {
                      if (e.target.value === 'None') setForm({ ...form, badge: '' });
                      else if (e.target.value === 'Custom') setForm({ ...form, badge: '' });
                      else setForm({ ...form, badge: e.target.value });
                    }}
                    className="border rounded px-4 py-2 w-full mb-2"
                  >
                    <option value="Best Seller">Best Seller</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="New Drop">New Drop</option>
                    <option value="Featured">Featured</option>
                    <option value="None">None</option>
                    <option value="Custom">Custom...</option>
                  </select>
                  {(!['Best Seller','Limited Edition','New Drop','Featured','None'].includes(form.badge || '')) && (
                    <input
                      name="badge"
                      value={form.badge}
                      onChange={handleChange}
                      placeholder="Custom badge"
                      className="border rounded px-4 py-2 w-full"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
                  <input id="description" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-4 py-2 w-full" />
                </div>
                <button
                  onClick={editing ? () => saveEdit(editing) : addProduct}
                  className="bg-green-600 text-white px-6 py-3 rounded w-full text-lg font-semibold mt-2"
                >
                  {editing ? 'Save Edit' : 'Add Product'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
