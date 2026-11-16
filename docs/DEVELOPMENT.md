# Ambiente de desenvolvimento — Linux

## Versões fixadas

- Godot Engine **4.7.2 stable**, edição Standard (não .NET).
- Rust **stable**, edição 2024.
- godot-rust **0.5.5**, API GDExtension **4.7**.

A extensão é compilada contra a API 4.7. Use Godot 4.7.x para executar este checkout. Não use Godot 4.8 beta/dev neste estágio.

## Dependências

Instale Godot 4.7.2 Standard para Linux x86_64, Rust via rustup e as ferramentas de compilação C/C++ e linker da sua distribuição.

Verifique:

```bash
godot --version
rustc --version
cargo --version
```

Em algumas distribuições o executável pode chamar-se `godot4`.

## Compilar a extensão Rust

Na raiz do repositório:

```bash
cargo build --manifest-path rust/Cargo.toml
```

Build otimizada:

```bash
cargo build --release --manifest-path rust/Cargo.toml
```

Bibliotecas geradas:
- Debug: `rust/target/debug/libzumbicalipse_core.so`
- Release: `rust/target/release/libzumbicalipse_core.so`

## Abrir e executar

```bash
godot --editor --path .
godot --path .
```

O protótipo inicial inclui chão e iluminação 3D, personagem placeholder, movimentação WASD, pulo, sprint, mouse look e alternância de perspectiva com V. Escape libera o mouse; clique na janela para capturá-lo novamente.

A HUD informa se a extensão Rust foi carregada. Sem a biblioteca compilada, a cena continua abrindo e mostra uma mensagem de orientação.

## Verificações

```bash
cargo fmt --manifest-path rust/Cargo.toml --all -- --check
cargo check --manifest-path rust/Cargo.toml --workspace
cargo test --manifest-path rust/Cargo.toml --workspace
```

## Problemas comuns

- **Rust não carregado:** compile a extensão e confirme que o arquivo `.so` existe no caminho indicado em `zumbicalipse.gdextension`.
- **Extensão não encontrada:** use Godot 4.7.x x86_64 e biblioteca Linux x86_64.
- **Erro de linker:** instale o linker e as ferramentas de compilação da distribuição.
- **Mudança de versão:** mantenha `api-4-7` e Godot 4.7.x juntos até validar uma atualização.

## Limites desta fundação

Isto é uma base técnica inicial, não uma versão completa do jogo. Geração procedural, escavação, inventário, crafting, zumbis, construção e simulação mecânica/elétrica ainda serão implementados nos marcos definidos no roadmap.
