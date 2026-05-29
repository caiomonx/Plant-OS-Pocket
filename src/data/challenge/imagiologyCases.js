// Banco de Dados Diário para o Desafio de Imaginologia
// Utilize a ferramenta `/sandbox/mapper` para gerar as coordenadas.
//
// Convenção de nomes das imagens (em public/imagens/desafio_imagem/):
//   - Radiografia_X_antes  → imagem inicial exibida ao jogador (sem marcações)
//   - Radiografia_X_depois → imagem com achados revelados (pós-resultado)
//   onde X = número do dia (dayId)

export const imagiologyCases = [
    {
      id: "imagiology_001",
      dayId: 1,
      imageUrl: "/imagens/desafio_imagem/Radiografia_1_antes.png",
      imageUrlAfter: "/imagens/desafio_imagem/Radiografia_1_depois.png",
      clinicalCase: "Paciente masculino, 45 anos, apresenta-se no pronto-socorro com tosse produtiva há 3 dias, febre de 38.8°C e dor torácica ventilatório-dependente à direita.",
      explanation: "A radiografia de tórax evidencia opacidades homogêneas bilaterais, compatíveis com consolidação pneumônica em ambos os campos pulmonares.",
      findings: [
        {
          type: "consolidation",
          x: 27.63,
          y: 56.95,
          radius: 6
        },
        {
          type: "consolidation",
          x: 81.82,
          y: 52.96,
          radius: 7
        }
      ]
    },
    {
        id: "imagiology_002",
        dayId: 2,
        imageUrl: "/imagens/desafio_imagem/Radiografia_2_antes.png",
        imageUrlAfter: "/imagens/desafio_imagem/Radiografia_2_depois.png",
        clinicalCase: "Paciente feminina, 20 anos, com dispneia, dor pleurítica e febre há 1 semana.",
        explanation: "Observe que há consolidação na face póstero-inferior do lobo superior direito, imediatamente adjacente à fissura horizontal e na face posterior da fissura oblíqua direita. Não são observadas demais alterações.\n\nLembre-se que consolidação significa que o ar do espaço alveolar foi substituído por algum produto patológico (e.g., exsudato, transudato, sangue, etc).\n\nNesse caso, os achados radiográficos somados aos dados clínicos sugerem o diagnóstico de pneumonia lobar (i.e., quando ocorre consolidação da maior parte de um lobo, ou até de sua totalidade).\n\nDe nota, a forma lobar é a mais comum em infecções bacterianas da comunidade e, por consequência, está classicamente associada ao Streptococcus pneumoniae.",
        findings: [
          {
            type: "consolidation",
            x: 14.91, 
            y: 27.03,
            radius: 4
          },
          {
            type: "consolidation",
            x: 82.1, 
            y: 29.09,
            radius: 4.5
          }
        ]
    },
    {
        id: "imagiology_003",
        dayId: 3,
        imageUrl: "/imagens/desafio_imagem/Radiografia_3_antes.png",
        imageUrlAfter: "/imagens/desafio_imagem/Radiografia_3_depois.png",
        clinicalCase: "Paciente masculino, 25 anos, relata febre há 3-4 dias, com dor localizada no quadrante superior direito do abdômen e mialgia",
        explanation: "Derrame pleural, à direita.\n\nObserve como há um velamento do hemitórax direito, com ocupação do espaço costofrênico e extensa área de opacidade sugerindo a presença de líquido pleural.\n\nCom relação a apresentação clínica, a ocorrência de dor abdominal é um fator confundidor, demonstrando a necessidade de considerar patologias que acometem base de tórax (e.g., pneumonia de bases pulmonares) no diagnóstico diferencial de dor abdominal.\n\nA ocorrência de derrame pleural necessita investigação ampla, com a realização de toracocentese e análise do líquido pleural.",
        findings: [
          {
            "type": "effusion",
            "polygon": [
              { "x": 23.96, "y": 23.19 },
              { "x": 23, "y": 22.09 },
              { "x": 21.91, "y": 21.68 },
              { "x": 20.95, "y": 23.19 },
              { "x": 20.26, "y": 28.27 },
              { "x": 17.8, "y": 36.36 },
              { "x": 16.29, "y": 43.91 },
              { "x": 16.29, "y": 52.83 },
              { "x": 14.37, "y": 64.08 },
              { "x": 13.82, "y": 73 },
              { "x": 14.92, "y": 79.86 },
              { "x": 14.78, "y": 88.23 },
              { "x": 16.15, "y": 94.27 },
              { "x": 17.25, "y": 97.29 },
              { "x": 18.75, "y": 98.52 },
              { "x": 20.26, "y": 97.29 },
              { "x": 19.71, "y": 93.44 },
              { "x": 19.58, "y": 89.19 },
              { "x": 21.5, "y": 84.8 },
              { "x": 23.83, "y": 81.09 },
              { "x": 26.43, "y": 77.94 },
              { "x": 31.09, "y": 75.47 },
              { "x": 35.34, "y": 74.92 },
              { "x": 38.35, "y": 74.78 },
              { "x": 43.42, "y": 75.47 },
              { "x": 45.62, "y": 75.47 },
              { "x": 46.71, "y": 71.63 },
              { "x": 45.07, "y": 69.29 },
              { "x": 43.42, "y": 62.16 },
              { "x": 40.96, "y": 56.67 },
              { "x": 37.67, "y": 51.18 },
              { "x": 32.05, "y": 46.1 },
              { "x": 27.8, "y": 41.85 },
              { "x": 26.02, "y": 40.89 },
              { "x": 23.69, "y": 36.22 },
              { "x": 23.28, "y": 29.5 }
            ]
          }
        ]
    },
    {
        "id": "imagiology_004",
        "dayId": 4,
        "imageUrl": "/imagens/desafio_imagem/Radiografia_4_antes.png",
        "imageUrlAfter": "/imagens/desafio_imagem/Radiografia_4_depois.png",
        "clinicalCase": "Paciente masculino, 60 anos. Sofreu acidente de moto, e queixa-se de dor no peito e muita falta de ar",
        "explanation": "Pneumotórax hipertensivo à esquerda.\n\nNa radiografia, visualiza-se pulmão esquerdo retraído (em verde), com borda pleural bem delimitada e aumento da radiolucência (i.e., transparência) entre o tecido pulmonar e os arcos costais, devido a retração pulmonar e de seus vasos periféricos.\n\nEm relação ao mediastino e a traqueia (em azul), ambos encontram-se com desvio para a direita. Completando os achados, à esquerda, há fratura de terço médio da clavícula (seta) e enfisema subcutâneo (em roxo). Assim, como a presença de fraturas de arcos costais (mas isso é um bônus.) \n\nDe nota, a classificação do pneumotórax hipertensivo apresenta divergências de definição: há referências que prezam pelo componente clínico (i.e., repercussão hemodinâmica e/ou dispnéia grave), e outras pelo componente radiológico (i.e., desvio de traquéia e estruturas mediastinais).\n\nNo nosso caso, ambos estão presentes, ocorre repercussão clínica (o que consideramos como mais importante) e desvio de traquéia/estruturas mediastinais.",
        "findings": [
          {
            "type": "pneumothorax",
            "polygon": [
              { "x": 45.82, "y": 19.42 },
              { "x": 40.6, "y": 28.05 },
              { "x": 41.91, "y": 35.02 },
              { "x": 42.69, "y": 43.81 },
              { "x": 42.56, "y": 53.1 },
              { "x": 45.43, "y": 64.06 },
              { "x": 49.61, "y": 70.53 },
              { "x": 54.96, "y": 75.67 },
              { "x": 58.1, "y": 81.15 },
              { "x": 59.27, "y": 87.95 },
              { "x": 59.66, "y": 89.45 },
              { "x": 63.58, "y": 86.46 },
              { "x": 67.23, "y": 80.98 },
              { "x": 68.54, "y": 72.52 },
              { "x": 68.15, "y": 60.9 },
              { "x": 64.49, "y": 49.78 },
              { "x": 60.45, "y": 40.16 },
              { "x": 58.75, "y": 32.53 },
              { "x": 53.13, "y": 23.9 },
              { "x": 48.04, "y": 20.41 }
            ]
          }
        ]
    },
    {
        "id": "imagiology_005",
        "dayId": 5,
        "imageUrl": "/imagens/desafio_imagem/Radiografia_5_antes.png",
        "imageUrlAfter": "/imagens/desafio_imagem/Radiografia_5_depois.png",
        "clinicalCase": "Paciente feminina, 75 anos, IAM prévio, apresenta-se dispneica.",
        "explanation": "Insuficiência cardíaca.\n\nNa radiografia, observa-se cardiomegalia (em vermelho) e realce de vasos nos hilos e ápices pulmonares, denotando aumento e sobrecarga da vasculatura pulmonar (em azul).\n\nPróximo a periferia, têm-se a presença das linhas B de Kerley (seta), resultantes do espessamento (i.e., edema) dos septos interlobulares, estendendo-se horizontalmente (i.e., em linha) do parênquima pulmonar até a superfície pleural.\n\nA ocorrência desses achados em paciente com antecedente de IAM e com manifestação clínica de dispnéia grave remete a ocorrência de edema agudo de pulmão secundário a insuficiência cardíaca.\n\nDe nota, a sobrecarga hídrica da vasculatura pulmonar, ocasionando opacidade hilar e em ápices, é conhecida como sinal de asas de morcego/borboleta.",
        "findings": [
          {
            "type": "cardiomegaly",
            "polygon": [
              { "x": 52.35, "y": 26.28 },
              { "x": 40.08, "y": 35.99 },
              { "x": 34.07, "y": 44.98 },
              { "x": 33.55, "y": 55.27 },
              { "x": 29.64, "y": 61.41 },
              { "x": 29.37, "y": 72.4 },
              { "x": 38.38, "y": 81.97 },
              { "x": 54.7, "y": 84.54 },
              { "x": 68.02, "y": 86.69 },
              { "x": 78.46, "y": 86.83 },
              { "x": 85.9, "y": 81.54 },
              { "x": 80.94, "y": 69.41 },
              { "x": 77.81, "y": 62.41 },
              { "x": 73.37, "y": 52.41 },
              { "x": 66.84, "y": 46.7 },
              { "x": 61.49, "y": 43.13 },
              { "x": 60.45, "y": 35.7 },
              { "x": 60.71, "y": 28.7 },
              { "x": 57.7, "y": 24.42 },
              { "x": 54.57, "y": 23.99 }
            ]
          },
          {
            "type": "other",
            "polygons": [
              [
                { "x": 30.42, "y": 12.57 },
                { "x": 29.24, "y": 18.85 },
                { "x": 31.2, "y": 27.56 },
                { "x": 30.03, "y": 35.27 },
                { "x": 22.85, "y": 36.42 },
                { "x": 22.19, "y": 39.7 },
                { "x": 28.07, "y": 41.27 },
                { "x": 25.85, "y": 48.84 },
                { "x": 23.5, "y": 58.69 },
                { "x": 24.41, "y": 68.12 },
                { "x": 26.63, "y": 68.55 },
                { "x": 28.85, "y": 58.12 },
                { "x": 31.07, "y": 51.55 },
                { "x": 33.55, "y": 41.27 },
                { "x": 37.47, "y": 34.27 },
                { "x": 37.47, "y": 28.28 },
                { "x": 35.9, "y": 20.85 },
                { "x": 32.51, "y": 12.14 }
              ],
              [
                { "x": 62.66, "y": 11.57 },
                { "x": 60.58, "y": 18.71 },
                { "x": 63.19, "y": 26.28 },
                { "x": 64.1, "y": 32.85 },
                { "x": 61.49, "y": 35.27 },
                { "x": 62.01, "y": 43.41 },
                { "x": 70.89, "y": 48.7 },
                { "x": 74.28, "y": 49.55 },
                { "x": 72.59, "y": 44.27 },
                { "x": 76.5, "y": 43.56 },
                { "x": 81.72, "y": 40.99 },
                { "x": 79.37, "y": 36.27 },
                { "x": 71.54, "y": 36.13 },
                { "x": 67.76, "y": 34.7 },
                { "x": 68.93, "y": 31.85 },
                { "x": 75.46, "y": 29.99 },
                { "x": 78.59, "y": 29.85 },
                { "x": 71.54, "y": 26.28 },
                { "x": 68.28, "y": 22.85 },
                { "x": 72.46, "y": 19.56 },
                { "x": 72.72, "y": 15.14 },
                { "x": 66.84, "y": 18.42 },
                { "x": 66.19, "y": 21.85 },
                { "x": 63.58, "y": 16.71 }
              ]
            ]
          }
        ]
    },
    {
        "id": "imagiology_006",
        "dayId": 6,
        "imageUrl": "/imagens/desafio_imagem/Radiografia_6_antes.png",
        "imageUrlAfter": "/imagens/desafio_imagem/Radiografia_6_depois.png",
        "clinicalCase": "Paciente masculino, 64 anos, tabagista, com tosse e hemoptise há 3 meses.",
        "explanation": "Massa hilar + atelectasia.\n\nNa imagem, observamos uma massa hilar à direita (pontilhado laranja) obstruindo o brônquio lobar superior direito, o que resultou em atelectasia do lobo superior direito com retração da fissura horizontal (seta verde).\n\nEsse achado evidencia um sinal radiológico clássico, o sinal \"S\" de Golden (pontilhado azul), no contexto de massa neoplásica localizada no hilo direito. Veja que também há desvio da traqueia para a direita.\n\nNesse caso, o paciente apresentava carcinoma broncogênico primário em topografia hilar.",
        "findings": [
          {
            "type": "mass",
            "x": 36.57,
            "y": 43.77,
            "radius": 8
          },
          {
            "type": "atelectasis",
            "polygon": [
              { "x": 15.06, "y": 22.91 },
              { "x": 19.85, "y": 12.62 },
              { "x": 29.31, "y": 4.53 },
              { "x": 36.57, "y": 2.88 },
              { "x": 43.01, "y": 6.59 },
              { "x": 46.03, "y": 11.11 },
              { "x": 48.22, "y": 17.43 },
              { "x": 48.9, "y": 26.76 },
              { "x": 47.95, "y": 34.17 },
              { "x": 43.29, "y": 52.14 },
              { "x": 35.47, "y": 56.81 },
              { "x": 29.17, "y": 53.51 },
              { "x": 25.33, "y": 43.63 },
              { "x": 25.88, "y": 36.5 },
              { "x": 26.29, "y": 28.82 },
              { "x": 24.1, "y": 24.7 },
              { "x": 18.21, "y": 22.91 }
            ]
          }
        ]
    }
  ];
