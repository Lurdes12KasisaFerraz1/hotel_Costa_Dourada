document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const defaultLang = 'pt'; // Idioma padrão

    // Função para carregar e aplicar o idioma
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load language file: ${lang}.json`);
            }
            const langData = await response.json();
            
            // Atualizar o atributo lang do HTML
            document.documentElement.lang = lang;
            
            // Atualizar o título da página
            document.getElementById('page-title').textContent = langData.pageTitle;

            // Iterar sobre todos os elementos com data-key e atualizar o texto
            for (const key in langData) {
                const elements = document.querySelectorAll(`[data-key="${key}"]`);
                elements.forEach(element => {
                    // Tratar a formatação de negrito para elementos específicos
                    if (key.startsWith('dish') || key.startsWith('spaFeature') || key === 'phoneLabel' || key === 'emailLabel' || key === 'addressLabel') {
                        element.innerHTML = `**${langData[key]}**`;
                    } else {
                        element.textContent = langData[key];
                    }
                });
            }

            // Ativar a classe 'active' no botão do idioma selecionado
            langBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                }
            });

        } catch (error) {
            console.error('Erro ao carregar o idioma:', error);
        }
    }

    // Adicionar event listeners aos botões de idioma
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.dataset.lang;
            loadLanguage(lang);
        });
    });

    // Carregar o idioma padrão ao iniciar a página
    loadLanguage(defaultLang);
});