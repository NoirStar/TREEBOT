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

exports.imageTemplete = (title, image_url) => {    
    return {
        "link_ver": "4.0",
        "template_object":
        {
            "object_type": "feed",
            "content": {
                "title": title,
                "image_url": image_url,
                "link":
                {
                    "web_url": "noirstar.github.io",
                    "mobile_web_url": "noirstar.github.io"
                },
            },
        }
    };
}

