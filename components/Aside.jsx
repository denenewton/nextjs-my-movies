'use client'

import React from 'react'
import { Show } from '@chakra-ui/media-query'
import { usePathname } from 'next/navigation'
import { GridItem } from '@chakra-ui/layout'
import GenreList from './GenreList'

const Aside = () => {
  const pathName = usePathname()
  return (
    <>
      {
        pathName == '/' && (
          <Show above="lg">
            <GridItem
              area={"aside"}
              paddingX={0.5}
              marginLeft={'1.7rem'}
              paddingY="4rem"
              position={"fixed"}
              top={0}
            >
              <GenreList />
            </GridItem>
          </Show>
        )
      }
    </>
  )
}

export default Aside