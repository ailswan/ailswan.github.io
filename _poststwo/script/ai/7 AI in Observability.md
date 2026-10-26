 
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

---

## 📌 重点记忆区

> **用五句话记住这份报告：**
>
> 1. **目标：AI 帮助工程师更快理解和排查故障。**
>    Goal: AI helps engineers understand and investigate incidents faster.
> 2. **数据：指标看症状，日志看细节，链路看路径，部署看变化，历史看经验。**
>    Data: Metrics show symptoms, logs show details, traces show paths, deploys show changes, and incident history provides lessons.
> 3. **能力：告警降噪、根因分析、检索经验、建议下一步。**
>    Capabilities: Reduce alert noise, analyze root causes, retrieve past lessons, and suggest next steps.
> 4. **原则：判断必须有证据，工具和 RAG 为分析提供依据。**
>    Principle: Conclusions must be supported by evidence; tools and RAG provide the basis for analysis.
> 5. **边界：AI 提建议，人工做审批，系统再执行。**
>    Boundary: AI recommends, humans approve, and the system executes.
>
> ⭐ **最核心的一句：把零散信号变成证据和行动，而不是让 AI 盲目自动修复系统。**
>
> **Key takeaway: Turn fragmented signals into evidence and action, rather than letting AI blindly fix systems automatically.**

---

# 🎬 中文 YouTube 脚本

## AI 在可观测性中的应用

---

## 🎯 开场

大家好。
今天我想和大家聊聊 **AI 在可观测性中的应用**。

可观测性通过指标、日志、链路追踪、告警、部署历史和故障历史，帮助工程师了解系统内部正在发生什么。

传统的可观测性工具向我们展示原始信号。

但在故障发生时，工程师仍然需要回答这样的问题：

```text
发生了什么变化？
为什么会触发这个告警？
这是真正的故障，还是噪声？
哪些日志与问题相关？
以前发生过类似情况吗？
接下来应该检查什么？
```

这正是 AI 可以提供帮助的地方。

AI 可以汇总信号、关联日志与指标、检索类似的历史故障，帮助工程师更快地排查问题。

**（PPT：标题页——AI 在可观测性中的应用）**

---

## 🎯 1. 核心框架

在思考 AI 在可观测性中的应用时，我通常会把它分为五个部分。

第一，**可观测性数据源**。
第二，**告警分诊与降噪**。
第三，**根因分析与故障摘要**。
第四，**结合可观测性工具的 RAG 和 AI 智能体**。
最后，**安全、评估与人工审批**。

其中最主要的权衡是：

**自动化、信任与安全之间的平衡**。

提高自动化程度可以缩短响应时间，但也会增加风险。

**（PPT：核心框架——五个部分）**

---

## 📊 2. 可观测性数据源

将多种信号结合起来时，AI 在可观测性场景中才能发挥最佳效果。

指标反映问题的症状。

例如：

```text
错误率（error_rate）
第 95 百分位延迟（latency_p95）
请求数（request_count）
CPU 使用率
内存使用率
队列积压延迟
```

日志展示具体的错误细节，例如异常、超时、依赖故障或业务错误。

链路追踪展示请求跨服务的调用路径，有助于识别响应缓慢的依赖或性能瓶颈。

部署历史可以回答一个重要问题：

**告警发生之前，系统是否出现了变化？**

故障历史则可以回答另一个重要问题：

**以前是否发生过类似情况？上一次是如何解决的？**

**（PPT：指标 + 日志 + 链路追踪 + 部署 + 故障）**

但原始的可观测性数据往往杂乱无章。

New Relic 告警、Splunk 日志、CloudWatch 事件、OpenTelemetry 跨度（span）、PagerDuty 故障事件和 GitHub 部署记录，可能都使用不同的格式。

因此，在把数据发送给大语言模型（LLM）之前，我会先将这些信号规范化为统一的数据结构。

核心要点是：

**指标反映症状，日志展示细节，链路追踪展示路径，部署记录反映变化，故障记录提供历史经验。**

---

## 🚨 3. 告警分诊与降噪

一个主要的应用场景是告警分诊。

很多告警都包含噪声。

有些只是短暂的尖峰。
有些是重复告警。
有些是已知且无需采取行动的问题。
有些是下游症状引发的告警。
还有一些需要调整阈值。

AI 可以将告警划分为以下类别：

```text
真实故障
噪声告警
重复告警
已知问题
需要调整阈值
```

**（PPT：告警分类）**

例如，AI 可能会输出：

```json
{
  "classification": "需要调整阈值",
  "confidence": 0.82,
  "reason": "指标在 2 分钟内恢复正常",
  "recommendedAction": "延长评估窗口"
}
```

目标并不是盲目地抑制告警。

目标是减少告警疲劳，帮助工程师专注于真正的故障。

核心要点是：

**AI 可以减少告警噪声，但必须谨慎使用自动告警抑制。**

---

## 🔍 4. 根因分析与故障处理助手

另一个重要的应用场景是根因分析。

AI 可以综合告警详情、指标异常、日志错误、链路瓶颈、近期部署、依赖健康状况，以及类似的历史故障。

输出应当以证据为依据。

例如：

```json
{
  "likelyCause": "最近一次部署导致数据库延迟上升",
  "evidence": [
    "部署后，第 95 百分位延迟上升",
    "日志显示数据库超时错误",
    "上个月发生过类似故障"
  ],
  "nextSteps": [
    "检查数据库监控面板",
    "对比查询执行计划",
    "考虑回滚"
  ]
}
```

**（PPT：基于证据的根因分析）**

模型不应只是猜测根因。

它应引用来自指标、日志、链路追踪、部署记录和故障历史的证据。

这就引出了**故障处理助手（incident copilot）**的概念。

故障处理助手可以总结发生了什么、构建时间线、建议下一步检查项、检索操作手册、查找相关历史故障，甚至起草故障复盘报告。

但最终的决策权仍然属于工程师。

核心要点是：

**AI 应当辅助排查，而不是取代工程师的判断。**

---

## 🧠 5. RAG 与可观测性智能体

检索增强生成（RAG）在可观测性场景中非常有用，因为很多知识都是私有的，并且具有特定领域的背景。

模型需要访问操作手册、服务文档、告警说明、服务负责人信息、近期部署说明，以及历史故障记录。

RAG 的流程如下：

```text
新告警
→ 搜索操作手册和历史故障
→ 检索类似的历史案例
→ 将上下文提供给大语言模型
→ 生成分析结果
```

**（PPT：用于可观测性的 RAG）**

我们还可以构建一个可观测性智能体。

智能体可以调用以下工具：

```text
指标 API
日志搜索
链路追踪查询
部署历史
故障数据库
操作手册搜索
服务目录
```

智能体的执行循环可以是：

```text
收到告警
→ 检查指标
→ 搜索日志
→ 检查近期部署
→ 检索类似故障
→ 输出结构化分析
```

**（PPT：可观测性智能体的执行循环）**

核心要点是：

**工具返回的结果应当成为最终建议的证据。**

---

## 🛡️ 6. 安全、评估与人工审批

安全至关重要，因为可观测性系统会影响生产环境的运维操作。

常见风险包括错误的根因判断、编造证据、不安全的自动化操作、抑制真实故障告警、数据泄露，以及来自日志的提示注入。

因此，系统需要设置防护措施。

例如：

```text
要求提供引用来源和证据
使用结构化输出
验证工具返回结果
对敏感数据进行脱敏
审计 AI 建议
高风险操作必须经过人工审批
```

**（PPT：安全与防护措施）**

高风险操作包括回滚、重启服务、基础设施扩缩容、抑制告警、修改阈值，或向其他团队发送值班呼叫。

一条安全的规则是：

```text
AI 提出建议
人工审批
系统执行
```

评估也同样重要。

在线下，我们可以使用历史故障进行测试，将 AI 的建议与已知根因和故障复盘报告进行比较。

在线上，我们可以衡量平均确认时间（MTTA）、平均恢复时间（MTTR）、告警噪声减少程度、错误抑制率、升级处理准确率，以及工程师满意度。

核心要点是：

**AI 在可观测性中的应用应以证据为驱动，高风险操作应经过人工审核。**

---

## ⭐ 结束语

最后总结一下。

AI 在可观测性中的应用，是为了帮助工程师更快地理解故障。

它可以汇总指标、日志、链路追踪、部署记录和故障历史。

它可以对告警进行分类、减少噪声、提出可能的根因、检索操作手册，并建议下一步调试操作。

但它不应盲目地自动执行生产环境操作。

最后想分享的观点是：

**AI 在可观测性中的应用，并不是让 AI 自动修复系统。
而是将零散的信号转化为证据和下一步行动。**

谢谢大家。

**（PPT：结束语——证据先于自动化）**
