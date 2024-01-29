import React from 'react'
import AppGrid from '../../../AppGrid'

import PropTypes from 'prop-types'
import GridItem from './Griditem'
import ListEmptyResult from 'src/components/AppList/ListEmptyResult'

const ProductGrid = ({ ecommerceList, loading, thumbnailUrls }) => (
  <AppGrid
    delay={200}
    responsive={{
      xs: 1,
      sm: 2,
      xl: 3
    }}
    data={ecommerceList}
    renderRow={item => <GridItem item={item} key={item.id} thumbnailUrls={thumbnailUrls} />}
    ListEmptyComponent={<ListEmptyResult content='No product found' loading={loading} />}
  />
)

export default ProductGrid

ProductGrid.propTypes = {
  ecommerceList: PropTypes.array,
  loading: PropTypes.bool,
  thumbnailUrls: PropTypes.object
}
