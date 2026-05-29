/**
 * Pediatric Math Utility
 * Encapsulates global formulas from the Brazilian Ministry of Health / WHO
 * for dehydration treatment (Plans A, B, C) and general pediatric calculations.
 */

/**
 * Retorna os volumes alvos ideais de hidratação domiciliar pós-evacuação (Plano A)
 * Baseado na idade em meses.
 * @param {number} ageMonths Idade do paciente em meses
 * @returns {{target_min: number, target_max: number}} Alvos em ml
 */
export const getPlanAVolumes = (ageMonths) => {
    if (ageMonths < 12) {
        return { target_min: 50, target_max: 100 };
    } else if (ageMonths <= 120) { // 1 a 10 anos
        return { target_min: 100, target_max: 200 };
    } else { // > 10 anos
        // MS: O que o paciente aceitar, colocamos limites simbólicos para validação
        return { target_min: 200, target_max: Infinity };
    }
};

/**
 * Retorna a dosagem de Zinco preconizada
 * @param {number} ageMonths Idade em meses
 * @returns {number} Dose em mg (10 ou 20)
 */
export const getZincDose = (ageMonths) => {
    return ageMonths < 6 ? 10 : 20;
};

/**
 * Retorna os volumes alvos de terapia de reidratação oral (TRO) do Plano B
 * para infusão em 4 a 6 horas.
 * @param {number} weightKg Peso em quilogramas
 * @returns {{target_min: number, target_max: number}}
 */
export const getPlanBRehydration = (weightKg) => {
    return {
        target_min: weightKg * 50,
        target_max: weightKg * 100
    };
};

/**
 * Calcula o volume de manutenção basal de 24h usando a Regra de Holliday-Segar
 * @param {number} weightKg Peso em quilogramas
 * @returns {number} Volume Total em ml para 24h
 */
export const getHollidaySegar = (weightKg) => {
    if (weightKg <= 10) {
        return weightKg * 100;
    } else if (weightKg <= 20) {
        return 1000 + ((weightKg - 10) * 50);
    } else {
        return 1500 + ((weightKg - 20) * 20);
    }
};

/**
 * Retorna os volumes de expansão rápida inicial para o Plano C (Fase de Ataque)
 * @param {number} weightKg Peso em quilogramas
 * @returns {{target_min: number, target_max: number}}
 */
export const getPlanCAttack = (weightKg) => {
    return {
        target_min: weightKg * 20, // MS Regra de Ouro: Pelo menos 20ml/kg
        target_max: weightKg * 35  // Aceitação razoável para evitar punição restrita
    };
};
