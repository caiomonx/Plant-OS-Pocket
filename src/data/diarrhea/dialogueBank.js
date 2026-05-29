/**
 * Banco Satélite de Diálogos da Cuidadora
 * Permite injeção inversa no construtor de casos.
 * Toda avaliação, texto e rubrica ficam concentrados aqui.
 */

export const DIALOGUE_BANK = {
    // ---------------------------------------------------------------- //
    // 1. FUNDAMENTOS DO PLANO A
    // ---------------------------------------------------------------- //
    'orientDietBaby': {
        id: 'orientDietBaby',
        question: "Doutor(a), com essa diarreia toda, eu devo parar de dar o peito ou a papinha pra ele não fazer mais cocô?",
        options: [
            { id: 'wrong_stop', text: "Sim, faça pausas no aleitamento e dê apenas líquidos claros para o estômago descansar." },
            { id: 'correct_keep', text: "Não. Mantenha o aleitamento materno na mesma frequência e a alimentação habitual para ele não desidratar ou perder peso." },
            { id: 'wrong_tea', text: "Deixe ele em jejum por 12 horas e ofereça apenas chás caseiros para prender o intestino." }
        ],
        feedback: {
            points: 15,
            title: "Educação em Saúde: Aleitamento (Manejo Padrão)",
            correctId: 'correct_keep',
            msgSuccess: "Amamentação mantida com sucesso.",
            msgError: "Falha na orientação do aleitamento.",
            protocol: "Manter aleitamento materno (livre demanda) ou dieta habitual.",
            expSuccess: "A manutenção incisiva do aleitamento e da nutrição basal garantem a rápida regeneração da mucosa intestinal e evitam a desnutrição krônica.",
            expError: "Erro Grave: Pausar o aleitamento materno ou forçar jejuns agrava profundamente o re-estabelecimento enzimático do trato digestivo do lactente, piorando drasticamente o desfecho."
        }
    },
    'orientDietChild': {
        id: 'orientDietChild',
        question: "Doutor(a), com a barriga ruim desse jeito, a avó mandou suspender a comida normal e deixar só no chá com biscoito de água e sal para não forçar. Faço isso?",
        options: [
            { id: 'wrong_stop', text: "Sim, perfeitamente. Evite comidas pesadas sólidas e mantenha apenas líquidos claros para o intestino poder 'cicatrizar'." },
            { id: 'correct_keep', text: "Incorreto. A alimentação normal (saudável) deve ser integralmente mantida. Restringir a dieta para chá e bolacha aumenta o risco de desnutrição e piora a imunidade local do intestino." },
            { id: 'wrong_tea', text: "Corte todo tipo de sal e açúcar da casa, oferecendo unicamente o Soro e pedacinhos de miolo de pão branco." }
        ],
        feedback: {
            points: 15,
            title: "Educação em Saúde: Dieta Seca (Desconstrução de Mito)",
            correctId: 'correct_keep',
            msgSuccess: "Prescrição nutricional blindada brilhantemente.",
            msgError: "Mito do Repouso Gástrico endossado.",
            protocol: "Manter a Dieta Habitual normal integralmente (evitando apenas refrigerantes/guloseimas).",
            expSuccess: "Você desconstruiu uma das lendas mais destrutivas da pediatria antiga (A dieta hídrica restrita). O alimento comum é o combustível fundamental para a replicação imediata dos enterócitos destruídos pela doença.",
            expError: "Iatrogenia nutricional. Recomendar 'dieta da bolacha de água e sal e repouso intestinal' agrava furiosamente o catabolismo da criança, induzindo fraqueza muscular paralela e retardando a imunidade."
        }
    },
    'orientHygiene': {
        id: 'orientHygiene',
        question: "Ah, entendi. E o soro de pacotinho, eu posso misturar no suco de caixinha ou refrigerante pra disfarçar o gosto salgado?",
        options: [
            { id: 'wrong_juice', text: "Pode sim, o importante é ele beber tudo, não importa com o que mistura." },
            { id: 'correct_water', text: "Não. O soro deve ser misturado apenas com água limpa, filtrada ou fervida, na medida exata do pacote." },
            { id: 'wrong_sugar', text: "Pode adicionar mais açúcar na água para ficar docinho e ele aceitar melhor." }
        ],
        feedback: {
            points: 15,
            title: "Educação em Saúde: Preparo do SRO",
            correctId: 'correct_water',
            msgSuccess: "Preparo de SRO instruído corretamente.",
            msgError: "Instrução de preparo ausente ou iatrogênica.",
            protocol: "Sais de Reidratação Oral devem ser diluídos apenas em água potável.",
            expSuccess: "Você desmistificou brilhantemente a mistura com outros líquidos. O SRO já é isosmolar, balanceado. Diluí-lo em sucos ou colocar açúcar hipertrofia a osmolalidade.",
            expError: "Diluir o SRO do Governo em refrigerantes ou sucos vai criar uma 'Bomba Osmótica' que agravará fatalmente o volume da diarreia da criança."
        }
    },
    'orientReturn': {
        id: 'orientReturn',
        question: "E se ele não quiser beber de jeito nenhum, ou começar a vomitar muito... eu dou algum remédio pra parar a diarreia em casa mesmo?",
        options: [
            { id: 'wrong_meds', text: "Isso, compre um xarope para parar de vomitar e um remédio para prender o cocô na farmácia." },
            { id: 'wrong_wait', text: "Apenas espere hidratando, a diarreia costuma durar dias. Só volte se ele tiver febre alta." },
            { id: 'correct_return', text: "De jeito nenhum. Se ele vomitar repetidamente, recusar líquidos, ou tiver sangue nas fezes, retorne imediatamente!" }
        ],
        feedback: {
            points: 15,
            title: "Educação em Saúde: Sinais de Alerta",
            correctId: 'correct_return',
            msgSuccess: "Sinais de Retorno pontuados.",
            msgError: "Omissão dos Sinais Vitais de Retorno Domiciliar.",
            protocol: "Instruir retorno imediato em caso de persistência.",
            expSuccess: "O Plano A exige pactuação ativa. Piora de estado, sangue ou letargia exigem volta imediata para a UPA. Você os orientou perfeitamente.",
            expError: "É negligência liberar um paciente em Plano A (mesmo o mais leve) sem prescrever na mente da mãe as exatas condições de piora clínica para retorno."
        }
    },

    // ---------------------------------------------------------------- //
    // 2. MITOLOGIAS CULTURAIS PEDIÁTRICAS (PEGADINHAS COMUNS)
    // ---------------------------------------------------------------- //
    'orientTeething': {
        id: 'orientTeething',
        question: "Doutor(a), e sobre essa febrinha e o cocô mole... isso passa sozinho quando o dente de cima finalmente rasgar a gengiva, né?",
        options: [
            { id: 'wrong_myth_1', text: "Exato. É muito comum o nascimento dos dentes causar febre e diarreia frequente. Apenas espere o dente nascer." },
            { id: 'wrong_meds_teeth', text: "Com certeza os dentes inflamam muito. Vou passar um antibiótico leve e um anti-inflamatório para resolver logo." },
            { id: 'correct_myth_teething', text: "Não. O nascimento dos dentes pode causar leve incômodo, mas NÃO causa febre ou diarreia. É um quadro infeccioso que precisamos tratar." }
        ],
        feedback: {
            points: 15,
            title: "Mitos e Tabus: Dentição Decídua",
            correctId: 'correct_myth_teething',
            msgSuccess: "O Mito foi desmentido com sucesso.",
            msgError: "Mito endossado e fortalecido pelo Médico (Iatrogenia Validada).",
            protocol: "A Erupção Dentária NÃO justifica episódios gastrointestinais ou infecciosos sistêmicos.",
            expSuccess: "Perfeito. Trata-se de uma coincidência temporal avassaladora na pediatria, mas cientificamente, dentes não causam PGE (Gastroenterite).",
            expError: "Assinar embaixo do 'Mito dos Dentes' retarda diagnósticos importantes e tranquiliza a mãe no pior momento possível (pórtico da desidratação grave)."
        }
    },
    'orientVaccine': {
        id: 'orientVaccine',
        question: "Tudo bem. Mas e a vacina de Rotavírus que ela perdeu... eu não posso dar agora enquanto ela estiver com essa 'moleza', né?",
        options: [
            { id: 'wrong_wait_vax', text: "Realmente, não vacine agora. Deixe ela melhorar totalmente e espere no mínimo uns 3 meses para tomar." },
            { id: 'correct_vaccine_return', text: "Após esse quadro agudo resolver, vá ao posto verificar se ainda há tempo hábil na caderneta (ela tem datas muito restritas)." },
            { id: 'wrong_skip_vax', text: "Não tem mais jeito de tomar a gotinha do Rotavírus agora porque atrasou, nem se preocupe." }
        ],
        feedback: {
            points: 15,
            title: "Avaliação Sistêmica: Atraso Vacinal (VORH)",
            correctId: 'correct_vaccine_return',
            msgSuccess: "Oportunidade Vacinal orientada brilhantemente.",
            msgError: "Omisso nas Diretrizes do PNI Infantil.",
            protocol: "Checar estado vacinal e Prazos Limites durante TODO atendimento infantil.",
            expSuccess: "O Pediatra raiz sempre 'Abre a Caderneta'. A VORH tem uma janela temporal (limite 3 meses/7meses) super restrita, a prioridade para o imunizante era total após melhora do trânsito intestinal e vômitos.",
            expError: "O médico perdeu a oportunidade de caçar o atraso vacinal da criança. O Rotavírus age pesadamente em bebês de peito devido à infecção de primeira vez."
        }
    },
    'mythAntibiotic': {
        id: 'mythAntibiotic',
        question: "Doutor(a), com esse muco no cocô e a febre de ontem, a vizinha disse que é infecção bacteriana forte. Você não vai passar um antibiótico pra matar o bicho rápido?",
        options: [
            { id: 'wrong_antibiotic', text: "Com certeza. O muco na diarreia indica bactéria, vou passar Azitromicina para curar mais rápido." },
            { id: 'wrong_parasite', text: "Vamos tentar o Anita ou outro xarope de verme genérico primeiro por prevenção, é inofensivo e costuma ajudar." },
            { id: 'correct_myth_antibiotic', text: "De forma alguma. Diarreias com muco costumam ser virais. Usar antibióticos sem sangue visível agride a flora instestinal do bebê à toa." }
        ],
        feedback: {
            points: 15,
            title: "Mitos e Tabus: Uso Irracional de Antibióticos",
            correctId: 'correct_myth_antibiotic',
            msgSuccess: "Prescrição empírica negada com sucesso.",
            msgError: "Iatrogenia: Prescrição de Antimicrobiano em Doença Diarreica sem Critério.",
            protocol: "Antimicrobianos SÓ são indicados em Casos de Disenteria (Diarreia com CARACTERÍSTICA SANGUINOLENTA visível) ou Cólera grave associada.",
            expSuccess: "Excelente contenção! O Ministério da Saúde condena gravemente o uso empírico de antibióticos na primeira infância (para diarreias aquosas/pastosas), pois agravam absurdamente a disbiose intestinal.",
            expError: "A febre pontual e o aspecto mucoso não são critérios isolados no MS. Você estaria induzindo resistência bacteriana sem provas de disenteria (sangue)."
        }
    }
};
