# Diretrizes para Criação de Casos Clínicos (Sala de Parto)

Este documento descreve a estrutura, metadados e lógica estocástica para a criação de novos cenários clínicos no módulo de Sala de Parto (Diretriz SBP 2022). 

---

## ⚡ Filosofia de Design Estocástico
Ao contrário do modelo rígido e linear anterior, os novos casos clínicos funcionam com base em **probabilidades e respostas dinâmicas**.
* **Fator Replay**: Se o aluno realizar as condutas 100% perfeitamente, o caso ainda possui uma pequena chance de complicar ou exigir mais ciclos de reanimação, simulando a biologia real.
* **Metadados Granulares**: Cada caso pode ditar sua gravidade de retorno através do `roscTargetCycle` e multiplicadores de chance.

---

## 📁 Estrutura de Metadados do Caso Clínico (JSON)

Ao cadastrar um caso em `src/data/scenarios/sala-de-parto/salaDePartoRegistry.js`, a estrutura do objeto deve conter:

```javascript
{
  id: 'parto_002_asfixia_grave', // ID único do caso
  title: "Caso 002 - Asfixia Perinatal Grave com Mecônio",
  difficulty: 5, // Escala de 1 a 5
  description: "Trabalho de parto induzido, gestação a termo, líquido amniótico meconial espesso e sinais de sofrimento fetal.",
  category: "Pediatria",
  gestationalAge: 39, // Idade gestacional em semanas

  // Dados da Mãe (Anamnese)
  mother: {
    age: 29,
    parity: "G2P1",
    riskFactors: ["Líquido meconial espesso", "Cardiotocografia categoria III"],
    prenatalCare: "8 consultas",
    corticosteroids: "Não indicado",
    gbsStatus: "Negativo"
  },

  // Dados do Bebê na Apresentação
  neonatalData: {
    initialTone: "hipotônico", // 'hipotônico' ou 'vigoroso'
    cryingOrBreathing: false,
    initialHeartRate: 50, // FC com a qual o bebê nasce
    respPattern: "apneia", // 'apneia', 'gasping' ou 'regular'
    isVigoroso: false,
    meconium: true, // Presença de mecônio
    responseToTactile: false // Resposta ao estímulo tátil inicial
  },

  // --- NOVOS CAMPOS DINÂMICOS E ESTOCÁSTICOS (MIXED MODEL) ---
  
  // Alvo de ciclos de VPP bem-sucedidos necessários para a estabilização completa (FC > 100 bpm)
  // Caso omitido, o sistema usará o fallback resiliente: 2 ciclos.
  roscTargetCycle: 3, 

  // Modificadores estocásticos que multiplicam a chance de sucesso de cada ciclo
  // Se omitidos, usará o fallback de 1.0 (sem modificação)
  physiologyModifiers: {
    vppSuccessMultiplier: 0.70, // Reduz a eficácia da VPP em 30% (ex: devido a mecônio/resistência pulmonar)
    rcpSuccessMultiplier: 0.65, // Reduz chance de sucesso da RCP e adrenalina
    suddenAsphyxiaRate: 8,      // Chance residual constante de óbito súbito por asfixia a partir da 3ª VPP (8% em vez de 5%)
    rcpSuddenDeathRate: 15      // Chance de óbito súbito a cada ciclo de massagem (15% em vez de 10%)
  },

  // Complicações específicas do caso clínico para Auditoria e Feedback OSCE
  complications: ['meconio_espesso', 'asfixia_grave'],

  // Condutas ideais para pontuação OSCE (Padrão SBP 2022)
  idealActions: {
    teamAssigned: true,
    testedEquipments: true,
    clampingTime: "Imediato", // 'Imediato' (se não vigoroso) ou 'Tardio' (se vigoroso)
    dryNewborn: true,        // TRUE para >=34s, FALSE para <34s (não secar prematuros <34s!)
    plasticWrap: false,      // FALSE para >=34s, TRUE para <34s
    doubleCap: false,        // FALSE para >=34s (touca simples), TRUE para <34s (touca dupla)
    monitoringTimeLimit: 30,
    vppStartTimeLimit: 60,
    blenderO2: 21,           // 21% para >=34s, 30% para <34s
    gasHeated: false         // Aquecimento obrigatório apenas para prematuros <34s
  }
}
```

---

## 📐 Regras e Fórmulas de Sucesso Fisiológico

O motor da Sala de Parto unifica as **Regras SBP Universais** com os **Modificadores do Caso**:

### 1. Sucesso da Ventilação por Pressão Positiva (VPP)
A chance base de sucesso de um ciclo de VPP é determinada por:
* **Técnica Correta**: Dispositivo, PIP (20-25 cmH₂O se NeoPuff), PEEP (5 cmH₂O se NeoPuff), ritmo ("aperta-solta-solta") e frequência corretos.
* **Barreira Térmica Correta (IG < 34s)**: Saco plástico + Touca dupla + Coxim + Sala a 23-25ºC + Berço Radiante ativo.
* **Fórmula**: 
  $$\text{Chance Final} = (\text{Chance Base SBP}) \times (\text{Modificadores Térmicos}) \times (\text{vppSuccessMultiplier del Caso})$$

### 2. Condições de Parada Terminal (Game Over)
* **Hipotermia**: Temperatura axilar $\le 30.0^\circ\text{C}$ induz óbito térmico.
* **Asfixia Tardia**: VPP contínua $\ge 3$ ciclos sem intubação gera óbito.
* **RCP Refratária**: Falha técnica na massagem ou dose/via errada de adrenalina na 2ª massagem gera 100% de óbito. Se tudo feito correto, existe chance de falha real dada pelo `rcpSuddenDeathRate` do caso clínico.

---

## 💡 Melhores Práticas para Criação de Casos
1. **Casos Leves (Termo Vigoroso)**: 
   * Deixe `roscTargetCycle: 1` ou `2`.
   * Não adicione complicadores severos. Multiplicadores = `1.0`.
2. **Casos Graves (Prematuridade extrema ou Asfixia)**:
   * Aumente `roscTargetCycle` para `3` ou `4`.
   * Configure `vppSuccessMultiplier` abaixo de `0.80` para simular má complacência pulmonar pulmonar.
   * Exija via aérea avançada (TET/Máscara Laríngea) para reverter a bradicardia grave.
