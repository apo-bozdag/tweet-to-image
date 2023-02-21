import Head from "next/head";
import {useState, useRef} from "react";

import axios from "axios";
import DiskImage from "dom-to-image";
import {saveAs} from "file-saver";
import Header from "../components/Header";
import Main from "../components/Main";
import Settings from "../components/Settings";

import {Text, Box, Flex} from "@chakra-ui/react";

function App() {
    const gradients = [
        'linear-gradient(to right, #eecda3, #ef629f)',
        'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)',
        'linear-gradient(to right, rgb(168, 255, 120), rgb(120, 255, 214))',
        'linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53))', ,
        'linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229))',
        'linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))',
        'linear-gradient(109.6deg, rgb(245, 95, 152) 11.2%, rgb(254, 148, 136) 100.2%)',
        'linear-gradient(to right, rgb(74, 194, 154), rgb(189, 255, 243))',
        'linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))',
        'linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
        'linear-gradient(90deg, hsla(145, 84%, 73%, 1) 0%, hsla(150, 61%, 48%, 1) 100%)',
        'linear-gradient(to right, rgb(255, 75, 31), rgb(255, 144, 104))',
        'linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157))',
        'linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))',
        'linear-gradient(0.2deg, rgb(51, 204, 255) 4.8%, rgb(51, 102, 255) 85.5%)',
        'linear-gradient(106.8deg, rgb(117, 255, 220) 6%, rgb(163, 216, 255) 47.6%, rgb(248, 215, 251) 87.8%)',
        'linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)',
        'linear-gradient(2.1deg, rgb(116, 253, 210) 5%, rgb(0, 191, 247) 95.8%)',
        'linear-gradient(110.7deg, rgb(9, 154, 151) 6.3%, rgb(21, 205, 168) 90.6%)',
        'linear-gradient(to right bottom, rgb(52, 148, 230), rgb(236, 110, 173))',
        'linear-gradient(to right bottom, rgb(233, 100, 67), rgb(144, 78, 149))',
        'linear-gradient(to right bottom, rgb(131, 58, 180), rgb(253, 29, 29), rgb(252, 176, 69))',
        'linear-gradient(to right bottom, rgb(242, 112, 156), rgb(255, 148, 114))',
        'linear-gradient(to right bottom, rgb(22, 34, 42), rgb(58, 96, 115))',
        'linear-gradient(to right bottom, rgb(119, 161, 211), rgb(121, 203, 202), rgb(230, 132, 174))',
        'linear-gradient(to right bottom, rgb(95, 44, 130), rgb(73, 160, 157))',
        'linear-gradient(to right bottom, rgb(33, 147, 176), rgb(109, 213, 237))',
        'linear-gradient(to right bottom, rgb(211, 204, 227), rgb(233, 228, 240))',
        'linear-gradient(to right bottom, rgb(17, 153, 142), rgb(56, 239, 125))',
    ]
    // random gradient select
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    const [bg, setBg] = useState(
        randomGradient
    );

    const tweetRef = useRef(null);

    const [tweetData, setTweetData] = useState(null);

    const [showTime, setShowTime] = useState(true);
    const [showMetrics, setShowMetrics] = useState(true);
    const [showSource, setShowSource] = useState(true);
    const [showTwitterIcon, setShowTwitterIcon] = useState(true)

    const [scale, setScale] = useState(0.9);

    const [hint, setHint] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [ratio, setRatio] = useState('')

    const bringTweet = async (url) => {
        try {
            setHint(false);
            setLoading(true);
            const id = url.split("/")[5];
            const {data, status} = await axios.get(`/api/tweet/${id}`);
            if (data.message) {
                setError(true);
                setLoading(false);
                setTweetData(null);
            } else {
                setLoading(false);
                setTweetData(data.data);
                setError(false);
                // change url params tweet=url
                window.history.pushState({}, '', `?tweet=${url}`);
            }
        } catch (e) {
            setError(true);
            setLoading(false);
            setTweetData(null);
        }
    };

    const getImgData = async (format) => {
        const node = tweetRef.current;
        const scale = 2;
        const style = {
            transform: "scale(2)",
            transformOrigin: "center left",
        };

        const param = {
            height: node.offsetHeight * scale,
            width: node.offsetWidth * scale,
            quality: 1,
            style
        };

        if (format === 'svg') {
            return await DiskImage.toSvg(node, param);
        }

        if (format === 'jpeg') {
            return await DiskImage.toJpeg(node, param);
        }

        if (format === 'png') {
            return await DiskImage.toPng(node, param);
        }

        return await DiskImage.toPng(node, param);
    }

    const openNewTabImg = async (format) => {
        const imgData = await getImgData(format);
        const newTab = window.open();
        newTab?.document.write(
            `<!DOCTYPE html><head><title>Tweet preview</title></head><body><img src="${imgData}" ></body></html>`);
        newTab?.document.close();
    }

    const convert = async (format) => {
        const imgData = await getImgData(format);
        const newTab = window.open();
        newTab?.document.write(
            `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${imgData}" ></body></html>`);
        newTab?.document.close();

        switch (format) {
            case "png": {
                saveAs(imgData, `${new Date().toJSON()}.${format}`);
                return;
            }

            case "jpeg": {
                saveAs(imgData, `${new Date().toJSON()}.${format}`);
                return;
            }

            case "svg": {
                saveAs(imgData, `${new Date().toJSON()}.${format}`);
                return;
            }
        }
    };

    const propsForSettings = {
        showTime,
        setShowTime,
        showMetrics,
        setShowMetrics,
        showSource,
        setShowSource,
        showTwitterIcon,
        setShowTwitterIcon,
        scale,
        setScale,
        convert,
        openNewTabImg,
        bg,
        gradients,
        setBg,
        ratio,
        setRatio,
    };

    const flex = {base: "column", lg: "row"};

    return (
        <Box>
            <Head>
                <title>Tweet to image | @gundem_yazilim</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            </Head>

            <Header bringTweet={bringTweet}/>

            <Flex my="16" direction={flex} p="4" flexWrap='wrap'>
                <Main
                    tweetRef={tweetRef}
                    bg={bg}
                    scale={scale}
                    hint={hint}
                    loading={loading}
                    error={error}
                    tweetData={tweetData}
                    showTime={showTime}
                    showMetrics={showMetrics}
                    showSource={showSource}
                    showTwitterIcon={showTwitterIcon}
                    ratio={ratio}
                />
                {!hint && <Settings props={propsForSettings}/>}
            </Flex>

            <footer>
                <Text px="1rem" className="i" color="gray.500" fontSize="lg">
                    <a
                        href="https://github.com/apo-bozdag/tweet-to-image.git"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Github
                    </a>
                </Text>
            </footer>
        </Box>
    );
}

export default App;
