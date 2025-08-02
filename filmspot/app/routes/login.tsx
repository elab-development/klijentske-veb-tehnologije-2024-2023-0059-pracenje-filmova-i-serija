import React, { useState } from 'react';
import LightRays from '~/components/ReachBitsLightRays';

export default function FilmSpotAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isSignUp) {
      console.log('Sign up attempt:', { username, email, password });
    } else {
      console.log('Login attempt:', { username, password });
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToLogin = () => {
    setIsSignUp(false);
  };

  return (
    <div className="min-h-screen flex items-start lg:items-center justify-center p-4 max-[600px]:px-0">
      
      <LightRays
        raysOrigin="right"
        raysColor="#00ffff"
        raysSpeed={.4}
        lightSpread={0.5}
        rayLength={2}
        followMouse={true}
        mouseInfluence={0.025}
        noiseAmount={0.1}
        distortion={0.1}
        className="custom-rays !fixed brightness-170"
      />
        
      <div className="w-full max-w-6xl flex flex-col-reverse lg:grid lg:grid-cols-2 gap-5 lg:gap-15 items-center z-40 p-5">
        <div className="w-full bg-[var(--backgroundTransparentSecondary)] backdrop-blur-sm border border-[var(--borderColorSecondary)] rounded-2xl p-10 pb-20 max-[600px]:p-6 shadow-2xl shrink-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 transition-all duration-300">
              {isSignUp ? 'Create an account' : 'Sign in'}
            </h1>
            <p className="text-gray-400 transition-all duration-300">
              {isSignUp ? (
                <>
                  Have an account?{' '}
                  <button 
                    onClick={switchToLogin}
                    className="text-[#43DFD7] hover:brightness-120 transition-all"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  New user?{' '}
                  <button 
                    onClick={switchToSignUp}
                    className="text-[#43DFD7] hover:brightness-120 transition-all"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="space-y-6">
            <div className="transform transition-all duration-500 ease-in-out">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--backgroundTransparentSecondary)] border border-[var(--borderColorSecondary)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43DFD7] focus:border-transparent transition-all"
              />
            </div>

            <div className={`transform transition-all duration-500 ease-in-out overflow-hidden p-[2px] mx-[-2px] ${
              isSignUp 
                ? 'opacity-100 max-h-20 translate-y-0'
                : 'opacity-0 max-h-0 -translate-y-4 my-[-0.1rem]'
            }`}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--backgroundTransparentSecondary)] border border-[var(--borderColorSecondary)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43DFD7] focus:border-transparent transition-all"
              />
            </div>

            <div className="transform transition-all duration-500 ease-in-out">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--backgroundTransparentSecondary)] border border-[var(--borderColorSecondary)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43DFD7] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#43DFD7] hover:bg-[#a1fffa] text-slate-900 font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              {isSignUp ? 'Start your journey' : 'Sign in'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--borderColorSecondary)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-white">OR WITH</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 bg-[#ffffff10] hover:bg-[#ffffff20] text-white font-medium py-3 px-4 rounded-lg border border-slate-600 transition-all flex items-center justify-center space-x-2 transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center lg:text-left mb-5 max-[600px]:mb-0">
          <div className="flex items-center justify-center lg:justify-start mb-6 max-[600px]:mb-0 gap-3">
            <svg className='ml-[-5px]' width="60" height="60" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.79 23.79C10.79 16.614 16.614 10.79 23.79 10.79H80.145C87.321 10.79 93.145 16.614 93.145 23.79V80.145C93.145 87.321 87.321 93.145 80.145 93.145H23.79C16.614 93.145 10.79 87.321 10.79 80.145V23.79Z" fill="white"/>
                <path d="M21.684 31.837C21.476 27.534 24.804 23.881 29.107 23.673L72.1241 21.684C76.427 21.476 80.0801 24.804 80.2751 29.107L82.2771 72.1241C82.4721 76.427 79.1441 80.0801 74.8411 80.2751L31.837 82.2771C27.534 82.4721 23.881 79.1441 23.673 74.8411L21.684 31.837Z" fill="#43DFD7"/>
                <path d="M31.005 37.388C41.665 35.4206 55.2933 33.9516 71.89 32.981C72.618 41.2663 72.7307 47.437 72.228 51.493C65.9273 51.6316 59.7523 52.0043 53.703 52.611L54.08 56.836C58.5867 56.3593 62.127 56.056 64.701 55.926C64.9523 58.656 64.9393 63.3446 64.662 69.992C61.386 70.2693 58.1533 70.5726 54.964 70.902C55.042 75.1313 55.237 79.846 55.549 85.046C49.959 85.982 44.6247 86.45 39.546 86.45C39.3293 85.4446 38.8137 74.5983 37.999 53.911L31.967 54.665C31.525 49.283 31.2043 43.524 31.005 37.388Z" fill="white"/>
            </svg>
            <h2 className="text-4xl font-bold text-white"><span className='text-[#43DFD7]'>Film</span>Spot</h2>
          </div>

          <div className="space-y-4 text-slate-300">
            <p className="text-lg leading-relaxed max-[600px]:hidden transition-all duration-300">
              {
                isSignUp ? 'Join our community of movie enthusiasts! Create your account to start building your personal movie collection and discover new favorites.'
                : `Welcome to the world of movies and TV shows! Create an account to keep a list of your favorite movies, rank and rate them. It's free, always.`
              }
            </p>
            <p className="text-sm text-slate-400 max-[600px]:hidden transition-all duration-300">
              By signing in you accept our{' '}
              <button className="text-[#43DFD7] hover:text-cyan-300 transition-colors underline">
                Terms of Use
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}