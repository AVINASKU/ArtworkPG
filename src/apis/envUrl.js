const DEV = process.env.REACT_APP_API_URL_DEV;
const SIT = process.env.REACT_APP_API_URL_SIT;
const PROD = process.env.REACT_APP_API_URL_PROD;
const url = "https://pegadev.pg.com";
const getUrl = "https://awflowdev.pg.com"
export const DEVURL = `${url}/prweb/api/ArtworkAgilityFile`;
export const SITURL = `${SIT}/prweb/api/ArtworkAgilityFile`;
export const PRODURL = `${PROD}/prweb/api/ArtworkAgilityFile`;
export const GETURL = `${getUrl}/optaplanner/optimize`;
