import React, { useState } from "react";
import "./TravelBudgetTracker.css"; // Create a CSS file for styling

const TravelBudgetTracker = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const addExpense = () => {
    if (!expenseName || !expenseAmount || isNaN(expenseAmount)) {
      alert("Please enter valid expense details.");
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setExpenseAmount("");
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="budget-tracker-container">
      <h2>Travel Budget Tracker</h2>

      {/* Budget Input */}
      <div className="budget-input-section">
        <label htmlFor="budget">Set Total Budget: </label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          placeholder="Enter your total budget"
        />
      </div>

      {/* Add Expense */}
      <div className="add-expense-section">
        <h3>Add an Expense</h3>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* Budget Summary */}
      <div className="budget-summary">
        <h3>Budget Summary</h3>
        <p>Total Budget: {budget.toFixed(2)}</p>
        <p>Total Expenses: {totalExpenses.toFixed(2)}</p>
        <p>Remaining Budget: {remainingBudget.toFixed(2)}</p>
      </div>

      {/* Expense List */}
      <div className="expense-list">
        <h3>Expenses</h3>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.name}: {expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelBudgetTracker;
