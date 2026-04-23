import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, TOKEN_KEY } from '@/lib/api';
import Icon from '@/components/ui/icon';

type Tab = 'products' | 'blog' | 'materials' | 'settings';

const MATERIAL_SLUGS = [
  { slug: 'derevo', name: 'Дерево', rune: 'ᚦ' },
  { slug: 'zhelezo', name: 'Железо', rune: 'ᚢ' },
  { slug: 'kamen', name: 'Камень', rune: 'ᚱ' },
  { slug: 'korneplastika', name: 'Корнепластика', rune: 'ᚹ' },
];

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
  const [uploadTarget, setUploadTarget] = useState<'product' | 'post'>('product');

  // Галереи материалов
  const [activeMaterialSlug, setActiveMaterialSlug] = useState('derevo');
  const [materialPhotos, setMaterialPhotos] = useState<{id: number; url: string; caption: string; price: number; description: string}[]>([]);
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoPrice, setPhotoPrice] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<{id: number; caption: string; price: number; description: string} | null>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const materialFileRef = useRef<HTMLInputElement>(null);

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
      <input ref={materialFileRef} type="file" accept="image/*" className="hidden" />

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

      <div className="max-w-5xl mx-auto p-6">

        {/* === PRODUCTS === */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Каталог товаров</h2>
              <button
                onClick={() => setEditProduct({ ...emptyProduct })}
                className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Icon name="Plus" size={16} /> Добавить товар
              </button>
            </div>

            {editProduct && (
              <div className="bg-stone-800 border border-stone-600 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">{editProduct.id ? 'Редактировать товар' : 'Новый товар'}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input className="input-field col-span-2" placeholder="Название" value={editProduct.title || ''} onChange={e => setEditProduct({ ...editProduct, title: e.target.value })} />
                  <textarea className="input-field col-span-2 h-24 resize-none" placeholder="Описание" value={editProduct.description || ''} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} />
                  <input className="input-field" placeholder="Цена (₽)" type="number" value={editProduct.price || ''} onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })} />
                  <input className="input-field" placeholder="Материал (Дерево, Металл...)" value={editProduct.material || ''} onChange={e => setEditProduct({ ...editProduct, material: e.target.value })} />
                  <input className="input-field" placeholder="Стиль" value={editProduct.style || ''} onChange={e => setEditProduct({ ...editProduct, style: e.target.value })} />
                  <div className="flex gap-2">
                    <input className="input-field flex-1" placeholder="URL фото" value={editProduct.image_url || ''} onChange={e => setEditProduct({ ...editProduct, image_url: e.target.value })} />
                    <button onClick={async () => { setUploadTarget('product'); const url = await uploadImage('products'); if (url) setEditProduct(p => ({ ...p, image_url: url })); }} className="bg-stone-700 hover:bg-stone-600 px-3 rounded-lg text-sm">
                      <Icon name="Upload" size={16} />
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-stone-300">
                    <input type="checkbox" checked={editProduct.is_visible ?? true} onChange={e => setEditProduct({ ...editProduct, is_visible: e.target.checked })} />
                    Показывать на сайте
                  </label>
                </div>
                {editProduct.image_url && <img src={editProduct.image_url} className="mt-3 h-32 rounded-lg object-cover" alt="" />}
                <div className="flex gap-3 mt-4">
                  <button onClick={saveProduct} className="bg-amber-700 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm">Сохранить</button>
                  <button onClick={() => setEditProduct(null)} className="bg-stone-700 hover:bg-stone-600 text-white px-5 py-2 rounded-lg text-sm">Отмена</button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {products.length === 0 && <p className="text-stone-500 text-center py-10">Товаров пока нет. Добавьте первый!</p>}
              {products.map(p => (
                <div key={p.id} className="bg-stone-800 border border-stone-700 rounded-xl p-4 flex items-center gap-4">
                  {p.image_url && <img src={p.image_url} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" alt="" />}
                  {!p.image_url && <div className="w-16 h-16 rounded-lg bg-stone-700 flex items-center justify-center flex-shrink-0"><Icon name="Image" size={24} /></div>}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{p.title}</span>
                      {!p.is_visible && <span className="text-xs bg-stone-700 text-stone-400 px-2 py-0.5 rounded">скрыт</span>}
                    </div>
                    <div className="text-stone-400 text-sm mt-1">{p.material} · {p.style} · {p.price ? `${p.price.toLocaleString()} ₽` : 'цена не указана'}</div>
                    {p.description && <div className="text-stone-500 text-xs mt-1 truncate max-w-md">{p.description}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditProduct(p)} className="text-stone-400 hover:text-amber-400 p-2"><Icon name="Pencil" size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="text-stone-400 hover:text-red-400 p-2"><Icon name="Trash2" size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === BLOG === */}
        {tab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Блог</h2>
              <button
                onClick={() => setEditPost({ ...emptyPost })}
                className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Icon name="Plus" size={16} /> Новая запись
              </button>
            </div>

            {editPost && (
              <div className="bg-stone-800 border border-stone-600 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">{editPost.id ? 'Редактировать пост' : 'Новый пост'}</h3>
                <div className="grid gap-4">
                  <input className="input-field" placeholder="Заголовок" value={editPost.title || ''} onChange={e => setEditPost({ ...editPost, title: e.target.value })} />
                  <input className="input-field" placeholder="Краткое описание (анонс)" value={editPost.excerpt || ''} onChange={e => setEditPost({ ...editPost, excerpt: e.target.value })} />
                  <textarea className="input-field h-40 resize-none" placeholder="Полный текст статьи" value={editPost.content || ''} onChange={e => setEditPost({ ...editPost, content: e.target.value })} />
                  <div className="flex gap-2">
                    <input className="input-field flex-1" placeholder="URL обложки" value={editPost.image_url || ''} onChange={e => setEditPost({ ...editPost, image_url: e.target.value })} />
                    <button onClick={async () => { setUploadTarget('post'); const url = await uploadImage('blog'); if (url) setEditPost(p => ({ ...p, image_url: url })); }} className="bg-stone-700 hover:bg-stone-600 px-3 rounded-lg text-sm">
                      <Icon name="Upload" size={16} />
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-stone-300">
                    <input type="checkbox" checked={editPost.is_published ?? false} onChange={e => setEditPost({ ...editPost, is_published: e.target.checked })} />
                    Опубликовать на сайте
                  </label>
                </div>
                {editPost.image_url && <img src={editPost.image_url} className="mt-3 h-32 rounded-lg object-cover" alt="" />}
                <div className="flex gap-3 mt-4">
                  <button onClick={savePost} className="bg-amber-700 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm">Сохранить</button>
                  <button onClick={() => setEditPost(null)} className="bg-stone-700 hover:bg-stone-600 text-white px-5 py-2 rounded-lg text-sm">Отмена</button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {posts.length === 0 && <p className="text-stone-500 text-center py-10">Постов пока нет. Напишите первую статью!</p>}
              {posts.map(p => (
                <div key={p.id} className="bg-stone-800 border border-stone-700 rounded-xl p-4 flex items-center gap-4">
                  {p.image_url && <img src={p.image_url} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" alt="" />}
                  {!p.image_url && <div className="w-16 h-16 rounded-lg bg-stone-700 flex items-center justify-center flex-shrink-0"><Icon name="Image" size={24} /></div>}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{p.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${p.is_published ? 'bg-green-900 text-green-300' : 'bg-stone-700 text-stone-400'}`}>
                        {p.is_published ? 'опубликован' : 'черновик'}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm mt-1 line-clamp-1">{p.excerpt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditPost(p)} className="text-stone-400 hover:text-amber-400 p-2"><Icon name="Pencil" size={16} /></button>
                    <button onClick={() => deletePost(p.id)} className="text-stone-400 hover:text-red-400 p-2"><Icon name="Trash2" size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === MATERIALS === */}
        {tab === 'materials' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Галереи материалов</h2>

            {/* Выбор материала */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {MATERIAL_SLUGS.map(m => (
                <button
                  key={m.slug}
                  onClick={() => setActiveMaterialSlug(m.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMaterialSlug === m.slug ? 'bg-amber-700 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'}`}
                >
                  <span className="mr-1">{m.rune}</span> {m.name}
                </button>
              ))}
            </div>

            {/* Загрузка нового фото */}
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-5 mb-6">
              <h3 className="font-semibold mb-4 text-sm text-stone-300">Добавить фото в галерею</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  className="input-field"
                  placeholder="Название изделия"
                  value={photoCaption}
                  onChange={e => setPhotoCaption(e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Цена (₽), например 85000"
                  type="number"
                  value={photoPrice}
                  onChange={e => setPhotoPrice(e.target.value)}
                />
                <textarea
                  className="input-field sm:col-span-2 resize-none"
                  rows={2}
                  placeholder="Описание изделия (материал, размер, особенности...)"
                  value={photoDescription}
                  onChange={e => setPhotoDescription(e.target.value)}
                />
              </div>
              <button
                onClick={uploadMaterialPhoto}
                disabled={uploadingPhoto}
                className="bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Icon name="Upload" size={16} />
                {uploadingPhoto ? 'Загрузка...' : 'Выбрать и загрузить фото'}
              </button>
            </div>

            {/* Редактирование фото */}
            {editingPhoto && (
              <div className="bg-stone-800 border border-amber-700 rounded-xl p-5 mb-6">
                <h3 className="font-semibold mb-4 text-sm text-amber-400">Редактировать изделие</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    className="input-field"
                    placeholder="Название изделия"
                    value={editingPhoto.caption}
                    onChange={e => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                  />
                  <input
                    className="input-field"
                    placeholder="Цена (₽)"
                    type="number"
                    value={editingPhoto.price || ''}
                    onChange={e => setEditingPhoto({ ...editingPhoto, price: parseInt(e.target.value) || 0 })}
                  />
                  <textarea
                    className="input-field sm:col-span-2 resize-none"
                    rows={2}
                    placeholder="Описание изделия"
                    value={editingPhoto.description}
                    onChange={e => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={savePhotoEdit} disabled={savingPhoto} className="bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm">
                    {savingPhoto ? 'Сохраняю...' : 'Сохранить'}
                  </button>
                  <button onClick={() => setEditingPhoto(null)} className="bg-stone-700 hover:bg-stone-600 text-white px-5 py-2 rounded-lg text-sm">
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {/* Сетка фото */}
            {materialPhotos.length === 0 ? (
              <p className="text-stone-500 text-center py-12">Фото пока нет. Загрузите первое!</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {materialPhotos.map(photo => (
                  <div key={photo.id} className="relative group rounded-lg overflow-hidden bg-stone-800 border border-stone-700">
                    <img src={photo.url} alt={photo.caption} className="w-full h-36 object-cover" />
                    <div className="p-2">
                      {photo.caption && <p className="text-xs text-stone-200 font-medium truncate">{photo.caption}</p>}
                      {photo.price > 0 && <p className="text-xs text-amber-400">{photo.price.toLocaleString()} ₽</p>}
                      {photo.description && <p className="text-xs text-stone-500 truncate mt-0.5">{photo.description}</p>}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingPhoto({ id: photo.id, caption: photo.caption, price: photo.price, description: photo.description })}
                        className="bg-stone-800 hover:bg-amber-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        <Icon name="Pencil" size={12} />
                      </button>
                      <button
                        onClick={() => deleteMaterialPhoto(photo.id)}
                        className="bg-red-900 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === SETTINGS === */}
        {tab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Настройки сайта</h2>
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-6 space-y-4">
              {[
                ['hero_title', 'Заголовок главного экрана'],
                ['hero_subtitle', 'Подзаголовок главного экрана'],
                ['phone', 'Телефон'],
                ['email', 'Email'],
                ['instagram', 'Instagram (ссылка)'],
                ['telegram', 'Telegram (ссылка)'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm text-stone-400 mb-1">{label}</label>
                  <input
                    className="input-field"
                    value={settings[key] || ''}
                    onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button
                onClick={saveSettingsHandler}
                disabled={savingSettings}
                className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 rounded-lg text-sm mt-2 disabled:opacity-50"
              >
                {savingSettings ? 'Сохраняю...' : 'Сохранить настройки'}
              </button>
            </div>
          </div>
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