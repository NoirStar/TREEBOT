

function getCorona(Jsoup) {
    let res,tmpArr,msg,time;
    let dataArr = []
    const uri = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun="
    res = Jsoup.connect(uri).get();
    tmpArr = res.select('table > tbody > tr').toArray();
    time = res.select('.timetable').text();
    tmpArr.forEach(element => {
        dataArr.push(element.text().split(' '));
    });
    //           0          1              2        3       4           5
    // dataArr 시도명 / 전일대비 증감 / 확진자수 / 사망자수 / 발생률  / 일일검사건수
    msg = '*코로나 현황*\n'+ time + '\n------------------------\n' +
    dataArr[0][0] + ' | 확진 : ' + dataArr[0][2]+ '명  사망 : ' + dataArr[0][4]+ '명' + '\n' +
    '------------------------\n' +
    dataArr[1][0] + ' | 확진 : ' + dataArr[1][2]+ '명  사망 : ' + dataArr[1][4]+ '명' + '\n' +
    dataArr[2][0] + ' | 확진 : ' + dataArr[2][2]+ '명  사망 : ' + dataArr[2][4]+ '명' + '\n' +
    dataArr[3][0] + ' | 확진 : ' + dataArr[3][2]+ '명  사망 : ' + dataArr[3][4]+ '명' + '\n' +
    dataArr[4][0] + ' | 확진 : ' + dataArr[4][2]+ '명  사망 : ' + dataArr[4][4]+ '명' + '\n' +
    dataArr[5][0] + ' | 확진 : ' + dataArr[5][2]+ '명  사망 : ' + dataArr[5][4]+ '명' + '\n' +
    dataArr[6][0] + ' | 확진 : ' + dataArr[6][2]+ '명  사망 : ' + dataArr[6][4]+ '명' + '\n' +
    dataArr[7][0] + ' | 확진 : ' + dataArr[7][2]+ '명  사망 : ' + dataArr[7][4]+ '명' + '\n' +
    dataArr[8][0] + ' | 확진 : ' + dataArr[8][2]+ '명  사망 : ' + dataArr[8][4]+ '명' + '\n' +
    dataArr[9][0] + ' | 확진 : ' + dataArr[9][2]+ '명  사망 : ' + dataArr[9][4]+ '명' + '\n' +
    dataArr[10][0] + ' | 확진 : ' + dataArr[10][2]+ '명  사망 : ' + dataArr[10][4]+ '명' + '\n' +
    dataArr[11][0] + ' | 확진 : ' + dataArr[11][2]+ '명  사망 : ' + dataArr[11][4]+ '명' + '\n' +
    dataArr[12][0] + ' | 확진 : ' + dataArr[12][2]+ '명  사망 : ' + dataArr[12][4]+ '명' + '\n' +
    dataArr[13][0] + ' | 확진 : ' + dataArr[13][2]+ '명  사망 : ' + dataArr[13][4]+ '명' + '\n' +
    dataArr[14][0] + ' | 확진 : ' + dataArr[14][2]+ '명  사망 : ' + dataArr[14][4]+ '명' + '\n' +
    dataArr[15][0] + ' | 확진 : ' + dataArr[15][2]+ '명  사망 : ' + dataArr[15][4]+ '명' + '\n' +
    dataArr[16][0] + ' | 확진 : ' + dataArr[16][2]+ '명  사망 : ' + dataArr[16][4]+ '명' + '\n' +
    dataArr[17][0] + ' | 확진 : ' + dataArr[17][2]+ '명  사망 : ' + dataArr[17][4]+ '명' + '\n';
    return msg;
}