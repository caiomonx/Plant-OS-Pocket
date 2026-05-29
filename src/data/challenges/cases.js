export const CHALLENGE_CASES = [
  {
    id: 'case_001_ami',
    correctDiagnosisId: 'scacsst',
    tags: ["Cardiologia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo masculino, 64 anos, dá entrada no pronto-socorro queixando-se de dor precordial.",
      "A dor é em região subesternal, opressiva (em aperto), e iniciou horas atrás enquanto subia um lance de escadas.",
      "Ao exame físico, apresenta-se bastante sudoreico (diaforese), com fáscies de dor. Pressão arterial 150/90 mmHg.",
      "Refere também que a dor não cede ao repouso e parece irradiar para o membro superior esquerdo e mandíbula.",
      "O Eletrocardiograma (ECG) revela supradesnivelamento do segmento ST de 3mm nas derivações DII, DIII e aVF."
    ],
    summary: "O Infarto Agudo do Miocárdio com Supradesnivelamento de ST (IAMCSST) ocorre pela oclusão total e aguda de uma artéria coronária epicárdica, levando à necrose transmural. O quadro inicia-se classicamente com dor opressiva subesternal desencadeada por esforço (2ª pista), refletindo a isquemia em curso. A intensa descarga adrenérgica secundária à dor e ao baixo débito justifica a diaforese profusa (3ª pista). O diagnóstico clínico forte da irradiação para mandíbula/MSE (4ª pista) é selado inquestionavelmente pelo achado da 5ª pista: o supradesnivelamento de ST nas derivações DII, DIII e aVF confirma não apenas a isquemia transmural, mas topografa a lesão para a parede inferior do ventrículo (artéria coronária direita). A intervenção percutânea ou trombólise imediata é mandatória."
  },
  {
    id: 'case_002_dka',
    correctDiagnosisId: 'dka',
    tags: ["Endocrinologia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo feminino, 22 anos, chega à UPA trazida por familiares com rebaixamento do nível de consciência.",
      "Familiares relatam que ela parecia desidratada, com muita sede (polidipsia) e urinando muito (poliúria) há cerca de 3 dias.",
      "Ao exame físico do tórax, chama a atenção uma incursão respiratória rápida e profunda e um odor estranho no ar.",
      "A Gasometria Arterial colhida em emergência revela pH 7.15, pCO2 25, HCO3 10 (Acidose Metabólica com Anion Gap elevado).",
      "Glicemia capilar no momento da admissão marca 'HI' (>500 mg/dL) e a dipstick de urina revela forte positividade (3+) para corpos cetônicos."
    ],
    summary: "A Cetoacidose Diabética (CAD) é uma complicação aguda gravíssima, caracterizada pela deficiência absoluta de insulina e excesso de contrarreguladores. A história prévia de poliúria e polidipsia (2ª pista) indica diurese osmótica prolongada pela hiperglicemia severa. O hálito cetônico e a respiração rápida e profunda (3ª pista) refletem o clássico padrão de Kussmaul, uma tentativa compensatória do pulmão de eliminar CO2 frente à grave acidose metabólica com Anion Gap elevado (4ª pista). O pulo do gato definitivo está na 5ª pista: a combinação de glicemia capilar em 'HI' e forte positividade para corpos cetônicos na urina confirma a tríade patognomônica da CAD (hiperglicemia, acidose e cetonemia/cetonúria). A reposição volêmica vigorosa e a insulinoterapia venosa são o pilar do resgate clínico."
  },
  {
    id: 'case_003_copd',
    correctDiagnosisId: 'copd',
    tags: ["Pneumologia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo masculino, 71 anos, é trazido pela família com queixa de 'canseira que não passa' e muita sonolência.",
      "A família relata história de tabagismo passivo e ativo (50 anos/maço). Há 3 dias iniciou tosse produtiva abundante com escarro amarelo.",
      "Ao exame físico, nota-se tiragem intercostal e tempo expiratório prolongado, com sibilos difusos à ausculta pulmonar.",
      "A oximetria de pulso em ar ambiente marca 85%. O paciente está francamente torporoso (rebaixamento de sensório) em respiração agônica.",
      "A Gasometria Arterial colhida revela: pH 7.24 (Acidose severa), pCO2 70 mmHg (Hipercapnia) e HCO3 30 mEq/L."
    ],
    summary: "A Exacerbação Infecciosa da Doença Pulmonar Obstrutiva Crônica (DPOC) descompensa agudamente a mecânica ventilatória do paciente pneumopata. A história crônica de tabagismo associada à mudança recente do escarro (2ª pista) aponta fortemente para um gatilho infeccioso. A tiragem intercostal e sibilos difusos (3ª pista) refletem a iminência de fadiga muscular respiratória. A saturação baixa (85%) e o rebaixamento de sensório (4ª pista) são a tradução clínica da narcose pelo acúmulo letal de dióxido de carbono. A confirmação irrefutável vem na 5ª pista: a gasometria demonstrando pH de 7.24 com pCO2 de 70 mmHg sela o diagnóstico de Acidose Respiratória descompensada, exigindo suporte ventilatório não invasivo (VNI/BiPAP) com urgência extrema."
  },
  {
    id: 'case_004_age',
    correctDiagnosisId: 'age',
    tags: ["Gastroenterologia","Infectologia"],
    clues: [
      "Paciente do sexo feminino, 26 anos, procura atendimento de pronto-socorro com queixa de mal-estar extremo após viagem.",
      "Ao longo do dia anterior, apresentou 8 episódios de fezes aquosas profusas e seguidas cólicas abdominais.",
      "Ao exame físico apresenta-se taquicárdica (115 bpm), com mucosa oral bastante ressecada e turgor da pele grosseiramente diminuído.",
      "Exames de triagem atestam uma Gasometria com pH 7.28, HCO3 de apenas 14 e pCO2 31.",
      "O cálculo do Anion Gap demonstra valor normal de 10 (Acidose Metabólica Hiperclorêmica / Perda Mineral Pura)."
    ],
    summary: "A Gastroenterite Aguda toxigênica ou viral leva a uma hipersecreção intestinal e perda profunda de fluidos ricos em eletrólitos. Os múltiplos episódios de fezes aquosas profusas (2ª pista) instigam um brutal esgotamento de bicarbonato pelas fezes. Isso repercute clinicamente na franca desidratação e resposta compensatória adrenérgica da taquicardia a 115 bpm (3ª pista). A gasometria revela as consequências dramáticas com pH 7.28 e queda brutal do HCO3 para 14 (4ª pista). O pulo do gato reside na 5ª pista: o cálculo do Anion Gap normal (10) sela o diagnóstico de Acidose Metabólica Hiperclorêmica (perda mineral pura base-para-exterior), descartando causas por consumo de ácidos orgânicos como acidose lática ou cetoacidose."
  },
  {
    id: 'case_005_sepsis',
    correctDiagnosisId: 'sepsis',
    tags: ["Infectologia","Emergência / Intensiva"],
    clues: [
      "Homem idoso, 80 anos, acamado por sequela de AVC, levado ao pronto-socorro apresentando febre alta (39°C) e tremores calafrios.",
      "Sua cuidadora notou hoje pela manhã que o débito da sonda de alívio estava extremamente turvo e exalava odor fortemente putrefato.",
      "Sinais Vitais na triagem agravam a hipótese: O paciente tem Frequência Respiratória de 28 irpm e Oximetria beirando 91%.",
      "É iniciada fase precoce do protocolo com 2000ml de Ringer Lactato (ressuscitação volêmica), mas a Pressão Arterial do idoso recusa-se a subir e se mantem chumbada em 70x40 mmHg.",
      "Laboratório retorna do STAT revelando Leucocitose importante (25.000 células, desvio à esquerda) e Lactato Arterial de 5.0 mmol/L."
    ],
    summary: "O Choque Séptico é o estágio mais letal da disfunção orgânica induzida por infecção, caracterizado por profundas anormalidades circulatórias, celulares e metabólicas. A identificação do foco infeccioso no débito urinário purulento (2ª pista) associado aos sinais de resposta sistêmica evidente, como a taquipneia e queda de oximetria (3ª pista), configuram precocemente a sepse. O pulo do gato é a falência hemodinâmica total evidenciada pela hipotensão de 70x40 mmHg refratária à ressuscitação volêmica agressiva com 2L de cristaloide (4ª pista), que obriga o uso imediato de vasopressores. A 5ª pista (lactato estourado de 5.0 mmol/L e leucocitose maciça) confirma de forma cabal a hipoperfusão sistêmica celular, atestando a gravidade extrema e o colapso vasoativo subjacente."
  },
  {
    id: 'case_006_hyperemesis',
    correctDiagnosisId: 'hyperemesis',
    tags: ["Ginecologia & Obstetrícia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo feminino, 28 anos, gestante de 9 semanas, chega à emergência amparada pelo marido devido à fraqueza extrema.",
      "Ela relata intolerância universal a líquidos e sólidos, tendo apresentado cerca de 15 episódios eméticos biliosos apenas nas últimas 24 horas.",
      "Ao tentar se levantar da maca, a paciente apresenta tontura severa (ortostatismo positivo). Há queixa marcante de cãibras musculares nas panturrilhas.",
      "A oximetria de pulso é normal, porém a frequência respiratória é lenta, marcando apenas 12 irpm. A pressão arterial encontra-se 90/60 mmHg (depleção de volume).",
      "Laboratoriais evidenciam um Sódio de 138, Potássio baixíssimo de 2.8, Cloro muito depletado de 84, e uma Gasometria revelando pH 7.52 e pCO2 48."
    ],
    summary: "A Hiperêmese Gravídica é uma complicação severa do início da gestação, caracterizada por náuseas e vômitos incoercíveis que resultam em desidratação e distúrbios eletrolíticos. Os episódios eméticos biliosos repetidos (2ª pista) causam uma enorme perda de suco gástrico, rico em ácido clorídrico. A consequente depleção de volume leva ao ortostatismo e a perda de eletrólitos gera cãibras (3ª pista). O pulo do gato diagnóstico vem na 5ª pista: o laboratório atesta o clássico quadro de Alcalose Metabólica Hipoclorêmica (Cloro de 84, pH 7.52), acompanhada de grave hipocalemia (Potássio 2.8). Para tentar compensar a alcalemia extrema, o centro respiratório inibe a ventilação, gerando a bradipneia (12 irpm) e a retenção de pCO2 (48 mmHg) observadas na 4ª pista. Reposição volêmica com soro fisiológico é fundamental."
  },
  {
    id: 'case_007_myeloma',
    correctDiagnosisId: 'multiple_myeloma',
    tags: ["Hematologia","Nefrologia"],
    clues: [
      "Paciente feminina, 67 anos, dá entrada na emergência em franco estado de letargia aguda, não respondendo a comandos verbais simples.",
      "Familiares trazem consigo exames de um ambulatório onde ela passava por investigação recente de grave dor lombar crônica e anemia normocítica (Hb 10.1 g/dL).",
      "Ao exame físico na sala vermelha, o médico constata desidratação maciça (4+/4+) e frequência respiratória bradipneica de 8 irpm.",
      "O Lcr. atual mostra creatinina saltando de 2.3 mg/dL e Ureia 102 mg/dL.",
      "Laboratório complementar com Cálcio Sérico de 13.5 mg/dL e Eletroforese de Proteínas Plasmáticas evidenciando pico monoclonal na região gama."
    ],
    summary: "O Mieloma Múltiplo é uma neoplasia hematológica de plasmócitos que infiltra a medula óssea, produzindo imunoglobulinas monoclonais e causando destruição sistêmica. O quadro clássico é guiado pelos achados 'CRAB'. A grave dor lombar e anemia normocítica (2ª pista) refletem a invasão medular e a lise óssea ('A'nemia e 'B'one lesions). Essa lise joga quantidades imensas de cálcio no sangue, e a hipercalcemia atua nos túbulos renais induzindo uma diurese maciça, o que explica a desidratação severa (3ª pista). A consequência é a injúria renal aguda ('R'enal), atestada pela ureia e creatinina elevadas (4ª pista). O pulo do gato que sela a doença e a hipercalcemia maligna ('C'alcemia) vem na 5ª pista: o encontro de um pico monoclonal na região gama da eletroforese comprova a superprodução proteica do clone plasmocitário."
  },
  {
    id: 'case_008_diabetes_insipidus',
    correctDiagnosisId: 'diabetes_insipidus_nephrogenic',
    tags: ["Endocrinologia","Psiquiatria","Nefrologia"],
    clues: [
      "Paciente psiquiátrico de 45 anos, usuário crônico de carbonato de Lítio, é levado à unidade hospitalar por episódios convulsivos em casa.",
      "Acompanhantes relatam que nos últimos longos meses o paciente vivia abraçado com garrafas de água (intensa polidipsia) e urinava volumes imensos constantemente (poliúria volumosa).",
      "No entanto, ele esteve acamado por 2 dias devido a uma infecção viral respiratória pesada, impossibilitado de alcançar água para beber, o que precipitou os rebaixamentos.",
      "A Gasometria e ionograma admissionais revelam um quadro hiperosmolar violento, com Sódio plasmático atingindo alarmantes 165 mEq/L (Hipernatremia letal).",
      "A Densidade Urinária incrivelmente baixa (1.005) mesmo perante a brutal hipernatremia plasmática confirma a falha crônica na capacidade do rim em 'fechar a torneira' e concentrar urina."
    ],
    summary: "O Diabetes Insipidus Nefrogênico induzido por Lítio ocorre devido à toxicidade crônica da droga, que torna os ductos coletores renais refratários à ação do hormônio antidiurético (ADH). Sem o ADH funcionar, o paciente perde água livre incessantemente, o que explica a poliúria volumosa e a intensa polidipsia compensatória (2ª pista). O colapso acontece quando o paciente fica impossibilitado de beber água (3ª pista). Sem repor o líquido que continua sendo jorrado pelo rim, ele rapidamente desenvolve grave contração de volume e uma temível Hipernatremia de 165 mEq/L (4ª pista), que desidrata os neurônios e gera as convulsões. O pulo do gato é a 5ª pista: a densidade urinária extremamente baixa (1.005) mesmo diante de um sangue hipersaturado de sódio prova de forma inquestionável a falência dos rins em concentrar a urina."
  },
  {
    id: 'case_009_pe',
    correctDiagnosisId: 'pe',
    tags: ["Pneumologia","Cardiologia","Emergência / Intensiva"],
    clues: [
      "Paciente feminina, 34 anos, sem histórico prévio de asma, procura o pronto-socorro referindo início súbito de falta de ar e dor torácica que piora ao inspirar.",
      "Ela relata ter feito uma viagem internacional prolongada (14 horas de voo) há cerca de dois dias.",
      "Ao exame físico, apresenta-se ansiosa, taquicárdica (115 bpm) e taquipneica (28 irpm), com saturação de O2 em 89% em ar ambiente.",
      "A ausculta pulmonar é limpa bilateralmente, sem ruídos adventícios, apesar da severa hipoxemia relatada.",
      "Um Eletrocardiograma (ECG) de urgência não mostra supradesnivelamento, mas evidencia o padrão S1Q3T3 e inversão de onda T em V1-V4."
    ],
    summary: "O Tromboembolismo Pulmonar (TEP) é o bloqueio da circulação arterial pulmonar por um trombo originário, na maioria das vezes, das veias profundas das pernas. A apresentação súbita de falta de ar com dor pleurítica (1ª pista) em contexto de estase venosa prolongada por viagem (2ª pista) forma a história clínica clássica. A enorme dissociação clínico-radiológica – ou seja, um paciente com intensa hipoxemia e taquipneia (3ª pista) mas com ausculta pulmonar perfeitamente limpa (4ª pista) – indica uma falha de perfusão, e não de ventilação. O pulo do gato laboratorial (embora inconstante, muito clássico em provas) encontra-se na 5ª pista: o padrão S1Q3T3 associado a inversão de onda T nas precordiais direitas (V1-V4) sela o diagnóstico refletindo o cor pulmonale agudo e a abrupta sobrecarga pressórica no ventrículo direito. A angiotomografia seria o exame padrão-ouro a seguir."
  },
  {
    id: 'case_010_myasthenia',
    correctDiagnosisId: 'myasthenia_gravis',
    tags: ["Neurologia","Reumatologia"],
    clues: [
      "Paciente do sexo feminino, 26 anos, queixa-se de cansaço extremo que piora progressivamente ao longo do dia.",
      "A paciente relata que tem dificuldade de mastigar e engolir, especialmente no jantar, percebendo que sua voz também fica mais anasalada à noite.",
      "No exame neurológico matutino, não foram encontradas reduções de força apendicular marcantes. O reflexo tendíneo é preservado e simétrico.",
      "Durante o teste de olhar sustentado para cima por 1 minuto, observa-se ptose palpebral assimétrica que surge evidente apenas ao fim do teste.",
      "Aplica-se gelo sobre as pálpebras (Ice Pack Test) por 2 minutos, e a paciente relata melhora imediata da ptose ocular."
    ],
    summary: "A Miastenia Gravis é uma doença autoimune de junção neuromuscular, causada por autoanticorpos (tipicamente Anti-AChR) que bloqueiam e destroem os receptores de acetilcolina na placa motora pós-sináptica. Essa patogenia gera uma fraqueza muscular flutuante e fatigável, que piora dramaticamente ao longo do dia com o esgotamento dos neurotransmissores, impactando clássica e primeiramente os pequenos músculos bulbares e oculares – como mastigar e manter a voz normal no jantar (2ª pista). Como o nervo em si está intacto, os reflexos tendíneos são poupados no exame matutino (3ª pista). O pulo do gato surge nas pistas 4 e 5: a ptose evidente provocada pelo olhar fixo sustentado (esgotamento de acetilcolina) é totalmente revertida pelo Ice Pack Test (5ª pista), pois o resfriamento inibe localmente a enzima acetilcolinesterase, aumentando temporariamente a fenda sináptica e provando a natureza miastênica da doença."
  },
  {
    id: 'case_011_adrenal_crisis',
    correctDiagnosisId: 'adrenal_crisis',
    tags: ["Endocrinologia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo masculino, 42 anos, trazido ao PS pela parceira devido à letargia, confusão mental severa, náuseas e vômitos refratários.",
      "Seus registros médicos pregressos indicam que ele usa prednisona contínua há 5 anos por doença autoimune reumática, mas o suprimento de medicação acabou há 3 dias em casa.",
      "Ao exame, encontra-se francamente hipotenso (70x40 mmHg) e chocado, porém com uma taquicardia desproporcionalmente inexpressiva (90 bpm).",
      "É iniciado acesso venoso com bólus de 2L de cristaloide e uso de noradrenalina em bomba de infusão contínua, mas a pressão arterial mostra-se absolutamente refratária e não se eleva.",
      "Exames laboratoriais evidenciam Hiponatremia (Sódio 125 mEq/L), Hipercalemia (Potássio 6.4 mEq/L) e Hipoglicemia profunda (42 mg/dL)."
    ],
    summary: "A Crise Adrenal (Insuficiência Adrenal Aguda) é uma emergência endócrina letal desencadeada pela deficiência aguda de cortisol e aldosterona. O paciente apresenta supressão prévia do eixo hipotálamo-hipófise-adrenal devido ao uso crônico de corticoide (2ª pista). A interrupção abrupta da medicação leva a um choque vasoplégico atípico, caracterizado por hipotensão severa mas com frequência cardíaca normal ou apenas levemente aumentada (3ª pista). O pulo do gato na clínica da UTI (4ª pista) é a refratariedade absoluta da pressão arterial mesmo com uso de altas doses de vasopressores, pois a noradrenalina necessita do cortisol para ativar os receptores alfa-adrenérgicos nos vasos. A 5ª pista sela o diagnóstico laboratorial: a ausência simultânea de glicocorticoides (hipoglicemia severa) e mineralocorticoides (perda de sódio e retenção de potássio, causando hiponatremia e hipercalemia) exige a reposição intravenosa imediata de hidrocortisona."
  },
  {
    id: 'case_012_endocarditis',
    correctDiagnosisId: 'endocarditis',
    tags: ["Cardiologia","Infectologia"],
    clues: [
      "Paciente masculino, 35 anos, usuário de drogas injetáveis admitido na clínica de emergências no meio da noite.",
      "Ele foi trazido com histórico de pelo menos 2 semanas de calafrios intensos, febre vespertina persistente, fadiga e prostração.",
      "Ao exame físico, o médico de plantão ouve um sopro holossistólico exuberante, e percebe focos ou micro hemorragias em leito ungueal (hemorragias subungueais em lasca).",
      "O reumatologista foi chamado devidos a presença de lesões petequiais pequenas e não dolorosas nas palmas das mãos (Lesões de Janeway) e algumas púrpuras em dorso dolorosas (Nódulos de Osler).",
      "Hemogramas seriados mostraram leucocitose alta e três amostras locais das hemoculturas colhidas pela ferida periférica retornaram positivas para Staphylococcus aureus (MRSA)."
    ],
    summary: "A Endocardite Infecciosa é a infecção do endotélio cardíaco, acometendo principalmente as valvas. O quadro de um paciente jovem usuário de drogas injetáveis (1ª pista) com febre arrastada de semanas aponta fortemente para colonização de valva tricúspide (coração direito). A agressão endocárdica contínua gera um sopro novo ou modificação de um sopro prévio (3ª pista). A liberação sistêmica de êmbolos sépticos e a deposição de imunocomplexos circulantes originam os clássicos estigmas periféricos: as hemorragias subungueais na mesma 3ª pista, e as temidas lesões de Janeway (indolores) e Nódulos de Osler (dolorosos) nas palmas (4ª pista). O pulo do gato patognomônico vem na 5ª pista: a recuperação do Staphylococcus aureus resistente à meticilina (MRSA) em múltiplas amostras de hemocultura sela a infecção agressiva."
  },
  {
    id: 'case_013_pheochromocytoma',
    correctDiagnosisId: 'pheochromocytoma',
    tags: ["Endocrinologia","Cardiologia"],
    clues: [
      "Paciente do sexo feminino, 41 anos, relata episódios fugazes de intenso mal-estar no último ano, sem qualquer fator desencadeante óbvio.",
      "Ela descreve classicamente durante as crises a presença súbita de batedeira intensa no peito (palpitações), sudorese fria profusa e dor de cabeça (cefaleia latejante).",
      "Um dos episódios durou algumas horas, a levando à triagem cardíaca e à detecção de pressão arterial na UPA picos acima de 220/120 mmHg e franca Taquicardia (125 bpm).",
      "Fora dos episódios ou das temidas crises as avaliações no consultório costumam mostrar pressão normotensa habitual (120/80 mmHg).",
      "O exame ambulatorial laboratorial evidenciou níveis muito aumentados de Metanefrinas e Normetanefrinas fracionadas no plasma e na urina isolada de 24 horas da jovem."
    ],
    summary: "O Feocromocitoma é um tumor raro originado das células cromafins da medula adrenal, responsável pela secreção maciça e autônoma de catecolaminas (adrenalina e noradrenalina). O quadro clínico é pontuado por 'crises' ou tempestades adrenérgicas intermitentes, perfeitamente descritas na 2ª pista pela clássica tríade: cefaleia latejante, sudorese profusa e palpitações. Essas descargas hormonais abruptas geram picos de hipertensão severa e taquicardia (3ª pista), que podem simular infartos ou ataques de pânico. A grande armadilha é que fora das crises a pressão costuma ser normal (4ª pista), dificultando o diagnóstico ambulatorial rotineiro. O pulo do gato bioquímico está na 5ª pista: a elevação das metanefrinas (produtos da degradação das catecolaminas) em urina de 24 horas comprova irrefutavelmente a hiperprodução tumoral."
  },
  {
    id: 'case_014_boerhaave',
    correctDiagnosisId: 'boerhaave',
    tags: ["Cirurgia Geral","Gastroenterologia","Emergência / Intensiva"],
    clues: [
      "Paciente do sexo masculino, 57 anos, etilista pesado, apresenta-se taquicárdico na emergência.",
      "O paciente queixa-se de dor torácica súbita, que se iniciou há 8 horas, logo após ele ter apresentado episódios de vômitos intensos.",
      "Ao exame físico, você nota diminuição dos sons respiratórios à esquerda e palpa crepitações na pele, indicando enfisema subcutâneo.",
      "A radiografia de tórax do paciente revela a presença de derrame pleural e pneumomediastino.",
      "A tomografia evidencia extravasamento de contraste do esôfago distal para o mediastino."
    ],
    summary: "A Síndrome de Boerhaave é a ruptura esofágica transmural espontânea, precipitada pelo aumento abrupto da pressão intraluminal durante um esforço emético violento, classicamente em pacientes etilistas. O caso apresenta exatamente a Tríade de Mackler completa. A dor torácica aguda secundária aos episódios de vômitos incoercíveis (2ª pista) já acende o alerta máximo. A presença da crepitação palpável indicando enfisema subcutâneo (3ª pista) é a evidência semiológica de que o ar esofágico escapou e dissecou os tecidos adjacentes. A confirmação radiológica surge com o pneumomediastino no raio-X (4ª pista). Por fim, o pulo do gato inegável está na 5ª pista: a tomografia evidenciando extravasamento de contraste confirma o pertuito e exige intervenção cirúrgica precocíssima (sutura primária) para evitar mediastinite letal."
  },
  {
    id: 'case_015_parotidite',
    correctDiagnosisId: 'parotidite_supurativa',
    tags: ["Cirurgia Geral","Infectologia"],
    clues: [
      "Homem de 70 anos evolui com febre alta no 3º dia de pós-operatório de uma cirurgia de obstrução intestinal.",
      "A cirurgia foi prolongada devido à presença de aderências, mas nenhuma alça intestinal teve de ser ressecada.",
      "O paciente encontra-se desidratado e com incapacidade de abrir a boca (trismo).",
      "Há presença de dor e edema em hemiface direita, com um inchaço muito evidente logo abaixo do lado direito da mandíbula.",
      "Ao realizar uma massagem suave do lado direito do rosto do paciente, você observa a saída de saliva purulenta."
    ],
    summary: "A Parotidite Aguda Supurativa Pós-operatória é uma infecção bacteriana da glândula parótida que acomete classicamente idosos submetidos a cirurgias abdominais prolongadas. O mecanismo fisiopatológico é elegante: a desidratação pós-operatória e o jejum prolongado suprimem o fluxo salivar protetor, transformando o ducto de Stensen em uma 'porta aberta' para a ascensão retrógrada da flora oral — com absoluta predominância do Staphylococcus aureus. O trismo (3ª pista) ocorre pela inflamação do músculo masseter adjacente à parótida. O pulo do gato é a 5ª pista: a saída de pus pela massagem do ducto parotídeo é virtualmente patognomônica e encerra a discussão diagnóstica."
  },
  {
    id: 'case_016_wilms',
    correctDiagnosisId: 'wilms',
    tags: ["Pediatria","Genética / Raras","Nefrologia"],
    clues: [
      "Criança do sexo feminino, 5 anos de idade, apresenta inapetência e febre intermitente há 3 meses.",
      "Além dos sintomas sistêmicos, os pais relatam que ela sente dor e notaram um aumento do volume abdominal ao longo desse mesmo período.",
      "Ao exame físico, a paciente encontra-se em regular estado geral, eupneica, afebril e anictérica. Nota-se também que ela está pálida (descorada) e, ao examinar o abdome, constata-se uma massa indolor palpável em seu flanco esquerdo.",
      "Seus exames de sangue mostram um quadro de anemia (Hb de 8,4 g/dL) com função renal preservada, evidenciada por uma creatinina de 0,44 mg/dL e ureia de 0,28 mg/dL, enquanto a urina tipo I revela alterações importantes, com 1 milhão de hemácias/mL e a presença de 68.000 leucócitos/mL.",
      "A ressonância magnética do abdome demonstra uma volumosa formação expansiva sólida e heterogênea de contornos lobulados, determinando importante efeito compressivo sobre o rim ipsilateral e desvio de alças intestinais para a direita."
    ],
    summary: "O Tumor de Wilms (Nefroblastoma) é a neoplasia renal maligna mais frequente na infância, com pico de incidência entre 3 e 5 anos. A massa abdominal palpável em flanco (3ª pista) é muitas vezes o achado que leva os pais a procurarem atendimento. A hematúria maciça (1 milhão de hemácias/mL na 4ª pista) denuncia a origem renal do tumor, enquanto a função renal preservada indica que o rim contralateral mantém filtração adequada. A imagem na 5ª pista é o fechamento: uma massa sólida heterogênea comprime o rim ipsilateral 'de fora para dentro', padrão clássico do Wilms — diferente do Neuroblastoma, que desloca o rim sem comprimi-lo diretamente. A conduta é nefrectomia seguida de quimioterapia adjuvante (protocolo SIOP)."
  },
  {
    id: 'case_017_d_lactic',
    correctDiagnosisId: 'd_lactic_acidosis',
    tags: ["Gastroenterologia","Genética / Raras"],
    clues: [
      "Paciente do sexo feminino, 45 anos, apresenta-se no pronto-socorro com queixa de episódios recorrentes de confusão mental, fala arrastada e instabilidade para caminhar (ataxia) que surgem tipicamente algumas horas após a ingestão de refeições ricas em carboidratos.",
      "A paciente possui histórico de isquemia mesentérica há 2 anos, que resultou em uma extensa ressecção cirúrgica de alças do intestino delgado.",
      "Ao exame físico, a paciente encontra-se desorientada no tempo e no espaço, e nota-se a presença de nistagmo, mas sem déficits motores focais. Os sinais vitais revelam taquipneia (frequência respiratória de 26 irpm).",
      "A gasometria arterial demonstra um pH de 7,25 e bicarbonato de 12 mEq/L, associados a um ânion gap elevado (22 mEq/L).",
      "Apesar da gasometria revelar uma franca acidemia metabólica com ânion gap elevado, a dosagem laboratorial padrão de lactato sérico solicitada na rotina do pronto-socorro encontra-se absolutamente normal (1,2 mmol/L)."
    ],
    summary: "A Acidose D-Lática é uma complicação metabólica rara e traiçoeira da Síndrome do Intestino Curto. Com a ressecção intestinal maciça (2ª pista), carboidratos não absorvidos chegam em excesso ao cólon, onde bactérias da flora fermentam esses substratos produzindo o isômero D-Lactato. Sua absorção sistêmica causa uma acidose metabólica com AG elevado e uma encefalopatia transitória peculiar — confusão, fala arrastada e ataxia (1ª pista) que surgem horas após refeição rica em carboidratos. O pulo do gato magistral deste caso está na 5ª pista: o lactato sérico de rotina veio absolutamente normal porque os ensaios laboratoriais convencionais do pronto-socorro dosam exclusivamente o L-Lactato (isômero da isquemia tecidual), sendo completamente cegos ao D-Lactato bacteriano. A dissociação 'acidose AG elevado com lactato normal' é a marca registrada e exige dosagem específica do D-isômero."
  },
  {
    id: 'case_018_plummer_vinson',
    correctDiagnosisId: 'plummer_vinson',
    tags: ["Gastroenterologia","Hematologia"],
    clues: [
      "Paciente do sexo feminino, 48 anos, comparece ao ambulatório relatando astenia progressiva há meses e dificuldade crescente para engolir alimentos sólidos.",
      "Ao exame físico, a paciente encontra-se pálida (descorada +3/+4), e você observa a presença de fissuras nos cantos da boca (queilite angular) e uma língua com aspecto liso, brilhante e avermelhado.",
      "O exame físico focado das extremidades revela que as unhas das mãos estão finas, quebradiças e apresentam um formato côncavo (coiloníquia).",
      "O hemograma completo demonstra hemoglobina de 8,5 g/dL, VCM de 68 fL e RDW elevado. O perfil de ferro sérico evidencia uma ferritina severamente reduzida.",
      "Uma endoscopia digestiva alta associada a um esofagograma baritado revela a presença de uma fina membrana esofágica cervical logo abaixo do esfíncter esofágico superior."
    ],
    summary: "A Síndrome de Plummer-Vinson (ou Paterson-Kelly) é definida pela tríade clássica de Disfagia cervical + Teia esofágica + Anemia Ferropriva grave. Acomete predominantemente mulheres de meia-idade. A carência crônica e severa de ferro não destrói apenas a eritropoiese (anemia microcítica hipoproliferativa na 4ª pista), mas compromete a renovação epitelial de todo o corpo, gerando achados sistêmicos marcantes: glossite atrófica (a língua lisa e brilhante da 2ª pista), queilite angular e a coiloníquia (unhas em formato de colher na 3ª pista). É justamente essa falência epitelial crônica que gera a formação da teia fibrosa no esôfago cervical (5ª pista), produzindo a disfagia mecânica para sólidos. A síndrome é considerada pré-maligna, com risco aumentado de carcinoma espinocelular de esôfago e hipofaringe."
  },
  {
    id: 'case_019_sickle_cell',
    correctDiagnosisId: 'sickle_cell',
    tags: ["Pediatria","Hematologia","Genética / Raras"],
    clues: [
      "Menina de 7 meses de idade, nascida de parto vaginal não assistido e pré-natal materno não realizado, chega ao pronto-socorro sem nenhuma avaliação ou seguimento médico prévio, com história de agitação e choro estridente há 3 dias.",
      "A criança encontra-se irritada e inconsolável; não apresenta febre, histórico de trauma ou uso de medicações prévias.",
      "Ao exame clínico, a bebê está descorada (+2/+4) e ictérica (2+/4+), com ausculta de sopro sistólico suave em foco mitral.",
      "Existe um importante edema não depressível das mãos até a altura dos punhos e dos pés até a região dos tornozelos, com hiperemia e aumento de temperatura local.",
      "O exame de eletroforese de hemoglobina apresenta predomínio de HbS e HbF."
    ],
    summary: "A Dactilite (Síndrome Mão-Pé) é frequentemente a primeira manifestação clínica dolorosa da Anemia Falciforme em lactentes entre 6 meses e 2 anos de idade. O fenômeno ocorre porque a HbF fetal protetora começa a ser substituída pela HbS defeituosa nesta faixa etária, permitindo a falcização dos eritrócitos nos pequenos vasos dos ossos metacarpais e metatarsais. Isso causa vaso-oclusão e infarto ósseo, gerando o edema doloroso bilateral e simétrico das mãos e pés (4ª pista). A palidez e icterícia concomitantes (3ª pista) são marcas da hemólise crônica de base, e o sopro sistólico é funcional (hiperdinâmico pela anemia). O pulo do gato reside na 1ª pista: uma lactente sem triagem neonatal (sem teste do pezinho) apresentando dor inexplicável — contexto que obriga a pensar em hemoglobinopatia não diagnosticada. A eletroforese com predomínio HbS + HbF sela o diagnóstico de forma inequívoca."
  },
  {
    id: 'case_020_hirschsprung',
    correctDiagnosisId: 'hirschsprung',
    tags: ["Pediatria","Cirurgia Geral","Gastroenterologia"],
    clues: [
      "Menino de 4 anos de idade apresenta-se no pronto-socorro com inapetência, febre (38°C) e parada da eliminação de flatos e fezes há 4 dias.",
      "Ao exame físico, a criança encontra-se desidratada 1+/4+. Seu abdome apresenta-se distendido difusamente, timpânico à percussão, com ruídos hidroaéreos (RHA) diminuídos e sem sinais de irritação peritoneal.",
      "A mãe relata histórico de constipação intestinal crônica desde o período neonatal, com necessidade frequente de estímulo retal para evacuar.",
      "A revisão do histórico clínico revela eliminação do primeiro mecônio com 16h de vida e, durante o toque retal atual, observa-se ampola retal vazia.",
      "O prontuário registra três internações hospitalares prévias por episódios de enterocolite, ocorridas aos 8 meses, 1 ano e 2 anos de idade."
    ],
    summary: "A Doença de Hirschsprung é caracterizada pela ausência congênita de células ganglionares no plexo mioentérico do cólon distal, impedindo o relaxamento intestinal e causando constipação crônica. O caso descreve um quadro obstrutivo agudo (2ª pista). A grande armadilha diagnóstica é que a eliminação precoce do mecônio em apenas 16h (4ª pista) e a ampola retal vazia sem evacuação explosiva vão contra a apresentação clássica neonatal. No entanto, o pulo do gato definitivo está na 5ª pista: o histórico de enterocolites de repetição em um lactente com constipação crônica desde o nascimento (3ª pista) é o elo cabal. A estase fecal crônica no segmento colônico denervado favorece o supercrescimento bacteriano e as enterocolites de repetição, sendo um padrão virtualmente patognomônico da doença nesta faixa etária."
  },
  {
    id: 'case_021_morris',
    correctDiagnosisId: 'morris',
    tags: ["Endocrinologia","Genética / Raras","Ginecologia & Obstetrícia"],
    clues: [
      "Paciente de 17 anos de idade, sexo feminino, procura atendimento ginecológico com queixa de amenorreia primária.",
      "Ao exame físico, a paciente apresenta estatura de 1,75 m e genitália externa feminina sem alterações anatômicas visíveis.",
      "A avaliação dos caracteres sexuais secundários demonstra telarca classificada como estágio M5 de Tanner.",
      "Na inspeção da pele e fâneros, constata-se estágio P1 de Tanner (ausência de pilificação pubiana e axilar).",
      "A ultrassonografia pélvica e outros exames de imagem revelam a ausência dos dois terços superiores da vagina e do útero."
    ],
    summary: "A Síndrome de Morris (Insensibilidade Completa aos Androgênios) reflete a falha total dos receptores androgênicos em indivíduos com cariótipo 46,XY. Apesar dos testículos retidos produzirem testosterona, o corpo não responde a ela. A testosterona excessiva sofre aromatização periférica para estrogênio, garantindo o pleno desenvolvimento mamário (Tanner M5 na 3ª pista) e o fenótipo feminino exterior (2ª pista). A grande armadilha é investigar a amenorreia primária (1ª pista) e descobrir a ausência de útero e vagina superior (5ª pista). Contudo, o pulo do gato que diferencia Morris da Síndrome de Rokitansky (onde ovários funcionam e há pelos) está na 4ª pista: a total ausência de pilificação pubiana e axilar (Tanner P1) atesta a refratariedade androgênica absoluta, confirmando a Síndrome de Morris."
  },
  {
    id: 'case_022_esophageal_atresia',
    correctDiagnosisId: 'esophageal_atresia',
    tags: ["Pediatria","Cirurgia Geral"],
    clues: [
      "Recém-nascido (RN) masculino, parto cesárea termo. Apresenta-se hipotônico, em apneia primária, necessitando de manobras de reanimação neonatal em sala de parto.",
      "A revisão do histórico obstétrico revela que a mãe apresentou laudo de ultrassonografia evidenciando polidrâmnio (ILA de 26 cm).",
      "Após estabilização e encaminhamento ao alojamento conjunto, o RN evolui com episódios de engasgo e cianose central à tentativa de amamentação.",
      "Ao exame físico no berço, observa-se taquipneia, tiragem subcostal e sialorreia profusa.",
      "A tentativa de introdução de sonda orogástrica (SOG) encontra resistência a 10cm da rima labial, sendo vista na radiografia enrolada em coto esofágico proximal."
    ],
    summary: "A Atresia de Esôfago é uma grave anomalia congênita em que a perda de continuidade esofágica impossibilita a passagem de fluidos para o estômago. Fetalmente, a incapacidade de deglutir o líquido amniótico impede seu clareamento, acarretando no polidrâmnio materno (2ª pista). Ao nascer, as secreções salivares da própria criança não têm escoamento para o trato digestivo, acumulando-se e exteriorizando-se pela boca (sialorreia profusa na 4ª pista). Durante as mamadas (3ª pista), o leite se acumula no coto cego e transborda para as vias aéreas, gerando os episódios de engasgo e cianose asfixiante. O pulo do gato definitivo está na 5ª pista: a impactação firme e o enrolamento da sonda orogástrica a 10cm da rima labial atestam de forma inequívoca a presença do coto esofágico proximal cego, exigindo correção cirúrgica."
  },
  {
    id: 'case_023_myopericarditis',
    correctDiagnosisId: 'myopericarditis',
    tags: ["Cardiologia","Infectologia"],
    clues: [
      "Mulher de 32 anos de idade procura o PS queixando-se de astenia e dispneia progressiva há 15 dias.",
      "Refere que há 30 dias apresentou quadro de prostração, febre, mialgia, coriza e tosse seca.",
      "Relata dispneia aos pequenos esforços, dispneia paroxística noturna (DPN) e ortopneia.",
      "O exame físico demonstra estertores crepitantes finos em bases pulmonares, turgência jugular a 45° e edema de membros inferiores 2+/4+.",
      "Há dois dias, evoluiu com dor torácica leve que não possui relação com esforço, mas que piora ao deitar-se e melhora significativamente ao se sentar com o tórax inclinado para a frente."
    ],
    summary: "A Miopericardite Viral é uma inflamação combinada do miocárdio e do pericárdio, frequentemente desencadeada por uma infecção viral respiratória ou gastrointestinal precedente. O pródromo de vias aéreas há 30 dias (2ª pista) confirma essa etiologia. O intenso dano inflamatório às fibras musculares provoca disfunção ventricular rápida nas câmaras cardíacas de uma paciente jovem e previamente hígida, justificando toda a clínica de insuficiência cardíaca congestiva aguda: astenia, ortopneia (3ª pista), estertores em bases, turgência jugular e edema de membros inferiores (4ª pista). O pulo do gato semiológico está na 5ª pista: a dor torácica característica que piora em decúbito dorsal e alivia na inclinação frontal do tórax (prece maometana) é o achado patognomônico da irritação dos folhetos pericárdicos inflamados, fechando o diagnóstico duplo."
  },
  {
    id: 'case_024_guillain_barre',
    correctDiagnosisId: 'guillain_barre',
    tags: ["Neurologia","Infectologia"],
    clues: [
      "Homem de 28 anos de idade apresenta-se no pronto-socorro relatando dificuldade repentina para sorrir e fechar completamente os olhos, iniciada nas últimas 24 horas.",
      "Anamnese revela histórico de gastroenterite aguda (GEA) há cerca de 14 dias.",
      "O paciente relata parestesia em extremidades distais e fraqueza muscular ascendente e simétrica em membros inferiores (MMII).",
      "Ao exame neurológico, detecta-se paresia flácida e arreflexia tendinosa profunda global (aquileu, patelar e bicipital ausentes).",
      "Análise do líquido cefalorraquidiano (LCR) revela dissociação albuminocitológica (hiperproteinorraquia com contagem celular normal)."
    ],
    summary: "A Síndrome de Guillain-Barré é a principal polirradiculoneuropatia desmielinizante aguda mediada imunologicamente. Sua deflagração por mimetismo molecular ocorre frequentemente dias ou semanas após uma infecção gastrointestinal prévia, classicamente pelo Campylobacter jejuni (2ª pista). O sistema imune ataca a bainha de mielina dos nervos periféricos, causando a clássica fraqueza muscular ascendente e simétrica acompanhada de parestesias (3ª pista). Uma armadilha deste caso é o acometimento precoce dos nervos cranianos na variante bifacial (dificuldade de sorrir na 1ª pista), que pode simular um AVC. A 4ª pista (arreflexia profunda global) confirma o dano do neurônio motor inferior. Contudo, o pulo do gato final repousa na 5ª pista: a punção lombar revelando dissociação albuminocitológica (proteína alta com células normais) prova inegavelmente o processo desmielinizante inflamatório sem infecção ativa no líquor."
  },
  {
    id: 'case_025_tietze',
    correctDiagnosisId: 'costochondritis',
    tags: ["Reumatologia","Emergência / Intensiva"],
    clues: [
      "Jovem de 25 anos, praticante de musculação, busca a UPA relatando dor torácica aguda, tipo pontada, iniciada durante o repouso noturno.",
      "A dor localiza-se em região paraesternal superior esquerda, com piora à inspiração profunda e à abdução do membro superior ipsilateral.",
      "Eletrocardiogramas e marcadores de necrose miocárdica (Troponina I) seriados encontram-se dentro da normalidade.",
      "Ao exame físico, nota-se edema localizado e hiperemia na junção costoesternal da segunda costela esquerda.",
      "A palpação digital sobre a tumoração osteocartilaginosa reproduz a dor referida (sinal da reprodução positivo)."
    ],
    summary: "A Síndrome de Tietze é uma inflamação benigna e dolorosa das articulações condrocostais, tipicamente acometendo a segunda ou terceira costelas. A dor torácica aguda em pontada (1ª pista) frequentemente simula eventos isquêmicos, mas sua piora com movimentos inspiratórios ou do membro superior (2ª pista) já sugere origem musculoesquelética, e a normalidade do ECG e troponinas (3ª pista) afasta infarto agudo. O grande pulo do gato que diferencia a Síndrome de Tietze de uma costocondrite genérica simples está na 4ª pista: a presença palpável de edema e hiperemia (inchaço orgânico) na junção costoesternal é patognomônica. A confirmação definitiva se dá na 5ª pista: a reprodução exata da queixa dolorosa ao pressionar a tumoração sela o diagnóstico inflamatório local."
  },
  {
    id: 'case_026_prinzmetal',
    correctDiagnosisId: 'prinzmetal',
    tags: ["Cardiologia"],
    clues: [
      "Paciente feminina de 38 anos apresenta dor opressiva subesternal em repouso, iniciada às 04h00 da manhã.",
      "Refere tabagismo ativo (20 maços/ano); nega angina de esforço durante teste ergométrico recente.",
      "Na admissão, o ECG em repouso flagra supradesnivelamento do segmento ST > 2mm em derivações V1 a V4.",
      "Após administração de nitrato sublingual, observa-se resolução completa da sintomatologia e normalização imediata do segmento ST ao ECG.",
      "Cineangiocoronariografia realizada após o evento demonstra artérias coronárias epicárdicas isentas de lesões obstrutivas ou placas de ateroma."
    ],
    summary: "A Angina de Prinzmetal (ou Angina Vasoespástica) é desencadeada por um espasmo severo e transitório da camada muscular lisa das artérias coronárias, gerando isquemia miocárdica súbita sem a presença de oclusão trombótica. A dor anginosa típica que surge no meio da madrugada, em repouso (1ª pista), é uma marca registrada (diferente da angina estável por esforço da 2ª pista). Esse intenso espasmo reduz agudamente o fluxo, o que justifica o surpreendente supradesnivelamento de ST no ECG (3ª pista), simulando um infarto transmural clássico. Contudo, o pulo do gato é evidenciadas pelas pistas 4 e 5: a reversão instantânea e completa das alterações do ECG com nitrato (potente vasodilatador na 4ª pista), corroborada por um cateterismo posterior que demonstra artérias coronárias epicárdicas totalmente isentas de placas de colesterol (5ª pista), confirma a etiologia estritamente vasoespástica."
  },
  {
    id: 'case_027_chagas',
    correctDiagnosisId: 'chagas',
    tags: ["Infectologia","Cardiologia"],
    clues: [
      "Homem de 42 anos relata febre alta, mialgia generalizada, cefaleia e prostração há 7 dias.",
      "Relata consumo recente de alimento artesanal (açaí) processado em zona rural da região Norte.",
      "O exame físico revela paciente febril, com edema de membros inferiores 1+/4+, hepatomegalia e esplenomegalia a 3cm do rebordo costal.",
      "Observa-se edema bipalpebral unilateral violáceo e indolor, associado a linfadenopatia satélite em região pré-auricular.",
      "O exame de gota espessa demonstra a presença de formas tripomastigotas flageladas de Trypanosoma cruzi circulantes."
    ],
    summary: "A Doença de Chagas na sua fase aguda representa a infecção recente e sintomática pelo protozoário *Trypanosoma cruzi*. Uma via de transmissão cada vez mais alarmante é a oral, provocada pela ingestão de açaí (2ª pista) ou caldo de cana processados juntamente com fezes infectadas do barbeiro. Essa carga parasitária maciça desencadeia uma intensa síndrome febril aguda sistêmica (1ª e 3ª pistas). O pulo do gato semiológico incontestável está na 4ª pista: o edema bipalpebral unilateral indolor (Sinal de Romaña), muitas vezes associado à picada ou contaminação direta da conjuntiva. O diagnóstico definitivo, selando a fase aguda, é dado pelo laboratório (5ª pista), onde o encontro direto de formas tripomastigotas circulantes em gota espessa decreta a alta parasitemia antes da doença evoluir para as formas crônicas (cardíaca ou megacólon)."
  },
  {
    id: 'case_028_miller_fisher',
    correctDiagnosisId: 'miller_fisher',
    tags: ["Neurologia"],
    clues: [
      "Mulher de 35 anos queixa-se de diplopia binocular e ataxia de marcha de início agudo (48 horas).",
      "Histórico de infecção de vias aéreas superiores (IVAS) há 21 dias.",
      "O exame neurológico demonstra oftalmoplegia externa bilateral (restrição de motilidade ocular extrínseca).",
      "Ao teste de coordenação, observa-se ataxia apendicular e axial, associada a arreflexia profunda global.",
      "O painel de anticorpos anti-gangliosídeos é positivo para IgG anti-GQ1b."
    ],
    summary: "A Síndrome de Miller Fisher é a principal variante craniana da Síndrome de Guillain-Barré, também desencadeada por mimetismo molecular após uma infecção viral respiratória prévia (2ª pista). O sistema imune deflagra erroneamente anticorpos direcionados de forma específica contra gangliosídeos amplamente concentrados nos nervos oculomotores e nas vias proprioceptivas. Isso justifica a tríade clínica magistral e inconfundível descrita nas pistas 1, 3 e 4: a oftalmoplegia externa (paralisia dos movimentos oculares gerando diplopia), a ataxia severa (falta de coordenação motora) e a arreflexia global. Diferente do GBS clássico, a força muscular primária dos membros é preservada. O pulo do gato imbatível repousa na 5ª pista: a positividade para o anticorpo anti-GQ1b sela o diagnóstico sorológico com altíssima especificidade para esta variante."
  },
  {
    id: 'case_029_diphtheria',
    correctDiagnosisId: 'diphtheria',
    tags: ["Pediatria","Infectologia"],
    clues: [
      "Menino de 8 anos apresenta odinofagia, febre e queda acentuada do estado geral. Carteira de vacinação encontra-se desatualizada.",
      "Ao exame físico, observa-se edema de partes moles cervicais e linfadenopatia submandibular volumosa (pescoço de touro).",
      "Paciente evolui com voz anasalada e paresia de véu palatino.",
      "Oroscopia revela pseudomembranas acinzentadas, aderentes e extensas recobrindo tonsilas palatinas.",
      "A tentativa de remoção das membranas com espátula resulta em sangramento ativo por lesão do epitélio subjacente."
    ],
    summary: "A Difteria Faringotonsilar é uma doença bacteriana toxi-infecciosa grave causada pelo *Corynebacterium diphtheriae*, ressurgente em crianças com calendário vacinal desatualizado (1ª pista). A bactéria produz uma exotoxina letal que causa necrose tecidual e intensa resposta inflamatória, refletida clinicamente no dramático edema cervical maciço e linfadenopatia formidável (o clássico 'pescoço de touro' na 2ª pista). O dano nervoso local provocado pela toxina explica a paresia do véu palatino e a voz anasalada (3ª pista). O pulo do gato patognomônico revela-se nas pistas 4 e 5: a oroscopia constata uma grossa pseudomembrana acinzentada nas amígdalas, que possui uma característica essencial — é fortemente aderente aos tecidos. A tentativa de raspá-la expõe o tecido necrosado e resulta em sangramento ativo (5ª pista), distinguindo-a das placas purulentas comuns das amigdalites estreptocócicas. O uso imediato do soro antidiftérico é mandatório."
  },
  {
    id: 'case_030_neurofibromatosis',
    correctDiagnosisId: 'neurofibromatosis',
    tags: ["Genética / Raras","Dermatologia","Neurologia"],
    clues: [
      "Criança de 6 anos encaminhada para avaliação por atraso no neurodesenvolvimento e máculas hipercromáticas cutâneas.",
      "A mãe apresenta múltiplos neurofibromas cutâneos e subcutâneos disseminados em tronco e membros.",
      "O exame físico revela presença de doze máculas café-com-leite de bordas regulares, com diâmetro > 15mm.",
      "Observa-se presença de efélides em regiões axilar e inguinal bilateral (Sinal de Crowe).",
      "Exame oftalmológico com lâmpada de fenda detecta hamartomas melanocíticos na íris (Nódulos de Lisch)."
    ],
    summary: "A Neurofibromatose Tipo 1 (doença de von Recklinghausen) é uma doença neurocutânea autossômica dominante caracterizada pelo desenvolvimento de múltiplos tumores benignos nos nervos periféricos e anomalias na pigmentação da pele. O diagnóstico, muitas vezes suspeitado por atrasos no desenvolvimento (1ª pista), é predominantemente clínico, baseado nos critérios do NIH. A história de parente de primeiro grau afetado (a mãe com múltiplos neurofibromas na 2ª pista) já cumpre um critério forte. O pulo do gato magistral surge na soma dos achados dermatológicos e oculares clássicos: as grandes manchas café-com-leite típicas (3ª pista), o aparecimento de sardas agrupadas nas pregas axilares, conhecido como Sinal de Crowe (4ª pista), e o encontro na lâmpada de fenda dos Nódulos de Lisch, que são hamartomas melanocíticos inofensivos da íris (5ª pista). A união de apenas dois destes achados já seria suficiente para selar de vez a NF1."
  },
  {
    id: 'case_031_lemierre',
    correctDiagnosisId: 'lemierre',
    tags: ["Infectologia","Pneumologia","Emergência / Intensiva"],
    clues: [
      "Paciente de 19 anos apresenta febre alta, calafrios e cervicalgia lateral.",
      "Histórico de faringoamigdalite bacteriana há 7 dias.",
      "Radiografia de tórax demonstra múltiplos êmbolos sépticos cavitados bilaterais.",
      "Ao exame físico, observa-se dor e empastamento à palpação profunda do trajeto venoso jugular esquerdo.",
      "Ultrassonografia (Doppler) cervical revela tromboflebite da veia jugular interna esquerda e isolamento de Fusobacterium necrophorum."
    ],
    summary: "A Síndrome de Lemierre é uma complicação rara e devastadora de uma infecção orofaríngea inicial (uma simples amigdalite há 7 dias, vista na 2ª pista). O mecanismo se dá quando as bactérias anaeróbicas normais da boca invadem os tecidos profundos do pescoço, alcançando e infectando a veia jugular interna. Essa agressão resulta em uma grave tromboflebite supurativa, evidenciada na semiologia cervical pela dor e endurecimento no trajeto jugular (4ª pista). O grande perigo desta trombose venosa séptica é que fragmentos infectados (êmbolos) se desprendem continuamente para a circulação, alojando-se predominantemente nos pulmões e causando os focos cavitados bilaterais da pneumonia necrosante visualizados no Raio-X (3ª pista). O pulo do gato que sela o diagnóstico repousa na 5ª pista: a imagem vascular provando o trombo na veia jugular combinada ao isolamento do *Fusobacterium necrophorum*, o agente patognomônico clássico desta letal complicação."
  },
  {
    id: 'case_032_glaucoma_agudo_fechado',
    correctDiagnosisId: 'glaucoma_angulo_fechado',
    tags: ["Oftalmologia","Emergência / Intensiva"],
    clues: [
      "Mulher de 60 anos chega ao PS queixando-se de cefaleia intensa, associada a náuseas e episódios de emese.",
      "A paciente relata que o quadro álgico começou subitamente enquanto estava no cinema e que percebeu halos coloridos ao redor das luzes.",
      "Ao exame físico, apresenta hiperemia conjuntival à direita, com o globo ocular tenso à palpação digital.",
      "O exame pupilar revela uma pupila direita em médio-midríase, fixa e não fotorreagente à estimulação luminosa.",
      "A tonometria de aplanação no olho acometido afere uma pressão intraocular de 58 mmHg."
    ],
    summary: "O glaucoma agudo de ângulo fechado ocorre pelo bloqueio súbito do escoamento do humor aquoso, gerando hipertensão ocular rápida. A permanência em ambientes escuros (2ª pista) provoca midríase fisiológica, que em pacientes predispostos espessa a íris periférica e oclui a malha trabecular. Isso deflagra os sinais de sofrimento ocular com hiperemia e dor intensa (1ª e 3ª pistas). O aumento extremo da pressão danifica o músculo esfíncter da íris, resultando na médio-midríase paralítica (4ª pista). O pulo do gato definitivo está na 5ª pista: a tonometria confirmando a pressão intraocular alarmantemente elevada encerra a discussão diagnóstica. É uma emergência médica que exige uso imediato de colírios hipotensores e acetazolamida venosa."
  },
  {
    id: 'case_033_mastoidite_aguda',
    correctDiagnosisId: 'mastoidite_aguda',
    tags: ["Pediatria","Otorrinolaringologia","Infectologia"],
    clues: [
      "Menino de 4 anos é levado à emergência pediátrica devido a quadro de febre alta (39°C) e irritabilidade extrema há 48 horas.",
      "A mãe relata que a criança teve um episódio intenso de otalgia à direita há 10 dias, seguido de rinorreia purulenta, que foi tratado com amoxicilina.",
      "Ao exame, a criança apresenta dor à mobilização do pavilhão auricular e hiperemia e edema na região retroauricular direita.",
      "Observa-se protrusão anterior do pavilhão auricular direito associada ao apagamento do sulco retroauricular ipsilateral.",
      "A tomografia computadorizada de mastoides evidencia opacificação completa das células mastóideas à direita com destruição do trabeculado ósseo."
    ],
    summary: "A mastoidite aguda é uma complicação supurativa grave da otite média aguda (OMA). O histórico de otalgia prévia (2ª pista) indica a propagação da infecção bacteriana do ouvido médio para o antro mastóideo. O acúmulo de secreção purulenta gera periostite, justificando a febre persistente (1ª pista) e a inflamação visível atrás da orelha (3ª pista). O acúmulo de pus afasta o pavilhão auricular, gerando o apagamento do sulco (4ª pista). O pulo do gato está na 5ª pista: a tomografia evidenciando a coalescência (destruição óssea) das células mastóideas confirma a patologia. A conduta imediata envolve internação, antibioticoterapia venosa e avaliação da otorrinolaringologia para mastoidectomia."
  },
  {
    id: 'case_034_les_libman_sacks',
    correctDiagnosisId: 'lupus_libman_sacks',
    tags: ["Reumatologia","Cardiologia"],
    clues: [
      "Mulher de 28 anos procura o pronto-atendimento queixando-se de dispneia aos médios esforços, fadiga e febrícula nas últimas duas semanas.",
      "A paciente possui um histórico de poliartralgia migratória episódica e relata uma internação prévia por trombose venosa profunda espontânea no membro inferior esquerdo há 1 ano.",
      "Exame físico com PA 110x70 mmHg e FC 105 bpm. A ausculta cardíaca revela um sopro holossistólico em foco mitral com irradiação para axila.",
      "Hemoculturas colhidas em três amostras distintas retornam negativas após 72 horas. O FAN é reagente em altos títulos (padrão nuclear homogêneo).",
      "O ecocardiograma transesofágico evidencia vegetações verrucosas acometendo ambas as faces (atrial e ventricular) da valva mitral. A dosagem de anticorpos antifosfolípides é fortemente positiva."
    ],
    summary: "A endocardite de Libman-Sacks é uma manifestação valvular asséptica do Lúpus Eritematoso Sistêmico, associada à presença de anticorpos antifosfolípides. O quadro inicial (1ª pista) e a história de trombose com poliartralgia (2ª pista) levantam suspeita de doença autoimune e síndrome antifosfolípide (SAF). O surgimento do sopro mitral (3ª pista) aponta para endocardite, porém a negatividade das hemoculturas associada ao FAN positivo (4ª pista) reduz a probabilidade de etiologia bacteriana típica. O pulo do gato está na 5ª pista: as vegetações estéreis acometendo ambos os lados das cúspides valvulares associadas ao perfil autoimune selam o diagnóstico de endocardite lúpica."
  },
  {
    id: 'case_035_carcinoma_espinocelular',
    correctDiagnosisId: 'carcinoma_espinocelular',
    tags: ["Dermatologia"],
    clues: [
      "Homem de 68 anos, trabalhador rural aposentado, queixa-se de uma ferida no lábio que não cicatriza há cerca de 5 meses.",
      "O paciente é tabagista de longa data (40 anos-maço) e refere exposição solar diária sem proteção ao longo de toda a sua vida profissional.",
      "O exame dermatológico evidencia uma lesão ulcerada no lábio inferior, de bordas endurecidas, irregulares e elevadas, medindo 1,5 cm de diâmetro.",
      "À palpação cervical, identifica-se um linfonodo submandibular ipsilateral aumentado (2 cm), indolor e firmemente aderido aos planos profundos.",
      "A biópsia incisional da lesão labial revela proliferação atípica de queratinócitos invadindo a derme, com formação de estruturas concêntricas eosinofílicas (pérolas córneas)."
    ],
    summary: "O Carcinoma Espinocelular (CEC) é uma neoplasia maligna cutânea originada nos queratinócitos da epiderme, fortemente associada à exposição actínica. O histórico de exposição solar e tabagismo em um trabalhador rural idoso (1ª e 2ª pistas) constitui os fatores de risco determinantes. A localização no lábio inferior e as bordas endurecidas (3ª pista) diferenciam a lesão das apresentações basocelulares mais comuns. A presença de linfonodomegalia fixa (4ª pista) sinaliza disseminação linfática regional. O pulo do gato na 5ª pista é o achado histopatológico de atipia de queratinócitos com as pérolas córneas, que define microscopicamente o carcinoma epidermoide invasivo."
  },
  {
    id: 'case_036_sindrome_sjogren',
    correctDiagnosisId: 'sjogren',
    tags: ["Reumatologia","Oftalmologia"],
    clues: [
      "Mulher de 50 anos procura a clínica médica queixando-se de dificuldade para engolir alimentos secos e sensação de 'areia nos olhos' há 6 meses.",
      "A paciente relata fadiga, dores nas articulações das mãos ao acordar e um inchaço indolor nas bochechas que surgiu gradativamente.",
      "O exame físico evidencia tumefação bilateral e firme das glândulas parótidas. A oroscopia mostra mucosa oral ressecada e língua despapilada.",
      "O teste de Schirmer demonstra umedecimento do papel de filtro de apenas 2 mm após 5 minutos.",
      "O painel de autoanticorpos revela positividade para Anti-Ro (SSA) e Anti-La (SSB). A biópsia de glândula salivar labial demonstra sialadenite linfocítica focal."
    ],
    summary: "A Síndrome de Sjögren é uma exocrinopatia autoimune sistêmica caracterizada pela destruição linfocítica das glândulas exócrinas. A disfagia para sólidos e a sensação de corpo estranho ocular (1ª pista) representam a xerostomia e xeroftalmia. O aumento das glândulas parótidas associado à fadiga e poliartralgia (2ª e 3ª pistas) indicam a natureza inflamatória sistêmica da doença. A aferição da escassez de lágrima pelo Teste de Schirmer (4ª pista) foca a investigação no eixo exócrino. O pulo do gato reside na 5ª pista: a combinação da sorologia específica (Anti-Ro e Anti-La) com a biópsia de glândula salivar menor evidenciando o infiltrado linfocítico focal fecha os critérios diagnósticos."
  },
  {
    id: 'case_037_escorpionismo_cardiogenico',
    correctDiagnosisId: 'acidente_escorpionico_grave',
    tags: ["Pediatria","Toxicologia","Emergência / Intensiva"],
    clues: [
      "Menino de 5 anos dá entrada na sala vermelha trazido pelos pais, chorando compulsivamente após brincar em um monte de entulhos no quintal de casa.",
      "Os pais notaram eritema e edema no pé direito da criança, que evoluiu rapidamente com agitação psicomotora, sudorese profusa, sialorreia e vômitos.",
      "A monitorização demonstra extremidades frias, tempo de enchimento capilar de 5 segundos, PA 70x40 mmHg e ausculta pulmonar com crepitações bilaterais.",
      "O eletrocardiograma de admissão revela taquicardia sinusal e supradesnivelamento do segmento ST nas derivações precordiais de V2 a V5.",
      "O ecocardiograma à beira-leito demonstra disfunção contrátil difusa do ventrículo esquerdo (fração de ejeção de 25%) em vigência da tempestade autonômica instalada."
    ],
    summary: "O acidente escorpiônico grave em crianças (frequentemente *Tityus serrulatus*) causa uma tempestade autonômica. O evento doloroso periférico (1ª pista) deflagra liberação maciça de mediadores simpáticos e parassimpáticos, explicando a sudorese, salivação e emese severas (2ª pista). A presença de hipotensão, má perfusão e estertores pulmonares (3ª pista) resulta de edema agudo de pulmão cardiogênico. As alterações eletrocardiográficas isquêmicas (4ª pista) ocorrem pelo espasmo coronariano e toxicidade miocárdica da peçonha. O pulo do gato está na 5ª pista: a disfunção ventricular aguda vista no ecocardiograma correlacionada à tempestade autonômica elucida o choque cardiogênico toxicológico induzido, exigindo soro específico e suporte inotrópico."
  },
  {
    id: 'case_038_def_alfa1_antitripsina',
    correctDiagnosisId: 'deficiencia_alfa1_antitripsina',
    tags: ["Pneumologia","Genética / Raras","Gastroenterologia"],
    clues: [
      "Homem de 35 anos procura um pneumologista com queixa de falta de ar progressiva aos médios e pequenos esforços no último ano.",
      "O paciente nega tabagismo pregresso e exposição ocupacional, mas relata história de doença pulmonar precoce e insuficiência hepática em seu pai.",
      "O exame físico torácico evidencia aumento do diâmetro anteroposterior, percussão com som hipersonoro e murmúrio vesicular globalmente diminuído com tempo expiratório prolongado.",
      "A espirometria revela VEF1/CVF < 0,7 após o uso de broncodilatador de curta duração.",
      "A tomografia de tórax evidencia a presença de enfisema pulmonar com padrão predominantemente panacinar localizado nas bases pulmonares. A dosagem da enzima inibidora de proteases encontra-se muito abaixo da referência."
    ],
    summary: "A deficiência de alfa-1 antitripsina é uma desordem genética que deixa os tecidos desprotegidos contra a enzima elastase neutrofílica. O desenvolvimento de dispneia obstrutiva em um indivíduo jovem e não tabagista (1ª e 2ª pistas) levanta forte suspeita genética, e o histórico hepático paterno correlaciona-se com o acúmulo da proteína mutante nos hepatócitos. Os sinais de hiperinsuflação torácica e obstrução fixa na espirometria (3ª e 4ª pistas) denotam DPOC clínica. O pulo do gato está na 5ª pista: o enfisema panacinar de base pulmonar difere do enfisema centroacinar apical do tabagismo, e o laboratório comprova o déficit enzimático responsável."
  },
  {
    id: 'case_039_eritema_nodoso',
    correctDiagnosisId: 'eritema_nodoso',
    tags: ["Dermatologia","Reumatologia"],
    clues: [
      "Mulher de 25 anos procura o pronto-socorro com o surgimento de nódulos cutâneos dolorosos nas pernas há três dias e mal-estar geral.",
      "A paciente relata que teve um quadro de faringite com febre alta há cerca de duas semanas, que foi tratado apenas com chás.",
      "O exame físico revela febre (37,8°C), artralgia nos tornozelos e leucocitose no hemograma.",
      "Ao exame dermatológico, nota-se a presença de nódulos subcutâneos eritematosos de 3 a 5 cm, distribuídos na face pré-tibial de ambas as pernas.",
      "As lesões são muito sensíveis à palpação e não apresentam ulcerações. A biópsia incisional de um nódulo revela o achado histológico de paniculite septal sem vasculite."
    ],
    summary: "O eritema nodoso é a forma clinicamente mais comum de paniculite, e frequentemente representa uma reação imunológica a antígenos. O histórico da faringite prévia (2ª pista) aponta a infecção estreptocócica como provável gatilho. Os pródromos sistêmicos de febre e artralgia no tornozelo (1ª e 3ª pistas) são manifestações acompanhantes comuns do quadro reacional. A localização preferencial na face anterior da tíbia e o aspecto nodular não ulcerado (4ª pista) definem o fenótipo visual. O pulo do gato está na 5ª pista: microscopicamente, o infiltrado inflamatório focado nos septos da gordura associado à ausência de lesão de parede vascular (sem vasculite) diferencia a entidade de outras paniculites nodulares."
  },
  {
    id: 'case_040_stevens_johnson',
    correctDiagnosisId: 'sindrome_stevens_johnson',
    tags: ["Dermatologia","Emergência / Intensiva"],
    clues: [
      "Homem de 30 anos procura emergência com quadro de febre de 39°C, mialgia, tosse seca e ardência na garganta há 3 dias.",
      "Na anamnese, o paciente refere que teve uma crise convulsiva no mês passado e está em uso regular de carbamazepina há 14 dias.",
      "O quadro evoluiu hoje com hiperemia e secreção conjuntival bilateral, além de úlceras sangrantes na mucosa oral e labial.",
      "O exame da pele revela máculas eritematosas purpúricas em formato de alvo atípico que formam bolhas flácidas no tronco e face (acometendo cerca de 5% da superfície corporal total).",
      "A fricção lateral delicada da pele sã adjacente a uma bolha provoca o descolamento limpo da epiderme (Sinal de Nikolsky positivo)."
    ],
    summary: "A Síndrome de Stevens-Johnson (SSJ) é uma reação mucocutânea desencadeada predominantemente por medicações. O quadro prodrômico sistêmico (1ª pista) mimetiza quadros virais, mas a introdução recente de um anticonvulsivante de alto risco (2ª pista) levanta a suspeita toxidérmica. O acometimento de mucosas com erosão (3ª pista) é necessário para a distinção de exantemas virais. A presença de lesões em alvo atípico e formação de bolhas flácidas em menos de 10% do corpo (4ª pista) preenche a estratificação da SSJ. O pulo do gato na 5ª pista é o sinal clínico de clivagem na junção dermoepidérmica: o Sinal de Nikolsky positivo reflete a necrose de epiderme iminente."
  },
  {
    id: 'case_041_sindrome_dressler',
    correctDiagnosisId: 'sindrome_dressler',
    tags: ["Cardiologia","Reumatologia"],
    clues: [
      "Homem de 62 anos chega à emergência queixando-se de dor torácica retroesternal contínua há 48 horas, associada a febrícula.",
      "O paciente recebeu alta hospitalar há 3 semanas após sofrer um infarto agudo do miocárdio de parede anterior, tratado com angioplastia.",
      "A dor referida é de forte intensidade e piora ao inspirar fundo. O paciente relata alívio quando se senta e inclina o tronco para a frente.",
      "A ausculta cardíaca revela um ruído áspero e raspante auscultado tanto na sístole quanto na diástole ao longo da borda esternal esquerda.",
      "O ECG de admissão mostra supradesnivelamento difuso e côncavo do segmento ST (poupando aVL e aVR) associado a um infradesnivelamento de PR."
    ],
    summary: "A Síndrome de Dressler é uma pleuropericardite imunológica que ocorre de 2 a 10 semanas após o dano miocárdico extenso. O evento isquêmico recente (2ª pista) leva à liberação de antígenos do tecido necrosado, deflagrando uma reação autoimune sistêmica com febre e dor torácica (1ª pista). A melhora da dor na posição de prece maometana e a exacerbação na inspiração profunda (3ª pista) denotam uma dor pericárdica pleurítica, e não isquêmica. O atrito em tempos variados do ciclo cardíaco (4ª pista) denota a inflamação mecânica dos folhetos da serosa pericárdica. O pulo do gato está na 5ª pista: o ECG não revela um supra isquêmico localizado, mas um padrão difuso côncavo e alteração no segmento PR, característicos de pericardite."
  },
  {
    id: 'case_042_sindrome_hellp',
    correctDiagnosisId: 'hellp_syndrome',
    tags: ["Ginecologia & Obstetrícia","Emergência / Intensiva","Hematologia"],
    clues: [
      "Mulher de 32 anos, primigesta com 34 semanas de gestação, chega ao PS da maternidade relatando intensa dor no quadrante superior do abdome e náuseas nas últimas 24 horas.",
      "A paciente não trouxe exames de pré-natal, mas relata que em uma consulta de rotina sua pressão arterial havia medido 150x100 mmHg.",
      "A aferição atual mostra PA de 170x110 mmHg. O exame físico revela edema facial e em mãos, hiperreflexia patelar e dor à palpação profunda do hipocôndrio direito.",
      "O hemograma de urgência revela hemoglobina de 9,0 g/dL com presença de esquizócitos no sangue periférico e contagem plaquetária de 65.000/mm³.",
      "O perfil bioquímico de urgência evidencia TGO (AST) de 450 U/L, TGP (ALT) de 500 U/L e LDH (desidrogenase lática) de 850 U/L."
    ],
    summary: "A Síndrome HELLP é uma complicação grave da pré-eclâmpsia caracterizada pela disfunção endotelial sistêmica no final da gestação. A dor epigástrica/hipocôndrio direito (1ª pista) reflete a distensão da cápsula de Glisson (hepática) devido à isquemia e microtrombos. A presença de hipertensão e hiperreflexia (2ª e 3ª pistas) enquadra o caso como transtorno hipertensivo grave e risco iminente de convulsões eclampticas. O aparecimento de fragmentos de hemácias (esquizócitos) com plaquetopenia (4ª pista) demonstra agregação plaquetária endotelial e lise mecânica eritrocitária. O pulo do gato na 5ª pista é estritamente laboratorial: o achado de hemólise (aumento da LDH), elevação das enzimas hepáticas e queda das plaquetas satisfazem inteiramente os critérios analíticos da sigla."
  },
  {
    id: 'case_043_tab_mania',
    correctDiagnosisId: 'bipolar_disorder',
    tags: ["Psiquiatria","Emergência / Intensiva"],
    clues: [
      "Homem de 24 anos é trazido ao pronto-socorro após ser contido em uma concessionária, exigindo comprar carros esportivos apesar de não possuir recursos financeiros.",
      "A família relata que ele está há 8 dias dormindo duas horas por noite, mas apresenta energia inesgotável, fala extremamente acelerada e hostilidade com os pais.",
      "Os familiares também mencionam que, há alguns meses, o paciente esteve muito isolado, evitando atividades fora do quarto, limitando o contato social e com pensamentos mais tristes.",
      "O paciente afirma possuir inteligência muito superior ao restante da equipe médica e que está prestes a governar o continente europeu. O rastreio toxicológico para drogas de abuso no sangue e urina é negativo.",
      "O paciente mantém humor expansivo e irritável contínuo há mais de 7 dias, associado a desinibição severa e agitação psicomotora que necessitam contenção física e química no hospital."
    ],
    summary: "O Transtorno Afetivo Bipolar Tipo 1 requer a documentação clara de um episódio maníaco, sendo muito comum a ocorrência de episódios depressivos prévios. As atitudes financeiramente desproporcionais e compulsivas (1ª pista) indicam perda grave de julgamento crítico. A diminuição da necessidade de sono acompanhada de hiperenergia e logorreia (2ª pista) reflete a extrema aceleração no surto. O relato de um período anterior de isolamento e tristeza profunda (3ª pista) sugere fortemente um episódio depressivo não documentado, marcando a alternância dos polos do humor. Os delírios de grandiosidade não associados ao uso de substâncias (4ª pista) afastam causas tóxicas reversíveis. O pulo do gato está na 5ª pista: a consolidação temporal dos sintomas durando mais de uma semana, combinada ao grave prejuízo funcional com indicação de internação fechada, atesta a fase maníaca clássica."
  },
  {
    id: 'case_044_sarcoidose',
    correctDiagnosisId: 'sarcoidosis',
    tags: ["Pneumologia","Reumatologia"],
    clues: [
      "Mulher de 38 anos, afrodescendente, procura a UBS com dispneia progressiva, febrícula e tosse seca persistente há 3 meses.",
      "A paciente refere fadiga diária e o aparecimento espontâneo de lesões nodulares avermelhadas na pele das pernas.",

      "O exame pulmonar é inespecífico. Na inspeção da face, observam-se placas e nódulos endurecidos de coloração violácea no nariz e bochechas (lúpus pernio).",
      "Os exames laboratoriais iniciais mostram hipercalcemia e elevação da enzima conversora de angiotensina (ECA). A radiografia de tórax evidencia alargamento simétrico do mediastino.",
      "A tomografia confirma adenopatia hilar bilateral e simétrica. A biópsia transbrônquica do linfonodo revela granulomas epitelioides não-caseosos com colorações negativas para BAAR e fungos."
    ],
    summary: "A Sarcoidose é uma desordem granulomatosa multissistêmica crônica com predileção pelos tratos respiratório inferior e linfático. A apresentação inicial com tosse insidiosa em uma jovem afro-americana (1ª pista) alerta para patologias intersticiais. Os nódulos nas pernas (eritema nodoso) atestam uma resposta imune sistêmica inflamatória (2ª pista). A presença da lesão cutânea crônica facial descrita como lúpus pernio (3ª pista) está intensamente relacionada ao curso fibrótico do trato respiratório. A hipercalcemia decorre da produção de calcitriol pelos macrófagos granulomatosos, e o alargamento mediastinal aponta acometimento linfonodal (4ª pista). O pulo do gato na 5ª pista reside no tecido: os achados de linfadenopatia hilar associados à biópsia com granulomas sem necrose (afastando tuberculose) selam a base histológica definitiva da doença."
  },
  {
    id: 'case_045_mielite_transversa',
    correctDiagnosisId: 'transverse_myelitis',
    tags: ["Neurologia", "Infectologia"],
    clues: [
      "Homem, 40 anos, previamente hígido, busca a emergência relatando o início recente de fraqueza nos membros inferiores e dificuldade para urinar.",
      "O paciente relata que há duas semanas iniciou um quadro de febre, náuseas, vômitos e diarreia volumosa (quatro episódios diários, sem sangue ou pus), do qual apresentou melhora clínica completa há sete dias.",
      "O exame neurológico revela paraparesia de membros inferiores com força grau 3 e reflexos osteotendíneos exaltados.",
      "Evidencia-se globo vesical palpável e hipoestesia tátil, dolorosa e palestésica bem delimitada, estendendo-se dos membros inferiores até a altura do umbigo. Os exames de sangue mostram apenas leucocitose com neutropenia discreta.",
      "A análise do líquor cefalorraquidiano demonstra celularidade de 50 células (80% linfócitos, 20% monócitos), hiperproteinorraquia de 100 mg/dL, com glicose de 85 mg/dL e lactato de 8 (limite superior da normalidade)."
    ],
    summary: "A mielite transversa é uma síndrome neurológica inflamatória aguda da medula espinhal. O quadro inicial de déficit neurológico motor e autonômico (1ª pista) ganha contexto com a evolução bifásica após uma infecção gastrointestinal autolimitada (2ª pista), cronologia típica das síndromes pós-infecciosas. O encontro de hiperreflexia (3ª pista) é fundamental para confirmar o acometimento do neurônio motor superior, diferenciando firmemente o quadro de uma neuropatia periférica como a Síndrome de Guillain-Barré (que cursa com arreflexia). A presença simultânea de disfunção motora, autonômica e um nível sensitivo em dermátomo T10 (4ª pista) encerra a clássica tríade medular. O pulo do gato definitivo está na 5ª pista: o perfil do líquor revela pleocitose linfocítica, proteinorraquia moderada e glicose/lactato normais, o que afasta a etiologia bacteriana e confirma a natureza inflamatória viral pós-infecciosa do quadro."
  },
  {
    id: 'case_046_sindrome_terson',
    correctDiagnosisId: 'terson_syndrome',
    tags: ["Neurologia", "Oftalmologia", "Emergência / Intensiva"],
    clues: [
      "Mulher, 55 anos, dá entrada na sala de emergência após um episódio de síncope precedido por queixa de início súbito da pior cefaleia de sua vida.",
      "Familiares relatam histórico de hipertensão arterial sistêmica irregularmente tratada e tabagismo de longa data.",
      "Ao exame físico, a paciente apresenta-se torporosa, com rigidez de nuca e pressão arterial de 190x110 mmHg.",
      "A tomografia computadorizada de crânio sem contraste evidencia uma hiperdensidade preenchendo o polígono de Willis, as cisternas basais e as fissuras sylvianas bilaterais.",
      "O exame de oftalmoscopia direta realizado à beira do leito revela a presença de sangramento pré-retiniano e hemorragia vítrea bilateral."
    ],
    summary: "A Síndrome de Terson caracteriza-se pela ocorrência de hemorragia vítrea, retiniana ou pré-retiniana associada a uma hemorragia subaracnoidea (HSA) ou outras formas de hemorragia intracraniana. A apresentação hiperaguda de cefaleia em trovão e síncope (1ª pista) num paciente com alto risco cardiovascular (2ª pista) sugere o acometimento vascular encefálico grave. Os achados de irritação meníngea (3ª pista) associados ao sangue distribuído no espaço subaracnoide na neuroimagem (4ª pista) consolidam o diagnóstico de HSA, frequentemente de etiologia aneurismática. O pulo do gato está na 5ª pista: a visualização do sangramento intraocular confirma a síndrome, cujo mecanismo está atrelado ao rápido e massivo aumento da pressão intracraniana, que é transmitida ao longo da bainha do nervo óptico comprimindo o retorno venoso e rompendo os frágeis capilares retinianos, sendo imperativo o manejo neurocirúrgico e oftalmológico."
  },
  {
    id: 'case_047_hemocromatose',
    correctDiagnosisId: 'hemochromatosis',
    tags: ["Gastroenterologia", "Endocrinologia", "Genética / Raras"],
    clues: [
      "Mulher, 65 anos, é atendida no ambulatório de clínica médica com queixa de letargia crônica, dispneia aos moderados esforços e aumento progressivo do volume abdominal.",
      "Seu histórico de comorbidades revela o diagnóstico recente e atípico de diabetes mellitus tipo 2 diagnosticado de forma abrupta na pós-menopausa, exigindo rápida introdução de insulina.",
      "O exame físico revela estase jugular a 45 graus, macicez móvel no abdome e uma pele difusamente escurecida, assumindo um tom cinza-metálico que a paciente afirma ter surgido há poucos anos.",
      "Os exames complementares demonstram aminotransferases séricas aumentadas associadas a plaquetopenia, além de um ecocardiograma transtorácico com fração de ejeção reduzida e dilatação biventricular.",
      "O painel laboratorial sérico evidencia uma ferritina superior a 1.200 ng/mL, saturação de transferrina de 92%, e o teste genético acusa homozigose para a mutação C282Y."
    ],
    summary: "A hemocromatose hereditária é um distúrbio genético do metabolismo do ferro, que causa deposição patológica e toxicidade desse elemento nos tecidos. O quadro de fadiga sistêmica e descompensação insidiosa (1ª pista) ganha gravidade sistêmica quando aliado ao surgimento súbito de diabetes refratário secundário ao dano pancreático, o conhecido 'diabetes bronzeado' (2ª pista). O exame físico aponta simultaneamente para insuficiência cardíaca direita, cirrose inicial e a hipercromia melânica clássica da doença (3ª pista). A confirmação do acometimento de múltiplos órgãos-alvo (fígado e coração dilatado) na ausência de causas isquêmicas ou virais (4ª pista) aponta fortemente para doença de depósito. O pulo do gato, na 5ª pista, encerra as dúvidas: a sobrecarga extrema no perfil de ferro e a mutação genética do gene HFE certificam o diagnóstico, sinalizando urgência em iniciar flebotomias terapêuticas antes que as falências orgânicas se tornem irreversíveis."
  },
  {
    id: 'case_048_zollinger_ellison',
    correctDiagnosisId: 'zollinger_ellison',
    tags: ["Gastroenterologia", "Endocrinologia"],
    clues: [
      "Homem, 45 anos, procura a Unidade Básica de Saúde devido a dor epigástrica em forte queimação, vômitos frequentes e diarreia crônica aquosa de grande volume.",
      "O paciente refere que as dores são persistentes há dois anos e refratárias ao uso contínuo de inibidores de bomba de prótons, mesmo prescritos em dose máxima permitida.",
      "Ao exame físico, nota-se emagrecimento perceptível, mucosas orais desidratadas e importante sensibilidade na palpação profunda do epigástrio, sem descompressão dolorosa.",
      "A endoscopia digestiva alta evidencia espessamento grosseiro das pregas gástricas e identifica múltiplas úlceras pépticas extensas que ultrapassam o bulbo, atingindo a porção distal do duodeno e o jejuno proximal.",
      "A avaliação laboratorial dirigida demonstra nível sérico de gastrina basal de 1.800 pg/mL, que paradoxalmente eleva-se ainda mais durante o teste de estimulação intravenosa com secretina."
    ],
    summary: "A Síndrome de Zollinger-Ellison é causada pelo excesso da liberação autônoma de gastrina através de um tumor neuroendócrino (gastrinoma), levando a uma hipersecreção maciça de ácido gástrico. A dor dispéptica acompanhada de diarreia (1ª pista) reflete tanto a irritação da mucosa gástrica quanto a inativação das enzimas pancreáticas no lúmen intestinal pelo excesso de ácido. A refratariedade precoce ao tratamento supressor convencional (2ª pista) com perda de peso (3ª pista) são red flags para quadros hipersecretórios. A visualização no exame endoscópico de uma hipertrofia gástrica acompanhada de lesões ulceradas em localizações atípicas (além da primeira porção duodenal) (4ª pista) indica com exatidão que o insulto ácido provém de forte estímulo patológico e contínuo. O pulo do gato está na 5ª pista: os níveis monumentais de gastrina associados ao teste da secretina positivo (que inibe a gastrina fisiológica, mas estimula o tumor a secretar mais hormônio) atestam o gastrinoma de modo inequívoco, devendo-se investigar sua associação com a Neoplasia Endócrina Múltipla tipo 1 (NEM 1)."
  },
  {
    id: 'case_049_artrite_septica',
    correctDiagnosisId: 'septic_arthritis',
    tags: ["Pediatria", "Reumatologia", "Ortopedia"],
    clues: [
      "Menino, 6 anos, é levado à emergência pediátrica pelos pais relatando dor incapacitante associada a uma recusa súbita em apoiar a perna direita no chão há 24 horas.",
      "A mãe relata que a criança era previamente hígida, mas que apresentou escoriações extensas no membro inferior e febre intermitente após cair de bicicleta há cinco dias.",
      "Ao exame físico, o paciente apresenta-se toxêmico, temperatura de 39°C, e o joelho direito encontra-se severamente edemaciado, eritematoso, quente e mantido em discreta flexão antálgica.",
      "A tentativa de mobilização passiva da articulação provoca choro inconsolável e extrema dor em todos os eixos de movimento, enquanto a radiografia da área não mostra fraturas.",
      "A artrocentese articular percutânea drena líquido purulento e viscoso, cuja análise revela contagem superior a 75.000 células/mm³ com predomínio acentuado de neutrófilos, e a bacterioscopia exibe cocos Gram-positivos agrupados em cachos."
    ],
    summary: "A artrite séptica é a invasão supurativa aguda e perigosa do espaço intra-articular por bactérias patogênicas. A recusa abrupta de marcha e proteção antálgica de um membro (1ª pista) somada ao contexto de febre e infecção prévia de tecidos moles (2ª pista) sugere disseminação hematogênica ou invasão por contiguidade. A presença dos clássicos sinais cardeais da inflamação local, acompanhados de limitação extrema global de movimento articular (diferindo da dor pontual de entorses ou osteomielites ósseas distantes) (3ª pista e 4ª pista), apontam fortemente para ocupação piogênica severa do espaço sinovial. O pulo do gato encontra-se na 5ª pista: a artrocentese com drenagem de material francamente purulento, hipercelularidade extrema e a identificação de patógenos típicos de pele, como o Staphylococcus aureus (cocos Gram-positivos em cachos), selam o diagnóstico bacteriano. Requer-se drenagem cirúrgica e antibioticoterapia venosa urgente para evitar a destruição rápida e irreversível da cartilagem."
  },
  {
    id: 'case_050_sindrome_anticolinergica',
    correctDiagnosisId: 'anticholinergic_syndrome',
    tags: ["Psiquiatria", "Toxicologia", "Emergência / Intensiva"],
    clues: [
      "Mulher, 25 anos, dá entrada no setor de urgência psiquiátrica intensamente agitada, apresentando comportamento desorganizado, delirante e com queixas de alucinações inespecíficas.",
      "Os acompanhantes referem que a paciente faz acompanhamento para depressão maior, e encontraram frascos vazios de seu tratamento domiciliar regular horas antes da internação.",
      "Ao exame físico, percebe-se que a pele da paciente está marcadamente eritematosa e quente, além de ausência total de sudorese com mucosas orais totalmente ressecadas.",
      "A monitorização multiparamétrica indica frequência cardíaca sinusal sustentada de 135 bpm, associada à identificação de íleo paralítico (ruídos hidroaéreos ausentes) e presença de bexigoma palpável.",
      "A avaliação neurológica e ocular demonstra a presença de midríase bilateral extrema, paralítica e de aspecto não reagente aos fortes estímulos luminosos."
    ],
    summary: "A síndrome anticolinérgica resulta do forte bloqueio competitivo dos receptores muscarínicos em todo o sistema nervoso central e periférico. O quadro hiperagudo de delirium ('mad as a hatter') (1ª pista) na ausência de lesões orgânicas e em vigência de polifarmácia psiquiátrica (2ª pista) denota toxicidade do sistema nervoso central por drogas com efeito muscarínico (como antidepressivos tricíclicos ou anti-histamínicos). A hipertermia pela inibição das glândulas sudoríparas que, associada à compensação vasodilatadora cutânea e ressecamento ('hot as a hare', 'red as a beet', 'dry as a bone') fecham a parte dermatológica da toxíndrome (3ª pista). O prejuízo na inervação parassimpática no trato urinário, gastrointestinal e cardiovascular deflagram taquicardia descompensada ('the heart runs alone'), estase abdominal e urinária ('the bowel and bladder lose their tone') (4ª pista). O pulo do gato é dado na 5ª pista: o relaxamento total da musculatura constritora da íris provoca dilatação completa sem reflexo luminoso ('blind as a bat'), cravando a famosa rima propedêutica em inglês, exigindo a administração de carvão ativado precoce ou fisostigmina em casos refratários e graves."
  },
  {
    id: 'case_051_tireoidite_quervain',
    correctDiagnosisId: 'tireoidite_de_quervain',
    tags: ["Endocrinologia", "Infectologia"],
    clues: [
      "Mulher, 42 anos, procura o pronto-socorro com queixa de dor intensa na região cervical anterior, acompanhada de febre baixa e astenia há cinco dias.",
      "A paciente relata que a dor frequentemente irradia para a mandíbula e ouvidos, e menciona ter se recuperado de uma infecção de vias aéreas superiores há cerca de duas semanas.",
      "Ao exame físico, apresenta taquicardia de 110 bpm e tremor fino nas extremidades. A palpação do pescoço revela uma glândula tireoide difusamente aumentada, de consistência firme e requintadamente dolorosa.",
      "Os exames laboratoriais iniciais demonstram elevação marcante da velocidade de hemossedimentação (VHS de 90 mm/h) e da proteína C reativa (PCR), com TSH indetectável e níveis elevados de T4 livre.",
      "A cintilografia da tireoide com iodo radioativo (RAIU) apresenta captação virtualmente ausente (menor que 1%), e a ultrassonografia evidencia áreas hipoecoicas focais mal definidas."
    ],
    summary: "A Tireoidite de Quervain, ou tireoidite subaguda granulomatosa, é uma condição inflamatória transitória da tireoide, tipicamente desencadeada por uma infecção viral respiratória prévia (2ª pista). O quadro clínico inicial com dor cervical anterior intensa, febre e astenia (1ª pista), associado à taquicardia e tremores no exame físico (3ª pista), reflete a tireotoxicose inflamatória aguda pela destruição folicular e liberação de hormônios pré-formados. A elevação acentuada dos marcadores inflamatórios agudos com perfil laboratorial de hipertireoidismo (4ª pista) evidencia o pico inflamatório glandular. O pulo do gato definitivo está na 5ª pista: a cintilografia com captação de iodo radioativo (RAIU) virtualmente ausente confirma a liberação hormonal passiva por tireoidite destrutiva, descartando a hiperfunção glandular da Doença de Graves. O manejo clínico baseia-se em anti-inflamatórios e betabloqueadores para controle sintomático temporário."
  },
  {
    id: 'case_052_sindrome_sheehan',
    correctDiagnosisId: 'sindrome_de_sheehan',
    tags: ["Endocrinologia", "Ginecologia & Obstetrícia"],
    clues: [
      "Mulher, 49 anos, comparece ao ambulatório para investigação de um quadro insidioso de fraqueza, perda ponderal (5% do peso corporal), intolerância ao frio, unhas quebradiças e constipação intestinal que vem ocorrendo de forma progressiva há um ano.",
      "Durante a anamnese complementar, a paciente informa que não menstrua desde o nascimento do seu terceiro filho, há 10 anos. O parto foi marcado por hemorragia grave no pós-parto imediato que exigiu transfusão de urgência de três concentrados de hemácias, e ela relata que nunca conseguiu amamentar o recém-nascido por ausência completa de leite.",
      "Ao exame físico, apresenta-se hipotensa (PA 95/60 mmHg), com pele fria, descorada e extremamente seca. Destaca-se a perda completa de pelos axilares e pubianos (sinal de Charcot), além de despigmentação das aréolas mamárias.",
      "Os exames laboratoriais solicitados evidenciam uma anemia normocítica leve (Hb 10,9 g/dL) e hiponatremia (Na 132 mEq/L) com níveis de potássio normais (K 4,7 mEq/L).",
      "A dosagem hormonal endócrina demonstra pan-hipopituitarismo sistêmico (baixos níveis de TSH, ACTH, cortisol, FSH, LH e prolactina), e a ressonância magnética da sela túrcica aponta para atrofia hipofisária severa (\"sela vazia\"), sem evidências de compressão por macroadenoma."
    ],
    summary: "A Síndrome de Sheehan consiste no hipopituitarismo pós-parto, causado pela isquemia e necrose da glândula hipófise devido a choque hemorrágico grave no parto. O quadro de fraqueza e intolerância ao frio (1ª pista) traduz o hipotireoidismo secundário insidioso. O histórico cronológico patognomônico de hemorragia grave periparto com necessidade de transfusão, seguido por agalactia e amenorreia permanente (2ª pista), indica falência imediata da secreção de prolactina e gonadotrofinas desde a necrose isquêmica. O exame físico demonstra sinais de hipocortisolismo secundário e a perda completa de caracteres sexuais secundários (3ª pista), consolidando o quadro sindrômico. A anemia normocítica e hiponatremia com potássio preservado (4ª pista) confirmam a insuficiência adrenal secundária por deficiência de ACTH, que poupa a secreção de aldosterona. O pulo do gato definitivo está na 5ª pista: a comprovação hormonal de pan-hipopituitarismo associada ao achado de sela vazia na ressonância magnética sela o diagnóstico, descartando processos expansivos e indicando terapia de reposição hormonal vitalícia."
  },
  {
    id: 'case_053_sindrome_reye',
    correctDiagnosisId: 'sindrome_de_reye',
    tags: ["Pediatria", "Gastroenterologia", "Emergência / Intensiva"],
    clues: [
      "Menino, 6 anos, é levado à emergência pediátrica com quadro agudo de vômitos incoercíveis, seguido por rápida alteração do estado mental, evoluindo de extrema agitação para letargia profunda e rebaixamento do nível de consciência nas últimas horas.",
      "Os pais relatam que a criança estava em fase de resolução de um quadro de varicela (catapora) e que, por conta da febre, recebeu repetidas doses de ácido acetilsalicílico (AAS) para controle térmico em casa.",
      "Ao exame físico, o paciente encontra-se afebril, anictérico e irresponsivo a comandos verbais. Destaca-se uma hepatomegalia dolorosa palpável a 4 cm do rebordo costal direito, adotando postura de decorticação a estímulos nociceptivos.",
      "O painel metabólico laboratorial demonstra elevação maciça das transaminases hepáticas (TGO e TGP superiores a 1.000 U/L), hiperamonemia acentuada, alteração do tempo de protrombina (TAP) e hipoglicemia severa, mas com níveis de bilirrubinas estritamente normais.",
      "A tomografia de crânio descarta lesões hemorrágicas ou focais, mostrando apenas edema cerebral difuso, enquanto a avaliação histopatológica hepática revela esteatose microvesicular generalizada, sem necrose ou infiltrado inflamatório significativo."
    ],
    summary: "A Síndrome de Reye é uma encefalopatia aguda associada à grave degeneração gordurosa hepática, deflagrada por uma agressão mitocondrial tóxica sistêmica. A rápida deterioração neurológica pós-vômitos (1ª pista) ganha contexto através do uso de salicilatos (AAS) durante uma infecção viral na infância como a varicela (2ª pista), uma associação clássica e contraindicada. A disfunção mitocondrial aguda bloqueia a beta-oxidação de ácidos graxos, gerando o acometimento neurológico central com hepatomegalia indolor e não-ictérica no exame físico (3ª pista). O painel metabólico com falência hepática grave, hiperamonemia e hipoglicemia grave mantendo bilirrubinas normais (4ª pista) é a tradução bioquímica da lesão. O pulo do gato definitivo está na 5ª pista: a biópsia hepática evidenciando esteatose microvesicular generalizada sem infiltrado inflamatório, em conjunto com o edema cerebral difuso na neuroimagem, atesta a toxíndrome mitocondrial, exigindo terapia intensiva imediata para controle da hipertensão intracraniana."
  }
];
