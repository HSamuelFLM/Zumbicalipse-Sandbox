use godot::classes::Node;
use godot::prelude::*;

struct ZumbicalipseExtension;

#[gdextension]
unsafe impl ExtensionLibrary for ZumbicalipseExtension {}

/// Minimal native bridge proving that the Godot project can load Rust code.
#[derive(GodotClass)]
#[class(init, base = Node)]
struct ProjectBootstrap {
    base: Base<Node>,
}

#[godot_api]
impl INode for ProjectBootstrap {
    fn ready(&mut self) {
        godot_print!("Zumbicalipse Sandbox: Rust core initialized.");
    }
}

#[godot_api]
impl ProjectBootstrap {
    /// Returns a short diagnostic string for the startup HUD.
    #[func]
    fn runtime_status(&self) -> GString {
        "Rust GDExtension carregada (godot-rust 0.5.5 / API Godot 4.7)".into()
    }
}
