export { SOCIO_PRODUCTS, POLITICAL_PRODUCTS, MARKETING_PRODUCTS } from "./products";

export const PARADIGMS = [
  {
    id: "pillar-1",
    num: "01",
    title: "Monitoring and Diagnostics of the Public Field",
    short: "A continuous, real-time pulse of public sentiment",
    image: "/assets/monitoring.jpg",
    problem:
      "Traditional methods work like a “photograph” — a snapshot of a moment that is already outdated by the time of publication. Social processes are accelerating: a viral post shapes the agenda in 6 hours, faster than a week-long survey can capture.",
    product:
      "A continuous system for tracking the public field: classical sociology, AI monitoring of open sources, and adaptive online surveys. You don't extinguish the fire — you see the spark weeks before it ignites.",
    points: [
      "Parsing of 50+ sources and survey APIs",
      "LLM classification of tone and topics",
      "Detection of anomalies, bots, and coordinated campaigns",
      "24/7 dashboard and alert system",
    ],
    result:
      "First results in 2 weeks. A full system in 3–4 weeks. Reputational risks reduced by 60–80%.",
  },
  {
    id: "pillar-2",
    num: "02",
    title: "Forecasting Public Reactions",
    short: "Mathematical models instead of intuition",
    image: "/assets/prediction.jpg",
    problem:
      "Every public decision is a leap into the unknown. Focus groups don't account for cascade effects and viral spread.",
    product:
      "Scenario modeling answers the question “What will happen if we do X?” before implementation. LLMs, multi-agent simulation, and a statistical ensemble produce probability corridors.",
    points: [
      "Amplitude, channels, and duration of the reaction",
      "Demographics of support and protest",
      "Cascade effects and “black swans”",
      "Preventive communication recommendations",
    ],
    result:
      "First forecast in 3 weeks. One scenario in 2–6 hours. Backtesting accuracy of 75–85%.",
  },
  {
    id: "pillar-3",
    num: "03",
    title: "Silicon Sample",
    short: "AI agents mimic the behavior of real groups",
    image: "/assets/agents.jpg",
    problem:
      "A representative survey takes 6–8 weeks and costs millions. Testing an unpopular reform on real people means risking real backlash.",
    product:
      "A synthetic population of thousands of calibrated AI agents. A “referendum” in 2 hours instead of 2 months — without the risks of field research.",
    points: [
      "Calibration on censuses, surveys, and WVS/ESS",
      "Up to 10 scenarios per business day",
      "Honest answers on sensitive topics",
      "Validation on data from 30+ countries and regions",
    ],
    result:
      "Sample ready in 3–4 weeks. Correlation with real surveys of 0.80–0.92. Up to 80% savings on pilot budgets.",
  },
  {
    id: "pillar-4",
    num: "04",
    title: "Deep Research with AI",
    short: "Academic depth × machine speed",
    image: "/assets/deep-research.jpg",
    problem:
      "An analyst reads 50 documents a week; the corpus contains millions. Conclusions are drawn from the 2% that was read.",
    product:
      "The system analyzes millions of documents in hours and delivers hidden narratives, connections, testable hypotheses, and reports with links to sources.",
    points: [
      "Full coverage of the corpus, not sampling “by eye”",
      "Knowledge graph, narratives, and contradictions",
      "Human-in-the-loop: AI proposes, the expert validates",
      "Reproducible methodology",
    ],
    result:
      "A typical project takes 2–6 weeks. Processing a million documents takes hours, not months.",
  },
] as const;

export type NewsItem = {
  id: string;
  publishedAt: string;
  title: string;
  excerpt: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "monitoring-ai",
    publishedAt: "2026-08-15",
    title: "How AI Is Changing the Approach to Monitoring Public Sentiment",
    excerpt:
      "A brief overview of methods that let you see signals weeks before they surface in the mainstream.",
  },
  {
    id: "silicon-sample",
    publishedAt: "2026-08-02",
    title: "Silicon Sample: Testing Decisions Before Launch",
    excerpt:
      "Why model the behavior of social groups, and how it reduces the risk of management errors.",
  },
  {
    id: "ria",
    publishedAt: "2026-07-18",
    title: "AI Regulatory Impact Assessment: Preliminary Analysis of Norms",
    excerpt:
      "A new tool for the preliminary assessment of the impact of regulatory acts on society and business.",
  },
];

export function newsByDateDesc(items: NewsItem[] = NEWS): NewsItem[] {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}