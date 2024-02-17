'use client'

import { signInWithGooglePopup, signOutUser ,createUserDocumentFromAuth } from '../utils/firebase.utils';
import Image from 'next/image'

import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const SignInButton = () => {
  const { currentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
    alert('Sign in was successfully done!');
  };

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <div className='flex items-center gap-5'>
      {
        currentUser ? (
          <button onClick={signOutHandler}>
            Sign Out
          </button>
        ) : (
          <button onClick={signInWithGoogle}>
            Sign In Google
          </button>
        )
      }
      <Image
        src={currentUser ? currentUser.photoURL : 'https://avatars.githubusercontent.com/u/71235139?v=4'}
        width={45}
        height={45}
        alt='profile'
        className='object-contain rounded-full'
      />
    </div>
  )
}

export default SignInButton