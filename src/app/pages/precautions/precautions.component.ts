import { Component } from '@angular/core';

const PRECAUTIONS_TITLE = [
  'Clean your hands often. Use soap and water, or an alcohol-based hand rub.',
  'Maintain a safe distance from anyone who is coughing or sneezing.',
  'Don’t touch your eyes, nose or mouth.',
  'Cover your nose and mouth with your bentp elbow or a tissue when you cough or sneeze.',
  'Stay home if you feel unwell.',
  'If you have a fever, a cough, and difficulty breathing, seek medical attention. Call in advance.',
  'Follow the directions of your local health authority.',
];

@Component({
  selector: 'app-precautions',
  templateUrl: 'precautions.component.html',
  styleUrls: ['./precautions.component.css'],
})
export class PrecautionsComponent {
  title: string = 'Precautionary Measures';
  precautions: string[] = PRECAUTIONS_TITLE;
}
