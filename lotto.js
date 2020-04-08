
function random(min, max,val) {
	let seed = new Date().getTime();
	let x = Math.sin(seed + parseInt(val)) * 10000;
	return Math.round((x - Math.floor(x)) * (max-min) + min);
}

function getLotto(seed) {

    let num;
    let flag = false;
    let lottoNum = [];

    while(1){

        if(lottoNum.length == 6) break;
        num = random(1,45,seed);
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
    return lottoNum.sort((a,b) => {return a-b});
}