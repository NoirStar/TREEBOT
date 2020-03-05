function getInfo() {

    var url = 'https://quasarzone.co.kr/bbs/board.php?bo_table=qb_saleinfo';
    var data, data2, title, link;
    var msg = '***** 퀘이사존 *****';
    var num;
    try {
        data = Utils.getWebText(url);
        for (var i = 0; i < 6; i++) {
            num = data.split('saleinfo&amp;wr_id=')[i + 5].split('\"')[0];
            var url2 = 'https://quasarzone.co.kr/bbs/board.php?bo_table=qb_saleinfo&wr_id=' + num;
            data2 = Utils.getWebText(url2);
            title = data2.split('headline\" content=\"')[1].split('\"')[0].trim();
            try {
                link = data2.split('break-word\" href=\"')[1].split('\"')[0].replace(/amp;/gi, '');
            } catch (e) {
                link = url2;
            }
            msg += '\n' + title + '\n' + link;
            msg += '\n';
        }
        return msg;
    } catch (e) {
        return e;
    }
}

function getInfo2() {

    var url = 'http://www.ppomppu.co.kr/zboard/zboard.php?id=ppomppu';
    var data, data2, title, link;
    var num;
    var msg = '***** 뽐뿌 *****';
    var num2;
    try {
        data = Utils.getWebText(url);
        num2 = data.split('page=1&amp;divpage=')[2].split('&amp')[0].trim();
        for (var i = 0; i < 6; i++) {

            num = data.split('page=1&amp;divpage=' + num2 + '&amp;no=')[i + 1].split('\"')[0];
            var url2 = 'http://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&page=1&divpage=' + num2 + '&no=' + num;
            data2 = Utils.getWebText(url2);
            if (data2.split('DCM_TITLE-->')[1].substring(0, 1) == '<') {
                title = data2.split('DCM_TITLE-->')[1].split('> ')[1].split('<')[0].trim();
            } else {
                title = data2.split('DCM_TITLE-->')[1].split('<')[0].trim();
            }

            try {
                link = data2.split('_blank\">http')[1].split('</a>')[0].replace(/amp;/gi, '');
                link = 'http' + link;
            } catch (e) {
                link = url2;
            }
            msg += '\n' + title + '\n' + link;
            msg += '\n';
        }
        return msg;
    } catch (e) {
        return e;
    }
}



function getInfo3() {

    var url = 'http://www.ajpeople.com/bbs/board.php?bo_table=hotdeal&page=1';
    var data, data2, title, link, price;
    var msg = '***** 아싸직구 *****';
    var num;
    try {
        data = Utils.getWebText(url);
        for (var i = 0; i < 10; i++) {
            num = data.split('<td class="td_subject"> <a href="http://www.ajpeople.com/bbs/board.php?bo_table=hotdeal&amp;wr_id=')[i + 2].split('&amp;')[0];
            title = data.split('&amp;page=1"> <font color="#373737">')[i + 1].split('<')[0].trim();
            var url2 = 'http://www.ajpeople.com/bbs/board.php?bo_table=hotdeal&wr_id=' + num

            data2 = Utils.getWebText(url2);

            //price = split('#bb2020;">')[1].split('<')[0];
            //title = title + ' - ' + price;
            try {
                link = data2.split('<!-- /레벨2부터 시작  -->')[1].split('\"')[1].split('\"')[0];
            } catch (e) {
                link = url2;
            }
            msg += '\n' + title + '\n' + link;
            msg += '\n';
        }
        return msg;
    } catch (e) {
        return e;
    }
}
