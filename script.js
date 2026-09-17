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

const enhanceAula07DdlComments = () => {
  if (!document.body.classList.contains('lesson-dml')) return;

  const ambiente = document.getElementById('ambiente');
  if (!ambiente) return;

  const guideHeading = [...ambiente.querySelectorAll('.dml-heading')]
    .find((heading) => heading.textContent.includes('Crie a estrutura'));

  if (guideHeading && !ambiente.querySelector('.ddl-comment-guide')) {
    const guide = document.createElement('div');
    guide.className = 'callout ddl-comment-guide';
    guide.innerHTML = '<strong>Leia a DDL como uma descrição das regras do banco</strong><p>Nos comentários abaixo, <code>--</code> explica a parte SQL e <code>#</code> explica o que o Python faz para enviar os comandos ao SQLite. Observe principalmente <code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>, <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code> e <code>ON DELETE</code>.</p>';
    guideHeading.insertAdjacentElement('afterend', guide);
  }

  const tablePurpose = {
    usuario: 'Guarda os usuários que poderão realizar reservas.',
    telefone_usuario: 'Separa os telefones do usuário em uma tabela própria e permite vários telefones por usuário.',
    bloco: 'Guarda os blocos físicos onde as salas estão localizadas.',
    sala: 'Guarda as salas e liga cada uma delas a um bloco existente.',
    reserva: 'Registra a reserva e conecta usuário, sala, data, horário e situação.'
  };

  ambiente.querySelectorAll('.sql-block code').forEach((code) => {
    if (code.dataset.ddlComments === 'true') return;

    const original = code.textContent;
    const lines = original.split('\n');
    const output = [];
    let insideDdlString = false;
    let explainedDrops = false;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed === 'import sqlite3') {
        output.push('# Importa o módulo que permite ao Python trabalhar com bancos SQLite.');
      } else if (/^conexao = sqlite3\.connect/.test(trimmed)) {
        output.push('# Abre o arquivo do banco. Se ele ainda não existir, o SQLite cria o arquivo.');
      } else if (trimmed === 'cursor = conexao.cursor()') {
        output.push('# O cursor será usado para enviar comandos SQL para o banco.');
      } else if (/PRAGMA foreign_keys = ON/.test(trimmed)) {
        output.push('# No SQLite, ativamos explicitamente a verificação das chaves estrangeiras.');
      } else if (/^cursor\.executescript\("""/.test(trimmed)) {
        output.push('# executescript permite executar vários comandos DDL em sequência.');
        insideDdlString = true;
      } else if (insideDdlString && /^"""\)\s*$/.test(trimmed)) {
        output.push(line);
        insideDdlString = false;
        return;
      }

      if (insideDdlString) {
        if (/^DROP TABLE IF EXISTS\b/i.test(trimmed) && !explainedDrops) {
          output.push('-- Remove versões anteriores das tabelas para reiniciar o laboratório do zero.');
          output.push('-- A ordem é inversa às dependências para evitar conflitos com chaves estrangeiras.');
          explainedDrops = true;
        }

        const createMatch = trimmed.match(/^CREATE TABLE\s+([a-zA-Z_]+)/i);
        if (createMatch) {
          const tableName = createMatch[1].toLowerCase();
          output.push('');
          output.push(`-- Tabela ${tableName.toUpperCase()}: ${tablePurpose[tableName] || 'define uma parte da estrutura do banco.'}`);
        }

        if (/\bINTEGER PRIMARY KEY\b/i.test(trimmed) || /^PRIMARY KEY\b/i.test(trimmed)) {
          output.push('-- PRIMARY KEY identifica cada registro de forma única.');
        } else if (/\bNOT NULL\b/i.test(trimmed) && !/PRIMARY KEY/i.test(trimmed)) {
          output.push('-- NOT NULL indica que este dado é obrigatório.');
        }

        if (/^FOREIGN KEY\b/i.test(trimmed)) {
          output.push('-- FOREIGN KEY cria um vínculo com uma chave existente em outra tabela.');
        } else if (/^REFERENCES\b/i.test(trimmed)) {
          output.push('-- REFERENCES informa qual tabela e coluna serão usadas como referência.');
        } else if (/ON DELETE CASCADE/i.test(trimmed)) {
          output.push('-- CASCADE: ao excluir o usuário, seus telefones relacionados também são excluídos.');
        } else if (/ON DELETE RESTRICT/i.test(trimmed)) {
          output.push('-- RESTRICT: impede excluir o registro enquanto outra tabela ainda depender dele.');
        }

        if (/\bUNIQUE\b/i.test(trimmed)) {
          output.push('-- UNIQUE impede a repetição deste valor ou desta combinação de valores.');
        }
        if (/\bCHECK\b/i.test(trimmed)) {
          output.push('-- CHECK valida se o valor atende à regra definida pelo banco.');
        }
        if (/\bDEFAULT\b/i.test(trimmed)) {
          output.push('-- DEFAULT fornece este valor automaticamente quando o INSERT não informar a coluna.');
        }
      } else if (trimmed === 'conexao.commit()') {
        output.push('# Confirma as alterações estruturais realizadas no banco.');
      } else if (/SELECT name/i.test(trimmed)) {
        output.push('-- Consulta o catálogo interno para conferir quais tabelas foram criadas.');
      }

      output.push(line);
    });

    code.textContent = output.join('\n');
    code.dataset.ddlComments = 'true';
  });
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
enhanceAula07DdlComments();
enhanceAula07DmlComments();

const coreScript = document.createElement('script');
coreScript.src = new URL('script-core.js', document.currentScript?.src || window.location.href).href;
coreScript.onload = () => {
  enhanceReorganizationSection();
  enhanceAula04Draft();
  fixAula07PracticeCards();
  enhanceAula07DdlComments();
  enhanceAula07DmlComments();
};
coreScript.onerror = () => console.error('Não foi possível carregar o script principal da página.');
document.head.appendChild(coreScript);