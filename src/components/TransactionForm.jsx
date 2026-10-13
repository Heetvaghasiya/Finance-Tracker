import { useState } from "react";

function TransactionForm({ addTransaction }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !description || !date) {
      setError("Please fill all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    addTransaction({
      type,
      amount,
      category,
      description,
      date,
    });

    setType("income");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Transaction Type
        </label>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() => setType("income")}
            className={`rounded-lg px-4 py-3 font-semibold transition ${
              type === "income"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            + Income
          </button>

          <button
            type="button"
            onClick={() => setType("expense")}
            className={`rounded-lg px-4 py-3 font-semibold transition ${
              type === "expense"
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            - Expense
          </button>

        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Amount
        </label>

        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>

          {type === "income" ? (
            <>
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
            </>
          ) : (
            <>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows="3"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;