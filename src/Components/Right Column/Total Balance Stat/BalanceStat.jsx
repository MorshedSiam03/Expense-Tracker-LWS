import React from "react";

function BalanceStat({ totalIncome, totalExpense, balance }) {
  // Conditional class for balance background color
  const balanceBgClass =
    balance < 0
      ? "bg-red-500 "
      : balance > 0
      ? "bg-[#15b8a6] "
      : "bg-[#F9FAFB] text-gray-700";

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
            <div
              className={`flex lg:max-w-xs flex-col px-4 py-4 ${balanceBgClass}`}
            >
              <dt className="text-base leading-7 text-gray-900 font-bold">Balance</dt>
              <dd className="order-first text-xl font-semibold tracking-tight sm:text-3xl">
                <span>BDT </span> {balance}
              </dd>
            </div>

            <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
              <dt className="text-base leading-7 text-gray-600">
                Total Income
              </dt>
              <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
                <span>BDT </span> {totalIncome}
              </dd>
            </div>

            <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
              <dt className="text-base leading-7 text-gray-600">
                Total Expense
              </dt>
              <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
                <span>BDT </span> {totalExpense}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default BalanceStat;
