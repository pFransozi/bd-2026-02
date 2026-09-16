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

  const requisitos = document.querySelector('#requisitos');
  if (requisitos) {
    requisitos.innerHTML = `
      <div class="container">
        <div class="study-heading">
          <p class="study-kicker">2 · Dos requisitos à estrutura</p>
          <h2>O DER resulta da análise dos requisitos, das regras do domínio e das relações que precisam ser representadas</h2>
          <p>Antes de desenhar entidades e relacionamentos, precisamos entender o que o cenário realmente afirma. O requisito fornece pistas; a modelagem organiza essas pistas, explicita as regras e registra aquilo que ainda precisa ser confirmado.</p>
        </div>

        <div class="study-grid">
          <article class="study-prose">
            <h3>Comece separando o que o texto informa</h3>
            <p>Uma leitura orientada ajuda a transformar um texto corrido em informações que podem ser discutidas. Procure quatro tipos de pista:</p>

            <div class="mini-grid">
              <article class="mini-card">
                <h4>Elementos do domínio</h4>
                <p>Pessoas, objetos, eventos ou conceitos sobre os quais o sistema precisa manter informações. Exemplo: <strong>usuário</strong> e <strong>sala</strong>.</p>
              </article>
              <article class="mini-card">
                <h4>Características</h4>
                <p>Informações que descrevem esses elementos. Exemplo: <strong>nome</strong>, <strong>capacidade</strong> e <strong>data de nascimento</strong>.</p>
              </article>
              <article class="mini-card">
                <h4>Conexões</h4>
                <p>Fatos que ligam elementos do domínio. Exemplo: <strong>um usuário reserva uma sala</strong>.</p>
              </article>
              <article class="mini-card">
                <h4>Regras e quantidades</h4>
                <p>Expressões como <strong>pode</strong>, <strong>exatamente um</strong>, <strong>um ou mais</strong> e <strong>no máximo</strong> ajudam a descobrir cardinalidades e obrigatoriedade.</p>
              </article>
            </div>

            <h3>As palavras ajudam a encontrar pistas; o significado define o modelo</h3>
            <p>Identificar substantivos e verbos é útil como ponto de partida, mas a estrutura do DER não é decidida pela gramática. Precisamos perguntar qual papel cada informação desempenha no domínio.</p>

            <div class="study-table-wrap">
              <table class="study-table">
                <thead>
                  <tr><th>Pista encontrada</th><th>Pergunta de modelagem</th><th>Possível interpretação</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>sala</strong></td><td>Existem salas diferentes que precisam ser distinguidas?</td><td>Pode ser uma entidade.</td></tr>
                  <tr><td><strong>capacidade</strong></td><td>Essa informação existe sozinha ou apenas descreve uma sala?</td><td>Pode ser um atributo de SALA.</td></tr>
                  <tr><td><strong>reservar</strong></td><td>Esse fato conecta quais elementos?</td><td>Pode indicar um relacionamento.</td></tr>
                  <tr><td><strong>exatamente um usuário</strong></td><td>Essa participação é obrigatória? Qual é o máximo?</td><td>Ajuda a definir cardinalidade e participação.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Diferencie o que sabemos, o que supomos e o que ainda precisamos perguntar</h3>
            <p>Durante a leitura, nem toda informação terá o mesmo grau de certeza. Separar essas situações evita que uma hipótese vire regra sem percebermos.</p>

            <div class="mini-grid three">
              <article class="mini-card">
                <h4>Fato informado</h4>
                <p>Está explícito no requisito e pode ser representado no modelo.</p>
              </article>
              <article class="mini-card">
                <h4>Hipótese</h4>
                <p>Parece plausível, mas ainda não foi confirmada pelo domínio.</p>
              </article>
              <article class="mini-card">
                <h4>Dúvida</h4>
                <p>É uma informação necessária para decidir corretamente e precisa ser validada.</p>
              </article>
            </div>

            <div class="example-box">
              <strong>Fato informado</strong>
              <code>Cada reserva envolve exatamente um usuário e exatamente uma sala.</code>
              <p>Essa regra pode ser usada para definir a participação de RESERVA nos relacionamentos com USUÁRIO e SALA.</p>
            </div>

            <div class="example-box">
              <strong>Hipótese possível</strong>
              <code>Não podem existir duas reservas para a mesma sala no mesmo horário.</code>
              <p>Essa regra pode fazer sentido, mas o texto ainda não a confirmou. Portanto, ela deve ser tratada como hipótese até ser validada.</p>
            </div>

            <h3>Quando uma informação estiver faltando, transforme a lacuna em uma pergunta</h3>
            <p>O objetivo não é completar o cenário por intuição. O caminho é tornar a dúvida explícita para que ela possa ser respondida e incorporada ao modelo de forma consciente.</p>

            <div class="concept-flow">
              <span>1. Identifique o que já sabemos</span>
              <span>2. Localize a informação que falta</span>
              <span>3. Formule uma pergunta ao domínio</span>
              <span>4. Valide a resposta</span>
              <span>5. Atualize o DER</span>
            </div>

            <h3>Exemplo guiado: o que ainda precisamos saber sobre RESERVA?</h3>
            <p>O cenário já informa que uma reserva envolve um usuário, uma sala, uma data, um horário e uma situação. Mas ainda existem perguntas que afetam diretamente o modelo:</p>
            <ul>
              <li><strong>Como distinguir duas reservas?</strong> Existe um identificador próprio ou uma combinação de informações define a unicidade?</li>
              <li><strong>Uma sala pode ter reservas sobrepostas?</strong> Se não puder, qual é exatamente a regra de conflito?</li>
              <li><strong>Uma reserva cancelada continua no histórico?</strong> Se continuar, ela ainda deve ser identificável como uma ocorrência distinta.</li>
              <li><strong>O horário possui apenas início ou também duração/fim?</strong> Essa decisão altera o que precisa ser representado.</li>
            </ul>

            <div class="example-box">
              <strong>Como registrar enquanto a resposta não chega</strong>
              <code>RESERVA — identificador: a validar com o domínio</code>
              <p>Assim, o modelo continua avançando sem esconder uma decisão que ainda não foi tomada.</p>
            </div>
          </article>

          <aside class="study-stack">
            <div class="study-callout">
              <strong>Uma regra prática</strong>
              <p>Represente como regra aquilo que o requisito sustenta. O que ainda depende de confirmação deve aparecer como hipótese ou dúvida.</p>
            </div>

            <div class="study-callout teal">
              <strong>Modelar também é perguntar</strong>
              <p>Um bom modelo não mostra apenas respostas. Ele ajuda a revelar perguntas que estavam escondidas no texto do requisito.</p>
            </div>

            <div class="study-callout violet">
              <strong>Por que isso melhora o DER?</strong>
              <p>Porque cada cardinalidade, identificador e relacionamento passa a ter uma justificativa ligada ao domínio, em vez de surgir apenas por hábito de modelagem.</p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
})();
