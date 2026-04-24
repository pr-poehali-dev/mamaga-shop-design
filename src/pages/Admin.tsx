import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, TOKEN_KEY } from '@/lib/api';
import Icon from '@/components/ui/icon';
import AdminProductsTab from '@/components/admin/AdminProductsTab';
import AdminBlogTab from '@/components/admin/AdminBlogTab';
import AdminMaterialsTab from '@/components/admin/AdminMaterialsTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

type Tab = 'products' | 'blog' | 'materials' | 'settings';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  material: string;
  style: string;
  image_url: string;
  is_visible: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  is_published: boolean;
}

const emptyProduct: Omit<Product, 'id'> = { title: '', description: '', price: 0, material: '', style: '', image_url: '', is_visible: true };
const emptyPost: Omit<BlogPost, 'id'> = { title: '', content: '', excerpt: '', image_url: '', is_published: false };

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('products');
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editPost, setEditPost] = useState<Partial<BlogPost> | null>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const materialFileRef = useRef<HTMLInputElement>(null);

  // Галереи материалов
  const [activeMaterialSlug, setActiveMaterialSlug] = useState('derevo');
  const [materialPhotos, setMaterialPhotos] = useState<{id: number; url: string; caption: string; price: number; description: string}[]>([]);
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoPrice, setPhotoPrice] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<{id: number; caption: string; price: number; description: string} | null>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  useEffect(() => {
    api.checkAuth().then(res => {
      if (!res.ok) { navigate('/admin/login'); return; }
      loadAll();
    });
  }, []);

  useEffect(() => {
    if (tab === 'materials') {
      api.getMaterialPhotos(activeMaterialSlug).then(data => {
        if (Array.isArray(data)) setMaterialPhotos(data);
      });
    }
  }, [tab, activeMaterialSlug]);

  const loadAll = async () => {
    setLoading(true);
    const [p, b, s] = await Promise.all([api.getProducts(), api.getPosts(), api.getSettings()]);
    setProducts(p);
    setPosts(b);
    setSettings(s);
    setLoading(false);
  };

  const logout = () => { localStorage.removeItem(TOKEN_KEY); navigate('/admin/login'); };

  const uploadImage = async (folder: string): Promise<string> => {
    return new Promise((resolve) => {
      const input = fileInputRef.current!;
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          const res = await api.uploadImage(base64, file.type, folder);
          resolve(res.url || '');
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });
  };

  // --- Products ---
  const saveProduct = async () => {
    if (!editProduct) return;
    if (editProduct.id) {
      await api.updateProduct(editProduct.id, editProduct);
    } else {
      await api.createProduct(editProduct);
    }
    setEditProduct(null);
    const p = await api.getProducts();
    setProducts(p);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Удалить товар?')) return;
    await api.deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  // --- Blog ---
  const savePost = async () => {
    if (!editPost) return;
    if (editPost.id) {
      await api.updatePost(editPost.id, editPost);
    } else {
      await api.createPost(editPost);
    }
    setEditPost(null);
    const b = await api.getPosts();
    setPosts(b);
  };

  const deletePost = async (id: number) => {
    if (!confirm('Удалить пост?')) return;
    await api.deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  // --- Material Photos ---
  const reloadMaterialPhotos = async () => {
    const photos = await api.getMaterialPhotos(activeMaterialSlug);
    if (Array.isArray(photos)) setMaterialPhotos(photos);
  };

  const uploadMaterialPhoto = async () => {
    return new Promise<void>((resolve) => {
      const input = materialFileRef.current!;
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return resolve();
        setUploadingPhoto(true);
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          const price = parseInt(photoPrice) || 0;
          const res = await api.addMaterialPhoto(activeMaterialSlug, base64, file.type, photoCaption, price, photoDescription);
          if (res.ok) {
            await reloadMaterialPhotos();
            setPhotoCaption('');
            setPhotoPrice('');
            setPhotoDescription('');
          }
          setUploadingPhoto(false);
          resolve();
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });
  };

  const savePhotoEdit = async () => {
    if (!editingPhoto) return;
    setSavingPhoto(true);
    await api.updateMaterialPhoto(editingPhoto.id, {
      caption: editingPhoto.caption,
      price: editingPhoto.price,
      description: editingPhoto.description,
    });
    await reloadMaterialPhotos();
    setEditingPhoto(null);
    setSavingPhoto(false);
  };

  const deleteMaterialPhoto = async (id: number) => {
    if (!confirm('Удалить фото?')) return;
    await api.deleteMaterialPhoto(id);
    setMaterialPhotos(materialPhotos.filter(p => p.id !== id));
  };

  // --- Settings ---
  const saveSettingsHandler = async () => {
    setSavingSettings(true);
    await api.saveSettings(settings);
    setSavingSettings(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />

      {/* Header */}
      <div className="bg-stone-900 border-b border-stone-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-lg">Управление сайтом</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-stone-400 hover:text-amber-400 text-sm flex items-center gap-1">
            <Icon name="ExternalLink" size={14} /> Открыть сайт
          </a>
          <button onClick={logout} className="text-stone-400 hover:text-red-400 text-sm flex items-center gap-1">
            <Icon name="LogOut" size={14} /> Выйти
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-stone-900 border-b border-stone-700 px-6 flex gap-1 flex-wrap">
        {([['products', 'ShoppingBag', 'Товары'], ['blog', 'FileText', 'Блог'], ['materials', 'Images', 'Галереи'], ['settings', 'Settings', 'Настройки']] as const).map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === key ? 'border-amber-600 text-amber-400' : 'border-transparent text-stone-400 hover:text-stone-200'}`}
          >
            <Icon name={icon} size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {tab === 'products' && (
          <AdminProductsTab
            products={products}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            saveProduct={saveProduct}
            deleteProduct={deleteProduct}
            onUploadImage={() => uploadImage('products')}
            emptyProduct={emptyProduct}
          />
        )}

        {tab === 'blog' && (
          <AdminBlogTab
            posts={posts}
            editPost={editPost}
            setEditPost={setEditPost}
            savePost={savePost}
            deletePost={deletePost}
            onUploadImage={() => uploadImage('blog')}
            emptyPost={emptyPost}
          />
        )}

        {tab === 'materials' && (
          <AdminMaterialsTab
            activeMaterialSlug={activeMaterialSlug}
            setActiveMaterialSlug={setActiveMaterialSlug}
            materialPhotos={materialPhotos}
            photoCaption={photoCaption}
            setPhotoCaption={setPhotoCaption}
            photoPrice={photoPrice}
            setPhotoPrice={setPhotoPrice}
            photoDescription={photoDescription}
            setPhotoDescription={setPhotoDescription}
            uploadingPhoto={uploadingPhoto}
            editingPhoto={editingPhoto}
            setEditingPhoto={setEditingPhoto}
            savingPhoto={savingPhoto}
            savePhotoEdit={savePhotoEdit}
            deleteMaterialPhoto={deleteMaterialPhoto}
            materialFileRef={materialFileRef}
            uploadMaterialPhoto={uploadMaterialPhoto}
          />
        )}

        {tab === 'settings' && (
          <AdminSettingsTab
            settings={settings}
            setSettings={setSettings}
            saveSettingsHandler={saveSettingsHandler}
            savingSettings={savingSettings}
          />
        )}
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: #292524;
          border: 1px solid #57534e;
          border-radius: 8px;
          padding: 10px 14px;
          color: #e7e5e4;
          outline: none;
          font-size: 14px;
        }
        .input-field:focus { border-color: #b45309; }
        .input-field::placeholder { color: #78716c; }
      `}</style>
    </div>
  );
}
