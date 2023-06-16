import {HOST} from './host';

const SIGN_UP = `${HOST}/Registration.php`;
const SIGN_IN = `${HOST}/Authorization.php`;
const ACTIVATE = `${HOST}/ActivateAccount.php`;

const GET_USER = `${HOST}/GetUser.php`;
const GET_PORTFOLIO = `${HOST}/GetPortfolio.php`;
const UPDATE_PORTFOLIO = `${HOST}/UpdatePortfolio.php`;

const GET_PROJECTS = `${HOST}/GetProjects.php`;
const GET_USERS = `${HOST}/GetUsers.php`;
const GET_PROJECT = `${HOST}/GetProject.php`;
const ADD_PROJECT = `${HOST}/AddProject.php`;
const ADD_PROJECT_CATEGORY = `${HOST}/AddProjectCategory.php`;
const IMPORT_PROJECT_TO_CATEGORY = `${HOST}/ImportProjectToCategory.php`;
const DELETE_PROJECT_FROM_CATEGORY = `${HOST}/DeleteProjectFromCategory.php`;
const DELETE_PROJECT_CATEGORY = `${HOST}/DeleteProjectCategory.php`;

const UPLOAD_RESUME_FILE = `${HOST}/UploadResumeFile.php`;
const UPLOAD_PROJECT_PREVIEW = `${HOST}/UploadProjectPreview.php`;
const UPLOAD_PROJECT_IMAGE = `${HOST}/UploadProjectImage.php`;
const UPLOAD_AVATAR = `${HOST}/UploadAvatar.php`;
const UPLOAD_BANNER = `${HOST}/UploadPortfolioImage.php`;
const UPDATE_PROFILE = `${HOST}/UpdateProfile.php`;
const UPDATE_PASSWORD = `${HOST}/UpdatePassword.php`;
const UPDATE_PROJECT = `${HOST}/UpdateProject.php`;
const DELETE_PROJECT = `${HOST}/DeleteProject.php`;
const DELETE_PROFILE = `${HOST}/DeleteProfile.php`;
const CHANGE_VISIBILITY = `${HOST}/ChangeVisibility.php`;
const GET_FAVOURITE_PROJECTS = `${HOST}/GetFavouriteProjects.php`;
const ADD_LIKE = `${HOST}/AddLike.php`;
const DELETE_LIKE = `${HOST}/DeleteLike.php`;
const ADD_COMMENT = `${HOST}/AddComment.php`;


const API = {
    SIGN_UP,
    SIGN_IN,
    ACTIVATE,
    GET_USER,
    GET_PROJECTS,
    GET_PROJECT,
    ADD_PROJECT,
    ADD_PROJECT_CATEGORY,
    UPLOAD_RESUME_FILE,
    UPDATE_PROFILE,
    IMPORT_PROJECT_TO_CATEGORY,
    DELETE_PROJECT_FROM_CATEGORY,
    GET_PORTFOLIO,
    UPDATE_PORTFOLIO,
    UPDATE_PASSWORD,
    DELETE_PROJECT_CATEGORY,
    UPLOAD_PROJECT_PREVIEW,
    UPLOAD_AVATAR,
    UPLOAD_BANNER,
    GET_USERS,
    UPDATE_PROJECT,
    UPLOAD_PROJECT_IMAGE,
    DELETE_PROJECT,
    DELETE_PROFILE,
    CHANGE_VISIBILITY,
    GET_FAVOURITE_PROJECTS,
    ADD_LIKE,
    DELETE_LIKE,
    ADD_COMMENT
};

export default API;
