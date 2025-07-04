import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

const AccountDetails = () => {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    age: '',
    school: '',
    education_program: '',
    graduation_year: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  console.log('user:', user);
  console.log('authLoading:', authLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!user) {
      setError('Not authenticated.');
      setLoading(false);
      return;
    }
    if (!form.username.trim()) {
      setError('Username is required.');
      setLoading(false);
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setError('Username can only contain letters, numbers, and underscores.');
      setLoading(false);
      return;
    }
    if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 120)) {
      setError('Please enter a valid age.');
      setLoading(false);
      return;
    }
    if (form.graduation_year && (parseInt(form.graduation_year) < 1900 || parseInt(form.graduation_year) > 2100)) {
      setError('Please enter a valid graduation year.');
      setLoading(false);
      return;
    }
    // Check for unique username
    const { data: existing } = await supabase.from('profiles').select('id').eq('username', form.username).neq('id', user.id);
    if (existing && existing.length > 0) {
      setError('Username is already taken. Please choose another.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      username: form.username,
      first_name: form.first_name,
      last_name: form.last_name,
      age: form.age ? parseInt(form.age) : null,
      school: form.school,
      education_program: form.education_program,
      graduation_year: form.graduation_year ? parseInt(form.graduation_year) : null,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-16 h-16 mb-2" />
          <h2 className="text-2xl font-bold mb-1 text-primary">Complete Your Profile</h2>
          <p className="text-gray-500 text-sm">Tell us more about you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Username *</label>
            <input name="username" value={form.username} onChange={handleChange} required className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input name="age" type="number" min="0" value={form.age} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">School / University</label>
            <input name="school" value={form.school} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Current Education Program</label>
            <input name="education_program" value={form.education_program} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Graduation Year</label>
            <input name="graduation_year" type="number" min="1900" max="2100" value={form.graduation_year} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-primary bg-gray-50" />
          </div>
        </div>
        {error && <div className="mb-4 text-red-600 text-center bg-red-50 rounded p-2 animate-shake">{error}</div>}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition-colors shadow-md" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
};

export default AccountDetails; 