import React, { useEffect, useState } from 'react'
import ProductsSidebar from './sidebar/index'
import ProductListing from './list/index'
import AppsContainer from '../AppsContainer'
import {
  jobAction,
  jobData,
  jobError,
  jobIsError,
  jobIsLoading,
  jobIsSuccess,
  resetjobAction
} from 'src/redux/features/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

export const VIEW_TYPE = {
  GRID: 'grid',
  LIST: 'list'
}
const Products = () => {
  const [filterData, setFilterData] = useState({
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: []
  })
  const [viewType, setViewType] = useState(VIEW_TYPE.LIST)
  const [page, setPage] = useState(0)
  const [list, setList] = useState([])
  const [thumbnailUrls, setThumbnailUrls] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  const data = useSelector(jobData)
  const isLoading = useSelector(jobIsLoading)
  const isError = useSelector(jobIsError)
  const error = useSelector(jobError)
  const isSuccess = useSelector(jobIsSuccess)

  useEffect(() => {
    dispatch(jobAction(currentPage))
    resetjobAction()
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  return (
    <AppsContainer
      title={'JOB LIST'}
      sidebarContent={
        <ProductsSidebar
          filterData={filterData}
          setFilterData={setFilterData}
          setList={setList}
          list={list.results}
          setTotal={setTotal}
        />
      }
    >
      <ProductListing
        filterData={filterData}
        viewType={viewType}
        setViewType={setViewType}
        setFilterData={setFilterData}
        setList={setList}
        setThumbnailUrls={setThumbnailUrls}
        setTotal={setTotal}
        setPage={setPage}
        page={page}
        total={total}
        list={data.results}
        thumbnailUrls={thumbnailUrls}
        nextPage={nextPage}
        prevPage={prevPage}
        isLoading={isLoading}
      />
    </AppsContainer>
  )
}

export default Products
