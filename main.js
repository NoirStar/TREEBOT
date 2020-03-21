const scriptName = "test.js";
const randomM = Bridge.getScopeOf("random.js");
const foodM = Bridge.getScopeOf("food.js");
const weatherM = Bridge.getScopeOf("weather.js");
const informationM = Bridge.getScopeOf("information.js");
const coronaM = Bridge.getScopeOf("corona.js");
const lottoM = Bridge.getScopeOf("lotto.js");
const Jsoup = org.jsoup.Jsoup;
const env = require('env.js');
const kaling = require('kaling.js').Kakao();
const Kakao = new kaling;

try{
    Kakao.init(env.ACCOUNT_INFO.apiKey);
    Kakao.login(env.ACCOUNT_INFO.id,env.ACCOUNT_INFO.pw);
}catch(e){
    replier.reply(e);
}


let emo = ['(하트뿅)', '(하하)', '(우와)', '(심각)', '(힘듦)', '(흑흑)', '(아잉)', '(찡긋)', '(뿌듯)', '(깜짝)', '(빠직)', '(짜증)', '(제발)', '(씨익)', '(신나)', '(헉)', '(열받아)', '(흥)', '(감동)', '(뽀뽀)', '(멘붕)', '(정색)', '(쑥스)', '(꺄아)', '(좋아)', '(굿)', '(훌쩍)', '(허걱)', '(부르르)', '(최고)', '(브이)', '(오케이)', '(최악)'];
let cmds = [];
let msgs = [];
let allWord = "";
let reNamu = /^\.나무 [\w\W]+/i
let rePapago = /^(\.한영|\.영한|\.한일)\s+[\w\W\s]+/i
let reMise = /(\.미세\s)[ㄱ-힣]+/
let reCorona = /(\.코로나\s)[ㄱ-힣]+/
let reTest = /^(\.테스트\s)[ㄱ-힣]{2,10}/

//함수//

function AddCMD(request, response) {
    cmds.push({ req: request, res: response })
}
function AddMSG(request, response) {
    msgs.push({ req: request, res: response })
}


//모든메세지
for (let i in msgs) {
    allWord += (msgs[i].req + ", ");
}
allWord = allWord.slice(0, -2);

//msg 추가
AddMSG("안녕", "안녕?");
AddMSG("잘가", "응 잘가");
AddMSG("ㅋㅋ", "ㅋㅋㅋㅋㅋ");

//cmd 추가
AddCMD(".명령어", "***트리봇***\n.명령어 => 명령어리스트\n.단어 => 반응하는말\n.나무위키 => 나무위키 검색\n.번역 => 파파고 번역기\n.미세먼지 => 미세먼지 정보\n.코로나 => 코로나정보\n.로또 => 로또 번호생성\n.뭐먹 => 메뉴추천\n.뽑기 => 운 테스트\n.정보 => 유용한정보\n.직구 => 직구핫딜\n.자스 => 자바스크립트 실행\nVer. 20200307 / NS");
AddCMD(".단어", "***반응하는 단어***\n" + allWord);//2
AddCMD(".번역", ".한영 [검색어]\n.영한 [검색어]\n.한일 [검색어]");//3
AddCMD(".네이버검색", ".네이버 [검색어]");//4
AddCMD(".나무위키", ".나무 [검색어]");//5
AddCMD(".단어추가", ".말 [입력] [출력]")//7
AddCMD(".미세먼지", ".미세 [검색어]\n\nex) .미세 수영구");
AddCMD(".뽑기", "명령어 => .ㅂ\n***확률***\n꽝(36%)\n노말(50%)\n매직(10%)\n레어(3%)\n유니크(0.3%)\n레전더리(0.03%)\n에픽(0.003%)");



function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

    room = room.replace(',',', ');
    //코드실행 
    if (/^(\.자스 )/.exec(msg)) {
        replier.reply(runScript(msg.split(".자스")[1]));
    }

    //정보
    if (/^(\.정보)/.exec(msg)) {
        replier.reply("잠시만 기다려주세요...");
        replier.reply(informationM.getInfo() + '\n' + informationM.getInfo2());
        return;
    }
    //직구
    if (/^(\.직구)/.exec(msg)) {
        replier.reply("잠시만 기다려주세요...");
        replier.reply(informationM.getInfo3());
        return;
    }
                      
    //나무위키
    if (reNamu.exec(msg)) {
        str = reNamu.exec(msg)[0].split('.나무 ')[1];
        replier.reply(namu(str));
        return;
    }

    if (/.*?\?$/.exec(msg) || /.*?요$/.exec(msg)) {
        let message = ['어케했노', '어카지', '고민..', 'ㅗㅜㅑ..', '세상좋네', '좋네', '이야', '랜덤같지?', '상관있을듯', '상관없을듯', '나도모름', '생각안남', '나도 모르겠는걸?', '뭐?', '생각해봄', '납득', '가능?', '그러게', '않임', '외 않된데?', '흠터레스팅', '그럴수 있지', '동감', '오 그래요?', '그럴수도있음', '오??', '과연?', '다시한번생각해봐 ', 'ㅇㅇ맞음', '그런것같아요', '저도 궁금해요.', 'ㅇㅇ 그런것같네요', '아마도?', '흠..', '올ㅋ', '아?', '궁금해', '그런거야?', '그럴지도', 'ㅇㅇ', '그렇습니다(최고)', '슬프네요', '즐거우신가요', '뭔데', '아 그렇나', '몰랐네', '나도 그렇게생각해', '동감입니다', '뭐에요?', 'ㅇㅅㅇ', '신기하네', '저도 가르쳐 주세요', '그럴까'];
        let random = Math.floor(Math.random() * message.length);
        let random2 = Math.floor(Math.random() * 5);
        let random3 = Math.floor(Math.random() * emo.length);
        if (random2 == 1) replier.reply(message[random]);
    }
    if (/트리봇/.exec(msg)) {
        let message = ['힝', '힘들다', '후..', '(긴장)', '뭐요 휴먼', '...', '?..', 'ㅋ', '네^^', '1절만하자', '관심꺼줄래?', '그만불러', '그러면안댕', '응아니야', '아닙니다', '과연그럴까?', '다시한번 생각해봐요', '왜그렇게 생각하십니까', '왜요', '뭐가요', '네 부르셨나요', '저 욕하신거죠', '너무하네', '살려줘', '쫌 죄송하네', '왜 부름', '당당', '죄송해요 ㅠㅠ', '뭐', '아니야', '그만해', '그만해줘', '공격을멈춰주세요', '갈굼을 멈추어주세요', '?', '무요', '정말?', '고마워', 'Thank you', '그만', '넹', '아니야', '응 아니야'];
        let random = Math.floor(Math.random() * message.length);
        let random2 = Math.floor(Math.random() * emo.length);
        let random3 = Math.floor(Math.random() * 3);
        if (random3 == 1) replier.reply(message[random]);
    }

    //미세먼지
    if (reMise.exec(msg)) {
        let query = msg.split('.미세')[1];
        replier.reply(weatherM.getWeather(query,Jsoup));
        return;
    }

    //코로나
    if (msg == '.코로나') {
        replier.reply(coronaM.getCorona(Jsoup));
        return;
    }

    //로또
    if (msg == '.로또') {
        replier.reply("**** 행운번호 ****\n" + lottoM.getLotto());
        return;
    }

    //음식
    if (msg == ".뭐먹") {
        replier.reply(foodM.getRandomMsg());
        return;
    }

    //뽑기
    if (msg == ".ㅂ") {
        replier.reply(randomM.getItem());
        return;
    }
    //테스트
    if (msg == ".테") {
        try{
            Kakao.send(room,
                {
                    "link_ver": "4.0",
                    "template_object":
                    {
                        "object_type": "feed",
                        "button_title": "버튼",
    
                        "content": {
                            "title": "제목",
                            "image_url": "http://k.kakaocdn.net/dn/dEwroC/btqgdYG36hU/1zQbPe8ZLpGGmoMkrf0iX0/kakaolink40_original.png",
                            "link":
                            {
                                "web_url": "naver.com",
                                "mobile_web_url": "naver.com"
                            },
                            "description": "설명"
                        },
    
                        "buttons": [
                            {
                                "title": "버튼",
                                "link":
                                {
                                    "web_url": "noirstar.tistory.com",
                                    "mobile_web_url": "noirstar.tistory.com"
                                }
                            }
                        ]
    
                    }
                });
        }catch(e) {
            replier.reply(e);
        }    
    }
    if (msg == ".테2") {
        replier.reply(room);
        return;
    }
    //네이버 파파고
    if (rePapago.exec(msg)) {
        lang = rePapago.exec(msg)[0].split(' ')[0];
        if (lang == ".한영") {
            str = rePapago.exec(msg)[0].split('.한영 ')[1];
            replier.reply("***번역결과***")
            replier.reply(Api.papagoTranslate("ko", "en", str));
            return;
        } else if (lang == ".영한") {
            str = rePapago.exec(msg)[0].split('.영한 ')[1];
            replier.reply("***번역결과***")
            replier.reply(Api.papagoTranslate("en", "ko", str));
            return;
        } else if (lang == ".한일") {
            str = rePapago.exec(msg)[0].split('.한일 ')[1];
            replier.reply("***번역결과***")
            replier.reply(Api.papagoTranslate("ko", "ja", str));
            return;
        } else {
            replier.reply("검색 오류입니다. \n다시한번 확인해 주세요.");
            return;
        }
    }

    for (let i in cmds) {
        if (msg == cmds[i].req) replier.reply(cmds[i].res);
    }

    for (let i in msgs) {
        if (msg == msgs[i].req) replier.reply(msgs[i].res);
    }

}

function runScript(str) {
    try {
        let result;
        result = eval(String(str));

        //result =  result + "\n" + str;
        return result;
    } catch (e) {
        return e;
    }

}

//나무위키 검색함수
function namu(str) {
    let url = 'https://namu.wiki/w/' + encodeURI(str);
    let result;
    try {
        let html = Utils.getWebText(url);
        contents = html.split('div class="wiki-heading-content">')[1].split('<h2 class="wiki-heading"')[0].replace(/(<([^>]+)>)/g, "").replace(/\s{2,}/g, "").replace(/\n/g, "").trim().substring(0, 300) + "...";
        result = str + "에 대한 결과입니다.\n" + contents + "\n\n자세한내용은 " + "https://namu.wiki/w/" + encodeURI(str) + " 을 참고해주세요";
        return result;

    } catch (e) {
        result = "나무위키에서 " + str + "을(를) 찾을 수 없거나 오류가 있습니다.";
        return result;
    }
}



