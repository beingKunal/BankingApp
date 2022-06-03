import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Actions";
import CurrentBalance from "./CurrentBalance";
import SearchBox from "./Searchbox";
import styles from './transactions.module.css'
const Transactions = () => {

  // const [transactions , setTransactions] =  useState([])
  const currentSearch = useSelector((state) => state.Search)
  const transactions = useSelector(state => state.Transactions);

  const { currentUser } = useSelector(state => state.UserReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    if (transactions.length !== 0) {
      return
    }
    // console.log("outside if")
    async function getTransactions() {
      await fetch(`http://localhost:3000/transactions?userId=${currentUser.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then((res) => {
          // console.log("Trnsactions" , res)
          //  setTransactions(res)
          dispatch(allActions.Transactions(res))
        })
    }
    getTransactions()
  }, [])

  let filteredTransactions = currentSearch === '' ? transactions : transactions.filter((transaction) => transaction.Description.toLowerCase().includes(currentSearch.toLowerCase()))
  return (
    <div >
      <h2 className={styles.myTransactions}>My Transactions</h2>
      <CurrentBalance />
      <SearchBox />
      {filteredTransactions && filteredTransactions.length > 0 ?


        <table >
          <thead>
            <tr>
              <th>Transaction Type</th>
              <th>Transaction Amount</th>
              <th>Transaction Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => {
              return <tr key={transaction.id}><td>{transaction.tType}</td><td>{transaction.Amount}</td><td>{transaction.Date}</td><td>{transaction.Description}</td></tr>
            })}
          </tbody>
        </table> : <h2 className={styles.noTrans}>No transactions !!!!</h2>}
    </div>)
}

export default Transactions; 