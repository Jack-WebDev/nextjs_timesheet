"use client"

import React, { useState, useEffect } from 'react';

interface Data {
  id: number;
  name: string;
}

const TableWithPagination: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage,] = useState(5);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = Array.from({length: 50}, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
    setData(fetchData);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTable = currentItems.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </tr>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        onClick={() => setCurrentPage(number)}
        style={{ cursor: 'pointer', padding: '5px', border: '1px solid #ccc' }}
      >
        {number}
      </li>
    );
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const itemsOnCurrentPage = currentItems.length;



  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {renderTable}
        </tbody>
      </table>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
      {renderPageNumbers}
    </ul>
    <p>You are on page {currentPage} of {totalPages}</p>
    <p>Showing {itemsOnCurrentPage} items on this page</p>

    </div>
  );
};

export default TableWithPagination;