import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get('https://resttest.bench.co/transactions/1.json')
      .then((res) => {
        // console.log(res.data.transactions)
        setTransactionData(res.data.transactions)
        console.log(transactionData)
      });
  }, [])

  return (
    <section className="transaction-table">
      <div className="transaction-table__labels">
        <h2 className="transaction-table__label-name">Date</h2>
        <h2 className="transaction-table__label-name">Company</h2>
        <h2 className="transaction-table__label-name">Account</h2>
        <h2 className="transaction-table__label-total">$39,664.53</h2>
      </div>
      <div className="transaction-table__info">

      </div>
    </section>
  )
}

export default Table
