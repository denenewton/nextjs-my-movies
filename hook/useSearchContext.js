'use client'

import { useContext } from 'react';
import SearchContext from '../context/SearchContext';


const useSearchContext = () =>   useContext(SearchContext)


export default useSearchContext