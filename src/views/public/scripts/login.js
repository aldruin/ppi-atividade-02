(() => {
  'use strict';

  fetch('http://localhost:3000/verificar-sessao', { method: 'GET', credentials: 'same-origin' })
    .then(response => response.json())
    .then(data => {
      if (data.autenticado) {
        window.location.href = '/index.html';
      }
    })
    .catch(error => console.error('Erro ao verificar sessão:', error));

  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();