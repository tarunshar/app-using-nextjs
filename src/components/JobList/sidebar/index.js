import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Checkbox } from '@mui/material'
import Divider from '@mui/material/Divider'
import AppList from '../../AppList'
import AppScrollbar from 'src/components/AppScrollbar'
import AppGrid from 'src/components/AppGrid'
import PriceSelector from '../sidebarcontent/priceselector'
import CheckedCell from '../sidebarcontent/checkedcell'
import ProductsCategory from '../sidebarcontent/productcategory'
import JobFilter from '../sidebarcontent/filterbynewestoldest'

const ProductSidebar = ({ filterData, setFilterData, setList, setTotal }) => {
  const [selectedBrand, setSelectedBrand] = useState(filterData.brand)
  const [selectedFor, setSelectedFor] = useState(filterData.ideaFor)
  const [selectedDiscount, setSelectedDiscount] = useState(filterData.discount)
  const [selectedColor, setSelectedColor] = useState(filterData.color)
  const [customerRating, setCustomerRating] = useState(filterData.rating)
  const [filter, setFilter] = useState('newest')

  useEffect(() => {
    setFilterData({
      title: filterData.title,
      brand: selectedBrand,
      ideaFor: selectedFor,
      discount: selectedDiscount,
      color: selectedColor,
      rating: customerRating
    })
  }, [filterData.title, selectedBrand, selectedFor, selectedDiscount, selectedColor, customerRating])

  const handleFilterChange = newFilter => {
    setFilter(newFilter)
    // Perform the sorting logic based on the selected filter
    // You might want to update your data based on the filter
    // Example: dispatch(jobSortAction(newFilter));
  }

  const brandData = [
    {
      id: 1,
      name: 'Freelancer'
    },
    {
      id: 2,
      name: 'Full Time'
    },
    {
      id: 3,
      name: 'Part Time '
    },
    {
      id: 4,
      name: 'Temporary'
    }
  ]

  return (
    <AppScrollbar>
      <Box
        sx={{
          p: 6
        }}
      >
        <Box
          component='h5'
          sx={{
            mb: 2
          }}
        >
          Filter By
        </Box>

        <Box
          sx={{
            color: 'text.secondary',
            mb: 4
          }}
        >
          CATEGORIES
        </Box>
        <ProductsCategory />
        <Divider
          sx={{
            mt: 4
          }}
        />
        <Box
          sx={{
            color: 'text.secondary',
            my: 4
          }}
        >
          Radius around selected destination
        </Box>
        <PriceSelector />
        <Divider
          sx={{
            mt: 4
          }}
        />
        <Box
          sx={{
            color: 'text.secondary',
            my: 4
          }}
        >
          JOB LIST
          <AppList
            data={brandData}
            renderRow={data => (
              <CheckedCell key={data.id} data={data} onChange={() => console.log('data')} selected={selectedBrand} />
            )}
          />
        </Box>
      </Box>
    </AppScrollbar>
  )
}

export default ProductSidebar
ProductSidebar.propTypes = {
  filterData: PropTypes.object.isRequired,
  setFilterData: PropTypes.func.isRequired,
  setList: PropTypes.any,
  setTotal: PropTypes.any
}
