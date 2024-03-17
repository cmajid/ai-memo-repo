import { get } from 'env-var';

export default ()=> ({
    appSecret: get('secret_key').required().asString(),

    googleClientId:  get('google_client_id').required().asString(),
    googleClientSecret:  get('google_client_secret').required().asString(),
    googleClientAppId : get('google_client_app_id').required().asString(),
})