import axios from 'axios'

// let budgets = [
    
//     {
//         "_id": "1",
//         "title": "Budget_1",
//         "income": [
//             {
//                 "_id": "3",
//                 "source": "Military Pay",
//                 "value": 4865.45,
//                 "hours": 0,
//                 "frequency": "1st and 15th"
//             },
//             {
//                 "_id": "4",
//                 "source": "Spouse Income",
//                 "value": 2100,
//                 "hours": 40,
//                 "frequency": "bi-weekly"
//             }
//         ],
//         "expenses": [
//             {
//                 "_id": "5",
//                 "expenseName": "Mortgage",
//                 "expenseValue": 1611.32,
//                 "expensePriority": 2,
//                 "apr": 3.5,
//                 "term": 360
//             },
//             {
//                 "_id": "6",
//                 "expenseName": "Car Payment",
//                 "expenseValue": 496.45,
//                 "expensePriority": 2,
//                 "apr": 4.7,
//                 "term": 72
//             }
//         ]
//     },
//     {
//         "_id": "2",
//         "title": "Budget_2",
//         "income": [
//             {
//                 "_id": "7",
//                 "source": "Military Pay",
//                 "value": 4865.45,
//                 "hours": 0,
//                 "frequency": "1st and 15th"
//             },
//             {
//                 "_id": "8",
//                 "source": "Spouse Income",
//                 "value": 2100,
//                 "hours": 40,
//                 "frequency": "bi-weekly"
//             }
//         ],
//         "expenses": [
//             {
//                 "_id": "9",
//                 "expenseName": "Mortgage",
//                 "expenseValue": 1611.32,
//                 "expensePriority": 2,
//                 "apr": 3.5,
//                 "term": 360
//             },
//             {
//                 "_id": "10",
//                 "expenseName": "Car Payment",
//                 "expenseValue": 496.45,
//                 "expensePriority": 2,
//                 "apr": 4.7,
//                 "term": 72
//             }
//         ]
//     },
// ]


class DataService{

    async getBudgets(){
        let response = await axios.get('http://127.0.0.1:5000/api/budgets')
        let data = response.data
        console.log(data)

        return data
    }

    async postBudget(budget){
        console.log("Attempting to post budget...")

        await axios.post("http://127.0.0.1:5000/api/budgets", budget).then(res =>{
            console.log(res.data)
        })
    }
}

export default DataService