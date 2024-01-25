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

const ProductListing = ({
  filterData,
  viewType,
  setViewType,
  setFilterData,
  setList,
  setTotal,
  setThumbnailUrls,
  page,
  setPage,
  total,
  list,
  thumbnailUrls,
  nextPage,
  prevPage,
  isLoading
}) => {
  const searchCourseData = async searchQuery => {
    try {
      const response = await axios.get(`/kms/courses/by-everything`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`,
          keyword: searchQuery,
          tags: null
        }
      })
      setList(response?.data)
      const thumbnails = response?.data?.map(course => course.courseThumbnail).filter(Boolean)

      const urlPromises = thumbnails?.map(async thumbnail => {
        try {
          const responsethumbnail = await axios.get(`/kms/courses/file/${thumbnail}?fileType=thumbnail`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
            },
            responseType: 'arraybuffer'
          })

          const blob = new Blob([responsethumbnail.data], {
            type: 'image/jpeg'
          })
          const dataUrl = URL.createObjectURL(blob)

          return { [thumbnail]: dataUrl }
        } catch (err) {
          console.log(err)
        }
      })

      const urls = await Promise.all(urlPromises)

      const mergedUrls = Object.assign({}, ...urls.filter(Boolean))
      console.log(mergedUrls, 'mergedUrls')

      // Set the obtained URLs
      setThumbnailUrls(mergedUrls)
    } catch (err) {
      console.log(err)
    }
  }

  const onPageChange = (event, value) => {
    setPage(value)
  }

  const searchProduct = title => {
    setFilterData({ ...filterData, title })
  }

  const SearchcoursesData = title => {
    setList(title)
  }

  return (
    <>
      <AppsHeader>
        <ProductHeader
          list={list}
          viewType={viewType}
          page={page}
          totalProducts={total}
          onPageChange={onPageChange}
          onSearch={searchCourseData}
          setViewType={setViewType}
          nextPage={nextPage}
          prevPage={prevPage}
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
            <ProductGrid ecommerceList={list} thumbnailUrls={thumbnailUrls} loading={isLoading} />
          ) : (
            <ProductList ecommerceList={list} thumbnailUrls={thumbnailUrls} loading={isLoading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {list?.length > 0 ? (
          <AppsFooter>
            <AppsPagination count={total} rowsPerPage={10} page={page} onPageChange={onPageChange} />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  )
}

export default ProductListing
ProductListing.propTypes = {
  filterData: PropTypes.object,
  viewType: PropTypes.string,
  setViewType: PropTypes.func,
  setFilterData: PropTypes.func,
  setList: PropTypes.any,
  setTotal: PropTypes.any,
  setThumbnailUrls: PropTypes.any,
  setPage: PropTypes.any,
  total: PropTypes.any,
  list: PropTypes.any,
  thumbnailUrls: PropTypes.any,
  page: PropTypes.any,
  nextPage: PropTypes.any,
  prevPage: PropTypes.any,
  isLoading: PropTypes.any
}
