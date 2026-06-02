// Pienen präntin päivittyvä päivämäärä
const paivam = new Date();
let paivamaa = new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(paivam);
// Käytetään jQueryä DOM-scriptaukseen
$("#paivam").html(paivamaa);

// Luodaan AJAX-kutsu jQueryllä ja määritellään sen parametrit
$.ajax({
  url: 'https://iot.fvh.fi/opendata/uiras/uiras_latest.geojson',
  type: 'GET',
  success: function(response) {
    //luodaan lista käytössä olevista uimarannoista
    let lista = "<option value = ''>Valitse</option>";
    for (let i = 0; i < response.features.length; i++) {
      let uimaranta = response.features[i].properties.name;
    // Uimarannat, joiden mittari ei ole käytössä, poistetaan listalta
      if (response.features[i].properties.measurement !== undefined) {
        lista += '<option value="' + i + '">' + uimaranta + '</option>';
      }
    }
    // DOM-skriptataan lista alasvetovalikkon HTML-sivulla
    $("#uimaranta").html(lista);
  },
    // Virheilmoitus, jos API tai muu sakkaa
  error: function() {
    alert('Dataa ei voida hakea');
  }
});

// Haetaan uimavesidata API:sta käyttäjän valinnan perusteella
    function valinta(){
      // Haetaan uimarannan tietueen numero valikosta
        let idnumero = document.querySelector("#uimaranta").value;
      // Haetaan paikka taulukolle HTML-dokumentista
        let taulukonpaikka = document.querySelector("#tiedot")
      // Haetaan tausta värin muuttamista varten
        let tausta = document.querySelector("#tausta")

// Luodaan AJAX-olio
var xmlhttp = new XMLHttpRequest();
// Haetaan tiedot API:sta
xmlhttp.open('GET', 'https://iot.fvh.fi/opendata/uiras/uiras_latest.geojson', true);
// Määritellään käsittelijä vastauksen saapuessa
xmlhttp.onreadystatechange = function () {
  // Tarkistetaan virheet
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    // Vastaus muunnetaan JSON-muotoiseksi
    var data = JSON.parse(xmlhttp.responseText);
    // Validoidaan sisältö
    if (data.features[idnumero].properties.measurement.temp_water > 0) {
    
      // Haetaan haluttu data: Uimarannan nimi, sijainti ja veden lämpötila
    let nimi = data.features[idnumero].properties.name
    let paikka = data.features[idnumero].properties.location
    let lampotila = data.features[idnumero].properties.measurement.temp_water
    // Määrätään sivun taustaväri vaihtumaan veden lämpötilan mukaan
    if (lampotila < 5.00) {
      tausta.classList.remove("perus", "alle5", "alle10", "alle15", "alle20", "yli20")
      tausta.classList.add("alle5");
    }
    else if (lampotila < 10.00) {
      tausta.classList.remove("perus", "alle5", "alle10", "alle15", "alle20", "yli20")
      tausta.classList.add("alle10");
    }
    else if (lampotila < 15.00) {
      tausta.classList.remove("perus", "alle5", "alle10", "alle15", "alle20", "yli20")
      tausta.classList.add("alle15");
    }
    else if (lampotila < 20.00) {
      tausta.classList.remove("perus", "alle5", "alle10", "alle15", "alle20", "yli20")
      tausta.classList.add("alle20");
    }
    else if (lampotila >= 20.00){
      tausta.classList.remove("perus", "alle5", "alle10", "alle15", "alle20", "yli20")
      tausta.classList.add("yli20");
    }
    // Haetaan mittausaika
    let aika = data.features[idnumero].properties.measurement.time
    // Muunnetaan aikaleima suomalaiseen formaattiin
    let date = new Date(aika);
    let suomalainenAika = new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);

    // Sijoitetaan data taulukkoon
    let taulukko = `
    <table>
      <tr>
        <td><b>Uimaranta:</b> ${nimi}</td>
      </tr>
      <tr>
        <td><b>Sijainti:</b> ${paikka}</td>
      </tr>
      <tr>  
        <td><h1>${lampotila}°C</h1></td>
      </tr>
      <tr>
        <td><b>Lämpötila mitattu:</b> ${suomalainenAika}</td>
      </tr>
    </table>`
    // Syötetään taulukko sivulle
    taulukonpaikka.innerHTML = taulukko

    // Haetaan uimarannan ID lämpötiladiagrammia varten
    let id = data.features[idnumero].id

    // Haetaan uimapaikkakohtaiset lämpötilatiedot diagrammiin
    // Luodaan AJAX-olio
    var dgrm = new XMLHttpRequest();
    let url = `https://iot.fvh.fi/opendata/uiras/${id}.geojson`
    // Haetaan tiedot API:sta
    dgrm.open('GET', url, true);
// Määritellään käsittelijä vastauksen saapuessa
    dgrm.onreadystatechange = function () {
  // Tarkista virheet
  if (dgrm.readyState === 4 && dgrm.status === 200) {
    // Vastaus muunnetaan JSON-muotoiseksi
    var dgrmdata = JSON.parse(dgrm.responseText);
    //Haetaan lämpötilatiedot ja päivämäärät API:sta muuttujiin
    let labels = [];
    let values = [];
    for (let i= 0 ; i < dgrmdata.properties.data.d1.length; i += 10){
    // Siivotaan päivämäärät
    let paivat = new Date(dgrmdata.properties.data.d1[i].time);
    let paivamaarat = new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(paivat);
    labels.push(paivamaarat)
    values.push(dgrmdata.properties.data.d1[i].temp_water)
    }
  
// Luodaan diagrammi
const ctx = document.querySelector("#diagrammi").getContext("2d");

// Jos vanha diagrammi on olemassa, poistetaan se
  if (window.diagrammi && typeof window.diagrammi.destroy === "function") {
    window.diagrammi.destroy();
  }

// Määritellään diagrammin tiedot
window.diagrammi = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Veden lämpötila (°C)',
        data: values,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }
};
dgrm.send();
}
    // Virheilmoitus, jos veden lämpötila ei ole saatavilla ja vanhan diagrammin poisto
    else {
      taulukonpaikka.innerHTML ="<h2>Tieto ei ole saatavilla</h2>"
    if (window.diagrammi && typeof window.diagrammi.destroy === "function") {
    window.diagrammi.destroy();
  }
    }
}
}
// Lähetetään AJAX-olio
xmlhttp.send();
};
