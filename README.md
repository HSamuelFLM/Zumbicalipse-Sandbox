# Zumbicalipse Sandbox

Jogo 3D de sobrevivência single-player, com mundo grande e procedural, exploração, coleta de recursos, fabricação, construção livre e engenharia funcional.

**Plataforma inicial:** PC Linux x86_64  
**Stack inicial:** Godot 4.7.2 + Rust (godot-rust 0.5.5 / GDExtension API 4.7)  
**Visual:** 3D low-poly detalhado  
**Perspectiva:** alternância entre primeira e terceira pessoa

## Estado do projeto

A direção e a especificação técnica estão documentadas. A fundação inicial Godot 3D + Rust está sendo preparada; os sistemas completos de sobrevivência, mundo procedural, escavação, construção e engenharia ainda não foram implementados.

O repositório preserva um protótipo experimental 2D em HTML/CSS/JavaScript, criado antes da decisão de migrar para 3D. Esse protótipo é legado e não é a arquitetura do jogo final.

## Documentação

- [Especificação técnica](docs/ESPECIFICACAO-TECNICA.md)
- [Roadmap de desenvolvimento](docs/ROADMAP.md)
- [Ambiente e comandos de desenvolvimento](docs/DEVELOPMENT.md)

## Fundação 3D

A raiz do repositório contém o projeto Godot. A extensão Rust fica em `rust/`.

```bash
cargo build --manifest-path rust/Cargo.toml
godot --editor --path .
```

Consulte [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) para dependências, execução e solução de problemas.

## Controles do protótipo

- WASD: movimentar.
- Mouse: olhar ao redor.
- Espaço: pular.
- Shift: sprint.
- V: alternar primeira/terceira pessoa.
- Escape: liberar o mouse; clique na janela para capturá-lo novamente.

## Próximo marco

Validar a compilação e o carregamento da extensão Rust em Godot 4.7.x no Linux antes de iniciar a implementação dos sistemas de jogo.
