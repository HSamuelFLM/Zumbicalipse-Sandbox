# Zumbicalipse Sandbox — Roadmap de desenvolvimento

Este roadmap acompanha a especificação em [ESPECIFICACAO-TECNICA.md](ESPECIFICACAO-TECNICA.md). As etapas são marcos de validação; não significam que os recursos já estejam implementados.

## Estado atual

- [x] Direção do produto 3D definida.
- [x] Single-player e Linux como plataforma inicial.
- [x] Mundo grande e procedural definido.
- [x] Alternância entre primeira e terceira pessoa definida.
- [x] Construção livre e morte configurável definidas.
- [x] Sistemas de terreno, recursos, fixação, mecânica e eletricidade especificados.
- [x] Especificação técnica registrada.
- [ ] Fundação 3D Godot + Rust implementada e validada.

O repositório ainda contém um protótipo inicial 2D em HTML/CSS/JavaScript. Esse protótipo é legado e não representa a arquitetura aprovada para o jogo final. Deve ser preservado até que a migração 3D esteja documentada e validada.

## Marco 0 — Validação tecnológica

- [ ] Verificar ambiente de desenvolvimento Linux x86_64.
- [ ] Escolher e fixar versões compatíveis de Godot 4, Rust e godot-rust.
- [ ] Criar projeto Godot 3D mínimo.
- [ ] Criar biblioteca Rust com GDExtension.
- [ ] Chamar uma função Rust a partir do Godot.
- [ ] Automatizar ou documentar compilação e execução.
- [ ] Validar build de desenvolvimento no Linux.

**Critério de conclusão:** projeto mínimo abre, compila e executa no Linux, e a integração Rust/Godot funciona de forma reproduzível.

## Marco 1 — Protótipo 3D jogável

- [ ] Cena de teste 3D e iluminação.
- [ ] Personagem controlável.
- [ ] Movimentação, corrida e sprint.
- [ ] Câmera em primeira pessoa.
- [ ] Câmera em terceira pessoa.
- [ ] Alternância de perspectiva sem recriar o personagem.
- [ ] Interação básica com objetos.
- [ ] Primeira build Linux.

**Critério de conclusão:** jogador consegue explorar uma área de teste nas duas perspectivas.

## Marco 2 — Mundo e terreno

- [ ] Seed e geração determinística.
- [ ] Sistema de chunks.
- [ ] Terreno e biomas iniciais.
- [ ] Pontos de interesse.
- [ ] Carregamento e descarregamento por proximidade.
- [ ] Prova de escavação híbrida.
- [ ] Atualização de malha e colisões após escavação.
- [ ] Persistência das alterações de terreno.

**Critério de conclusão:** o mesmo seed reproduz o mundo-base e as escavações sobrevivem a salvar e carregar.

## Marco 3 — Recursos e fabricação

- [ ] Definições de itens orientadas a dados.
- [ ] Árvores e coleta de madeira.
- [ ] Pedras, argila e minérios.
- [ ] Ferramentas de coleta e extração.
- [ ] Inventário limitado.
- [ ] Armazenamento no mundo.
- [ ] Receitas e estações de fabricação.
- [ ] Processamento básico de matérias-primas.

**Critério de conclusão:** jogador coleta recursos, armazena, fabrica componentes e os consome em receitas.

## Marco 4 — Construção e fixação

- [ ] Posicionamento livre e pré-visualização.
- [ ] Rotação e ajuste de peças.
- [ ] Verificação de colisão e suporte.
- [ ] Construção de pisos, paredes e estruturas simples.
- [ ] Pontos de fixação.
- [ ] Furação e adaptação de peças.
- [ ] Parafusos, porcas e arruelas.
- [ ] Pregos.
- [ ] Soldagem.
- [ ] Desmontagem e regras de recuperação.
- [ ] Resistência e falhas aproximadas das uniões.

**Critério de conclusão:** jogador monta duas ou mais peças, cria uma união funcional, salva, carrega e desmonta a montagem.

## Marco 5 — Engenharia e energia

- [ ] Eixos, rodas e mancais.
- [ ] Motores e volantes.
- [ ] Engrenagens e relações de transmissão.
- [ ] Polias e correias.
- [ ] Correntes e rodas dentadas.
- [ ] Cordas e alavancas.
- [ ] Geradores e baterias.
- [ ] Fios, conectores e postes.
- [ ] Interruptores e consumidores.
- [ ] Primeiro sistema mecânico-elétrico integrado.

**Critério de conclusão:** uma máquina construída pelo jogador transmite movimento e alimenta um consumidor elétrico por uma rede funcional.

## Marco 6 — Sobrevivência e ameaças

- [ ] Saúde, fome e sede.
- [ ] Ferimentos e recuperação.
- [ ] Clima e temperatura.
- [ ] Ciclo dia/noite.
- [ ] Zumbis com percepção e investigação de sons.
- [ ] Perseguição, combate e ataques a estruturas.
- [ ] Configurações de morte por mundo.
- [ ] Balanceamento inicial.

**Critério de conclusão:** uma partida completa pode ser iniciada, jogada, salva, carregada e encerrada por morte conforme a regra escolhida.

## Marco 7 — Persistência, otimização e expansão

- [ ] Salvamento automático e manual.
- [ ] Versionamento e migração de dados.
- [ ] Persistência de chunks, construções, máquinas e itens.
- [ ] Testes de integridade dos salvamentos.
- [ ] Otimização de CPU, memória e carregamento.
- [ ] Expansão de biomas, itens, estruturas e mecanismos.
- [ ] Build Linux de distribuição.
- [ ] Documentação de instalação e execução.

## Princípios de execução

1. Não iniciar conteúdo em larga escala antes de validar a fundação técnica.
2. Cada marco deve produzir algo executável e testável.
3. Não introduzir multiplayer ou bots na primeira versão.
4. Não implementar simulações duplicadas para os mesmos corpos físicos.
5. Priorizar sistemas funcionais e combináveis.
6. Preservar o protótipo 2D legado até que sua substituição esteja validada.
