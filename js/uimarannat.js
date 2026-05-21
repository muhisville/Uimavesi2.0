// Lisätään uimarannat pudotusvalikkoon
// Luodaan AJAX-olio
var xmlhttp = new XMLHttpRequest();
// Haetaan tiedot API:sta
xmlhttp.open('GET', 'https://iot.fvh.fi/opendata/uiras/uiras_latest.geojson', true);
// Lähetetään AJAX-olio
xmlhttp.send();

xmlhttp.onreadystatechange = function () {
  // Tarkista virheet
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    // Vastaus muutetaan JSON-muotoon
    var data = JSON.parse(xmlhttp.responseText);
// Haetaan html-dokumentista alasvetovalikko
let listaus = document.querySelector("#uimaranta")

// Käydään JSON-data läpi ja muodostetaan lista uimarannoista
    let lista = ""
    for (let i=0; i < data.features.length; i++){
        let uimaranta = data.features[i].properties.name
        // Lisätään ehtolause, joka poistaa uimaranta-valikosta vanhat ja toimimattomat mittarit
        if(data.features[i].properties.measurement !== undefined){
        // Lisätään listalle validoidut uimapaikat sekä taulukon numero value-kenttään
        lista += '<option value = "' + i +'">' + uimaranta + '</option>'
      }
        else{
          continue
        }
    }
    // Lisätään lista valikkoon
    listaus.innerHTML += lista
}
}
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
  // Tarkista virheet
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    // Vastaus muunnetaan JSON-muotoiseksi
    var data = JSON.parse(xmlhttp.responseText);
    console.log(data);
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
    taulukonpaikka.innerHTML = taulukko}
    //Virheilmoitus, jos veden lämpötila ei ole saatavilla
    else {
      taulukonpaikka.innerHTML ="<h2>Tieto ei ole saatavilla</h2>"
    }
}
}
// Lähetetään AJAX-olio
xmlhttp.send();
};
