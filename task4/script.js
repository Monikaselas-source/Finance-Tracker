async function getTransactions() {
  return [
    { id: 1, date: "2025-01-10", amount: 5000, category: "Salary" },
    { id: 2, date: "2025-01-12", amount: -1200, category: "Food" },
    { id: 3, date: "2025-01-15", amount: -3000, category: "Rent" },
    { id: 4, date: "2025-01-18", amount: -800, category: "Shopping" },
    { id: 5, date: "2025-01-20", amount: 2000, category: "Freelance" }
  ];
}

let transactions = [];
const listEl = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");


async function loadData() {
  transactions = await getTransactions();
  displayTransactions(transactions);
  calculateBalance(transactions);
}


function displayTransactions(data) {
  listEl.innerHTML = "";

  data.forEach(tx => {
    const li = document.createElement("li");
    li.className = "transaction";

    
    li.innerHTML = `
      <span>${tx.date} | ${tx.category}</span>
      <span class="${tx.amount < 0 ? "expense" : "income"}">
        ₹${tx.amount}
      </span>
    `;

    listEl.appendChild(li);
  });
}


function calculateBalance(data) {
  const total = data.reduce((sum, tx) => sum + tx.amount, 0);
  balanceEl.textContent = total;
}


document.getElementById("filterBtn").addEventListener("click", () => {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const minAmount = document.getElementById("minAmount").value;

  let filtered = transactions;

  
  if (fromDate && toDate) {
    filtered = filtered.filter(tx =>
      tx.date >= fromDate && tx.date <= toDate
    );
  }

  
  if (minAmount) {
    filtered = filtered.filter(tx => tx.amount <= -minAmount);
  }

  displayTransactions(filtered);
  calculateBalance(filtered);
});


document.getElementById("exportBtn").addEventListener("click", () => {
  const jsonData = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transactions.json";
  link.click();
});


loadData();
