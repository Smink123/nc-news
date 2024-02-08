import "./CSS/sorting-nav.css";

export default function SortManager({setSortBy, setOrderByTerm, orderByTerm}) {

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
            <button className='sort-buttons' onClick={() => setSortBy('created_at')}>Date</button>
        </div>
        <div>
            <button className='sort-buttons' onClick={() => setSortBy('comment_count')}>Comment count</button>
        </div>
        <div>
            <button className='sort-buttons' onClick={() => setSortBy('votes')}>Votes</button>
        </div>
        <p className="sort-titles">Order by:</p>
        <div>
          <button className='sort-buttons' onClick={() => setOrderBy('asc')}>Ascending</button>
        </div>
        <div>
          <button className='sort-buttons' onClick={() => setOrderBy('desc')}>Descending</button>
        </div>
      </div>
    </nav>
  );
}



// import "./CSS/sorting-nav.css";

// export default function SortManager({setSortBy, setOrderByTerm, orderByTerm}) {

//     const setOrderBy = (order) => {
//         const newOrderBy = new URLSearchParams(orderByTerm)
//         newOrderBy.set("order", order)
//         setOrderByTerm(newOrderBy)
//     }

//   return (
//     <nav id="sorting-nav-container">
//       <div id="sort-options">
//         <p>Sort by:</p>
//         <div>
//             <button className='sort-buttons' onClick={() => setSortBy('created_at')}>Date</button>
//         </div>
//         <div>
//             <button className='sort-buttons' onClick={() => setSortBy('comment_count')}>Comment count</button>
//         </div>
//         <div>
//             <button className='sort-buttons' onClick={() => setSortBy('votes')}>Votes</button>
//         </div>
//       </div>
//       <div id="order-options">
//         <p>Order by:</p>
//         <div>
//           <button className='sort-buttons' onClick={() => setOrderBy('asc')}>Ascending</button>
//         </div>
//         <div>
//           <button className='sort-buttons' onClick={() => setOrderBy('desc')}>Descending</button>
//         </div>
//       </div>
//     </nav>
//   );
// }