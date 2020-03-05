function getWeather(q) {

    var url = 'https://search.naver.com/search.naver?query=' + encodeURI(q) + encodeURI(' 날씨');
    var mise, miseC, where, msg, temp, sendMsg, data, dot, rain, emo;

    try {
        data = Utils.getWebText(url);
        if(data == "" || data == null) return sendMsg = "데이터를 받아오는데 실패하였습니다.";
        where = /<h3 class=\"api_title\">.+?<\/h3>/.exec(data)[0].split('>')[1].split('<')[0].split(' 날씨')[0];
        mise = data.match(/(\d|null)+㎍\/㎥/g)[0];
        miseC = data.match(/(\d|null)+㎍\/㎥/g)[1];
        msg = /cast_txt\">.+?<\/p>/.exec(data)[0].split('>')[1].split('<')[0];
        temp = /todaytemp\">.+?<\/span>/.exec(data)[0].split('>')[1].split('<')[0];
        dot = /ico_humidity\".+?<\/span>/.exec(data)[0].split('height:')[1].split('\"')[0];
        rain = data.split('on now merge1')[1].split('</span>')[0].split('<span>')[1];
        emo = ['(하트뿅)', '(하하)', '(우와)', '(심각)', '(힘듦)', '(흑흑)', '(아잉)', '(찡긋)', '(뿌듯)', '(깜짝)', '(빠직)', '(짜증)', '(제발)', '(씨익)', '(신나)', '(헉)', '(열받아)', '(흥)', '(감동)', '(뽀뽀)', '(멘붕)', '(정색)', '(쑥스)', '(꺄아)', '(좋아)', '(굿)', '(훌쩍)', '(허걱)', '(부르르)', '(최고)', '(브이)', '(오케이)', '(최악)'];
    } catch (e) {
        sendMsg = "Error : " + e + "\n\n오류가 있습니다.\n다른검색어로 검색해보세요.";
        return sendMsg;
    }

    if (mise.split('㎍')[0] == 'null') mise = "-";
    if (miseC.split('㎍')[0] == 'null') miseC = "-";

    var random = Math.floor(Math.random() * emo.length);
    sendMsg = "*" + where + "*" + "\n-----------------------" + "\n미세먼지 : " + mise + fmise(mise.split('㎍')[0]) + "\n초미세먼지 : " + miseC + fmiseCho(miseC.split('㎍')[0]) +
        "\n-----------------------" + "\n기온 : " + temp + "℃\n" + "습도 : " + dot + "\n강수확률:  " + rain + "%" + "\n> " + msg + emo[random];
    return sendMsg;

}

function fmise(v) {
    if (v >= 0 && v <= 15) return " (매우좋음)";
    else if (v >= 16 && v <= 30) return " (좋음)";
    else if (v >= 31 && v <= 40) return " (양호)";
    else if (v >= 41 && v <= 50) return " (보통)";
    else if (v >= 51 && v <= 75) return " (나쁨)";
    else if (v >= 76 && v <= 100) return " (상당히나쁨)";
    else if (v >= 101 && v <= 150) return " (매우나쁨)";
    else if (v >= 151) return " (최악)";
    else return " (데이터없음)";
}
function fmiseCho(v) {
    if (v >= 0 && v <= 8) return " (매우좋음)";
    else if (v >= 9 && v <= 15) return " (좋음)";
    else if (v >= 16 && v <= 20) return " (양호)";
    else if (v >= 21 && v <= 25) return " (보통)";
    else if (v >= 26 && v <= 37) return " (나쁨)";
    else if (v >= 38 && v <= 50) return " (상당히나쁨)";
    else if (v >= 51 && v <= 75) return " (매우나쁨)";
    else if (v >= 76) return " (최악)";
    else return " (데이터없음)";
}




function getMise(sn, cn) {

    var api_key = 'A6Ml%2B4I%2FerrdVQxJZC5DN5%2B1l9J0J8j3Y1qtFykohFy55DHaOrtPinMPbmUzH%2FrKE9jQwhBc6X1YKgtEJpRajg%3D%3D';
    var urlM = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?'
        + 'ServiceKey=' + api_key + '&sidoName=' + encodeURI(sn) + '&searchCondition=HOUR&numOfRows=35';
    var data = Utils.getWebText(urlM);
    data = data.replace(/\s/g, "");
    var allData = [];
    var tempMsg;
    var leng = parseInt(data.match(/<totalCount>.*?[\d]{2}/g)[0].split('>')[1]);

    if (data == null) {
        tempMsg = "데이터를 받아올 수 없습니다.\n";
        return tempMsg;
    }

    if (leng == null) {
        tempMsg = "데이터를 받아올 수 없습니다. \n명령어를 잘못 입력하셨거나 서버오류입니다.\n";
        return tempMsg;
    }


    // 데이터 파싱해서 저장
    for (var i = 0; i < leng; i++) {
        allData.push({
            dataTime: data.match(/<dataTime>.*?<\/dataTime>/g)[i].split(">")[1].split("<")[0],
            cityName: data.match(/<cityName>.*?<\/cityName>/g)[i].split(">")[1].split("<")[0],
            pm10Value: data.match(/<pm10Value>.*?<\/pm10Value>/g)[i].split(">")[1].split("<")[0],
            pm25Value: data.match(/<pm25Value>.*?<\/pm25Value>/g)[i].split(">")[1].split("<")[0]
        });
        //alert(allData[i].dataTime+"\n"+allData[i].cityName+"\n"+allData[i].pm10Value+mise(allData[i].pm10Value)+"\n"+allData[i].pm25Value+miseCho(allData[i].pm25Value)+"\n");
    }

    for (var i = 0; i < leng; i++) {
        if (cn == allData[i].cityName) {
            tempMsg = "***미세먼지***\n" + "[" + allData[i].dataTime.substring(10, 16) + "] " + sn + " " + allData[i].cityName +
                "\n미세먼지 : " + allData[i].pm10Value + mise(allData[i].pm10Value) +
                "\n초미세먼지 : " + allData[i].pm10Value + mise(allData[i].pm10Value) +
                "\n[한국환경공단]" +
                "\n-----------";
            return tempMsg;
        }
    }
}

