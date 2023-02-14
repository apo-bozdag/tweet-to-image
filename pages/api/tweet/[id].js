import axios from 'axios'

const headers = {
    'Authorization': `Bearer ${process.env.NEXT_APP_BEARER_TOKEN}`
}

export default async function handler(req, res) {
    const id = req.query.id
    console.log('headers', headers)
    try {
        // const response = await axios.get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`, {headers})
        // console.log(response.data)
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
        res.status(200).json({data: response.data, status: response.status})
    } catch (e) {
        res.send({message: 'Something went wrong, please try again'})
    }
}
