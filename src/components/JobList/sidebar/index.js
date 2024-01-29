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

const ProductSidebar = ({}) => {
  const handleFilterChange = newFilter => {
    setFilter(newFilter)
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
          <AppList data={brandData} renderRow={data => <CheckedCell key={data.id} data={data} />} />
        </Box>
      </Box>
    </AppScrollbar>
  )
}

export default ProductSidebar
ProductSidebar.propTypes = {}
