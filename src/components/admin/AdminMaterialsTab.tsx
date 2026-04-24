import { useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

const MATERIAL_SLUGS = [
  { slug: 'derevo', name: 'Дерево', rune: 'ᚦ' },
  { slug: 'zhelezo', name: 'Железо', rune: 'ᚢ' },
  { slug: 'kamen', name: 'Камень', rune: 'ᚱ' },
  { slug: 'korneplastika', name: 'Корнепластика', rune: 'ᚹ' },
];

interface MaterialPhoto {
  id: number;
  url: string;
  caption: string;
  price: number;
  description: string;
}

interface AdminMaterialsTabProps {
  activeMaterialSlug: string;
  setActiveMaterialSlug: (slug: string) => void;
  materialPhotos: MaterialPhoto[];
  photoCaption: string;
  setPhotoCaption: (v: string) => void;
  photoPrice: string;
  setPhotoPrice: (v: string) => void;
  photoDescription: string;
  setPhotoDescription: (v: string) => void;
  uploadingPhoto: boolean;
  editingPhoto: { id: number; caption: string; price: number; description: string } | null;
  setEditingPhoto: (p: { id: number; caption: string; price: number; description: string } | null) => void;
  savingPhoto: boolean;
  savePhotoEdit: () => void;
  deleteMaterialPhoto: (id: number) => void;
  materialFileRef: React.RefObject<HTMLInputElement>;
  uploadMaterialPhoto: () => Promise<void>;
}

type PostStatus = 'idle' | 'loading' | 'ok' | 'error';

function PhotoPostButton({ photo }: { photo: { id: number; url: string; caption: string; price: number; description: string } }) {
  const [status, setStatus] = useState<PostStatus>('idle');
  const [details, setDetails] = useState<Record<string, boolean>>({});

  const handlePost = async () => {
    setStatus('loading');
    const res = await api.autopost({
      caption: photo.caption,
      description: photo.description,
      price: photo.price,
      image_url: photo.url,
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
    <button
      onClick={handlePost}
      disabled={status === 'loading'}
      title="Опубликовать в соцсети"
      className={`bg-stone-800 hover:bg-blue-700 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors ${
        status === 'ok' ? '!bg-green-700' : status === 'error' ? '!bg-red-700' : ''
      }`}
    >
      {status === 'loading'
        ? <Icon name="Loader" size={11} fallback="Share2" />
        : status === 'ok'
        ? <Icon name="Check" size={11} fallback="Share2" />
        : <Icon name="Share2" size={11} fallback="Share2" />
      }
    </button>
  );
}

export default function AdminMaterialsTab({
  activeMaterialSlug,
  setActiveMaterialSlug,
  materialPhotos,
  photoCaption,
  setPhotoCaption,
  photoPrice,
  setPhotoPrice,
  photoDescription,
  setPhotoDescription,
  uploadingPhoto,
  editingPhoto,
  setEditingPhoto,
  savingPhoto,
  savePhotoEdit,
  deleteMaterialPhoto,
  materialFileRef,
  uploadMaterialPhoto,
}: AdminMaterialsTabProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Галереи материалов</h2>

      <input ref={materialFileRef} type="file" accept="image/*" className="hidden" />

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
                <PhotoPostButton photo={photo} />
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
  );
}