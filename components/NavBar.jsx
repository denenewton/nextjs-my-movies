import Link from "next/link"
import Image from "next/image"
import SignInButton from "./SignInButton"

const NavBar = () => {
  return (
    <header className='flex w-full justify-between items-center bg-gray-900 py-1 px-4 text-slate-50 fixed top-0 z-10'>
      <div>
        <Link className=' rounded-full' href={'/'}>
          <Image
            src={'/assets/crown.svg'}
            width={45}
            height={45}
            alt='logo'
            className='w-auto h-auto ' />

          <span className='block text-center text-gray-500 text-sm mt-[-2px]'>movies</span>
        </Link>
      </div>
      <nav className='flex items-center gap-5'>
        <Link href={'/profile'}>Profile</Link>
        <Link href={'/create-movie'}>Create Movie</Link>
        <SignInButton />
      </nav>
    </header>
  )
}

export default NavBar