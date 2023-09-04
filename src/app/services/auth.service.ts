import { Injectable, inject } from '@angular/core';
import {
	Auth,
	OAuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	OAuthCredential,
	User,
} from '@angular/fire/auth';

export type OAuthProviderType = 'apple.com' | 'microsoft.com';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	credential: OAuthCredential | null = null;
	user: User | undefined;
	auth = inject(Auth);

	constructor() {}

	signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		this.signPopUp(provider);
	}

	signInWithFacebook() {
		const provider = new FacebookAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		this.signPopUp(provider);
	}

	signInWithOauth(company: OAuthProviderType) {
		const provider = new OAuthProvider(company);
		provider.addScope('email');
		provider.addScope('name');
		this.signPopUp(provider);
	}

    signPopUp(provider: OAuthProvider | FacebookAuthProvider | GoogleAuthProvider) {
		signInWithPopup(this.auth, provider)
        .then((result) => {
            this.user = result.user;
            this.credential = FacebookAuthProvider.credentialFromResult(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
