import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false)
  const [transactionData, setTransactionData] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageNumbers = [1, 2, 3, 4];
  let total = [];

  // ! effect to update the total amount and get data 
  // ! not fully working the way I'd expect but I would like to talk more about it 
  useEffect(() => {
    axios
      .get(`https://resttest.bench.co/transactions/${pageNumber}.json`)
      .then((res) => {
        setTransactionData(res.data.transactions)
        setFetchingData(res.status === 200 ? false : true)
      })
      .catch((error) => {
        error ? setError(true) : setError(false);
      })
    getTotalAmount()

  }, [pageNumber])

  const pageNumberSelect = (e) => {
    setPageNumber(e.target.innerHTML);
  }

  // ! this piece of code was obtained from stack overflow @ https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript to add number separator at the thousands position
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // !this piece of code was obtained from stack overflow @ https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript to change text from all upper case to each letter capitalized 
  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }


  // ! get total amount for payments and account deductions 
  const getTotalAmount = () => {
    transactionData.forEach((data) => {
      total.push(parseFloat(data.Amount, 10))
      console.log(total)
      setTotalAmount(total)
    })
  }

  return (
    <>
      {
        fetchingData
          ? <div>< h1 > Fetching Data...</h1 ></div>
          : error
            ? <div><h1>Sorry, an error occurred...</h1></div>
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
                            <h2 className="transaction-table__company">{titleCase(transaction.Company)}</h2>
                            <h2 className="transaction-table__account">
                              {
                                transaction.Ledger === ''
                                  ? 'Payment'
                                  : transaction.Ledger
                              }
                            </h2>
                            <h2 className="transaction-table__amount">$ {transaction.Amount}</h2>
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
                          <p className='transaction-table__page-number' key={index}>{page}</p>
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
