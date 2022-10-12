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
console.log(window.location.search);
// qty button
jQuery(document).ready(($) => {
  $('.quantity').on('click', '.plus', function (e) {
    let $input = $(this).prev('input.qty');
    let val = parseInt($input.val());
    $input.val(val + 1).change();
  });

  $('.quantity').on('click', '.minus', function (e) {
    let $input = $(this).next('input.qty');
    var val = parseInt($input.val());
    if (val > 0) {
      $input.val(val - 1).change();
    }
  });
});
const form = document.querySelector('#myform');
// [... new FormData(form).entries()]
