extends Node3D

@onready var status_label: Label = $HUD/Status

func _ready() -> void:
    _initialize_rust_bridge()
    Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _initialize_rust_bridge() -> void:
    if not ClassDB.class_exists("ProjectBootstrap"):
        status_label.text = "Rust: extensão ainda não compilada. Consulte docs/DEVELOPMENT.md."
        push_warning("ProjectBootstrap não está registrado. Compile a extensão Rust.")
        return

    var bridge := ClassDB.instantiate("ProjectBootstrap") as Node
    if bridge == null:
        status_label.text = "Rust: falha ao instanciar a ponte."
        push_error("Não foi possível instanciar ProjectBootstrap.")
        return

    bridge.name = "RustBootstrap"
    add_child(bridge)
    status_label.text = str(bridge.call("runtime_status"))

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventKey and event.pressed and event.keycode == KEY_ESCAPE:
        Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
