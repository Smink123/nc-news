import "./CSS/sorting-nav.css";

export default function SortManager({setSortBy, setOrderByTerm, orderByTerm, orderBy, sortBy}) {

    const setOrderBy = (order) => {
        const newOrderBy = new URLSearchParams(orderByTerm)
        newOrderBy.set("order", order)
        setOrderByTerm(newOrderBy)
    }

  return (
    <nav id="sorting-nav-container">
      <div id="sort-options">
        <p className="sort-titles">Sort by:</p>
        <div>
        {sortBy === 'created_at' ? (
            <button className='sort-buttons selected' onClick={() => setSortBy('created_at')}>Date</button>
          ):(
            <button className='sort-buttons' onClick={() => setSortBy('created_at')}>Date</button>
          ) }
        </div>
        <div>
        {sortBy === 'comment_count' ? (
            <button className='sort-buttons selected' onClick={() => setSortBy('comment_count')}>Comment count</button>
          ):(
            <button className='sort-buttons' onClick={() => setSortBy('comment_count')}>Comment count</button>
          ) }
        </div>
        <div>
          {sortBy === 'votes' ? (
            <button className='sort-button selected' onClick={() => setSortBy('votes')}>Votes</button>
          ):(
            <button className='sort-buttons' onClick={() => setSortBy('votes')}>Votes</button>
          ) }
        </div>
        <p className="sort-titles">Order by:</p>
        
        <div>
          {orderBy === 'asc' ? (
            <button className='sort-buttons selected' onClick={() => setOrderBy('asc')}>Ascending</button>
          ):(
            <button className='sort-buttons' onClick={() => setOrderBy('asc')}>Ascending</button>
          ) }
        </div>
        <div>
          {orderBy === 'desc' ? (
            <button className='sort-buttons selected' onClick={() => setOrderBy('desc')}>Descending <span id='default-order'>(default)</span></button>
          ):(
            <button className='sort-buttons' onClick={() => setOrderBy('desc')}>Descending <span id='default-order'>(default)</span></button>
          ) }
        </div>
      </div>
    </nav>
  );
}