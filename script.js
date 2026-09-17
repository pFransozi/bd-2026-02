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
  if (!document.body.classList.contains('lesson-dml')) return;
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

const enhanceAula07CodeExplanations = () => {
  if (!document.body.classList.contains('lesson-dml')) return;

  if (!document.getElementById('aula07-code-explainer-style')) {
    const style = document.createElement('style');
    style.id = 'aula07-code-explainer-style';
    style.textContent = `
      body.lesson-dml .code-explainer {
        margin: .65rem 0 1.35rem;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--surface);
        overflow: hidden;
      }

      body.lesson-dml .code-explainer summary {
        cursor: pointer;
        list-style: none;
        padding: .78rem 1rem;
        font-weight: 800;
        color: var(--primary);
        user-select: none;
      }

      body.lesson-dml .code-explainer summary::-webkit-details-marker {
        display: none;
      }

      body.lesson-dml .code-explainer summary::before {
        content: '＋';
        display: inline-block;
        width: 1.35rem;
        margin-right: .35rem;
      }

      body.lesson-dml .code-explainer[open] summary::before {
        content: '−';
      }

      body.lesson-dml .code-explainer-body {
        padding: 0 1rem 1rem 2.7rem;
        color: var(--muted);
      }

      body.lesson-dml .code-explainer-body p {
        margin: .45rem 0;
      }

      body.lesson-dml .code-explainer-body code {
        color: var(--text);
      }

      body.lesson-dml .code-study-note {
        margin: 1rem 0 1.5rem;
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.ddl-comment-guide, .dml-comment-guide').forEach((node) => node.remove());

  const insertHeading = document.querySelector('#insert .dml-heading');
  if (insertHeading && !document.querySelector('#insert .code-study-note')) {
    const note = document.createElement('div');
    note.className = 'callout code-study-note';
    note.innerHTML = '<strong>Código limpo, explicação sob demanda</strong><p>Primeiro leia e execute o comando como uma unidade. Quando precisar revisar a sintaxe ou entender uma decisão, abra <strong>Entenda este código</strong> logo abaixo do exemplo.</p>';
    insertHeading.insertAdjacentElement('afterend', note);
  }

  const ddlHeading = [...document.querySelectorAll('#ambiente .dml-heading')]
    .find((heading) => heading.textContent.includes('Crie a estrutura'));
  if (ddlHeading && !document.querySelector('#ambiente .code-study-note')) {
    const note = document.createElement('div');
    note.className = 'callout code-study-note';
    note.innerHTML = '<strong>Na DDL, observe as regras da estrutura</strong><p>O código fica limpo para facilitar a leitura. Use a explicação recolhível para revisar o papel de <code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>, <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code> e <code>ON DELETE</code>.</p>';
    ddlHeading.insertAdjacentElement('afterend', note);
  }

  const byLabel = {
    'Python · conexão': [
      '<p><code>import sqlite3</code> disponibiliza o driver do SQLite no Python.</p>',
      '<p><code>connect()</code> abre o arquivo do banco; se ele não existir, o SQLite cria o arquivo.</p>',
      '<p>O <code>cursor</code> envia comandos SQL para a conexão.</p>',
      '<p><code>PRAGMA foreign_keys = ON</code> ativa a verificação das chaves estrangeiras no SQLite.</p>'
    ],
    'Python · criando as tabelas do laboratório': [
      '<p><code>executescript()</code> permite executar vários comandos DDL de uma vez.</p>',
      '<p>Os <code>DROP TABLE IF EXISTS</code> reiniciam o laboratório e aparecem em ordem inversa às dependências.</p>',
      '<p>Cada <code>CREATE TABLE</code> define uma parte do domínio e suas regras estruturais.</p>',
      '<p><code>PRIMARY KEY</code> identifica registros; <code>FOREIGN KEY</code> cria vínculos; <code>NOT NULL</code>, <code>UNIQUE</code> e <code>CHECK</code> impõem restrições.</p>',
      '<p><code>DEFAULT</code> fornece um valor quando o <code>INSERT</code> omite a coluna. <code>CASCADE</code> propaga a exclusão; <code>RESTRICT</code> bloqueia a exclusão quando há dependências.</p>'
    ],
    'Python · conferindo a estrutura': [
      '<p>A consulta lê <code>sqlite_master</code>, o catálogo interno do SQLite.</p>',
      '<p>O filtro <code>type = \'table\'</code> mantém apenas tabelas e <code>ORDER BY name</code> organiza o resultado.</p>',
      '<p>O laço em Python imprime cada tabela encontrada para confirmar que a DDL foi executada.</p>'
    ],
    'Python · executar e consultar': [
      '<p><code>executar()</code> centraliza comandos que modificam o banco e confirma com <code>commit()</code>.</p>',
      '<p>Se ocorrer erro, <code>rollback()</code> desfaz a operação corrente e a mensagem é exibida.</p>',
      '<p><code>consultar()</code> executa um <code>SELECT</code>, recupera os nomes das colunas e imprime as linhas retornadas.</p>'
    ],
    '1 · blocos': [
      '<p><code>INSERT INTO bloco</code> informa a tabela e as colunas que serão preenchidas.</p>',
      '<p>Um único <code>VALUES</code> adiciona três registros. Depois, o <code>SELECT</code> confirma o resultado.</p>'
    ],
    '2 · usuários': [
      '<p>São inseridos três usuários, cada um com uma chave primária diferente.</p>',
      '<p>O <code>SELECT</code> seguinte serve como verificação imediata da inserção.</p>'
    ],
    '3 · telefones': [
      '<p>O usuário 17 recebe dois telefones. Isso é possível porque a tabela separa um atributo multivalorado.</p>',
      '<p>A combinação <code>(id_usuario, telefone)</code> é a chave primária composta: o mesmo usuário pode ter vários números, mas a mesma combinação não pode se repetir.</p>'
    ],
    '4 · salas': [
      '<p>Cada sala recebe um <code>id_bloco</code>. Esse valor precisa existir antes na tabela <code>bloco</code> por causa da chave estrangeira.</p>',
      '<p>A capacidade também precisa respeitar o <code>CHECK (capacidade &gt; 0)</code>.</p>'
    ],
    '5 · primeira reserva': [
      '<p>A reserva referencia um usuário e uma sala já existentes.</p>',
      '<p>A coluna <code>situacao</code> não é informada. Por isso o banco aplica automaticamente o <code>DEFAULT \'ativa\'</code>.</p>'
    ],
    '1 · localize': [
      '<p>Antes de alterar ou excluir, usamos <code>SELECT ... WHERE</code> para confirmar exatamente qual registro será atingido.</p>'
    ],
    '2 · altere': [
      '<p><code>UPDATE reserva</code> escolhe a tabela; <code>SET</code> define o novo valor; <code>WHERE</code> restringe a alteração à reserva 1.</p>',
      '<p>Sem <code>WHERE</code>, todas as linhas da tabela poderiam ser alteradas.</p>'
    ],
    '3 · confira': [
      '<p>Repetimos o mesmo <code>SELECT</code> para verificar o estado do registro depois da operação.</p>'
    ],
    '2 · exclua um telefone': [
      '<p><code>DELETE FROM telefone_usuario</code> remove linhas da tabela.</p>',
      '<p>As duas condições identificam exatamente um telefone do usuário 42, reduzindo o risco de excluir outros registros.</p>'
    ]
  };

  const byTitle = {
    'PK duplicada': '<p>O comando deve falhar porque <code>id_usuario = 17</code> já existe. A <code>PRIMARY KEY</code> não permite duas linhas com a mesma identidade.</p>',
    'FK para bloco inexistente': '<p>O comando deve falhar porque o bloco 99 não existe. A <code>FOREIGN KEY</code> impede criar uma sala apontando para um bloco inexistente.</p>',
    'CHECK de capacidade': '<p>O comando deve falhar porque a capacidade é negativa e viola <code>CHECK (capacidade &gt; 0)</code>.</p>',
    'Situação inválida': '<p>O comando deve falhar porque <code>aguardando</code> não faz parte dos valores permitidos pelo <code>CHECK</code> da coluna <code>situacao</code>.</p>',
    'Reserva repetida no mesmo horário': '<p>O comando deve falhar porque a combinação sala + data + horário já existe e foi declarada como <code>UNIQUE</code>.</p>',
    'Cadastre um novo usuário': '<p>O usuário é criado primeiro porque a reserva do próximo passo precisa apontar para um <code>id_usuario</code> existente.</p>',
    'Crie uma reserva para esse usuário': '<p>A reserva usa o usuário 100 e a sala 118, que já existem. As chaves estrangeiras podem, portanto, ser satisfeitas.</p>',
    'Cancele a reserva': '<p>A sequência segue uma boa prática: localizar com <code>SELECT</code>, alterar com <code>UPDATE</code> e consultar novamente para validar o resultado.</p>',
    'Tente excluir João': '<p>O <code>DELETE</code> deve falhar enquanto a reserva 50 referenciar o usuário 100, pois a relação está protegida por <code>ON DELETE RESTRICT</code>.</p>'
  };

  const addExplainer = (sqlBlock, html) => {
    if (!sqlBlock || !html || sqlBlock.nextElementSibling?.classList.contains('code-explainer')) return;

    const details = document.createElement('details');
    details.className = 'code-explainer';
    details.innerHTML = `<summary>Entenda este código</summary><div class="code-explainer-body">${Array.isArray(html) ? html.join('') : html}</div>`;
    sqlBlock.insertAdjacentElement('afterend', details);
  };

  document.querySelectorAll('.lesson-dml .sql-block').forEach((sqlBlock) => {
    const label = sqlBlock.querySelector('.sql-label')?.textContent.trim();
    const title = sqlBlock.closest('.practice-card')?.querySelector('h3')?.textContent.trim();

    if (title && byTitle[title]) {
      addExplainer(sqlBlock, byTitle[title]);
      return;
    }

    if (label && byLabel[label]) {
      addExplainer(sqlBlock, byLabel[label]);
      return;
    }

    const code = sqlBlock.querySelector('code')?.textContent || '';
    let generic = null;

    if (/^\s*executar\("""[\s\S]*INSERT INTO/im.test(code)) {
      generic = '<p><code>INSERT INTO</code> escolhe a tabela e as colunas. <code>VALUES</code> fornece os dados que serão gravados.</p>';
    } else if (/^\s*executar\("""[\s\S]*UPDATE/im.test(code)) {
      generic = '<p><code>UPDATE</code> escolhe a tabela, <code>SET</code> define a alteração e <code>WHERE</code> limita quais registros serão modificados.</p>';
    } else if (/^\s*executar\("""[\s\S]*DELETE FROM/im.test(code)) {
      generic = '<p><code>DELETE FROM</code> remove registros. O <code>WHERE</code> é essencial para limitar exatamente o que será excluído.</p>';
    } else if (/SELECT/i.test(code)) {
      generic = '<p>Este <code>SELECT</code> serve para localizar ou conferir dados antes ou depois de uma operação.</p>';
    }

    if (generic) addExplainer(sqlBlock, generic);
  });
};

enhanceAula04Draft();
fixAula07PracticeCards();
enhanceAula07CodeExplanations();

const coreScript = document.createElement('script');
coreScript.src = new URL('script-core.js', document.currentScript?.src || window.location.href).href;
coreScript.onload = () => {
  enhanceReorganizationSection();
  enhanceAula04Draft();
  fixAula07PracticeCards();
  enhanceAula07CodeExplanations();
};
coreScript.onerror = () => console.error('Não foi possível carregar o script principal da página.');
document.head.appendChild(coreScript);