import { GarbageType, Municipality, type Street } from './types'

export const garbageTypeConfig: Record<GarbageType, { label: string; color: string }> = {
  [GarbageType.Packaging]: { label: 'embalaža', color: '#fde047' },
  [GarbageType.Mixed]: { label: 'mešani odpadki', color: '#92d050' },
  [GarbageType.Paper]: { label: 'papir', color: '#60a5fa' },
  [GarbageType.Glass]: { label: 'steklo', color: '#f86666' },
  [GarbageType.Textile]: { label: 'tekstil', color: '#c4bd97' },
  [GarbageType.Electronics]: { label: 'elektronika', color: '#8064a2' },
  [GarbageType.Organic]: { label: 'biološki odpadki', color: '#ffa200' },
}

export const streets: Street[] = [
  {
    value: 1,
    label: 'Bistrica ob Sotli',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 9,
    label: 'Trebče',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 11,
    label: 'Zagaj',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 13,
    label: 'Črešnjevec ob Bistrici',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 131,
    label: 'Križan Vrh',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 143,
    label: 'Ples',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 146,
    label: 'Polje pri Bistrici',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 167,
    label: 'Srebrnik',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 192,
    label: 'Dekmanca',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 196,
    label: 'Hrastje ob Bistrici',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 303,
    label: 'Kunšperk',
    municipality: Municipality.BistricaObSotli,
  },
  {
    value: 12,
    label: 'Zagorje',
    municipality: Municipality.Kozje,
  },
  {
    value: 14,
    label: 'Bistrica pri Lesičnem',
    municipality: Municipality.Kozje,
  },
  {
    value: 16,
    label: 'Buče',
    municipality: Municipality.Kozje,
  },
  {
    value: 21,
    label: 'Dobležiče',
    municipality: Municipality.Kozje,
  },
  {
    value: 23,
    label: 'Gorjane',
    municipality: Municipality.Kozje,
  },
  {
    value: 28,
    label: 'Koprivnica',
    municipality: Municipality.Kozje,
  },
  {
    value: 34,
    label: 'Ortnice',
    municipality: Municipality.Kozje,
  },
  {
    value: 35,
    label: 'Osredek pri Podsredi',
    municipality: Municipality.Kozje,
  },
  {
    value: 37,
    label: 'Pilštanj',
    municipality: Municipality.Kozje,
  },
  {
    value: 41,
    label: 'Podsreda',
    municipality: Municipality.Kozje,
  },
  {
    value: 43,
    label: 'Poklek pri Podsredi',
    municipality: Municipality.Kozje,
  },
  {
    value: 59,
    label: 'Topolovo',
    municipality: Municipality.Kozje,
  },
  {
    value: 66,
    label: 'Vetrnik',
    municipality: Municipality.Kozje,
  },
  {
    value: 70,
    label: 'Vojsko',
    municipality: Municipality.Kozje,
  },
  {
    value: 71,
    label: 'Vrenska Gorca',
    municipality: Municipality.Kozje,
  },
  {
    value: 75,
    label: 'Zeče pri Bučah',
    municipality: Municipality.Kozje,
  },
  {
    value: 123,
    label: 'Gradišče',
    municipality: Municipality.Kozje,
  },
  {
    value: 124,
    label: 'Gubno',
    municipality: Municipality.Kozje,
  },
  {
    value: 125,
    label: 'Ješovec pri Kozjem',
    municipality: Municipality.Kozje,
  },
  {
    value: 127,
    label: 'Klake',
    municipality: Municipality.Kozje,
  },
  {
    value: 129,
    label: 'Kozje',
    municipality: Municipality.Kozje,
  },
  {
    value: 130,
    label: 'Krivica',
    municipality: Municipality.Kozje,
  },
  {
    value: 300,
    label: 'Drensko Rebro',
    municipality: Municipality.Kozje,
  },
  {
    value: 301,
    label: 'Lesično',
    municipality: Municipality.Kozje,
  },
  {
    value: 302,
    label: 'Zdole',
    municipality: Municipality.Kozje,
  },
  {
    value: 65,
    label: 'Verače',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 81,
    label: 'Cmereška Gorca',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 87,
    label: 'Golobinjek ob Sotli',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 89,
    label: 'Gostinca',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 92,
    label: 'Imeno',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 93,
    label: 'Imenska Gorca',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 103,
    label: 'Olimje',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 141,
    label: 'Pecelj',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 144,
    label: 'Podčetrtek',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 145,
    label: 'Polje ob Sotli',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 149,
    label: 'Prelasko',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 156,
    label: 'Roginska Gorca',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 157,
    label: 'Rudnica',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 159,
    label: 'Sela',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 161,
    label: 'Sodna vas',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 176,
    label: 'Vidovica',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 199,
    label: 'Jerčin',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 207,
    label: 'Lastnič',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 211,
    label: 'Nezbiše',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 232,
    label: 'Vonarje',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 291,
    label: 'Brezovec pri Polju',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 292,
    label: 'Pristava pri Mestinju',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 293,
    label: 'Pristava pri Lesičnem',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 294,
    label: 'Sedlarjevo',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 295,
    label: 'Slake',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 296,
    label: 'Sveta Ema',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 297,
    label: 'Škofja Gora',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 298,
    label: 'Trška cesta',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 299,
    label: 'Virštanj',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 408,
    label: 'Zdraviliška cesta',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 409,
    label: 'Cesta na Grad',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 410,
    label: 'Mala Rudnica',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 411,
    label: 'Globoko ob Dravinji',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 412,
    label: 'Hrastovec pod Bočem',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 413,
    label: 'Studenice',
    municipality: Municipality.Podcetrtek,
  },
  {
    value: 3,
    label: 'Gabrovec pri Kostrivnici',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 27,
    label: 'Kamna Gorca',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 116,
    label: 'Ceste',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 122,
    label: 'Drevenik',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 183,
    label: 'Aškerčeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 184,
    label: 'Brestovška cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 185,
    label: 'Brezje pri Podplatu',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 186,
    label: 'Cankarjeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 187,
    label: 'Celjska cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 188,
    label: 'Cerovec pod Bočem',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 189,
    label: 'Cesta na Bellevue',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 190,
    label: 'Cesta padlih aktivistov NOV',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 191,
    label: 'Cvetlični hrib',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 193,
    label: 'Gozdna ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 194,
    label: 'Gradiški Dol',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 195,
    label: 'Gubčeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 197,
    label: 'Irje',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 198,
    label: 'Izletniška ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 200,
    label: 'Kajuhova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 201,
    label: 'Kačji Dol',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 202,
    label: 'Kidričeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 203,
    label: 'Knežec',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 204,
    label: 'Kot',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 205,
    label: 'Krpanova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 206,
    label: 'Kvedrova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 208,
    label: 'Levstikova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 209,
    label: 'Male Rodne',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 210,
    label: 'Mladinska ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 212,
    label: 'Plat',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 214,
    label: 'Pristavica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 215,
    label: 'Prnek',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 216,
    label: 'Prvomajska ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 217,
    label: 'Rajnkovec',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 218,
    label: 'Ratanska vas',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 219,
    label: 'Sotelska cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 220,
    label: 'Spodnje Sečovo',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 221,
    label: 'Spodnji Gabernik',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 222,
    label: 'Strmec pri Svetem Florijanu',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 223,
    label: 'Tekačevo',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 224,
    label: 'Topole',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 225,
    label: 'Tuncovec',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 226,
    label: 'Ulica Zrinjskega',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 227,
    label: 'Vegova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 229,
    label: 'Vinec',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 238,
    label: 'Zdraviliški trg',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 240,
    label: 'Zgornja Kostrivnica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 241,
    label: 'Zgornje Negonje',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 242,
    label: 'Zgornje Sečovo',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 244,
    label: 'Zgornji Gabernik',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 247,
    label: 'Žibernik',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 248,
    label: 'Župančičeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 274,
    label: 'Cesta na Boč',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 275,
    label: 'Čača vas',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 276,
    label: 'Spodnja Kostrivnica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 277,
    label: 'Ulica Kozjanskega odreda',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 278,
    label: 'Linhartova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 279,
    label: 'Lovska ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 280,
    label: 'Na Trati',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 281,
    label: 'Ob progi',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 282,
    label: 'Plečnikova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 283,
    label: 'Prešernova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 284,
    label: 'Slomškova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 285,
    label: 'Spodnja cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 286,
    label: 'Spodnje Negonje',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 287,
    label: 'Šlandrova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 288,
    label: 'Tržaški Hrib',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 289,
    label: 'Ulica Ele Peroci',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 290,
    label: 'Zagaj pod Bočem',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 308,
    label: 'Gabrce',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 309,
    label: 'Podplat',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 353,
    label: 'Brestovec',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 354,
    label: 'Ivanov Hrib',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 355,
    label: 'Janina',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 356,
    label: 'Kamence',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 357,
    label: 'Lastine',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 358,
    label: 'Na Livadi',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 359,
    label: 'Nimno',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 360,
    label: 'Rjavica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 361,
    label: 'Sončna ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 362,
    label: 'Steklarska ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 363,
    label: 'Strma cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 364,
    label: 'Tržišče',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 365,
    label: 'Ulica XIV. divizije',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 366,
    label: 'Ulica Kozara',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 367,
    label: 'Ulica talcev',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 368,
    label: 'Velike Rodne',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 369,
    label: 'Vid Ivanuševa ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 370,
    label: 'Tavčarjeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 371,
    label: 'Zlatorogova ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 372,
    label: 'Ločen Dol',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 373,
    label: 'Partizanska cesta',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 374,
    label: 'Pod Bellevuejem',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 375,
    label: 'Podturn',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 376,
    label: 'Stritarjeva ulica',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 377,
    label: 'Sveti Florijan',
    municipality: Municipality.RogaskaSlatina,
  },
  {
    value: 20,
    label: 'Ceste',
    municipality: Municipality.Rogatec,
  },
  {
    value: 115,
    label: 'Brezovec pri Rogatcu',
    municipality: Municipality.Rogatec,
  },
  {
    value: 119,
    label: 'Dobovec pri Rogatcu',
    municipality: Municipality.Rogatec,
  },
  {
    value: 120,
    label: 'Donačka gora',
    municipality: Municipality.Rogatec,
  },
  {
    value: 136,
    label: 'Log',
    municipality: Municipality.Rogatec,
  },
  {
    value: 155,
    label: 'Rogatec',
    municipality: Municipality.Rogatec,
  },
  {
    value: 169,
    label: 'Strma ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 171,
    label: 'Sveti Jurij',
    municipality: Municipality.Rogatec,
  },
  {
    value: 172,
    label: 'Sveta Ema',
    municipality: Municipality.Rogatec,
  },
  {
    value: 173,
    label: 'Tlake',
    municipality: Municipality.Rogatec,
  },
  {
    value: 174,
    label: 'Trlično',
    municipality: Municipality.Rogatec,
  },
  {
    value: 182,
    label: 'Žahenberc',
    municipality: Municipality.Rogatec,
  },
  {
    value: 378,
    label: 'Ulica bratov Šanda',
    municipality: Municipality.Rogatec,
  },
  {
    value: 379,
    label: 'Celjska Cesta',
    municipality: Municipality.Rogatec,
  },
  {
    value: 381,
    label: 'Hofmanova ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 382,
    label: 'Kocenova ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 383,
    label: 'Lerchingerjeva ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 384,
    label: 'Maistrova ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 385,
    label: 'Obrtniška ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 386,
    label: 'Pot k ribniku',
    municipality: Municipality.Rogatec,
  },
  {
    value: 387,
    label: 'Ptujska cesta',
    municipality: Municipality.Rogatec,
  },
  {
    value: 388,
    label: 'Rajska ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 389,
    label: 'Slomškova ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 390,
    label: 'Sončna ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 391,
    label: 'Steklarska ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 392,
    label: 'Strmolska ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 394,
    label: 'Šorlijeva ulica',
    municipality: Municipality.Rogatec,
  },
  {
    value: 395,
    label: 'Tepešev graben',
    municipality: Municipality.Rogatec,
  },
  {
    value: 396,
    label: 'Trg',
    municipality: Municipality.Rogatec,
  },
  {
    value: 397,
    label: 'Ulica Mersijev',
    municipality: Municipality.Rogatec,
  },
  {
    value: 398,
    label: 'Vinska pot',
    municipality: Municipality.Rogatec,
  },
  {
    value: 407,
    label: 'Ob Sotli',
    municipality: Municipality.Rogatec,
  },
  {
    value: 29,
    label: 'Krtince',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 69,
    label: 'Vodenovo',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 72,
    label: 'Vrh',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 73,
    label: 'Zastranje',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 78,
    label: 'Škofija',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 419,
    label: 'Ponkvica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 83,
    label: 'Dol pri Pristavi',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 84,
    label: 'Dragomilo',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 85,
    label: 'Dvor',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 86,
    label: 'Gaj',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 90,
    label: 'Grobelce',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 95,
    label: 'Ješovec pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 96,
    label: 'Kamenik',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 97,
    label: 'Konuško',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 98,
    label: 'Koretno',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 100,
    label: 'Lekmarje',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 101,
    label: 'Lipovec',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 104,
    label: 'Orehovec',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 105,
    label: 'Pečica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 106,
    label: 'Pijovci',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 107,
    label: 'Polžanska gorca',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 108,
    label: 'Polžanska vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 405,
    label: 'Cankarjeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 111,
    label: 'Sveti Štefan',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 112,
    label: 'Topolovec',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 113,
    label: 'Zbelovska Gora',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 404,
    label: 'Aškerčev trg',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 139,
    label: 'Močle',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 142,
    label: 'Platinovec',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 153,
    label: 'Pustike',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 154,
    label: 'Rakovec',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 162,
    label: 'Sotensko pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 164,
    label: 'Spodnja Ponkvica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 165,
    label: 'Spodnje Selce',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 168,
    label: 'Stranje',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 170,
    label: 'Strtenica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 179,
    label: 'Šentvid pri Grobelnem',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 180,
    label: 'Šerovo',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 234,
    label: 'Zadrže',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 406,
    label: 'Kolodvorska ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 246,
    label: 'Zibiška vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 249,
    label: 'Babna Brda',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 250,
    label: 'Babna Gora',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 251,
    label: 'Babna Reka',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 252,
    label: 'Beli Potok pri Lembergu',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 253,
    label: 'Belo',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 254,
    label: 'Bezgovica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 255,
    label: 'Bobovo pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 256,
    label: 'Bodrež',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 257,
    label: 'Bodrišna vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 258,
    label: 'Brecljevo',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 259,
    label: 'Brezje pri Lekmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 260,
    label: 'Bukovje v Babni Gori',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 261,
    label: 'Cerovec pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 262,
    label: 'Dobrava',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 263,
    label: 'Dol pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 264,
    label: 'Dolga Gora',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 265,
    label: 'Globoko pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 266,
    label: 'Grliče',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 267,
    label: 'Hajnsko',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 268,
    label: 'Jerovska vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 269,
    label: 'Kristan vrh',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 270,
    label: 'Laše',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 271,
    label: 'Lemberg pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 272,
    label: 'Nova vas pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 273,
    label: 'Spodnje Tinsko',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 305,
    label: 'Vršna vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 306,
    label: 'Zgornje Tinsko',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 307,
    label: 'Zibika',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 310,
    label: 'Bevkova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 311,
    label: 'Cvetlična ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 312,
    label: 'Celjska cesta',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 314,
    label: 'Finžgarjeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 315,
    label: 'Gallusova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 316,
    label: 'Gornja vas',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 317,
    label: 'Grobelno',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 318,
    label: 'Gubčeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 319,
    label: 'Jazbina',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 320,
    label: 'Kettejeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 321,
    label: 'Kartinova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 322,
    label: 'Korpule',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 323,
    label: 'Lorgerjeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 324,
    label: 'Mala Pristava',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 325,
    label: 'Murnova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 328,
    label: 'Predel',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 329,
    label: 'Predenca',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 330,
    label: 'Prešernova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 331,
    label: 'Rakeževa ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 332,
    label: 'Rimska cesta',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 333,
    label: 'Rogaška cesta',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 334,
    label: 'Rožna ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 335,
    label: 'Senovica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 336,
    label: 'Slomškova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 337,
    label: 'Sončna ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 339,
    label: 'Tavčarjeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 340,
    label: 'Tratna pri Grobelnem',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 341,
    label: 'Trubarjeva ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 342,
    label: 'Ulica Franca Skaze',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 343,
    label: 'Ulica Marice Strnadove',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 344,
    label: 'Ulica Mateja Vrečarja',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 345,
    label: 'Ulica na Livado',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 346,
    label: 'Ulica v Zadrže',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 347,
    label: 'Vinski Vrh pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 349,
    label: 'Vošnjakova ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 350,
    label: 'Završe pri Grobelnem',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 351,
    label: 'Zelena ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 400,
    label: 'Mestinje',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 401,
    label: 'Obrtniška ulica',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 402,
    label: 'Preloge pri Šmarju',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 403,
    label: 'Sladka Gora',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 414,
    label: 'Spodnje Mestinje',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 416,
    label: 'Šmarje pri Jelšah',
    municipality: Municipality.SmarjePriJelsah,
  },
  {
    value: 417,
    label: 'Cesta na Sv. Rok',
    municipality: Municipality.SmarjePriJelsah,
  },
]
