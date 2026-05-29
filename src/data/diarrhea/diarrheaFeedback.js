import { getPlanAVolumes, getZincDose, getPlanBRehydration, getHollidaySegar, getPlanCAttack } from '../../utils/pediatricMath';
import { DIALOGUE_BANK } from './dialogueBank';

export const evaluateDiarrheaCase = (caseData, userActions) => {
    const { revealedVitals, selectedPlan, form, simHistory } = userActions;
    const { diagnosis, treatment } = caseData;

    let totalScore = 0;
    let maxTotal = 0;

    // --- 1. EXAME FÍSICO (Peso 20%) ---
    const requiredVitals = ['olhos', 'boca', 'sede', 'sinalDaPrega'];
    const missedVitals = requiredVitals.filter(v => !revealedVitals.includes(v));
    const examScore = missedVitals.length === 0 ? 100 : 0;

    totalScore += examScore * 0.2;
    maxTotal += 20;

    const examSection = {
        id: 'exam',
        label: 'Avaliação dos Sinais de Desidratação',
        score: examScore,
        maxScore: 100,
        items: [{
            title: "Exame Físico Específico",
            status: missedVitals.length === 0 ? 'success' : 'error',
            message: missedVitals.length === 0
                ? "Você avaliou todos os sinais chave."
                : `Faltou avaliar: ${missedVitals.join(', ')}.`,
            protocol: "Avaliar todos os sinais chaves.",
            explanation: "Para classificar corretamente, é obrigatório avaliar: Estado Geral, Olhos, Boca/Língua, Sede e Sinal da Prega.",
        }]
    };

    // --- 2. CLASSIFICAÇÃO (Peso 30%) ---
    const isPlanCorrect = selectedPlan === diagnosis.plan;
    const planScore = isPlanCorrect ? 100 : 0;

    totalScore += planScore * 0.3;
    maxTotal += 30;

    const classificationSection = {
        id: 'diagnosis',
        label: 'Classificação de Risco',
        score: planScore,
        maxScore: 100,
        items: [{
            title: "Estadiamento",
            status: isPlanCorrect ? 'success' : 'error',
            message: `Você indicou Plano ${selectedPlan}.`,
            protocol: diagnosis.plan === 'A' ? "Plano A (Sem desidratação)" : (diagnosis.plan === 'B' ? "Plano B (Com desidratação)" : "Plano C (Desidratação grave)"),
            explanation: isPlanCorrect
                ? (diagnosis.plan === 'A'
                    ? "Correto. Apesar da ansiedade da mãe e do Rotavírus positivo (que apenas confirma a etiologia viral benigna esperada), o clínico deve focar no exame de hidratação. A criança está ativa, com olhos normais, sem sede excessiva e prega imediata (0 a 1 sinal = Plano A)."
                    : "Correto. Os sinais são compatíveis com esta classificação, de acordo com as Diretrizes do Ministério da Saúde.")
                : `Incorreto. O gabarito é Plano ${diagnosis.plan}: ${diagnosis.rationale}`
        }]
    };

    // --- 3. CONDUTA (Peso 50%) ---
    let conductScore = 0;
    let conductItems = [];

    // Logic per Plan
    // Logic per Plan
    if (diagnosis.plan === 'A') {
        const ageMonths = caseData.patient.ageMonths || 24;
        const weightKg = caseData.patient.weightKg || 10;

        const { target_min, target_max } = getPlanAVolumes(ageMonths);
        
        const isUnder6Months = ageMonths < 6;
        const isUnder1Year = ageMonths < 12;
        const isOver10Years = ageMonths > 120;

        // --- A.1 HIDRATAÇÃO (40 pts) ---
        // Fluido base (20 pts)
        const isBadFluid = ['refrigerante', 'gatorade'].includes(form.sroBrand);
        const hasFluid = form.sroBrand !== '0' && form.sroBrand;
        const fluidPoints = !hasFluid ? 0 : (isBadFluid ? 0 : 20);

        // Volume (20 pts)
        const isReposition = form.sroOrient === 'reposicao';
        const vol = parseFloat(form.sroVolA || 0);
        const isVolCorrect = isReposition && (vol >= target_min && vol <= target_max);
        const volPoints = isVolCorrect ? 20 : 0;

        // --- A.2 a A.4: EDUCAÇÃO / ORIENTAÇÃO (Dinâmica via Injeção Inversa) (45 pts total) ---
        const activeDialoguesKeys = caseData.treatment?.customDialogues || ['orientDietChild', 'orientHygiene', 'orientReturn'];
        let educationPoints = 0;

        activeDialoguesKeys.forEach(tag => {
            const rules = DIALOGUE_BANK[tag]?.feedback;
            if (rules) {
                const userChoice = form[tag];
                if (userChoice === rules.correctId) {
                    educationPoints += rules.points;
                }
            }
        });

        // --- A.5 ZINCO (15 pts) ---
        const hasZinc = form.zincCheck;
        const dose = parseFloat(form.zincDose || 0);
        const expectedDose = getZincDose(ageMonths);
        const isZincCorrect = hasZinc && dose === expectedDose;
        const zincPoints = isZincCorrect ? 15 : (hasZinc ? 5 : 0);

        conductScore = fluidPoints + volPoints + educationPoints + zincPoints;

        let sroProtocol = "";
        let sroExplanation = "";
        if (isUnder1Year) {
            sroProtocol = "50 a 100 ml de SRO após cada evacuação diarreica.";
            sroExplanation = `O paciente tem ${caseData.patient.age}, logo se enquadra como menor de 1 ano. Deve receber de 50 a 100 ml de SRO após cada evacuação.`;
        } else if (isOver10Years) {
            sroProtocol = "Quantidade que o paciente aceitar após cada evacuação diarreica.";
            sroExplanation = `O paciente tem ${caseData.patient.age}, logo se enquadra como maior de 10 anos. Deve receber a quantidade que aceitar de SRO após cada evacuação.`;
        } else {
            sroProtocol = "100 a 200 ml de SRO após cada evacuação diarreica.";
            sroExplanation = `O paciente tem ${caseData.patient.age}, logo se enquadra na faixa de 1 a 10 anos. Deve receber de 100 a 200 ml de SRO após cada evacuação.`;
        }

        const zincProtocol = isUnder6Months
            ? "10 mg/dia por 10 a 14 dias."
            : "20 mg/dia por 10 a 14 dias.";

        const zincExplanation = isUnder6Months
            ? `O paciente tem ${caseData.patient.age} (menor de 6 meses), logo a dose recomendada é de 10 mg/dia durante 10 a 14 dias. O zinco diminui o tempo de estado agudo e a gravidade dos sintomas.`
            : `O paciente tem ${caseData.patient.age} (maior que 6 meses), logo a dose recomendada é de 20 mg/dia durante 10 a 14 dias. O zinco diminui o tempo de estado agudo e a gravidade dos sintomas.`;

        // Visual Feedback Items mapped to MS rules
        conductItems.push({
            title: "A.1 Hidratação Oral e Volume",
            status: (fluidPoints + volPoints === 40) ? 'success' : (fluidPoints > 0 ? 'warning' : 'error'),
            message: `Fluido prescrito: ${form.sroBrand || 'Nenhum'}. Volume: ${vol || 0}ml.`,
            protocol: sroProtocol,
            explanation: isBadFluid
                ? "ERRO GRAVE: Bebidas esportivas ou refrigerantes pioram a diarreia osmótica."
                : (fluidPoints + volPoints === 40 ? `Correto. ${sroExplanation}` : `Atenção aos limites para a idade. ${sroExplanation}`)
        });

        // Dinamicamente desenha as rubricas de educação das chaves ativas do caso
        activeDialoguesKeys.forEach(tag => {
            const rules = DIALOGUE_BANK[tag]?.feedback;
            if (rules) {
                const userChoice = form[tag];
                const isCorrect = userChoice === rules.correctId;
                
                conductItems.push({
                    title: rules.title,
                    status: isCorrect ? 'success' : (userChoice ? 'error' : 'warning'), // warning = negligência médica
                    message: isCorrect ? rules.msgSuccess : (userChoice ? rules.msgError : "Omissão Grave: Faltou realizar esta orientação na alta."),
                    protocol: rules.protocol,
                    explanation: isCorrect ? rules.expSuccess : rules.expError
                });
            }
        });

        conductItems.push({
            title: "A.5 Suplementação de Zinco",
            status: zincPoints === 15 ? 'success' : 'error',
            message: hasZinc ? `Dose prescrita: ${dose}mg` : "Zinco não prescrito.",
            protocol: zincProtocol,
            explanation: zincExplanation
        });

    } else if (diagnosis.plan === 'B') {
        const weight = caseData.patient.weightKg || 10;
        const ageMonths = caseData.patient.ageMonths || 24;

        // Pilar B.1.1 e B.1.2: Volume de 50 a 100ml/kg e Tempo de 4-6h
        const prescribedVol = parseFloat(form.sroVolB || 0);
        const prescribedTime = parseFloat(form.sroTimeB || 0);

        const { target_min, target_max } = getPlanBRehydration(weight);

        const isVolValid = prescribedVol >= target_min && prescribedVol <= target_max;
        const isTimeValid = prescribedTime >= 4 && prescribedTime <= 6;

        const volScore = isVolValid ? 20 : 0;
        const timeScore = isTimeValid ? 10 : 0;

        conductItems.push({
            title: "B.1 Regulagem do Gotejamento TRO",
            status: (isVolValid && isTimeValid) ? 'success' : (!isVolValid && !isTimeValid) ? 'error' : 'warning',
            message: `Volume Prescrito: ${prescribedVol}ml | Ritmo: ${prescribedTime}h`,
            protocol: `Alvo: ${target_min} a ${target_max}ml (50-100ml/kg) num período de 4 a 6 horas.`,
            explanation: isVolValid && isTimeValid
                ? "Correto. TRO guiada perfeitamente de acordo com a faixa do Ministério da Saúde."
                : `O Volume alvo ideal do paciente era de ${target_min} a ${target_max}ml em 4 a 6 horas. Você inseriu ${prescribedVol}ml em ${prescribedTime}h.`
        });

        // Pilar B.1.4: Vômitos (se ocorreu o evento)
        let antiemeticScore = 0;
        if (form.vomitAction) {
            const chosenAction = form.vomitAction;

            if (chosenAction === 'C') {
                // Checar se foi ondansetrona e a dose correta
                const drug = form.antiDrug;
                const dose = parseFloat(form.antiDose || 0);

                let expectedDose = 2;
                if (ageMonths >= 6 && ageMonths <= 24) expectedDose = 2; // 6m a 2a
                else if (ageMonths > 24 && weight <= 30) expectedDose = 4; // >2a a 10a (aprox 30kg)
                else if (weight > 30) expectedDose = 8; // >10a

                if (drug === 'ondansetrona') {
                    if (dose === expectedDose) {
                        antiemeticScore = 40;
                        conductItems.push({
                            title: "B.1.4 Manejo Eventual de Vômitos",
                            status: 'success',
                            message: `Escolha Imediata: Pausa + Ondansetrona ${dose}mg.`,
                            protocol: `Pausar hidratação e ofertar Ondansetrona ${expectedDose}mg`,
                            explanation: "Conduta perfeita perante o Sentinela. A Ondansetrona é a única medicação recomendada pelo Ministério da Saúde (Plasil proscrito em pediatria), na dose exata para a faixa etária deste paciente."
                        });
                    } else {
                        antiemeticScore = 20;
                        conductItems.push({
                            title: "B.1.4 Manejo Eventual de Vômitos",
                            status: 'warning',
                            message: `Escolha Erro de Posologia (${dose}mg).`,
                            protocol: `Ondansetrona na dose de ${expectedDose}mg`,
                            explanation: `Fez o certo ao prescrever Ondansetrona, porém a dose recomendada do MS para o peso/idade atual exige tabela rígida (${expectedDose}mg).`
                        });
                    }
                } else {
                    antiemeticScore = 0;
                    conductItems.push({
                        title: "B.1.4 Manejo Eventual de Vômitos",
                        status: 'error',
                        message: `Substância contra-indicada (${drug}).`,
                        protocol: `Pausar hidratação e administrar Ondansetrona ${expectedDose}mg`,
                        explanation: "O MS orienta apenas o uso da Ondansetrona (B.1.4). Plasil, Dramin e outros antieméticos são proscritos nacionalmente pelo alto risco de distonia e efeitos extrapiramidais."
                    });
                }
            } else {
                antiemeticScore = 0;
                conductItems.push({
                    title: "B.1.4 Erro ao Manejar Vômito",
                    status: 'error',
                    message: "Iatrogenia Clínica perante Vômito Persistente.",
                    protocol: `Pausar SRO 10 min e Tentar Ondansetrona antes da Sonda.`,
                    explanation: "Quando há vômito no Plano B, não sonde de imediato e não hidrate na veia impensadamente. Pause o SRO por curto período e utilize bloqueio farmacológico (Ondansetrona)."
                });
            }
        } else {
            // Se paciente nao deu trigger de vomito na simulação.
            antiemeticScore = 40;
        }

        // Pilar B.2: Desfecho / Reavaliação Pós-Horas
        let outcomeScore = 0;
        const randomOutcome = form.endOutcome;
        const userOutcome = form.endAction;

        if (randomOutcome) {
            let correctOutcome = false;
            let expectedActionStr = "";

            if (randomOutcome === 'melhora') {
                correctOutcome = userOutcome === 'alta';
                expectedActionStr = "Diretiva B.2.1: Desaparecimento dos Sinais = Dar Alta no PLANO A.";
            } else if (randomOutcome === 'estagnacao') {
                correctOutcome = userOutcome === 'sng';
                expectedActionStr = "Diretiva B.2.2: Continua desidratado e bebe lento = Indicar Sonda Nasogástrica (Gastrólise) na unidade.";
            } else if (randomOutcome === 'piora') {
                correctOutcome = userOutcome === 'planoc';
                expectedActionStr = "Diretiva B.2.3: Evoluiu para letargia ou desidratação grave = Abandonar TRO e iniciar PLANO C (Hidratação Venosa Rápida).";
            }

            if (correctOutcome) {
                outcomeScore = 30;
                conductItems.push({
                    title: "B.2 Reavaliação Final na UBS",
                    status: 'success',
                    message: "Leitura Fina do Quadro Clínico e Desfecho Correto.",
                    protocol: expectedActionStr,
                    explanation: `Você notou que o paciente evoluiu com padrão de ${randomOutcome} após a hidratação e conduziu o caso de forma irretocável.`
                });
            } else {
                outcomeScore = 0;
                conductItems.push({
                    title: "B.2 Reavaliação Final na UBS",
                    status: 'error',
                    message: "Falha na Decisão após Reavaliação Médica.",
                    protocol: expectedActionStr,
                    explanation: `Você observou um quadro de ${randomOutcome} relatado após final da reidratação inicial, mas optou pela conduta errada. Siga o desfecho protocolar.`
                });
            }
        } else {
            // Resguardo em caso de Skip no Relógio
            outcomeScore = 30;
        }

        conductScore = volScore + timeScore + antiemeticScore + outcomeScore;
    } else if (diagnosis.plan === 'C') {
        const hasFatalError = form.forcedOutcome === 'bad_p_c';
        const weight = caseData.patient.weightKg || 10;
        const ageMonths = caseData.patient.ageMonths || 24;

        let phase1Score = 0;
        let phase2Score = 0;
        let eventsScore = 0;

        // --- C.1 Phase 1 (Expansão Rápida) ---
        const validExpFluid = ['ringer', 'sf09'].includes(form.ivSol);
        const v1 = parseFloat(form.v1 || 0);
        
        // Regra de Ouro MS para Ataque: 20 a 30 ml/kg na primeira cota!
        const { target_min: targetAtaqueMin, target_max: targetAtaqueMax } = getPlanCAttack(weight);

        if (!validExpFluid) {
            phase1Score = 0;
            conductItems.push({
                title: "C.1 Fluido de Expansão",
                status: 'error',
                message: `Solução Inicial Selecionada: ${form.ivSol || 'Nenhuma'}`,
                protocol: "Mandatório: Ringer Lactato ou Soro Fisiológico (0.9%) puros.",
                explanation: "Erro Iatrogênico. A expansão inicial para reverter choque jamais deve conter soros glicosados ou soluções salinas hipertônicas. Usa-se cristaloide isotônico puro."
            });
        } else {
            if (v1 >= targetAtaqueMin && v1 <= targetAtaqueMax) {
                phase1Score = 30;
                conductItems.push({
                    title: "C.1 Fase Rápida de Expansão (Ataque)",
                    status: 'success',
                    message: `Fluido: ${form.ivSol} | Alíquota Imediata: ${v1}ml`,
                    protocol: `Alvo Ataque (20 a 30ml/kg): ${targetAtaqueMin} a ${weight * 30}ml`,
                    explanation: "Correto! Você prescreveu um fluido expansor seguro na posologia ideal de 20-30ml/kg para retirar o paciente rapidamente da fase letárgica sintomática."
                });
            } else if (v1 > 0) {
                phase1Score = 15;
                conductItems.push({
                    title: "C.1 Fase Rápida de Expansão (Ataque)",
                    status: 'warning',
                    message: `Fluido: ${form.ivSol} | Alíquota Imediata: ${v1}ml`,
                    protocol: `Alvo Ataque (20 a 30ml/kg): ${targetAtaqueMin} a ${weight * 30}ml`,
                    explanation: "Acertou o fluido, porém errou drasticamente a posologia proporcional baseada no peso. Infundir volumes sub-ótimos demora a reverter o choque, e volumes extremados na Alíquota inicial podem hipervolemiar."
                });
            } else {
                phase1Score = 0;
                conductItems.push({
                    title: "C.1 Fase Rápida de Expansão",
                    status: 'error',
                    message: "Alíquota ausente ou Zerada.",
                    protocol: "Obrigatório infundir 20 a 30ml/kg imediatamente.",
                    explanation: "Omitiu o volume de infusão inicial num paciente com desidratação severa em franco desnível de hidratação e metabolismo."
                });
            }
        }

        // --- C.2 Phase 2 (Manutenção e Holliday) ---
        let hollidayVol = getHollidaySegar(weight);

        const maintVol = parseFloat(form.maintVol || 0);
        const validMaintFluid = ['sg_sf_4_1', 'sg_sf_1_1'].includes(form.maintSol);
        const hasKcl = parseFloat(form.kclVol || 0) > 0;

        // Checar limite de erro (aceitando Holliday isolado, até Holliday com perdas de déficit residual de +50ml/kg)
        const isVolHollidayCorrect = maintVol >= (hollidayVol * 0.9) && maintVol <= (hollidayVol + (weight * 50));

        if (!validMaintFluid) {
            phase2Score = 0;
            conductItems.push({
                title: "C.2 Solução de Manutenção",
                status: 'error',
                message: `Solução Cativa Prescrita: ${form.maintSol || 'Nenhuma'}`,
                protocol: "Requisito Nutricional-Eletrolítico: Soro Glicosado associado ao Fisiológico (Proporção 4:1 ou 1:1).",
                explanation: "Erro Crasso! Após tirar o paciente do choque e garantir diurese na expansão, é proibitivo isolar infusão com Ringer/SF puros nas próximas 24h omitindo a carga vital de glicose."
            });
        } else {
            let p2ScoreTemp = 0;
            if (isVolHollidayCorrect) p2ScoreTemp += 20;

            if (hasKcl) p2ScoreTemp += 10;

            phase2Score = p2ScoreTemp;

            conductItems.push({
                title: "C.2 Parâmetros Básicos Contínuos (24h)",
                status: phase2Score === 30 ? 'success' : 'warning',
                message: `Líquido Base: ${maintVol}ml | KCl Inserido na Bolsa: ${hasKcl ? 'Sim' : 'Não'}`,
                protocol: `O Alvo ideal de Holliday é em torno de ${hollidayVol}ml + Necessidade incisiva de cloreto de Potássio no gotejamento de soro contínuo.`,
                explanation: phase2Score === 30 
                    ? "Engenharia de precisão! Prescreveu a base calórica em margens excelentes para a Regra de Holliday-Segar, suplementada com as cruciais ampolas de KCl para perdas crônicas intracelulares."
                    : (!isVolHollidayCorrect 
                        ? `Lógica Flásil: A fluidoterapia nutritiva basal para o peso (mirando aprox ${hollidayVol}ml) foi gritantemente super ou subestimada na prescrição.`
                        : "Você até acertou o líquido, porém deixou de adicionar ampolas de Cloreto de Potássio na bag de 24h! Como a diurese certamente já se restabeleceu e existe perda nas fezes, o coração correrá risco fatal de hipocalemia!")
            });
        }

        // --- C.3 Histórico Dinâmico (Logs de Intercorrências Biológicas e Procedimentos de Decisão na Adjacência do tempo) ---
        if (simHistory && simHistory.length > 0) {
            const planCActions = simHistory.filter(h => h.type === 'Intervenção Plan C');
            
            // Iniciar com nota plena e debitar por escolhas duvidosas não-fatais reportadas nos logs 
            eventsScore = hasFatalError ? 0 : 40;

            if (hasFatalError) {
                conductItems.push({
                    title: "C.3 Desfecho Clínico na Sala CTI (Sentinela)",
                    status: 'error',
                    message: "Manejo Imprudente / Colapso Vitual Imediato.",
                    protocol: "Reavaliações constantes não aceitam intervenções farmacológicas instintivas drásticas na ausência das premissas clínicas exatas.",
                    explanation: "Ao longo do acompanhamento presencial frente a maca do manequim, uma conduta sua esgotou os barrorreceptores da criança e conduziu a Parada Respiratória/Choque Irreversível."
                });
            } else {
                let dynamicScore = eventsScore;

                planCActions.forEach((log) => {
                    const cleanLogAction = log.action.replace('ERRO: ', '');
                    
                    if (log.action.includes('ERRO:')) {
                        dynamicScore = Math.max(0, dynamicScore - 15);
                        conductItems.push({
                            title: "C.3 Lapso Sentinela",
                            status: 'error',
                            message: cleanLogAction,
                            protocol: "Manejo Analítico de Congestões / Vasodilatações.",
                            explanation: "Conduta com Iatrogenia detectada. O botão clicado contraria fortemente as diretrizes perante este agravo em específico."
                        });
                    } else if (log.action.includes('Evento:') || log.action.includes('Evento Aleatório:')) {
                        conductItems.push({
                            title: "C.3 Vigilância Clínica Assíncrona",
                            status: 'success',
                            message: log.action,
                            protocol: "Ação Correta Inserida no momento ótimo.",
                            explanation: "Ponto Parcial Registrado com Sucesso. Você conteve bem a intercorrência biológica com manobra clínica compatível com o quadro agudo."
                        });
                    }
                });
                eventsScore = dynamicScore;
            }
        } else {
            // Se ocorreu glitch sistêmico do log ou ele ativou o Plano C em Fast-forward
            eventsScore = hasFatalError ? 0 : 40;
        }

        conductScore = phase1Score + phase2Score + eventsScore;
    }

    totalScore += conductScore * 0.5;
    maxTotal += 50;

    const treatmentSection = {
        id: 'treatment',
        label: 'Conduta Terapêutica',
        score: conductScore,
        maxScore: 100,
        items: conductItems
    };

    // --- 4. EXTRAS / ANTIBIOTICOTERAPIA (Avaliador Transversal Transparente) ---
    const atbDisease = caseData.requiresAntibiotic; // 'dysentery', 'cholera' ou falsy

    if (atbDisease) {
        if (!form.atbCheck) {
            conductScore = Math.max(0, conductScore - 30);
            treatmentSection.score = conductScore;
            conductItems.push({
                title: "Omissão Severa de Antimicrobiano",
                status: 'error',
                message: "Você não acionou o protocolo de Antibióticos.",
                protocol: "Pacientes apresentando sinais focais microbianos gravíssimos (Disenteria ou Cólera) exigem ATB na entrada.",
                explanation: "Erro Fatal. O paciente apresenta uma linha semiológica inegável para contenção microbiana (toxina/bactéria). A perda dessa janela dourada induz rápida Sepse ou instabilidade vascular terminal."
            });
        } else {
            let isCorrectDrug = false;
            let isCorrectDose = false;

            if (atbDisease === 'dysentery') {
                isCorrectDrug = form.atbDrug === 'cipro' || form.atbDrug === 'ceftriaxona';
                if (form.atbDrug === 'cipro' && form.atbDose === '15_12h') isCorrectDose = true;
                if (form.atbDrug === 'ceftriaxona' && form.atbDose === '50_100_dia') isCorrectDose = true;
            } else if (atbDisease === 'cholera') {
                isCorrectDrug = form.atbDrug === 'azitro' || form.atbDrug === 'cipro';
                if (form.atbDrug === 'azitro' && (form.atbDose === '30_dia' || form.atbDose === '10_12_dia')) isCorrectDose = true;
                if (form.atbDrug === 'cipro' && form.atbDose === '15_12h') isCorrectDose = true;
            } else if (atbDisease === 'amebiasis') {
                isCorrectDrug = form.atbDrug === 'metro';
                if (form.atbDrug === 'metro' && form.atbDose === '50_dia_8h_10d') isCorrectDose = true;
            } else if (atbDisease === 'giardiasis') {
                isCorrectDrug = form.atbDrug === 'metro';
                if (form.atbDrug === 'metro' && form.atbDose === '15_dia_8h_5d') isCorrectDose = true;
            }

            if (isCorrectDrug && isCorrectDose) {
                conductItems.push({
                    title: `Antibioticoterapia Masterizada (${atbDisease.toUpperCase()})`,
                    status: 'success',
                    message: `Droga e Posologia Perfeitas: ${form.atbDrug}`,
                    protocol: "Seguiu as frentes do Ministério da Saúde rigorosamente.",
                    explanation: "Conduta Magistral. Você cruzou a suspeita etiológica pesada com a droga de Primeira Linha exata. Mais impressionante ainda: você acertou o alvo matemático na dose (mg/kg), evitando subterfúgios da resistência microbiana e protegendo a integridade renal do infante."
                });
            } else if (isCorrectDrug && !isCorrectDose) {
                conductScore = Math.max(0, conductScore - 15);
                treatmentSection.score = conductScore;
                conductItems.push({
                    title: `Erro Posológico (${atbDisease})`,
                    status: 'warning',
                    message: `Droga Certa (${form.atbDrug}), porém a Dose falhou.`,
                    protocol: "Sempre verificar as doses-alvo prescritas no bulário neonatal/pediátrico.",
                    explanation: "Você mandou super bem sacando a doença e escolhendo o antibiótico certo na prateleira. Contudo, na hora de assinar a receita, o escorregão na Posologia deixou a terapia sub-ótima — o que em pediatria significa colocar a criança na fronteira tóxica ou na falha clínica."
                });
            } else {
                conductScore = Math.max(0, conductScore - 20);
                treatmentSection.score = conductScore;
                
                let protocolString = "Disenteria Febril: Ciprofloxacino ou Ceftriaxona.";
                if (atbDisease === 'cholera') protocolString = "Cólera: Obrigatoriedade de Azitromicina dose única ou Cipro.";
                if (atbDisease === 'amebiasis') protocolString = "Disenteria Amebiana: Metronidazol (Amebicida Titular).";
                if (atbDisease === 'giardiasis') protocolString = "Giardíase Clínica: Metronidazol ou Albendazol.";

                conductItems.push({
                    title: `Desvio de Antimicrobiano`,
                    status: 'error',
                    message: `A Droga selecionada (${form.atbDrug}) é ineficaz/secundária para o agente agressor.`,
                    protocol: protocolString,
                    explanation: "A escolha do antimicrobiano foi cega para a cepa mais letal do cenário diagnosticado. Deixou-se de cobrir a linha de frente exata do MS."
                });
            }
        }
    } else {
        if (form.atbCheck) {
            conductScore = Math.max(0, conductScore - 20);
            treatmentSection.score = conductScore;
            conductItems.push({
                title: "Uso Abusivo de Antimicrobianos (IATROGENIA)",
                status: 'error',
                message: `Você ligou o painel e atacou com ${form.atbDrug || 'ATB sem base'}.`,
                protocol: "Omitir ATB em Diarreias Aquosas infantis sem comprovação clínica.",
                explanation: "Iatrogenia Irrefutável. A pediatria condena o uso empírico para diarreias virais pastosas/aquosas. O canhão antibiótico destruiu a última barreira de flora intestinal do seu paciente, atrasando o epitélio e encarecendo o sistema."
            });
        }
    }

    return {
        categories: [examSection, classificationSection, treatmentSection],
        totalScore: Math.round(totalScore)
    };
};
