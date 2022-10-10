// const minSlider = document.getElementById('min');
// const maxSlider = document.getElementById('max');

// const outputMin = document.getElementById('min-value');
// const outputMax = document.getElementById('max-value');

// outputMin.innerHTML = minSlider.value;
// outputMax.innerHTML = maxSlider.value;

// minSlider.oninput = function () {
//   outputMin.innerHTML = this.value;
// };

// maxSlider.oninput = function () {
//   outputMax.innerHTML = this.value;
// };
const toastElList = document.querySelectorAll('.toast');
console.log(toastElList);
const toastList = [...toastElList].map(
  (toastEl) => new bootstrap.Toast(toastEl, { autohide: false })
);
