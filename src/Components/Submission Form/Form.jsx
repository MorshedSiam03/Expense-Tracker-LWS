import React, { useState, useEffect } from "react";

function Form({ addIncome, addExpense, transactionToEdit }) {
  const [transactionType, setTransactionType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isAdd, setIsAdd] = useState(true);

  // Define the categories for Income and Expense
  const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
  const expenseCategories = [
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ];

  useEffect(() => {
    if (transactionToEdit) {
      const isIncome = incomeCategories.includes(transactionToEdit.category);
      setTransactionType(isIncome ? "Income" : "Expense");
      setCategory(transactionToEdit.category || "");
      setAmount(transactionToEdit.amount || "");
      setDate(transactionToEdit.date || "");
      setIsAdd(false);
    } else {
      setTransactionType("Expense");
      setCategory("");
      setAmount("");
      setDate("");
      setIsAdd(true);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactionToEdit ? transactionToEdit.id : crypto.randomUUID(),
      category,
      amount: parseFloat(amount),
      date,
    };

    if (transactionType === "Income") {
      addIncome(newTransaction, isAdd);
    } else {
      addExpense(newTransaction, isAdd);
    }
  };

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            onClick={() => handleTransactionTypeChange("Expense")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              transactionType === "Expense" ? "active" : ""
            }`}
          >
            Expense
          </div>
          <div
            onClick={() => handleTransactionTypeChange("Income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              transactionType === "Income" ? "active" : ""
            }`}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              {transactionType === "Income"
                ? incomeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                : expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              required
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {isAdd ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Form;
