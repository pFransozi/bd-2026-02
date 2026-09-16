(() => {
  if (!window.location.pathname.endsWith('/rascunho/aula-04-aprofundamento.html')) return;

  const card = document.querySelector('.study-hero .study-card');
  const cardTitle = card?.querySelector('strong');
  const cardText = card?.querySelector('p');

  if (cardTitle) {
    cardTitle.textContent = 'Como aproveitar este material';
  }

  if (cardText) {
    cardText.innerHTML = 'Este aprofundamento retoma a Aula 04 para explorar com mais cuidado as decisões por trás da modelagem conceitual. O objetivo é compreender não apenas <strong>o que representar no DER</strong>, mas também <strong>como justificar e validar cada escolha</strong>.';
  }

  const heading = document.querySelector('#requisitos .study-heading h2');
  if (heading) {
    heading.textContent = 'O DER resulta da análise dos requisitos, das regras do domínio e das relações que precisam ser representadas';
  }
})();
