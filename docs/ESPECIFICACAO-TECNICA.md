# Zumbicalipse Sandbox — Especificação Técnica

**Versão:** 1.0  
**Status:** direção aprovada; fundação inicial Godot 3D + Rust criada; validação multiplataforma pendente  
**Plataformas-alvo:** Windows 10/11 x86_64 e Linux x86_64  
**Idioma deste documento:** português

> Este documento registra as decisões de produto e as diretrizes técnicas aprovadas. Ele não afirma que os sistemas descritos já estejam implementados.

## 1. Visão do projeto

Zumbicalipse Sandbox será um jogo 3D de sobrevivência single-player, com mundo grande gerado proceduralmente, exploração, coleta de recursos, fabricação, construção livre e engenharia funcional.

O jogador deverá encontrar, extrair, transportar, fabricar e combinar recursos e componentes. Não haverá um menu criativo com itens ou materiais infinitos disponibilizados gratuitamente durante a partida normal.

O diferencial do jogo será a liberdade para criar projetos próprios usando componentes inspirados em objetos e mecanismos do mundo real. As peças não serão apenas decorativas: quando aplicável, deverão transmitir movimento, força ou energia e reagir às condições do ambiente.

## 2. Decisões de produto aprovadas

| Tema | Decisão |
|---|---|
| Modo | Single-player |
| Plataformas-alvo | Windows 10/11 e Linux, x86_64 |
| Perspectiva | Alternância entre primeira e terceira pessoa |
| Visual | 3D low-poly detalhado |
| Mundo | Grande e procedural, organizado em chunks |
| Geração | Determinística por seed e configurações |
| Morte | Regra configurável ao criar o mundo |
| Construção | Livre, com posicionamento contínuo; encaixe assistido opcional |
| Passagem do tempo | Ciclo normal de dia e noite |
| Ameaças | Zumbis, ambiente e necessidades de sobrevivência |
| Realismo das mecânicas | Intermediário: propriedades coerentes sem simulação industrial excessiva |
| Terreno | Híbrido: dados volumétricos/voxel internamente e superfície visual suavizada |
| Mecanismos | Híbrido: física onde importa e cálculos simplificados no restante |
| Uniões | Soldagem para uniões firmes/permanentes e fixações mecânicas desmontáveis |
| Recursos | Encontrados, extraídos, coletados ou fabricados; sem recursos infinitos gratuitos |

## 3. Plataforma e arquitetura tecnológica

### 3.1 Stack proposta

- **Godot 4:** engine de apresentação e execução do jogo.
- **Rust:** linguagem principal dos sistemas de domínio e simulação especializada.
- **godot-rust / GDExtension:** integração entre Rust e Godot.
- **GLB/glTF:** formato de intercâmbio para modelos, hierarquias, materiais e animações.
- **Blockbench e Blender:** ferramentas para criação e edição de modelos e animações.
- **Texturas externas:** materiais organizados em arquivos e mapas PBR quando necessário.

Versões atualmente fixadas no projeto: Godot 4.7.2 Standard, godot-rust 0.5.5 / GDExtension API 4.7 e Rust stable com mínimo 1.94. A integração foi estruturada, mas a compilação e o carregamento devem ser validados em Windows e Linux antes de considerar a fundação concluída.

### 3.2 Responsabilidades

**Godot**
- Renderização 3D, cenas e recursos visuais.
- Câmeras e alternância de perspectiva.
- Entrada, interface e interação visual.
- Áudio, animações e efeitos.
- Física geral de personagens e objetos comuns.
- Navegação e apresentação dos agentes.

**Rust**
- Regras centrais do jogo.
- Inventário, itens, coleta e fabricação.
- Geração procedural e persistência das alterações do mundo.
- Construção, conexões, fixadores e integridade estrutural.
- Redes de energia e lógica dos mecanismos.
- Sistemas de sobrevivência e regras de IA que se beneficiem de lógica própria.
- Cálculos especializados de terreno e simulação quando necessário.

### 3.3 Autoridade física

Cada objeto ou sistema deverá ter uma única autoridade física. Não executar duas simulações concorrentes sobre o mesmo corpo. Godot poderá controlar corpos físicos gerais, enquanto Rust calcula redes mecânicas ou elétricas especializadas e sincroniza seus resultados de forma explícita.

## 4. Mundo procedural e terreno

### 4.1 Mundo

O mundo será grande, não infinito na primeira versão, e dividido em regiões/chunks carregados conforme a proximidade do jogador.

Elementos previstos:
- Florestas, campos, montanhas, áreas rochosas e corpos d'água.
- Regiões urbanas e industriais.
- Estradas, caminhos e conexões entre pontos de interesse.
- Casas, fábricas, depósitos, postos e estruturas abandonadas.
- Áreas com diferentes disponibilidades de recursos e níveis de perigo.

### 4.2 Geração determinística

A seed e as configurações devem reproduzir a geração original. A geração deverá usar regras para manter coerência geográfica, distribuição de pontos de interesse e recursos; não será aleatoriedade sem controle.

### 4.3 Chunks e persistência

- Chunks próximos são carregados e simulados.
- Chunks distantes podem ser descarregados ou representados por estado resumido.
- A seed permite regenerar o estado-base.
- O salvamento registra diferenças provocadas pelo jogador: escavações, construções, itens removidos, estruturas destruídas e outros eventos persistentes.

### 4.4 Escavação e mineração

A escavação será híbrida: representação volumétrica/voxel para permitir remoção de material e cavidades, com superfície visual suavizada para evitar aparência obrigatoriamente cúbica.

Deverá suportar:
- Escavar terra, areia, argila e rocha.
- Abrir valas, túneis e cavidades.
- Encontrar e extrair depósitos de minérios.
- Atualizar malha visual e colisões das regiões modificadas.
- Gerar materiais recuperáveis a partir do terreno.
- Persistir alterações por chunk.

Desempenho de atualização de malhas, colisões e armazenamento deverá ser validado cedo. Desmoronamentos e estabilidade geotécnica ficam como expansão futura, não requisito da primeira prova técnica.

## 5. Jogador e câmeras

O mesmo personagem, estado, inventário e movimentação deverão funcionar nas duas perspectivas:
- Primeira pessoa.
- Terceira pessoa.

Controles e ações previstos:
- Caminhar, correr, sprintar e pular.
- Interagir com objetos e estações.
- Coletar recursos e utilizar ferramentas.
- Construir, montar, desmontar e operar mecanismos.

A arquitetura poderá receber veículos e outros meios de transporte futuramente.

## 6. Recursos, itens e inventário

O inventário será limitado por capacidade. Peso, volume e limites de pilha serão definidos durante o balanceamento.

Operações:
- Coletar, transportar, empilhar, consumir e descartar.
- Guardar e retirar itens de caixas, armários e depósitos no mundo.
- Transferir itens entre inventários.
- Utilizar ferramentas, materiais e componentes em receitas e construções.

Os itens deverão ser orientados a dados, com identificadores estáveis, categorias, propriedades, regras de empilhamento, durabilidade quando aplicável e referências a modelos/ícones.

Categorias iniciais:
- Madeira e derivados.
- Pedra, areia, argila e tijolos.
- Minérios e metais processados.
- Combustíveis e materiais químicos comuns de jogo.
- Ferragens e fixadores.
- Ferramentas.
- Componentes mecânicos e elétricos.
- Alimentos, água, medicamentos e equipamentos de sobrevivência.
- Mobiliário, incluindo cadeiras.

## 7. Fabricação e processamento

Receitas poderão exigir materiais, quantidades, ferramentas, estações de trabalho e componentes anteriores. Algumas matérias-primas precisarão ser processadas antes de serem utilizadas.

A progressão deverá decorrer da exploração e fabricação, sem desbloquear gratuitamente todos os itens por um menu.

## 8. Construção livre

O jogador poderá posicionar objetos no espaço tridimensional, rotacioná-los e ajustar sua orientação e altura. O sistema deverá oferecer pré-visualização, validação de colisão e regras de suporte, sem impor grade fixa.

Categorias:
- Pisos, paredes, telhados, portas, janelas e escadas.
- Muros, tijolos, cercas, portões e arame.
- Postes, suportes, plataformas e torres.
- Bancadas, armários, caixas, cadeiras e mobiliário.
- Máquinas, mecanismos e equipamentos de defesa.

O encaixe assistido poderá ser opcional. Construções consumirão recursos reais do inventário. Desmontagem e recuperação de materiais dependerão do tipo e estado da união.

## 9. Fixação, montagem e adaptação de peças

Haverá um sistema comum de fixação reutilizado pela construção estrutural e pela engenharia.

### 9.1 Métodos de união

- **Parafusos, porcas e arruelas:** uniões firmes e desmontáveis.
- **Pregos:** fixação de madeira e aplicações compatíveis.
- **Soldagem:** união metálica firme, normalmente permanente.
- **Encaixes, travas, dobradiças e conectores:** uniões rápidas ou móveis.
- **Suportes, chapas e braçadeiras:** adaptação e reforço de componentes.

### 9.2 Adaptação pelo jogador

O jogador deverá poder adaptar peças para receber fixadores, por exemplo:
- Fazer furos em superfícies compatíveis.
- Criar ou utilizar pontos de fixação.
- Alinhar furos de peças diferentes.
- Fixar suportes e chapas em madeira ou metal.
- Prender rodas, engrenagens e motores a eixos ou estruturas.

A colocação deverá considerar material, espessura, distância das bordas, alinhamento e compatibilidade. Não será permitido aparafusar qualquer coisa em qualquer superfície sem consequência.

### 9.3 Ferramentas

- Martelos para pregos e ajustes.
- Chaves de boca, combinadas e ajustáveis para porcas.
- Chaves de fenda e Phillips para parafusos compatíveis.
- Furadeiras e brocas para criar furos.
- Alicates para segurar, dobrar e ajustar.
- Equipamentos de soldagem para uniões metálicas.

Ferramentas poderão ter durabilidade e requisitos. Algumas operações exigirão ferramenta, consumível ou estação apropriada.

### 9.4 Integridade das uniões

Conexões poderão considerar resistência, rigidez, quantidade e qualidade dos fixadores, material, desgaste e carga aplicada. Falhas possíveis incluem parafuso rompido ou solto, porca perdida, madeira rachada, solda rompida e chapa deformada.

A simulação será aproximada e otimizada, não uma análise de engenharia estrutural de precisão industrial.

## 10. Engenharia e transmissão mecânica

Componentes previstos:
- Motores de combustão e motores elétricos.
- Eixos e mancais.
- Engrenagens.
- Volantes de inércia.
- Rodas.
- Polias e correias.
- Correntes e rodas dentadas.
- Cordas.
- Alavancas.
- Pistões e mecanismos lineares.
- Molas.
- Portas e portões acionados.
- Guinchos, elevadores, bombas e máquinas.

Comportamentos:
- Motores fornecem rotação, torque e potência.
- Volantes armazenam energia rotacional e suavizam variações.
- Engrenagens alteram relações de velocidade e torque.
- Eixos e acoplamentos transmitem rotação.
- Correias e correntes conectam componentes.
- Polias alteram direção e relação de transmissão conforme configuração.
- Cordas transmitem tensão, não compressão.
- Alavancas transmitem força e movimento.
- Pistões convertem ou transmitem movimento linear.
- Rodas permitem tração e deslocamento.

O sistema será híbrido: cálculos especializados de redes e mecanismos onde necessário, física de corpos no engine onde isso oferecer resultado melhor. A primeira versão deverá provar poucas peças conectadas antes de escalar para máquinas complexas.

## 11. Energia e eletricidade

Itens e componentes:
- Geradores a combustível e outras fontes de geração.
- Baterias e acumuladores.
- Fios, cabos, conectores e postes.
- Interruptores e dispositivos de controle.
- Motores elétricos.
- Lâmpadas e equipamentos consumidores.
- Fusíveis e proteções, quando implementados.

Propriedades de simulação:
- Produção e consumo de energia.
- Potência, tensão e corrente.
- Capacidade e estado de carga das baterias.
- Taxas de carga e descarga.
- Perdas de transmissão simplificadas.
- Sobrecarga, curto-circuito e falhas.
- Combustível e manutenção dos geradores.

Não será simulada a movimentação de elétrons. Será utilizado um modelo de circuitos simplificado, coerente e eficiente, com redes e conexões verificáveis.

## 12. Recursos naturais e materiais

O ambiente deverá fornecer árvores, madeira, pedras, areia, argila e depósitos de minérios, além de materiais recuperáveis em estruturas abandonadas.

Ações:
- Cortar árvores e obter troncos e madeira.
- Processar madeira em tábuas e componentes.
- Extrair minérios por mineração.
- Processar minérios para obter materiais utilizáveis.
- Produzir tijolos e outros materiais de construção.
- Recuperar sucata e componentes de estruturas.

Distribuição e abundância dependerão dos biomas e pontos de interesse.

## 13. Sobrevivência, ambiente e ameaças

Necessidades e condições previstas:
- Fome, sede, saúde e ferimentos.
- Temperatura e clima.
- Ciclo normal de dia e noite.
- Visibilidade e condições ambientais.

Ameaças:
- Zumbis com percepção, investigação de ruídos, perseguição e ataques.
- Perigos ambientais.
- Escassez de recursos e exposição.

Zumbis poderão atacar estruturas e interagir com obstáculos conforme as regras de navegação e combate. Hordas e eventos de maior escala serão desenvolvidos gradualmente.

## 14. Morte e regras do mundo

Ao criar um mundo, o jogador poderá escolher:
1. Perda parcial dos itens carregados.
2. Perda completa do inventário, preservando mundo e base.
3. Morte permanente, encerrando a partida.

A configuração será armazenada no salvamento daquele mundo.

## 15. Tempo

O mundo terá ciclo normal de dia e noite. O relógio deverá ser centralizado e persistente, influenciando iluminação, visibilidade, ambiente e comportamento das ameaças.

## 16. Salvamento e persistência

O salvamento deverá registrar:
- Seed, configurações e regras de morte.
- Estado do jogador e inventário.
- Construções, fixações e máquinas.
- Escavações e alterações dos chunks.
- Itens coletados ou removidos.
- Estruturas destruídas e eventos relevantes.
- Estado do tempo e condições necessárias à continuidade.

Dados serão modulares e versionados para permitir migrações futuras. Haverá salvamento manual e automático. O jogo deverá ser jogável offline; não haverá dependência obrigatória de servidor ou conta online na primeira versão.

## 17. Organização lógica do repositório

Estrutura-alvo indicativa:

```text
Zumbicalipse-Sandbox/
├── README.md
├── project.godot
├── godot/
│   ├── scenes/
│   │   ├── player/
│   │   ├── world/
│   │   ├── zombies/
│   │   ├── buildings/
│   │   └── machinery/
│   ├── scripts/
│   │   ├── camera/
│   │   ├── interaction/
│   │   └── interface/
│   └── assets/
│       ├── models/
│       ├── textures/
│       ├── animations/
│       └── audio/
├── rust/
│   ├── Cargo.toml
│   └── crates/
│       ├── game_core/
│       ├── worldgen/
│       ├── terrain/
│       ├── resources/
│       ├── inventory/
│       ├── crafting/
│       ├── construction/
│       ├── fastening/
│       ├── machinery/
│       ├── electricity/
│       ├── survival/
│       ├── zombies/
│       └── persistence/
├── data/
│   ├── items/
│   ├── recipes/
│   ├── structures/
│   ├── biomes/
│   └── zombies/
└── docs/
    ├── ESPECIFICACAO-TECNICA.md
    └── ROADMAP.md
```

Esta estrutura é uma referência evolutiva. Diretórios e crates só serão criados quando necessários, evitando fragmentação prematura.

## 18. Plano de desenvolvimento

### Marco 0 — Validação tecnológica
- Verificar toolchains Windows e Linux.
- Criar projeto Godot 3D mínimo.
- Integrar GDExtension Rust.
- Compilar e executar uma chamada Rust a partir do Godot.
- Registrar versões e instruções reproduzíveis.

### Marco 1 — Protótipo 3D jogável
- Personagem e movimentação.
- Alternância primeira/terceira pessoa.
- Terreno de teste.
- Coleta simples e inventário mínimo.
- Builds Windows e Linux.

### Marco 2 — Mundo e terreno
- Seed e geração determinística.
- Chunks.
- Biomas e pontos de interesse.
- Prova de escavação volumétrica e colisão atualizada.
- Persistência de alterações.

### Marco 3 — Recursos e fabricação
- Árvores, madeira, pedras e minérios.
- Ferramentas.
- Inventário e armazenamento.
- Receitas e processamento.

### Marco 4 — Construção e fixação
- Posicionamento livre.
- Colisões e suporte.
- Parafusos, porcas, pregos e soldagem.
- Furação e adaptação de peças.
- Desmontagem.

### Marco 5 — Engenharia e energia
- Eixos, rodas, motores e engrenagens.
- Correias, correntes, cordas e alavancas.
- Geradores, baterias, fios e postes.
- Primeiro sistema mecânico-elétrico funcional.

### Marco 6 — Sobrevivência e ameaças
- Fome, sede, saúde e clima.
- Ciclo dia/noite.
- Zumbis e IA.
- Combate e ataques a estruturas.
- Regras configuráveis de morte.

### Marco 7 — Persistência e expansão
- Salvamento robusto.
- Mais biomas, itens, estruturas e máquinas.
- Balanceamento, otimização e distribuição Windows e Linux.

## 19. Critérios de qualidade

- O projeto deve compilar e executar em Windows 10/11 e Linux x86_64.
- Dependências e versões devem ser reproduzíveis.
- Sistemas críticos devem ter testes.
- Salvamentos devem resistir a encerramento e atualização.
- Chunks devem ter limites controlados de memória e processamento.
- Não duplicar autoridade física.
- Não criar itens gratuitamente na sobrevivência normal.
- Modelos e texturas devem ser substituíveis sem reescrever regras de jogo.
- Desenvolver entregas jogáveis e verificáveis, não apenas grandes conjuntos de código sem validação.

## 20. Fora do escopo inicial

- Multiplayer.
- Servidores dedicados.
- Mundo literalmente infinito.
- Simulação elétrica ou estrutural de precisão industrial.
- Desmoronamento geotécnico avançado.
- Catálogo completo de itens desde a primeira versão.

Esses pontos poderão ser reconsiderados depois que a fundação single-player estiver estável.
