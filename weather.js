const Jsoup = org.jsoup.Jsoup;

function getWeather(q) {

    let url = 'https://search.naver.com/search.naver?query=' + encodeURI(q) + encodeURI(' 날씨');
    let mise, miseC, where, msg, temp, sendMsg, data, dot, rain, emo;

    try {
        data = Jsoup.connect(url).get();
        if(data == "" || data == null) return sendMsg = "데이터를 받아오는데 실패하였습니다.";
        where = data.select('.api_title').text().split(' 날씨')[0];
        mise = data.select('dd.lv2 > span.num').toArray()[0].text();
        miseC = data.select('dd.lv2 > span.num').toArray()[1].text();
        msg = data.select('.cast_txt').toArray()[0].text();
        temp = data.select('.todaytemp').toArray()[0].text();
        dot = data.select('.info_list.humidity._tabContent > ul > li > dl > dd.weather_item').toArray()[0].text();
        rain = data.select('.info_list.rainfall._tabContent > ul > li > dl > dd.weather_item').toArray()[0].text();
        emo = ['(하트뿅)', '(하하)', '(우와)', '(심각)', '(힘듦)', '(흑흑)', '(아잉)', '(찡긋)', '(뿌듯)', '(깜짝)', '(빠직)', '(짜증)', '(제발)', '(씨익)', '(신나)', '(헉)', '(열받아)', '(흥)', '(감동)', '(뽀뽀)', '(멘붕)', '(정색)', '(쑥스)', '(꺄아)', '(좋아)', '(굿)', '(훌쩍)', '(허걱)', '(부르르)', '(최고)', '(브이)', '(오케이)', '(최악)'];
    } catch (e) {
        sendMsg = "Error : " + e + "\n\n오류가 있습니다.\n다른검색어로 검색해보세요.";
        return sendMsg;
    }

    if (mise.split('㎍')[0] == 'null') mise = "-";
    if (miseC.split('㎍')[0] == 'null') miseC = "-";

    let random = Math.floor(Math.random() * emo.length);
    sendMsg = "*" + where + "*" + "\n-----------------------" + "\n미세먼지 : " + mise + fmise(mise.split('㎍')[0]) + "\n초미세먼지 : " + miseC + fmiseCho(miseC.split('㎍')[0]) +
        "\n-----------------------" + "\n기온 : " + temp + "℃\n" + "습도 : " + dot + "\n강수확률:  " + rain  + "\n> " + msg + emo[random];
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