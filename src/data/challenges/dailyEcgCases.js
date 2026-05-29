export const DAILY_ECG_CASES = [
  {
    id: 'ecg_case_001',
    dayId: 1,
    date: '2026-05-12',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_1.png',
    correctDiagnosisIds: ['pvc'],
    clinicalCase: 'Estudante de 20 anos que reclamou de batimentos cardíacos irregulares. Apesar da irregularidade do pulso, seu coração estava clinicamente normal.',
    explanation: 'Este ECG revela um ritmo sinusal de 100 bpm, com eixo normal e complexos QRS/ondas normais. O grande achado é a presença de frequentes extrassístoles ventriculares. Extrassístoles ventriculares são muito comuns. Em um grande grupo de pessoas, há uma correlação entre a presença de extrassístoles e cardiopatias diversas. Porém, em pessoas jovens sem sintomas e com coração normal, as chances de um problema cardíaco significativo são muito baixas. Como conduta, um ecocardiograma pode tranquilizar-nos, mas não é essencial (em mulheres jovens, checar hemoglobina). O mais importante é orientar o paciente a não fumar e evitar gatilhos como álcool, café e chá.'
  },
  {
    id: 'ecg_case_002',
    dayId: 2,
    date: '2026-05-13',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_2.png',
    correctDiagnosisIds: ['old_mi_inferior'],
    clinicalCase: 'Homem de 60 anos avaliado em clínica, reclamando de vaga dor retroesternal em esforço. Ele nunca apresentou dor em repouso.',
    explanation: 'O traçado evidencia um ritmo sinusal de 77 bpm, intervalo PR e eixo do QRS normais. O achado patológico principal é a presença de ondas Q proeminentes e profundas associadas a ondas T invertidas nas derivações inferiores (DII, DIII e aVF). Essas alterações eletrocardiográficas são o marco de um infarto do miocárdio antigo de parede inferior. Clinicamente, o quadro sugere doença isquêmica do coração, portanto, a conduta ideal foca no controle rigoroso dos fatores de risco cardiovasculares e na provável introdução de terapia secundária com aspirina e estatinas.'
  },
  {
    id: 'ecg_case_003',
    dayId: 3,
    date: '2026-05-14',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_3.png',
    correctDiagnosisIds: ['bavt'],
    clinicalCase: 'Senhora de 80 anos caiu e quebrou o quadril. Apresenta pulso muito lento à admissão.',
    explanation: 'A análise do ECG mostra ondas P regulares com frequência em torno de 130 bpm, no entanto, há dissociação atrioventricular completa: os complexos QRS (ritmo de escape ventricular) surgem com frequência muito baixa, de cerca de 23 bpm. Trata-se de um Bloqueio Atrioventricular Total (BAVT) ou de 3º Grau. Esta grave falha no sistema de condução explica o baixo débito cardíaco, a bradicardia severa e o quadro de síncope que culminou na queda da paciente. A conduta imediata e definitiva para este quadro é o implante de um marca-passo definitivo.'
  },
  {
    id: 'ecg_case_004',
    dayId: 4,
    date: '2026-05-15',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_4.png',
    correctDiagnosisIds: ['scacsst'],
    subDiagnosis: 'anterior',
    clinicalCase: 'Homem de 50 anos com dor retroesternal intensa com 18 horas de evolução.',
    explanation: 'Este ECG apresenta ritmo sinusal a 64 bpm. O achado crítico é a presença de ondas Q patológicas e supradesnivelamento do segmento ST nas derivações precordiais de V2 a V4, acompanhados de inversão de onda T em DI, aVL e de V2 a V6. Esses achados caracterizam um Infarto Agudo do Miocárdio (IAM) com supradesnível de ST em parede anterior. A conduta emergencial envolve internação, alívio da dor e antiagregação plaquetária (aspirina). Devido ao tempo de evolução (18 horas), o paciente encontra-se fora da janela ideal para trombólise convencional, mas a Angioplastia Transluminal Coronariana (ATC) de resgate/primária pode e deve ser considerada se houver manutenção de dor ou instabilidade.'
  },
  {
    id: 'ecg_case_005',
    dayId: 5,
    date: '2026-05-16',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_5.png',
    correctDiagnosisIds: ['afib', 'digitalis_effect'],
    clinicalCase: 'Mulher de 60 anos com cardiopatia reumática. Tratada ativamente para insuficiência cardíaca congestiva.',
    explanation: 'O traçado mostra ausência de ondas P e intervalos R-R irregulares, compatível com Fibrilação Atrial com resposta ventricular controlada (em torno de 80 bpm). O aspecto que chama mais atenção é o infradesnivelamento do segmento ST com padrão "em colher" nas derivações V5-V6, além de ondas U proeminentes em V2-V3. Esse achado clássico indica impregnação ou Efeito Digitálico. A conduta médica primordial é checar se há intoxicação medicamentosa questionando sintomas precoces como perda de apetite, náuseas e vômitos. Deve-se também dosar eletrólitos, lembrando que a hipocalemia (frequentemente causada por diuréticos) potencializa o efeito da digoxina.'
  },
  {
    id: 'ecg_case_006',
    dayId: 6,
    date: '2026-05-17',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_6.png',
    correctDiagnosisIds: ['trn'],
    clinicalCase: 'Mulher de 26 anos apresenta-se no pronto-socorro com palpitações súbitas.',
    explanation: 'O ECG demonstra uma taquicardia de complexo QRS estreito com frequência altíssima, em torno de 200 bpm. As ondas P não são visíveis e os intervalos R-R são perfeitamente regulares. Este padrão é o clássico de uma Taquicardia Supraventricular, mais especificamente uma Taquicardia por Reentrada Nodal (TRN) ou juncional. Como tratamento de primeira linha em pacientes estáveis, as manobras vagais (como a Manobra de Valsalva modificada) devem ser tentadas. Caso não haja reversão do ritmo, a intervenção farmacológica com Adenosina (em bolus rápido) ou Verapamil é o próximo passo.'
  },
  {
    id: 'ecg_case_007',
    dayId: 7,
    date: '2026-05-18',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_7.png',
    correctDiagnosisIds: ['isquemia_anterolateral'],
    clinicalCase: 'Homem de 55 anos com dores no peito em repouso persistentes por 6 horas. Troponina inicial normal.',
    explanation: 'Este eletrocardiograma apresenta um ritmo sinusal taquicárdico a 130 bpm. Destaca-se a presença de depressão do segmento ST (infradesnivelamento) bem definida nas derivações precordiais de V4 a V6, além das derivações periféricas DI e aVL. Estas alterações denotam isquemia subendocárdica anterolateral, compatível com uma Síndrome Coronariana Aguda sem Supra de ST (Angina Instável, visto que a troponina é normal no momento). A terapêutica mandatória inicial inclui repouso, betabloqueadores, antiagregação dupla (Aspirina e um inibidor P2Y12), anticoagulação com Heparina (HBPM) e introdução de Estatina de alta potência.'
  },
  {
    id: 'ecg_case_008',
    dayId: 8,
    date: '2026-05-19',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_8.png',
    correctDiagnosisIds: ['bifascicular_block'],
    clinicalCase: 'Mulher de 80 anos com queixas episódicas de dispneia intensa e lipotimia (quase síncope).',
    explanation: 'O traçado revela ritmo sinusal a 90 bpm. Há desvio pronunciado do eixo elétrico para a direita e um padrão característico de Bloqueio de Ramo Direito (BRD). Essa combinação (BRD + desvio do eixo que sugere bloqueio divisional) configura um Bloqueio Bifascicular. Quando esse bloqueio de alto grau do sistema His-Purkinje se soma a sintomas sugestivos de baixo débito cerebral intermitente (lipotimia), há um alto risco de progressão súbita para Bloqueio AV Total intermitente (Síndrome de Stokes-Adams). A conduta indicada é internar a paciente, monitorar para confirmação do bloqueio de alto grau e preparar o implante de marca-passo definitivo.'
  },
  {
    id: 'ecg_case_009',
    dayId: 9,
    date: '2026-05-20',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_9.png',
    correctDiagnosisIds: ['right_ventricular_strain'],
    clinicalCase: 'Mulher de 40 anos com piora progressiva de dispneia aos esforços e edema de membros inferiores.',
    explanation: 'Neste ECG observamos um ritmo sinusal a 65 bpm com ondas P apiculadas em DII (P pulmonale), indicando sobrecarga atrial direita. O eixo elétrico é desviado para a direita. Nas precordiais, notam-se ondas R dominantes em V1 e ondas S profundas em V6, acompanhadas de inversão das ondas T nas derivações inferiores (DII, DIII, aVF) e precordiais direitas (V1-V3). Todos esses sinais em conjunto apontam para uma grave Sobrecarga Ventricular Direita (padrão de "Strain" do VD), comum em quadros de Hipertensão Pulmonar severa. A conduta clínica passa por investigar etiologias primárias ou secundárias, como Embolia Pulmonar crônica, e frequentemente inclui anticoagulação sistêmica.'
  },
  {
    id: 'ecg_case_010',
    dayId: 10,
    date: '2026-05-21',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_10.png',
    correctDiagnosisIds: ['afib', 'bre'],
    clinicalCase: 'Homem de 80 anos admitido por dispneia aos mínimos esforços e edema importante nos tornozelos.',
    explanation: 'O ritmo é irregularmente irregular sem ondas P distintas, com frequência cardíaca baixa (cerca de 40 bpm), definindo Fibrilação Atrial com baixa resposta ventricular. Além disso, há alargamento do complexo QRS com padrão típico de Bloqueio de Ramo Esquerdo (BRE). A concomitância desses fatores piora a contratilidade cardíaca. A conduta médica baseia-se no tratamento da insuficiência cardíaca subjacente utilizando Diuréticos e Inibidores da ECA. O uso de Digoxina ou betabloqueadores deve ser evitado ou feito com extremo cuidado devido à bradicardia perigosa, sendo provável a necessidade de implante de um marca-passo definitivo.'
  },
  {
    id: 'ecg_case_011',
    dayId: 11,
    date: '2026-05-22',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_11.png',
    correctDiagnosisIds: ['atrial_tachycardia'],
    clinicalCase: 'Mulher de 40 anos refere episódios súbitos de palpitações, sentindo-as inclusive durante o registro deste ECG.',
    explanation: 'Este ECG mostra períodos alternados: trechos em ritmo sinusal normal (em torno de 60 bpm) subitamente interrompidos por surtos de Taquicardia Atrial Paroxística com frequência em torno de 100 bpm, seguidos novamente por batimentos isolados e extrassístoles atriais. Estas arritmias atriais são frequentes e frequentemente disparadas por estilo de vida. A conduta principal é recomendar enfaticamente a cessação do tabagismo e a abstenção de consumo excessivo de álcool e café. Em pacientes muito sintomáticos, a introdução de um betabloqueador pode ajudar no controle cronotrópico e supressão dos focos ectópicos atriais.'
  },
  {
    id: 'ecg_case_012',
    dayId: 12,
    date: '2026-05-23',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_12.png',
    correctDiagnosisIds: ['bdase'],
    clinicalCase: 'Homem de 70 anos em acompanhamento ambulatorial de rotina, portador de hipertensão arterial controlada.',
    explanation: 'O eletrocardiograma demonstra ritmo sinusal regular com presença de um Bloqueio Divisional Anterossuperior Esquerdo (BDASE), caracterizado pelo desvio extremo do eixo à esquerda (QRS positivo em DI e negativo em aVF). Há também alterações da repolarização ventricular, com inversão simétrica de ondas T em DI e aVL. Estes achados são marcadores de dano crônico em órgão-alvo decorrentes da hipertensão de longa data, indicando fibrose do sistema de condução e possível sobrecarga ventricular esquerda isolada. A conduta propedêutica exige um ecocardiograma para avaliar a massa e a fração de ejeção do VE, além de otimizar o uso de Inibidores da ECA para garantir controle rigoroso da pressão arterial.'
  },
  {
    id: 'ecg_case_013',
    dayId: 13,
    date: '2026-05-24',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_13.png',
    correctDiagnosisIds: ['flutter_atrial_2_1'],
    clinicalCase: 'Homem de 40 anos sem história cardíaca prévia, apresentando início súbito de insuficiência cardíaca.',
    explanation: 'A análise deste ECG demonstra as clássicas "ondas F" em formato de dente de serra nas derivações inferiores, uma marca registrada do Flutter Atrial. A frequência atrial é muito alta, porém o ventrículo responde de forma regular com bloqueio 2:1 (ou seja, uma frequência ventricular de aproximadamente 150 bpm). Trata-se de uma taquiarritmia causando falência cardíaca aguda (taquicardiomiopatia). O tratamento de emergência em pacientes com descompensação hemodinâmica é a Cardioversão Elétrica Sincronizada. Alternativamente, o uso de flecainida/amiodarona pode ser cogitado, mas a longo prazo a terapia de escolha para cura definitiva é a ablação por radiofrequência do istmo cavotricuspídeo.'
  },
{
    id: 'ecg_case_014',
    dayId: 14,
    date: '2026-05-25',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_14.png',
    correctDiagnosisIds: ['scacsst'],
    subDiagnosis: 'inferior',
    clinicalCase: 'Um homem de 50 anos foi admitido no hospital como emergência, com precordialgia característica de um infarto do miocárdio com 4 horas de evolução. Além das características associadas à dor, não há achados físicos anormais. O que o ECG mostra e o que poderíamos fazer?',
    explanation: '• Ritmo sinusal de 72 bpm • Eixo do QRS normal • Pequenas ondas Q em DIII • Elevação do segmento ST nas derivações DII, DIII e VF, com ondas T positivas • Provável infradesnível do segmento ST nas derivações V 2–V3 • Onda T invertida em VL Um ECG clássico de infarto agudo do miocárdio inferior, com a derivação aVL in- dicando isquemia. A profundidade das ondas Q é muito variável: compare este tra- çado com o de número 32, de um paciente com duração de sintomas semelhante. O alívio da dor é a prioridade. Se não houver contraindicações (risco de sangra- mento em locais importantes), o paciente deverá receber aspirina e, depois, passar por angioplastia transluminal coronária (ATC) ou receber um trombolítico.'
  },
  {
    id: 'ecg_case_015',
    dayId: 15,
    date: '2026-05-26',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_15.png',
    correctDiagnosisIds: ['wpw'],
    clinicalCase: 'Um estudante de 20 anos reclamava de palpitações. Os eventos ocorriam com a periodicidade de uma vez por ano. Eles iniciavam subitamente, eram sentidos de forma muito rápida e regular, com sensação imediata de dispneia e fadiga. O fim dos eventos também tinha caráter paroxístico em poucos minutos. Não há alterações no exame físico e este é seu ECG. O que deve ser feito?',
    explanation: '• Ritmo sinusal de 56 bpm • Intervalo PR curto, mais bem visualizado nas derivações peitorais • Eixo do QRS normal • Complexos QRS alargados (136 ms) • Fase inicial lenta do complexo QRS (onda delta) • Onda R dominante em V1 Este ECG é típico da síndrome de Wolff-Parkinson-White (WPW). Parece com o ECG da sobrecarga ventricular direita, pois é WPW tipo A, com uma via acessória lateral esquerda. O paciente relata claramente uma taquicardia de caráter paroxístico, e durante as crises ele sente lipotimia, indicando que a circulação fica comprometida. As crises são raras, portanto seria difícil o registro por meio do Holter. O paciente precisa de encaminhamento imediato a um eletrofisiologista para ablação da via acessória.'
  },
  {
    id: 'ecg_case_016',
    dayId: 16,
    date: '2026-05-27',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_16.png',
    correctDiagnosisIds: ['bav_1_grau'],
    clinicalCase: 'Este ECG foi obtido de uma mulher de 75 anos que reclamava de tontura. O traçado mostra uma anormalidade; qual é o seu significado?',
    explanation: '• Ritmo sinusal de 55 bpm • Intervalo PR prolongado com 320 ms • Eixo do QRS normal • Padrão RSR na derivação V1 , com duração do complexo QRS normal: atraso fi- nal de condução pelo ramo direito (AFC) • Segmento ST e ondas T normais Ritmo sinusal com bloqueio AV de primeiro grau. O AFC provavelmente não é sig- nificativo. O bloqueio de primeiro grau não ocasiona problema hemodinâmico e tem, por si só, pouca significância. Entretanto, quando um paciente apresenta sintomas (neste caso, tontura) que podem ser causados por bradicardia, pode haver episódios de bloqueio de segundo e terceiro graus, ou possivelmente crises de Stokes-Adams, as- sociados a escape ventricular com baixa resposta. Portanto, a ação apropriada é pedir um ECG ambulatorial de 24 horas, na esperança de que o paciente tenha uma de suas crises de tontura durante este período. Seria, então, possível ver se as verti- gens estão associadas a mudanças no ritmo cardíaco. O bloqueio AV de primeiro grau, em si, não constitui uma indicação para implante de marca-passo definitivo ou qualquer outra intervenção.'
  },
  {
    id: 'ecg_case_017',
    dayId: 17,
    date: '2026-05-28',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_17.png',
    correctDiagnosisIds: ['scacsst'],
    subDiagnosis: 'anterolateral',
    clinicalCase: 'Este ECG foi obtido de um homem de 60 anos que estava com dor precordial há 1 hora, na sala de emergência. O que ele mostra e o que você faria?',
    explanation: '• Ritmo sinusal de 82 bpm • Extrassístole ventricular • Eixo do QRS normal • Ondas Q nas derivações V2–V3; ondas Q pequenas nas derivações aVL e V4 • Segmentos ST elevados nas derivações DI, aVL e V 3 –V6 Trata-se de infarto agudo do miocárdio com supradesnível do segmento ST antero- lateral (IAMST). Embora uma onda Q esteja bem proeminente na derivação V 3 , as mudanças são totalmente consistentes com o quadro de dor por 1 hora. Esse paciente necessita de alívio imediato da dor com opiáceos. O ECG mostra seg- mentos ST elevados por mais de 2 mm em várias derivações, então ele precisa de angioplastia coronária imediata ou trombólise se qualquer risco de sangramento tiver sido excluído. Esse tratamento não deve ser adiado pela espera de radiografia torácica ou quaisquer outras investigações. Extrassístoles ventriculares não necessi- tam de tratamento específico.'
  },
  {
    id: 'ecg_case_018',
    dayId: 18,
    date: '2026-05-29',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_18.png',
    correctDiagnosisIds: ['left_ventricular_strain'],
    clinicalCase: 'Um cirurgião ortopédico de 70 anos ligou para dizer que sempre fica tonto quando joga golfe. No exame físico, auscultava-se um sopro sistólico. Seu ECG e sua radiografia de tórax foram mostrados. Qual o diagnóstico e o que você faria a seguir?',
    explanation: '• Ritmo sinusal com frequência de 48 bpm • Eixo do QRS normal • O complexo QRS tem duração normal, mas a altura da onda R na derivação V 5 é de 30 mm, e a profundidade da onda S na derivação V2 é de 25 mm • Ondas T invertidas nas derivações DI, aVL e V5–V6 A radiografia de tórax mostra ventrículo esquerdo aumentado com dilatação pós-estenótica da aorta ascendente (seta). Este é um ECG de aparência clássica de sobrecarga ventricular esquerda. A combinação de vertigens ao exercício, sopro sistólico e padrão sistólico de sobre- carga ventricular no ECG sugere estenose aórtica grave. O próximo passo é um ecocardiograma: nesse paciente ele mostra um gradiente transvalvar aórtico de 140 mmHg, indicando estenose grave. Ele necessita de troca valvar urgente.'
  },
  {
    id: 'ecg_case_019',
    dayId: 19,
    date: '2026-05-30',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_19.png',
    correctDiagnosisIds: ['bre'],
    clinicalCase: 'Uma mulher de 75 anos reclamou de desconforto retroesternal ao escalar montanhas, associado a tontura; em uma ocasião, ela “desmaiou” enquanto subia escadas. Que anormalidade este ECG mostra e quais sinais deveriam ser pesquisados no exame físico?',
    explanation: '• Ritmo sinusal de 79 bpm • Desvio do eixo do QRS para a esquerda • Complexos QRS alargados (192 ms) • Padrão “M” na derivação V6 • Ondas T invertidas nas derivações DI, aVL e V6 Este é um padrão característico do bloqueio do ramo esquerdo (BRE). A interpre- tação do ECG não vai além. Uma paciente que apresenta dor torácica pode ter angina, e a associação com ver- tigem e síncope de esforço provavelmente indica estenose aórtica grave. Este foi o caso dessa mulher. Clinicamente, ela apresentava leve aumento do pulso e pressão arterial de 100/80 mmHg, com discreta cardiomegalia. Auscultava-se um sopro eje- tivo alto, mais bem audível na borda esternal direita e irradiado para as carótidas. O diagnóstico foi confirmado por ecocardiograma, que demonstrou um gradiente transvalvar aórtico de cerca de 100 mmHg. O cateterismo cardíaco foi necessário para excluir doença coronária obstrutiva. Então, ela foi submetida a troca valvar aórtica e se recuperou totalmente.'
  },
  {
    id: 'ecg_case_020',
    dayId: 20,
    date: '2026-05-31',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_20.png',
    correctDiagnosisIds: ['bav_2_grau', 'scacsst'],
    subDiagnosis: 'inferior',
    clinicalCase: 'Um homem de 70 anos foi admitido no hospital após o início de fortes dores no peito. Este é seu ECG. O que mostra o traçado e qual é o tratamento necessário?',
    explanation: '• Ritmo sinusal de 75 bpm • Bloqueio AV de segundo grau tipo Wenckbach (mais evidente no traçado de ritmo em DII) • Frequência ventricular de 70 bpm • Eixo do QRS normal • Pequenas ondas Q em DII, DIII e aVF • Segmento ST supradesnivelado nas derivações DII, DIIIt, aVF • Segmentos ST infradesnivelado nas derivações V 5–V6 Este paciente tem bloqueio atrioventricular de segundo grau do tipo Wenckebach (aumento progressivo do intervalo PR seguido de uma onda P não conduzida, e depois um retorno para um intervalo PR mais curto e repetição do ciclo). Também há evidência de um infarto do miocárdio com supradesnível do segmento ST infe- rior recente (IAMST). O paciente deve ser tratado da forma convencional para abordagem do infarto agu- do do miocárdio, com alívio de dor e angioplastia coronária imediata ou trombó- lise. O bloqueio AV de segundo grau tipo Wenckebach geralmente é benigno quan- do ocorre no contexto do infarto inferior e deve-se, obviamente, monitorá-lo até que a condução normal retorne. Não é necessária a indicação de um marca-passo temporário.'
  },
  {
    id: 'ecg_case_021',
    dayId: 21,
    date: '2026-05-32',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_21.png',
    correctDiagnosisIds: ['ritmo_sinusal'],
    clinicalCase: 'Este ECG foi obtido de um estudante de medicina durante uma aula prática. O que ele mostra?',
    explanation: '• Ritmo sinusal de 70 bpm • Arritmia sinusal • Eixo do QRS normal • Complexo QRS normal • Segmento ST e ondas T normais Este é um ECG perfeitamente normal. Existe uma variação de frequência cardíaca batimento a batimento entre os complexos QRS, com frequência cardíaca aumen- tando e diminuindo sucessivamente. A comparação do batimento registrado na de- rivação aVF com o registrado na derivação V 3 pode dar a falsa impressão de uma mudança de ritmo, mas a fita de ritmo (derivação DII) mostra claramente a altera- ção progressiva do intervalo RR. Essa variação da frequência cardíaca está relacio- nada com os tempos respiratórios, sendo denominada arritmia sinusal respiratória, que é um fenômeno normal em jovens. A arritmia sinusal é diferente das extrassís- toles atriais, pois a morfologia da onda P não muda. Nada!'
  },
  {
    id: 'ecg_case_022',
    dayId: 22,
    date: '2026-05-33',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_22.png',
    correctDiagnosisIds: ['scasst'],
    subDiagnosis: 'isquemia_comum',
    clinicalCase: 'Este ECG foi obtido de um homem de 48 anos que apresentava forte dor precordial há 1 hora. O que ele mostra e o que você faria?',
    explanation: '• Ritmo sinusal de 75 bpm • Extremo desvio do eixo elétrico do QRS para a esquerda: bloqueio divisional anterossuperior esquerdo (BDASE) • Complexos QRS normais, com uma onda Q pequena (provavelmente septal) na derivação aVL • Ondas T invertidas nas derivações V1 e aV 5 Este é um infarto agudo do miocárdio sem supradesnível do segmento ST anterior (IAMSST). Este ECG não está dentro dos critérios convencionais para indicar angioplastia ou trombólise, que são supradesnível do segmento ST ou bloqueio do ramo esquerdo novo. O tratamento é alívio da dor, aspirina, heparina, um betabloqueador e uma estatina, com angioplastia assim que possível. A perspectiva imediata é boa, mas o paciente precisa ser monitorado e o ECG repetido após 1 hora para verificar se a elevação do segmento ST fica mais aparente.'
  },
  {
    id: 'ecg_case_023',
    dayId: 23,
    date: '2026-05-34',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_23.png',
    correctDiagnosisIds: ['afib', 'bre'],
    clinicalCase: 'Este ECG e a radiografia de tórax são de um homem de 70 anos que teve angina por algum tempo e estava sendo tratado com betabloqueador. Ele foi à emergência reclamando de dores semelhantes à de angina, mas muito mais fortes e persistentes, há 4 horas. Ele apresentava sopro cardíaco. O que o ECG e a radiografia de tórax mostram? Qual seria o tratamento mais adequado?',
    explanation: '• Fibrilação atrial; resposta ventricular de 62 bpm • Extremo desvio do eixo elétrico do QRS para a esquerda: bloqueio divisional anterossuperior esquerdo (BDASE) • Complexos QRS alargados (160 ms) • Padrão “M” dos complexos QRS nas derivações V5 –V6 • Ondas T invertidas nas derivações DI, aVL, e V5–V6 A radiografia de tórax mostra cardiomegalia à custa do ventrículo esquerdo e dilatação da aorta ascendente. Este ECG mostra fibrilação atrial e BRE. Não são possíveis outras interpretações. O paciente tem angina e a radiografia de tórax sugere estenose aórtica. O BRE in- dica estenose aórtica grave. O problema é decidir se o episódio de dor intensa ocor- re por causa de um quadro de angina ou devido a um infarto do miocárdio. Outra possibilidade é a dissecção da aorta. A angioplastia coronária ou agentes trombolí- ticos não devem ser usados se não houver registros anteriores de que o BRE é novo, e o tratamento dependerá do nível de troponina sérico. O paciente necessita, urgen- temente, de um ecocardiograma e, provavelmente, de um cateterismo cardíaco, com o intuito de avaliar uma eventual troca valvar. Ele precisará de anticoagulantes de longo prazo por causa da fibrilação atrial.'
  },
  {
    id: 'ecg_case_024',
    dayId: 24,
    date: '2026-05-35',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_24.png',
    correctDiagnosisIds: ['afib'],
    clinicalCase: 'Este ECG e a radiografia de tórax são de um homem de 60 anos que está sendo tratado como paciente ambulatorial para insuficiência cardíaca congestiva. Qual poderia ser o diagnóstico da doença subjacente e o que deveríamos fazer?',
    explanation: '• Fibrilação atrial • Resposta ventricular média de 120 bpm • Eixo do QRS normal • Complexo QRS normal • Depressão horizontal do segmento ST nas derivações V 3–V4 • Depressão descendente do segmento ST nas derivações DI, DII e V 5–V6 A radiografia de tórax mostra cardiomegalia, à custa do ventrículo e átrio es- querdos. A resposta ventricular não está adequadamente controlada, embora a depressão descendente do segmento ST indique que o paciente esteja tomando digoxina. A depressão horizontal do segmento ST sugere isquemia. Apesar da evidência de isquemia no ECG, outros diagnósticos possíveis incluem doença reumática, tireotoxicose, cardiopatia alcoólica e outras formas de cardio- miopatia. A radiografia de tórax sugere insuficiência mitral grave. O ecocardiogra- ma é indicado. O nível de digoxina sérica deveria ser conferido e a dose do fárma- co, aumentada se apropriado. Além da digoxina, o paciente necessita de inibidores da enzima conversora da angiotensina, um diurético e, a não ser que contraindica- dos, anticoagulantes. Betabloqueador deve ser considerado quando a insuficiência cardíaca for controlada.'
  },
  {
    id: 'ecg_case_025',
    dayId: 25,
    date: '2026-05-36',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_25.png',
    correctDiagnosisIds: ['scacsst', 'old_mi_inferior'],
    subDiagnosis: 'anterior',
    clinicalCase: 'Um homem de 60 anos, que 3 anos antes teve um infarto do miocárdio seguido de angina leve, deu entrada no hospital com dor no peito que já durava 1 hora e não havia respondido aos nitratos sublinguais. O que mostra este ECG e o que você faria?',
    explanation: '• Ritmo sinusal de 103 bpm • Eixo do QRS normal • Ondas Q em DII, DIII e aVF • Complexos QRS normais nas derivações anteriores • Elevação do segmento ST marcado nas derivações V 1–V6 As ondas Q nas derivações DIII e aVF sugerem um infarto inferior antigo, enquan- to os segmentos ST supradesnivelados das derivações V 1 –V6 indicam um infarto agudo com supra anterior. Deve-se dar analgésico ao paciente e, se não houver quaisquer contraindicações normais, ele deverá ser tratado imediatamente com aspirina, angioplastia coronária ou um agente trombolítico. Se ele tiver sido tratado anteriormente com estreptoqui- nase, deverá receber, agora, ateplase ou reteplase.'
  },
  {
    id: 'ecg_case_026',
    dayId: 26,
    date: '2026-05-37',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_26.png',
    correctDiagnosisIds: ['brd'],
    clinicalCase: 'Um garoto de 15 anos foi encaminhado ao ambulatoório por causa de um sopro cardíaco. Ele era assintomático. O que o ECG mostra e qual sinal deveríamos procurar no exame físico?',
    explanation: '• Ritmo sinusal de 83 bpm • Desvio do SAQRS para a direita • Complexos QRS alargados (140 ms) • Padrão RSR nas derivações V1 –V3 • Ondas S largas e acentuadas na derivação V6 • Segmento ST normal • Inversão da onda T nas derivações DIII, aVF e V 1–V4 Bloqueio do ramo direito (BRD). O desvio do eixo para a direita sugere bloqueio divisional posteroinferior. O BRD é visto em uma pequena fração das pessoas com corações perfeitamente normais. Diante de sopro, porém, deve ser considerada a hipótese de comunicação interatrial (CIA). Isso era o que o paciente apresentava. Os sinais físicos foram um segundo som pulmonar amplamente desdobrado que não variava com a inspiração (típico de BRD) e sopro sistólico ejetivo mais bem auscultado na borda esternal esquerda. Na inspiração profunda, um sopro baixo foi ouvido na borda esternal esquerda inferior. O sopro sistólico segue o fluxo pulmonar devido à quantidade de sangue extra para o lado direito, e o sopro diastólico que ocorre na inspiração é um sopro de estenose tricúspide. O diagnóstico foi confirmado por ecocardiografia, e o orifício foi fechado de maneira menos invasiva por procedimento percutâneo usando-se um dispositivo em forma de “guarda-chuva”. Após o procedimento, per- sistiu o BRD.'
  },
  {
    id: 'ecg_case_027',
    dayId: 27,
    date: '2026-05-38',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_27.png',
    correctDiagnosisIds: ['flutter_atrial_2_1'],
    clinicalCase: 'Este ECG foi obtido de um homem de 40 anos que se queixava de dispneia ao subir escadas. Não tinha consciência de seu ritmo cardíaco rápido e não relatava dor precordial. Além da frequência rápida, não havia outras anormalidades cardiovasculares, mas no exame físico observavam-se discreta icterícia e esplenomegalia. O que deve ser feito?',
    explanation: '• Flutter atrial • Resposta ventricular de 148 bpm • Eixo do QRS normal • Complexo QRS, segmento ST e onda T normais Flutter atrial com bloqueio 2 : 1. Contanto que o paciente não esteja em insuficiência cardíaca, sempre é uma boa ideia identificar a causa da arritmia antes de tratá-la. A combinação de arritmia atrial, icterícia e esplenomegalia sugere alcoolismo. O paciente necessita de antico- agulantes, mas sua relação normatizada internacional (INR) pode já ser alta. É ne- cessário um ecocardiograma para avaliar a função ventricular esquerda. A massa- gem carotídea provavelmente aumentará o bloqueio atrioventricular, mas é improvável que corrija a arritmia. Digoxina, um betabloqueador ou verapamil po- dem ser ministrados para tentar controlar a resposta ventricular. Após a anticoagu- lação, a cardioversão – elétrica ou com flecainida – será necessária.'
  },
  {
    id: 'ecg_case_028',
    dayId: 28,
    date: '2026-05-39',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_28.png',
    correctDiagnosisIds: ['pe'],
    clinicalCase: 'Este ECG e o angiograma pulmonar são de uma mulher de 39 anos que se queixava de um início repentino de dispneia. Não havia história prévia de dispneia nem de dor torácica. O exame físico revelava apenas taquicardia. O angiograma pulmonar foi realizado como parte de uma série de investigações imediatamente após a admissão. Qual é o diagnóstico?',
    explanation: '• Ritmo sinusal de 140 bpm • Condução AV normal • Eixo normal do QRS • Complexos QRS normais • Segmentos ST infradesnivelados nas derivações V 1–V4 • Ondas T bifásicas ou invertidas na parede inferior e em todas as outras derivações O ECG mostra taquicardia sinusal sem desvio do eixo e complexos QRS normais. As mudanças difusas do ST e da onda T são claramente muito anormais, porém não são específicas para qualquer problema em particular. No entanto, o fato de que as deri- vações V1–V3 estão acometidas sugere um problema no ventrículo direito. O angiograma pulmonar mostrou um grande trombo central e oclusão das ar- térias da porção inferior do pulmão direito. Este é um caso em que o ECG deve ser considerado levando-se em conta a história do paciente e o exame físico (caso exista alguma alteração). Claramente, algo acon- teceu: o começo súbito da dispneia sem dor sugere embolia pulmonar central – com embolia pulmonar que não alcança a superfície pleural do pulmão pode haver um pouco de dor. Nessa paciente, um ecocardiograma e um angiograma pulmonar de- monstraram um trombo pulmonar grande. Lembre-se de que o aparecimento de dispneia súbita com alteração nos campos pulmonares na radiografia de tórax de rotina deve sugerir embolia pulmonar aguda até que se prove o contrário. Hepari- na é essencial; trombólise deveria ser considerada.'
  },
  {
    id: 'ecg_case_029',
    dayId: 29,
    date: '2026-05-40',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_29.png',
    correctDiagnosisIds: ['bav_1_grau', 'scasst'],
    subDiagnosis: 'isquemia_comum',
    clinicalCase: 'Este ECG foi obtido de um homem de 50 anos admitido no hospital como emergência, apresentando precordialgia típica de um infarto do miocárdio com 3 horas de evolução. O que o ECG mostra e como o paciente deve ser tratado?',
    explanation: '• Ritmo sinusal de 65 bpm • Intervalo PR marcadamente prolongado (480 ms) • Eixo normal do QRS • Complexos QRS normais • Inversão da onda T nas derivações V 1 –V3 Bloqueio AV de primeiro grau associado a um infarto do miocárdio anterior sem elevação do segmento ST (IAMSST). Como a inversão da onda T está nas deriva- ções V 1 –V 3 mas não em V 4 , a possibilidade de embolia pulmonar deve ser consi- derada. As mudanças no ECG não preenchem os critérios convencionais para uma angio- plastia coronária ou trombólise (supra de ST ou BRE), mas o paciente precisa de um tratamento completo para IAMSST– heparina, aspirina, clopidogrel, um beta- bloqueador, possivelmente um nitrato e uma estatina. Uma angiografia precoce de- ve ser considerada. Bloqueio AV de primeiro grau não é indicação para marca-pas- so temporário, porém o paciente deve ser monitorizado em caso de aparecimento de um bloqueio AV de grau mais alto.'
  },
  {
    id: 'ecg_case_030',
    dayId: 30,
    date: '2026-05-41',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_30.png',
    correctDiagnosisIds: ['old_mi_anterior'],
    clinicalCase: 'Um homem de 65 anos é visto no ambulatório externo queixando-se de falta de ar e dor no peito com características de angina. Não estava tratado. Seu ECG ajuda no diagnóstico e no tratamento?',
    explanation: '• Ritmo sinusal de 48 bpm • Eixo normal do QRS • Ondas R pequenas nas derivações V2–V4 e uma onda R normal (alta) em V5 A ocorrência de ondas R pequenas nas derivações V 2–V4 e o surgimento repentino de uma onda R normal em V5 constituem a “progressão pobre de onda R” e, apesar da ausência de ondas Q, isso provavelmente indica um infarto anterior antigo. Uma explicação alternativa pode ser um mau posicionamento das derivações precordiais. O ECG deve ser repetido para garantir um posicionamento adequado das derivações precordiais. Ecocardiograma e radiografia de tórax são necessários para verificar se a insuficiência cardíaca é responsável pela falta de ar e um ecocardiograma de es- tresse ou imagem de perfusão são necessários para investigar a dor no peito.'
  },
  {
    id: 'ecg_case_031',
    dayId: 31,
    date: '2026-05-42',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_31.png',
    correctDiagnosisIds: ['vtach'],
    clinicalCase: 'Este ECG foi obtido em uma unidade coronária de um paciente admitido 2 horas antes com infarto agudo do miocárdio anterior. O paciente estava com sudorese fria, confuso e sua pressão arterial não era mensurável. O que o ECG mostra e o que você faria?',
    explanation: '• Taquicardia de QRS largo, frequência de aproximadamente 215 bpm • Complexos QRS regulares • Duração do complexo QRS incerta: provavelmente 280 ms • Eixo do QRS e configuração dos complexos indeterminados No contexto clínico de um infarto agudo do miocárdio, a presença de taquicardia com QRS largo sugere origem ventricular, a menos que se saiba previamente que o paciente, durante o ritmo sinusal, apresentava bloqueio de ramo. A regularidade no ritmo, os complexos QRS muito largos e de configuração bizarra nos conduzem ao diagnóstico de taquicardia ventricular. Em casos de grave comprometimento hemodinâmico, é necessário realizar cardio- versão elétrica imediatamente.'
  },
  {
    id: 'ecg_case_032',
    dayId: 32,
    date: '2026-05-43',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_32.png',
    correctDiagnosisIds: ['scacsst'],
    subDiagnosis: 'inferior',
    clinicalCase: 'Um homem de 50 anos é admitido no hospital como uma emergência, com dor no peito por 4 horas. A dor é característica de um infarto do miocárdio. Além dos sinais secundários da dor, o exame físico é normal. O que o ECG mostra e o que poderíamos fazer?',
    explanation: '• Ritmo sinusal de 38 bpm • Eixo do QRS normal • Ondas Q pequenas em DII, DIII, VF e V4–V6 • Complexos QRS normais nas precordiais • Segmentos ST elevados em DII, DIII, aVF e, em menor magnitude, V 4 e V 5 • Segmentos ST infradesnivelados nas derivações aVL e V 2 Trata-se de infarto agudo do miocárdio inferior com elevação do segmento ST (IA- MST). A rapidez do desenvolvimento da onda Q é extremamente variável, mas o traçado é certamente consistente com um histórico de 4 horas. O segmento ST com padrão infradescendente em V 2 sugere o envolvimento da região posterior do ven- trículo esquerdo. O mais importante do tratamento é o alívio da dor. Se não houver contraindicações, o paciente deverá receber aspirina imediatamente e, em seguida, deverá ser realiza- da angioplastia coronária ou trombólise o mais rápido possível.'
  },
  {
    id: 'ecg_case_033',
    dayId: 33,
    date: '2026-05-44',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_33.png',
    correctDiagnosisIds: ['scasst'],
    subDiagnosis: 'isquemia_comum',
    clinicalCase: 'Este ECG anormal foi obtido de um homem de 80 anos que estava sendo observado na sala de recuperação após uma operação de desvio femoral-poplíteo. O que ele mostra e o que você faria?',
    explanation: '• Ritmo sinusal de 68 bpm • Eixo normal do QRS • Complexos QRS normais • Depressão horizontal marcada do segmento ST (aproximadamente 8 mm) de V2 – V4 e depressão descendente do segmento ST nas derivações laterais O paciente é idoso, portador de doença vascular periférica, então doença arterial coronária deve estar presente. O aspecto do ECG é característico de isquemia grave. A ausência de taquicardia surpreende. Não é fácil lidar com essa situação, pois a condição de pós-operatório dita a con- duta. Ele precisa de anticoagulante com aspirina e heparina, embora seu estado pós-operatório previna isso, e nitratos intravenosos devem ser administrados cuida- dosamente.'
  },
  {
    id: 'ecg_case_034',
    dayId: 34,
    date: '2026-05-45',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_34.png',
    correctDiagnosisIds: ['bav_2_grau', 'bdase', 'old_mi_anterior'],
    clinicalCase: 'Este ECG foi obtido de um homem de 75 anos que se queixava de falta de ar. Não apresentou dor torácica ou vertigens. Além da bradicardia, não havia outra anormalidade no exame físico. Quais são as três anormalidades presentes neste traçado e como este paciente deve ser tratado?',
    explanation: '• Ritmo sinusal de 45 bpm • Bloqueio AV (2:1) de segundo grau • Desvio do eixo para a esquerda • Pequena progressão da onda R nas precordiais • Ondas T normais O bloqueio AV de segundo grau apresenta frequência ventricular de 45 bpm, que poderia ser a causa da dispneia. O extremo desvio do eixo elétrico para a esquerda é consequência de bloqueio divisional anterossuperior esquerdo. A progressão pobre da onda R (praticamente nenhuma onda R em V 3, uma onda R pequena em V 4 e uma onda R normal em V5 ) sugere um infarto anterior antigo. O paciente necessita de implante de marca-passo definitivo.'
  },
  {
    id: 'ecg_case_035',
    dayId: 35,
    date: '2026-05-46',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_35.png',
    correctDiagnosisIds: ['ritmo_sinusal'],
    clinicalCase: 'Este ECG foi obtido de um aluno de medicina de 22 anos. Ele estava preocupado – o que ele poderia ter?',
    explanation: '• Ritmo sinusal de 44 bpm • Eixo normal do QRS • Ondas R altas (23 mm em V5 ) e ondas S profundas (41 mm em V2) • Segmento ST e ondas T normais • Ondas U proeminentes de V2 –V5 Este registro mostra que há sobrecarga ventricular por “critérios de amplitude” (on- das R com mais de 25 mm em V5 ou V6 , ou a soma da onda R de V5 ou V6 mais a onda S de V1, ou V2 com mais de 35 mm). Porém não há mudanças na onda T. Os “critérios de amplitude” não são confiáveis. Esse jovem pode ter um padrão varian- te do normal. As ondas U são perfeitamente normais e esse padrão é comum em atletas. Diga ao aluno para comprar um bom livro de interpretação de ECG, mas, se isso não for suficiente, um ecocardiograma poderá ser usado para avaliar a espessura ventricular esquerda.'
  },
  {
    id: 'ecg_case_036',
    dayId: 36,
    date: '2026-05-47',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_36.png',
    correctDiagnosisIds: ['old_mi_anterior'],
    clinicalCase: 'Um homem de 70 anos foi atendido ambulatorialmente com sintomas e sinais de insuficiência cardíaca. Seu problema começou subitamente poucas semanas antes, quando apresentou um desconforto precordial contínuo. O que este ECG e a alteração da sua radiografia de tórax mostram? O que poderia ser feito?',
    explanation: '• Ritmo sinusal de 100 bpm • Eixo normal do QRS • Ondas Q em DI, AVL e V2–V5 • Segmentos ST com supradesnível em DI, aVL e V 2–V6 A radiografia de tórax mostra o desvio do fluxo sanguíneo para zonas superio- res dos pulmões, que são sinais radiológicos de insuficiência cardíaca crônica. A elevação do segmento ST sugere infarto agudo, porém as profundas ondas Q as- sinalam que o infarto ocorreu há várias horas. Pelo histórico do paciente, parece claro que o infarto ocorreu há várias semanas e não existe no histórico algo que indique um episódio agudo. Essas mudanças do ECG provavelmente são antigas. Assim, o padrão do ECG associado à clínica levanta a hipótese de aneurisma da parede anterior do ventrículo esquerdo. Um ECG deve sempre ser interpretado à luz dos fatos clínicos. Como o ECG é com- patível com infarto antigo, deveríamos assumir que o diagnóstico é correto e que o paciente deveria ser tratado para a insuficiência cardíaca de forma habitual, com diuréticos, inibidores da enzima de conversão da angiotensina e betabloqueadores. Uma vez que a insuficiência cardíaca é claramente devida à isquemia miocárdica, ele também necessita de aspirina e uma estatina.'
  },
  {
    id: 'ecg_case_037',
    dayId: 37,
    date: '2026-05-48',
    images: [{ url: '/imagens/desafio_ecg/ecg_caso_37-1.png', label: 'Repouso' }, { url: '/imagens/desafio_ecg/ecg_caso_37-2.png', label: 'Esforço' }],
    correctDiagnosisIds: ['scasst'],
    subDiagnosis: 'isquemia_comum',
    clinicalCase: 'Um homem de 60 anos foi encaminhado ao ambulatório devido a uma dor no peito induzida por exercício. O que este traçado (durante o exercício) mostra e o que poderia ser feito?',
    explanation: 'O ECG superior (repouso) mostra: • Ritmo sinusal de 75 bpm • Eixo normal do QRS • Complexos QRS normais • Segmentos ST infradesnivelados em DII, aVF e V 6 • Inversão de onda T na derivação DIII. Interpretação: Mudanças inespecíficas, mas angina é provável. O ECG inferior (exercício) mostra: • Ritmo sinusal com frequência cardíaca de 140 bpm • Eixo normal do QRS • Complexos QRS normais • Depressão no segmento ST na maioria das derivações, com até 4 mm em V5. Interpretação: Mudanças clássicas de isquemia em baixa carga, sugerindo doença coronária difusa grave. Conduta: Tratar com nitratos, betabloqueadores e antagonistas do cálcio, e encaminhar para angiografia coronária urgente com provável angioplastia ou revascularização.'
  },
  {
    id: 'ecg_case_038',
    dayId: 38,
    date: '2026-05-49',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_38.png',
    correctDiagnosisIds: ['bav_2_grau'],
    clinicalCase: 'Um homem de 70 anos com pressão arterial elevada há muito tempo tem apresentado episódios de tontura por várias semanas. Seu pulso estava irregular, mas não havia outros sinais anormais. Este é o ECG dele. O que ele mostra e o que você faria?',
    explanation: '• Os primeiros nove batimentos com ritmo sinusal e frequência ventricular de apro- ximadamente 80 bpm • O intervalo PR nesses nove batimentos aumenta devagar, de 240 ms para 360 ms • Há em sequência uma onda P não conduzida, seguida por uma onda P conduzi- da com um intervalo PR de 360 ms • Há em sequência uma segunda onda P não conduzida, seguida por duas ondas P conduzidas, novamente com um intervalo PR de 360 ms • Eixo normal do QRS • Complexos QRS, segmentos ST e ondas T normais Esse traçado mostra uma mistura de tipos diferentes de bloqueio AV. Os intervalos PR, aumentando progressivamente e seguidos de uma onda P não conduzida, repre- sentam um bloqueio de segundo grau do tipo Wenckebach (Mobitz tipo 1). A pró- xima onda P não conduzida seguida por uma onda P conduzida com um intervalo PR longo é o bloqueio de segundo grau Mobitz tipo 2. O batimento final, com o mesmo intervalo PR prolongado, mostra bloqueio de primeiro grau. O batimento cardíaco irregular é possivelmente a causa de suas crises de lipotimia. Como esse homem não sente dor e não há evidências de isquemia no ECG, é pou- co provável que a doença coronária seja responsável pelo problema de condução. Você deve sempre pensar em miocardite e doenças infiltrativas que podem afetar o feixe de His, mas, em um paciente hipertenso, a causa mais provável desse tipo de bloqueio é o uso de medicação. O paciente pode estar tomando um betabloqueador ou um antagonista de cálcio; a primeira coisa a fazer seria descontinuar esses me- dicamentos.'
  },
  {
    id: 'ecg_case_039',
    dayId: 39,
    date: '2026-05-50',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_39.png',
    correctDiagnosisIds: ['afib'],
    clinicalCase: 'Este ECG foi obtido de uma mulher de 70 anos admitida no hospital com insuficiência cardíaca congestiva descompensada. O que o ECG mostra e o que você faria?',
    explanation: '• Fibrilação atrial, frequência cardíaca de 110 bpm • Eixo normal do QRS • Complexos QRS normais • Segmentos ST normais O ritmo poderia ser interpretado como flutter atrial, particularmente em aVL. No entanto, a condução AV é variável e os complexos QRS estão completamente irre- gulares, portanto trata-se de fibrilação arterial. Os segmentos ST são normais, sem sugerir efeito digitálico, e a taxa de resposta ventricular não está controlada. Por- tanto o paciente, provavelmente, não está tomando digoxina. A resposta ventricular neste caso é elevada, e a falta de controle pode contribuir para a descompensação. A função da tireoide deveria ser conferida, e também de- veria ser realizado um ecocardiograma para avaliar o tamanho das câmaras e a função ventricular. O controle da resposta ventricular deveria ser mantido com di- goxina, que é o primeiro fármaco a ser empregado. A insuficiência cardíaca deve ser tratada com um diurético e provavelmente um inibidor da enzima conversora da angiotensina e, em seguida, uma cardioversão deve ser considerada. É pouco provável que ela tenha sucesso, a menos que uma causa subjacente curável esteja presente, como tireotoxicose. Nessa idade, a paciente precisará de um anticoagu- lante para o resto da vida, como a varfarina, não importando o que seu ecocardio- grama mostre.'
  },
  {
    id: 'ecg_case_040',
    dayId: 40,
    date: '2026-05-51',
    imageUrl: '/imagens/desafio_ecg/ecg_caso_40.png',
    correctDiagnosisIds: ['atrial_tachycardia'],
    clinicalCase: 'Este ECG foi obtido de uma mulher de 30 anos que se queixava de palpitações. Ele ajuda a fazer um diagnóstico?',
    explanation: '• Ritmo ectópico atrial, com ondas P invertidas em DII, DIII, aVF e V 3 –V6; fre- quência ventricular de 69 bpm • Eixo normal do QRS • Complexos QRS e ondas normais Esse parece ser um ritmo estável, originando-se no miocárdio atrial em vez de no nó SA – o que explica a onda P anormal e o intervalo PR um pouco curto (130 ms). Esse ritmo não é incomum e é habitualmente de pouca significância clínica. É pou- co provável que isso seja a causa dos sintomas, a não ser que ela tenha, às vezes, taquicardia atrial paroxística. Faça um anamnese cuidadosa e tente determinar se os sintomas da paciente parecem ser os de uma taquicardia paroxística – pergunte sobre qualquer início ou final re- pentino das palpitações; sintomas associados como falta de ar; fatores desencade- antes e finalização; e assim por diante. Se estiver em dúvida, algum tipo de registro ambulatório será necessário.'
  },
];
