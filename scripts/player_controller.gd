extends CharacterBody3D

signal resource_collected(resource_id: StringName, amount: int)

@export var walk_speed: float = 4.5
@export var sprint_speed: float = 7.5
@export var jump_velocity: float = 4.5
@export var mouse_sensitivity: float = 0.0025
@export var ground_acceleration: float = 24.0
@export var ground_friction: float = 28.0
@export var air_acceleration: float = 8.0
@export var interaction_distance: float = 3.5

@onready var camera_pivot: Node3D = $CameraPivot
@onready var first_person_camera: Camera3D = $CameraPivot/FirstPersonCamera
@onready var third_person_camera: Camera3D = $CameraPivot/ThirdPersonArm/ThirdPersonCamera
@onready var body_mesh: MeshInstance3D = $BodyMesh

var _is_first_person := true
var _gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")

func _ready() -> void:
    first_person_camera.make_current()
    body_mesh.visible = false

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseButton and event.pressed and Input.mouse_mode == Input.MOUSE_MODE_VISIBLE:
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

    if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
        rotate_y(-event.relative.x * mouse_sensitivity)
        camera_pivot.rotate_x(-event.relative.y * mouse_sensitivity)
        camera_pivot.rotation.x = clampf(camera_pivot.rotation.x, deg_to_rad(-85.0), deg_to_rad(85.0))

    if event.is_action_pressed("toggle_camera"):
        _toggle_camera()

    if event.is_action_pressed("interact"):
        _try_interact()

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y -= _gravity * delta
    elif Input.is_action_just_pressed("jump"):
        velocity.y = jump_velocity

    var input_vector := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var move_direction := (global_basis * Vector3(input_vector.x, 0.0, input_vector.y)).normalized()
    var current_speed := sprint_speed if Input.is_action_pressed("sprint") else walk_speed
    var target_horizontal := move_direction * current_speed
    var horizontal_velocity := Vector3(velocity.x, 0.0, velocity.z)
    var acceleration := ground_acceleration if is_on_floor() else air_acceleration

    if move_direction.length_squared() == 0.0 and is_on_floor():
        acceleration = ground_friction

    horizontal_velocity = horizontal_velocity.move_toward(target_horizontal, acceleration * delta)
    velocity.x = horizontal_velocity.x
    velocity.z = horizontal_velocity.z
    move_and_slide()

func _try_interact() -> void:
    var active_camera := first_person_camera if _is_first_person else third_person_camera
    var ray_start := active_camera.global_position
    var ray_end := ray_start + (-active_camera.global_basis.z * interaction_distance)
    var query := PhysicsRayQueryParameters3D.create(ray_start, ray_end)
    query.exclude = [get_rid()]
    var hit := get_world_3d().direct_space_state.intersect_ray(query)

    if hit.is_empty():
        return

    var target: Object = hit.get("collider")
    if target != null and target.has_method("interact"):
        target.call("interact", self)

func collect_resource(resource_id: StringName, amount: int) -> void:
    resource_collected.emit(resource_id, amount)

func _notification(what: int) -> void:
    if what == NOTIFICATION_APPLICATION_FOCUS_OUT:
        Input.mouse_mode = Input.MOUSE_MODE_VISIBLE

func _toggle_camera() -> void:
    _is_first_person = not _is_first_person
    if _is_first_person:
        first_person_camera.make_current()
        body_mesh.visible = false
    else:
        third_person_camera.make_current()
        body_mesh.visible = true
