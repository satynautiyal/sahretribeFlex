export const referralScript = !(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = '//portal.referralcandy.com/assets/widgets/refcandy-candyjar.js';
    fjs.parentNode.insertBefore(js, fjs);
  }
})(document, 'script', 'refcandy-candyjar-js');
