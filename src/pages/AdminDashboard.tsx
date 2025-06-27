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

type Section = 'products' | 'digitalgoods' | 'bookclub';

interface DigitalGood {
  id: string;
  title: string;
  type: string;
  price: string;
  description: string;
  image: string;
  features?: string[];
}

function BookClubMainAdmin() {
  type BookClubData = { id: string; title: string; description: string; price: string; image: string };
  const [data, setData] = useState<BookClubData>({ id: '', title: 'Join the Book Club', description: 'Get access to exclusive discussions, author interviews, and implementation workshops.', price: '$19', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BookClubData>(data);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/bookclub')
      .then(res => res.json())
      .then(items => {
        const main = items && items.length > 0 ? items[0] : { id: '', title: '', description: '', price: '', image: '' };
        setData(main); setForm(main);
      })
      .catch(() => setError('Failed to fetch Book Club'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    fetch(`http://localhost:4000/api/bookclub/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('affluent_token')}` },
      body: JSON.stringify(form),
    })
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to update');
        return res.json();
      })
      .then(() => {
        setToast({ type: 'success', message: 'Book Club updated!' });
        setEditing(false);
        setData(form);
      })
      .catch(err => {
        setToast({ type: 'error', message: err.message || 'Failed to update' });
      });
  };

  if (loading) return <div>Loading Book Club...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 rounded-xl shadow p-6 my-8 max-w-xl mx-auto">
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <h2 className="text-xl font-bold mb-4 text-center">Book Club Card</h2>
      {editing ? (
        <>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-4 py-2 w-full mb-2" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price (e.g. $19)" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" className="border rounded px-4 py-2 w-full mb-2" />
          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded font-semibold">Save</button>
            <button onClick={() => { setEditing(false); setForm(data); }} className="bg-gray-400 text-white px-6 py-2 rounded font-semibold">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold mb-2">{data.title}</div>
          <div className="mb-2">{data.description}</div>
          <div className="flex items-center justify-center space-x-4 mb-2">
            <span className="text-3xl font-bold text-black">{data.price}</span>
            <span className="text-gray-800">/month</span>
          </div>
          {data.image && <img src={data.image} alt="Book Club" className="h-20 w-20 object-cover rounded mx-auto mb-2" />}
          <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white px-6 py-2 rounded font-semibold mt-2">Edit</button>
        </>
      )}
    </div>
  );
}

function AllAccessPassAdmin() {
  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    discountLabel: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/allaccess')
      .then(res => res.json())
      .then(d => { setData(d); setForm(d); })
      .catch(() => setError('Failed to fetch All-Access Pass'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    fetch('http://localhost:4000/api/allaccess', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('affluent_token')}` },
      body: JSON.stringify(form),
    })
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to update');
        return res.json();
      })
      .then(() => {
        setToast({ type: 'success', message: 'All-Access Pass updated!' });
        setEditing(false);
        setData(form);
      })
      .catch(err => {
        setToast({ type: 'error', message: err.message || 'Failed to update' });
      });
  };

  if (loading) return <div>Loading All-Access Pass...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 my-8 max-w-xl mx-auto">
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <h2 className="text-xl font-bold mb-4 text-center">All-Access Pass</h2>
      {editing ? (
        <>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-4 py-2 w-full mb-2" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="Original Price (e.g. $499)" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Discounted Price (e.g. $297)" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="discountLabel" value={form.discountLabel} onChange={handleChange} placeholder="Discount Label (e.g. 40% OFF)" className="border rounded px-4 py-2 w-full mb-2" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border rounded px-4 py-2 w-full mb-2" />
          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded font-semibold">Save</button>
            <button onClick={() => { setEditing(false); setForm(data); }} className="bg-gray-400 text-white px-6 py-2 rounded font-semibold">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold mb-2">{data.title}</div>
          <div className="mb-2">{data.description}</div>
          <div className="flex items-center justify-center space-x-4 mb-2">
            <span className="text-xl text-gray-500 line-through">{data.originalPrice}</span>
            <span className="text-3xl font-bold text-black">{data.price}</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">{data.discountLabel}</span>
          </div>
          {data.image && <img src={data.image} alt="All-Access" className="h-20 w-20 object-cover rounded mx-auto mb-2" />}
          <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white px-6 py-2 rounded font-semibold mt-2">Edit</button>
        </>
      )}
    </div>
  );
}

function DigitalGoodsAdminTable() {
  const [items, setItems] = useState<DigitalGood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<DigitalGood, 'id'>>({ title: '', type: '', price: '', description: '', image: '' });
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchItems = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/digitalgoods')
      .then(res => res.json())
      .then(setItems)
      .catch(() => setError('Failed to fetch digital goods'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'price') {
      let val = value.startsWith('$') ? value : ('$' + value.replace(/[^\d.]/g, ''));
      setForm({ ...form, price: val });
    } else if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const startEdit = (item: DigitalGood) => {
    setEditing(item.id);
    setForm({ title: item.title, type: item.type, price: item.price, description: item.description, image: item.image });
  };
  const cancelEdit = () => setEditing(null);

  const saveEdit = (id: string) => {
    fetch(`http://localhost:4000/api/digitalgoods/${id}`, {
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
      .then(() => {
        setToast({ type: 'success', message: 'Digital good updated!' });
        setEditing(null);
        setForm({ title: '', type: '', price: '', description: '', image: '' });
        fetchItems();
      })
      .catch(err => {
        setToast({ type: 'error', message: err.message || 'Failed to update' });
        setEditing(null);
        setForm({ title: '', type: '', price: '', description: '', image: '' });
      });
  };

  const addItem = () => {
    fetch('http://localhost:4000/api/digitalgoods', {
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
      .then(() => {
        setToast({ type: 'success', message: 'Digital good added!' });
        setForm({ title: '', type: '', price: '', description: '', image: '' });
        fetchItems();
      })
      .catch(err => {
        setToast({ type: 'error', message: err.message || 'Failed to add' });
        setForm({ title: '', type: '', price: '', description: '', image: '' });
      });
  };

  const deleteItem = (id: string) => {
    fetch(`http://localhost:4000/api/digitalgoods/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('affluent_token')}`
      }
    })
      .then(() => {
        setToast({ type: 'success', message: 'Digital good deleted!' });
        fetchItems();
      })
      .catch(() => setToast({ type: 'error', message: 'Failed to delete' }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Digital Knowledge Hub</h2>
      <table className="w-full text-sm mb-6 overflow-x-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 text-left">Image</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="p-2"><img src={item.image} alt={item.title} className="h-12 w-12 object-cover rounded" /></td>
              <td className="p-2 font-semibold">
                {editing === item.id ? (
                  <input name="title" value={form.title} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                ) : item.title}
              </td>
              <td className="p-2">
                {editing === item.id ? (
                  <input name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                ) : item.type}
              </td>
              <td className="p-2">
                {editing === item.id ? (
                  <input name="price" value={form.price} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                ) : item.price}
              </td>
              <td className="p-2">
                {editing === item.id ? (
                  <input name="description" value={form.description} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                ) : item.description}
              </td>
              <td className="p-2 space-x-2">
                {editing === item.id ? (
                  <>
                    <button onClick={() => saveEdit(item.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={cancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">Add New Digital Good</h3>
        <div className="bg-gray-50 rounded-lg shadow-inner p-4 max-w-md mx-auto w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-4 py-2 w-full" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="type">Type</label>
            <input id="type" name="type" value={form.type} onChange={handleChange} placeholder="Course, Ebook, etc." className="border rounded px-4 py-2 w-full" />
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
            <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
            <input id="description" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-4 py-2 w-full" />
          </div>
          <button
            onClick={editing ? () => saveEdit(editing) : addItem}
            className="bg-green-600 text-white px-6 py-3 rounded w-full text-lg font-semibold mt-2"
          >
            {editing ? 'Save Edit' : 'Add Digital Good'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>('products');
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
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-2 sm:p-8 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <nav className="sm:w-52 w-full flex sm:flex-col flex-row border-r border-gray-200 mb-4 sm:mb-0">
          <button onClick={() => setSection('products')} className={`flex-1 sm:flex-none px-4 py-3 text-left sm:text-base text-sm ${section==='products' ? 'bg-green-100 font-bold text-green-800' : 'hover:bg-gray-100'} rounded sm:rounded-none sm:rounded-t-lg`}>Featured Drops</button>
          <button onClick={() => setSection('digitalgoods')} className={`flex-1 sm:flex-none px-4 py-3 text-left sm:text-base text-sm ${section==='digitalgoods' ? 'bg-green-100 font-bold text-green-800' : 'hover:bg-gray-100'} rounded sm:rounded-none`}>Digital Knowledge Hub</button>
          <button onClick={() => setSection('bookclub')} className={`flex-1 sm:flex-none px-4 py-3 text-left sm:text-base text-sm ${section==='bookclub' ? 'bg-green-100 font-bold text-green-800' : 'hover:bg-gray-100'} rounded sm:rounded-none sm:rounded-b-lg`}>Affluent Book Club</button>
          <button onClick={() => navigate('/')} className="sm:mt-8 ml-auto border border-gray-400 rounded px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold">Logout</button>
        </nav>
        {/* Main Section */}
        <div className="flex-1 sm:pl-8 mt-4 sm:mt-0">
          {section === 'products' && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Admin Product Dashboard</h1>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <table className="w-full text-sm mb-6 overflow-x-auto">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Description & Badge</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
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
                                <button onClick={() => saveEdit(product.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                                <button onClick={cancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => startEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => deleteProduct(product.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
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
          )}
          {section === 'digitalgoods' && (
            <>
              <DigitalGoodsAdminTable />
              <AllAccessPassAdmin />
              <BookClubMainAdmin />
            </>
          )}
          {section === 'bookclub' && (
            <BookClubMainAdmin />
          )}
        </div>
      </div>
    </div>
  );
}
