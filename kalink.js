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
                    "title": ""
                }
            ]
        }
    };
}

exports.searchImage = (Jsoup,query,random) => {
    let res,img,src
    res = Jsoup.connect('https://www.bing.com/images/search?q=' + query).get();
    img = res.select('img.mimg').toArray();
    src = img[random].attr("src");
    return imageTemplete(query,src);
}
