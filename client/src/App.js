import { LoginPage } from './pages/LoginPage.js';

export class App {
  $app = null;
  user = null;

  constructor($app) {
    this.init();

    this.$app = $app;
    this.LoginPage = new LoginPage($app, this.user);
  }

  init() {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }
}