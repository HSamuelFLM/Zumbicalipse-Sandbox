# Zumbicalipse Sandbox

Jogo 3D de sobrevivência single-player, com mundo grande e procedural, exploração, coleta de recursos, fabricação, construção livre e engenharia funcional.

**Plataforma inicial:** PC Linux (x86_64)  
**Tecnologia planejada:** Godot 4 + Rust (GDExtension)  
**Visual:** 3D low-poly detalhado  
**Perspectiva:** alternância entre primeira e terceira pessoa

## Direção do projeto

O jogador deverá explorar o mundo, encontrar ou extrair recursos, fabricar ferramentas e componentes e construir suas próprias bases e máquinas. Não haverá itens ou materiais infinitos disponibilizados gratuitamente na partida normal.

O jogo pretende oferecer sistemas combináveis de:
- Escavação, mineração, árvores e processamento de recursos.
- Inventário, armazenamento e fabricação.
- Construção livre de estruturas e bases.
- Fixação com parafusos, porcas, arruelas, pregos, soldagem e encaixes.
- Ferramentas como martelos, chaves, furadeiras e equipamentos de solda.
- Engenharia mecânica com motores, engrenagens, eixos, volantes, rodas, polias, correias, correntes, cordas e alavancas.
- Energia com geradores, baterias, fios, postes, interruptores e consumidores.
- Sobrevivência, ciclo normal de dia/noite, ameaças ambientais e zumbis.

## Documentação

- [Especificação técnica 1.0](docs/ESPECIFICACAO-TECNICA.md): decisões aprovadas, arquitetura, sistemas, regras e escopo.
- [Roadmap de desenvolvimento](docs/ROADMAP.md): marcos, tarefas e critérios de conclusão.

## Estado atual

A direção do projeto 3D está especificada, mas a fundação 3D ainda precisa ser implementada e validada.

O repositório ainda contém um protótipo experimental 2D em HTML/CSS/JavaScript, criado antes da decisão de migrar para 3D. **Esse protótipo é legado e não representa a arquitetura aprovada do jogo.** Ele foi preservado para referência; a próxima etapa é criar e validar a fundação Godot + Rust, sem tratar o código 2D como base definitiva.

## Próximo marco

Validar no Linux:
1. Projeto mínimo Godot 4 em 3D.
2. Biblioteca Rust integrada via GDExtension.
3. Compilação e execução reproduzíveis.
4. Uma cena de teste com personagem e câmeras em primeira e terceira pessoa.

## Princípios

- Single-player na primeira versão; sem bots simulando jogadores.
- Jogo planejado para funcionar offline.
- Sistemas funcionais, não apenas objetos decorativos.
- Recursos precisam ser encontrados, extraídos ou fabricados.
- Construção livre, com consequências físicas coerentes.
- Dependências e versões controladas.
- Entregas jogáveis e verificáveis em cada marco.

## Licença

A definir.
