import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageNumbers = [
    { number: 1, title: 'Page 1' },
    { number: 2, title: 'Page 2' },
    { number: 3, title: 'Page 3' },
    { number: 4, title: 'Page 4' },
  ];

  useEffect(() => {
    axios
      .get(`https://resttest.bench.co/transactions/${pageNumber}.json`)
      .then((res) => {
        setTransactionData(res.data.transactions)
        setFetchingData(res.status === 200 ? false : true)
      });
    getTotalAmount()

  }, [pageNumber])

  const pageNumberSelect = (e) => {
    setPageNumber(e.target.innerHTML);
  }

  // ! this piece of code was obtained from stack overflow @ https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  let total = [];

  const getTotalAmount = () => {
    transactionData.forEach((data) => {
      // console.log(data.Amount)
      // totalAmount.push(Math.abs(parseFloat(data.Amount, 10)))
      total.push(parseFloat(data.Amount, 10))
      console.log(total)
      setTotalAmount(total)
    })
  }

  console.log(totalAmount)

  return (
    <>
      {
        fetchingData
          ? <div>< h1 > Fetching Data...</h1 ></div >
          : (
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
                          // total
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
                        <div className=
                          {
                            transaction.Amount > 0
                              ? 'transaction-table__info-row transaction-table__info-row--income'
                              : 'transaction-table__info-row'
                          }
                          key={index}>
                          <h2 className="transaction-table__date">{transaction.Date}</h2>
                          <h2 className="transaction-table__company">
                            {
                              titleCase(transaction.Company)
                            }
                          </h2>
                          <h2 className="transaction-table__account">{transaction.Ledger}</h2>
                          <h2 className="transaction-table__amount">$ {
                            transaction.Amount
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
                      <>
                        <p className='transaction-table__page-number' key={index}>{page.number}</p>
                      </>
                    )
                  })
                }
              </div>
            </>
          )
      }
    </>
  )
}

export default Table
