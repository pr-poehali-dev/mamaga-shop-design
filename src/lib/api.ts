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

export const api = {
  login: (password: string) =>
    fetch(URLS.auth, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }).then(r => r.json()),

  checkAuth: () =>
    fetch(URLS.auth, { headers: authHeaders() }).then(r => r.json()),

  getProducts: () =>
    fetch(URLS.products, { headers: authHeaders() }).then(r => r.json()),

  createProduct: (data: object) =>
    fetch(URLS.products, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  updateProduct: (id: number, data: object) =>
    fetch(`${URLS.products}?id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  deleteProduct: (id: number) =>
    fetch(`${URLS.products}?id=${id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json()),

  getPosts: () =>
    fetch(URLS.blog, { headers: authHeaders() }).then(r => r.json()),

  createPost: (data: object) =>
    fetch(URLS.blog, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  updatePost: (id: number, data: object) =>
    fetch(`${URLS.blog}?id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  deletePost: (id: number) =>
    fetch(`${URLS.blog}?id=${id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json()),

  getSettings: () =>
    fetch(`${URLS.misc}?action=settings`).then(r => r.json()),

  saveSettings: (data: object) =>
    fetch(`${URLS.misc}?action=settings`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  uploadImage: (image: string, content_type: string, folder: string) =>
    fetch(`${URLS.misc}?action=upload`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ image, content_type, folder }) }).then(r => r.json()),

  getMaterialPhotos: (slug: string) =>
    fetch(`${URLS.misc}?action=material_photos&slug=${slug}`).then(r => r.json()),

  addMaterialPhoto: (slug: string, image: string, content_type: string, caption: string, price: number, description: string) =>
    fetch(`${URLS.misc}?action=add_material_photo`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ slug, image, content_type, caption, price, description }) }).then(r => r.json()),

  updateMaterialPhoto: (id: number, data: { caption: string; price: number; description: string }) =>
    fetch(`${URLS.misc}?action=material_photo&id=${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json()),

  deleteMaterialPhoto: (id: number) =>
    fetch(`${URLS.misc}?action=material_photo&id=${id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json()),
};