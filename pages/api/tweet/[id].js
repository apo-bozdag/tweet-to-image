import axios from 'axios'

const headers = {
    'Authorization': `Bearer ${process.env.NEXT_APP_BEARER_TOKEN}`
}

export default async function handler(req, res) {
    const id = req.query.id
    console.log('headers', headers)
    try {
        // const response = await axios.get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`, {headers})
        const fetch = await axios.get(`https://twimage.vercel.app/api/tweet/${id}`, {headers})
        const response = fetch.data
        if (response.data.data?.entities?.urls) {
            const find_url = response.data.data.entities.urls.filter(function (url) {
                return url.expanded_url.includes('twitter.com') && !url.display_url.includes('pic.twitter.com')
            })
            if (find_url.length > 0){
                const quotedUrl = find_url[0].expanded_url
                const quotedTweetId = quotedUrl.split('/')[quotedUrl.split('/').length - 1]
                // const quotedTweet = await axios.get(`https://api.twitter.com/2/tweets/${quotedTweetId}?expansions=author_id&user.fields=profile_image_url,verified&tweet.fields=created_at,public_metrics,entities,source`, {headers})
                const quotedTweet = await axios.get(`https://twimage.vercel.app/api/tweet/${quotedTweetId}`, {headers})
                response.data.data.quoted_tweet = quotedTweet.data.data
            }
        }
        res.status(200).json({data: response.data, status: response.status})
    } catch (e) {
        res.send({message: 'Something went wrong, please try again', error: e.message})
    }
}
