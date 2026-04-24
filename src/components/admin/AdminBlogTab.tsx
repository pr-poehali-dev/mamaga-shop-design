import Icon from '@/components/ui/icon';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  is_published: boolean;
}

interface AdminBlogTabProps {
  posts: BlogPost[];
  editPost: Partial<BlogPost> | null;
  setEditPost: (p: Partial<BlogPost> | null) => void;
  savePost: () => void;
  deletePost: (id: number) => void;
  onUploadImage: () => Promise<string>;
  emptyPost: Omit<BlogPost, 'id'>;
}

export default function AdminBlogTab({
  posts,
  editPost,
  setEditPost,
  savePost,
  deletePost,
  onUploadImage,
  emptyPost,
}: AdminBlogTabProps) {
  return (
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
              <button
                onClick={async () => { const url = await onUploadImage(); if (url) setEditPost(p => ({ ...p, image_url: url })); }}
                className="bg-stone-700 hover:bg-stone-600 px-3 rounded-lg text-sm"
              >
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
  );
}
