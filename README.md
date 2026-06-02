# Projektin nimi ja tekijät
Uimavesien lämpötilat 2.0 -sovellus
tekijä: Ville Muhonen

## Verkkolinkit:
Pääset julkaistuun sovellukseen käsiksi osoitteessa [https://uimavedet2.netlify.app/](https://uimavedet2.netlify.app/)
Linkki projektin videoesittelyyn [youtube.com](https://youtu.be/3n2XJWM3nbM)

## Työn jakautuminen 
Tein työn kokonaan itse.

## Oma arvio työstä ja oman osaamisen kehittymisestä
Olen oppinut paljon JS-kirjastojen käyttämisestä sekä lisää JSONin parsimisesta. Lisäsin aiemmin kehittämääni Uimarata-sovellukseen lämpötilan kehitystä kuvaavan diagrammin sekä kokeilin hieman jQuerya DOM-skriptauksessa sekä AJAX-kutsun tekemisessä. Olisin koodannut koko työn jQuerylla, mutta minulla ei ollut tarpeeksi aikaa käytettävissäni tähän muiden kurssin ja töiden vuoksi. Paljon olen kaikesta huolimatta oppinut tämän projektin parissa.
Antaisin itselleni pisteitä 9/10 p

## Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka
Kurssi on edelleen laadukas ja opettavainen. Koen, että olisin saanut kurssista enemmän irti kenties lähiopetuksessa, jossa ongelmien ratkominen on helpompaa, eikä sitä tarvitse tehdä muiden opiskelijoiden edessä. Hieno, kiehtova ja kiinnostava aihe sekä kurssi!


## Sisällysluettelo:

- [Tietoja sovelluksesta](#tietoja-sovelluksesta)
- [Tunnetut virheet/bugit](#Tunnetut virheet/bugit)
- [Kuvakaappaukset](#kuvakaappaukset)
- [Teknologiat](#teknologiat)
- [Asennus](#asennus)
- [Lähestymistapa](#lähestymistapa)
- [Kiitokset](#kiitokset)
- [Lisenssi](#lisenssi)

## Tietoja sovelluksesta
[Uimavedet 2.0] on sovellus, joka kertoo käyttäjälle reaaliaikaista dataa pääkaupunkiseudun uimarantojen vesien lämpötiloista ja diagrammin edellisen kahden vuoden mitatuista lämpötiloista uimarantakohtaisesti. API-toimittaja päivittää mittausdatan noin 30 minuutin välein.

## Tunnetut virheet/bugit
Sovelluksen taustaväri vaihtuu sen mukaan, miten lammintä näytettävän uimarannan vesi on. Kaikki lämpömittarit eivät kuitenkaan toimita oikeaa tietoa, sillä ne voivat olla talviteloilla tai muuten väliaikaisesti pois käytöstä. Tässä tapauksessa sovellus antaa virheilmoituksen "Tietoa ei voida hakea", mutta taustaväri ei vaihdu vaan noudattaa edellisen, onnistuneen haun tulosta. Se ei ole varsinainen virhe, mutta olisi kiva korjata jossain vaiheessa.

## Kuvakaappaukset
[Sovellus](https://raw.githubusercontent.com/muhisville/Uimavesi2.0/refs/heads/main/kuvat/uimavedet2.png)
Kuva: Ville Muhonen

## Teknologiat
Käytin seuraavia teknologioita: `html`, `css` ja `Java Script` ja lisäksi `Bootstrap`, `jQuery` sekä `Chart.js` -kirjastoja.

## Asennus
Kirjoita lyhyet ohjeet sovelluksen käynnistämiseen ja käyttöön. Esimerkiksi:  
- Mene osoitteeseen https://uimavedet2.netlify.app/
- Valitse alasvetovalikosta haluamasi uimaranta ja tarkastele veden lämpötilaa nyt sekä menneisyydessä

## Kiitokset
Lista lähteistä ja esimerkeistä, joita käytit projektin aikana. Mainitse myös, jos käytit ChatGPT:tä tai muita tekoälytyökaluja koodauksen aikana ja kerro, miten ne auttoivat sinua.  
- [Opettajan materiaali sekä luentojen tallenteet](https://mika-stenberg.gitbook.io/web-sovelluksia-javascriptin-avulla)  
- [W3Schools](https://www.w3schools.com)  
- [Copilot](https://copilot.microsoft.com) Tekoälyä on käytetty koodissa esiintyvien virheiden metsästämiseen ja korjaamiseen.
- [Bootstrap](https://getbootstrap.com) Bootstrapia on käytetty käyttöliittymän responsiivisuuden parantamiseen.
- [Chart.js](https://chartjs.org) Chart-js-kirjastoa on käytetty lämpötiladiagrammin toteuttamiseen-
- [jQuery](https://jquery.com) JQuery-kirjastoa on kokeiltu DOM-skriptauksessa ja AJAX-pyynnössä.



## Lisenssi
MIT-lisenssi @ [Ville Muhonen]
