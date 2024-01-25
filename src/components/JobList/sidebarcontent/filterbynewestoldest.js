import React, { useState } from 'react'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const JobFilter = ({ onFilterChange }) => {
  const handleFilterChange = event => {
    onFilterChange(event.target.value)
  }

  return (
    <div>
      <label htmlFor='filter'>Filter by:</label>
      <select id='filter' onChange={handleFilterChange}>
        <option value='newest'>Newest</option>
        <option value='oldest'>Oldest</option>
      </select>
    </div>
  )
}

export default JobFilter
