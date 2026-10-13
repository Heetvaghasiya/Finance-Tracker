function TransactionList({
  transactions,
  deleteTransaction,
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl bg-slate-50 py-12 text-center">
        <div className="text-5xl">💸</div>

        <h3 className="mt-3 text-lg font-semibold text-slate-700">
          No transactions found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Add your first income or expense.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >

          <div className="flex items-center gap-4">

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                transaction.type === "income"
                  ? "bg-emerald-100"
                  : "bg-red-100"
              }`}
            >
              {transaction.type === "income" ? "💰" : "💸"}
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                {transaction.description}
              </h3>

              <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-1">
                  {transaction.category}
                </span>

                <span>
                  {transaction.date}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">

            <span
              className={`text-lg font-bold ${
                transaction.type === "income"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              ₹{Number(transaction.amount).toFixed(2)}
            </span>

            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="rounded-lg bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;