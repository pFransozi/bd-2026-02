const enhanceReorganizationSection = () => {
  const section = document.getElementById('reorganizar-title')?.closest('section');
  const relationMap = section?.querySelector('.relation-map');

  if (!section || !relationMap || section.querySelector('.reorganization-source-table')) return;

  const intro = document.getElementById('reorganizar-title')?.nextElementSibling;
  if (intro) {
    intro.textContent = 'Antes de observar a reorganização, retomemos a tabela inicial. Uma linha reúne informações sobre quatro partes diferentes do domínio. Observe os grupos e compare-os com as relações que vêm em seguida.';
  }

  const sourceTable = document.createElement('div');
  sourceTable.className = 'visual-panel reorganization-source-table';
  sourceTable.innerHTML = `
    <div class="relation-name"><strong>PEDIDOS</strong><span>estrutura original</span></div>
    <table class="relation-table">
      <thead><tr><th>pedido</th><th>data</th><th>cliente</th><th>telefone</th><th>produto</th><th>preço</th><th>quantidade</th></tr></thead>
      <tbody>
        <tr><td>101</td><td>10/08</td><td>Ana</td><td>9991-1111</td><td>Teclado</td><td>120,00</td><td>1</td></tr>
        <tr><td>102</td><td>10/08</td><td>Bruno</td><td>9882-2222</td><td>Mouse</td><td>80,00</td><td>2</td></tr>
        <tr><td>103</td><td>11/08</td><td>Ana</td><td>9991-1111</td><td>Mouse</td><td>80,00</td><td>1</td></tr>
        <tr><td>104</td><td>11/08</td><td>Ana</td><td>9991-1111</td><td>Monitor</td><td>900,00</td><td>1</td></tr>
      </tbody>
    </table>
    <div class="visual-legend">
      <span><b>Pedido</b> número e data</span>
      <span><b>Cliente</b> nome e telefone</span>
      <span><b>Produto</b> nome e preço</span>
      <span><b>Item do pedido</b> quantidade do produto naquele pedido</span>
    </div>
  `;

  relationMap.before(sourceTable);

  const caption = section.querySelector('.relation-map-caption');
  if (caption) {
    caption.textContent = 'Os grupos identificados acima passam a ter estruturas próprias, conectadas por chaves.';
  }
};

const enhanceAula04Draft = () => {
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
};

const fixAula07PracticeCards = () => {
  if (!window.location.pathname.endsWith('/rascunho/aula-07.html')) return;
  if (document.getElementById('aula07-practice-card-fix')) return;

  const style = document.createElement('style');
  style.id = 'aula07-practice-card-fix';
  style.textContent = `
    body.teaching-page.lesson-dml article.practice-card {
      padding-left: 5.4rem !important;
    }

    body.teaching-page.lesson-dml article.practice-card > h3 {
      min-height: 2.4rem;
      display: flex;
      align-items: center;
      margin-top: 0;
    }

    body.teaching-page.lesson-dml article.practice-card > .n {
      left: 1.25rem;
      top: 1.25rem;
    }

    @media (max-width: 680px) {
      body.teaching-page.lesson-dml article.practice-card {
        padding-left: 1.25rem !important;
        padding-top: 4.8rem !important;
      }

      body.teaching-page.lesson-dml article.practice-card > h3 {
        min-height: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

enhanceAula04Draft();
fixAula07PracticeCards();

const coreScript = document.createElement('script');
coreScript.src = new URL('script-core.js', document.currentScript?.src || window.location.href).href;
coreScript.onload = () => {
  enhanceReorganizationSection();
  enhanceAula04Draft();
  fixAula07PracticeCards();
};
coreScript.onerror = () => console.error('Não foi possível carregar o script principal da página.');
document.head.appendChild(coreScript);