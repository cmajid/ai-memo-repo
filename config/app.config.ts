import { get } from 'env-var';

export default ()=> ({
    appSecret: get('secret_key').required().asString(),
})