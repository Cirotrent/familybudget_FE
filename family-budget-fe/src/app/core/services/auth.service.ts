import Keycloak from 'keycloak-js';

class AuthService {

  private keycloak!: Keycloak;

  init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'family-budget',
      clientId: 'family-budget-frontend'
    });

    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });
  }

  getToken(): string {
    return this.keycloak.token!;
  }

  isLogged(): boolean {
    return !!this.keycloak.token;
  }

  logout() {
    this.keycloak.logout();
  }
  register() {
  this.keycloak.register();
  }
  getUserInfo() {
    return this.keycloak.tokenParsed;
  }
  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }
  getFullName(): string {
    const first = this.keycloak.tokenParsed?.['given_name'] || '';
    const last = this.keycloak.tokenParsed?.['family_name'] || '';
    return `${first} ${last}`.trim();
  }

  getEmail(): string {
    return this.keycloak.tokenParsed?.['email'];
  }
}

export const authService = new AuthService();
