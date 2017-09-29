import { Captcha } from '../captcha/captcha.model';

export interface User {
	id?: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    captcha?: Captcha;
}