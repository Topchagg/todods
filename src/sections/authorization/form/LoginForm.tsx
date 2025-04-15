'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authApp } from '@/firebase/firebase';
import LoadingItem from '@/shared/LoadingItem';
import isEmail from 'validator/lib/isEmail';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(authApp, email, password);
      console.log('User logged in successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mt-5">
            <label htmlFor="email">Email</label>
          </div>
          <input
            {...register('email', {
              required: 'Email is required',
              validate: (value) => isEmail(value) || 'Invalid email address',
            })}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border p-2 w-full mt-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-5">
          <div className="mt-5">
            <label htmlFor="password">Password</label>
          </div>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border p-2 w-full mt-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
