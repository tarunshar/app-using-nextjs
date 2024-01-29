import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { alpha, Box, Hidden } from '@mui/material'
import AppsPagination from '../../AppsPagination'
import ProductHeader from '../header'
import ProductGrid from './gridview'
import { VIEW_TYPE } from '../index'
import ProductList from './listview'
import axios from 'axios'
import AppsContent from 'src/components/AppsContainer/AppsContent'
import AppsHeader from 'src/components/AppsContainer/AppsHeader'
import AppsFooter from 'src/components/AppsContainer/AppsFooter'

const ProductListing = ({ viewType, setViewType, list, setList, nextPage, prevPage, isLoading }) => {
  const searchCourseData = async searchQuery => {}

  const onPageChange = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <AppsHeader>
        <ProductHeader
          list={list}
          viewType={viewType}
          setViewType={setViewType}
          nextPage={nextPage}
          prevPage={prevPage}
          setList={setList}
        />
      </AppsHeader>

      <AppsContent>
        <Box
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            py: 2,
            px: 4,
            height: 1,
            '& > div': {
              width: '100%'
            }
          }}
        >
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={list} loading={isLoading} />
          ) : (
            <ProductList ecommerceList={list} loading={isLoading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {list?.length > 0 ? (
          <AppsFooter>
            <AppsPagination />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  )
}

export default ProductListing

ProductListing.propTypes = {
  viewType: PropTypes.string,
  setViewType: PropTypes.func,
  list: PropTypes.any,
  nextPage: PropTypes.any,
  prevPage: PropTypes.any,
  isLoading: PropTypes.any,
  setList: PropTypes.any
}
