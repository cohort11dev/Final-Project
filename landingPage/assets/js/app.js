const SUBMIT_EMAIL = document.getElementById('submit-email');

function sendEmail() {
  let compEmail = "cohort11dev@gmail.com";
  let custName = document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value;
  let custEmail = document.getElementById('email').value;
  let custComments = document.getElementById('comments').value;

  hrefText=`mailto:${compEmail}?subject=Contact email from ${custName} (${custEmail})&cc=${custEmail}&body=${custName}%0D%0A${custEmail}%0D%0A%0D%0A${custComments}`;

  SUBMIT_EMAIL.href = hrefText;
}

SUBMIT_EMAIL.addEventListener("click", sendEmail);