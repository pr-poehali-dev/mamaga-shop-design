const URLS = {
  auth: 'https://functions.poehali.dev/c3580888-e8a2-479c-91fa-adaca4b43d67',
  products: 'https://functions.poehali.dev/dbf58220-06f5-4ed4-a81f-28376a0939fe',
  blog: 'https://functions.poehali.dev/86f8d4bd-d084-4873-a0bf-84bfef047aa6',
  misc: 'https://functions.poehali.dev/786ad7de-c595-4b8d-ae5e-e29a38d66bd8',
};

export const TOKEN_KEY = 'admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

function fetchWithTimeout(url: string, options: RequestInit = {}, ms = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .then(r => r.json())
    .finally(() => clearTimeout(timeout));
}

export const api = {
  login: (password: string) =>
    fetchWithTimeout(URLS.auth, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }),

  checkAuth: () =>
    fetchWithTimeout(URLS.auth, { headers: authHeaders() }),

  getProducts: () =>
    fetchWithTimeout(URLS.products, { headers: authHeaders() }),

  createProduct: (data: object) =>
    fetchWithTimeout(URLS.products, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }),

  updateProduct: (id: number, data: object) =>
    fetchWithTimeout(`${URLS.products}?id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }),

  deleteProduct: (id: number) =>
    fetchWithTimeout(`${URLS.products}?id=${id}`, { method: 'DELETE', headers: authHeaders() }),

  getPosts: () =>
    fetchWithTimeout(URLS.blog, { headers: authHeaders() }),

  createPost: (data: object) =>
    fetchWithTimeout(URLS.blog, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }),

  updatePost: (id: number, data: object) =>
    fetchWithTimeout(`${URLS.blog}?id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }),

  deletePost: (id: number) =>
    fetchWithTimeout(`${URLS.blog}?id=${id}`, { method: 'DELETE', headers: authHeaders() }),

  getSettings: () =>
    fetchWithTimeout(`${URLS.misc}?action=settings`, {}),

  saveSettings: (data: object) =>
    fetchWithTimeout(`${URLS.misc}?action=settings`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }),

  uploadImage: (image: string, content_type: string, folder: string) =>
    fetchWithTimeout(`${URLS.misc}?action=upload`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ image, content_type, folder }) }),

  getMaterialPhotos: (slug: string) =>
    fetchWithTimeout(`${URLS.misc}?action=material_photos&slug=${slug}`, {}),

  addMaterialPhoto: (slug: string, image: string, content_type: string, caption: string, price: number, description: string) =>
    fetchWithTimeout(`${URLS.misc}?action=add_material_photo`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ slug, image, content_type, caption, price, description }) }),

  updateMaterialPhoto: (id: number, data: { caption: string; price: number; description: string }) =>
    fetchWithTimeout(`${URLS.misc}?action=material_photo&id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }),

  deleteMaterialPhoto: (id: number) =>
    fetchWithTimeout(`${URLS.misc}?action=material_photo&id=${id}`, { method: 'DELETE', headers: authHeaders() }),

  autopost: (data: {
    title?: string;
    description?: string;
    price?: number;
    material?: string;
    style?: string;
    image_url?: string;
    caption?: string;
    site_url?: string;
  }) =>
    fetchWithTimeout(`${URLS.misc}?action=autopost`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }),
};
