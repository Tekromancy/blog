---
title: "The AST Security Visitor: Static Analysis Code Inspector"
description: "Traverse a heterogeneous codebase syntax tree—Classes, Method Calls, Raw Strings, Imports—applying an external security visitor to detect vulnerabilities without altering source code."
type: "prompt"
gofPattern: "Visitor (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Traversing the Syntax Tree"
formula: "Given the following source code snippet [INSERT CODE]: Parse the code into its structural AST elements (ClassDeclarations, MethodCalls, RawStrings, Imports). Now act as the SECURITY_VISITOR: Visit every element and apply checking rules: On RawString: inspect for high-entropy secrets; On MethodCall: inspect for SQL injection or unsafe deserialization; On Import: check for vulnerable legacy packages. Output the audit findings table."
tags: ["ai-prompts", "visitor-pattern", "ast", "static-analysis", "security", "sast", "gof-patterns", "secops"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four behavioral patterns, the **Visitor** pattern separates data structures from operations:

> *"Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates."*
> — Gang of Four, *Behavioral Patterns*

In compiler and AST design, an Abstract Syntax Tree contains many distinct node types (`FunctionDeclaration`, `BinaryExpression`, `StringLiteral`). The Visitor pattern allows you to write operations like `TypeCheckVisitor`, `LintVisitor`, or `SecurityAuditVisitor` without modifying any of the underlying node classes.

### The Transmutation to LLM Static Application Security Testing (SAST)

When developers ask an LLM to review a file for security vulnerabilities, naive prompts usually result in superficial feedback:
- The model comments on general code style or variable naming.
- It overlooks critical SQL injection or unsafe deserialization vectors buried in helper functions.

The **AST Security Visitor** instructs the model to perform a rigorous two-phase compiler pass:
1. **Phase 1 (Parse Structure)**: Identify and categorize the heterogeneous structural nodes of the code into an Abstract Syntax Tree (Imports, Declarations, Function Calls, String Literals).
2. **Phase 2 (Accept the Visitor)**: Walk each AST node and execute specialized security auditing rules specific to that node type.

---

## The Spell Formula

Cast this visitor prompt to conduct a structural static analysis audit on suspicious application code:

```markdown
You are the AST Security Visitor Engine, operating under the Gang of Four VISITOR PATTERN.

### TARGET CODE PAYLOAD TO AUDIT:
"""
{{SOURCE_CODE_SNIPPET}}
"""

### PHASE 1: RECONSTRUCT THE AST ELEMENTS
Parse the target code into its core structural node elements:
1. [ELEMENT_IMPORT]: External library dependencies and module requirements.
2. [ELEMENT_CALL]: Invocations of external methods, database drivers, and shell runners.
3. [ELEMENT_LITERAL]: Hardcoded strings, numbers, configuration constants, and dictionary keys.
4. [ELEMENT_INPUT_FLOW]: Where external user parameters enter the function scope.

### PHASE 2: EXECUTE THE CONCRETE SECURITY VISITOR
Walk each node and apply the visitor's specialized inspection logic:
- `visitImport(node)`: Flag deprecated, abandoned, or cryptographically broken libraries (e.g., Python `pickle`, `pycrypto`, old `jwt`).
- `visitCall(node)`: Flag unparameterized SQL queries (`cursor.execute(f"SELECT...{user_var}")`), shell execution (`os.system`, `subprocess.Popen(shell=True)`), or path traversal (`open(user_path)`).
- `visitLiteral(node)`: Compute Shannon entropy on raw strings to detect hardcoded API keys, JWT secrets, or private keys.
- `visitInputFlow(node)`: Track taint propagation from request parameters to sink nodes.

### STRICT FINDINGS MATRIX:
Output the results in an aligned markdown table:
| AST Element Type | Code Line Coordinate | AST Node Value | Violation Vector | Severity | Remediation Sigil |
| :--- | :--- | :--- | :--- | :--- | :--- |
```

---

## Architecture of the AST Visitor

```
               [Abstract Syntax Tree Nodes]
     ┌──────────────┬──────────────┬──────────────┐
     ▼              ▼              ▼              ▼
 [ImportNode]   [CallNode]   [LiteralNode]  [TaintSinkNode]
     │              │              │              │
     └──────────────┼──────────────┼──────────────┘
                    ▼
     ┌─────────────────────────────┐
     │   The Security Visitor      │
     │   - visitImport()           │
     │   - visitCall()             │
     │   - visitLiteral()          │
     └──────────────┬──────────────┘
                    ▼
       [Structured SAST Audit Report]
```

---

## Why the Visitor Pattern Outperforms Generic Code Review

1. **Node-Specific Rigor**: Instead of reading code like an unfocused prose essay, the model systematically applies targeted tests to each element type (checking string literals for secrets, checking function calls for command injection).
2. **Extensibility**: You can easily swap in a `PerformanceVisitor` (looking for $O(N^2)$ nested loops) or a `RefactoringVisitor` over the exact same structural elements without changing the parsing phase.
3. **Reproducibility**: The findings are tied directly to AST node coordinates, making it simple to integrate into CI/CD automated PR review pipelines.

By separating the syntax structure of code from the operations performed upon it, the Visitor pattern turns language models into precise, compiler-grade security analyzers.
