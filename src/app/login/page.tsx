// src/app/login/page.tsx
" use client\;

import { useState } from \react\;
import { useRouter } from \next/navigation\;

/**
 * Simple login form.
 * Calls backend /api/auth/login.
 * On success stores JWT and user in localStorage, dispatches uth-change event, and redirects home.
 */
export default function LoginPage() {
 const router = useRouter();
 const [email, setEmail] = useState(\\);
 const [password, setPassword] = useState(\\);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setError(null);
 if (!email || !password) {
 setError(\Ambos campos son obligatorios.\);
 return;
 }
 setLoading(true);
 try {
 const response = await fetch(
 ${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login,
 {
 method: \POST\,
 headers: { \Content-Type\: \application/json\ },
 body: JSON.stringify({ email, password }),
 }
 );
 if (!response.ok) {
 const data = await response.json();
 setError(data.message || \Error al iniciar sesión.\);
 setLoading(false);
 return;
 }
 const data = await response.json();
 localStorage.setItem(\vinilos_token\, data.token);
 localStorage.setItem(\vinilos_user\, JSON.stringify(data.user));
 window.dispatchEvent(new Event(\auth-change\));
 router.push(\/\);
 } catch (err) {
 setError(\Fallo de conexión.\);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className=\flex min-h-screen items-center justify-center bg-[#f9f9f9]\>
 <div className=\w-full max-w-sm rounded-lg bg-white p-6 shadow-md\>
 <h2 className=\mb-4 text-center text-2xl font-bold text-[#2c3e50]\>Iniciar Sesión</h2>
 {error && (
 <div className=\mb-4 rounded bg-red-100 p-2 text-red-700\>{error}</div>
 )}
 <form onSubmit={handleSubmit} className=\space-y-4\>
 <div>
 <label className=\block text-sm font-medium text-[#333333]\ htmlFor=\email\>Email</label>
 <input
 id=\email\
 type=\email\
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className=\mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#d35400] focus:outline-none\
 />
 </div>
 <div>
 <label className=\block text-sm font-medium text-[#333333]\ htmlFor=\password\>Contraseña</label>
 <input
 id=\password\
 type=\password\
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 className=\mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#d35400] focus:outline-none\
 />
 </div>
 <button
 type=\submit\
 disabled={loading}
 className=\w-full rounded bg-[#d35400] py-2 text-white hover:bg-[#c14400]\
 >
 {loading ? \Cargando...\ : \Acceder\}
 </button>
 </form>
 <p className=\mt-4 text-center text-sm text-[#333333]\>¿No tienes cuenta?{' '}<a href=\/registro\ className=\text-[#d35400] hover:underline\>Regístrate</a></p>
 </div>
 </div>
 );
}
