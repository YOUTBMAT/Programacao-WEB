# 🗡️ Hollow Knight — Mapa Interativo de Hallownest

Uma aplicação web interativa e imersiva dedicada ao universo do jogo **Hollow Knight**. O projeto reúne um mapa interativo com detecção de cliques por transparência, navegação entre as regiões do reino de Hallownest, exibições detalhadas sobre a *lore* e habitantes de cada local, e uma interface gráfica fiel ao estilo visual do jogo.

---

## 📌 Visão Geral do Projeto

O objetivo principal deste projeto é oferecer aos fãs e leitores uma experiência de exploração fluida e atmosférica do mapa de Hallownest, combinando precisão técnica no desenvolvimento web com a estética marcante do título original da Team Cherry.

---

## 🎯 Objetivos Principais

### 1. Mapa Interativo e Navegação Centralizada (`index.html`)
* **Mapeamento Preciso de Hallownest:** Sobreposição das **16 regiões oficiais** em arquivos PNG com alinhamento de proporção $1:1$ sobre o mapa-base (`Mapa HK.jpg`), recompondo o reino sem desalinhar os contornos.
  * *Regiões Mapeadas:* Dirtmouth, Howling Cliffs, Forgotten Crossroads, Greenpath, Fog Canyon, Fungal Wastes, Queen's Gardens, Deepnest, Ancient Basin, City of Tears, Royal Waterways, Crystal Peak, Resting Grounds, Kingdom's Edge, The Hive e Void.
* **Hitbox Precisa por Transparência (Pixel-Perfect):** Utilização da **API Canvas em JavaScript** para análise do canal *alpha* dos pixels das imagens PNG. Isso garante que os eventos de clique e *hover* só ocorram exatamente sobre os pixels visíveis de cada região, impedindo que transparências ou camadas inferiores/superiores (como a camada do *Void*) bloqueiem a interação.
* **Feedback Visual (Hover & Glow Customizados):** Aplicação de efeitos de iluminação e brilho contornado (`drop-shadow`) com cores personalizadas para cada região ao posicionar o ponteiro do mouse.
* **Navegação Direta:** Redirecionamento dinâmico do usuário ao clicar em qualquer uma das regiões para sua respectiva subpágina (`paginas/NomeDaRegiao.html`).
* **Design Responsivo:** Redimensionamento proporcional das camadas do mapa em telas de computadores, tablets e dispositivos móveis.

---

### 2. Lore, Habitantes e Conteúdo das Subpáginas
* **Páginas Específicas por Região:** Subpáginas dedicadas a detalhar a história, o clima e a ambientação de cada localidade de Hallownest (ex.: `Greenpath.html`).
* **Cards de NPCs e Inimigos:** Organização visual dos habitantes e criaturas da área através de *cards* informativos padronizados contendo imagem, nome e descrição.

---

### 3. Identidade Visual e Imersão Atmosférica
* **Tipografia Temática:** Uso rigoroso das fontes oficiais da interface original do jogo:
  * **Trajan Pro / Trajan Original** para títulos principais (`h1`, `h2`).
  * **Perpetua / Perpetua Original** para o corpo de texto (`p`).
* **Estilização Dinâmica por Região:** Paletas de cores e efeitos visuais adaptados ao tema de cada área (ex.: tons esverdeados e névoas para Greenpath, tons acinzentados para Ancient Basin).
* **Efeitos Visuais Leves em CSS Pure:**
  * **Efeito "Aurora Boreal":** Animação de fundo suave e esverdeada utilizando apenas gradientes CSS para manter o carregamento leve sem imagens pesadas.
  * **Borda Pulsante Orgânica:** Brilho neon animado (`box-shadow`) nos containers de conteúdo.
  * **Layout Limpo:** Disposição de capturas de tela e elementos gráficos com máscaras de opacidade/parallax para preservar a legibilidade.

---

### 4. Arquitetura, Modularização e Desempenho
* **Separação de Responsabilidades:** Separação clara entre estrutura (`HTML`), estilo (`CSS`) e inteligência de interação (`JavaScript`).
* **Modularização de Estilos:** Divisão do código CSS em arquivos distintos (`index.css` para o mapa principal e `paginas.css` para subpáginas e *cards*).
* **Uso de Variáveis CSS (`var(--cor-mapa)`):** Centralização das regras de estilização para facilitar a alteração rápida de cores, bordas e iluminações em qualquer página.
* **Organização dos Assets:** Manutenção de caminhos de arquivos (*paths*) padronizados para carregamento eficiente de mídias.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do documento e das subpáginas.
* **CSS3:** Animações, variáveis CSS, gradientes, layout responsivo e estilização temática.
* **JavaScript (ES6+) & HTML5 Canvas API:** Manipulação do canal *alpha* dos pixels para detecção de colisão *pixel-perfect*, manipulação do DOM e controle dos efeitos visuais.

---

## 📁 Estrutura do Projeto (Simplificada)

```text
├── index.html               # Página principal com o mapa interativo
├── index.css                # Estilos do mapa e layout principal
├── script.js                # Lógica JS para Canvas, hover e cliques pixel-perfect
├── README.md                # Documentação do projeto
│
├── paginas/                 # Subpáginas das 16 regiões de Hallownest
│   ├── Greenpath.html
│   ├── Dirtmouth.html
│   └── ...
│
├── css/                     # Arquivos CSS secundários / modularizados
│   └── paginas.css
│
└── assets/                  # Imagens do mapa, PNGs das 16 regiões e fontes
    ├── Mapa HK.jpg
    ├── regioes/
    └── fontes/
```