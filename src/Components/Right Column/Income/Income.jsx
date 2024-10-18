import React, { useState } from "react";
import SortedSvg from "../../../assets/SortedSvg";
import FilterSvg from "../../../assets/FilterSvg";
import EditSvg from "../../../assets/EditSvg";
import DeleteSvg from "../../../assets/DeleteSvg";
import IncomeSvg from "../../../assets/IncomeSvg";
import PropTypes from "prop-types";

function Income({ incomeList, onDelete, onEditClick }) {
  const [sortOrder, setSortOrder] = useState("default");
  const [filterCategories, setFilterCategories] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const sortedIncomeList = [...incomeList].sort((a, b) => {
    if (sortOrder === "Low to High") {
      return a.amount - b.amount;
    } else if (sortOrder === "High to Low") {
      return b.amount - a.amount;
    }
    return 0;
  });

  const filteredIncomeList = sortedIncomeList.filter((income) => {
    if (filterCategories.length === 0) {
      return true;
    }
    return filterCategories.includes(income.category);
  });

  const toggleCategoryFilter = (category) => {
    setFilterCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <div className="border rounded-md relative">
        <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
              <IncomeSvg />
            </div>

            <div>
              <h3 className="text-xl font-semibold leading-7 text-gray-800">
                Income
              </h3>
            </div>
          </div>

          <div>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  aria-expanded={activeDropdown === "sort"}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown("sort")}
                >
                  <SortedSvg />
                </button>
              </div>

              {activeDropdown === "sort" && (
                <div
                  className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => setSortOrder("Low to High")}
                    >
                      Low to High
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => setSortOrder("High to Low")}
                    >
                      High to Low
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  aria-expanded={activeDropdown === "filter"}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown("filter")}
                >
                  <FilterSvg />
                </button>
              </div>

              {activeDropdown === "filter" && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="filter-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    {["Salary", "Outsourcing", "Bond", "Dividend"].map(
                      (category) => (
                        <label
                          key={category}
                          className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                            checked={filterCategories.includes(category)}
                            onChange={() => toggleCategoryFilter(category)}
                          />
                          <span className="ml-2">{category}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 divide-y">
          {filteredIncomeList.map((income) => (
            <div
              key={income.id}
              className="flex justify-between items-center py-2 relative group cursor-pointer"
            >
              <div>
                <h3 className="text-base font-medium leading-7 text-gray-600">
                  {income.category}
                </h3>
                <p className="text-xs text-gray-600">{income.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                  BDT {income.amount}
                </p>

                <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                  <button
                    className="hover:text-teal-600"
                    role="button"
                    title="Edit Button"
                    onClick={() => onEditClick(income)}
                  >
                    <EditSvg />
                  </button>

                  <button
                    className="hover:text-red-600"
                    role="button"
                    title="Delete"
                    onClick={() => onDelete(income.id)}
                  >
                    <DeleteSvg />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Income;

Income.propTypes = {
  incomeList: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
