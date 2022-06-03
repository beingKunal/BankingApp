const filterTransactions = (payload) => {
    return {
        type: "FILTER",
        payload : payload
    }
}


export default filterTransactions ;