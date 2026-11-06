
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    let description = document.getElementById("description").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    transactions.push({
        description: description,
        amount: amount,
        type: type
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
}

function displayTransactions() {
    let list = document.getElementById("transactionList");
    let balance = 0;

    list.innerHTML = "";

    transactions.forEach((item, index) => {
        let li = document.createElement("li");
        let text = document.createElement("span");

        text.textContent = item.description + " - ₹" + item.amount;

        if (item.type === "income") {
            balance += item.amount;
            text.style.color = "green";
        } else {
            balance -= item.amount;
            text.style.color = "red";
        }

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            displayTransactions();
        };

        li.appendChild(text);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });

    document.getElementById("balance").textContent = "₹" + balance;
}

displayTransactions();
