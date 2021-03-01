export interface Config {
    streamerId : string | number 
    streamerName : string
    api : string
    primaryColor : string
    secondaryColor : string
    fontString : string
    font : string
    youtubeMetatag? : string
}

export const configuration : Config = {
    streamerId : 6,
    streamerName : 'SPIKE YT',
    api : 'https://compare.topadsservices.com',
    primaryColor : '#db0d30',
    secondaryColor : '#db0d30',
    fontString : "https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap",
    font : 'Roboto',
}

