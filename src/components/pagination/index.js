import { FaAngleRight, FaAlignLeft } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

export default function Pagination({
  onPageChange,
  page,
  pageRangeDisplayed,
  pageCount,
}) {
  return (
    <>
      <ReactPaginate
        initialPage={page}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="react-paginate"
        pageClassName="page"
        pageLinkClassName="page-link"
        activeClassName="selected"
        breakClassName={'break-me'}
        nextClassName="page"
        previousClassName="page"
        breakLabel={'...'}
        previousLabel={
          <div className="page">
            <FaAlignLeft />
            <span>Previous</span>
          </div>
        }
        nextLabel={
          <div className="page">
            <span>Next</span>
            <FaAngleRight />
          </div>
        }
      />
    </>
  )
}
