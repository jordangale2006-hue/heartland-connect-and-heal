export interface Condition {
  slug: string;
  name: string;
  shortName?: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    intro: string;
  };
  symptoms: string[];
  treatmentApproach: string[];
  treatedBy: ("rebecca" | "gwen")[];
  faqs: { q: string; a: string }[];
}

export const CONDITIONS: Condition[] = [
  {
    slug: "adhd",
    name: "ADHD (Attention-Deficit/Hyperactivity Disorder)",
    shortName: "ADHD",
    metaTitle: "ADHD Treatment in Arizona | Online Psychiatrist",
    metaDescription:
      "Virtual ADHD evaluation, diagnosis, and medication management for adolescents and adults across Arizona. Most major insurance accepted.",
    hero: {
      eyebrow: "Adult & Adolescent ADHD",
      headline: "ADHD treatment in Arizona — from a board-certified psychiatric provider",
      intro:
        "If focus, organization, restlessness, or follow-through have always felt harder for you than for others, you may be living with undiagnosed or undertreated ADHD. We provide thorough virtual evaluations and ongoing medication management designed around your real life.",
    },
    symptoms: [
      "Difficulty focusing on tasks, even ones you care about",
      "Procrastination and trouble starting tasks",
      "Forgetfulness, missed deadlines, lost items",
      "Restlessness, fidgeting, or feeling 'wired'",
      "Impulsive decisions, interrupting, or talking over others",
      "Emotional sensitivity and rejection sensitivity",
    ],
    treatmentApproach: [
      "Comprehensive virtual evaluation with rating scales (ASRS, others as appropriate)",
      "Discussion of medication options — both stimulant and non-stimulant",
      "Ongoing medication management visits to fine-tune your dose",
      "Practical coaching strategies for focus, sleep, and routines",
      "Coordination with therapists or PCPs when helpful",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Can you prescribe ADHD medication via telehealth in Arizona?",
        a: "Yes. We follow current DEA telehealth flexibilities and Arizona regulations. Controlled medications are prescribed only when clinically appropriate after a thorough evaluation.",
      },
      {
        q: "Do I need prior records to be evaluated?",
        a: "No, but they help. If you have past testing, school records, or prior prescriber notes, share them. Otherwise we'll do a full evaluation from scratch.",
      },
      {
        q: "How long until I'm seen?",
        a: "Most new patients are typically booked within the same week.",
      },
    ],
  },
  {
    slug: "anxiety",
    name: "Anxiety Disorders",
    metaTitle: "Anxiety Treatment in Arizona | Telehealth Psychiatry",
    metaDescription:
      "Get help for generalized anxiety, social anxiety, and panic in Arizona. Virtual psychiatric evaluation and medication management. Most insurance accepted.",
    hero: {
      eyebrow: "Anxiety Care",
      headline: "Anxiety treatment that meets you where you are",
      intro:
        "Constant worry, racing thoughts, physical tension, or a knot in your stomach you can't shake — anxiety can take over a life. We help you understand what's driving it and build a treatment plan that actually works.",
    },
    symptoms: [
      "Persistent worry that's hard to control",
      "Racing thoughts, especially at night",
      "Physical symptoms: tight chest, rapid heart, GI upset",
      "Avoidance of places, people, or situations",
      "Trouble sleeping or relaxing",
      "Irritability and feeling 'on edge'",
    ],
    treatmentApproach: [
      "Thorough evaluation to identify the type of anxiety (GAD, social, panic, health anxiety)",
      "Evidence-based medications such as SSRIs/SNRIs when indicated",
      "Discussion of non-medication tools: CBT principles, breathwork, sleep hygiene",
      "Referral to therapy partners when helpful",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Will I have to take medication forever?",
        a: "Not necessarily. Many patients use medication for a defined period while building skills and lifestyle changes, then taper off with provider guidance.",
      },
      {
        q: "Can you treat panic attacks?",
        a: "Yes. Panic disorder responds well to a combination of medication and therapy. We tailor the plan to your situation.",
      },
    ],
  },
  {
    slug: "depression",
    name: "Depression",
    metaTitle: "Depression Treatment in Arizona | Online Psychiatrist",
    metaDescription:
      "Compassionate virtual depression treatment in Arizona — psychiatric evaluation and medication management from board-certified PMHNPs.",
    hero: {
      eyebrow: "Depression Care",
      headline: "Depression treatment, without leaving home",
      intro:
        "Depression is more than sadness — it can drain your motivation, sleep, appetite, and sense of self. We provide thorough virtual evaluation and ongoing medication management to help you feel like you again.",
    },
    symptoms: [
      "Persistent low mood or emptiness",
      "Loss of interest in things you used to enjoy",
      "Fatigue, low energy, or feeling 'heavy'",
      "Changes in sleep or appetite",
      "Difficulty concentrating",
      "Feelings of guilt, worthlessness, or hopelessness",
    ],
    treatmentApproach: [
      "Full psychiatric evaluation including medical history and screenings",
      "Antidepressant trial when appropriate (SSRIs, SNRIs, atypicals)",
      "Close follow-up during the first 6–8 weeks",
      "Coordination with therapy for combined treatment",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "How long until antidepressants work?",
        a: "Most patients notice some improvement in 2–4 weeks, with full response by 6–8 weeks. We follow up closely during this period.",
      },
      {
        q: "What if the first medication doesn't work?",
        a: "It's common to adjust medication or try a different one. We work with you until we find what fits.",
      },
    ],
  },
  {
    slug: "bipolar-disorder",
    name: "Bipolar Disorder",
    metaTitle: "Bipolar Disorder Treatment in Arizona | Telepsychiatry",
    metaDescription:
      "Virtual bipolar disorder evaluation and medication management across Arizona. Stable, ongoing care from board-certified PMHNPs.",
    hero: {
      eyebrow: "Mood Stabilization",
      headline: "Stable, long-term care for bipolar disorder",
      intro:
        "Bipolar disorder is highly treatable with the right medication strategy and consistent follow-up. We provide thoughtful evaluation, mood stabilization, and ongoing care.",
    },
    symptoms: [
      "Periods of unusually high energy, racing thoughts, or reduced need for sleep",
      "Episodes of deep depression or low motivation",
      "Impulsive decisions during 'up' periods (spending, risk-taking)",
      "Mood shifts that affect work or relationships",
      "Family history of mood disorders",
    ],
    treatmentApproach: [
      "Detailed mood history and differential diagnosis (bipolar I, II, cyclothymia)",
      "Evidence-based mood stabilizers and other targeted medications",
      "Regular follow-up and lab monitoring when needed",
      "Crisis planning and family education",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Can bipolar disorder be managed by telehealth?",
        a: "Yes — for stable patients, virtual care is highly effective. We coordinate in-person services when necessary.",
      },
    ],
  },
  {
    slug: "ptsd",
    name: "PTSD (Post-Traumatic Stress Disorder)",
    metaTitle: "PTSD Treatment in Arizona | Trauma-Informed Telepsychiatry",
    metaDescription:
      "Trauma-informed PTSD treatment for Arizona patients. Virtual psychiatric evaluation, medication management, and therapy coordination.",
    hero: {
      eyebrow: "Trauma-Informed Care",
      headline: "PTSD treatment in a safe, virtual space",
      intro:
        "Trauma can shape how the body and mind respond to the present. Our trauma-informed approach focuses on safety, stabilization, and steady progress at your pace.",
    },
    symptoms: [
      "Intrusive memories, nightmares, or flashbacks",
      "Avoidance of reminders of the trauma",
      "Hypervigilance, startle response, or feeling unsafe",
      "Numbness, detachment, or feeling 'frozen'",
      "Sleep disturbance",
      "Irritability or anger",
    ],
    treatmentApproach: [
      "Thorough, paced evaluation that respects your comfort",
      "Medications shown to help PTSD symptoms (SSRIs, prazosin for nightmares, etc.)",
      "Coordination with trauma-focused therapists (EMDR, CPT, PE)",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Do I have to talk about the trauma in detail?",
        a: "No. We move at your pace. The first visits focus on safety, history, and what you want from treatment — not on retelling the trauma.",
      },
    ],
  },
  {
    slug: "ocd",
    name: "OCD (Obsessive-Compulsive Disorder)",
    metaTitle: "OCD Treatment in Arizona | Online Psychiatrist",
    metaDescription:
      "Virtual OCD evaluation and medication management in Arizona. Evidence-based care from board-certified psychiatric providers.",
    hero: {
      eyebrow: "OCD Care",
      headline: "OCD treatment from Arizona-licensed psychiatric providers",
      intro:
        "Intrusive thoughts and compulsive behaviors can take hours from your day. We provide evidence-based medication treatment and refer to ERP-trained therapists for combined care.",
    },
    symptoms: [
      "Unwanted, intrusive thoughts that cause anxiety",
      "Repetitive behaviors or mental rituals to reduce that anxiety",
      "Time-consuming routines (checking, washing, counting, ordering)",
      "Awareness that the thoughts are excessive — but unable to stop",
    ],
    treatmentApproach: [
      "Psychiatric evaluation to confirm diagnosis and rule out other conditions",
      "SSRIs at OCD-appropriate doses",
      "Referral to ERP (Exposure and Response Prevention) therapy when indicated",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Is OCD just being 'neat'?",
        a: "No. OCD is a clinical condition that causes significant distress and consumes substantial time. It deserves real treatment.",
      },
    ],
  },
  {
    slug: "insomnia",
    name: "Insomnia & Sleep Issues",
    metaTitle: "Insomnia Treatment in Arizona | Telepsychiatry",
    metaDescription:
      "Virtual evaluation and treatment for insomnia and sleep problems in Arizona. Identify underlying causes and build a healthy sleep plan.",
    hero: {
      eyebrow: "Sleep & Mental Health",
      headline: "When sleep won't come — get to the root of it",
      intro:
        "Insomnia is rarely just about sleep. Anxiety, depression, ADHD, trauma, and medical issues all contribute. We evaluate the full picture and build a treatment plan that addresses the cause.",
    },
    symptoms: [
      "Difficulty falling asleep",
      "Waking in the middle of the night, unable to fall back asleep",
      "Waking too early",
      "Daytime fatigue, brain fog, or irritability",
      "Reliance on substances to sleep",
    ],
    treatmentApproach: [
      "Sleep history, mental health screening, and review of medications/substances",
      "CBT-I principles and sleep hygiene coaching",
      "Targeted medication when indicated — used thoughtfully and short-term where possible",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Will you just give me a sleeping pill?",
        a: "No. We treat the underlying cause first. Medication can be part of the plan, but it's used carefully.",
      },
    ],
  },
  {
    slug: "substance-use",
    name: "Substance Use Disorders",
    metaTitle: "Substance Use Treatment in Arizona | Telepsychiatry",
    metaDescription:
      "Compassionate, non-judgmental virtual treatment for substance use and co-occurring mental health conditions in Arizona.",
    hero: {
      eyebrow: "Recovery Support",
      headline: "Substance use treatment without judgment",
      intro:
        "Recovery is rarely linear. We provide compassionate psychiatric care for substance use disorders and the mental health conditions that often go with them.",
    },
    symptoms: [
      "Using more than intended or unable to cut back",
      "Cravings or preoccupation with the substance",
      "Use that interferes with work, family, or health",
      "Withdrawal when stopping",
      "Co-occurring depression, anxiety, or trauma",
    ],
    treatmentApproach: [
      "Comprehensive psychiatric and substance use evaluation",
      "Treatment of co-occurring mental health conditions",
      "Coordination with MAT providers and recovery support when needed",
      "Harm-reduction conversations rooted in respect",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Do I have to be sober to start?",
        a: "No. We meet you where you are. Many people start treatment while still using and reduce over time.",
      },
    ],
  },
  {
    slug: "postpartum-depression",
    name: "Postpartum Depression & Anxiety",
    metaTitle: "Postpartum Depression Treatment in Arizona | Telepsychiatry",
    metaDescription:
      "Virtual postpartum depression and anxiety care in Arizona. Compassionate evaluation and medication management for new parents.",
    hero: {
      eyebrow: "Perinatal Mental Health",
      headline: "Postpartum care from your living room",
      intro:
        "The 'baby blues' should pass within a couple of weeks. If sadness, anxiety, or intrusive thoughts continue, it's not your fault — and it's treatable. We provide gentle, virtual psychiatric care for new parents.",
    },
    symptoms: [
      "Persistent sadness, tearfulness, or emptiness after birth",
      "Severe anxiety or panic attacks",
      "Intrusive thoughts about the baby or yourself",
      "Trouble bonding",
      "Sleep problems even when the baby is sleeping",
    ],
    treatmentApproach: [
      "Perinatal psychiatric evaluation",
      "Medication options compatible with breastfeeding when applicable",
      "Coordination with OB/GYN and pediatrician",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Can I take antidepressants while breastfeeding?",
        a: "Many are considered compatible with breastfeeding. We discuss the risks and benefits with you so you can make an informed choice.",
      },
    ],
  },
  {
    slug: "panic-disorder",
    name: "Panic Disorder",
    metaTitle: "Panic Disorder Treatment in Arizona | Online Psychiatrist",
    metaDescription:
      "Virtual treatment for panic attacks and panic disorder in Arizona. Evidence-based medication and skills training.",
    hero: {
      eyebrow: "Panic Care",
      headline: "Stop the panic cycle",
      intro:
        "Panic attacks are terrifying — and often lead to avoidance that shrinks your life. We treat panic disorder with proven medications and refer to skills-based therapy.",
    },
    symptoms: [
      "Sudden, intense waves of fear",
      "Racing heart, shortness of breath, dizziness",
      "Fear of dying or losing control",
      "Avoiding places where attacks have happened",
    ],
    treatmentApproach: [
      "Diagnostic evaluation to rule out medical causes",
      "SSRIs and short-term targeted medications",
      "Coordination with CBT-trained therapists",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Are panic attacks dangerous?",
        a: "They feel dangerous but they aren't physically harmful. Treatment helps reduce both the frequency and the fear of them.",
      },
    ],
  },
  {
    slug: "psychosis",
    name: "Schizophrenia & Psychotic Disorders",
    metaTitle: "Psychosis & Schizophrenia Care in Arizona | Telepsychiatry",
    metaDescription:
      "Stable, virtual psychiatric care for schizophrenia and psychotic disorders in Arizona. Medication management and family support.",
    hero: {
      eyebrow: "Psychotic Disorder Care",
      headline: "Stable, ongoing care for schizophrenia and related conditions",
      intro:
        "Psychotic disorders need consistent, expert care. We provide ongoing medication management and family-inclusive support — virtually, with coordination to in-person services when needed.",
    },
    symptoms: [
      "Hallucinations (hearing or seeing things others don't)",
      "Delusions or paranoid thoughts",
      "Disorganized thinking or speech",
      "Social withdrawal and reduced motivation",
      "Difficulty with daily functioning",
    ],
    treatmentApproach: [
      "Comprehensive psychiatric evaluation",
      "Antipsychotic medication selection and monitoring",
      "Family education and support",
      "Coordination with case management and therapy",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Do you provide care for first-episode psychosis?",
        a: "We evaluate and stabilize when appropriate, and coordinate with specialty programs when a higher level of care is indicated.",
      },
    ],
  },
  {
    slug: "adolescent-mental-health",
    name: "Adolescent Mental Health",
    metaTitle: "Teen Psychiatrist in Arizona | Online Adolescent Care",
    metaDescription:
      "Virtual psychiatric evaluation and medication management for adolescents in Arizona. ADHD, anxiety, depression, and more.",
    hero: {
      eyebrow: "Adolescent Care",
      headline: "Mental health care that meets teens where they are",
      intro:
        "Adolescence is hard, and teens often feel more comfortable opening up from their own room than in an office. We provide virtual psychiatric care to adolescents across Arizona.",
    },
    symptoms: [
      "Anxiety, panic, or social withdrawal",
      "Depression, hopelessness, or self-harm thoughts",
      "ADHD-type symptoms affecting school",
      "Mood swings beyond typical teen ups and downs",
      "Substance use or risky behavior",
    ],
    treatmentApproach: [
      "Evaluation that involves the teen and the parent appropriately",
      "Age-appropriate medication discussions",
      "Coordination with school counselors and therapists",
      "Confidential, respectful space for the teen",
    ],
    treatedBy: ["rebecca", "gwen"],
    faqs: [
      {
        q: "Do parents have to be in the visit?",
        a: "Parents are involved in evaluation and treatment planning. We also build private space for the teen so they feel safe sharing.",
      },
    ],
  },
];

export const getCondition = (slug: string) =>
  CONDITIONS.find((c) => c.slug === slug);
