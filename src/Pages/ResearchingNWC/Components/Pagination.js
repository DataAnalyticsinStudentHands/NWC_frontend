import ReactPaginate from 'react-paginate';
import LeftButtonIcon from '../res/Left Button.svg';
import RightButtonIcon from '../res/Right Button.svg';
import './ResultTableMap/ResultTableMap.css'

export const Pagination = (props) => {
    return (
        <ReactPaginate
            containerClassName="Research-Pagination"
            nextLabel={<img src={RightButtonIcon} alt="RightButtonIcon" />}
            previousLabel={<img src={LeftButtonIcon} alt="LeftButtonIcon" />}
            previousLinkClassName=""
            nextLinkClassName={""}
            disabledClassName={"disabled"}
            activeClassName={"active"}
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={props.handlePageClick}
            renderOnZeroPageCount={null}
            breakLabel="..."
        />
    );
}

