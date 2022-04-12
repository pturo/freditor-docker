import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit {
  generatedText = '';
  result: any;

  constructor() { }

  ngOnInit(): void {
  }

  rollADice() {
    let m1 = ['O nie! Spadnie na Ciebie deszcz nieszczescia!', 'Prawdopodobnie zwiedna Ci kwiaty w ogrodzie.', 'Przebiegajacy czarny kot spowoduje pecha!',
      'Kod sie wysypal? Nie martw sie, serwery rowniez sie wysypaly!', 'Ksiegowa bedzie Cie scigala listem gonczym!', 'Juz wiesz, ze zupa byla za slona, prawda?'];
    let m2 = ['Meh, pewnie przypalisz dzisiaj mleko.', 'Pogoda rowniez nie bedzie dla Ciebie laskawa. Smutek.', 'Szef zwroci Ci uwage na blahy problem! Pewnie nadal nie wyrzucilej tej zmietej kartki do kosza.',
      'Uwazaj, golebie siedzace na parapecie beda bombardowac przechodniow swoimi pociskami! Ciebie rowniez!', 'Czas jest jak rzeka, a projekt jak czynny wulkan... Lepiej to ogarnij!'];
    let m3 = ['Wrozka Zebuszka przyniesie Ci natchnienie, o ile przestaniesz skakac na fotelu!', 'To bedzie dla Ciebie zwykly dzien. Mozesz odetchnac z ulga.',
      'Twoja partnerka nie zrobi Ci dzisiaj dymu o niepomyte naczynia... Tym razem ma dobry nastroj.', 'Raport wyglada jak lanie wody na maturze, ale jak to mowia: powoli a do przodu!'];
    let m4 = ['Znajdziesz czterolistna koniczyne, ktora przyniesie Ci zielen w pracy! Przyjada salatki FIT!', 'Szefowa oglosi koniec z owocowymi czwartkami! Teraz beda owocowe tygodnie!',
      'Kolezanka z pracy pozyczy Ci powodzenia na rozmowie o podwyzce!', 'Mimo technicznych trudnosci bedziesz mogl liczyc na kolegow z pracy!'];
    let m5 = ['Oho! Ktos tutaj dostanie dzisiaj awans!', 'Upierdliwy klient w koncu zaakceptuje projekt! Yay!', 'Szykuje sie imprezka firmowa z powodu wygranego przetargu? Gratulacje!',
      'Ta wredna pani z ksiegowosci wreszcie sie do Ciebie usmiechnie!'];
    let m6 = ['Oto i on! Koks, ktorego pracownicy beda nosic na rekach! Tak, to o Tobie mowa!', 'Projekt wreszcie sie nie wysypie na produkcji, a owca zatanczy Makarene!',
      'Sukces spowoduje, ze urosna Ci zelazne skrzydla i odlecisz do Krainy Zapomnienia!', '"I believe I can fly... I believe I can touch the sky..."'];

    let i1 = m1[Math.floor(Math.random() * m1.length)];
    let i2 = m2[Math.floor(Math.random() * m2.length)];
    let i3 = m3[Math.floor(Math.random() * m3.length)];
    let i4 = m4[Math.floor(Math.random() * m4.length)];
    let i5 = m5[Math.floor(Math.random() * m5.length)];
    let i6 = m6[Math.floor(Math.random() * m6.length)];

    let rollDice = [
      {
        number: 1,
        meaning: i1
      },
      {
        number: 2,
        meaning: i2
      },
      {
        number: 3,
        meaning: i3
      },
      {
        number: 4,
        meaning: i4
      },
      {
        number: 5,
        meaning: i5
      },
      {
        number: 6,
        meaning: i6
      }
    ];

    let generatedRollDice = rollDice[Math.floor(Math.random() * rollDice.length)];
    this.result = generatedRollDice;
  }

  generateRandomText() {
    // Build local text base
    let a1 = ['Zolty', 'Czarny', 'Brudny', 'Waski', 'Sflaczaly', 'Pijany', 'Zwariowany', 'Smieszny', 'Glupi', 'Szalony'];
    let a2 = ['murzyn', 'zul', 'materac', 'piec', 'barszcz', 'Marek', 'szef', 'kurczak', 'wlos', 'typek', 'garnek', 'zwirek dla kota', 'fagas szefowej'];
    let a3 = ['wali', 'kresli', 'niszczy', 'bije', 'rysuje', 'marnuje', 'caluje', 'wchodzi na', 'rozwala', 'pakuje'];
    let a4 = ['wiadro', 'kompas', 'kolezanke', 'matke', 'brzydka tesciowa', 'skarbiec', 'pieniadze', 'szafe', 'krzeslo', 'sklep', 'fontanne', 'radio'];
    let a5 = ['a'];
    let a6 = ['stary pryk', 'listonosz', 'prezydent', 'muzyk', 'wladca much', 'Geralt z Rivii', 'Mis Uszatek', 'programista', 'upior', 'kumpel', 'pani z miotla', 'pingwin z Madagaskaru'];
    let a7 = ['przepija', 'odspiewuje', 'maluje', 'kradnie', 'wymienia', 'zanosi', 'wynosi', 'glosi', 'wysmiewa', 'ciagnie', 'zawiesza'];
    let a8 = ['szope', 'samochod', 'Elona Muska', 'kosci', 'milosc', 'kod zrodlowy', 'drzewo', 'krzaki', 'bombki choinkowe', 'Stasia', 'wredna siostre', 'makowca'];
    let a9 = ['na'];
    let a10 = ['szczycie gor', 'dachu', 'trzepaku', 'altance', 'rurze', 'kolacji wigilijnej', 'pokazie mody', 'dancingu', 'trampolinie', 'wsi u Grzeska', 'choince', 'misce ryzu'];

    let i1 = a1[Math.floor(Math.random() * a1.length)];
    let i2 = a2[Math.floor(Math.random() * a2.length)];
    let i3 = a3[Math.floor(Math.random() * a3.length)];
    let i4 = a4[Math.floor(Math.random() * a4.length)];
    let i5 = a5[Math.floor(Math.random() * a5.length)];
    let i6 = a6[Math.floor(Math.random() * a6.length)];
    let i7 = a7[Math.floor(Math.random() * a7.length)];
    let i8 = a8[Math.floor(Math.random() * a8.length)];
    let i9 = a9[Math.floor(Math.random() * a9.length)];
    let i10 = a10[Math.floor(Math.random() * a10.length)];

    this.generatedText = i1 + ' ' + i2 + ' ' + i3 + ' ' + i4 + ', ' + i5 + ' ' + i6 + ' ' + i7 + ' ' + i8 + ' ' + i9 + ' ' + i10 + '.'
  }

}
