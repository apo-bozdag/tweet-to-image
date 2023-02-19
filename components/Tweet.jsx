import {format} from 'date-fns'
import {Box, Text, Image} from "@chakra-ui/react"
import parse from 'html-react-parser'


const Tweet = ({tweet, showTime, showMetrics, showSource, showImage, showTwitterIcon, quoteTweet}) => {


    const urls = tweet.data?.entities?.urls
    const mentions = tweet.data?.entities?.mentions

    const linkregex = /(https?:\/\/[^\s]+)/g;

    const dp = tweet.includes.users[0].profile_image_url
    const name = tweet.includes.users[0].name
    const username = tweet.includes.users[0].username
    const isVerified = tweet.includes.users[0].verified
    const image = tweet.includes?.media ? tweet.includes.media[0].url : null
    const video = tweet.includes?.media ? tweet.includes.media[0].preview_image_url : null
    const source = '@gundem_yazilim'
    const likes = tweet.data.public_metrics.like_count
    const impression_count = tweet.data.public_metrics.impression_count
    const retweets = tweet.data.public_metrics.retweet_count
    const createdAt = tweet.data.created_at
    const quotedTweet = tweet.data.quoted_tweet

    let text = tweet.data.text
    const link_occurs = text.match(linkregex)

    link_occurs?.forEach((link, i) => {
        if (!tweet.includes.media) {
            const corres_url = urls[i]
            text = text.replace(` ${link}`, ` <a href="${corres_url.expanded_url}" rel="noreferrer" target="_blank">${corres_url.expanded_url}</a>`)
        } else {
            if (i === link_occurs.length - 1) {
                text = text.replace(` ${link}`, '')
            } else {
                const corres_url = urls[i]
                text = text.replace(` ${link}`, ` <a href="${corres_url.expanded_url}" rel="noreferrer" target="_blank">${corres_url.expanded_url}</a>`)
            }
        }
    })

    mentions?.forEach((mention, i) => {
        const corres_mention = mentions[i]
        text = text.replace(`@${corres_mention.username}`, `<a href="https://twitter.com/${corres_mention.username}" rel="noreferrer" target="_blank">@${corres_mention.username}</a>`)
    })

    text = text.replace('&amp;', '&')


    const date = new Date(createdAt)

    const modLikes = likes >= 1000 ? `${(likes / 1000).toPrecision(2)}k` : likes
    const modImpressions = impression_count >= 1000 ? `${(impression_count / 1000).toPrecision(2)}k` : impression_count
    const modRetweets = retweets >= 1000 ? `${(retweets / 1000).toPrecision(2)}k` : retweets

    let font_size = {base: "15px", md: "17px", lg: "19px"}
    let font_size_small = {base: "13.5px", md: "15.5px", lg: "17.5px"}
    let img_size = {base: "55px", md: "58px", lg: "60px"}
    let pad = {base: "1rem", md: "1.5rem", lg: "2rem"}
    if (quoteTweet) {
        pad = {}
        img_size = {base: "25px", md: "28px", lg: "30px"}
        font_size = {base: "11px", md: "13px", lg: "15px"}
    }

    return (<Box p={pad} rounded="sm">
        <div className={'tweet' + (quoteTweet ? ' quote-tweet' : '')}>
            <div className="user">
                <Image src={dp} boxSize={img_size} borderRadius="full"/>
                <div className="names">
                    <Text fontSize={font_size} className='name'>
                        <span className="bold n">{name}</span>
                        {isVerified &&
                            <svg style={{color: '#1DA1F2'}} viewBox="0 0 24 24" aria-label="Verified account"
                                 fill="currentColor" focusable="false" width='16'>
                                <g>
                                    <path
                                        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                </g>
                            </svg>}
                        {
                            quoteTweet && (
                                <span>
                                        @{username}
                                    </span>
                            )
                        }
                    </Text>
                    {
                        !quoteTweet && (
                            <Text fontSize={font_size} className='sec'>
                                @{username}
                            </Text>
                        )
                    }

                </div>
                {showTwitterIcon ? <Box>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 0 30 30" width="3rem" height="3rem">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
                            fill="#1DA1F2"/>
                    </svg>
                </Box> : null}
            </div>
            <Text fontSize={font_size} mt={3}>
                {parse(text)}
                {quotedTweet && <Tweet
                    tweet={quotedTweet}
                    showTime={false}
                    showMetrics={false}
                    showImage={false}
                    showSource={false}
                    showTwitterIcon={false}
                    quoteTweet={true}
                />}
            </Text>
            {(showImage && image) && (
                <div style={{backgroundImage: `url('${image}')`, height: '350px', width: '100%'}}
                     className='tweet-img'/>
            )}
            {(showImage && video) && (
                <div style={{backgroundImage: `url('${video}')`, height: '350px', width: '100%'}}
                        className='tweet-img'>
                    <Box className='video-icon'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play"
                             className="video-svg" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"></path>
                        </svg>
                    </Box>
                </div>
            )}
            <div className='time_source sec'>
                <Text fontSize={font_size_small}>
                    <span>{showTime && date && format(date, 'h:mm a · LLL d, yyyy · ')}</span>
                    {showSource && <span>{source}</span>}
                </Text>
            </div>
            {showMetrics && <div className='metrics'>
                <Text fontSize={font_size_small}>
                    <span className='bold'>{modImpressions}</span> <span className='sec views'> views</span>
                    <span className='bold'>{modLikes}</span> <span className='sec likes'> likes</span>
                    <span className='bold'>{modRetweets}</span> <span className='sec'> retweets</span>
                </Text>
            </div>}
        </div>
    </Box>)
}

export default Tweet
