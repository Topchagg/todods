'use client';

import { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authApp } from '@/firebase/firebase';
import { db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import LoadingItem from '@/shared/LoadingItem';
import isEmail from 'validator/lib/isEmail';

interface RegisterFormData {
  email: string;
  password: string;
  username: string;
}

const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password, username } = data;

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        authApp,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username,
        desks: [],
      });

      console.log('✅ User registered and saved to Firestore');
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

        <div>
          <div className="mt-5">
            <label htmlFor="username">Username</label>
          </div>
          <input
            {...register('username', {
              required: 'Username is required',
            })}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="border p-2 w-full mt-2"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
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

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 w-full cursor-pointer hover:scale-[0.95] transition-all duration-300 active:bg-blue-700 active:scale-[0.8]"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
