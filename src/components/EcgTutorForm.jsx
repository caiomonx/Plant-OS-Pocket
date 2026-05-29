import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Check, Lightbulb } from 'lucide-react';

import { cn } from '../lib/utils';

export default function EcgTutorForm({ steps, currentStepIndex, highestUnlockedStep, stepAnswers, onAnswerConfirm, onNextStep, onPrevStep, onFinish, onRestart, onReturnToModules }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isGuidedModeActive, setIsGuidedModeActive] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const isVictory = currentStepIndex === steps.length;
  const step = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isUnlocked = currentStepIndex < highestUnlockedStep;

  // Restore state when step changes
  useEffect(() => {
    if (isVictory) return;
    
    const previousAnswer = stepAnswers[currentStepIndex];
    setSelectedOption(previousAnswer || null);
    setIsHintOpen(false); // Reset modal on step change
    setIsGuidedModeActive(false);
    setCheckedItems([]);
    
    if (previousAnswer) {
      if (previousAnswer === step?.correctAnswer) {
        setFeedback({ type: 'success', message: step?.explanation });
      } else {
        setFeedback({ type: 'error', message: step?.explanation });
      }
    } else {
      setFeedback(null);
    }
  }, [currentStepIndex, stepAnswers, step, isVictory]);

  if (isVictory) {
    return (
      <div className="flex flex-col relative lg:absolute lg:inset-0 bg-[#11131F] lg:border-l border-slate-800 p-6 sm:p-8 lg:min-h-0">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
              Caso Concluído
            </span>
            <span className="text-xs font-bold text-teal-500 bg-teal-500/10 px-2 py-1 rounded-full uppercase tracking-wider">
              Modo Tutor
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full" />
          </div>
        </div>

        <div className="flex-1 lg:overflow-y-auto pr-2 no-scrollbar lg:min-h-0 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 ring-8 ring-emerald-500/10">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Análise Finalizada!</h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xs mb-8">
            Você concluiu a leitura sistemática deste traçado com maestria.
          </p>

          <div className="w-full space-y-3 mt-auto">
            <button 
              onClick={onRestart}
              className="w-full p-4 rounded-xl border-2 border-slate-700 bg-slate-800/50 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
            >
              Reiniciar Este Caso
            </button>
            <button 
              onClick={onReturnToModules}
              className="w-full p-4 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors"
            >
              Voltar aos Módulos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!step) return null;

  const handleConfirm = () => {
    if (!selectedOption) return;

    onAnswerConfirm(selectedOption);

    if (selectedOption === step.correctAnswer) {
      setFeedback({
        type: 'success',
        message: step.explanation
      });
    } else {
      setFeedback({
        type: 'error',
        message: step.explanation
      });
    }
  };

  const toggleCheckItem = (itemId) => {
    if (!checkedItems.includes(itemId)) {
      const newChecked = [...checkedItems, itemId];
      setCheckedItems(newChecked);
      
      // Se marcou todos, ganha a recompensa: acerta a questão automaticamente
      if (step.guidedChecklist && newChecked.length === step.guidedChecklist.length) {
        setSelectedOption(step.correctAnswer);
        setFeedback({
          type: 'success',
          message: "Checklist concluído! " + (step.explanation || "")
        });
        onAnswerConfirm(step.correctAnswer);
      }
    }
  };

  return (
    <div className="flex flex-col relative lg:absolute lg:inset-0 bg-[#11131F] lg:border-l border-slate-800 p-6 sm:p-8 lg:min-h-0 h-full">
      {/* Header / Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Passo {currentStepIndex + 1} de {steps.length}
          </span>
          <span className="text-xs font-bold text-teal-500 bg-teal-500/10 px-2 py-1 rounded-full uppercase tracking-wider">
            Modo Tutor
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-500" 
            style={{ width: `${((currentStepIndex) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 flex-1 lg:overflow-y-auto pr-2 no-scrollbar lg:min-h-0">
        <h2 className="text-2xl font-bold text-white mb-6">
          {step.title}
        </h2>
        <p className="text-slate-300 text-base mb-8 leading-relaxed">
          {step.question}
        </p>

        {/* Hint Trigger */}
        {step.hint && (
          <button 
            onClick={() => setIsHintOpen(true)}
            className="mb-8 flex items-center gap-3 w-full p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-colors text-left"
          >
            <div className="shrink-0 p-2 bg-amber-500/20 rounded-full">
              <Lightbulb size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Dica Lúdica Disponível</p>
              <p className="text-xs opacity-80">Mnemônicos e padrões associados a este passo</p>
            </div>
          </button>
        )}

        {/* Modo Clássico de Múltipla Escolha */}
        {!isGuidedModeActive && (
          <div className="space-y-3">
            {step.options.map((opt) => {
              const isSelected = selectedOption === opt.value;
              const isSubmitted = feedback !== null;
              const isCorrect = opt.value === step.correctAnswer;
              
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
              
              if (!isSubmitted) {
                btnClass += isSelected 
                  ? "bg-indigo-600/20 border-indigo-500 text-white" 
                  : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800";
              } else {
                if (isCorrect) {
                  btnClass += "bg-emerald-500/20 border-emerald-500 text-white";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-rose-500/20 border-rose-500 text-white";
                } else {
                  btnClass += "bg-slate-800/20 border-slate-800/50 text-slate-500 opacity-50 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={opt.value}
                  onClick={() => !isSubmitted && setSelectedOption(opt.value)}
                  disabled={isSubmitted}
                  className={btnClass}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      isSelected && !isSubmitted ? "border-indigo-400" : "",
                      !isSelected && !isSubmitted ? "border-slate-500" : "",
                      isSubmitted && isCorrect ? "border-emerald-400 bg-emerald-400 text-[#0B0E14]" : "",
                      isSubmitted && isSelected && !isCorrect ? "border-rose-400 bg-rose-400 text-[#0B0E14]" : "",
                      isSubmitted && !isSelected && !isCorrect ? "border-slate-700" : ""
                    )}>
                      {isSubmitted && isCorrect && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="font-medium text-sm md:text-base leading-snug">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Botão para ativar Modo Guiado (só aparece se houver checklist e ainda não respondeu) */}
        {!isGuidedModeActive && !feedback && step.guidedChecklist && (
          <button
            onClick={() => setIsGuidedModeActive(true)}
            className="mt-6 w-full p-4 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-bold hover:bg-indigo-500/20 transition-colors"
          >
            Não tem certeza? Deduzir passo a passo
          </button>
        )}

        {/* UI do Checklist Guiado */}
        {isGuidedModeActive && step.guidedChecklist && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <h3 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} />
              Checklist de Dedução
            </h3>
            
            {step.guidedChecklist.map((checkItem, index) => {
              const isChecked = checkedItems.includes(checkItem.id);
              // Só mostra se for o primeiro item, ou se o anterior já foi marcado
              const isVisible = index === 0 || checkedItems.includes(step.guidedChecklist[index - 1].id);

              if (!isVisible) return null;

              return (
                <div key={checkItem.id} className="animate-in fade-in zoom-in-95 duration-300">
                  <button
                    onClick={() => toggleCheckItem(checkItem.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-3",
                      isChecked 
                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-100" 
                        : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-md border-2 flex flex-shrink-0 items-center justify-center mt-0.5 transition-colors",
                      isChecked ? "border-emerald-500 bg-emerald-500 text-[#0B0E14]" : "border-slate-500"
                    )}>
                      {isChecked && <Check size={16} strokeWidth={3} />}
                    </div>
                    <span className="font-medium">{checkItem.label}</span>
                  </button>
                  
                  {isChecked && (
                    <div className="mt-3 ml-9 p-4 rounded-lg bg-[#0B0E14] border border-slate-800 text-slate-300 text-sm animate-in slide-in-from-top-2 fade-in duration-300">
                      {checkItem.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div className={cn(
            "mt-8 p-5 rounded-2xl border flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300",
            feedback.type === 'success' 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-200"
          )}>
            <div className="shrink-0 mt-0.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="text-emerald-400" size={20} />
              ) : (
                <XCircle className="text-rose-400" size={20} />
              )}
            </div>
            <div>
              <h4 className={cn(
                "font-bold mb-1",
                feedback.type === 'success' ? "text-emerald-400" : "text-rose-400"
              )}>
                {feedback.type === 'success' ? 'Correto!' : 'Incorreto'}
              </h4>
              <p className="text-sm leading-relaxed opacity-90">
                {feedback.message}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-slate-800 flex gap-3">
        {currentStepIndex > 0 && (
          <button
            onClick={onPrevStep}
            className="px-4 py-4 rounded-2xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center shrink-0"
            title="Voltar Passo"
          >
             <ChevronLeft size={20} />
          </button>
        )}
        
        <div className="flex-1 flex flex-col gap-2">
          {selectedOption !== stepAnswers[currentStepIndex] || !feedback ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedOption}
              className="w-full py-4 rounded-2xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stepAnswers[currentStepIndex] ? 'Confirmar Nova Resposta' : 'Confirmar Resposta'}
            </button>
          ) : (
            <button
              onClick={isLastStep ? onFinish : onNextStep}
              className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
            >
              {isLastStep ? (
                <>
                  Finalizar Leitura <Check size={20} />
                </>
              ) : (
                <>
                  Avançar para o Próximo Passo <ChevronRight size={20} />
                </>
              )}
            </button>
          )}

          {/* Secondary advance button if they changed answer to a wrong one, but step is already unlocked */}
          {isUnlocked && feedback?.type === 'error' && selectedOption === stepAnswers[currentStepIndex] && (
            <button
              onClick={isLastStep ? onFinish : onNextStep}
              className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Avançar com erro (Etapa já desbloqueada)
            </button>
          )}
        </div>
      </div>

      {/* Hint Modal Overlay */}
      {isHintOpen && step.hint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-sm"
            onClick={() => setIsHintOpen(false)}
          />
          <div className="relative bg-[#11131F] border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 shrink-0">
                <Lightbulb size={28} />
              </div>
              <h3 className="text-xl font-bold text-amber-300 leading-tight">
                {step.hint.title}
              </h3>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {step.hint.image && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800">
                  <img src={step.hint.image} alt={step.hint.title} className="w-full h-auto object-contain bg-black/50" />
                </div>
              )}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                {step.hint.text}
              </p>
            </div>
            
            <div className="p-4 border-t border-slate-800">
              <button 
                onClick={() => setIsHintOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
              >
                Entendi, voltar para o caso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
