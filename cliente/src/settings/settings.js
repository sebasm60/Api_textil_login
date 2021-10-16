import env from "react-dotenv";

const urlConfig = ()=>{
    return env.REACT_APP_HOST || '104.196.145.26'
};

export default urlConfig();