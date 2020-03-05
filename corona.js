const Jsoup = org.jsoup.Jsoup;

function getCorona() {
    let res,tmpArr, dataArr;
    const uri = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun="
    res = Jsoup.connect(uri).get();
    tmpArr = res.select('table > tbody > tr').toArray();
    tmpArr.foreach((element) => {
        dataArr.push(element.text().split(' '));
    })
}