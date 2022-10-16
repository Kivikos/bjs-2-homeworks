function solveEquation(a, b, c) {
  let arr = [];
  let d = 0;

  d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
     arr === [];
  }
  else if (d === 0) {
    arr.push(-b / (2 * a));
  }
  else if (d > 0) {
    arr.push((-b + Math.sqrt(d)) / (2 * a));
    arr.push((-b - Math.sqrt(d)) / (2 * a));
  }
  return arr; // array
}


function calculateTotalMortgage(percent, contribution, amount, date) {
  let perc = parseInt(percent) / 100 / 12;
    let contr = parseInt(contribution); 	  	
    let amo = parseInt(amount);  			  
  	if (isNaN(perc) || perc < 0) {
   		return `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
   	} else if (isNaN(contr) || contr < 0) {
   		return `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
   	} else if (isNaN(amo) || amo < 0) {
   		return `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
   	} else {
  		let now = new Date();
  		if (now.getFullYear() > date.getFullYear()) {
			return `Параметр "Срок ипотеки" содержит неправильное значение ${date}`;
		} else {
			  let s = amo - contr;						  
  			let n = date.getMonth() - now.getMonth() + (12*(date.getFullYear() - now.getFullYear()));
  			let pay = s*(perc+perc/(((1+perc)**n)-1));	
  			let totalAmount = (pay * n).toFixed(2);
  			console.log(totalAmount);
 			
      return Number(totalAmount);
 		}	
    }
  return Number(totalAmount);
}