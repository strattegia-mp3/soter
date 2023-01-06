// Seleção de elementos
const generatePwdBtn = document.querySelector("#generate-pwd");
const generatedPwdElement = document.querySelector("#generated-pwd");

// Funções
const openCloseGeneratorButton = document.querySelector("#open-generate-pwd");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-pwd");

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePwd = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let pwd = "";

  const pwdLength = +lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  console.log(generators.length);

  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < pwdLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      pwd += randomValue;
    });
  }

  pwd = pwd.slice(0, pwdLength);

  generatedPwdElement.style.display = "block";
  generatedPwdElement.querySelector("h4").innerText = pwd;
};

// Eventos
generatePwdBtn.addEventListener("click", () => {
  generatePwd(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPwdElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 2000);
  });
});
