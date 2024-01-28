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
    <AppsContainer title={'JOB LIST'} sidebarContent={<ProductsSidebar />}>
      <ProductListing
        viewType={viewType}
        setViewType={setViewType}
        list={data.results}
        nextPage={nextPage}
        prevPage={prevPage}
        isLoading={isLoading}
        setList={setList}
      />
    </AppsContainer>
  )
}

export default Products
