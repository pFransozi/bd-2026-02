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
}
