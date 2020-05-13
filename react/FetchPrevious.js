import React from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

import FetchPreviousButton from './components/loaders/FetchPreviousButton'
import { useFetchMore } from './hooks/useFetchMore'
import styles from './searchResult.css'

const FetchPrevious = () => {
  const { searchQuery, maxItemsPerPage, page } = useSearchPage()
  const products = path(['data', 'productSearch', 'products'], searchQuery)
  const recordsFiltered = path(
    ['data', 'productSearch', 'recordsFiltered'],
    searchQuery
  )

  const fetchMore = path(['fetchMore'], searchQuery)
  const queryData = {
    query: path(['variables', 'query'], searchQuery),
    map: path(['variables', 'map'], searchQuery),
    orderBy: path(['variables', 'orderBy'], searchQuery),
    priceRange: path(['variables', 'priceRange'], searchQuery),
  }

  const { handleFetchMorePrevious, loading, from } = useFetchMore({
    page,
    recordsFiltered,
    maxItemsPerPage,
    fetchMore,
    products,
    queryData,
  })

  return (
    <div
      className={classNames(
        styles['buttonShowMore--layout'],
        'w-100 flex justify-center'
      )}
    >
      <FetchPreviousButton
        products={products}
        from={from}
        recordsFiltered={recordsFiltered}
        onFetchPrevious={handleFetchMorePrevious}
        loading={loading}
      />
    </div>
  )
}

export default FetchPrevious
