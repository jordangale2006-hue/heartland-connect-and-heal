import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, RotateCcw } from "lucide-react";
import { useAppointmentDialog } from "./AppointmentDialogProvider";

const QUESTIONS = [
  "In the last few weeks, have you felt persistently sad, anxious, or 'empty'?",
  "Are you having trouble with sleep — falling asleep, staying asleep, or sleeping too much?",
  "Do you find it hard to focus, stay organized, or follow through with tasks?",
  "Have you lost interest or pleasure in things you usually enjoy?",
  "Are mood, stress, or attention affecting your work, school, or relationships?",
];

const PsychiatryQuiz = () => {
  const [step, setStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [done, setDone] = useState(false);
  const { open } = useAppointmentDialog();

  const answer = (yes: boolean) => {
    const nextYes = yesCount + (yes ? 1 : 0);
    if (step + 1 >= QUESTIONS.length) {
      setYesCount(nextYes);
      setDone(true);
    } else {
      setYesCount(nextYes);
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setYesCount(0); setDone(false); };

  return (
    <section className="section-padding bg-primary/5">
      <div className="container-narrow mx-auto">
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Brain className="h-6 w-6 text-primary" />
            <p className="text-accent font-semibold text-sm uppercase tracking-wider">60-Second Self-Check</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground text-center mb-2">
            Could it help to talk to a psychiatrist?
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-6">
            A few gentle questions — your answers stay on this device. This is not a diagnosis.
          </p>

          {!done ? (
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((step) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary transition-all duration-300"
                     style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
              </div>
              <p className="font-heading text-lg sm:text-xl text-foreground text-center mb-6 min-h-[4rem]">
                {QUESTIONS[step]}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outlineWarm" size="lg" className="h-14" onClick={() => answer(false)}>No</Button>
                <Button variant="warmCta" size="lg" className="h-14" onClick={() => answer(true)}>Yes</Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-heading text-xl sm:text-2xl text-foreground mb-3">
                {yesCount >= 3
                  ? "It sounds like talking with a provider could really help."
                  : yesCount >= 1
                  ? "A short conversation with a provider could give you clarity."
                  : "Glad to hear you're doing well — we're here if anything changes."}
              </p>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                You answered "yes" to {yesCount} of {QUESTIONS.length} questions. Our Arizona-licensed
                providers can meet with you virtually — most insurance accepted.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="warmCta" size="lg" onClick={() => open("quiz")}>
                  Talk to a Provider <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="ghost" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" /> Start over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PsychiatryQuiz;
