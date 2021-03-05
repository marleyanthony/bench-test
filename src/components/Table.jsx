import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageNumbers = [1, 2, 3, 4];

  useEffect(() => {
    axios
      .get(`https://resttest.bench.co/transactions/${pageNumber}.json`)
      .then((res) => {
        setTransactionData(res.data.transactions)
      });
  }, [pageNumber])

  const pageNumberSelect = (e) => {
    setPageNumber(e.target.innerHTML);
  }

  // ! this piece of code was obtained from stack overflow @ https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  transactionData.map((item, index) => {
    totalAmount.push(Math.abs(parseFloat(item.Amount, 10)))
    console.log(totalAmount.reduce((a, b) => a + b, 0))
  })

  return (
    <>
      <section className="transaction-table">
        <div className="transaction-table__labels">
          <h2 className="transaction-table__label-name">Date</h2>
          <h2 className="transaction-table__label-name">Company</h2>
          <h2 className="transaction-table__label-name">Account</h2>
          <h2 className="transaction-table__label-total">
            $ {
              numberWithCommas(
                totalAmount
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)
              )
            }
          </h2>
        </div>
        <div className="transaction-table__info">
          {
            transactionData.map((transaction, index) => {
              return (
                <div className="transaction-table__info-row" key={index}>
                  <h2 className="transaction-table__date">{transaction.Date}</h2>
                  <h2 className="transaction-table__company">{transaction.Company}</h2>
                  <h2 className="transaction-table__account">{transaction.Ledger}</h2>
                  <h2 className="transaction-table__amount">$ {
                    Math.abs(parseFloat(transaction.Amount, 10))
                  }</h2>
                </div>
              )
            })
          }
        </div>
      </section>
      <div className="transaction-table__page-select" onClick={pageNumberSelect}>
        {
          pageNumbers.map((page, index) => {
            return (
              <p className="transaction-table__page-number" key={index}>{page}</p>
            )
          })
        }
      </div>
    </>
  )
}

export default Table
