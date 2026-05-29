export const ecgCases = [
  {
    id: "ecg-classic-01",
    title: "ECG Normal - Passo a Passo Clássico",
    description: "Um eletrocardiograma dentro dos padrões de normalidade para treinar a leitura sistematizada.",
    difficulty: 2,
    image: "/imagens/ECG_BASICO/ecg_normal.png",
    steps: [
      {
        id: "step_anamnese",
        title: "0. Anamnese do Paciente",
        question: "Você atende o Sr. João, 45 anos, assintomático, realizando exame admissional. Ele relata prática regular de exercícios. Qual o próximo passo antes da leitura do traçado?",
        options: [
          { label: "Correlacionar com a clínica e preparar para leitura sistemática", value: "sistematica" },
          { label: "Liberar o paciente imediatamente sem laudar", value: "liberar" },
          { label: "Encaminhar para cateterismo de urgência", value: "cateterismo" }
        ],
        correctAnswer: "sistematica",
        explanation: "Em todo ECG, a clínica é soberana. Saber que o paciente (João) é jovem e atleta assintomático nos ajuda a prever e interpretar achados que poderiam ser patológicos em outros contextos. A leitura sistemática deve sempre se seguir."
      },
      {
        id: "step_identificacao",
        title: "1. Identificação e Calibração",
        question: "Verifique a calibração padrão deste ECG. Ela está adequada para a leitura?",
        options: [
          { label: "Sim, padrão N (10 mm/mV) e 25 mm/s", value: "sim_padrao" },
          { label: "Não, a voltagem está em 5 mm/mV", value: "nao_voltagem" },
          { label: "Não, a velocidade está em 50 mm/s", value: "nao_velocidade" }
        ],
        correctAnswer: "sim_padrao",
        explanation: "A calibração padrão de um ECG é a velocidade do papel a 25 mm/s e a amplitude (voltagem) a 10 mm/mV (geralmente representada por um retângulo de 10mm de altura no início do traçado)."
      },
      {
        id: "step_ritmo",
        title: "2. Análise do Ritmo",
        question: "Qual é o ritmo cardíaco predominante neste traçado?",
        options: [
          { label: "Ritmo Sinusal", value: "sinusal" },
          { label: "Fibrilação Atrial", value: "fa" },
          { label: "Ritmo Juncional", value: "juncional" }
        ],
        correctAnswer: "sinusal",
        explanation: "Para ser considerado Ritmo Sinusal, devemos identificar: Ondas P positivas em D1, D2 e aVF; cada onda P precedendo um complexo QRS; e o intervalo RR regular (ou com variação fisiológica).",
        guidedChecklist: [
          { 
            id: "ritmo_1", 
            label: "Achei ondas P antes dos complexos QRS", 
            explanation: "Excelente. Isso indica que o estímulo elétrico está nascendo nos átrios, garantindo a despolarização atrial antes da contração ventricular." 
          },
          { 
            id: "ritmo_2", 
            label: "As ondas P estão positivas em D1, D2 e aVF", 
            explanation: "Perfeito! Como essas derivações 'olham' o coração por baixo e pela esquerda, uma P positiva significa que o vetor está descendo da direita para a esquerda (exatamente onde fica o Nó Sinusal)." 
          },
          { 
            id: "ritmo_3", 
            label: "O intervalo entre os R-R é constante", 
            explanation: "Ritmos sinusais costumam ser regulares. Como você confirmou os 3 passos, parabéns: O ritmo é indubitavelmente Sinusal!" 
          }
        ]
      },
      {
        id: "step_frequencia",
        title: "3. Frequência Cardíaca",
        question: "Qual a estimativa da frequência cardíaca aproximada?",
        options: [
          { label: "Aproximadamente 45 bpm", value: "45" },
          { label: "Aproximadamente 75 bpm", value: "75" },
          { label: "Aproximadamente 120 bpm", value: "120" }
        ],
        correctAnswer: "75",
        explanation: "Divida 300 pelo número de 'quadradões' entre duas ondas R (300 / 4 = 75) ou 1500 pelo número de 'quadradinhos'. O valor de 75 bpm é normal (60-100 bpm)."
      },
      {
        id: "step_eixo",
        title: "4. Eixo Elétrico",
        question: "Como está o eixo elétrico (QRS) no plano frontal?",
        options: [
          { label: "Desvio para a Esquerda", value: "esquerda" },
          { label: "Eixo Normal", value: "normal" },
          { label: "Desvio para a Direita", value: "direita" }
        ],
        correctAnswer: "normal",
        explanation: "O eixo é normal (entre -30° e +90°) quando o complexo QRS é predominantemente positivo em D1 e aVF.",
        guidedChecklist: [
          { 
            id: "eixo_1", 
            label: "Olhei para a derivação D1: O complexo QRS é mais positivo do que negativo.", 
            explanation: "Correto! Se o QRS é positivo em D1, significa que o vetor elétrico principal está apontando para o lado esquerdo do paciente (entre -90° e +90°)." 
          },
          { 
            id: "eixo_2", 
            label: "Olhei para a derivação aVF: O complexo QRS também é positivo.", 
            explanation: "Ótimo! Se aVF é positivo, o vetor aponta para baixo (entre 0 e +180°)." 
          },
          { 
            id: "eixo_3", 
            label: "Juntei as duas informações.", 
            explanation: "Se aponta para a esquerda (D1+) e para baixo (aVF+), a intersecção é o quadrante inferior esquerdo (entre 0 e +90°). Portanto, Eixo Normal!" 
          }
        ]
      },
      {
        id: "step_qrs",
        title: "5. Complexo QRS",
        question: "Qual a duração e a morfologia dos complexos QRS?",
        options: [
          { label: "Estreito (< 120ms) e morfologia normal", value: "normal" },
          { label: "Largo (> 120ms) com padrão de bloqueio de ramo", value: "largo" },
          { label: "Alternância elétrica", value: "alternancia" }
        ],
        correctAnswer: "normal",
        explanation: "Os complexos QRS são estreitos, indicando que a despolarização ventricular ocorre rapidamente pelo sistema de condução especializado (His-Purkinje), o que é normal.",
        hint: {
          title: "Mnemônico: Orelhas de Coelho 🐰",
          text: "Lembra dos padrões de Bloqueio de Ramo? Quando o QRS é largo (>120ms) em V1/V2 e forma uma letra 'M' (RSR'), nós chamamos de 'Orelhas de Coelho', clássico do Bloqueio de Ramo Direito (BRD). Aqui, como o QRS é estreito, o coelho não apareceu!"
        }
      },
      {
        id: "step_intervalos",
        title: "6. Intervalos PR e QT",
        question: "Como estão os intervalos de condução (PR e QT)?",
        options: [
          { label: "PR longo e QT normal", value: "pr_longo" },
          { label: "Ambos dentro do limite normal", value: "normais" },
          { label: "PR curto", value: "pr_curto" }
        ],
        correctAnswer: "normais",
        explanation: "O intervalo PR normal dura entre 3 a 5 quadradinhos (120-200 ms). O QT deve ser menor que a metade do intervalo RR precedente."
      },
      {
        id: "step_sobrecargas",
        title: "7. Pesquisa de Sobrecargas",
        question: "Há algum sinal de sobrecarga atrial ou hipertrofia ventricular?",
        options: [
          { label: "Sim, há indícios de hipertrofia de VE", value: "hve" },
          { label: "Não há critérios para sobrecargas ou hipertrofias", value: "nenhuma" },
          { label: "Sim, há sobrecarga atrial esquerda", value: "sae" }
        ],
        correctAnswer: "nenhuma",
        explanation: "Onda P com duração < 120ms e amplitude < 2,5mm afasta sobrecargas atriais. Voltagem de QRS sem critério de Sokolow-Lyon ou Cornell normal afasta hipertrofia ventricular."
      }
    ]
  }
];
