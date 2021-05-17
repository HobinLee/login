import api from './api.js';
import { LoginPage } from './pages/LoginPage.js';

export class App {
  $app = null;

  constructor($app) {
    this.$app = $app;
    this.LoginPage = new LoginPage($app);
    this.init();
  }

  init() {
    console.log('try to token');
    api.fetchInit().then(data => {
      console.log(data);
      if (data.isError) {
        alert('만료된 토큰입니다. 다시 로그인 해주세요.');
      } else {
        this.LoginPage.setState(data.user);
      }
    })
  }
}