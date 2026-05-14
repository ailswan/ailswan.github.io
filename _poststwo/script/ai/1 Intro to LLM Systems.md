
# 🎬 English YouTube Script

## Intro to LLM Systems  

---

## 🎯 Opening

Hello everyone.
Today I’d like to walk through how to think about **LLM systems** in system design.

An LLM system is not just calling a model.

The model is only one component.

A real LLM system is an application architecture around the model. It provides context, retrieves knowledge, calls tools, validates outputs, enforces safety, monitors quality, and controls latency and cost.

A typical flow looks like this:

```text
User Input
→ Prompt Builder
→ Context Retrieval
→ LLM
→ Tool Calls
→ Response Parser
→ Safety Checks
→ Final Answer
```

**(PPT: Title Slide — Intro to LLM Systems)**

---

## 🎯 1. Core Framework

When I think about LLM systems, I usually break them down into five parts.

First, **model, prompt, and context**.
Second, **RAG and embeddings**.
Third, **tool calling and agents**.
Fourth, **memory and personalization**.
And finally, **evaluation, observability, safety, latency, and cost**.

The main trade-off is:

**quality vs latency vs cost vs safety**.

A more powerful model and more context may improve quality, but they also increase latency and cost.

**(PPT: Core Framework — 5 Parts)**

---

## 🧠 2. Model, Prompt, and Context

Let’s start with the foundation.

The model is responsible for understanding user input, reasoning over context, following instructions, and generating text or structured output.

But the model alone is not enough.

The prompt defines the task, role, instructions, output format, constraints, and examples.

For example, a good prompt should tell the model what to do, what information it can use, what format to return, what to avoid, and how to handle uncertainty.

**(PPT: Model + Prompt)**

Context is the information given to the model at runtime.

It can include the user question, conversation history, retrieved documents, tool results, user profile, and system instructions.

But there is a limit: the context window.

The model cannot see unlimited information in one request.

So the system must decide what context is most relevant, retrieve it, rank it, truncate it, or summarize it.

The key idea is:

**Prompt controls behavior. Context controls knowledge.**

**(PPT: Context Window)**

---

## 🔍 3. RAG and Embeddings

Next is RAG.

RAG means **Retrieval-Augmented Generation**.

The flow is:

```text
Retrieve relevant knowledge
→ Add it to the prompt
→ Let the LLM generate an answer
```

**(PPT: RAG Flow)**

Why do we need RAG?

Because LLMs may not know private company data, recent information, domain-specific documents, or user-specific content.

Instead of relying only on model memory, the system retrieves relevant documents at runtime and provides them as context.

This improves factuality and allows the model to answer using external or updated knowledge.

Embeddings make this possible.

An embedding converts text into a vector.

```text
"refund policy" → [0.12, -0.44, 0.89, ...]
```

Similar meanings have similar vectors, so the system can use vector search to find relevant document chunks.

The key idea is:

**RAG grounds the model in external knowledge. Embeddings make semantic search possible.**

---

## 🛠️ 4. Tool Calling and Agents

Now let’s move from knowledge to action.

LLMs cannot reliably do everything internally.

They cannot directly query a database, search logs, calculate precisely, send emails, call payment APIs, or execute internal workflows.

That is why we need tool calling.

A tool flow looks like this:

```text
User asks question
→ LLM decides a tool is needed
→ System validates permission
→ Tool executes
→ Tool result returns
→ LLM uses result to answer
```

**(PPT: Tool Calling Flow)**

The key point is that the model should not directly execute the tool.

The application executes the tool safely, with permission checks, argument validation, logging, and guardrails.

Agents go one step further.

An agent is an LLM system that can plan steps, use tools, observe results, decide the next action, and iterate until the task is done.

```text
Goal
→ Plan
→ Tool call
→ Observe result
→ Decide next step
→ Final answer
```

**(PPT: Agent Loop)**

The key idea is:

**Tool calling gives the LLM access to external systems. Agents allow multi-step execution.**

---

## 🧩 5. Memory, Validation, and Evaluation

LLM systems also need memory.

Short-term memory comes from conversation history.
Long-term memory stores persistent user preferences or domain information.
Working memory stores temporary state during task execution.

Memory helps personalization, but it also creates privacy, freshness, and accuracy risks.

**(PPT: Types of Memory)**

Production systems also need output validation.

LLMs can produce invalid JSON, wrong formats, hallucinated facts, unsafe content, or unsupported actions.

So the system should validate structure, check business rules, verify tool results, attach citations when needed, and retry or fallback if output is invalid.

Evaluation is also critical.

Offline evaluation tests prompts and models before launch.
Online evaluation monitors real user outcomes, task completion, latency, cost, safety, and user satisfaction.

The key idea is:

**Production LLM systems should not blindly trust model output. They need validation and continuous evaluation.**

---

## 🛡️ 6. Safety, Observability, Latency, and Cost

Safety is a core part of LLM system design.

Common risks include hallucination, prompt injection, data leakage, unsafe tool calls, unauthorized actions, toxic content, and over-confident answers.

Guardrails include input filtering, output filtering, tool permission checks, retrieval source validation, PII redaction, human approval for risky actions, refusal policies, and audit logs.

**(PPT: Safety and Guardrails)**

Observability is also important.

We should log prompt version, model version, retrieved documents, tool calls, latency, token usage, cost, validation errors, safety flags, and user feedback.

Cost and latency must also be managed.

Large models, long prompts, more tool calls, more retrieval, and multi-step agents all increase cost and latency.

A good system routes simple tasks to cheaper models and reserves expensive reasoning models for harder tasks.

---

## ⭐ Closing Insight

To summarize.

An LLM system is not just a model.

The model provides language and reasoning.
Prompt controls behavior.
Context provides runtime knowledge.
RAG grounds answers in external data.
Tool calling connects the model to real systems.
Agents support multi-step tasks.
Memory enables personalization.
Validation, evaluation, observability, and safety make the system production-ready.

The final insight is:

**LLM system design is not about calling a model.
It is about building a controllable, reliable, safe, and measurable application system around the model.**

Thank you.

**(PPT: Closing Insight — Model + Context + Tools + Safety + Evaluation)**
