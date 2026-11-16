extends StaticBody3D

@export var resource_id: StringName = &"wood"
@export var amount: int = 1

func _ready() -> void:
    collision_layer = 1
    collision_mask = 1
    if resource_id == &"wood":
        _build_tree()
    else:
        _build_rock()

func interact(player: Node) -> void:
    if player.has_method("collect_resource"):
        player.call("collect_resource", resource_id, amount)
        queue_free()

func _build_tree() -> void:
    var trunk := MeshInstance3D.new()
    var trunk_mesh := CylinderMesh.new()
    trunk_mesh.top_radius = 0.16
    trunk_mesh.bottom_radius = 0.23
    trunk_mesh.height = 1.8
    trunk.mesh = trunk_mesh
    trunk.position.y = 0.9
    var trunk_material := StandardMaterial3D.new()
    trunk_material.albedo_color = Color(0.30, 0.19, 0.11)
    trunk.material_override = trunk_material
    add_child(trunk)

    var crown := MeshInstance3D.new()
    var crown_mesh := SphereMesh.new()
    crown_mesh.radius = 0.9
    crown_mesh.height = 1.8
    crown.mesh = crown_mesh
    crown.position.y = 2.15
    var crown_material := StandardMaterial3D.new()
    crown_material.albedo_color = Color(0.19, 0.36, 0.20)
    crown.material_override = crown_material
    add_child(crown)

    var collision := CollisionShape3D.new()
    var shape := CapsuleShape3D.new()
    shape.radius = 0.42
    shape.height = 2.8
    collision.shape = shape
    collision.position.y = 1.35
    add_child(collision)

func _build_rock() -> void:
    var rock := MeshInstance3D.new()
    var rock_mesh := SphereMesh.new()
    rock_mesh.radius = 0.62
    rock_mesh.height = 1.0
    rock.mesh = rock_mesh
    rock.scale = Vector3(1.25, 0.85, 1.0)
    rock.position.y = 0.42
    var rock_material := StandardMaterial3D.new()
    rock_material.albedo_color = Color(0.36, 0.39, 0.40)
    rock_material.roughness = 1.0
    rock.material_override = rock_material
    add_child(rock)

    var collision := CollisionShape3D.new()
    var shape := SphereShape3D.new()
    shape.radius = 0.68
    collision.shape = shape
    collision.position.y = 0.48
    add_child(collision)
