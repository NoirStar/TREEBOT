function random(min, max) {
	let seed = new Date().getTime();
	let x = Math.sin(seed) * 10000;
	return Math.round((x - Math.floor(x)) * (max-min) + min);
}

function getLotto() {

    let num;
    let flag = false;
    let lottoNum = [];

    while(1){

        if(lottoNum.length == 6) break;
        num = random(1,45);
        lottoNum.forEach(element => {
            if(element == num) {
                flag = true;
            };
        });

        if(flag) {
            flag = false;
        } else {
            lottoNum.push(num);
        }
        
    }
    return lottoNum.sort();
}