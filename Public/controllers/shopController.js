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
// switching image on hover
const imagesArr = document.querySelectorAll('.product-item-image');
const overviewImage = document.querySelector(
  '.item-container-left-inner-right'
);
const leftImages = document.querySelectorAll('.left-grid-item');
const switchImage = async function (e) {
  const target = e.target;
  let originalImg = target.src;
  let newImg = target.dataset.secondImg;
  if (newImg.includes('undefined')) return;
  target.src = newImg;
  target.addEventListener('mouseout', function (e) {
    e.target.src = originalImg;
  });
};
const switchImageOverview = async function (e) {
  let newSource = e.target.src;
  leftImages.forEach((el) => el.classList.remove('selected-left-item'));
  e.target.classList.add('selected-left-item');
  overviewImage.src = newSource;
};
leftImages.forEach((el) =>
  el.addEventListener('mouseover', switchImageOverview)
);
imagesArr.forEach((el) => el.addEventListener('mouseover', switchImage));
