 # 🎬 English YouTube Script

## AI for Alert Optimization  
---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **AI for alert optimization**.

Alert systems are supposed to help engineers find real production issues.

But in many systems, alerts create too much noise.

We may have too many false positives, duplicate alerts, short-lived spikes, poor thresholds, alerts without action, or downstream symptom alerts.

So the goal of AI alert optimization is not just to explain alerts.

The goal is to improve alert quality, reduce noise, identify real incidents, and help on-call engineers focus on actionable signals.

**(PPT: Title Slide — AI for Alert Optimization)**

---

## 🎯 1. Core Framework

When I think about AI for alert optimization, I usually break it down into five parts.

First, **alert data collection**.
Second, **historical incident correlation**.
Third, **alert classification and noise detection**.
Fourth, **threshold tuning recommendation**.
And finally, **human review, feedback loop, and safety guardrails**.

The main trade-off is:

**automation vs safety vs trust**.

More automation can reduce manual work, but it also increases the risk of suppressing a real incident.

**(PPT: Core Framework — 5 Parts)**

---

## 🏗️ 2. High-Level Architecture

At a high level, I would design this as an **alert intelligence pipeline**.

The system collects data from multiple sources:

```text id="gq4kpa"
Historical alerts
Metrics
Logs
Traces
Deploy history
PagerDuty incidents
Engineer feedback
```

Then it normalizes and sanitizes the data, builds alert context, retrieves similar historical incidents, and uses an LLM classifier or AI agent to generate a structured recommendation.

A simplified architecture looks like this:

```text id="ly7qfp"
Alerts + Metrics + Logs + Incidents
→ Normalization
→ Alert Context Builder
→ RAG / Similarity Search
→ LLM Classifier
→ Recommendation
→ Human Review
→ Feedback Loop
```

**(PPT: High-Level Alert Intelligence Pipeline)**

The key idea is:

**AI should not analyze an alert in isolation. It should analyze the alert with historical outcomes and supporting evidence.**

---

## 📊 3. Core Inputs

The AI needs several types of input.

First is **alert metadata**.

For example:

```json id="shhx1q"
{
  "service": "checkout-service",
  "environment": "prod",
  "metric": "error_rate",
  "threshold": "> 5%",
  "duration": "5m",
  "severity": "critical"
}
```

**(PPT: Alert Metadata Example)**

Second is metrics, such as error rate, p95 latency, request count, CPU, memory, queue lag, and dependency latency.

Third is logs, such as timeout errors, 5xx errors, database connection errors, or dependency failures.

Fourth is deploy history, because we often need to ask:

**Did something change before this alert fired?**

And finally, incident history is critical.

We need to know:

```text id="od8x4f"
Was this alert linked to a real incident before?
Did it page someone?
Did engineers take action?
Was it marked noisy?
Did it auto-recover quickly?
```

Without outcome history, it is hard to know whether an alert is actually useful or just noisy.

The key idea is:

**Alert optimization depends on both signal data and outcome data.**

---

## 🚨 4. Alert Classification and Noise Detection

The first major AI task is alert classification.

Common classes include:

```text id="xthlgz"
real_incident
noisy_alert
duplicate_alert
threshold_tuning_needed
known_issue
downstream_symptom
insufficient_data
```

**(PPT: Alert Classification Types)**

For example, the AI may return:

```json id="xnllku"
{
  "classification": "threshold_tuning_needed",
  "confidence": 0.84,
  "reason": "Metric breached briefly but recovered within 2 minutes.",
  "recommendedAction": "Increase evaluation window from 1 minute to 5 minutes."
}
```

Noise detection is especially important.

A noisy alert is one that fires often but rarely leads to action.

Signals of noise include frequent firing, fast auto-recovery, no PagerDuty escalation, no user impact, no correlated error logs, and repeated acknowledgements without action.

For example:

```text id="u0fgsv"
Alert fired 30 times in 7 days.
0 incidents escalated.
Average recovery time was under 90 seconds.
No related customer impact.
```

The key idea is:

**A useful alert should usually lead to investigation or action. If it fires often but nobody acts, it may be noise.**

---

## 🎚️ 5. Threshold Tuning and Historical RAG

Once the system understands the alert pattern, it can recommend threshold tuning.

Common recommendations include:

```text id="kn5boz"
Increase evaluation window
Raise threshold
Add request volume guard
Use burn-rate alert
Use anomaly-based threshold
Change severity
Suppress during maintenance
```

**(PPT: Threshold Tuning Recommendations)**

For example, if an error-rate alert fires during very low traffic, the system may recommend adding a request-count guard.

```text id="twczeh"
Current rule:
error_rate > 5% for 1 minute

Recommended rule:
error_rate > 5% for 5 minutes
AND request_count > 1000
```

RAG is useful here because alert meaning depends heavily on history.

The system can retrieve similar past alerts, related incidents, runbooks, postmortems, and prior tuning decisions.

The flow looks like this:

```text id="c5h4xk"
New alert
→ Build alert summary
→ Search historical alert and incident index
→ Retrieve similar cases
→ Add evidence to LLM context
→ Generate recommendation
```

**(PPT: Historical Similarity / RAG)**

The key idea is:

**RAG helps the AI make recommendations based on historical patterns, not guesses.**

---

## 🛡️ 6. Evidence, Safety, and Human Review

The AI should not simply guess.

Every recommendation should include evidence from metrics, logs, traces, deploy history, or historical incidents.

A good output should include:

```text id="smc3m9"
classification
confidence
evidence
likely cause
recommended action
```

**(PPT: Structured Recommendation)**

Safety is critical.

The biggest risk is weakening or suppressing a real production alert.

So AI should not silently disable critical alerts, change paging rules, or suppress production incidents.

A safe operating model is:

```text id="a26zaz"
AI recommends
Human reviews
System executes after approval
```

AI can safely classify alerts, summarize evidence, recommend tuning, suggest severity changes, draft threshold updates, and link runbooks.

But actions like suppressing alerts, changing critical thresholds, disabling paging, rollback, restart, or paging another team should require human approval.

The key idea is:

**AI should assist alert optimization, not secretly change critical alerting behavior.**

---

## 🔁 7. Feedback Loop and Evaluation

Feedback is essential.

Engineers should be able to accept, reject, or edit AI recommendations.

That feedback should be stored and used to improve future recommendations.

Evaluation should measure both alert quality and AI quality.

Alert quality metrics include:

```text id="j1gtxh"
false positive rate
alert-to-incident correlation
alert actionability rate
duplicate alert rate
auto-recovery rate
MTTA and MTTR impact
```

AI quality metrics include:

```text id="xhedl5"
classification accuracy
recommendation acceptance rate
evidence correctness
false suppression risk
engineer satisfaction
latency and cost per analysis
```

**(PPT: Feedback Loop + Evaluation Metrics)**

For deployment, I would roll this out gradually.

Start with read-only analysis.
Then recommendation mode.
Then human-approved automation.
And only later, limited auto-tuning for low-risk alerts.

---

## ⭐ Closing Insight

To summarize.

AI for alert optimization is about improving alert quality and reducing on-call noise.

It uses historical alerts, metrics, logs, traces, deploy history, incidents, and engineer feedback to classify alerts and recommend improvements.

But the system must be evidence-driven and human-reviewed for risky changes.

The final insight is:

**AI for alert optimization is not about automatically turning off alerts.
It is about deciding whether an alert is actionable and giving verifiable tuning recommendations.**

Thank you.

**(PPT: Closing Insight — Actionable Alerts, Not Silent Suppression)**
