 
# 🎬 English YouTube Script

## AI in Observability  

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **AI in observability**.

Observability helps engineers understand what is happening inside a system using metrics, logs, traces, alerts, deploy history, and incident history.

Traditional observability tools show us raw signals.

But during an incident, engineers still need to answer questions like:

```text
What changed?
Why did this alert fire?
Is this a real incident or noise?
What logs are relevant?
Has this happened before?
What should I check next?
```

This is where AI can help.

AI can summarize signals, correlate logs and metrics, retrieve similar incidents, and help engineers investigate faster.

**(PPT: Title Slide — AI in Observability)**

---

## 🎯 1. Core Framework

When I think about AI in observability, I usually break it down into five parts.

First, **observability data sources**.
Second, **alert triage and noise reduction**.
Third, **root cause analysis and incident summarization**.
Fourth, **RAG and AI agents with observability tools**.
And finally, **safety, evaluation, and human approval**.

The main trade-off is:

**automation vs trust vs safety**.

More automation can reduce response time, but it also increases risk.

**(PPT: Core Framework — 5 Parts)**

---

## 📊 2. Observability Data Sources

AI observability works best when it combines multiple signals.

Metrics show symptoms.

For example:

```text
error_rate
latency_p95
request_count
CPU usage
memory usage
queue lag
```

Logs show detailed errors, such as exceptions, timeouts, dependency failures, or business errors.

Traces show the request path across services, which helps identify slow dependencies or bottlenecks.

Deploy history answers one important question:

**Did something change before the alert?**

Incident history answers another important question:

**Has this happened before, and how was it fixed last time?**

**(PPT: Metrics + Logs + Traces + Deploys + Incidents)**

But raw observability data is messy.

New Relic alerts, Splunk logs, CloudWatch events, OpenTelemetry spans, PagerDuty incidents, and GitHub deploys may all have different formats.

So before sending data to an LLM, I would normalize these signals into a common schema.

The key idea is:

**Metrics show symptoms, logs show details, traces show paths, deploys show changes, and incidents show history.**

---

## 🚨 3. Alert Triage and Noise Reduction

One major use case is alert triage.

Many alerts are noisy.

Some are short spikes.
Some are duplicates.
Some are known non-actionable issues.
Some are downstream symptom alerts.
And some need threshold tuning.

AI can classify alerts into categories like:

```text
real incident
noisy alert
duplicate alert
known issue
threshold tuning needed
```

**(PPT: Alert Classification)**

For example, the AI might output:

```json
{
  "classification": "threshold_tuning_needed",
  "confidence": 0.82,
  "reason": "Metric recovered within 2 minutes",
  "recommendedAction": "Increase evaluation window"
}
```

The goal is not to blindly suppress alerts.

The goal is to reduce alert fatigue and help engineers focus on real incidents.

The key idea is:

**AI can reduce alert noise, but automated suppression must be used carefully.**

---

## 🔍 4. Root Cause Analysis and Incident Copilot

Another important use case is root cause analysis.

AI can combine alert details, metric anomalies, log errors, trace bottlenecks, recent deploys, dependency health, and similar historical incidents.

The output should be evidence-based.

For example:

```json
{
  "likelyCause": "Recent deployment increased DB latency",
  "evidence": [
    "p95 latency increased after deploy",
    "logs show DB timeout errors",
    "similar incident occurred last month"
  ],
  "nextSteps": [
    "Check DB dashboard",
    "Compare query plan",
    "Consider rollback"
  ]
}
```

**(PPT: Evidence-Based RCA)**

The model should not just guess a root cause.

It should cite evidence from metrics, logs, traces, deploys, and incident history.

This leads to the idea of an **incident copilot**.

An incident copilot can summarize what happened, build a timeline, suggest next checks, retrieve runbooks, find related past incidents, and even draft a postmortem.

But the human engineer still owns the decision.

The key idea is:

**AI should assist investigation, not replace engineering judgment.**

---

## 🧠 5. RAG and Observability Agents

RAG is very useful in observability because much of the knowledge is private and domain-specific.

The model needs access to runbooks, service documentation, alert descriptions, service ownership, recent deploy notes, and historical incidents.

A RAG flow looks like this:

```text
New alert
→ Search runbooks and historical incidents
→ Retrieve similar past cases
→ Add context to the LLM
→ Generate analysis
```

**(PPT: RAG for Observability)**

We can also build an observability agent.

The agent may call tools like:

```text
Metrics API
Log search
Trace query
Deployment history
Incident database
Runbook search
Service catalog
```

The agent loop may look like this:

```text
Alert received
→ Check metrics
→ Search logs
→ Check recent deploys
→ Retrieve similar incidents
→ Produce structured analysis
```

**(PPT: Observability Agent Loop)**

The key idea is:

**Tool results should become evidence for the final recommendation.**

---

## 🛡️ 6. Safety, Evaluation, and Human Approval

Safety is critical because observability systems affect production operations.

Common risks include incorrect root cause, hallucinated evidence, unsafe automated actions, suppressing real incidents, data leakage, and prompt injection from logs.

So the system needs guardrails.

For example:

```text
Require citations and evidence
Use structured outputs
Validate tool results
Redact sensitive data
Audit AI recommendations
Require human approval for risky actions
```

**(PPT: Safety and Guardrails)**

Risky actions include rollback, restarting services, scaling infrastructure, suppressing alerts, changing thresholds, or paging another team.

A safe rule is:

```text
AI recommends
Human approves
System executes
```

Evaluation is also important.

Offline, we can test against historical incidents and compare AI recommendations with known root causes and postmortems.

Online, we can measure MTTA, MTTR, alert noise reduction, false suppression rate, escalation accuracy, and engineer satisfaction.

The key idea is:

**AI observability should be evidence-driven and human-reviewed for risky actions.**

---

## ⭐ Closing Insight

To summarize.

AI in observability is about helping engineers understand incidents faster.

It can summarize metrics, logs, traces, deploys, and incident history.

It can classify alerts, reduce noise, suggest root causes, retrieve runbooks, and recommend next debugging steps.

But it should not blindly automate production actions.

The final insight is:

**AI in observability is not about letting AI automatically fix systems.
It is about turning fragmented signals into evidence and next steps.**

Thank you.

**(PPT: Closing Insight — Evidence Before Automation)**
