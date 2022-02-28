import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Calculator app until 10 digits';

  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;

  pressKey(key: string) {
    if (key === '-' || key === '+' || key === '') {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      if (key === '') {
        this.operator = this.operator;
      } else {
        this.operator = key;
      }
      console.log('this.operator: ', this.operator);
      this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operatorSet = false;
  }

  lastClear() {
    if (this.mainText) {
      this.mainText = this.mainText.slice(0, -1);
      this.operatorSet = false;
    } else {
      return;
    }
  }

  polarize() {
    if (this.mainText && parseFloat(this.mainText) > 0) {
        this.mainText = '-' + this.mainText;
      } else if (this.mainText && parseFloat(this.mainText) === 0) {
        this.mainText = this.mainText;
      } else {
        this.mainText = this.mainText.slice(1);
      }
    this.operand1 = parseFloat(this.mainText);
    this.pressKey('');
    this.operatorSet = false;
  }

  getAnswer() {
    this.calculationString = this.mainText;
    if (this.operand1 < 0 && this.operator === '-') {
      this.operand2 = parseFloat(this.mainText.split(this.operator)[2]);
    } else {
      this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    }
    if (this.operator === '-') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    } else if (this.operator === '+') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    } else {
      this.subText = 'ERROR: Invalid Operation';
    }
    this.operatorSet = false;
    this.answered = true;
  }
}
