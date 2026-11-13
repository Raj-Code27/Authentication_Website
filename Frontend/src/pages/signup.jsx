import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
).replace(/\/+$/, '');

function Signup() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 8) {
      setError('Your password must be at least 8 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstname: form.firstname.trim(),
          lastname: form.lastname.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create your account. Please try again.');
      }

      setSuccess(`Your account has been created${data.user?.firstname ? `, ${data.user.firstname}` : ''}!`);
      setForm({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Could not connect to the server. Check that the backend is running and try again.'
          : requestError.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'mt-2 w-full rounded-xl border border-zinc-700 bg-[#090909]/90 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#070708] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-red-950/60 blur-[130px]" />
        <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-red-900/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(127,29,29,0.13),transparent_58%)]" />
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#111113]/95 p-6 shadow-2xl shadow-black/70 backdrop-blur-xl sm:p-9">
        <div className="mb-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/50 text-xl font-bold text-red-400 shadow-lg shadow-red-950/30">
            A
          </div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-400">
            Get started
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Create your account</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Sign up to get started. It only takes a minute.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-200" htmlFor="firstname">
              First name
              <input
                autoComplete="given-name"
                className={inputClassName}
                id="firstname"
                name="firstname"
                onChange={handleChange}
                placeholder="Alex"
                required
                value={form.firstname}
              />
            </label>
            <label className="block text-sm font-medium text-zinc-200" htmlFor="lastname">
              Last name
              <input
                autoComplete="family-name"
                className={inputClassName}
                id="lastname"
                name="lastname"
                onChange={handleChange}
                placeholder="Morgan"
                required
                value={form.lastname}
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-zinc-200" htmlFor="username">
            Username
            <input
              autoComplete="username"
              className={inputClassName}
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="alexmorgan"
              required
              value={form.username}
            />
          </label>

          <label className="block text-sm font-medium text-zinc-200" htmlFor="email">
            Email address
            <input
              autoComplete="email"
              className={inputClassName}
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-200" htmlFor="password">
              Password
              <input
                autoComplete="new-password"
                className={inputClassName}
                id="password"
                minLength={8}
                name="password"
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
                type="password"
                value={form.password}
              />
            </label>
            <label className="block text-sm font-medium text-zinc-200" htmlFor="confirmPassword">
              Confirm password
              <input
                autoComplete="new-password"
                className={inputClassName}
                id="confirmPassword"
                minLength={8}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Re-enter password"
                required
                type="password"
                value={form.confirmPassword}
              />
            </label>
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-4 py-3 text-sm text-rose-200" role="status">
              {success} <Link className="font-semibold text-rose-100 underline underline-offset-4 hover:text-white" to="/login">Log in</Link>
            </p>
          )}

          <button
            className="w-full rounded-xl bg-red-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-950/50 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#070708] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link className="font-semibold text-red-400 transition hover:text-red-300" to="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
