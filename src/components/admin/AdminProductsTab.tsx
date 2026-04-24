import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

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

interface AdminProductsTabProps {
  products: Product[];
  editProduct: Partial<Product> | null;
  setEditProduct: (p: Partial<Product> | null) => void;
  saveProduct: () => void;
  deleteProduct: (id: number) => void;
  onUploadImage: () => Promise<string>;
  emptyProduct: Omit<Product, 'id'>;
}

type PostStatus = 'idle' | 'loading' | 'ok' | 'error';

function PostButton({ product }: { product: Product }) {
  const [status, setStatus] = useState<PostStatus>('idle');
  const [details, setDetails] = useState<Record<string, boolean>>({});

  const handlePost = async () => {
    setStatus('loading');
    const res = await api.autopost({
      title: product.title,
      description: product.description,
      price: product.price,
      material: product.material,
      style: product.style,
      image_url: product.image_url,
    });
    setStatus(res.ok ? 'ok' : 'error');
    if (res.results) {
      setDetails({
        Telegram: res.results.telegram?.ok ?? false,
        ВКонтакте: res.results.vk?.ok ?? false,
      });
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handlePost}
        disabled={status === 'loading'}
        title="Опубликовать в соцсети"
        className={`p-2 transition-colors ${
          status === 'ok' ? 'text-green-400' :
          status === 'error' ? 'text-red-400' :
          'text-stone-400 hover:text-blue-400'
        }`}
      >
        {status === 'loading'
          ? <Icon name="Loader" size={16} />
          : status === 'ok'
          ? <Icon name="CheckCircle" size={16} />
          : status === 'error'
          ? <Icon name="XCircle" size={16} />
          : <Icon name="Share2" size={16} />
        }
      </button>
      {(status === 'ok' || status === 'error') && Object.keys(details).length > 0 && (
        <div className="flex gap-1">
          {Object.entries(details).map(([name, ok]) => (
            <span key={name} className={`text-xs px-1.5 py-0.5 rounded ${ok ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminProductsTab({
  products,
  editProduct,
  setEditProduct,
  saveProduct,
  deleteProduct,
  onUploadImage,
  emptyProduct,
}: AdminProductsTabProps) {
  return (
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
              <button
                onClick={async () => { const url = await onUploadImage(); if (url) setEditProduct(p => ({ ...p, image_url: url })); }}
                className="bg-stone-700 hover:bg-stone-600 px-3 rounded-lg text-sm"
              >
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
            <div className="flex items-center gap-1">
              <PostButton product={p} />
              <button onClick={() => setEditProduct(p)} className="text-stone-400 hover:text-amber-400 p-2"><Icon name="Pencil" size={16} /></button>
              <button onClick={() => deleteProduct(p.id)} className="text-stone-400 hover:text-red-400 p-2"><Icon name="Trash2" size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
