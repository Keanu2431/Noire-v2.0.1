class RegisterLoginView {
  constructor() {
    this._parentElement = document.querySelector('#register-form');
    this.registerEmailErr = document.querySelector(`#register-email-error`);
    this.registerUserErr = document.querySelector(`#register-username-error`);
    this.registerPasswordErr = document.querySelector(
      `#register-password-error`
    );
    this.loginForm = document.querySelector('#login-form');
    this.loginErr = document.querySelector(`#login-error-message`);
    this.modalCloseBtn = document.querySelector(`#modal-close`);
  }
  clearForms() {
    this._parentElement.reset();
    this.loginForm.reset();
  }
}

export default new RegisterLoginView();
