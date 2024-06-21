//! CONSTRUCTORS

function insurance(brand, year, type) {
     this.brand = brand;
     this.year = year;
     this.type = type;
}


//? Make the quotation with the insurance
insurance.prototype.quoteinsurance = function () {
     /*  
      ? Opción 1 = Americano > 1.15
      ! Opción 2 = Americano > 1.05
      * Opción 3 = Americano > 1.35
     */

     let quantity = 0;
     const base = 2000;

     console.log(this.brand);
     switch (this.brand) {
          case "1":
               quantity = base * 1.15;
               break;

          case "2":
               quantity = base * 1.05;
               break;

          case "3":
               quantity = base * 1.35;
               break;

          default:
               break;
     }


     //* Read the year  
     const difference = new Date().getFullYear() - this.year;

     //* Each year when the difference is old, the cost is reducing the value in 3%
     quantity -= ((difference * 3) * quantity) / 100;

     /* 
      ?    basic = 30%
      !    completo = 50%
     */

     if (this.type === "basico") {
          quantity *= 1.30;
     } else {
          quantity *= 1.50;
     }
     return quantity;
}

//* Load the options in the years
function ui() { }


ui.prototype.loadOptions = () => {
     const max = new Date().getFullYear(),
          min = max - 20;

     const selectYear = document.getElementById("year")
     for (let i = max; i > min; i--) {
          let option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option)
     }
}


//* Show alerts in the screen
ui.prototype.showMessage = (msg, type) => {
     const form = document.getElementById("cotizar-seguro");
     const div = document.createElement("div");

     if (type === "error") {
          div.classList.add("msg", "error");
     } else {
          div.classList.add("msg", "correcto");
     }

     div.classList.add("msg", "mt-10");
     div.textContent = msg

     //* Insert in the form
     form.insertBefore(div, document.querySelector("#resultado"));

     setTimeout(() => {
          form.removeChild(div)
     }, 2000);
}

ui.prototype.showResults = (total, ins) => {
     let brandConverted = "";

     switch (ins.brand) {
          case "1":
               brandConverted = "Americano";
               break;
          case "2":
               brandConverted = "Asiatico";
               break;
          case "3":
               brandConverted = "Europeo";
               break;

          default:
               break;
     }
     const div = document.createElement("div");
     const divResult = document.getElementById("resultado");
     div.classList.add("mt-10");
     div.innerHTML = `
          <p class="header">Resumen: </p>
          <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
          <p class="font-bold">Marca: <span class="font-normal">${brandConverted}</span></p>
          <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize">${ins.type}</span></p>
          <p class="font-bold">Año: <span class="font-normal">${ins.year}</span></p>
     `;

     const spinner = document.getElementById("cargando");
     spinner.style.display = "block"

     setTimeout(() => {
          spinner.style.display = "none"
          divResult.appendChild(div);
     }, 2500);
     console.log(ins);
     console.log(brandConverted);
}

//* Instance UI()
const userInterface = new ui();
console.log(userInterface);

document.addEventListener("DOMContentLoaded", () => {
     userInterface.loadOptions();
})
eventListeners();

function eventListeners() {
     const form = document.getElementById("cotizar-seguro");
     form.addEventListener("submit", quoteInsurance)
}

function quoteInsurance(e) {
     e.preventDefault();

     //* Read the brand selected
     const brand = document.getElementById("marca").value;

     //* Read the Year selected
     const year = document.getElementById("year").value;

     //* Read the Type selected
     const type = document.querySelector("input[name='tipo']:checked").value;

     if (!brand || !year || !type) {
          userInterface.showMessage("Todos los campos son obligatorios", "error");
          return;
     }

     userInterface.showMessage("Cotizando...", "exito");
     const results = document.querySelector("#resultado div");
     if (results != null) {
          results.remove();
     }


     //* Instance the insurance
     const ins = new insurance(brand, year, type);
     const total = ins.quoteinsurance()

     //
     userInterface.showResults(total, ins)
     console.log(total);
}