function Login() {
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all hover:scale-105">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to manage your tasks efficiently
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>By signing in, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
