import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public isLogged=false;

	constructor() {}

	login(username: string, password: string) {
		if (username === 'customer' && password === 'secret') {
			this.isLogged = true;
		}
	}

	logout() {
		this.isLogged = false;
	}

	isLoggedIn() {
		return this.isLogged;
	}

}

