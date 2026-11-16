extends CharacterBody3D

@export var walk_speed: float = 4.5
@export var sprint_speed: float = 7.5
@export var jump_velocity: float = 4.5
@export var mouse_sensitivity: float = 0.0025

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
    if event is InputEventMouseButton and event.pressed:
        Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

    if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
        rotate_y(-event.relative.x * mouse_sensitivity)
        camera_pivot.rotate_x(-event.relative.y * mouse_sensitivity)
        camera_pivot.rotation.x = clampf(camera_pivot.rotation.x, deg_to_rad(-85.0), deg_to_rad(85.0))

    if event.is_action_pressed("toggle_camera"):
        _toggle_camera()

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y -= _gravity * delta
    elif Input.is_action_just_pressed("jump"):
        velocity.y = jump_velocity

    var input_vector := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var move_direction := (global_basis * Vector3(input_vector.x, 0.0, input_vector.y)).normalized()

    var current_speed := sprint_speed if Input.is_action_pressed("sprint") else walk_speed
    if move_direction.length_squared() > 0.0:
        velocity.x = move_direction.x * current_speed
        velocity.z = move_direction.z * current_speed
    else:
        velocity.x = move_toward(velocity.x, 0.0, current_speed * 8.0 * delta)
        velocity.z = move_toward(velocity.z, 0.0, current_speed * 8.0 * delta)

    move_and_slide()

func _toggle_camera() -> void:
    _is_first_person = not _is_first_person
    if _is_first_person:
        first_person_camera.make_current()
        body_mesh.visible = false
    else:
        third_person_camera.make_current()
        body_mesh.visible = true
