import {HOST} from './host';

const SIGN_UP = `${HOST}/Registration.php`;
const SIGN_IN = `${HOST}/Authorization.php`;
const ACTIVATE = `${HOST}/ActivateAccount.php`;

const GET_USER = `${HOST}/GetUser.php`;
const GET_PORTFOLIO = `${HOST}/GetPortfolio.php`;
const ADD_PORTFOLIO = `${HOST}/AddPortfolio.php`;
const UPDATE_PORTFOLIO = `${HOST}/UpdatePortfolio.php`;

const GET_PROJECTS = `${HOST}/GetProjects.php`;
const GET_PROJECT = `${HOST}/GetProject.php`;

const UPLOAD_RESUME_FILE = `${HOST}/UploadResumeFile.php`;
const UPDATE_PROFILE = `${HOST}/UpdateProfile.php`;

const API = {
    SIGN_UP,
    SIGN_IN,
    ACTIVATE,
    GET_USER,
    GET_PROJECTS,
    GET_PROJECT,
    UPLOAD_RESUME_FILE,
    UPDATE_PROFILE,
    GET_PORTFOLIO,
    ADD_PORTFOLIO,
    UPDATE_PORTFOLIO
};

export default API;
