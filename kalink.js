function random(min, max) {
	let seed = new Date().getTime();
	let x = Math.sin(seed) * 10000;
	return Math.round((x - Math.floor(x)) * (max-min) + min);
}


exports.test = 
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
                "web_url": "noirstar.github.io",
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
};

function imageTemplete(title, image_url) {    
    return {
        "link_ver": "4.0",
        "template_object":
        {
            "object_type": "feed",
            "button_title": "",
            "content": {
                "title": title + " 검색결과",
                "image_url": image_url,
                "link":
                {
                    "web_url": "noirstar.github.io",
                    "mobile_web_url": "noirstar.github.io"
                }
            },
            "buttons": [
                {
                    "title": "",
                    "link": {
                        "web_url": "noirstar.tistory.com",
                        "mobile_web_url": "noirstar.tistory.com"
                    }
                }
            ]
        }
    };
}

exports.searchImage = (Jsoup,query) => {
    let res,img,src,ran;
    res = Jsoup.connect('https://search.naver.com/search.naver?where=image&sm=tab_jum&query=' + encodeURI(query)).get();
    img = res.select('span._meta').toArray();
    ran = random(0,img.length - 1)
    src = img[ran].text().split('originalUrl":"')[1].split('",')[0];
    return imageTemplete(query,unescape(src));
}

