# Zumbicalipse Sandbox

Um sandbox 2D de sobrevivência em um apocalipse zumbi, focado em construção física e engenhocas funcionais.

## Visão do projeto

O jogador poderá combinar peças mecânicas — rodas, engrenagens, cordas, polias, correntes e motores — para criar máquinas, veículos, defesas e armadilhas que ajudem a sobreviver.

## Princípios

- **Construção livre:** posicionar, conectar e testar componentes no mundo.
- **Física legível:** gravidade, colisões, rotação, tensão e transmissão de movimento.
- **Sistemas combináveis:** mecanismos simples devem permitir soluções emergentes.
- **Sobrevivência:** recursos, abrigo, ameaças zumbis e exploração entram em etapas posteriores.
- **Sem bots jogadores:** o foco inicial é validar o sandbox e suas mecânicas.

## Estado atual

A primeira etapa cria a fundação jogável: cenário 2D, personagem controlável, peças físicas básicas, ferramenta de seleção/posicionamento e um motor demonstrativo. Ainda não representa o jogo completo.

## Executar localmente

Abra `index.html` em um navegador moderno. Não há dependências ou etapa de build nesta versão inicial.

## Controles

- `A` / `D` ou setas: mover o personagem.
- `W` / `Espaço`: pular.
- Clique em uma peça: selecionar.
- Arraste uma peça: reposicionar.
- `R`: girar a peça selecionada.
- Botões da interface: adicionar peças e ligar/desligar o motor.

## Roteiro

1. Protótipo 2D de movimentação e montagem.
2. Sistema de conexões físicas (cordas, polias, correntes e eixos).
3. Engrenagens e transmissão de torque com relações funcionais.
4. Inventário, coleta e recursos de construção.
5. Zumbis, combate, armadilhas e ciclo de sobrevivência.
6. Salvamento de construções e otimização para multiplayer, se desejado.

## Estrutura

- `index.html`: entrada e interface.
- `styles.css`: apresentação responsiva.
- `src/main.js`: simulação, controles e ferramentas do sandbox.

## Licença

A definir.
