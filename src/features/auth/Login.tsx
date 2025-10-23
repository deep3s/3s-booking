import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabsContent } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Mail, Lock } from 'lucide-react';
import { useLoginMutation } from '../../services/auth.api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../app/store/authSlice';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error, isError, isSuccess, data }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username: email, password });
  };

  useEffect(() => {
    if (isSuccess && data && data.data) {
      dispatch(setCredentials({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        tokenType: data.data.tokenType,
        userId: data.data.userId,
        userName: data.data.userName,
        email: data.data.email,
        expiresIn: data.data.expiresIn,
        loading: false,
        error: null,
      }));
      navigate('/');
    }
  }, [isSuccess, data, dispatch, navigate]);

  // Extract error message from new API structure
  let errorMessage = '';
  if (isError && error && typeof error === 'object' && 'data' in error && error.data) {
    const errData = error.data as { message?: string; error?: string };
    errorMessage = errData?.message || errData?.error || 'Login failed';
  } else if (isError && error) {
    errorMessage = typeof error === 'string' ? error : 'Login failed';
  }
  // Extract success message
  const successMessage = isSuccess && data ? data.message : '';

  return (
    <TabsContent value="login" className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email" className="dark:text-white/80 cream:text-foreground/80">
            Username
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
            <Input
              id="login-email"
              placeholder="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password" className="dark:text-white/80 cream:text-foreground/80">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer dark:text-white/60 cream:text-foreground/60">
            <input type="checkbox" className="rounded border-[#d4af37]/30 text-[#d4af37] focus:ring-[#d4af37]" />
            Remember me
          </label>
          <button type="button" className="text-[#d4af37] hover:underline">
            Forgot password?
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-sm text-center">{successMessage}</div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center text-sm dark:text-white/60 cream:text-foreground/60">
        Don't have an account?{' '}
        <button className="text-[#d4af37] hover:underline" type="button">
          Sign up
        </button>
      </div>
    </TabsContent>
  );
}
