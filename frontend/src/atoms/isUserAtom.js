import {atom} from 'recoil';
export const isUserAtom = atom({
    key : 'isUserAtom',
    default : localStorage.getItem('token') ? true : false
})