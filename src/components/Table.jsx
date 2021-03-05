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
        {
          transactionData.map((transaction, index) => {
            return (
              <div className="transaction-table__info-row" key={index}>
                <h2 className="transaction-table__date">{
                  // Date.parse(transaction.Date)
                  // new Date(transaction.Date) 
                  transaction.Date
                }</h2>
                <h2 className="transaction-table__company">{transaction.Company}</h2>
                <h2 className="transaction-table__account">{transaction.Ledger}</h2>
                <h2 className="transaction-table__amount">$ {transaction.Amount}</h2>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Table
