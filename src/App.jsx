import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Expence from "./Components/Right Column/Expense/Expence";
import Income from "./Components/Right Column/Income/Income";
import BalanceStat from "./Components/Right Column/Total Balance Stat/BalanceStat";
import Form from "./Components/Submission Form/Form";

function App() {
  const defaultIncome = [
    {
      id: crypto.randomUUID(),
      category: "Salary",
      date: "2024-01-15",
      amount: 25000,
    },
    {
      id: crypto.randomUUID(),
      category: "Outsourcing",
      date: "2024-01-10",
      amount: 12000,
    },
  ];

  const defaultExpense = [
    {
      id: crypto.randomUUID(),
      category: "Education",
      date: "2024-01-15",
      amount: 8000,
    },
    {
      id: crypto.randomUUID(),
      category: "Health",
      date: "2024-01-15",
      amount: 5000,
    },
    {
      id: crypto.randomUUID(),
      category: "Food",
      date: "2024-01-15",
      amount: 10000,
    },
  ];

  const [incomeList, setIncomeList] = useState(defaultIncome);
  const [expenseList, setExpenseList] = useState(defaultExpense);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const addIncome = (newIncome, isAdd) => {
    if (isAdd) {
      setIncomeList([...incomeList, newIncome]);
    } else {
      setIncomeList(
        incomeList.map((income) =>
          income.id === newIncome.id ? newIncome : income
        )
      );
    }
    setTransactionToEdit(null);
  };

  const addExpense = (newExpense, isAdd) => {
    if (isAdd) {
      setExpenseList([...expenseList, newExpense]);
    } else {
      setExpenseList(
        expenseList.map((expense) =>
          expense.id === newExpense.id ? newExpense : expense
        )
      );
    }
    setTransactionToEdit(null);
  };

  const handleEditIncome = (income) => {
    setTransactionToEdit(income);
  };

  const handleEditExpense = (expense) => {
    setTransactionToEdit(expense);
  };

  const deleteIncome = (id) => {
    setIncomeList(incomeList.filter((income) => income.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenseList(expenseList.filter((expense) => expense.id !== id));
  };

  const totalIncome = incomeList.reduce(
    (sum, income) => sum + income.amount,
    0
  );
  const totalExpense = expenseList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const balance = totalIncome - totalExpense;

  return (
    <>
      <Navbar />
      <div className="relative mx-auto mt-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Form
            addIncome={addIncome}
            addExpense={addExpense}
            transactionToEdit={transactionToEdit}
          />
          <div className="lg:col-span-2">
            <BalanceStat
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <Income
                incomeList={incomeList}
                onDelete={deleteIncome}
                onEditClick={handleEditIncome}
              />
              <Expence
                expenseList={expenseList}
                onDelete={deleteExpense}
                onEditClick={handleEditExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
