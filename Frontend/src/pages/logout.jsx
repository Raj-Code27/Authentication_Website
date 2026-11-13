import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api.js';

function Logout() {
  const [status, setStatus] = useState('confirm');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Unable to log out. Please try again.');
      }

      setStatus('done');
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Could not connect to the server. Check that the backend is running and try again.'
          : requestError.message,
      );
      setStatus('confirm');
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#070708] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-red-950/60 blur-[130px]" />
        <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-red-900/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,29,29,0.13),transparent_58%)]" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-[#111113]/95 p-6 text-center shadow-2xl shadow-black/70 backdrop-blur-xl sm:p-9">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/50 text-xl font-bold text-red-400 shadow-lg shadow-red-950/30">
          A
        </div>
        {status === 'done' ? (
          <>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-400">
              Signed out
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">You&apos;re logged out</h1>
            <p className="mt-3 text-sm leading-6 text-rose-200" role="status">
              Your session has ended. You can log back in whenever you&apos;re ready.
            </p>
            <Link
              className="mt-7 block w-full rounded-xl bg-red-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
              to="/login"
            >
              Return to login
            </Link>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-400">
              Account
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Log out?</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              You&apos;ll need to log in again to access your account.
            </p>
            {error && (
              <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-left text-sm text-red-200" role="alert">
                {error}
              </p>
            )}
            <button
              className="mt-7 w-full rounded-xl bg-red-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#070708] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === 'submitting'}
              onClick={handleLogout}
              type="button"
            >
              {status === 'submitting' ? 'Logging out…' : 'Log out'}
            </button>
            <Link
              className="mt-5 inline-block text-sm font-semibold text-red-400 transition hover:text-red-300"
              to="/login"
            >
              Cancel and return to login
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

export default Logout;
