(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const partCount = document.getElementById("partCount");
  const selectionLabel = document.getElementById("selectionLabel");
  const emptyInspector = document.getElementById("emptyInspector");
  const partInspector = document.getElementById("partInspector");
  const motorButton = document.getElementById("motorButton");
  const motorState = document.getElementById("motorState");

  const definitions = {
    block: { name: "Bloco de madeira", description: "Peça estrutural para plataformas e suportes.", w: 76, h: 24, mass: 2, color: "#a8794e" },
    wheel: { name: "Roda", description: "Componente circular para locomoção e mecanismos.", r: 22, mass: 1.5, color: "#9ca79b" },
    gear: { name: "Engrenagem", description: "Transmissão experimental. O encaixe entre dentes será implementado na próxima etapa.", r: 23, mass: 1.8, color: "#c0c77b" },
    motor: { name: "Motor", description: "Fonte de rotação para testar movimento mecânico.", w: 48, h: 38, mass: 3, color: "#c47d48" },
    rope: { name: "Corda", description: "Representação visual inicial de uma conexão flexível; ainda sem simulação de tensão.", w: 88, h: 5, mass: 0.2, color: "#d1b47c" }
  };

  let objects = [];
  let selected = null;
  let dragging = false;
  let motorOn = false;
  let lastTime = 0;
  let world = { width: 1000, height: 620, ground: 540 };
  const player = { x: 170, y: 475, vx: 0, vy: 0, w: 25, h: 48, grounded: false, facing: 1 };
  const keys = new Set();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    world.width = rect.width;
    world.height = rect.height;
    world.ground = rect.height - 52;
  }

  function addPart(type, x, y) {
    const def = definitions[type];
    if (!def) return;
    const obj = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()), type, x, y, angle: 0, vx: 0, vy: 0, omega: 0, ...def };
    objects.push(obj);
    select(obj);
    updateCount();
  }

  function select(obj) {
    selected = obj;
    emptyInspector.hidden = !!obj;
    partInspector.hidden = !obj;
    document.querySelectorAll(".part-button").forEach(button => button.classList.remove("active"));
    if (obj) {
      document.getElementById("inspectName").textContent = obj.name;
      document.getElementById("inspectDescription").textContent = obj.description;
      document.getElementById("inspectPreview").textContent = obj.type === "gear" ? "⚙" : obj.type === "motor" ? "ϟ" : obj.type === "wheel" ? "◉" : obj.type === "rope" ? "⌁" : "▰";
      selectionLabel.textContent = obj.name.toUpperCase();
      const button = document.querySelector('[data-part="' + obj.type + '"]');
      if (button) button.classList.add("active");
    } else {
      selectionLabel.textContent = "NENHUMA PEÇA SELECIONADA";
    }
    updateInspector();
  }

  function updateInspector() {
    if (!selected) return;
    document.getElementById("inspectX").textContent = Math.round(selected.x);
    document.getElementById("inspectY").textContent = Math.round(selected.y);
    document.getElementById("inspectRotation").textContent = Math.round(selected.angle * 180 / Math.PI) + "°";
  }

  function updateCount() {
    partCount.textContent = objects.length + (objects.length === 1 ? " PEÇA" : " PEÇAS");
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function hitTest(point, obj) {
    const dx = point.x - obj.x;
    const dy = point.y - obj.y;
    const c = Math.cos(-obj.angle), s = Math.sin(-obj.angle);
    const lx = dx * c - dy * s, ly = dx * s + dy * c;
    if (obj.r) return Math.hypot(lx, ly) <= obj.r + 5;
    return Math.abs(lx) <= obj.w / 2 + 5 && Math.abs(ly) <= Math.max(obj.h / 2, 7) + 5;
  }

  canvas.addEventListener("pointerdown", event => {
    const point = pointerPosition(event);
    const hit = [...objects].reverse().find(obj => hitTest(point, obj));
    if (hit) {
      select(hit);
      dragging = true;
      canvas.setPointerCapture(event.pointerId);
    } else {
      select(null);
    }
  });
  canvas.addEventListener("pointermove", event => {
    if (!dragging || !selected) return;
    const point = pointerPosition(event);
    selected.x = point.x;
    selected.y = point.y;
    selected.vx = 0;
    selected.vy = 0;
    updateInspector();
  });
  canvas.addEventListener("pointerup", () => { dragging = false; });
  canvas.addEventListener("pointercancel", () => { dragging = false; });

  document.querySelectorAll(".part-button").forEach(button => {
    button.addEventListener("click", () => addPart(button.dataset.part, world.width * 0.52, world.ground - 90));
  });

  function toggleMotor() {
    motorOn = !motorOn;
    motorButton.classList.toggle("on", motorOn);
    motorState.textContent = motorOn ? "Ligado" : "Desligado";
  }
  motorButton.addEventListener("click", toggleMotor);

  document.getElementById("deleteButton").addEventListener("click", () => {
    if (!selected) return;
    objects = objects.filter(obj => obj !== selected);
    select(null);
    updateCount();
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    objects = [];
    motorOn = false;
    motorButton.classList.remove("on");
    motorState.textContent = "Desligado";
    player.x = 170; player.y = world.ground - player.h / 2; player.vx = 0; player.vy = 0;
    select(null);
    updateCount();
    seedScene();
  });

  window.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
    keys.add(key);
    if (key === "r" && selected) { selected.angle += Math.PI / 12; updateInspector(); }
    if (["1","2","3","4","5"].includes(key)) {
      const type = ({ "1":"block", "2":"wheel", "3":"gear", "4":"motor", "5":"rope" })[key];
      addPart(type, world.width * 0.52, world.ground - 90);
    }
    if (key === "delete" || key === "backspace") document.getElementById("deleteButton").click();
  });
  window.addEventListener("keyup", event => keys.delete(event.key.toLowerCase()));
  window.addEventListener("blur", () => keys.clear());
  window.addEventListener("resize", resize);

  function seedScene() {
    addPart("block", world.width * 0.53, world.ground - 14);
    addPart("wheel", world.width * 0.53 - 60, world.ground - 44);
    addPart("motor", world.width * 0.53 + 80, world.ground - 35);
    select(null);
  }

  function update(dt) {
    const direction = (keys.has("d") || keys.has("arrowright") ? 1 : 0) - (keys.has("a") || keys.has("arrowleft") ? 1 : 0);
    player.vx += direction * 850 * dt;
    player.vx *= Math.pow(0.001, dt);
    player.vx = Math.max(-190, Math.min(190, player.vx));
    if (direction) player.facing = direction;
    if ((keys.has("w") || keys.has("arrowup") || keys.has(" ")) && player.grounded) {
      player.vy = -390;
      player.grounded = false;
    }
    player.vy += 980 * dt;
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    player.x = Math.max(player.w / 2, Math.min(world.width - player.w / 2, player.x));
    if (player.y + player.h / 2 >= world.ground) {
      player.y = world.ground - player.h / 2;
      player.vy = 0;
      player.grounded = true;
    }

    for (const obj of objects) {
      if (obj === selected && dragging) continue;
      if (obj.type === "rope") continue;
      if (obj.type === "motor" && motorOn) obj.omega = 3.4;
      else if (obj.type === "wheel" && motorOn && Math.abs(obj.x - world.width * 0.53) < 130) obj.omega = 2.3;
      else obj.omega *= Math.pow(0.04, dt);
      obj.angle += obj.omega * dt;
      const halfH = obj.r || obj.h / 2;
      if (obj.y + halfH > world.ground && obj.type !== "motor") {
        obj.y = world.ground - halfH;
        obj.vy = 0;
      }
    }
    updateInspector();
  }

  function drawBackground() {
    const w = world.width, h = world.height;
    ctx.fillStyle = "#202923"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(154,177,151,.07)"; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for (let y = 0; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    ctx.fillStyle = "#303b32"; ctx.fillRect(0, world.ground, w, h - world.ground);
    ctx.fillStyle = "#68745d"; ctx.fillRect(0, world.ground, w, 3);
    ctx.strokeStyle = "#53604e"; ctx.lineWidth = 2;
    for (let x = 12; x < w; x += 42) { ctx.beginPath(); ctx.moveTo(x,world.ground+12); ctx.lineTo(x+13,world.ground+12); ctx.stroke(); }
    ctx.fillStyle = "rgba(210,224,200,.45)"; ctx.font = "9px monospace"; ctx.fillText("BASE TEMPORÁRIA // SETOR 04", 18, 25);
    ctx.fillStyle = "rgba(210,224,200,.3)"; ctx.fillText("ZONA SEGURA", Math.max(18,w-100), 25);
    // distant ruined skyline
    ctx.fillStyle = "#28332c";
    for (let i=0;i<7;i++){const bx=(i*173+35)%(w+70);const bh=55+(i*37)%95;ctx.fillRect(bx,world.ground-bh-12,38,bh);ctx.fillRect(bx+8,world.ground-bh+8-12,6,8);ctx.fillRect(bx+23,world.ground-bh+26-12,6,8);}
  }

  function drawPart(obj) {
    ctx.save();
    ctx.translate(obj.x, obj.y);
    ctx.rotate(obj.angle);
    if (obj.type === "wheel" || obj.type === "gear") {
      ctx.beginPath(); ctx.arc(0,0,obj.r,0,Math.PI*2); ctx.fillStyle = "#303a34"; ctx.fill();
      ctx.strokeStyle = obj.color; ctx.lineWidth = obj.type === "gear" ? 7 : 5;
      if (obj.type === "gear") {
        for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*(obj.r-2),Math.sin(a)*(obj.r-2));ctx.lineTo(Math.cos(a)*(obj.r+5),Math.sin(a)*(obj.r+5));ctx.stroke();}
      }
      ctx.beginPath();ctx.arc(0,0,obj.r-5,0,Math.PI*2);ctx.strokeStyle=obj.color;ctx.lineWidth=2;ctx.stroke();
      ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fillStyle=obj.color;ctx.fill();
      ctx.strokeStyle=obj.color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-obj.r+7,0);ctx.lineTo(obj.r-7,0);ctx.moveTo(0,-obj.r+7);ctx.lineTo(0,obj.r-7);ctx.stroke();
    } else if (obj.type === "rope") {
      ctx.strokeStyle=obj.color;ctx.lineWidth=4;ctx.setLineDash([5,3]);ctx.beginPath();ctx.moveTo(-obj.w/2,0);ctx.lineTo(obj.w/2,0);ctx.stroke();ctx.setLineDash([]);
    } else {
      ctx.fillStyle = obj.type === "motor" ? "#6e4932" : "#805a3d";
      ctx.strokeStyle = obj.color;ctx.lineWidth=2;ctx.fillRect(-obj.w/2,-obj.h/2,obj.w,obj.h);ctx.strokeRect(-obj.w/2,-obj.h/2,obj.w,obj.h);
      if(obj.type==="motor"){ctx.fillStyle="#e4a45f";ctx.font="bold 19px sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("ϟ",0,0);}
      else {ctx.strokeStyle="#d0a06b";ctx.beginPath();ctx.moveTo(-obj.w/2+8,0);ctx.lineTo(obj.w/2-8,0);ctx.stroke();}
    }
    if (obj === selected) {
      ctx.strokeStyle="#d6ed8b";ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
      if(obj.r){ctx.beginPath();ctx.arc(0,0,obj.r+12,0,Math.PI*2);ctx.stroke();}
      else {ctx.strokeRect(-obj.w/2-7,-Math.max(obj.h,10)/2-7,obj.w+14,Math.max(obj.h,10)+14);}
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  function drawPlayer() {
    ctx.save();ctx.translate(player.x,player.y);
    ctx.fillStyle="#d0d2bd";ctx.fillRect(-8,-15,16,25);
    ctx.fillStyle="#b7c1ad";ctx.beginPath();ctx.arc(0,-25,10,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#252d27";ctx.fillRect(-8,8,6,16);ctx.fillRect(2,8,6,16);
    ctx.fillStyle="#a4c66a";ctx.fillRect(player.facing*2-2,-28,3,3);
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0,0,world.width,world.height);
    drawBackground();
    objects.forEach(drawPart);
    drawPlayer();
    if (motorOn) {
      ctx.fillStyle="rgba(221,163,92,.8)";ctx.font="9px monospace";
      const motor=objects.find(o=>o.type==="motor");
      if(motor)ctx.fillText("MOTOR ATIVO",motor.x-35,motor.y-30);
    }
  }

  function frame(time) {
    const dt = Math.min((time-lastTime)/1000 || 0, 0.032);
    lastTime = time;
    update(dt);
    render();
    requestAnimationFrame(frame);
  }

  resize();
  seedScene();
  updateCount();
  requestAnimationFrame(frame);
})();