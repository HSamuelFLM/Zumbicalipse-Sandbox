# Zumbicalipse Sandbox

Jogo 3D de sobrevivência single-player, com mundo grande e procedural, exploração, coleta de recursos, fabricação, construção livre e engenharia funcional.

**Plataformas-alvo:** Windows 10/11 x86_64 e Linux x86_64  
**Stack:** Godot 4.7.2 Standard + Rust (godot-rust 0.5.5 / GDExtension API 4.7)  
**Visual:** 3D low-poly detalhado  
**Perspectiva:** alternância entre primeira e terceira pessoa

## Estado do projeto

A especificação e o roadmap estão registrados. A fundação Godot 3D + Rust está no repositório, com cena inicial, personagem placeholder, movimentação com aceleração, alternância de câmera, interação por mira e coleta de madeira/pedra em uma área de teste. A ponte nativa Rust está estruturada, aguardando validação em runtime. Os sistemas completos de sobrevivência, mundo procedural, escavação, inventário, construção e engenharia ainda serão implementados.

O protótipo experimental 2D em HTML/CSS/JavaScript foi removido. A partir desta versão, o repositório contém somente a linha de desenvolvimento 3D.

## Documentação

- [Especificação técnica](docs/ESPECIFICACAO-TECNICA.md)
- [Roadmap de desenvolvimento](docs/ROADMAP.md)
- [Ambiente e comandos de desenvolvimento](docs/DEVELOPMENT.md)

## Estrutura

- `project.godot`: projeto Godot.
- `scenes/`: cenas 3D.
- `scripts/`: lógica de apresentação e controles em GDScript.
- `rust/crates/game_core/`: núcleo nativo em Rust.
- `zumbicalipse.gdextension`: caminhos das bibliotecas nativas Windows/Linux.
- `.github/workflows/ci.yml`: validação contínua Rust nas duas plataformas.

## Compilar

Instale Godot 4.7.2 Standard, Rust stable (mínimo 1.94) e as ferramentas de compilação da plataforma.

Windows (PowerShell):

```powershell
cargo build --manifest-path rust/Cargo.toml
godot --editor --path .
```

Linux:

```bash
cargo build --manifest-path rust/Cargo.toml
godot --editor --path .
```

Para instruções completas, consulte [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Controles atuais

- WASD: movimentar.
- Mouse: olhar ao redor.
- Espaço: pular.
- Shift: sprint.
- V: alternar primeira/terceira pessoa.
- E: coletar madeira e pedra quando estiver mirando em um recurso próximo.
- Escape: liberar o mouse; clique na janela para capturá-lo novamente.

## Próximo marco

Validar a abertura do projeto e o carregamento da extensão Rust em Godot 4.7.2 no Windows e no Linux. A CI já verifica compilação, formatação e testes Rust nos dois sistemas.
