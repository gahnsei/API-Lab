const baseURL = `https://swapi.dev/api`;

const getResidents = (event) => {
  event.preventDefault();

  const planet = document
    .querySelector(`input`)
    .value.split(` `)
    .join(``)
    .toLowerCase();

  axios
    .get(`${baseURL}/planets/?search=${planet}`)
    .then((res) => {
      if (res.data.count === 1) {
        popFormater(res.data.results[`0`].name);
        res.data.results[`0`].residents.forEach((ele) => {
          axios
            .get(ele)
            .then((res) => residentNames(res.data))
            .catch((error) => console.log(error));
        });
      } else if (res.data.count > 1) {
        planetFormater()
        res.data.results.forEach((ele) => planetNames(ele.name));
      }
    })
    .catch(() => console.log(error));
};

const planetNames = (name) => {
  const planets = document.createElement(`h3`);
  planets.textContent = name;
  document.querySelector(`#planets`).appendChild(planets);
};

const residentNames = (res) => {
  const h3 = document.createElement(`h3`);
  h3.textContent = res.name;
  document.querySelector(`#results`).appendChild(h3);
};

const popFormater = (planet) => {
    document.querySelector(`#results`).classList.remove(`hiden`);
    document.querySelector(`#planets`).innerHTML = `<h2>Here Are The Residents of ${planet}</h2>`;
    document.querySelector(`#population`).innerHTML = ``;
}

const planetFormater = () => {
    document.querySelector(`#results`).classList.remove(`hiden`);
    document.querySelector(`#population`).innerHTML = `<h2>Select A Planet From This List To Search</h2>`;
    document.querySelector(`#planets`).innerHTML = ``;
}

document.querySelector(`button`).addEventListener(`click`, getResidents);
