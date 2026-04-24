import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, TOKEN_KEY } from '@/lib/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    localStorage.clear();
    sessionStorage.clear();
    setError('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(password);
      setLoading(false);
      if (res.ok) {
        localStorage.setItem(TOKEN_KEY, res.token);
        navigate('/admin');
      } else {
        setError('Неверный пароль');
      }
    } catch {
      setLoading(false);
      setError('Ошибка соединения, попробуй ещё раз');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl p-10 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-2xl font-bold text-stone-100">Админ-панель</h1>
          <p className="text-stone-400 text-sm mt-1">vkorne.space</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-lg py-3 transition-colors disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}