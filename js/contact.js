(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = document.getElementById('c-name').value.trim();
    var email   = document.getElementById('c-email').value.trim();
    var company = document.getElementById('c-company').value.trim();
    var topic   = document.getElementById('c-topic').value;
    var message = document.getElementById('c-message').value.trim();
    var subject = 'Contact: ' + topic;
    var body    = 'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + company + '\nTopic: ' + topic + '\nMessage: ' + message;
    window.location.href = 'mailto:info@techafrikquantumgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
