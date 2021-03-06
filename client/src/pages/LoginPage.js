import api from '../api.js';

export class LoginPage {
  $page = null;
  $emailInput = null;
  $passwordInput = null;
  $button = null;
  
  user = null;
  isLoading = false;

  constructor($app, user) {
    const $page = document.createElement("div");

    $page.classList.add("container", "loginPage");
    $app.appendChild($page);

    this.$page = $page;

    this.setState(user);
  }
  setUserPageEvents() {
    const $button = this.$page.querySelector(".logoutButton");
    $button.addEventListener("click", () => this.handleLogout());
  }
  setLoginPageEvents() {
    this.$emailInput = this.$page.querySelector(".email");
    this.$passwordInput = this.$page.querySelector(".password");
    this.$button = this.$page.querySelector(".loginButton");
    this.$button.addEventListener("click", () => this.handleLogin());
    document.addEventListener("keydown", e => (e.key === 'Enter') && this.handleLogin());
  }

  handleLogin() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.$button.disabled = true;

    const email = this.$emailInput.value;
    const password = this.$passwordInput.value;

    api.fetchLogin(email, password)
      .then((data) => {
        this.isLoading = false;
        this.$button.disabled = false;

        if (data.isError) {
          alert(data.errorData.message);
        } else {
          this.handleGetUserInfo();
        }
      });
  }

  handleGetUserInfo() {
    api.fetchInit()
      .then(data => {
        if (data.isError) {
          console.log('Failed to get user info');
        } else {
          this.setState(data.user);
        }
      });
  }

  handleLogout() {
    api.fetchLogout().then(data => {
      this.setState(null);
    });
  }

  checkSubmitable() {
    
  }

  checkEmail() {

  }

  checkPassword() {

  }
  checkCookie() {

  }

  setState(user) {
    this.user = user;

    this.saveData();

    this.render();
  }

  saveData() {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.removeItem('user');
    }
  }

  render(){
    if (this.user) {
      this.$page.innerHTML = `
      <h1 class="title">${this.user.name}??? ???????????????</h1>
      <div class="label">?????????: ${this.user.email}</div>
      <button class="button logoutButton">????????????</button>
      `
      this.setUserPageEvents();
    } else {
      this.$page.innerHTML = `
        <h1 class="title">?????????</h1>
        <div class="label">?????????</div>
        <input class="input email" placeholder="userName@email.com"/>
        <div class="label">????????????</div>
        <input class="input password" type ="password" placeholder="********"/>
        <button class="button loginButton">?????????</button>
      `
      this.setLoginPageEvents();
    }
  }
}