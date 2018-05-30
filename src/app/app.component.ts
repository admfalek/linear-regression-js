import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  predictedY: number = 0;

  // xy_dataset format: array of [x, y] arrays
  xyDatasets = [[3, 20], [3, 25], [2, 20], [4, 30], [1, 10]];
  newXval: number;

  linearRegression(newX) {
  	if(newX != '') {
  		document.querySelector('.add-table').removeAttribute('disabled');

  		let aParameter = 0,
				  bParameter = 0,
				  xyMultiplication = [],
					xExponentiation = [],
					xyMultiplicationSum,
					xExponentiationSum,
					itemsLen = 0,
					xSum = 0,
					ySum = 0,
					xPowSum = 0;

  		this.xyDatasets.map((xy) => {
				xyMultiplication.push(xy[0]*xy[1]);
				xExponentiation.push(Math.pow(xy[0], 2));
				xSum += xy[0];
				ySum += xy[1];
				xPowSum += Math.pow(xy[0], 2);
			});

  		itemsLen = this.xyDatasets.length;
			xyMultiplicationSum = xyMultiplication.reduce((sum, x) => sum + x);
			xExponentiationSum = xExponentiation.reduce((sum, x) => sum + x);

			// y = a + b*x
			// n = dataSets length
			// b = n*sum(x*y) - sum(x)*sum(y) / n*sum(x*2) - (sum(x))*2
			let bNominator = (itemsLen*xyMultiplicationSum)-((xSum*ySum)),
					bDenominator = (itemsLen*xPowSum)-(Math.pow(xSum, 2));
					bParameter = bNominator/bDenominator;

			// a = mean(y) - b*x
			aParameter = (ySum/itemsLen)-(bParameter*(xSum/itemsLen));

			this.predictedY = Math.round(aParameter+(bParameter*newX));
			this.newXval = newX;
  	} else {
  		document.querySelector('.add-table').setAttribute('disabled', 'true');
  	}
	}

	addToTable() {
		this.xyDatasets.push([Number(this.newXval), this.predictedY]);
	}

}
