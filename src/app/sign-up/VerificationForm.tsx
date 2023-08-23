'use client';

import { useSignUp } from '@clerk/nextjs';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface VerificationValues {
  code: string;
}

const VerificationSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
});

const VerificationForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        code: '',
      }}
      validationSchema={VerificationSchema}
      onSubmit={async (values: VerificationValues, { setSubmitting }: FormikHelpers<VerificationValues>) => {
        if (!isLoaded) {
          return;
        }

        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({ code: values.code });

          if (completeSignUp.status !== 'complete') {
            console.log(JSON.stringify(completeSignUp, null, 2));
          }

          if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId });
            router.push('/');
          }
        } catch (error) {
          console.error(JSON.stringify(error, null, 2));
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='w-1/2 flex flex-col gap-3'>
          <h1 className='text-2xl font-bold self-start mb-5'>Create account</h1>
          <div className='flex flex-col'>
            <label htmlFor='code' className='text-sm mb-2'>
              Email
            </label>
            <div className='flex gap-2 bg-gray-700 p-2 rounded-md'>
              <Field
                className='w-full bg-transparent placeholder-gray-400 focus:outline-none text-sm'
                type='text'
                name='code'
                id='code'
                placeholder='1234ABC'
              />
            </div>
            {errors.code && touched.code ? <p className='text-xs text-red-400'>{errors.code}</p> : null}
          </div>
          <button
            disabled={isSubmitting}
            type='submit'
            className='font-medium bg-blue-500 py-3 mt-3 rounded-md flex items-center justify-center hover:bg-blue-600'
          >
            Submit Code
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default VerificationForm;
