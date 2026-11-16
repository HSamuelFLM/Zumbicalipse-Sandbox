extends Node3D

@onready var status_label: Label = $HUD/Status
@onready var resources_label: Label = $HUD/Resources
@onready var player: CharacterBody3D = $Player

var collected_resources: Dictionary = {}

func _ready() -> void:
    player.resource_collected.connect(_on_resource_collected)
    _spawn_test_resources()
    _initialize_rust_bridge()
    Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _spawn_test_resources() -> void:
    _add_resource_node(&"wood", Vector3(0.0, 0.0, -4.0))
    _add_resource_node(&"wood", Vector3(-4.0, 0.0, -7.0))
    _add_resource_node(&"stone", Vector3(3.0, 0.0, -5.0))
    _add_resource_node(&"stone", Vector3(6.0, 0.0, -9.0))

func _add_resource_node(resource_id: StringName, world_position: Vector3) -> void:
    var resource_script := preload("res://scripts/resource_node.gd")
    var resource_node := StaticBody3D.new()
    resource_node.set_script(resource_script)
    resource_node.set("resource_id", resource_id)
    resource_node.position = world_position
    $World.add_child(resource_node)

func _on_resource_collected(resource_id: StringName, amount: int) -> void:
    collected_resources[resource_id] = int(collected_resources.get(resource_id, 0)) + amount
    var wood := int(collected_resources.get(&"wood", 0))
    var stone := int(collected_resources.get(&"stone", 0))
    resources_label.text = "Recursos  |  Madeira: %d  |  Pedra: %d" % [wood, stone]

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
