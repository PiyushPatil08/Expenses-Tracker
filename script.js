let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const startbtn = document.getElementById("startbtn");
const back = document.getElementById("back");
const msg = document.getElementById("msg");
const ok = document.getElementById("ok");
const rbtn = document.getElementById("reminderbtn");
const setB = document.getElementById("set-back");
const inputR = document.getElementById("input-box");

let tempAmount = 0;

let remainderValue = Infinity;



startbtn.addEventListener("click", function() {
  // Show the UI container
  document.getElementById("main").style.display = "block";
  startbtn.style.display="none";
  document.getElementById("start").style.display = "none";
  document.body.style.height="100%";
});


rbtn.addEventListener("click", function() {
  document.getElementById("main").style.display = "none";
  document.getElementById("setR").style.display = "none";
  document.getElementById("error").style.display = "none";
  document.getElementById("setR").style.display = "flex";
  document.body.style.height="99vh";

});

back.addEventListener("click",()=>{
  balanceValue.style.color = "white";
  document.getElementById("reminder").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.body.style.height="100%";
});

setB.addEventListener("click",()=>{
  document.getElementById("reminder").style.display = "none";
  document.getElementById("setR").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.body.style.height="100%";
  remainderValue=inputR.value;
});

ok.addEventListener("click",()=>{
  document.getElementById("main").style.display = "block";
  document.getElementById("reminder").style.display = "none";
  document.body.style.height="100%";
});


//Set Budget Part
totalAmountButton.addEventListener("click", () => {
  // main.classList.add("hide");
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;

  if(totalBalance<=(tempAmount/2)){
    document.getElementById("main").style.display = "none";
    document.getElementById("reminder").style.display = "flex";
    msg.innerHTML=`Reminder -- You Spend ${sum} rs till now and left with ${totalBalance} rs as per your Budget of ${tempAmount} rs`;
    document.body.style.height="99vh";

  }

  if(totalBalance>=remainderValue){
    document.getElementById("main").style.display = "none";
    document.getElementById("reminder").style.display = "flex";
    msg.innerHTML=`Reminder -- You Spend ${sum} rs till now and left with ${totalBalance} rs as per your Budget of ${tempAmount} rs`;
    document.body.style.height="99vh";

  }
  if(totalBalance<=0){
   balanceValue.style.color = "red";
   document.getElementById("main").style.display = "none";
   document.getElementById("reminder").style.display = "none";
   document.getElementById("error").style.display = "flex";
   document.body.style.height="99vh";
   
  }
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});
