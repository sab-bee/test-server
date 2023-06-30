const main = document.getElementById("main");
main.innerHTML = App();

// const uri = `http://localhost:3000`;

function App() {
  return `
    <div class="app">
      <div class="search-player" id="search-player">
        <input type="text" class='input-player' id='input-player' placeholder='search player' />
      </div>

      <div class='information'>
        <div class="settings-info" id="settings-info"></div>
        <div class='sync-btn' id='sync-btn'></div>
        <div class='team' id='team'></div>
      </div>
    </div>
  `;
}

const settingsEl = document.getElementById("settings-info");
const teamEl = document.getElementById("team");
const btnEl = document.getElementById("sync-btn");

async function searchPlayer(name) {
  const res = await fetch(`/player?name=${name}`);
  const data = await res.json();

  if (data.failed) {
    resetDoc();
    return;
  }

  let { eDPI, Sens, DPI, Mouse: mouse, Team } = data;
  let edpi = Number(eDPI);
  let sensi = Number(Sens);
  let dpi = Number(DPI);

  render(edpi, dpi, sensi, mouse, Team);
}

let dpiEl = "";
let sensiEl = "";
let newSensi = 1;

function render(edpi, dpi, sensi, mouse, Team) {
  data = convert(dpi, sensi);
  settingsEl.innerHTML = `
  <div class='tab'>
    <p>edpi</p>
    <h2>${edpi}</h2>
  </div>
  <div class='tab' >
    <p>sens</p>
    <h2 id='sensi'>${data.sensi}</h2>
  </div>
  <div class='tab'>
    <p>dpi</p>
    <h2 id='dpi'>${data.dpi}</h2>
  </div>
  <div class='tab'>
    <p>mouse</p>
    <h2>${mouse}</h2>
  </div>
  `;

  btnEl.innerHTML = `
  <h2>choose mouse dpi</h2>
  <button class='dpi' id='400dpi' onclick='to400()'>400</button>
  <button class='dpi' id='800dpi' onclick='to800()'>800</button>
  <button class='dpi' id='1600dpi' onclick='to1600()'>1600</button>
  `;

  teamEl.innerHTML = `
  <div>
    <p>team</p>
    <h2>${Team}</h2>
  </div>
  `;

  dpiEl = document.getElementById("dpi");
  sensiEl = document.getElementById("sensi");
}

function convert(dpi, sensi) {
  if (dpi === 1600) {
    newSensi = sensi * 2;
  } else if (dpi === 400) {
    newSensi = sensi / 2;
  } else newSensi = sensi;
  return { dpi: 800, sensi: newSensi };
}

function to400() {
  dpiEl.innerHTML = `${400}`;
  sensiEl.innerHTML = `${newSensi * 2}`;
}

function to800() {
  dpiEl.innerHTML = `${800}`;
  sensiEl.innerHTML = `${newSensi}`;
}

function to1600() {
  dpiEl.innerHTML = `${1600}`;
  sensiEl.innerHTML = `${newSensi / 2}`;
}

const input_player = document.getElementById("input-player");
input_player.addEventListener("input", (e) => {
  const query = e.target.value;
  if (!query) {
    settingsEl.innerHTML = "";
    teamEl.innerHTML = "";
    return;
  }
  searchPlayer(e.target.value);
});

function resetDoc() {
  settingsEl.innerHTML = "";
  teamEl.innerHTML = "";
  btnEl.innerHTML = "";
}
