import React from 'react'
import AppList from '../../../AppList'
import PropTypes from 'prop-types'
import ListItem from './listitem'
import ListEmptyResult from 'src/components/AppList/ListEmptyResult'

const ProductList = ({ ecommerceList, loading, thumbnailUrls }) => {
  return (
    <AppList
      delay={200}
      data={ecommerceList}
      renderRow={item => <ListItem item={item} key={item.id} thumbnailUrls={thumbnailUrls} />}
      ListEmptyComponent={<ListEmptyResult content='No product found' loading={loading} />}
    />
  )
}

export default ProductList

ProductList.propTypes = {
  ecommerceList: PropTypes.array,
  loading: PropTypes.bool,
  thumbnailUrls: PropTypes.object
}
