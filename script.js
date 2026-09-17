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
  if (cardTitle) cardTitle.textContent = 'Como aproveitar este material';
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
        margin: .7rem 0 1.6rem;
        padding: 1.05rem 1.15rem 1.15rem;
        border: 1px solid var(--line);
        border-left: 4px solid var(--primary);
        border-radius: 0 16px 16px 0;
        background: color-mix(in srgb,var(--primary) 5%,var(--surface));
      }

      body.lesson-dml .code-explainer-kicker {
        margin: 0 0 .25rem;
        color: var(--primary);
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      body.lesson-dml .code-explainer h4 {
        margin: 0;
        font-size: 1rem;
      }

      body.lesson-dml .code-explainer-intro {
        margin: .45rem 0 .8rem;
        color: var(--muted);
      }

      body.lesson-dml .code-steps {
        display: grid;
        gap: .55rem;
      }

      body.lesson-dml .code-step {
        display: grid;
        grid-template-columns: 1.7rem 1fr;
        gap: .65rem;
        align-items: start;
      }

      body.lesson-dml .code-step-number {
        display: grid;
        place-items: center;
        width: 1.55rem;
        height: 1.55rem;
        margin-top: .05rem;
        border-radius: 999px;
        background: color-mix(in srgb,var(--primary) 12%,var(--surface));
        color: var(--primary);
        font-size: .72rem;
        font-weight: 900;
      }

      body.lesson-dml .code-step p {
        margin: 0;
        color: var(--muted);
      }

      body.lesson-dml .code-step code,
      body.lesson-dml .code-explainer-intro code {
        color: var(--text);
      }

      body.lesson-dml .code-study-note {
        margin: 1rem 0 1.5rem;
      }

      @media (max-width: 680px) {
        body.lesson-dml .code-explainer {
          padding: .95rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.ddl-comment-guide, .dml-comment-guide, details.code-explainer').forEach((node) => node.remove());

  const insertHeading = document.querySelector('#insert .dml-heading');
  if (insertHeading && !document.querySelector('#insert .code-study-note')) {
    const note = document.createElement('div');
    note.className = 'callout code-study-note';
    note.innerHTML = '<strong>Primeiro contato com DML</strong><p>DML é a parte do SQL usada para trabalhar com os <strong>dados que estão dentro das tabelas</strong>. Nesta aula, pense sempre em quatro perguntas: <strong>em qual tabela?</strong>, <strong>quais colunas?</strong>, <strong>quais valores?</strong> e <strong>qual registro será afetado?</strong>.</p>';
    insertHeading.insertAdjacentElement('afterend', note);
  }

  const ddlHeading = [...document.querySelectorAll('#ambiente .dml-heading')]
    .find((heading) => heading.textContent.includes('Crie a estrutura'));
  if (ddlHeading && !document.querySelector('#ambiente .code-study-note')) {
    const note = document.createElement('div');
    note.className = 'callout code-study-note';
    note.innerHTML = '<strong>Primeiro contato com DDL</strong><p>DDL é a parte do SQL usada para definir a <strong>estrutura</strong> do banco: tabelas, colunas, chaves e regras. Não tente decorar tudo agora. Leia cada <code>CREATE TABLE</code> como uma descrição do que o banco deve aceitar ou impedir.</p>';
    ddlHeading.insertAdjacentElement('afterend', note);
  }

  const explanationsByLabel = {
    'Python · conexão': {
      intro: 'Antes do SQL, o Python precisa abrir o arquivo do banco e preparar um caminho para enviar comandos ao SQLite.',
      steps: [
        '<code>import sqlite3</code> carrega o módulo que permite conversar com o SQLite.',
        '<code>sqlite3.connect(...)</code> abre o arquivo <code>reserva_salas.db</code>. Se o arquivo ainda não existir, ele é criado.',
        '<code>cursor = conexao.cursor()</code> cria o objeto que envia os comandos SQL ao banco.',
        '<code>PRAGMA foreign_keys = ON</code> ativa no SQLite a verificação das chaves estrangeiras.'
      ]
    },
    'Python · criando as tabelas do laboratório': {
      intro: 'Este bloco reconstrói a estrutura do banco. A parte SQL está dentro de <code>executescript()</code> porque queremos executar vários comandos de uma vez.',
      steps: [
        '<code>DROP TABLE IF EXISTS</code> apaga as tabelas antigas, caso existam, para todos começarem no mesmo estado.',
        '<code>CREATE TABLE usuario (...)</code>, por exemplo, significa: “crie uma tabela chamada <code>usuario</code> com estas colunas e regras”.',
        '<code>PRIMARY KEY</code> define como cada registro será identificado de forma única.',
        '<code>NOT NULL</code> diz que aquela informação é obrigatória.',
        '<code>FOREIGN KEY</code> e <code>REFERENCES</code> criam uma ligação entre duas tabelas.',
        '<code>UNIQUE</code> impede repetições; <code>CHECK</code> valida uma regra; <code>DEFAULT</code> fornece um valor quando ele não é informado.',
        '<code>ON DELETE CASCADE</code> propaga uma exclusão para registros dependentes; <code>RESTRICT</code> bloqueia a exclusão enquanto houver dependências.'
      ]
    },
    'Python · conferindo a estrutura': {
      intro: 'Depois de criar as tabelas, não vamos simplesmente assumir que tudo funcionou: consultamos o próprio SQLite para conferir.',
      steps: [
        '<code>sqlite_master</code> é uma tabela interna que descreve os objetos existentes no banco.',
        '<code>WHERE type = \'table\'</code> mantém apenas os objetos que são tabelas.',
        '<code>ORDER BY name</code> organiza os nomes em ordem alfabética.',
        'O laço <code>for</code> imprime cada tabela encontrada. O resultado esperado confirma que a DDL foi executada.'
      ]
    },
    'Python · executar e consultar': {
      intro: 'As duas funções abaixo são apenas auxiliares do notebook. Elas evitam repetir o mesmo código Python a cada exemplo e deixam o foco no SQL.',
      steps: [
        '<code>executar(sql)</code> recebe um comando SQL que modifica o banco, executa e confirma a alteração com <code>commit()</code>.',
        'Se algo der errado, <code>rollback()</code> desfaz a operação corrente e mostramos a mensagem de erro.',
        '<code>consultar(sql)</code> executa um <code>SELECT</code>, lê as colunas retornadas e imprime as linhas encontradas.',
        'Nas próximas seções, o que estiver dentro de <code>executar(...)</code> ou <code>consultar(...)</code> será o SQL que estamos estudando.'
      ]
    },
    '1 · blocos': {
      intro: 'Aqui aparece o primeiro comando DML da aula: <code>INSERT</code>. Ele adiciona novas linhas a uma tabela.',
      steps: [
        '<code>INSERT INTO bloco</code> escolhe a tabela que receberá os dados.',
        '<code>(id_bloco, nome_bloco)</code> informa quais colunas serão preenchidas.',
        '<code>VALUES</code> inicia a lista de valores. Cada conjunto entre parênteses representa uma nova linha.',
        'Depois do <code>INSERT</code>, executamos <code>SELECT * FROM bloco</code>. O <code>*</code> significa “mostre todas as colunas”.'
      ]
    },
    '2 · usuários': {
      intro: 'A estrutura do comando é a mesma. O que muda são a tabela, as colunas e os valores.',
      steps: [
        '<code>INSERT INTO usuario</code> indica que as novas linhas serão gravadas em <code>usuario</code>.',
        'Cada usuário recebe um <code>id_usuario</code> diferente porque essa coluna é a chave primária.',
        'O <code>SELECT</code> logo abaixo confirma exatamente o que entrou na tabela.'
      ]
    },
    '3 · telefones': {
      intro: 'Este exemplo mostra por que criamos uma tabela separada para os telefones: um mesmo usuário pode possuir mais de um número.',
      steps: [
        'O usuário <code>17</code> aparece em duas linhas porque possui dois telefones.',
        'A chave primária é composta por <code>(id_usuario, telefone)</code>. Portanto, o usuário pode repetir, mas a combinação usuário + telefone não pode.',
        '<code>id_usuario</code> também é chave estrangeira: cada telefone precisa pertencer a um usuário que já exista.'
      ]
    },
    '4 · salas': {
      intro: 'Ao inserir uma sala, o banco já começa a aplicar as regras que definimos na DDL.',
      steps: [
        '<code>capacidade</code> precisa ser maior que zero por causa do <code>CHECK</code>.',
        '<code>id_bloco</code> precisa apontar para um bloco existente por causa da chave estrangeira.',
        'Por isso os blocos foram inseridos antes das salas.'
      ]
    },
    '5 · primeira reserva': {
      intro: 'Uma reserva depende de dados que já existem. Ela precisa apontar para um usuário válido e uma sala válida.',
      steps: [
        '<code>id_usuario = 17</code> referencia Marina; <code>id_sala = 204</code> referencia a Sala Ipê.',
        'A coluna <code>situacao</code> não aparece no <code>INSERT</code>. Isso é permitido porque definimos <code>DEFAULT \'ativa\'</code>.',
        'Ao fazer o <code>SELECT</code>, observe que <code>ativa</code> aparece mesmo sem termos digitado esse valor.'
      ]
    },
    '1 · localize': {
      intro: 'Antes de alterar ou apagar dados, primeiro localizamos a linha que pretendemos atingir.',
      steps: [
        '<code>SELECT *</code> pede todas as colunas.',
        '<code>FROM reserva</code> informa a tabela.',
        '<code>WHERE id_reserva = 1</code> restringe o resultado somente à reserva 1.'
      ]
    },
    '2 · altere': {
      intro: '<code>UPDATE</code> modifica dados que já existem. O ponto mais importante é controlar quais linhas serão alteradas.',
      steps: [
        '<code>UPDATE reserva</code> escolhe a tabela.',
        '<code>SET situacao = \'cancelada\'</code> informa qual coluna muda e qual será o novo valor.',
        '<code>WHERE id_reserva = 1</code> limita a alteração à reserva 1.',
        'Sem <code>WHERE</code>, o comando alteraria todas as linhas da tabela.'
      ]
    },
    '3 · confira': {
      intro: 'Depois de modificar, repetimos a consulta para verificar se o banco ficou no estado esperado.',
      steps: [
        'Usamos a mesma condição <code>WHERE id_reserva = 1</code>.',
        'Compare o valor de <code>situacao</code> antes e depois do <code>UPDATE</code>.'
      ]
    },
    '2 · exclua um telefone': {
      intro: '<code>DELETE</code> remove linhas. Assim como no <code>UPDATE</code>, a condição é fundamental para não atingir registros errados.',
      steps: [
        '<code>DELETE FROM telefone_usuario</code> escolhe a tabela.',
        '<code>WHERE id_usuario = 42</code> começa a localizar o registro.',
        '<code>AND telefone = ...</code> acrescenta uma segunda condição e identifica exatamente o telefone desejado.'
      ]
    }
  };

  const explanationsByTitle = {
    'PK duplicada': {
      intro: 'Este comando foi escrito para falhar. O erro ajuda a enxergar a regra funcionando.',
      steps: [
        '<code>id_usuario = 17</code> já existe na tabela.',
        'Como <code>id_usuario</code> é <code>PRIMARY KEY</code>, duas linhas não podem possuir a mesma identidade.',
        'O SQLite rejeita o <code>INSERT</code> e preserva a integridade da tabela.'
      ]
    },
    'FK para bloco inexistente': {
      intro: 'Também esperamos um erro aqui, agora causado por uma chave estrangeira.',
      steps: [
        'A nova sala tenta usar <code>id_bloco = 99</code>.',
        'Não existe um bloco 99 na tabela <code>bloco</code>.',
        'A <code>FOREIGN KEY</code> impede que a sala fique apontando para algo inexistente.'
      ]
    },
    'CHECK de capacidade': {
      intro: 'O banco também consegue validar regras simples sobre os próprios valores.',
      steps: [
        'Tentamos gravar <code>capacidade = -3</code>.',
        'A tabela possui <code>CHECK (capacidade &gt; 0)</code>.',
        'Como -3 não atende à regra, o registro é rejeitado.'
      ]
    },
    'Situação inválida': {
      intro: 'A coluna <code>situacao</code> aceita apenas um pequeno conjunto de valores.',
      steps: [
        'Tentamos gravar <code>aguardando</code>.',
        'O <code>CHECK</code> permite apenas <code>ativa</code>, <code>cancelada</code> ou <code>concluida</code>.',
        'O banco recusa o valor antes que ele produza um estado inconsistente.'
      ]
    },
    'Reserva repetida no mesmo horário': {
      intro: 'Aqui o problema não é uma coluna isolada, mas uma combinação que não pode se repetir.',
      steps: [
        'A sala 204 já possui uma reserva em <code>2026-09-18</code> às <code>18:30</code>.',
        'Declaramos <code>UNIQUE (id_sala, data, hora_inicio)</code>.',
        'A nova reserva é rejeitada porque criaria dois usos da mesma sala no mesmo horário.'
      ]
    },
    'Cadastre um novo usuário': {
      intro: 'Na prática guiada, repetimos o padrão: primeiro criamos os dados que serão referenciados depois.',
      steps: [
        'O usuário 100 é criado antes da reserva.',
        'O <code>SELECT ... WHERE id_usuario = 100</code> confirma que ele realmente foi gravado.'
      ]
    },
    'Crie uma reserva para esse usuário': {
      intro: 'Agora podemos criar uma linha em <code>reserva</code> porque as referências necessárias já existem.',
      steps: [
        '<code>id_usuario = 100</code> encontra o usuário recém-criado.',
        '<code>id_sala = 118</code> encontra uma sala existente.',
        'O <code>SELECT</code> final confirma a nova reserva.'
      ]
    },
    'Cancele a reserva': {
      intro: 'Este é o fluxo que queremos transformar em hábito ao usar <code>UPDATE</code>.',
      steps: [
        'Primeiro: <code>SELECT</code> para conferir qual linha será afetada.',
        'Depois: <code>UPDATE ... SET ... WHERE ...</code> para alterar somente essa linha.',
        'Por fim: outro <code>SELECT</code> para confirmar o resultado.'
      ]
    },
    'Tente excluir João': {
      intro: 'Neste teste, queremos observar a integridade referencial durante uma exclusão.',
      steps: [
        'O usuário 100 ainda aparece em uma reserva.',
        'A relação foi definida com <code>ON DELETE RESTRICT</code>.',
        'Por isso o banco impede excluir o usuário enquanto existir uma reserva apontando para ele.'
      ]
    }
  };

  const createExplainer = (data) => {
    const box = document.createElement('div');
    box.className = 'code-explainer';
    box.innerHTML = `
      <p class="code-explainer-kicker">Como ler este código</p>
      <h4>Vamos por partes</h4>
      <p class="code-explainer-intro">${data.intro}</p>
      <div class="code-steps">
        ${data.steps.map((step, index) => `
          <div class="code-step">
            <span class="code-step-number">${index + 1}</span>
            <p>${step}</p>
          </div>
        `).join('')}
      </div>
    `;
    return box;
  };

  const genericExplanation = (code) => {
    if (/INSERT INTO/i.test(code)) {
      return {
        intro: 'Este é um <code>INSERT</code>: um comando usado para adicionar novas linhas a uma tabela.',
        steps: [
          '<code>INSERT INTO</code> indica a tabela e, normalmente, as colunas que serão preenchidas.',
          '<code>VALUES</code> traz os valores que serão gravados, na mesma ordem das colunas.',
          'Depois da execução, vale conferir o resultado com um <code>SELECT</code>.'
        ]
      };
    }
    if (/UPDATE/i.test(code)) {
      return {
        intro: 'Este é um <code>UPDATE</code>: ele altera dados que já estão armazenados.',
        steps: [
          '<code>UPDATE</code> escolhe a tabela.',
          '<code>SET</code> informa o que será alterado.',
          '<code>WHERE</code> define quais linhas serão atingidas.'
        ]
      };
    }
    if (/DELETE FROM/i.test(code)) {
      return {
        intro: 'Este é um <code>DELETE</code>: ele remove linhas de uma tabela.',
        steps: [
          '<code>DELETE FROM</code> indica a tabela.',
          '<code>WHERE</code> deve limitar quais linhas serão excluídas.',
          'Antes de apagar, prefira executar um <code>SELECT</code> com a mesma condição.'
        ]
      };
    }
    if (/SELECT/i.test(code)) {
      return {
        intro: 'Este é um <code>SELECT</code>: ele consulta dados sem modificar o conteúdo da tabela.',
        steps: [
          '<code>SELECT</code> informa quais colunas queremos ver.',
          '<code>FROM</code> indica de qual tabela os dados virão.',
          '<code>WHERE</code>, quando aparece, filtra quais linhas serão retornadas.'
        ]
      };
    }
    return null;
  };

  document.querySelectorAll('.lesson-dml .sql-block').forEach((sqlBlock) => {
    if (sqlBlock.nextElementSibling?.classList.contains('code-explainer')) return;

    const label = sqlBlock.querySelector('.sql-label')?.textContent.trim();
    const title = sqlBlock.closest('.practice-card')?.querySelector('h3')?.textContent.trim();
    const code = sqlBlock.querySelector('code')?.textContent || '';

    const data = (title && explanationsByTitle[title])
      || (label && explanationsByLabel[label])
      || genericExplanation(code);

    if (data) sqlBlock.insertAdjacentElement('afterend', createExplainer(data));
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
