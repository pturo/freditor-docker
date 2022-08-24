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
    let m1 = ['O nie! Spadnie na Ciebie deszcz nieszczęścia!', 'Prawdopodobnie zwiędną Ci kwiaty w ogrodzie.', 'Przebiegający czarny kot spowoduje pecha!',
      'Kod się wysypał? Nie martw się, serwery również się wysypały!', 'Księgowa będzie Cię ścigała listem gończym!', 'Już wiesz, że zupa była za słona, prawda?'];
    let m2 = ['Meh, pewnie przypalisz dzisiaj mleko.', 'Pogoda również nie będzie dla Ciebie łaskawa. Smutek.', 'Szef zwróci Ci uwagę na błahy problem! Pewnie nadal nie wyrzuciłeś tej zmiętej kartki do kosza.',
      'Uważaj, gołębie siedzące na parapecie będą bombardować przechodniów swoimi pociskami! Ciebie również!', 'Czas jest jak rzeka, a projekt jak czynny wulkan... Lepiej to ogarnij!'];
    let m3 = ['Wróżka Zębuszka przyniesie Ci natchnienie, o ile przestaniesz skakać na fotelu!', 'To będzie dla Ciebie zwykły dzień. Możesz odetchnąć z ulgą.',
      'Twoja partnerka nie zrobi Ci dzisiaj dymu o niepomyte naczynia... Tym razem ma dobry nastrój.', 'Raport wygląda jak lanie wody na maturze, ale jak to mówia: powoli a do przodu!'];
    let m4 = ['Znajdziesz czterolistną koniczynę, która przyniesie Ci zieleń w pracy! Przyjadą sałatki FIT!', 'Szefowa ogłosi koniec z owocowymi czwartkami! Teraz będą owocowe tygodnie!',
      'Koleżanka z pracy pożyczy Ci powodzenia na rozmowie o podwyżce!', 'Mimo technicznych trudności będziesz mógł liczyć na kolegów z pracy!'];
    let m5 = ['Oho! Ktoś tutaj dostanie dzisiaj awans!', 'Upierdliwy klient w końcu zaakceptuje projekt! Yay!', 'Szykuje się imprezka firmowa z powodu wygranego przetargu? Gratulacje!',
      'Ta wredna pani z księgowości wreszcie się do Ciebie uśmiechnie!'];
    let m6 = ['Oto i on! Koks, którego pracownicy będą nosić na rękach! Tak, to o Tobie mowa!', 'Projekt wreszcie się nie wysypie na produkcji, a owca zatańczy Makarenę!',
      'Sukces spowoduje, ze urosną Ci żelazne skrzydła i odlecisz do Krainy Zapomnienia!', '"I believe I can fly... I believe I can touch the sky..."'];

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
    let a1 = ['Żółty', 'Czarny', 'Brudny', 'Wąski', 'Sflaczały', 'Pijany', 'Zwariowany', 'Śmieszny', 'Głupi', 'Szalony', 'Niebieski', 'Czerwony', 'Leniwy'];
    let a2 = ['murzyn', 'żul', 'materac', 'piec', 'barszcz', 'Marek', 'szef', 'kurczak', 'włos', 'typek', 'garnek', 'żwirek dla kota', 'fagas szefowej', 'namiot', 'wilk', 'osioł'];
    let a3 = ['wali', 'kreśli', 'niszczy', 'bije', 'rysuje', 'marnuje', 'całuje', 'wchodzi na', 'rozwala', 'pakuje', 'sączy'];
    let a4 = ['wiadro', 'kompas', 'koleżankę', 'matkę', 'brzydką teściowa', 'skarbiec', 'pieniądze', 'szafę', 'krzesło', 'sklep', 'fontannę', 'radio', 'dywan'];
    let a5 = ['a'];
    let a6 = ['stary pryk', 'listonosz', 'prezydent', 'muzyk', 'władca much', 'Geralt z Rivii', 'Miś Uszatek', 'programista', 'upiór', 'kumpel', 'pani z miotłą', 'pingwin z Madagaskaru', 'kotlet sojowy'];
    let a7 = ['przepija', 'odśpiewuje', 'maluje', 'kradnie', 'wymienia', 'zanosi', 'wynosi', 'zanosi', 'wyśmiewa', 'ciągnie', 'zawiesza'];
    let a8 = ['szopę', 'samochód', 'Elona Muska', 'kości', 'miłość', 'kod zródłowy', 'drzewo', 'krzaki', 'bombki choinkowe', 'Stasia', 'wredną siostrę', 'makowca'];
    let a9 = ['na'];
    let a10 = ['szczycie gór', 'dachu', 'trzepaku', 'altance', 'rurze', 'kolacji wigilijnej', 'pokazie mody', 'dancingu', 'trampolinie', 'wsi u Grześka', 'choince', 'misce ryżu', 'licytacji', 'fali'];

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
