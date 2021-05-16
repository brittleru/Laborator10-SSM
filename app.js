// Cache the DOM
// Butoane functionalitate
const buttonCalcul = document.getElementById("button-calcul");
const buttonReset = document.getElementById("button-reset");
const buttonExit = document.getElementById("button-exit");
// Date de intrare
const phiM = document.getElementById("phiM");
const phiO = document.getElementById("phiO");
const phi1 = document.getElementById("phi1");
const phi2 = document.getElementById("phi2");
const phi3 = document.getElementById("phi3");
const phi4 = document.getElementById("phi4");
const lM = document.getElementById("lM");
const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");
const l3 = document.getElementById("l3");
const l4 = document.getElementById("l4");
const rho1 = document.getElementById("rho1");
const rho2 = document.getElementById("rho2");
const n = document.getElementById("n");
// Rezultate
const piesa_text = document.getElementById("piesa_id");
const volum_piesa = document.getElementById("volum_piesa");
const masa_piesa = document.getElementById("masa_piesa");
const moment_piesa = document.getElementById("moment_piesa");
// Imagine + toggle
const piesa_imagine = document.getElementById("img-figura");
const piesa_select = document.getElementById("toggle-id");



// Valori de intrare si constante
const PI = Math.PI;
const e_3 = Math.pow(10, -3);
let phiM_num;
let phiO_num;
let phi1_num;
let phi2_num;
let phi3_num;
let phi4_num;
let n_num;
let lT_num;
let l1_num;
let l2_num;
let l3_num;
let l4_num;
let rho1_num;
let rho2_num;


// Functionalitate pentru butonul de reset
function resetValues() {
  phiM.value = 0;
  phiO.value = 0;
  phi1.value = 0;
  phi2.value = 0;
  phi3.value = 0;
  phi4.value = 0;
  n.value = 0;
  lT.value = 0;
  l1.value = 0;
  l2.value = 0;
  l3.value = 0;
  l4.value = 0;
  rho1.value = 0;
  rho2.value = 0;

  phiM_num = 0;
  phiO_num = 0;
  phi1_num = 0;
  phi2_num = 0;
  phi3_num = 0;
  phi4_num = 0;
  n_num = 0;
  lT_num = 0;
  l1_num = 0;
  l2_num = 0;
  l3_num = 0;
  l4_num = 0;
  rho1_num = 0;
  rho2_num = 0;
}
function closePage() {
  open(location, '_self').close();
  // window.open('', '_self', '');
  window.open(window.location, '_self').close();
  window.close()
}
function calculVMI(raza, inaltime, densitate, distanta) {
  volum = PI * Math.pow(raza, 2) * inaltime;
  masa = volum * densitate;
  moment_inertie = masa * Math.pow(raza, 2) / 2 + masa * Math.pow(distanta, 2);

  return [volum, masa, moment_inertie];
}

function calculArbore() {
  let densitate = rho2_num;
  let distanta = 0;

  // --- Arbore fara fus --- //
  let lungime_arbore = (lT_num - 2 * l4_num) * e_3;
  let raza_arbore = (phi3_num / 2) * e_3;

  // --- Fus --- //
  let lungime_fus = l4_num * e_3;
  let raza_fus = (phi2_num / 2) * e_3;

  let arbore = calculVMI(raza_arbore, lungime_arbore, densitate, distanta);
  let fus = calculVMI(raza_fus, lungime_fus, densitate, distanta);
  let result = arbore.map(function (item, index) {
    return item + (2*fus[index]);
  });

  return result;
}

function calculAliaj() {
  let densitate = rho1_num;
  let distanta = 0;
  let numar_gauri = n_num;

  // --- Gauri de scazut --- //
  let raza_gauri = (phiO_num / 2) * e_3;
  let lungime_gauri = l3_num * e_3;
  let distanta_gauri = (phi1_num/2) * e_3;

  // --- Aliajul mare fara bucsa --- //
  let raza_aliaj = (phiM_num / 2) * e_3;
  let lungime_aliaj = l3_num * e_3;

  // --- De scazut partea arborelui din aliajul fara bucsa  --- //
  let raza_fara_arbore = (phi3_num / 2) * e_3;
  let lungime_fara_arbore = l3_num * e_3;

  // --- Bucsa aliajului --- //
  let raza_bucsa = (phi4_num / 2) * e_3;
  let lungime_busca = (l2_num - l3_num) * e_3;

  // --- De scazut partea arborelui din bucsa aliajului --- //
  let raza_fara_bucsa = (phi3_num / 2) * e_3;
  let lungime_fara_bucsa = (l2_num - l3_num) * e_3;

  let gauri = calculVMI(raza_gauri, lungime_gauri, densitate, distanta_gauri);
  let aliaj = calculVMI(raza_aliaj, lungime_aliaj, densitate, distanta);;
  let fara_arbore = calculVMI(raza_fara_arbore, lungime_fara_arbore, densitate, distanta);
  let bucsa = calculVMI(raza_bucsa, lungime_busca, densitate, distanta);
  let fara_bucsa = calculVMI(raza_fara_bucsa, lungime_fara_bucsa, densitate, distanta);

  let result = aliaj.map(function(item, index) {
    return item - (numar_gauri * gauri[index]) + bucsa[index] - fara_arbore[index] - fara_bucsa[index];
  });

  return result;
}

function calculAnsamblu() {
  let arbore = calculArbore();
  let aliaj = calculAliaj();

  let result = arbore.map(function(item, index) {
    return item + aliaj[index];
  });

  return result;
}


// Event Listeners
buttonReset.addEventListener("click", () => {
  if (confirm("Esti sigur ca doresti sa resetezi valorile?")) {
    resetValues();
  }
});
buttonExit.addEventListener("click", () => {
  if (confirm("Esti sigur ca doresti sa inchizi pagina?")) {
    closePage();
  }
});


phiM.addEventListener('input', () => {
  phiM_num = parseFloat(phiM.value);
  localStorage.setItem("phiM_num", phiM_num);
});
phiO.addEventListener('input', () => {
  phiO_num = parseFloat(phiO.value);
  localStorage.setItem("phiO_num", phiO_num);
});
phi1.addEventListener('input', () => {
  phi1_num = parseFloat(phi1.value);
  localStorage.setItem("phi1_num", phi1_num);
});
phi2.addEventListener('input', () => {
  phi2_num = parseFloat(phi2.value);
  localStorage.setItem("phi2_num", phi2_num);
});
phi3.addEventListener('input', () => {
  phi3_num = parseFloat(phi3.value);
  localStorage.setItem("phi3_num", phi3_num);
});
phi4.addEventListener('input', () => {
  phi4_num = parseFloat(phi4.value);
  localStorage.setItem("phi4_num", phi4_num);
});
lT.addEventListener('input', () => {
  lT_num = parseFloat(lT.value);
  localStorage.setItem("lT_num", lT_num);
});
l1.addEventListener('input', () => {
  l1_num = parseFloat(l1.value);
  localStorage.setItem("l1_num", l1_num);
});
l2.addEventListener('input', () => {
  l2_num = parseFloat(l2.value);
  localStorage.setItem("l2_num", l2_num);
});
l3.addEventListener('input', () => {
  l3_num = parseFloat(l3.value);
  localStorage.setItem("l3_num", l3_num);
});
l4.addEventListener('input', () => {
  l4_num = parseFloat(l4.value);
  localStorage.setItem("l4_num", l4_num);
});
rho1.addEventListener('input', () => {
  rho1_num = parseFloat(rho1.value);
  localStorage.setItem("rho1_num", rho1_num);
});
rho2.addEventListener('input', () => {
  rho2_num = parseFloat(rho2.value);
  localStorage.setItem("rho2_num", rho2_num);
});
n.addEventListener('input', () => {
  n_num = parseFloat(n.value);
  localStorage.setItem("n_num", n_num);
});


// ===== Local Storage setup ===== //
phiM.value = localStorage.getItem('phiM_num');
phiO.value = localStorage.getItem("phiO_num");
phi1.value = localStorage.getItem("phi1_num");
phi2.value = localStorage.getItem("phi2_num");
phi3.value = localStorage.getItem("phi3_num");
phi4.value = localStorage.getItem("phi4_num");
lT.value = localStorage.getItem("lT_num");
l1.value = localStorage.getItem("l1_num");
l2.value = localStorage.getItem("l2_num");
l3.value = localStorage.getItem("l3_num");
l4.value = localStorage.getItem("l4_num");
rho1.value = localStorage.getItem("rho1_num");
rho2.value = localStorage.getItem("rho2_num");
n.value = localStorage.getItem("n_num");



// ===== Local storage valori pentru calcul ===== //
phiM_num = parseFloat(phiM.value);
phiO_num = parseFloat(phiO.value);
phi1_num = parseFloat(phi1.value);
phi2_num = parseFloat(phi2.value);
phi3_num = parseFloat(phi3.value);
phi4_num = parseFloat(phi4.value);
lT_num = parseFloat(lT.value);
l1_num = parseFloat(l1.value);
l2_num = parseFloat(l2.value);
l3_num = parseFloat(l3.value);
l4_num = parseFloat(l4.value);
rho1_num = parseFloat(rho1.value);
rho2_num = parseFloat(rho2.value);
n_num = parseFloat(n.value);


// --- Functie pentru a updata in mod constant rezultatele --- //
function updateValues() {
  if (piesa_text.innerHTML === "Ansamblu") {
    let result = calculAnsamblu();
    volum_piesa.innerHTML = result[0].toExponential(8);
    masa_piesa.innerHTML = result[1].toExponential(8);
    moment_piesa.innerHTML = result[2].toExponential(8);
  }
  else if (piesa_text.innerHTML === "Arbore") {
    let result = calculArbore();
    volum_piesa.innerHTML = result[0].toExponential(8);
    masa_piesa.innerHTML = result[1].toExponential(8);
    moment_piesa.innerHTML = result[2].toExponential(8);
  }
  else {
    let result = calculAliaj();
    volum_piesa.innerHTML = result[0].toExponential(8);
    masa_piesa.innerHTML = result[1].toExponential(8);
    moment_piesa.innerHTML = result[2].toExponential(8);
  }
}

// --- Event listener pe dropdown --- //
piesa_select.addEventListener("change", (event) => {
  if (event.target.value === "ansamblu") {
    piesa_text.innerHTML = "Ansamblu";
    piesa_imagine.src = "./img/ansamblu.jpeg";
    updateValues();
  }
  else if (event.target.value === "arbore") {
    piesa_text.innerHTML = "Arbore";
    piesa_imagine.src = "./img/arbore.jpeg";
    updateValues();
  }
  else {
    piesa_text.innerHTML = "Disc";
    piesa_imagine.src = "./img/aliaj_aluminiu.jpeg";
    updateValues();
  }
});

// --- Calcul Event Listeners --- //
buttonCalcul.addEventListener("click", updateValues);
