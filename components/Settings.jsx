import {
    Button,
    Switch,
    FormLabel,
    Box,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Spinner,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Select,
} from "@chakra-ui/react"

import {DownloadIcon} from '@chakra-ui/icons'


const Settings = ({props}) => {

    const settingsPad = {base: '0.7rem', md: '6rem'}
    const font_size = {base: "16px", md: "18px", lg: "20px"}
    const font_size_small = {base: "13px", md: "15px", lg: "17px"}


    return (
        <Box px={settingsPad} color="gray.700" className='settings i'>

            <Box mt='12'>
                <FormLabel color='gray.900' fontSize={font_size} htmlFor="show_time" display="flex" alignItems="center">Show
                    elements</FormLabel>
                <Flex justify="space-between" align="center" name='settings' wrap='wrap'>

                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_source" display="flex"
                                   alignItems="center">Source</FormLabel>
                        <Switch size="md" id="show_source" isChecked={props.showSource}
                                onChange={() => props.setShowSource(!props.showSource)}/>
                    </Flex>


                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_time" display="flex"
                                   alignItems="center">Time</FormLabel>
                        <Switch size="md" id="show_time" isChecked={props.showTime}
                                onChange={() => props.setShowTime(!props.showTime)}/>
                    </Flex>


                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_metrics" display="flex"
                                   alignItems="center">Metrics</FormLabel>
                        <Switch size="md" id="show_metrics" isChecked={props.showMetrics}
                                onChange={() => props.setShowMetrics(!props.showMetrics)}/>
                    </Flex>

                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_twitter_icon" display="flex"
                                   alignItems="center">Twitter Icon</FormLabel>
                        <Switch size="md" id="show_twitter_icon" isChecked={props.showTwitterIcon}
                                onChange={() => props.setShowTwitterIcon(!props.showTwitterIcon)}/>
                    </Flex>
                </Flex>
            </Box>


            <Box my='8'>
                <FormLabel color='gray.900' fontSize={font_size} htmlFor="bg" display="flex" alignItems="center">
                    Select Background gradient
                </FormLabel>
                <Flex name='bg' wrap='wrap'>
                    {props.gradients.map(g =>
                        <div key={g} style={{
                            border: props.bg === g ? '2px solid #777' : null,
                            background: g,
                            width: '29px',
                            height: '29px',
                            marginRight: '1rem',
                            marginBottom: '0.5rem',
                            borderRadius: '100px'
                        }} onClick={() => props.setBg(g)}></div>)}
                </Flex>
            </Box>

            <Box my='8'>
                <FormLabel color='gray.900' fontSize={font_size} htmlFor="name" display='flex'
                           justifyContent='space-between'>
                    <div>Size</div>
                    <div>{props.scale}</div>
                </FormLabel>
                <Slider name='scale' min={0.5} max={1} step={0.1} aria-label="scale the tweet" colorScheme="blue"
                        value={props.scale} onChange={(val) => props.setScale(val)}>
                    <SliderTrack>
                        <SliderFilledTrack/>
                    </SliderTrack>
                    <SliderThumb/>
                </Slider>
            </Box>
            <Flex gap='2'>
                <Select width='90px' onChange={(e) => props.setRatio(e.target.value)} value={props.ratio}>
                    <option value=''>-</option>
                    <option value='1'>1:1</option>
                    <option value='2'>16:9</option>
                </Select>

                <Menu my='10'>
                    <MenuButton borderRadius='3px' p='9px' as={Button} rightIcon={< DownloadIcon/>} colorScheme="blue">
                        Download
                    </MenuButton>
                    <MenuList fontSize='15px'>
                        <MenuItem onClick={() => props.convert('png')}>PNG</MenuItem>
                        <MenuItem onClick={() => props.convert('jpeg')}>JPEG</MenuItem>
                        <MenuItem onClick={() => props.convert('svg')}>SVG</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    )
}

export default Settings
