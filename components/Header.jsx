import {Text, Input, Box, InputGroup, InputRightElement} from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Header = ({bringTweet}) => {
    const router = useRouter();
    const title_size = {base: "33px", md: "50px", lg: "55px"}
    const font_size = {base: "16px", md: "18px", lg: "20px"}
    const { tweet } = router.query;

    const [tweetUrl, setTweetUrl] = useState("");

    useEffect(() => {
        router.isReady ? setTweetUrl(tweet) : console.log('router is not ready');
    },[tweet]);

    useEffect(() => {
        if (tweetUrl) {
            bringTweet(tweetUrl)
        }
    }, [tweetUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        bringTweet(tweetUrl)
    }

    return (
        <>
            <Box pt='20' px='4'>
                <Text fontSize={title_size} className='title i'>Capture tweets in a beautiful frame.</Text>
            </Box>
            <Box className='i' my="12" align="center">
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <InputGroup maxW='90vw'>
                        <Input name='tweetURL' value={tweetUrl} onChange={(e) => setTweetUrl(e.target.value)}
                                 placeholder="Enter a tweet URL" fontSize={font_size} color="blue.500"/>
                        <InputRightElement>
                            <button type='submit'>
                                <SearchIcon fontSize={font_size} color="blue.500"/>
                            </button>
                        </InputRightElement>
                    </InputGroup>
                </form>
            </Box>
        </>
    )
}

export default Header
