/**
 * Lógica Médica para o Módulo de Gasometria
 * Funções puras para cálculos de distúrbios ácido-base.
 */

/**
 * Fórmula de Winter: Prediz a compensação respiratória na acidose metabólica.
 * Esperado pCO2 = (1.5 * HCO3) + 8 (+/- 2)
 */
export const calculateWinter = (hco3) => {
  const expectedPCO2 = (1.5 * hco3) + 8;
  return {
    min: expectedPCO2 - 2,
    max: expectedPCO2 + 2,
    value: expectedPCO2
  };
};

/**
 * Anion Gap (AG): Diferença entre cátions e ânions mensuráveis.
 * AG = Na - (Cl + HCO3)
 * Valor de referência normal: ~12
 */
export const calculateAnionGap = (na, cl, hco3) => {
  return na - (cl + hco3);
};

/**
 * Delta-Delta: Avalia distúrbios mistos em acidoses metabólicas com AG aumentado.
 * Delta AG / Delta HCO3 = (AG_paciente - 12) / (24 - HCO3_paciente)
 * 
 * Interpretação:
 * < 1: Acidose metabólica com AG normal associada (Hiperclorêmica).
 * 1 a 2: Acidose metabólica com AG aumentado pura.
 * > 2: Alcalose metabólica associada.
 */
export const calculateDeltaDelta = (ag, hco3) => {
  const deltaAG = ag - 12;
  const deltaHCO3 = 24 - hco3;
  if (deltaHCO3 === 0) return 0; // Evitar divisão por zero
  return deltaAG / deltaHCO3;
};

/**
 * Predição de pCO2 na Alcalose Metabólica
 * pCO2 esperado = (0.7 * HCO3) + 21 (+/- 2)
 */
export const calculateMetabolicAlkalosisComp = (hco3) => {
    const expectedPCO2 = (0.7 * hco3) + 21;
    return {
      min: expectedPCO2 - 2,
      max: expectedPCO2 + 2,
      value: expectedPCO2
    };
};
