import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import './App.css'

function App() {

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: Date.now(),
      },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "all" || transaction.type === filter;

    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      transaction.category
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  return (
    <>
      <div className="min-h-screen bg-slate-100 px-4 py-8">

        {/* Header */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800">
              Personal Finance Tracker
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your income, expenses and financial balance
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-5 md:grid-cols-3">

            {/* Balance */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-slate-500">
                Current Balance
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${balance >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                  }`}
              >
                ₹{balance.toFixed(2)}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {balance >= 0
                  ? "You are in a positive balance"
                  : "Your expenses are higher than income"}
              </p>
            </div>

            {/* Income */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-slate-500">
                Total Income
              </p>

              <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                ₹{totalIncome.toFixed(2)}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Money received
              </p>
            </div>

            {/* Expense */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-slate-500">
                Total Expenses
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                ₹{totalExpense.toFixed(2)}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Money spent
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">

            {/* Add Transaction */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-5 text-2xl font-bold text-slate-800">
                Add Transaction
              </h2>

              <TransactionForm
                addTransaction={addTransaction}
              />
            </div>

            {/* Transaction List */}
            <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-md">

              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <h2 className="text-2xl font-bold text-slate-800">
                  Transactions
                </h2>

                {/* Filter */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search by description or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <TransactionList
                transactions={filteredTransactions}
                deleteTransaction={deleteTransaction}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
