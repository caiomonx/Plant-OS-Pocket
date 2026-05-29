export const ANTIBIO_CASES = [
    {
        id: 'case_001_pneumonia_pneumococcus',
        correctTherapyId: 'therapy_ceftriaxone', // In hospital ER empiric, but let's use Ceftriaxone as standard for this case
        tags: ['Pneumologia', 'Infectologia', 'Emergência / Intensiva'],
        clues: [
            "Homem de 65 anos chega à UPA com tosse produtiva (escarro ferruginoso), febre de 39,2°C e dor torácica pleurítica à direita há 3 dias. PA 100x60, FC 110, FR 28, SatO2 91% em ar ambiente. Exame físico revela estertores crepitantes no terço inferior do hemitórax direito.",
            "Radiografia de tórax evidencia consolidação lobar franca em base pulmonar direita com broncograma aéreo. Coloração de Gram do escarro (boa qualidade) demonstra predomínio de diplococos Gram-positivos lanceolados.",
            "Cultura de escarro e hemocultura colhidas na admissão fecharam positivas para Streptococcus pneumoniae (Pneumococo) sensível às cefalosporinas de 3ª geração."
        ],
        summary: "Pneumonia Adquirida na Comunidade (PAC) grave com necessidade de internação (CURB-65 elevado/hipoxemia). O paciente apresenta o quadro clássico pneumocócico. O tratamento empírico indicado em ambiente hospitalar para PAC enfermaria tipicamente envolve uma Cefalosporina de 3ª geração (Ceftriaxona 1g a 2g IV 1x/dia) ou Amoxicilina+Clavulanato, associada a um macrolídeo (Azitromicina 500mg IV ou VO 1x/dia) para cobertura atípica. Como a cultura confirmou S. pneumoniae sensível, a descalonagem pode focar na Ceftriaxona isolada ou até Amoxicilina em altas doses dependendo do MIC."
    },
    {
        id: 'case_002_viral_pharyngitis',
        correctTherapyId: 'therapy_supportive',
        tags: ['Infectologia', 'Otorrinolaringologia', 'Pediatria'],
        clues: [
            "Menina de 6 anos trazida pela mãe com quadro de dor de garganta, febre baixa (37,8°C), coriza hialina profusa, tosse irritativa e hiperemia conjuntival há 2 dias. Nega vômitos ou dor abdominal.",
            "Exame da orofaringe mostra hiperemia difusa, sem exsudato amigdaliano purulento, sem petéquias no palato. Linfonodos cervicais anteriores pequenos e indolores. Teste rápido para Estreptococo do Grupo A (TR) no consultório é negativo.",
            "O quadro evolui com melhora gradual após 4 dias. Swab de orofaringe (cultura) solicitada a pedido da mãe superprotetora retorna negativo para bactérias patogênicas após 48 horas. Painel viral detecta Adenovírus."
        ],
        summary: "Faringite Viral. A presença de tosse, coriza e conjuntivite associadas à dor de garganta fala fortemente a favor de etiologia viral. O exame físico sem sinais clássicos bacterianos e o Teste Rápido negativo contraindicam antibiótico de rotina. O tratamento correto é estritamente Suporte / Sintomáticos (analgésicos e antitérmicos como Ibuprofeno ou Paracetamol, lavagem nasal e hidratação). O uso de antibióticos neste cenário não encurta o quadro e promove resistência."
    },
    {
        id: 'case_003_tuberculosis',
        correctTherapyId: 'therapy_ripe',
        tags: ['Pneumologia', 'Infectologia', 'Ambulatorial'],
        clues: [
            "Homem de 35 anos procura o ambulatório relatando tosse produtiva há 4 semanas, associada a sudorese noturna intensa, febre vespertina e perda de 6 kg no período. Ao exame físico, apresenta-se emagrecido, com murmúrio vesicular diminuído e estertores crepitantes em ápice pulmonar direito. PA 110x70, FC 92, FR 20, SatO2 96%.",
            "A radiografia de tórax evidencia cavitação em lobo superior direito sem níveis hidroaéreos. A pesquisa de BAAR no escarro apresenta resultado positivo (+++) na primeira amostra coletada.",
            "A cultura de escarro em meio de Löwenstein-Jensen confirma o crescimento de Mycobacterium tuberculosis. O teste de sensibilidade rápido demonstra sensibilidade total aos fármacos de primeira linha."
        ],
        summary: "O paciente apresenta o quadro clínico clássico de tuberculose pulmonar ativa, no qual a tosse crônica com sudorese noturna (1ª pista) e a cavitação apical no radiológico (2ª pista) apontam consistentemente para este diagnóstico. A confirmação etiológica pela baciloscopia positiva e cultura (3ª pista) definem a necessidade de início imediato do tratamento. A terapia empírica e definitiva preconizada no adulto envolve a fase intensiva com o Esquema RIPE (Rifampicina 150 mg, Isoniazida 75 mg, Pirazinamida 400 mg e Etambutol 275 mg combinados), com a administração de 4 comprimidos por via oral (VO), 1x ao dia, em jejum, por 2 meses, seguido da fase de manutenção com Rifampicina e Isoniazida por mais 4 meses."
    },
    {
        id: 'case_004_erysipelas_saureus',
        correctTherapyId: 'therapy_cephalexin',
        tags: ['Dermatologia', 'Infectologia', 'Emergência'],
        clues: [
            "Mulher de 55 anos, com diabetes tipo 2 de longa data, comparece à emergência com dor, vermelhidão e inchaço no membro inferior direito há 2 dias, associados a calafrios e febre de 38,8°C. Ao exame físico, nota-se uma placa eritematosa bem delimitada, intensamente edemaciada, com calor local e presença de uma bolha de conteúdo purulento na face anterior da perna.",
            "O hemograma revela leucocitose com desvio à esquerda. A coloração de Gram do exsudato puncionado da bolha demonstra um predomínio acentuado de cocos Gram-positivos agrupados em cachos.",
            "A cultura da secreção purulenta isola o crescimento de Staphylococcus aureus sensível à meticilina (MSSA) e resistente apenas à penicilina G clássica."
        ],
        summary: "A presença de uma placa eritematosa bem delimitada associada a uma lesão bolhosa purulenta no membro inferior sugere fortemente uma infecção bacteriana de pele e partes moles (1ª pista). O isolamento de cocos Gram-positivos em cachos (2ª pista) confirmou infecção por Staphylococcus aureus sensível à meticilina (MSSA) após a cultura (3ª pista). Colocando em prática a descalonagem antimicrobiana e a transição para uma terapia guiada segura, a intervenção correta é a prescrição de Cefalexina 500 mg, por via oral (VO), de 6/6 horas por 7 a 10 dias."
    },
    {
        id: 'case_005_primary_syphilis',
        correctTherapyId: 'therapy_penicillin_g_benzathine',
        tags: ['Infectologia', 'Urologia', 'Ambulatorial'],
        clues: [
            "Homem de 28 anos, sexualmente ativo, procura a Unidade Básica de Saúde queixando-se de uma ferida no pênis que surgiu há cerca de 10 dias. Ao exame, observa-se uma úlcera única na glande, medindo 1 cm de diâmetro, com base limpa, bordas endurecidas e completamente indolor à palpação, acompanhada de linfadenopatia inguinal bilateral também indolor.",
            "O exame de microscopia de campo escuro do exsudato da lesão revela a presença de espiroquetas móveis. O teste não treponêmico (VDRL) apresenta-se reagente com titulação inicial de 1:8.",
            "O teste rápido treponêmico (FTA-ABS) tem resultado reagente, confirmando a infecção definitiva por Treponema pallidum. A avaliação não mostra nenhuma evidência clínica de envolvimento sistêmico ou neurossífilis."
        ],
        summary: "A úlcera genital única, de base limpa e bordas endurecidas (cancro duro), associada à adenopatia inguinal indolor é o marco clínico incontestável da sífilis primária (1ª pista). A visualização de espiroquetas e a sorologia treponêmica reagente fecham o diagnóstico confirmatório (2ª e 3ª pistas) de infecção precoce pelo Treponema pallidum. A terapia curativa e de escolha deve ser realizada com Penicilina G Benzatina na dose de 2.400.000 UI, administrada por via intramuscular (IM) em dose única, sendo dividida a aplicação de 1.200.000 UI em cada glúteo."
    },
    {
        id: 'case_006_strep_pharyngitis',
        correctTherapyId: 'therapy_amoxicillin',
        tags: ['Pediatria', 'Infectologia', 'Otorrinolaringologia'],
        clues: [
            "Menino de 10 anos é levado ao pronto-atendimento pediátrico com início súbito de febre alta (39,1°C), dor de garganta intensa e severa dificuldade para engolir há 24 horas, negando tosse ou coriza associada. Ao exame da orofaringe, apresenta amígdalas muito aumentadas e hiperemiadas, recobertas por exsudato purulento esbranquiçado, com linfonodos cervicais anteriores palpáveis e dolorosos.",
            "Diante dos critérios clínicos pontuados na admissão, foi realizado o Teste Rápido para Antígeno Estreptocócico (Swab de Orofaringe), que demonstrou resultado imediatamente positivo.",
            "A cultura de orofaringe coletada na admissão confirma de forma definitiva o crescimento de Streptococcus pyogenes (Estreptococo beta-hemolítico do Grupo A), que mantém perfil de sensibilidade universal às penicilinas."
        ],
        summary: "A apresentação clínica da criança com febre aguda, exsudato amigdaliano franco, adenopatia cervical dolorosa e a ausência de tosse preenche os critérios clássicos (Critérios de Centor) que apontam para uma etiologia bacteriana da dor de garganta (1ª pista). O teste rápido (2ª pista) em conjunto com a cultura orofaríngea (3ª pista) positivos para Streptococcus pyogenes fecham o diagnóstico, reforçando a importância do uso de terapia direcionada de espectro estreito. O tratamento oral recomendado de primeira linha para erradicação bacteriana é a Amoxicilina 50 mg/kg/dia, por via oral (VO), dividida em intervals de 12/12h ou 8/8h, devendo ser mantida durante o tempo estrito de 10 dias completos."
    },
    {
        id: 'case_007_acute_cystitis',
        correctTherapyId: ['therapy_nitrofurantoin', 'therapy_fosfomycin', 'therapy_tmp_smx'],
        tags: ['Urologia', 'Ginecologia', 'Infectologia', 'Ambulatorial'],
        clues: [
            "Mulher de 24 anos procura atendimento ambulatorial queixando-se de ardência miccional intensa (disúria), aumento da frequência de micções (polaciúria) com pequenas quantidades de urina, e sensação de urgência miccional há 2 dias. Relata também dor suprapúbica em cólica leve ao final da micção. Nega febre, calafrios, dor lombar, náuseas ou corrimento vaginal.",
            "O exame físico revela abdômen plano, indolor à palpação profunda, com leve desconforto à palpação na região suprapúbica. O sinal de Giordano (punção-percussão lombar) é negativo bilateralmente. O exame de Urina Tipo 1 (EAS) demonstra leucocitúria acentuada (superior a 50 leucócitos por campo), presença de nitrito positivo e hematúria microscópica.",
            "A urocultura coletada antes de iniciar o tratamento confirma o crescimento de Escherichia coli (> 10^5 UFC/mL) com perfil de sensibilidade universal a todos os antimicrobianos testados."
        ],
        summary: "Cistite Aguda Não Complicada. Os sintomas irritativos do trato urinário baixo (disúria, polaciúria, urgência) associados à ausência de manifestações sistêmicas como febre e dor lombar fecham o diagnóstico clínico da cistite clássica (1ª pista). O EAS confirmando leucocitúria e nitrito positivo (2ª pista) e a urocultura identificando E. coli (3ª pista) validam a etiologia. Como as taxas de resistência local do patógeno a penicilinas são historicamente altas, as opções ideais de primeira linha são a Nitrofurantoína (100 mg por via oral - VO, de 6/6h por 5 a 7 dias), a Fosfomicina trometamol (3g por via oral - VO, dose única) ou o Sulfametoxazol + Trimetoprima / Bactrim (800/160 mg por via oral - VO, de 12/12h por 3 dias, caso a taxa de resistência local de E. coli seja comprovadamente menor que 20%)."
    },
    {
        id: 'case_008_giardiasis_pediatric',
        correctTherapyId: 'therapy_metronidazole',
        tags: ['Pediatria', 'Gastroenterologia', 'Parasitologia', 'Ambulatorial'],
        clues: [
            "Menino de 4 anos é trazido ao pediatra pela mãe devido a um quadro de diarreia que persiste há 3 semanas. As fezes são descritas como gordurosas, volumosas, extremamente fétidas e que frequentemente 'boiam' no vaso sanitário. A mãe refere também distensão abdominal importante, flatulência excessiva e parada no ganho de peso. A criança frequenta creche diariamente.",
            "O hemograma revela hemoglobina e leucócitos normais, sem eosinofilia expressiva. O coprológico funcional acusa má absorção lipídica importante (esteatorreia). O primeiro exame parasitológico de fezes (EPF) por método de sedimentação retorna negativo para ovos ou parasitas.",
            "A segunda amostra de EPF coletada 3 dias após (já que a eliminação do patógeno é intermitente) confirma a presença de cistos ovais característicos e alguns trofozoítos móveis piriformes com aparência clássica de 'rosto chorando' (Giardia lamblia)."
        ],
        summary: "Giardíase Pediátrica. A queixa de diarreia crônica com características esteatorreicas associada à distensão abdominal e perda ponderal em criança em idade de creche (1ª pista) levanta forte suspeita de síndrome malabsortiva parasitária. A negatividade do primeiro EPF (2ª pista) é um achado comum devido à excreção intermitente de cistos, reforçando a necessidade de coleta de múltiplas amostras temporais. O diagnóstico confirmatório se dá com a detecção de Giardia lamblia no exame parasitológico posterior (3ª pista). O tratamento de escolha para eliminação de trofozoítos que acarretam atrofia das vilosidades duodenais é o Metronidazol na dose pediátrica de 15 mg/kg/dia, por via oral (VO), dividida em 3 tomadas diárias (de 8/8h), durante o período de 5 dias consecutivos."
    },
    {
        id: 'case_009_shigellosis_dysentery',
        correctTherapyId: ['therapy_ciprofloxacin', 'therapy_azithromycin'],
        tags: ['Infectologia', 'Emergência', 'Gastroenterologia'],
        clues: [
            "Mulher de 32 anos comparece ao pronto-socorro com início agudo de cólicas abdominais difusas e intensas, febre alta de 38,9°C e diarreia profusa com presença de muco e sangue vivo há 2 dias. Queixa-se de tenesmo retal doloroso e incapacitante. Refere desidratação e fraqueza muscular importante.",
            "Ao exame físico, apresenta-se desidratada (++/+4), com dor difusa à palpação abdominal, sem sinais de peritonite. A pesquisa de leucócitos nas fezes (leucograma fecal) revela intensa reação inflamatória, demonstrando abundantes leucócitos polimorfonucleares e hemácias. O hemograma demonstra leucocitose significativa com desvio para a esquerda.",
            "A coprocultura coletada no atendimento emergencial acusa crescimento definitivo de colônias de Shigella sonnei sensível a quinolonas e macrolídeos."
        ],
        summary: "Disenteria Bacteriana (Shiguelose). O quadro clínico agudo caracterizado por febre alta, dor abdominal em cólica intensa, fezes muco-sanguinolentas e tenesmo retal (1ª pista) configura a síndrome disentérica bacteriana. A presença de marcante reação inflamatória fecal com polimorfonucleares abundantes (2ª pista) confirma o caráter invasivo da infecção intestinal, e a coprocultura isolando a Shigella sonnei (3ª pista) estabelece a etiologia definitiva. Embora autolimitada em imunocompetentes, a terapia com antimicrobianos está indicada para reduzir o tempo de sintomas e o período de excreção do patógeno. As opções recomendadas de primeira linha para adultos envolvem a Fluoroquinolona (Ciprofloxacino 500 mg por via oral - VO, de 12/12h por 3 dias) ou o Macrolídeo (Azitromicina 500 mg por via oral - VO, dose única diária por 3 dias)."
    }
];
