import fs from 'fs';

// Read the cases.js file content
const casesContent = fs.readFileSync('src/data/challenges/cases.js', 'utf8');

// A mapping of correctDiagnosisId to their respective tags based on the Master List
const tagMap = {
    'scacsst': ['Cardiologia', 'Emergência / Intensiva'],
    'dka': ['Endocrinologia', 'Emergência / Intensiva'],
    'copd': ['Pneumologia', 'Emergência / Intensiva'],
    'age': ['Gastroenterologia', 'Infectologia'],
    'sepsis': ['Infectologia', 'Emergência / Intensiva'],
    'hyperemesis': ['Ginecologia & Obstetrícia', 'Emergência / Intensiva'],
    'multiple_myeloma': ['Hematologia', 'Nefrologia'],
    'diabetes_insipidus_nephrogenic': ['Endocrinologia', 'Psiquiatria', 'Nefrologia'],
    'pe': ['Pneumologia', 'Cardiologia', 'Emergência / Intensiva'],
    'myasthenia_gravis': ['Neurologia', 'Reumatologia'],
    'adrenal_crisis': ['Endocrinologia', 'Emergência / Intensiva'],
    'endocarditis': ['Cardiologia', 'Infectologia'],
    'pheochromocytoma': ['Endocrinologia', 'Cardiologia'],
    'boerhaave': ['Cirurgia Geral', 'Gastroenterologia', 'Emergência / Intensiva'],
    'parotidite_supurativa': ['Cirurgia Geral', 'Infectologia'],
    'wilms': ['Pediatria', 'Genética / Raras', 'Nefrologia'],
    'd_lactic_acidosis': ['Gastroenterologia', 'Genética / Raras'],
    'plummer_vinson': ['Gastroenterologia', 'Hematologia'],
    'sickle_cell': ['Pediatria', 'Hematologia', 'Genética / Raras'],
    'hirschsprung': ['Pediatria', 'Cirurgia Geral', 'Gastroenterologia'],
    'morris': ['Endocrinologia', 'Genética / Raras', 'Ginecologia & Obstetrícia'],
    'esophageal_atresia': ['Pediatria', 'Cirurgia Geral'],
    'myopericarditis': ['Cardiologia', 'Infectologia'],
    'guillain_barre': ['Neurologia', 'Infectologia'],
    'costochondritis': ['Reumatologia', 'Emergência / Intensiva'],
    'prinzmetal': ['Cardiologia'],
    'chagas': ['Infectologia', 'Cardiologia'],
    'miller_fisher': ['Neurologia'],
    'diphtheria': ['Pediatria', 'Infectologia'],
    'neurofibromatosis': ['Genética / Raras', 'Dermatologia', 'Neurologia'],
    'lemierre': ['Infectologia', 'Pneumologia', 'Emergência / Intensiva'],
    'glaucoma_angulo_fechado': ['Oftalmologia', 'Emergência / Intensiva'],
    'mastoidite_aguda': ['Pediatria', 'Otorrinolaringologia', 'Infectologia'],
    'lupus_libman_sacks': ['Reumatologia', 'Cardiologia'],
    'carcinoma_espinocelular': ['Dermatologia'],
    'sjogren': ['Reumatologia', 'Oftalmologia'],
    'acidente_escorpionico_grave': ['Pediatria', 'Toxicologia', 'Emergência / Intensiva'],
    'deficiencia_alfa1_antitripsina': ['Pneumologia', 'Genética / Raras', 'Gastroenterologia'],
    'eritema_nodoso': ['Dermatologia', 'Reumatologia'],
    'sindrome_stevens_johnson': ['Dermatologia', 'Emergência / Intensiva'],
    'sindrome_dressler': ['Cardiologia', 'Reumatologia'],
    'hellp_syndrome': ['Ginecologia & Obstetrícia', 'Emergência / Intensiva', 'Hematologia'],
    'bipolar_disorder': ['Psiquiatria', 'Emergência / Intensiva'],
    'sarcoidosis': ['Pneumologia', 'Reumatologia']
};

let updatedContent = casesContent;

// This regex matches: `correctDiagnosisId: 'something',`
// and we want to replace it with: `correctDiagnosisId: 'something',\n    tags: ['Tag 1', 'Tag 2'],`
for (const [diagnosisId, tags] of Object.entries(tagMap)) {
    const regex = new RegExp(`correctDiagnosisId:\\s*'${diagnosisId}',`);
    const tagsString = `correctDiagnosisId: '${diagnosisId}',\n    tags: ${JSON.stringify(tags)},`;
    updatedContent = updatedContent.replace(regex, tagsString);
}

fs.writeFileSync('src/data/challenges/cases.js', updatedContent, 'utf8');
console.log('Successfully added tags to cases.js');
