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

    body.teaching-page.lesson-dml article.practice-card > .prediction {
      display: none !important;
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

const enhanceAula07DmlComments = () => {
  if (!document.body.classList.contains('lesson-dml')) return;

  const insertSection = document.getElementById('insert');
  const insertHeading = insertSection?.querySelector('.dml-heading');
  if (insertHeading && !insertSection.querySelector('.dml-comment-guide')) {
    const guide = document.createElement('div');
    guide.className = 'callout dml-comment-guide';
    guide.innerHTML = '<strong>Como ler os comentários dos exemplos</strong><p>Dentro do SQL, linhas iniciadas por <code>--</code> explicam o papel de cada parte do comando. Fora da string SQL, linhas iniciadas por <code>#</code> explicam o que o Python está fazendo para executar ou conferir a operação.</p>';
    insertHeading.insertAdjacentElement('afterend', guide);
  }

  const contextualNotes = {
    'PK duplicada': 'Este teste deve falhar: o id 17 já existe e é a PRIMARY KEY de usuario.',
    'FK para bloco inexistente': 'Este teste deve falhar: não existe bloco com id 99 para a FOREIGN KEY apontar.',
    'CHECK de capacidade': 'Este teste deve falhar: a regra CHECK exige capacidade maior que zero.',
    'Situação inválida': "Este teste deve falhar: 'aguardando' não está entre os valores permitidos pelo CHECK.",
    'Reserva repetida no mesmo horário': 'Este teste deve falhar: sala, data e horário formam uma combinação UNIQUE.',
    'Cadastre um novo usuário': 'Criamos primeiro o usuário porque a reserva precisa referenciar um id_usuario existente.',
    'Crie uma reserva para esse usuário': 'Agora a FOREIGN KEY id_usuario pode apontar para o usuário 100 criado no passo anterior.',
    'Cancele a reserva': 'Localizamos a linha antes e depois do UPDATE para verificar exatamente o que mudou.',
    'Tente excluir João': 'Este DELETE deve falhar enquanto a reserva 50 ainda referenciar o usuário 100.'
  };

  const sectionSelector = '#insert .sql-block code, #integridade .sql-block code, #alterar .sql-block code, #pratica .sql-block code';

  document.querySelectorAll(sectionSelector).forEach((code) => {
    if (code.dataset.didacticComments === 'true') return;

    const original = code.textContent;
    const lines = original.split('\n');
    const output = [];
    const cardTitle = code.closest('.practice-card')?.querySelector('h3')?.textContent.trim();
    const contextualNote = cardTitle ? contextualNotes[cardTitle] : null;

    if (contextualNote) {
      output.push(`# ${contextualNote}`, '');
    }

    let insideSqlString = false;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (/^(executar|consultar)\("""\s*$/.test(trimmed)) {
        output.push(line);
        insideSqlString = true;
        return;
      }

      if (insideSqlString && /^"""\)\s*$/.test(trimmed)) {
        output.push(line);
        insideSqlString = false;
        return;
      }

      if (insideSqlString) {
        if (/^INSERT INTO\b/i.test(trimmed)) {
          output.push('-- INSERT INTO indica a tabela e as colunas que receberão os novos dados.');
        } else if (/^VALUES\b/i.test(trimmed)) {
          output.push('-- VALUES informa os valores na mesma ordem das colunas declaradas acima.');
        } else if (/^SELECT\b/i.test(trimmed)) {
          output.push('-- SELECT define quais dados queremos consultar para conferir o estado do banco.');
        } else if (/^UPDATE\b/i.test(trimmed)) {
          output.push('-- UPDATE indica qual tabela terá registros alterados.');
        } else if (/^SET\b/i.test(trimmed)) {
          output.push('-- SET define o novo valor que será gravado na coluna.');
        } else if (/^DELETE FROM\b/i.test(trimmed)) {
          output.push('-- DELETE FROM remove registros da tabela indicada.');
        } else if (/^WHERE\b/i.test(trimmed)) {
          output.push('-- WHERE restringe a operação somente ao registro que atende a esta condição.');
        } else if (/^AND\b/i.test(trimmed)) {
          output.push('-- AND acrescenta uma segunda condição para tornar a seleção mais específica.');
        }
      } else if (/^consultar\("SELECT\b/i.test(trimmed)) {
        output.push('# SELECT de conferência: verifica quais dados ficaram armazenados após a operação.');
      }

      output.push(line);
    });

    code.textContent = output.join('\n');
    code.dataset.didacticComments = 'true';
  });
};

enhanceAula04Draft();
fixAula07PracticeCards();
enhanceAula07DmlComments();

const coreScript = document.createElement('script');
coreScript.src = new URL('script-core.js', document.currentScript?.src || window.location.href).href;
coreScript.onload = () => {
  enhanceReorganizationSection();
  enhanceAula04Draft();
  fixAula07PracticeCards();
  enhanceAula07DmlComments();
};
coreScript.onerror = () => console.error('Não foi possível carregar o script principal da página.');
document.head.appendChild(coreScript);