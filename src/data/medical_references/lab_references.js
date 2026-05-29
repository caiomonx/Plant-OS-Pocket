/**
 * Dicionário Científico Global de Referências Laboratoriais
 * Baseado em consensos médicos e referências de laboratórios de excelência (Ex: Fleury).
 * Essa tabela é utilizada injetada pela UI para renderização dinâmica do (x - y), 
 * desacoplando a responsabilidade do backend dos casos clínicos.
 */

export const labReferences = {
    // ==========================================
    // HEMATOLOGIA BÁSICA (HEMOGRAMA)
    // ==========================================
    hm: { label: 'Hemácias', range: '4.0 - 5.5', unit: 'M/mm³' },
    hb: { label: 'Hemoglobina', range: '12.0 - 16.0', unit: 'g/dL' },
    ht: { label: 'Hematócrito', range: '36 - 48', unit: '%' },
    vcm: { label: 'VCM', range: '80 - 100', unit: 'fL' },
    hcm: { label: 'HCM', range: '26 - 34', unit: 'pg' },
    chcm: { label: 'CHCM', range: '31 - 36', unit: 'g/dL' },
    rdw: { label: 'RDW', range: '11.5 - 14.5', unit: '%' },
    
    leuko_total: { label: 'Leucócitos Totais', range: '4.000 - 10.000', unit: '/mm³' },
    neutro: { label: 'Neutrófilos', range: '40 - 70', unit: '%' },
    lymph: { label: 'Linfócitos', range: '20 - 40', unit: '%' },
    mono: { label: 'Monócitos', range: '2 - 10', unit: '%' },
    eos: { label: 'Eosinófilos', range: '1 - 5', unit: '%' },
    baso: { label: 'Basófilos', range: '0 - 1', unit: '%' },
    bands: { label: 'Bastões', range: '0 - 4', unit: '%' },
    blasts: { label: 'Blastos', range: 'Ausente', unit: '' },

    platelets: { label: 'Plaquetas', range: '150.000 - 400.000', unit: '/mm³' },
    vpm: { label: 'VPM', range: '7.0 - 11.0', unit: 'fL' },

    // ==========================================
    // CINÉTICA DO FERRO E ANEMIAS
    // ==========================================
    ferro_serico: {
        label: 'Ferro Sérico',
        range: '65 - 175',
        unit: 'μg/dL',
    },
    ferritina: {
        label: 'Ferritina',
        range: '30 - 300', // Adaptado para adulto neutro
        unit: 'ng/mL',
    },
    ist: {
        label: 'Índice de Saturação da Transferrina (IST)',
        range: '20 - 50',
        unit: '%',
    },
    tibc: {
        label: 'TIBC (Capacidade Total Ligação Ferro)',
        range: '250 - 450',
        unit: 'μg/dL',
    },
    vitamina_b12: {
        label: 'Vitamina B12',
        range: '200 - 900',
        unit: 'pg/mL',
    },
    acido_folico: {
        label: 'Ácido Fólico',
        range: '> 4.0',
        unit: 'ng/mL',
    },
    reticulocitos: {
        label: 'Reticulócitos',
        range: '0.5 - 2.0',
        unit: '%',
    },
    acido_metilmalonico: {
        label: 'Ácido Metilmalônico (MMA)',
        range: '87 - 318',
        unit: 'nmol/L',
    },
    homocisteina: {
        label: 'Homocisteína',
        range: '5 - 15',
        unit: 'μmol/L',
    },

    // ==========================================
    // MARCADORES DE HEMÓLISE
    // ==========================================
    dhl: {
        label: 'DHL (Lactato Desidrogenase)',
        range: '120 - 246',
        unit: 'U/L',
    },
    haptoglobina: {
        label: 'Haptoglobina',
        range: '40 - 200',
        unit: 'mg/dL',
    },
    bilirrubina_total: {
        label: 'Bilirrubina Total',
        range: 'Até 1.2',
        unit: 'mg/dL',
    },
    bilirrubina_direta: {
        label: 'Bilirrubina Direta',
        range: 'Até 0.4',
        unit: 'mg/dL',
    },
    bilirrubina_indireta: {
        label: 'Bilirrubina Indireta',
        range: 'Até 0.8',
        unit: 'mg/dL',
    },

    // ==========================================
    // COAGULAÇÃO
    // ==========================================
    tap_inr: {
        label: 'TAP (INR)',
        range: '0.8 - 1.2',
        unit: '',
    },
    tap_sec: {
        label: 'TAP (Segundos)',
        range: '11 - 13.5',
        unit: 'seg',
    },
    ptta: {
        label: 'PTTa',
        range: '25 - 35',
        unit: 'seg',
    },
    ptta_ratio: {
        label: 'Relação PTTa',
        range: '0.8 - 1.2',
        unit: '',
    },
    fibrinogenio: {
        label: 'Fibrinogênio',
        range: '200 - 400',
        unit: 'mg/dL',
    },
    
    // ==========================================
    // OUTROS GERAIS
    // ==========================================
    acido_urico: {
        label: 'Ácido Úrico',
        range: '3.4 - 7.0',
        unit: 'mg/dL',
    },
    fosforo: {
        label: 'Fósforo',
        range: '2.5 - 4.5',
        unit: 'mg/dL',
    },
    calcio_ionico: {
        label: 'Cálcio Iônico',
        range: '4.6 - 5.3',
        unit: 'mg/dL',
    },

    // ==========================================
    // PERFIL LIPÍDICO
    // ==========================================
    colesterol_total: {
        label: 'Colesterol Total',
        range: '< 190',
        unit: 'mg/dL',
    },
    ldl: {
        label: 'LDL',
        range: '< 130',
        unit: 'mg/dL',
    },
    hdl: {
        label: 'HDL',
        range: '> 40',
        unit: 'mg/dL',
    },
    triglicerideos: {
        label: 'Triglicerídeos',
        range: '< 150',
        unit: 'mg/dL',
    },

    // ==========================================
    // NEFROLOGIA E IMUNOLOGIA
    // ==========================================
    c3: {
        label: 'Complemento C3',
        range: '90 - 180',
        unit: 'mg/dL',
    },
    c4: {
        label: 'Complemento C4',
        range: '10 - 40',
        unit: 'mg/dL',
    },
    ch50: {
        label: 'CH50',
        range: '60 - 144',
        unit: 'U/mL',
    },
    aslo: {
        label: 'ASLO',
        range: '< 200',
        unit: 'UI/mL',
    },
    proteina_urina_24h: {
        label: 'Proteína (Urina 24h)',
        range: '< 150',
        unit: 'mg/24h',
    },

    // ==========================================
    // EXAMES QUALITATIVOS / AVANÇADOS
    // ==========================================
    coombs_direto: {
        label: 'Coombs Direto',
        range: 'Negativo',
        unit: '',
    },
    coombs_indireto: {
        label: 'Coombs Indireto',
        range: 'Negativo',
        unit: '',
    },
    esquizocitos: {
        label: 'Pesquisa de Esquizócitos',
        range: 'Negativo',
        unit: '',
    },
    // Eletroforese de Proteínas
    proteinas_totais: {
        label: 'Proteínas Totais',
        range: '6.0 - 8.0',
        unit: 'g/dL',
    },
    albumina: {
        label: 'Albumina',
        range: '3.5 - 5.5',
        unit: 'g/dL',
    },
    alfa1_globulina: {
        label: 'Alfa-1 Globulina',
        range: '0.1 - 0.4',
        unit: 'g/dL',
    },
    alfa2_globulina: {
        label: 'Alfa-2 Globulina',
        range: '0.5 - 0.9',
        unit: 'g/dL',
    },
    beta_globulina: {
        label: 'Beta Globulina',
        range: '0.6 - 1.1',
        unit: 'g/dL',
    },
    gama_globulina: {
        label: 'Gama Globulina',
        range: '0.7 - 1.7',
        unit: 'g/dL',
    },
    componente_m: {
        label: 'Componente Monoclonal (M)',
        range: 'Ausente',
        unit: '',
    },
    // Mielograma
    celularidade: {
        label: 'Celularidade Medular',
        range: 'Normocelular',
        unit: '',
    },
    megacariocitos: {
        label: 'Megacariócitos',
        range: 'Presentes / Normais',
        unit: '',
    },
    relacao_g_e: {
        label: 'Relação G:E',
        range: '2:1 - 4:1',
        unit: '',
    },
    blastos_medula: {
        label: 'Blastos na Medula',
        range: '< 5%',
        unit: '',
    },
    // Imunofenotipagem
    imuno: {
        label: 'Imunofenotipagem',
        range: 'Sem clone neoplásico',
        unit: '',
    },
    // FISH / Citogenética
    bcr_abl: {
        label: 'FISH BCR-ABL',
        range: 'Negativo',
        unit: '',
    }
};

/**
 * Mapa de aliases: chaves curtas usadas nos cenários clínicos -> chave canônica do dicionário.
 * Isso garante match perfeito independente da nomenclatura do caso.
 */
const aliasMap = {
    // Hemograma
    hm: 'hm',
    hemacias: 'hm',
    hb: 'hb',
    hemoglobina: 'hb',
    ht: 'ht',
    hematocrito: 'ht',
    vcm: 'vcm',
    hcm: 'hcm',
    chcm: 'chcm',
    rdw: 'rdw',

    leukototal: 'leuko_total',
    leucocitos: 'leuko_total',
    neutro: 'neutro',
    neutrofilos: 'neutro',
    lymph: 'lymph',
    linfocitos: 'lymph',
    mono: 'mono',
    monocitos: 'mono',
    eos: 'eos',
    eosinofilos: 'eos',
    baso: 'baso',
    basofilos: 'baso',
    bands: 'bands',
    bastoes: 'bands',
    blasts: 'blasts',
    blastos: 'blasts',

    platelets: 'platelets',
    plaquetas: 'platelets',
    vpm: 'vpm',

    // Cinética do Ferro
    iron:              'ferro_serico',
    ferro:             'ferro_serico',
    ferro_serico:      'ferro_serico',
    ferritin:          'ferritina',
    ferritina:         'ferritina',
    ist:               'ist',
    sat_transferrina:  'ist',
    tibc:              'tibc',

    // Vitaminas
    b12:               'vitamina_b12',
    vitamina_b12:      'vitamina_b12',
    vit_b12:           'vitamina_b12',
    folate:            'acido_folico',
    acido_folico:      'acido_folico',
    folato:            'acido_folico',

    // Reticulócitos
    reticulocitos:     'reticulocitos',
    retic:             'reticulocitos',

    // MMA e Homocisteína
    acido_metilmalonico:'acido_metilmalonico',
    mma:               'acido_metilmalonico',
    metilmalonico:     'acido_metilmalonico',
    homocisteina:      'homocisteina',
    homocysteine:      'homocisteina',

    // Hemólise
    dhl:               'dhl',
    ldh:               'dhl',
    haptoglobina:      'haptoglobina',
    hapto:             'haptoglobina',
    bili_total:        'bilirrubina_total',
    bilirrubina_total: 'bilirrubina_total',
    bili_direta:       'bilirrubina_direta',
    bilirrubina_direta:'bilirrubina_direta',
    bili_indireta:     'bilirrubina_indireta',
    bilirrubina_indireta:'bilirrubina_indireta',

    // Coagulação
    tap_inr:           'tap_inr',
    inr:               'tap_inr',
    tap:               'tap_sec',
    tap_sec:           'tap_sec',
    ptta:              'ptta',
    ttpa:              'ptta',
    ptta_ratio:        'ptta_ratio',
    fibrinogenio:      'fibrinogenio',
    fibrinogen:        'fibrinogenio',

    // Gerais
    acido_urico:       'acido_urico',
    fosforo:           'fosforo',
    calcio_ionico:     'calcio_ionico',

    // Qualitativos / Avançados
    coombs:            'coombs_direto',
    coombs_direto:     'coombs_direto',
    coombs_indireto:   'coombs_indireto',
    esquizocitos:      'esquizocitos',
    schistocytes:      'esquizocitos',
    proteinas_totais:  'proteinas_totais',
    albumina:          'albumina',
    alfa1_globulina:   'alfa1_globulina',
    alfa2_globulina:   'alfa2_globulina',
    beta_globulina:    'beta_globulina',
    gama_globulina:    'gama_globulina',
    componente_m:      'componente_m',
    celularidade:      'celularidade',
    megacariocitos:    'megacariocitos',
    megacariocytes:    'megacariocitos',
    relacao_g_e:       'relacao_g_e',
    blastos_medula:    'blastos_medula',
    imuno:             'imuno',
    imunofenotipagem:  'imuno',
    bcr_abl:           'bcr_abl',
    fish:              'bcr_abl',
    philadelphia:      'bcr_abl',

    // Urinálise / Nefro
    colesterol_total:  'colesterol_total',
    colesterol:        'colesterol_total',
    ldl:               'ldl',
    hdl:               'hdl',
    triglicerides:     'triglicerideos',
    triglicerideos:    'triglicerideos',
    c3:                'c3',
    c4:                'c4',
    ch50:              'ch50',
    aslo:              'aslo',
    proteina_24h:      'proteina_urina_24h',
    urina_24h_proteina:'proteina_urina_24h',
};

/**
 * Busca referência laboratorial por chave, usando mapa de aliases determinístico.
 */
export const getLabReference = (key) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '');

    // 1. Lookup direto no alias map
    const canonicalKey = aliasMap[normalizedKey];
    if (canonicalKey && labReferences[canonicalKey]) {
        return labReferences[canonicalKey];
    }

    // 2. Lookup direto no dicionário (caso a chave do cenário já seja a canônica)
    if (labReferences[normalizedKey]) {
        return labReferences[normalizedKey];
    }

    // 3. Sem match -> dado qualitativo/descritivo (ex: mielograma)
    return null;
};
