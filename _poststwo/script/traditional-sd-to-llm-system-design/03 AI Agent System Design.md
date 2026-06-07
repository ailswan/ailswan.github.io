# 🎬 English YouTube Script

## AI Agent System Design

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through **AI Agent System Design**.

This is part of the series **From Traditional System Design to LLM System Design**.
The goal is to show how a traditional system design answer changes when the core product experience is powered by an LLM.

By the end, you should be able to explain both the classic distributed systems foundation and the LLM-specific upgrade.

**(PPT 1: Title Slide — AI Agent System Design)**

---

## 1. Traditional Starting Point

Let’s start with the traditional system design baseline.

For this topic, the traditional version is a traditional workflow engine with predefined steps, queues, workers, retries, and audit logs.

A normal system design answer would cover API gateway, authentication, stateless services, storage, caching, queues, scaling, replication, and observability.

That foundation is still important.
But it is not enough for an LLM system.

**(PPT 2: Traditional SD Baseline)**

---

## 2. LLM Upgrade

Now let’s upgrade the design.

For **AI Agent System Design**, the LLM-specific upgrade is model-driven planning, dynamic tool selection, observations, memory, bounded loops, and human approval.

The model is not the whole system.
The model is one execution component behind an orchestration layer.

That orchestration layer owns context construction, model choice, safety, evaluation, cost control, and traces.

**(PPT 3: LLM Upgrade)**

---

## 3. High-Level Architecture

A typical request flow looks like this:

```text
User gives goal
  ↓
Agent creates plan
  ↓
Router selects tool
  ↓
Policy engine checks permission
  ↓
Executor calls tool
  ↓
Observation parsed
  ↓
State updated
  ↓
Loop continues or stops
  ↓
Final answer generated
```

This diagram shows the main shift.
In traditional SD, we mostly move structured data through services.
In LLM system design, we also build context, route model calls, validate outputs, measure quality, and account for token cost.

**(PPT 4: Architecture)**

---

## 4. Online Path and Offline Path

A strong LLM system design answer separates the online path from the offline path.

The online path is latency-sensitive.
It handles the user request, context building, model or retrieval calls, validation, streaming, and fallback.

The offline path is for quality and operations.
It handles indexing, eval datasets, prompt testing, model rollout, cache warming, analytics, and cost dashboards.

This separation makes the design easier to scale and debug.

**(PPT 5: Online vs Offline Path)**

---

## 5. Key Trade-offs

For **AI Agent System Design**, the important trade-offs are:

* autonomy versus control
* tool power versus safety
* more steps versus higher cost
* automation versus human approval

In an interview, I would connect each trade-off to a decision.

For example:

> If quality dominates, I add more verification, grounding, or human review.
> If latency dominates, I simplify the path, cache safe results, or stream earlier.
> If cost dominates, I reduce tokens, route to cheaper models, or use batching.

**(PPT 6: Trade-offs)**

---

## 6. Failure Modes

Production LLM systems fail in traditional ways and in AI-specific ways.

For this topic, common failures include:

* infinite loop
* wrong tool call
* unsafe side effect
* state drift
* low-quality plan

The staff-level answer should always include the degraded path.
Do we retry?
Do we fallback?
Do we refuse?
Do we ask for human approval?
Do we roll back a prompt or model version?

That is how we make probabilistic model behavior operationally safe.

**(PPT 7: Failure Modes)**

---

## 7. Metrics and Observability

For **AI Agent System Design**, I would monitor:

* task completion rate
* steps per task
* tool success rate
* loop timeout rate
* human escalation rate

But normal metrics are not enough.

For an LLM system, a trace should include request id, prompt version, model version, context sources, retrieval results, tool calls, token counts, latency, cost, safety decisions, and final quality signals.

Without this trace, debugging bad answers becomes guesswork.

**(PPT 8: Observability)**

---

## 8. Staff-Level Interview Answer

Here is the concise interview version.

> For **AI Agent System Design**, I would start from the traditional system design baseline: API gateway, services, storage, cache, queues, scaling, and reliability.
> Then I would add the LLM orchestration layer: prompt and context construction, model routing, retrieval or memory, tool execution, safety validation, evaluation, token cost control, and observability.
> The staff-level point is to separate deterministic system guarantees from probabilistic model behavior.
> The model can generate or reason, but the system must enforce permissions, budgets, validation, rollback, and traceability.

**(PPT 9: Staff-Level Answer)**

---

## 9. Summary

To summarize, remember three things.

First, do not throw away traditional system design.
Second, add LLM-specific layers explicitly.
Third, end with safety, evaluation, cost, and observability.

That is how you upgrade a traditional SD answer into an LLM system design answer.

**(PPT 10: Summary)**

Thank you.

---

# 🎤 中文讲稿

## 开场

大家好。
今天我们讲 **AI Agent System Design**。

这是 **从传统 System Design 升级到 LLM System Design** 系列的一篇。
这个系列的目标是：让你知道传统系统设计答案如何升级成 LLM 系统设计答案。

**（PPT 1：标题页）**

---

## 1. 传统 SD 起点

先看传统系统设计 baseline。

这个 topic 的传统版本是：a traditional workflow engine with predefined steps, queues, workers, retries, and audit logs。

传统答案通常会讲 API gateway、auth、stateless service、storage、cache、queue、scaling、replication 和 observability。

这些都还重要。
但是对于 LLM 系统来说，这还不够。

**（PPT 2：传统 SD baseline）**

---

## 2. LLM 系统升级点

升级到 LLM 系统后，新增的是：model-driven planning, dynamic tool selection, observations, memory, bounded loops, and human approval。

重点是：模型不是整个系统。
模型只是 orchestration layer 后面的一个执行组件。

orchestration layer 负责 context、model choice、safety、eval、cost control 和 trace。

**（PPT 3：LLM 升级点）**

---

## 3. 架构流程

整体请求流程可以这样讲：

```text
User gives goal
  ↓
Agent creates plan
  ↓
Router selects tool
  ↓
Policy engine checks permission
  ↓
Executor calls tool
  ↓
Observation parsed
  ↓
State updated
  ↓
Loop continues or stops
  ↓
Final answer generated
```

传统 SD 主要是 structured data 在服务之间流动。
LLM 系统还要构建 context、调用模型、验证输出、评估质量，并记录 token cost。

**（PPT 4：架构流程）**

---

## 4. Online Path 和 Offline Path

LLM 系统设计里，我会明确区分 online path 和 offline path。

online path 处理用户请求，关注 latency、context building、model call、validation、streaming 和 fallback。

offline path 处理 index、eval dataset、prompt test、model rollout、cache warming、analytics 和 cost dashboard。

这样系统更容易扩展，也更容易 debug。

**（PPT 5：Online vs Offline）**

---

## 5. Trade-off

这个 topic 的主要 trade-off 是：

* autonomy versus control
* tool power versus safety
* more steps versus higher cost
* automation versus human approval

面试里要把 trade-off 连接到决策。

> 如果质量最重要，我会增加 grounding、verification 或 human review。
> 如果延迟最重要，我会简化链路、cache 安全结果，或者更早 streaming。
> 如果成本最重要，我会减少 token、选择便宜模型、或者做 batching。

**（PPT 6：Trade-off）**

---

## 6. 失败模式

常见失败包括：

* infinite loop
* wrong tool call
* unsafe side effect
* state drift
* low-quality plan

Staff 级回答一定要讲 degraded path。
失败时是 retry、fallback、refuse、human approval，还是 rollback prompt/model version？

这就是把概率性模型行为变成可运维系统的关键。

**（PPT 7：失败模式）**

---

## 7. Metrics 和 Observability

我会监控：

* task completion rate
* steps per task
* tool success rate
* loop timeout rate
* human escalation rate

但 LLM 系统不能只看普通 metrics。
trace 里还要有 request id、prompt version、model version、context source、retrieval results、tool calls、token counts、latency、cost、safety decision 和 quality signal。

否则 bad answer 很难 debug。

**（PPT 8：可观测性）**

---

## 8. 面试背诵段落

> 对于 **AI Agent System Design**，我会先从传统系统设计 baseline 开始：gateway、service、storage、cache、queue、scaling 和 reliability。
> 然后我会增加 LLM orchestration layer：prompt/context、model routing、retrieval 或 memory、tool execution、safety validation、evaluation、token cost control 和 observability。
> Staff 级重点是区分 deterministic system guarantee 和 probabilistic model behavior。
> 模型可以生成和推理，但系统必须负责权限、预算、验证、回滚和 traceability。

---

## 总结

总结一下，记住三点。

第一，不要丢掉传统系统设计。
第二，明确增加 LLM-specific layers。
第三，最后一定讲 safety、eval、cost 和 observability。

谢谢大家。
