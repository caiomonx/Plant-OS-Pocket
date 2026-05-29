export const DIARRHEA_CASES = [
    {
        id: 'case_01',
        title: 'Caso Clínico 1',
        patient: {
            name: 'Lucas',
            age: '2 anos',
            ageMonths: 24,
            weight: '12 kg',
            weightKg: 12,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia há 2 dias",
            hpi: "Mãe relata que a criança iniciou quadro de evacuações líquidas, sem sangue, cerca de 6 episódios por dia. Teve 2 episódios de vômito hoje. Aceita líquidos, mas parece sempre com sede.",
            clinicalContext: "Sem exames prévios. Criança previamente hígida, com vacinação regular."
        },
        // Visual/Physical Exam State
        vitals: {
            geral: 'Irritada e inquieta',
            olhos: 'Fundos',
            lagrimas: 'Ausentes',
            boca: 'Seca',
            sede: 'Bebe avidamente, com sede',
            sinalDaPrega: 'Volta lentamente (< 2 seg)',
            pulso: 'Cheio e rápido',
            enchimentoCapilar: '< 3 seg',
            perdaPonderal: 'Estimada em 7%'
        },
        // Correct Diagnosis & Treatment
        diagnosis: {
            plan: 'B',
            dehydration: 'Desidratação (Algum grau)',
            rationale: "Apresenta dois ou mais sinais: irritabilidade, olhos fundos, bebe avidamente, prega volta lentamente."
        },
        treatment: {
            customDialogues: ['orientDietBaby', 'orientHygiene', 'orientReturn'],
            fluid: 'SRO', // Soro de Reidratação Oral
            instructions: "Administrar SRO no serviço de saúde sob supervisão."
        }
    },
    {
        id: 'case_02',
        title: 'Caso Clínico 2',
        patient: {
            name: 'Sofia',
            age: '11 meses',
            ageMonths: 11,
            weight: '8 kg',
            weightKg: 8,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Vômitos e diarreia profusa",
            hpi: "Início súbito há 1 dia. Mãe refere que a criança 'não acorda' e não consegue mamar. Fralda seca há 6 horas.",
            clinicalContext: "Frequenta creche onde houve surto recente de diarreia grave. Sem comorbidades prévias."
        },
        vitals: {
            geral: 'Comatosa/Hipotônica',
            olhos: 'Muito fundos',
            lagrimas: 'Ausentes',
            boca: 'Muito seca',
            sede: 'Incapaz de beber',
            sinalDaPrega: 'Volta muito lentamente (> 2 seg)',
            pulso: 'Filiforme/Muito fraco',
            enchimentoCapilar: '> 5 seg',
            perdaPonderal: 'Estimada em >10%'
        },
        diagnosis: {
            plan: 'C',
            dehydration: 'Desidratação Grave',
            rationale: "Apresenta sinais de choque/gravidade: letárgica/inconsciente, incapaz de beber, prega muito lenta."
        },
        treatment: {
            customDialogues: ['orientDietBaby', 'orientHygiene', 'orientReturn'],
            fluid: 'Ringer Lactato', // ou SF 0.9%
            instructions: "Hidratação Venosa Rápida (Plano C). 100ml/kg no total."
        }
    },
    {
        id: 'case_03',
        title: 'Caso Clínico 3',
        patient: {
            name: 'Miguel',
            age: '3 anos',
            ageMonths: 36,
            weight: '15 kg',
            weightKg: 15,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "5 evacuações amolecidas no último dia",
            hpi: "Mãe muito ansiosa relata que o filho está com diarreia (5 episódios pastosos/amolecidos em 24h). Refere que ele teve 'alergia a leite' quando bebê, e a mãe, por medo, cortou toda a alimentação hoje e está dando apenas chá de camomila. A criança está brincando normalmente, aceita o chá e não apresentou vômitos ou febre.",
            clinicalContext: "Mãe trouxe um exame rápido de fezes (painel viral) feito ontem em laboratório particular: Positivo para Rotavírus. Pesquisa de leucócitos e sangue oculta: Negativa."
        },
        vitals: {
            geral: 'Alerta e ativo',
            olhos: 'Normais',
            lagrimas: 'Presentes',
            boca: 'Úmida',
            sede: 'Bebe normalmente, sem sede excessiva',
            sinalDaPrega: 'Volta imediatamente',
            pulso: 'Cheio e forte',
            enchimentoCapilar: '< 2 seg',
            perdaPonderal: 'Não significativa'
        },
        diagnosis: {
            plan: 'A',
            dehydration: 'Sem sinais de desidratação',
            rationale: "Segundo o Ministério da Saúde, o Plano A é indicado para pacientes com no máximo 1 sinal de desidratação. O paciente apresenta estado geral ativo e alerta, olhos normais, boca úmida e sem sede, enquadrando-se no Plano A."
        },
        treatment: {
            customDialogues: ['orientDietBaby', 'orientHygiene', 'orientReturn'],
            fluid: 'Caseiro/SRO', // Plano A é domiciliar
            instructions: "Tratamento domiciliar. Aumentar oferta de líquidos, manter alimentação, zinco e retorno se sinais de alerta."
        }
    },
    {
        id: 'case_04',
        title: 'Caso Clínico 4',
        patient: {
            name: 'Yasmin',
            age: '8 meses',
            ageMonths: 8,
            weight: '8 kg',
            weightKg: 8,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia e 'moleza' no corpo há 2 dias",
            hpi: "Mãe relata que a bebê apresenta 4 evacuações líquidas por dia e febre baixa (37,9°C). A mãe não mudou a rotina, pois acredita que seja 'só o dente rasgando a gengiva'. O bebê chora, mas mama bem ao seio.",
            clinicalContext: "Caderneta de vacinação atrasada (perdeu a dose da Vacina Oral de Rotavírus - VORH aos 4 meses e a VIP)."
        },
        vitals: {
            geral: 'Alerta e ativa',
            olhos: 'Normais',
            lagrimas: 'Presentes',
            boca: 'Úmida',
            sede: 'Bebe normalmente, sem sede excessiva',
            sinalDaPrega: 'Volta imediatamente',
            pulso: 'Cheio e forte',
            enchimentoCapilar: '< 2 seg',
            perdaPonderal: 'Não significativa'
        },
        diagnosis: {
            plan: 'A',
            dehydration: 'Sem sinais de desidratação',
            rationale: "O bebê apresenta 0 sinais de desidratação (Plano A). O choro é contornável e mama bem. A febre relatada e a diarreia não são sintomas fisiológicos da dentição, exigindo conduta educacional e hidratação oral em domicílio."
        },
        treatment: {
            customDialogues: ['orientTeething', 'orientDietBaby', 'orientVaccine'],
            fluid: 'SRO/Aleitamento',
            instructions: "Orientação forte desmentindo o mito dos dentes. Manter amamentação e ensinar sinais de desidratação. Atualizar calendário vacinal assim que possível."
        }
    },
    {
        id: 'case_05',
        title: 'Caso Clínico 5',
        patient: {
            name: 'Pietro',
            age: '1 ano e 6 meses',
            ageMonths: 18,
            weight: '11 kg',
            weightKg: 11,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia e Vômitos Incoercíveis",
            hpi: "Mãe traz o menino irritadiço ao PS. Relata múltiplos episódios de vômitos e diarreia aquosa nas últimas 12 horas. Ela tentou hidratar à força usando 'Gatorade' de tangerina (bebida esportiva) e aplicou algumas gotas de Plasil/Dramin velho que tinha em casa, porém a criança piorou e continua vomitando tudo o que entra.",
            clinicalContext: "Urina muito escassa nas últimas horas. Sem histórico de cirurgias ou comorbidades. Calendário vacinal em dia."
        },
        vitals: {
            geral: 'Irritado e inquieto',
            olhos: 'Fundos',
            lagrimas: 'Ausentes',
            boca: 'Seca',
            sede: 'Bebe avidamente',
            sinalDaPrega: 'Lenta (< 2 seg)',
            pulso: 'Acelerado, mas palpável',
            enchimentoCapilar: '3 seg',
            perdaPonderal: 'Estimada em 8%'
        },
        diagnosis: {
            plan: 'B',
            dehydration: 'Desidratação',
            rationale: "Quadro clássico de Plano B. O uso domiciliar de repositores hidroeletrolíticos inadequados de academia e medicamentos proscritos agravaram a osmolaridade gástrica."
        },
        treatment: {
            customDialogues: ['orientHygiene', 'orientReturn', 'orientDietBaby'],
            fluid: 'SRO',
            instructions: "Reidratação Oral na UBS (550ml a 1100ml SRO). Observar evolução randômica da tolerância. Ondansetrona é indicada caso o vômito dispare."
        }
    },
    {
        id: 'case_06',
        title: 'Caso Clínico 6',
        patient: {
            name: 'Alice',
            age: '5 anos',
            ageMonths: 60,
            weight: '18 kg',
            weightKg: 18,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Rebaixamento de Consciência e Diarreia",
            hpi: "Paciente trazida pelo serviço pré-hospitalar com urgência direto da escola. As professoras relatam que Alice teve pelo menos 8 episódios de diarreia em jato esverdeada após a merenda. Poucos minutos antes de ligarem para o resgate, a criança sofreu uma lipotimia (desmaio) a caminho do refeitório e perdeu o tônus postural.",
            clinicalContext: "Equipe de resgate não obteve acesso venoso e pede intervenção médica imediata na Sala Vermelha. Carteira vacinal atualizada."
        },
        vitals: {
            geral: 'Letárgica / Sonolenta',
            olhos: 'Muito encovados',
            lagrimas: 'Ausentes',
            boca: 'Extremamente seca',
            sede: 'Incapaz de beber (Rebaixa)',
            sinalDaPrega: 'Prega muito lenta (> 3 seg)',
            pulso: 'Filiforme e taquicárdico (158 bpm)',
            enchimentoCapilar: '> 5 seg (Pele fria/moteada)',
            perdaPonderal: 'Estimada em >10%'
        },
        diagnosis: {
            plan: 'C',
            dehydration: 'Desidratação Grave (Choque)',
            rationale: "Quadro limítrofe de instabilidade hemodinâmica. Rebaixamento do nível de consciência, reabastecimento capilar péssimo e pulsos não palpáveis exigem infusão maciça imediata."
        },
        treatment: {
            customDialogues: ['orientDietChild', 'orientReturn', 'orientHygiene'],
            fluid: 'Ringer Lactato',
            instructions: "Ressuscitação Venosa Rápida (Plano C). Como a paciente é MAIOR de 1 ano, a regra muda: 100ml/kg totais devem entrar em apenas 3h (30 min / 2h30m)."
        }
    },
    {
        id: 'case_07',
        title: 'Caso Clínico 7',
        patient: {
            name: 'Valentina',
            age: '3 anos',
            ageMonths: 36,
            weight: '14 kg',
            weightKg: 14,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia pastosa com febre",
            hpi: "Mãe traz Valentina assustada após a mesma apresentar diarreia há 3 dias. Refere que, desde ontem, as fezes estão com cheiro mais forte e algumas raias de muco isoladas, além de ter feito um pico de febre baixa (37.8°C). A avó materna instruiu a mãe a procurar a UPA para exigir uma receita de Azitromicina, afirmando ser uma infecção fortíssima.",
            clinicalContext: "Criança entra no consultório caminhando e brincando. Alimentou-se razoavelmente no café da manhã."
        },
        vitals: {
            geral: 'Alerta, corada e ativa',
            olhos: 'Normais',
            lagrimas: 'Presentes e abundantes',
            boca: 'Úmida',
            sede: 'Bebe água normalmente, sem avidez',
            sinalDaPrega: 'Retorna imediatamente',
            pulso: 'Cheio',
            enchimentoCapilar: '< 2 seg',
            perdaPonderal: 'Não significativa'
        },
        diagnosis: {
            plan: 'A',
            dehydration: 'Sem sinais de desidratação',
            rationale: "O paciente não apresenta absolutamente nenhum sinal de desidratação. O foco do caso é a armadilha do pânico materno perante muco/febre."
        },
        treatment: {
            customDialogues: ['mythAntibiotic', 'orientDietChild', 'orientReturn'],
            fluid: 'SRO / Soro Caseiro',
            instructions: "Tratamento 100% domiciliar (Plano A). O aluno deve conter o ímpeto da família e provar que antibióticos são contra-indicados em PGE viral sem disenteria comprovada."
        }
    },
    {
        id: 'case_08',
        title: 'Caso Clínico 8',
        requiresAntibiotic: 'dysentery',
        patient: {
            name: 'Arthur',
            age: '8 anos',
            ageMonths: 96,
            weight: '25 kg',
            weightKg: 25,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Febre, Cólicas e Sangue nas Fezes",
            hpi: "Mãe traz o filho chorando muito devido a intensas cólicas abdominais (tenesmo) e febre alta contínua (39.2°C). O menino iniciou o quadro diarreico aos jatos há 48 horas, mas hoje as fezes diminuíram de volume e passaram a ser compostas fortemente por muco vivo e estrias grossas de sangue (Disenteria).",
            clinicalContext: "Sem alergias medicamentosas conhecidas. Alimentou-se de maionese caseira em trailer na rua há 3 dias."
        },
        vitals: {
            geral: 'Prostrado (Chora de cólica)',
            olhos: 'Fundos',
            lagrimas: 'Presentes em pouca quantidade',
            boca: 'Ressecada',
            sede: 'Bebe água avidamente devido à febre/perda',
            sinalDaPrega: 'Retifica < 2 seg',
            pulso: 'Taquicárdico (115 bpm)',
            enchimentoCapilar: '3 seg',
            perdaPonderal: 'Estimada em 7%'
        },
        diagnosis: {
            plan: 'B',
            dehydration: 'Desidratação com Disenteria Infecciosa',
            rationale: "Quadro Clássico de Shiguelose/Bactéria Invasiva cursando com desidratação (Sede + Olhos Fundos). A presença de Sangue Macro altera todo o protocolo nacional."
        },
        treatment: {
            customDialogues: ['orientHygiene', 'orientReturn', 'orientDietChild'],
            fluid: 'SRO',
            instructions: "O aluno deve obrigatoriamente preencher o formulário roxo com CIPROFLOXACINO para combater a disenteria, além de tratar a desidratação associada (Plano B)."
        }
    },
    {
        id: 'case_09',
        title: 'Caso Clínico 9',
        requiresAntibiotic: 'cholera',
        patient: {
            name: 'Guilherme',
            age: '10 anos',
            ageMonths: 120,
            weight: '32 kg',
            weightKg: 32,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia 'Água de Arroz' e Colapso Sistêmico",
            hpi: "Paciente encontrado irresponsivo no chão do banheiro. A mãe (moradora de área de extrema vulnerabilidade sem esgoto tratado) relata, em prantos, que o garoto evacuou um volume irreal de líquido durante a madrugada. As fezes possuíam coloração puramente esbranquiçada e turva ('água de arroz') com forte odor característico de peixe.",
            clinicalContext: "Criança sem comorbidades prévias. O quadro de perda hídrica foi fulminante em menos de 8 horas."
        },
        vitals: {
            geral: 'Comatoso / Inconsciente (Letargia letal)',
            olhos: 'Tão encovados que não fecham',
            lagrimas: 'Ausentes',
            boca: 'Extremamente ressecada',
            sede: 'Incapaz de beber (Rebaixado)',
            sinalDaPrega: 'Prega muito lenta (> 4 seg)',
            pulso: 'Radiais impalpáveis, carotídeo filiforme',
            enchimentoCapilar: '> 6 seg (Acrocianose e cianose perioral)',
            perdaPonderal: 'Estimada em >10%'
        },
        diagnosis: {
            plan: 'C',
            dehydration: 'Choque Hipovolêmico por Cólera Grave',
            rationale: "Fator epidemiológico e aspecto da perda hídrica patognomônicos de toxina colérica, que exigem hidratação fuminante na Sala Vermelha sob pena de óbito."
        },
        treatment: {
            customDialogues: ['orientHygiene', 'orientReturn', 'orientDietChild'],
            fluid: 'Ringer Lactato',
            instructions: "O aluno dever cravar a reanimação venosa agressiva Rápida (Fase 1 em 30 minutos por ser MAIOR de 1 ano) e prescrever de imediato Azitromicina ou Ciprofloxacino no formulário roxo."
        }
    },
    {
        id: 'case_10',
        title: 'Caso Clínico 10',
        requiresAntibiotic: 'amebiasis',
        patient: {
            name: 'Davi',
            age: '6 anos',
            ageMonths: 72,
            weight: '20 kg',
            weightKg: 20,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia com muco e sangue há 6 dias",
            hpi: "Mãe relata perda de apetite e cólicas intestinais há quase uma semana. Inicialmente, Davi tinha evacuações pastosas, mas há dois dias o volume das fezes diminuiu muito, passando a evacuar pequenos coágulos de muco ('parece geleia') misturados com raias de sangue vivo. Ele tem tido intenso tenesmo (esforço doloroso para defecar), mas se manteve afebril durante toda a janela clínica.",
            clinicalContext: "Sem febre alta. Exame parasitológico negativo há 1 ano. Família visitou rancho de águas na semana anterior."
        },
        vitals: {
            geral: 'Prostrado devido à cólica',
            olhos: 'Normais',
            lagrimas: 'Presentes',
            boca: 'Úmida',
            sede: 'Bebe água sem avidez',
            sinalDaPrega: 'Retifica imediatamente (< 2 seg)',
            pulso: 'Cheio (90 bpm)',
            enchimentoCapilar: '< 2 seg',
            perdaPonderal: 'Estimada em 3%'
        },
        diagnosis: {
            plan: 'A',
            dehydration: 'Sem Desidratação Objetiva, com Disenteria Amebiana',
            rationale: "Quadro prolongado, não febril, com tenesmo, muco e sangue configura clássica suspeita de Amebíase Intestinal Invasiva, distanciando-se do perfil bacteriano febril agudo da Shigella."
        },
        treatment: {
            customDialogues: ['orientHygiene', 'orientReturn', 'orientDietChild'],
            fluid: 'SRO em Domicílio',
            instructions: "O aluno deve classificar Plan A por falta de sinais de desidratação expressivos, porém SÓ pontuará nota máxima se ligar o painel de ATB e cravar Metronidazol 50mg/kg/dia 3x ao dia por 10 dias."
        }
    },
    {
        id: 'case_11',
        title: 'Caso Clínico 11',
        requiresAntibiotic: 'giardiasis',
        patient: {
            name: 'Benjamin',
            age: '4 anos',
            ageMonths: 48,
            weight: '16 kg',
            weightKg: 16,
            avatar: '/assets/diarrhea/avatar_exame.png'
        },
        history: {
            complaint: "Diarreia prolongada, fezes que boiam e gases",
            hpi: "Mãe relata, exausta, que o filho iniciou quadro de evacuações arrastadas que duram quase duas semanas. O menino apresenta alta distensão abdominal (barriga inchada) e flatulência intensa de humor muito fétido. Chama a atenção das cuidadoras que as evacuações não têm sangue, contudo são excessivamente amareladas, espumosas e predominantemente flutuam na água do vaso sanitário (Esteatorreia). O garoto está perdendo peso progressivamente.",
            clinicalContext: "Sem episódios de febre aguda recente. Frequenta a creche municipal diariamente em período integral."
        },
        vitals: {
            geral: 'Alerta, emagrecido. Abdome globoso por distensão gasosa',
            olhos: 'Normais',
            lagrimas: 'Presentes e fluídas',
            boca: 'Úmida',
            sede: 'Bebe água sem avidez / Normal',
            sinalDaPrega: 'Retifica imediatamente (< 2 seg)',
            pulso: 'Pulso Cheio / Rítmico',
            enchimentoCapilar: '< 2 seg',
            perdaPonderal: 'Estimada em 4% (Secundária à disabsorção crônica)'
        },
        diagnosis: {
            plan: 'A',
            dehydration: 'Sem Desidratação Aguda. Disabsorção por Giardíase Clínica',
            rationale: "Fezes gordurosas flutuantes (sinal de má absorção lipídica epitelial) associadas à intensa meteorização (gases crônicos) e ambiente de creche compõem o selo clínico inequívoco de Giardia lamblia infectando microvilo."
        },
        treatment: {
            customDialogues: ['orientDietChild', 'orientHygiene', 'orientReturn'],
            fluid: 'SRO em Domicílio / Manter Nutrição',
            instructions: "Tratamento volêmico restrito ao domicílio (Plano A sem déficit grave). O desafio cardeal deste caso é farmocológico: O aluno SÓ zera o OSCE se receitar Metronidazol na posologia incisiva de 15 mg/kg/dia 3x/dia por 5 dias para varrer os trofozoítos."
        }
    }
];
