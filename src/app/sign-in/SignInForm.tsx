'use client';

import { useSignIn } from '@clerk/nextjs';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

interface SignInValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string().required('Required'),
});

const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [signInError, setSignInError] = useState(null);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignInSchema}
      onSubmit={async (values: SignInValues, { setSubmitting }: FormikHelpers<SignInValues>) => {
        if (!isLoaded) {
          return;
        }

        try {
          const result = await signIn.create({
            identifier: values.email,
            password: values.password,
          });

          if (result.status === 'complete') {
            await setActive({ session: result.createdSessionId });
            router.push('/');
          } else {
            console.error(JSON.stringify(result, null, 2));
          }
        } catch (error: any) {
          setSignInError(error.errors[0].longMessage);
          console.error(JSON.stringify(error, null, 2));
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='w-1/2 flex flex-col gap-3'>
          <h1 className='text-2xl font-bold self-start mb-5'>Create account</h1>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-sm mb-2'>
              Email
            </label>
            <div className='flex gap-2 bg-gray-700 p-2 rounded-md'>
              <Field
                className='w-full bg-transparent placeholder-gray-400 focus:outline-none text-sm'
                type='email'
                name='email'
                id='email'
                placeholder='user@email.com'
              />
            </div>
            {errors.email && touched.email ? <p className='text-xs text-red-400'>{errors.email}</p> : null}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-sm mb-2'>
              Password
            </label>
            <div className='flex gap-2 bg-gray-700 p-2 rounded-md'>
              <Field
                className='w-full bg-transparent placeholder-gray-400 focus:outline-none text-sm'
                type='password'
                name='password'
                id='password'
                placeholder='****'
              />
            </div>
            {errors.password && touched.password ? <p className='text-xs text-red-400'>{errors.password}</p> : null}
          </div>

          {signInError ? <p className='text-md text-red-400'>{signInError}</p> : null}

          <button
            disabled={isSubmitting}
            type='submit'
            className='font-medium bg-blue-500 py-3 mt-3 rounded-md flex items-center justify-center hover:bg-blue-600'
          >
            Sign In
          </button>
          <Link href='/sign-up' className='text-sm text-center hover:underline'>
            Need an account? Sign up instead
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
