let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@/latest/currencies/";

let convert = document.querySelector("#convert");
convert.addEventListener("click", convertCurrency);

let l1;
let s1;
let from;

let l2;
let s2;
let to;

function convertCurrency() {
  let amount = document.querySelector("#amount");
  money = Number(amount.value);
  
  l1 = document.querySelector("#chosenCountryFrom");
  s1 = l1.lastChild.textContent;
  from = (
    s1[s1.length - 3] +
    s1[s1.length - 2] +
    s1[s1.length - 1]
  ).toLowerCase();

  l2 = document.querySelector("#chosenCountryTo");
  s2 = l2.lastChild.textContent;
  to = (
    s2[s2.length - 3] +
    s2[s2.length - 2] +
    s2[s2.length - 1]
  ).toLowerCase();

  let data = getRates().then(function (data) {
    
    let val = data[from][to];
    let value = parseFloat(val * money).toFixed(2);

    let res = document.querySelector("#result");

    if (value == "NaN") res.textContent = "Error";
    else {
      let result = `${money} ${from} = ${value} ${to}`;
      res.textContent = result;
    }
  });
}

const getRates = async () => {
  const res = await fetch(URL + from + '.json');

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// For showing and hiding the FROM countries list
let downAngle1 = document.querySelector("#angle1");
let x1 = document.querySelector("#x1");
let fromCountryList = document.querySelector("#fromCountryList");
downAngle1.addEventListener("click", showFromCountries);

function showFromCountries() {
  downAngle1.style.display = "none";

  fromCountryList.style.display = "block";
  fromCountryList.style.top = "39.455px";

  x1.style.display = "inline";
  hideToCountries();
}

x1.addEventListener("click", hideFromCountries);

function hideFromCountries() {
  x1.style.display = "none";

  fromCountryList.style.display = "none";

  downAngle1.style.display = "inline";
}

// For showing and hiding the TO countries list
let downAngle2 = document.querySelector("#angle2");
let x2 = document.querySelector("#x2");
let toCountryList = document.querySelector("#toCountryList");
downAngle2.addEventListener("click", showToCountries);

function showToCountries() {
  downAngle2.style.display = "none";

  toCountryList.style.display = "block";
  toCountryList.style.top = "39.455px";

  x2.style.display = "inline";
  hideFromCountries();
}

x2.addEventListener("click", hideToCountries);

function hideToCountries() {
  x2.style.display = "none";

  toCountryList.style.display = "none";

  downAngle2.style.display = "inline";
}

//Choosing the FROM Currency
let country = document.querySelectorAll("#fromCountryList li");
for (let i = 0; i < country.length; ++i) {
  country[i].addEventListener("click", choose);

  function choose() {
    let From = document.querySelector("#chooseFrom");
    let child = document.querySelector("#chosenCountryFrom");

    child.remove();

    let chosen = document.createElement("li");
    chosen.innerHTML = country[i].innerHTML;
    chosen.value = country[i].value;
    chosen.setAttribute("id", "chosenCountryFrom");
    From.append(chosen);

    hideFromCountries();
  }
}

//Choosing the TO Currency
country = document.querySelectorAll("#toCountryList li");
for (let i = 0; i < country.length; ++i) {
  country[i].addEventListener("click", choose);

  function choose() {
    let To = document.querySelector("#chooseTo");
    let child = document.querySelector("#chosenCountryTo");

    child.remove();

    let chosen = document.createElement("li");
    chosen.innerHTML = country[i].innerHTML;
    chosen.value = country[i].value;
    chosen.setAttribute("id", "chosenCountryTo");
    To.append(chosen);

    hideToCountries();
  }
}
