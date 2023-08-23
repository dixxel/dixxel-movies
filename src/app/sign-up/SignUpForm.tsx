'use client';

import { useSignUp } from '@clerk/nextjs';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

interface Props {
  setPendingVerification: (state: boolean) => void;
}

interface SignUpValues {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Must be 8 characters or more')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/[@$!%*#?&]+/, 'One special character')
    .matches(/\d+/, 'One number'),
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
});

const SignUpForm: React.FC<Props> = ({ setPendingVerification }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstname: '',
        lastname: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values: SignUpValues, { setSubmitting }: FormikHelpers<SignUpValues>) => {
        if (!isLoaded) {
          return;
        }

        try {
          await signUp.create({
            emailAddress: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
          });

          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          setPendingVerification(true);
        } catch (error) {
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
          <div className='flex gap-2'>
            <div className='flex-1 flex flex-col'>
              <label htmlFor='firstname' className='text-sm mb-2'>
                Firstname
              </label>
              <div className='flex gap-2 bg-gray-700 p-2 rounded-md'>
                <Field
                  className='w-full bg-transparent placeholder-gray-400 focus:outline-none text-sm'
                  type='text'
                  name='firstname'
                  id='firstname'
                  placeholder='John'
                />
              </div>
              {errors.firstname && touched.firstname ? (
                <p className='text-xs text-red-400'>{errors.firstname}</p>
              ) : null}
            </div>
            <div className='flex-1 flex flex-col'>
              <label htmlFor='lastname' className='text-sm mb-2'>
                Lastname
              </label>
              <div className='flex gap-2 bg-gray-700 p-2 rounded-md'>
                <Field
                  className='w-full bg-transparent placeholder-gray-400 focus:outline-none text-sm'
                  type='text'
                  name='lastname'
                  id='lastname'
                  placeholder='Doe'
                />
              </div>
              {errors.lastname && touched.lastname ? <p className='text-xs text-red-400'>{errors.lastname}</p> : null}
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type='submit'
            className='font-medium bg-blue-500 py-3 mt-3 rounded-md flex items-center justify-center hover:bg-blue-600'
          >
            Sign Up
          </button>
          <Link href='/sign-in' className='text-sm text-center hover:underline'>
            Already a member? Sign in instead
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
