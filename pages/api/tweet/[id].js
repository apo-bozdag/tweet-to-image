import axios from 'axios'

const headers = {
    'Authorization': `Bearer ${process.env.NEXT_APP_BEARER_TOKEN}`
}

export default async function handler(req, res) {
    const id = req.query.id
    console.log('headers', headers)
    try {
        // const response = await axios.get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`, {headers})
        const response = {
            "data": {
                "data": {
                    "edit_history_tweet_ids": [
                        "1624756150561275904"
                    ],
                    "public_metrics": {
                        "retweet_count": 85,
                        "reply_count": 1,
                        "like_count": 323,
                        "quote_count": 3,
                        "impression_count": 93920
                    },
                    "text": "Şu an 20,000'den fazla kişi @acikyazilimagi 'nda çalışıyor. Sadece yazılım değil, örgütlenme konusunda da çok yol alındı. Hep birlikte bu açık ve katılımcı ağı güçlendirelim. https://t.co/BGCnR4zoYR",
                    "id": "1624756150561275904",
                    "entities": {
                        "mentions": [
                            {
                                "start": 28,
                                "end": 43,
                                "username": "acikyazilimagi",
                                "id": "1622565655332458496"
                            }
                        ],
                        "urls": [
                            {
                                "start": 175,
                                "end": 198,
                                "url": "https://t.co/BGCnR4zoYR",
                                "expanded_url": "https://twitter.com/eser/status/1624750909006790657",
                                "display_url": "twitter.com/eser/status/16…"
                            }
                        ]
                    },
                    "author_id": "53333911",
                    "created_at": "2023-02-12T13:03:47.000Z"
                },
                "includes": {
                    "users": [
                        {
                            "username": "memetalialabora",
                            "verified": true,
                            "id": "53333911",
                            "profile_image_url": "https://pbs.twimg.com/profile_images/1498734210395353090/QGF0m7g1_normal.jpg",
                            "name": "Memet Ali Alabora"
                        }
                    ]
                }
            },
            "status": 200
        }
        if (response.data.data?.entities?.urls) {
            const find_url = response.data.data.entities.urls.filter(function (url) {
                return url.expanded_url.includes('twitter.com')
            })
            if (find_url.length > 0){
                const quotedUrl = find_url[0].expanded_url
                const quotedTweetId = quotedUrl.split('/')[quotedUrl.split('/').length - 1]
                // const quotedTweet = await axios.get(`https://api.twitter.com/2/tweets/${quotedTweetId}?expansions=author_id&user.fields=profile_image_url,verified&tweet.fields=created_at,public_metrics,entities,source`, {headers})
                const quotedTweet = {
                    "data": {
                        "data": {
                            "text": "@DoanDadelen5 @gunbatimi @duybir @glshrdnr @AskeriMuhendiss @AltugAkgul @farukec @TRbilisimvakfi @benfurkankilic @fkadev çok kez “yazılım vakfı” konusu gündeme geldi geçmişte de; önemli olan “tabelayı asmak” değil.\n\ngelin önce @acikyazilimagi olarak hareket edelim, sonra resmi kimliğe karar verilir. önce topluluğu oluşturmak ve zemini belirlemek gerekecek.\n\nhali hazırda 20,000+ kişiyiz.",
                            "author_id": "16973893",
                            "entities": {
                                "mentions": [
                                    {
                                        "start": 0,
                                        "end": 13,
                                        "username": "DoanDadelen5",
                                        "id": "1451510640774983681"
                                    },
                                    {
                                        "start": 14,
                                        "end": 24,
                                        "username": "gunbatimi",
                                        "id": "15612731"
                                    },
                                    {
                                        "start": 25,
                                        "end": 32,
                                        "username": "duybir",
                                        "id": "50355087"
                                    },
                                    {
                                        "start": 33,
                                        "end": 42,
                                        "username": "glshrdnr",
                                        "id": "1041978296211333121"
                                    },
                                    {
                                        "start": 43,
                                        "end": 59,
                                        "username": "AskeriMuhendiss",
                                        "id": "2241902804"
                                    },
                                    {
                                        "start": 60,
                                        "end": 71,
                                        "username": "AltugAkgul",
                                        "id": "406815017"
                                    },
                                    {
                                        "start": 72,
                                        "end": 80,
                                        "username": "farukec",
                                        "id": "81393026"
                                    },
                                    {
                                        "start": 81,
                                        "end": 96,
                                        "username": "TRbilisimvakfi",
                                        "id": "1207858068"
                                    },
                                    {
                                        "start": 97,
                                        "end": 112,
                                        "username": "benfurkankilic",
                                        "id": "1058791936373522437"
                                    },
                                    {
                                        "start": 113,
                                        "end": 120,
                                        "username": "fkadev",
                                        "id": "229021888"
                                    },
                                    {
                                        "start": 227,
                                        "end": 242,
                                        "username": "acikyazilimagi",
                                        "id": "1622565655332458496"
                                    }
                                ]
                            },
                            "public_metrics": {
                                "retweet_count": 159,
                                "reply_count": 7,
                                "like_count": 308,
                                "quote_count": 57,
                                "impression_count": 131469
                            },
                            "id": "1624750909006790657",
                            "created_at": "2023-02-12T12:42:57.000Z",
                            "edit_history_tweet_ids": [
                                "1624750909006790657"
                            ]
                        },
                        "includes": {
                            "users": [
                                {
                                    "name": "Eser Ozvataf (laroux)",
                                    "profile_image_url": "https://pbs.twimg.com/profile_images/1594847847706394624/-AETyyJb_normal.jpg",
                                    "id": "16973893",
                                    "username": "eser",
                                    "verified": false
                                }
                            ]
                        }
                    },
                    "status": 200
                }
                response.data.data.quoted_tweet = quotedTweet.data
            }
        }
        res.status(200).json({data: response.data, status: response.status})
    } catch (e) {
        res.send({message: 'Something went wrong, please try again', error: e.message})
    }
}
