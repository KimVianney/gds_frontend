import { v4 as uuid4 } from "uuid";
import {
  endOfQuarter,
  endOfWeek,
  endOfYear,
  randomDate,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from "../../../utils/date";

const starts = [startOfWeek, startOfQuarter, startOfYear];
const ends = [endOfWeek, endOfQuarter, endOfYear];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const medicalWords = [
  "obdormition",
  "paresthesia",
  "Sphenopalatine ganglioneuralgia",
  "fasciculation",
  "heloma molle",
  "heloma durum",
  "transient lingual papillitis",
  "onychocryptosis",
  "unguis incarnatus",
  "Aphthous stomatitis",
  "morsicatio buccarum",
  "transient diaphragmatic spasm",
  "synchronous diaphragmatic flutter",
  "sternutate",
  "muscae volitantes",
  "nocturnal enuresis",
  "diurnal enuresis",
  "vasovagal syncope",
  "orthostatic hypotension",
  "horripilation",
  "gustatory rhinitis",
  "crepitus",
  "medial tibial stress syndrome",
  "veisalgia",
];

export const data = new Array(20).fill(null).map((data) => ({
  id: uuid4(),
  description: randomItem(medicalWords),
  date: randomDate(randomItem(starts).toDate(), randomItem(ends).toDate()),
}));

export const html = (text: string) => `<html>
<head>
  <style>
    :root {
      --chakra-colors-brand-maximumBlue: #37b1d4;
      --chakra-space-3: 0.75rem;
      --chakra-fontWeights-bold: 700;
    }

    html {
      padding: 4rem;
      -webkit-print-color-adjust: exact
    }

    #flex-wrapper-1 {
      display: none;
    }

    .h-stack-1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
    }

    .custom-section {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      max-width: 37.5rem;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.375rem;
      margin-bottom: 1.75rem;
    }

    #section-left {
      // color: var(--chakra-colors-brand-maximumBlue);
      font-weight: var(--chakra-fontWeights-bold);
    }

    #section-right {
      text-align: right;
    }

    .lined {
      background-image: linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 0px);
      background-size: 100% 2em;
    }

    .paper {
      height: 20rem;
      display: flex;
      flex: 1;
      margin-left: 4rem;
    }

    .image-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .custom-2xl {
      font-size: 1.5rem;     
    }

    #header {
      text-align: center;
    }
    .sign {
      height: 10em;
      background-color: yellow;
    }
  </style>
</head>

<body>
    <h2 id='header'>X-ray Analysis Report</h2>
  ${text}
  <div class='custom-section'>
    <div id='section-left'>
    Signed by:
    </div>
    <div id='section-right'>
    Date:
    </div>
  </div>
  <div class='custom-section lined' style="margin-top: 2rem">
    <div id='section-left' class='lined sign' />
    <div id='section-right' class='lined'/>
  </div>
</body>
</html>`;
