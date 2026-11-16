# Ambiente de desenvolvimento — Windows e Linux

## Plataformas suportadas

- Windows 10/11 x86_64.
- Linux x86_64 (distribuições com toolchain C/C++ e linker compatíveis).

A configuração da GDExtension inclui bibliotecas para Windows e Linux. Cada plataforma deve compilar sua própria biblioteca nativa; não reutilize o binário de um sistema operacional no outro.

## Versões fixadas

- Godot Engine **4.7.2 stable**, edição Standard (não .NET).
- Rust **stable**, com versão mínima declarada de **1.94**.
- godot-rust **0.5.5**, API GDExtension **4.7**.

Use Godot 4.7.x para executar este checkout e mantenha a API `api-4-7` alinhada com a versão da engine.

## Dependências

### Windows

Instale Godot 4.7.2 Standard, Rust via rustup e Visual Studio Build Tools com a carga de trabalho de ferramentas C++ (MSVC e Windows SDK).

Verifique no PowerShell:

```powershell
godot --version
rustc --version
cargo --version
```

### Linux

Instale Godot 4.7.2 Standard, Rust via rustup e as ferramentas de compilação C/C++ e linker da distribuição.

Verifique:

```bash
godot --version
rustc --version
cargo --version
```

Em algumas distribuições o executável pode chamar-se `godot4`.

## Compilar a extensão Rust

Execute na raiz do repositório em qualquer uma das plataformas:

```bash
cargo build --manifest-path rust/Cargo.toml
cargo build --release --manifest-path rust/Cargo.toml
```

PowerShell aceita os mesmos comandos.

Bibliotecas geradas:

- Windows debug: `rust/target/debug/zumbicalipse_core.dll`
- Windows release: `rust/target/release/zumbicalipse_core.dll`
- Linux debug: `rust/target/debug/libzumbicalipse_core.so`
- Linux release: `rust/target/release/libzumbicalipse_core.so`

A extensão seleciona automaticamente o caminho correspondente ao sistema e à configuração de build por meio de `zumbicalipse.gdextension`.

## Abrir e executar

```bash
godot --editor --path .
godot --path .
```

No Windows, execute os mesmos comandos no PowerShell ou no terminal configurado para localizar o executável Godot.

O protótipo 3D atual inclui chão e iluminação, personagem placeholder, movimentação WASD com aceleração, pulo, sprint, mouse look, alternância de perspectiva com V e coleta de madeira/pedra mirando no recurso e pressionando E. Escape libera o mouse; clique na janela para capturá-lo novamente.

A HUD informa se a extensão Rust foi carregada. Sem a biblioteca compilada, a cena continua abrindo e mostra uma mensagem de orientação.

## Verificações

```bash
cargo fmt --manifest-path rust/Cargo.toml --all -- --check
cargo check --manifest-path rust/Cargo.toml --workspace
cargo test --manifest-path rust/Cargo.toml --workspace
```

Esses comandos também funcionam no PowerShell.

## Integração contínua

O workflow `.github/workflows/ci.yml` executa formatação, verificação e testes Rust em runners Windows e Linux. Isso valida a compilação do núcleo nativo nas duas plataformas; a abertura da cena e o carregamento real da GDExtension ainda precisam ser confirmados localmente com Godot em cada sistema.

## Problemas comuns

- **Rust não carregado:** compile a extensão e confirme se a biblioteca da plataforma existe no caminho indicado em `zumbicalipse.gdextension`.
- **Extensão não encontrada:** confirme arquitetura x86_64, versão Godot 4.7.x e biblioteca do sistema operacional correto.
- **Erro de linker no Windows:** instale Visual Studio Build Tools, MSVC e Windows SDK.
- **Erro de linker no Linux:** instale o linker e as ferramentas de compilação da distribuição.
- **Mudança de versão:** mantenha `api-4-7` e Godot 4.7.x juntos até validar uma atualização.

## Limites desta fundação

Isto é uma base técnica inicial, não uma versão completa do jogo. Geração procedural, escavação, inventário, crafting, zumbis, construção e simulação mecânica/elétrica ainda serão implementados nos marcos definidos no roadmap.
