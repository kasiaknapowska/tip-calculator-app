import "../scss/main.scss";

class Calc {
  constructor() {
    this.bill = 0;
    this.tip = 0;
    this.people = 0;
  }
  setBill(bill) {
    this.bill = bill;
  }
  setTip(tip) {
    this.tip = tip;
  }
  setPeople(people) {
    this.people = people;
  }
  tipAmountPerPerson() {
    if (this.bill > 0 && this.tip > 0 && this.people > 0) {
      return (this.bill * this.tip) / this.people;
    } else {
      return null;
    }
  }
  totalAmountPerPerson() {
    if (this.bill > 0 && this.tip > 0 && this.people > 0) {
      return (this.bill + this.bill * this.tip) / this.people;
    } else {
      return null;
    }
  }
}

const form = document.querySelector("form");
const tipSelect = form.querySelectorAll(".tipPercentage");
const customTip = form.querySelector("#customTipPercentage");
const reset = document.querySelector("#reset");
const tipInfo = document.querySelector("#tipInfo");
const totalInfo = document.querySelector("#totalInfo");
const zero = form.querySelector("#zero");

const newCost = new Calc();

const getBillAndPeopleValue = () => {
  if (form.elements["people"].value === "0") {
    form.elements["people"].style.outline = "none";
    form.elements["people"].style.borderWidth = "1px";
    form.elements["people"].style.borderStyle = "solid";
    form.elements["people"].style.borderColor = "#c72865";
    zero.classList.remove("d-none");
  } else {
    form.elements["people"].style.border = "none";
    zero.classList.add("d-none");
  }
  newCost.setBill(Number(form.elements["bill"].value));
  newCost.setPeople(Number(form.elements["people"].value));
  showInfo();
};
const getTipValue = (e) => {
  let tip;
  if ([...tipSelect].includes(e.currentTarget)) {
    console.log(tipSelect);
    console.log(e.currentTarget);
    console.log([...tipSelect]);
    tip = e.currentTarget.dataset.value;
    tipSelect.forEach((el) => el.classList.remove("tipSelected"));
    e.currentTarget.classList.add("tipSelected");
    form.elements["customTipPercentage"].value = null;
  } else if (e.currentTarget === customTip) {
    tipSelect.forEach((el) => el.classList.remove("tipSelected"));
    tip = form.elements["customTipPercentage"].value / 100;
  }
  newCost.setTip(tip);
  showInfo();
};

const showInfo = () => {
  newCost.tipAmountPerPerson();
  newCost.totalAmountPerPerson();

  if (
    newCost.tipAmountPerPerson() !== null &&
    newCost.totalAmountPerPerson() !== null
  ) {
    tipInfo.innerText =
      "$" + Math.round(newCost.tipAmountPerPerson() * 100) / 100;
    totalInfo.innerText =
      "$" + Math.round(newCost.totalAmountPerPerson() * 100) / 100;
  } else {
    tipInfo.innerText = "$0.00";
    totalInfo.innerText = "$0.00";
  }
};

const reloadForm = (e) => location.reload(true);

form.addEventListener("change", getBillAndPeopleValue);
form.addEventListener("keyup", getBillAndPeopleValue);
tipSelect.forEach((el) => el.addEventListener("click", getTipValue));
customTip.addEventListener("change", getTipValue);
customTip.addEventListener("keyup", getTipValue);
reset.addEventListener("click", reloadForm);
