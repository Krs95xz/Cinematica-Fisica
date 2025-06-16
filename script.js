const bolinha = document.getElementById("bolinha");
let anima = false;
let animaStartTime = 0;
var mensagem = document.getElementById("mensagem");
var inputAngulo = document.getElementById("anguloInput");
var radianos = 0;
const vAtual = document.getElementById("VAtual");
var rotuloI = document.getElementById("rotulo-inicio");
const rampa = document.getElementById("rampa");

function rampaDinamica() {
    var anguloTag = document.getElementById("rampa");
    document.getElementById("valorInputAngulo").textContent = `Valor: ${inputAngulo.value} grauº`;
    anguloTag.style.transform = `rotate(${inputAngulo.value}deg)`;
    radianos = parseFloat(inputAngulo.value) * Math.PI / 180;
    rotulosDinamicos();
}

function soltarBolinha() {
    if (anima) {
        return;
    }

    const a = parseFloat(document.getElementById("aceleracaoInput").value);
    const t = parseFloat(document.getElementById("tempoInput").value);
    var s0 = 0;
    const v0 = 0;

    if (isNaN(a) || isNaN(t) || a <= 0 || t <= 0) {
        mensagem.style.display = "block";
        mensagem.textContent = "Por favor, insira valores válidos e positivos para Aceleração e Tempo de Percurso.";
        return;
    } else {
        mensagem.style.display = "none";
        mensagem.textContent = "";
    }

    anima = true;
    animaStartTime = null;

    const rampaY = parseFloat(window.getComputedStyle(rampa).top);
    const rampaX = parseFloat(window.getComputedStyle(rampa).left);

    const s_inicial_ao_longo_rampa = 10;

    const bolinhaHeight = bolinha.offsetHeight;
    const rampaHeight = rampa.offsetHeight;

    const ajusteVerticalBolinhaParaLinha = (rampaHeight / 2) - (bolinhaHeight / 2);

    let xRotacionado = s_inicial_ao_longo_rampa * Math.cos(radianos);
    let yRotacionado = s_inicial_ao_longo_rampa * Math.sin(radianos);

    let inicialX = rampaX + xRotacionado + (s_inicial_ao_longo_rampa * 4);
    let inicialY;
    if (inputAngulo.value <= 12) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha - 9;
    } else if (inputAngulo.value <= 16) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha - 1;
    } else if (inputAngulo.value <= 22) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 2;
    } else if (inputAngulo.value <= 27) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 7;
    } else if (inputAngulo.value <= 31) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 11;
    } else if (inputAngulo.value <= 36) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 17;
    } else if (inputAngulo.value <= 40) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 21;
    } else if (inputAngulo.value <= 45) {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 29;
    } else {
        inicialY = rampaY + yRotacionado + ajusteVerticalBolinhaParaLinha + 36;
    }
    bolinha.style.left = inicialX + "px";
    bolinha.style.top = inicialY + "px";

    if (vAtual) {
        vAtual.textContent = "0.00";
    }

    function mover(currentTime) {
        if (!animaStartTime) {
            animaStartTime = currentTime;
        }

        const tempoD = (currentTime - animaStartTime) / 1000;

        if (tempoD >= t) {
            anima = false;

            const s = s0 + (v0 * t) + (0.5 * a * Math.pow(t, 2));

            const finalX = inicialX + s * Math.cos(angulo);
            const finalY = inicialY + s * Math.sin(angulo);
            bolinha.style.left = finalX + "px";
            bolinha.style.top = finalY + "px";

            const v = v0 + a * t;
            console.log(`[FIM] Velocidade Final (V = V0 + a*t): ${v.toFixed(2)} m/s`);

            const vM = s / t;
            console.log(`[FIM] Velocidade Média (V = ΔS / Δt): ${vM.toFixed(2)} m/s`);

            const vT = Math.sqrt(Math.pow(v0, 2) + (2 * a * s));
            console.log(`[FIM] Velocidade Final (Torricelli): ${vT.toFixed(2)} m/s`);

            if (vAtual) {
                vAtual.textContent = v.toFixed(2);
            }

            return;
        }

        const sAtual = s0 + (v0 * tempoD) + (0.5 * a * Math.pow(tempoD, 2));
        const s = s0 + (v0 * t) + (0.5 * a * Math.pow(t, 2));
        document.getElementById("posicao").textContent = `Posição final: ${s} m`

        const novoX = inicialX + sAtual * Math.cos(radianos);
        const novoY = inicialY + sAtual * Math.sin(radianos);

        bolinha.style.left = novoX + "px";
        bolinha.style.top = novoY + "px";

        requestAnimationFrame(mover);
    }

    requestAnimationFrame(mover);
}

function rotulosDinamicos() {
    var tamanhoR = parseFloat(window.getComputedStyle(rampa).width);

    var alturaF = tamanhoR * Math.sin(radianos);

    if (rotuloI) {
        rotuloI.textContent = "Início (0 m)";
    }
}

inputAngulo.addEventListener("input", rampaDinamica)
rampaDinamica();