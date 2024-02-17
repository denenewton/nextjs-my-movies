'use client'


import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const useAuth = () => useContext(UserContext);

export default useAuth