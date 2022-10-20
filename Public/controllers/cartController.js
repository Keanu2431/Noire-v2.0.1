// qty button
jQuery(document).ready(($) => {
  $('.quantity').on('click', '.plus', function (e) {
    let $input = $(this).prev('input.qty__cart');
    let val = parseInt($input.val());
    $input.val(val + 1).change();
  });

  $('.quantity').on('click', '.minus', function (e) {
    let $input = $(this).next('input.qty__cart');
    var val = parseInt($input.val());
    if (val > 0) {
      $input.val(val - 1).change();
    }
  });
});
