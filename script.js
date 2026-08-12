const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo noturno');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-text').textContent = isDark ? 'Modo claro' : 'Modo noturno';
  }
};

const savedTheme = localStorage.getItem('banco-dados-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  localStorage.setItem('banco-dados-theme', nextTheme);
  applyTheme(nextTheme);
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-dialog-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });
});

document.querySelectorAll('.image-dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

if (document.body.classList.contains('study-page') && document.getElementById('esquema')) {
  const studyTableLayout = document.createElement('style');
  studyTableLayout.textContent = `
    @media (min-width: 981px) {
      #esquema .study-grid {
        grid-template-columns: minmax(0, 1.55fr) minmax(240px, .45fr);
      }
      #esquema .study-table {
        min-width: 0;
        table-layout: fixed;
      }
      #esquema .study-table th:nth-child(1),
      #esquema .study-table td:nth-child(1) { width: 20%; }
      #esquema .study-table th:nth-child(2),
      #esquema .study-table td:nth-child(2) { width: 28%; }
      #esquema .study-table th:nth-child(3),
      #esquema .study-table td:nth-child(3) { width: 32%; }
      #esquema .study-table th:nth-child(4),
      #esquema .study-table td:nth-child(4) { width: 20%; }
    }
  `;
  document.head.appendChild(studyTableLayout);
}

if (document.body.classList.contains('study-page') && document.getElementById('independencia')) {
  const independenceTableLayout = document.createElement('style');
  independenceTableLayout.textContent = `
    @media (min-width: 981px) {
      #independencia .study-grid {
        grid-template-columns: minmax(0, 1.55fr) minmax(240px, .45fr);
      }
      #independencia .study-table {
        min-width: 0;
        table-layout: fixed;
      }
      #independencia .study-table th,
      #independencia .study-table td {
        overflow-wrap: anywhere;
      }
      #independencia .study-table th:nth-child(1),
      #independencia .study-table td:nth-child(1) { width: 12%; }
      #independencia .study-table th:nth-child(2),
      #independencia .study-table td:nth-child(2) { width: 18%; }
      #independencia .study-table th:nth-child(3),
      #independencia .study-table td:nth-child(3) { width: 27%; }
      #independencia .study-table th:nth-child(4),
      #independencia .study-table td:nth-child(4) { width: 43%; }
    }
  `;
  document.head.appendChild(independenceTableLayout);
}

if (document.body.classList.contains('relational-page')) {
  const relationalLayoutFixes = document.createElement('style');
  relationalLayoutFixes.textContent = `
    #chaves .identity-box {
      min-width: 0;
      overflow: hidden;
    }

    #chaves .identity-box .relation-table {
      width: 100%;
      min-width: 0;
      table-layout: fixed;
    }

    #chaves .identity-box .relation-table th,
    #chaves .identity-box .relation-table td {
      overflow-wrap: anywhere;
    }
  `;
  document.head.appendChild(relationalLayoutFixes);

  const problemSection = document.getElementById('problema-title')?.closest('section');
  const diagnostic = problemSection?.querySelector('.inquiry.light-inquiry');

  if (diagnostic) {
    const kicker = diagnostic.querySelector('.inquiry-kicker');
    const tag = diagnostic.querySelector('.inquiry-tag');
    const body = diagnostic.querySelector('.inquiry-body');

    if (kicker) kicker.textContent = 'Diagnóstico inicial — análise de problemas na estrutura';
    if (tag) tag.textContent = '10 minutos';
    if (body) {
      body.innerHTML = `
        <p><strong>Em duplas, analisem a tabela apresentada e discutam as questões a seguir. Registrem brevemente as conclusões do grupo.</strong></p>
        <ol>
          <li><strong>Identifiquem informações que aparecem repetidas em diferentes registros.</strong> Que consequências essa repetição pode trazer para a manutenção dos dados?</li>
          <li><strong>Considere que Ana alterou seu número de telefone.</strong> Quantos registros precisariam ser modificados para que a informação permanecesse consistente?</li>
          <li><strong>Avaliem a possibilidade de cadastrar um novo produto antes que ocorra sua primeira venda.</strong> A estrutura atual permite esse registro? Justifiquem.</li>
          <li><strong>Considere a exclusão do único pedido associado a Bruno.</strong> Quais outras informações seriam perdidas como consequência dessa exclusão?</li>
        </ol>
        <p><strong>Neste momento, não proponham uma nova estrutura para os dados.</strong> O objetivo é identificar e descrever os problemas observados antes de introduzirmos os conceitos formais que permitem analisá-los.</p>
      `;
    }
  }

  const modelSection = document.getElementById('modelo');
  if (modelSection) {
    const modelTitle = document.getElementById('modelo-title');
    const modelIntro = modelTitle?.nextElementSibling;

    if (modelTitle) modelTitle.textContent = 'Elementos fundamentais do modelo relacional';
    if (modelIntro) {
      modelIntro.innerHTML = 'No modelo relacional, os dados são organizados em <strong>relações</strong>, descritas por <strong>atributos</strong> associados a determinados <strong>domínios</strong>. Em um dado estado do banco de dados, cada relação é constituída por um conjunto de <strong>tuplas</strong>.';
    }

    modelSection.querySelector('.visual-legend')?.remove();
    modelSection.querySelector('.metrics-row')?.remove();

    const conceptDescriptions = {
      Relação: 'Representa um tipo de fato ou objeto do domínio por meio de atributos e tuplas.<span class="concept-example"><b>Exemplo:</b> CLIENTE é a relação.</span>',
      Atributo: 'Corresponde a uma propriedade que queremos registrar.<span class="concept-example"><b>Exemplo:</b> id_cliente, nome e cidade são atributos da relação CLIENTE.</span>',
      Tupla: 'É uma combinação de valores que representa um registro da relação.<span class="concept-example"><b>Exemplo:</b> (2, Bruno, Colombo) é uma tupla.</span>',
      Domínio: 'Define o conjunto de valores considerados válidos para um atributo.<span class="concept-example"><b>Exemplo:</b> Curitiba e Colombo são valores presentes no atributo cidade e devem respeitar o domínio definido para ele.</span>',
      Grau: 'Indica quantos atributos formam a relação.<span class="concept-example"><b>Exemplo:</b> CLIENTE tem grau 3 porque possui id_cliente, nome e cidade.</span>',
      Cardinalidade: 'Indica quantas tuplas existem na instância observada.<span class="concept-example"><b>Exemplo:</b> a instância apresentada tem cardinalidade 3 porque exibe três tuplas.</span>'
    };

    modelSection.querySelectorAll('.concept-tile').forEach((card) => {
      const concept = card.querySelector('.concept-kicker')?.textContent.trim();
      const paragraph = card.querySelector('p');
      if (concept && paragraph && conceptDescriptions[concept]) {
        paragraph.innerHTML = conceptDescriptions[concept];
      }
    });

    const conceptExampleStyle = document.createElement('style');
    conceptExampleStyle.textContent = `
      #modelo .concept-example {
        display: block;
        margin-top: .85rem;
        padding: .72rem .85rem;
        border-left: 3px solid #62d9ef;
        border-radius: 0 10px 10px 0;
        background: rgba(98, 217, 239, .08);
        color: #62d9ef;
        font-weight: 700;
        line-height: 1.5;
      }

      #modelo .concept-example b {
        color: #8df0ff;
      }
    `;
    document.head.appendChild(conceptExampleStyle);

    const exerciseOne = Array.from(modelSection.querySelectorAll('.inquiry.light-inquiry')).find((inquiry) =>
      inquiry.querySelector('.inquiry-kicker')?.textContent.includes('Exercício 1')
    );

    if (exerciseOne) {
      const kicker = exerciseOne.querySelector('.inquiry-kicker');
      const tag = exerciseOne.querySelector('.inquiry-tag');
      const body = exerciseOne.querySelector('.inquiry-body');

      if (kicker) kicker.textContent = 'Exercício 1 — caracterização de uma relação';
      if (tag) tag.textContent = '10 minutos';
      if (body) {
        body.innerHTML = `
          <p><strong>Considere a relação PEDIDO apresentada acima. Em duplas, analisem sua estrutura e sua instância utilizando o vocabulário do modelo relacional. Registrem brevemente as respostas.</strong></p>
          <ol>
            <li><strong>Identifiquem a relação e seus atributos.</strong></li>
            <li><strong>Selecionem uma das tuplas apresentadas e representem-na integralmente.</strong> Expliquem qual ocorrência essa tupla representa.</li>
            <li><strong>Determinem o grau da relação.</strong> Justifiquem a resposta a partir de sua estrutura.</li>
            <li><strong>Determinem a cardinalidade da instância apresentada.</strong> Justifiquem a resposta a partir dos dados observados.</li>
            <li><strong>Analisem o atributo <code>total</code>.</strong> Indiquem exemplos de valores que poderiam pertencer ao seu domínio e proponham pelo menos um valor que deveria ser considerado inválido. Expliquem o critério utilizado.</li>
            <li><strong>Distingam estrutura e estado atual.</strong> Quais elementos observados pertencem à definição da relação e quais dependem da instância apresentada?</li>
          </ol>
        `;
      }
    }
  }

  const keysSection = document.getElementById('chaves');
  const keysPrompt = keysSection?.querySelector('.question-strip');

  if (keysPrompt) {
    keysPrompt.innerHTML = '<strong>Pergunta para a turma:</strong> imagine que <code>nome</code> fosse a chave de CLIENTE. O que aconteceria se duas pessoas se chamassem Ana? E se uma delas alterasse o nome cadastrado? A partir desses casos, que características um atributo precisa ter para funcionar bem como chave?';
  }

  const exerciseTwo = Array.from(keysSection?.querySelectorAll('.inquiry.light-inquiry') ?? []).find((inquiry) =>
    inquiry.querySelector('.inquiry-kicker')?.textContent.includes('Exercício 2')
  );

  if (exerciseTwo) {
    const kicker = exerciseTwo.querySelector('.inquiry-kicker');
    const tag = exerciseTwo.querySelector('.inquiry-tag');
    const body = exerciseTwo.querySelector('.inquiry-body');
    const relationGrid = body?.querySelector('.mini-relation-grid');
    const questionList = body?.querySelector('ol');

    if (kicker) kicker.textContent = 'Exercício 2 — análise de identificadores e chaves';
    if (tag) tag.textContent = '15 minutos';

    if (body && relationGrid) {
      relationGrid.innerHTML = `
        <div class="mini-relation">
          <strong>LIVRO</strong>
          <code>id_livro\nisbn\ntitulo\nano_publicacao</code>
          <div class="sample-records">
            <span>Registros de exemplo</span>
            <code>1 · 978-65-00000-01-5 · Banco de Dados · 2024</code>
            <code>2 · 978-65-00000-02-2 · Engenharia de Software · 2023</code>
          </div>
        </div>
        <div class="mini-relation">
          <strong>EXEMPLAR</strong>
          <code>id_exemplar\nlivro_id\nnumero_tombo\nsituacao</code>
          <div class="sample-records">
            <span>Registros de exemplo</span>
            <code>101 · 1 · T-0001 · disponível</code>
            <code>102 · 1 · T-0002 · emprestado</code>
          </div>
        </div>
        <div class="mini-relation">
          <strong>USUARIO</strong>
          <code>id_usuario\nmatricula\nemail\nnome</code>
          <div class="sample-records">
            <span>Registros de exemplo</span>
            <code>10 · 2026001 · ana@uni.edu · Ana</code>
            <code>11 · 2026002 · bruno@uni.edu · Bruno</code>
          </div>
        </div>
        <div class="mini-relation">
          <strong>EMPRESTIMO</strong>
          <code>usuario_id\nexemplar_id\ndata_hora_retirada\ndata_prevista</code>
          <div class="sample-records">
            <span>Registros de exemplo</span>
            <code>10 · 102 · 12/08/2026 14:00 · 19/08/2026</code>
            <code>10 · 102 · 01/09/2026 10:00 · 08/09/2026</code>
          </div>
        </div>
      `;

      const introduction = body.querySelector(':scope > p');
      if (introduction) {
        introduction.innerHTML = '<strong>Considere as quatro relações de um sistema de biblioteca apresentadas abaixo. Analise seus atributos e os registros de exemplo e proponha formas adequadas de identificar e relacionar as ocorrências representadas. Justifique as decisões com base nos conceitos estudados.</strong>';
      }

      const sampleStyle = document.createElement('style');
      sampleStyle.textContent = `
        #chaves .sample-records {
          display: grid;
          gap: .45rem;
          margin-top: 1rem;
          padding-top: .9rem;
          border-top: 1px solid rgba(127, 127, 127, .18);
        }

        #chaves .sample-records > span {
          color: #8db0ff;
          font-size: .72rem;
          font-weight: 900;
          letter-spacing: .07em;
          text-transform: uppercase;
        }

        #chaves .sample-records code {
          padding: .55rem .65rem;
          border-radius: 9px;
          background: rgba(95, 130, 255, .08);
          font-size: .77rem;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }
      `;
      document.head.appendChild(sampleStyle);
    }

    if (questionList) {
      questionList.innerHTML = `
        <li><strong>Proponham uma chave primária para LIVRO, EXEMPLAR e USUARIO.</strong> Justifiquem por que cada atributo escolhido é adequado para identificar unicamente uma ocorrência.</li>
        <li><strong>Identifiquem possíveis chaves candidatas.</strong> Em quais relações existe mais de um atributo que poderia, considerando as regras do domínio, identificar unicamente uma ocorrência?</li>
        <li><strong>Analisem a relação EMPRESTIMO.</strong> Considerando que um mesmo usuário pode retirar o mesmo exemplar em momentos diferentes, proponham uma combinação de atributos capaz de distinguir cada empréstimo.</li>
        <li><strong>Identifiquem os atributos que estabelecem referências entre relações.</strong> Para cada um deles, indiquem qual relação e qual atributo devem ser referenciados.</li>
        <li><strong>Classifiquem as chaves identificadas</strong> como primárias, candidatas, compostas ou estrangeiras.</li>
      `;
    }
  }
}
