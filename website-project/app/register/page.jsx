import RegisterForm from '../../components/RegisterForm';

export default function RegisterPage() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="bg-black p-8 rounded shadow-md w-96 mb-40 outline outline-2">
              <h2 className="text-lime-400 text-2xl font-bold text-center mb-6">Create an Account</h2>
              <div className=''>
                  <RegisterForm />
              </div>
          </div>
      </div>
  );
}
