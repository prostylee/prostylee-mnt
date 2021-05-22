import {apiService} from '../index';
import {USER_PROFILE_URL} from '../../constants/apiUrls';

export const getProfile = () => {
  return apiService.get(USER_PROFILE_URL);
};

export const getProfileByUserId = (userId) => {
  return apiService.get(USER_PROFILE_URL + '/' + userId);
};

export const updateProfile = (body) => {
  return apiService.post(USER_PROFILE_URL, body);
};
