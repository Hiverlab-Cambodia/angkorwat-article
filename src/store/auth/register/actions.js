import { REGISTER_ADMIN  } from './actionTypes';

export const registerAdminAction = (payload) => {
    return {
        type: REGISTER_ADMIN,
        payload
    }
}

