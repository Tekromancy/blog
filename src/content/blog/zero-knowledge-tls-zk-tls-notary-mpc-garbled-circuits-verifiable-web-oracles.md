---
title: "Cryptographic Web Oracles: Architecting zkTLS (TLSNotary, DECO & Proxying MPC-TLS) to Prove Private HTTPS API State in Zero Knowledge"
description: "Why standard TLS 1.3 (RFC 8446) symmetric AEAD transcripts are trivially forgeable by the client—and how zkTLS combines 2-Party Computation (2PC) Garbled Circuits with VOLE-based Zero-Knowledge proofs to turn any unmodified Web2 HTTPS endpoint into a verifiable cryptographic oracle."
pubDate: "2026-11-02"
updatedDate: "2026-11-02"
heroImage: "37.jpg"
tags: ["security", "cryptography", "networking", "architecture", "zero-trust"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

Suppose a user wants to prove to an autonomous verifier or smart contract that an authoritative HTTPS API—say, `api.github.com/user`, a bank's wire-transfer REST endpoint, or a cloud provider's billing API—returned a specific JSON field (`"verified_owner": true`), **without revealing their OAuth bearer token, session cookie, or adjacent private fields**, and **without asking the target server to change a single line of code**.

At first glance, this sounds easy: *"During a TLS 1.3 (`RFC 8446`) session, the server signs the handshake with its X.509 certificate chain (`ECDSA` / `RSA-PSS`). Why can't the client just record the encrypted TLS transcript and generate a Zero-Knowledge Proof (`ZK-SNARK`) that the ciphertext decrypts to the target JSON?"*

Because **TLS 1.3 intentionally destroys third-party non-repudiation**!

Here is why a naive ZK-SNARK over a recorded TLS session is **100% forgeable**, and how modern **zkTLS (`TLSNotary`, `DECO`, and VOLE-based `MPC-TLS`)** solves the Web2 Oracle problem using **2-Party Computation (`2PC`) over `ECDHE` and `AES-128-GCM`**.

---

## 1. The Symmetric MAC Forgery Trap in TLS 1.3 (`RFC 8446`)

During a standard TLS 1.3 handshake:
1. The Server proves its identity by signing the `Transcript-Hash` (`CertificateVerify`) using its private X.509 key.
2. However, the actual HTTP request and response records (`Application Data`) are encrypted and authenticated using a **symmetric AEAD cipher (`TLS_AES_128_GCM_SHA256`)** keyed by `server_application_traffic_secret_0`.
3. Both the **Server** and the **Client** derive the exact same `server_write_key` and `server_write_iv` (including the 128-bit GHASH authentication key $H = \text{AES}_K(0^{128})$) from the ephemeral Diffie-Hellman (`X25519` / `secp256r1`) shared secret!

Because the Client knows the symmetric `server_write_key` and the `GHASH` polynomial key $H$, **the Client can locally encrypt and compute a valid 128-bit `AES-GCM` authentication tag for any fake HTTP response it invents**, and then generate a mathematically valid ZK-SNARK proving that its forged ciphertext decrypts under the session key!

To make an unmodified TLS 1.3 session non-repudiable, **the Prover (Client) must never possess the full symmetric `server_write_key` or `GHASH` key $H$ until *after* the encrypted server response has been committed**.

---

## 2. The Three Architectures of zkTLS: Proxy `MPC-TLS` vs. `DECO` 3-Party Handshake vs. TEE

Modern zkTLS systems prevent client-side transcript forgery by introducing an untrusted **Notary / Verifier (`V`)** into the TLS session via one of three architectures:

```text
+-----------------------------------------------------------------------------------+
|               MPC-TLS (TLSNOTARY) 2-PARTY COMPUTATION ARCHITECTURE                |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ PROVER (Client) ]                         [ NOTARY / VERIFIER ]                |
|    Holds Private Share: x_P                    Holds Private Share: x_V           |
|    Holds OAuth Cookie / API Token              Knows 0 Bytes of Plaintext!        |
|            |                                           |                          |
|            +-------------------+-----------------------+                          |
|                                |                                                  |
|   Step 1: 2PC ECDHE (`P-256` / `X25519` Multiplicative-to-Additive `MtA`)         |
|           Jointly compute TLS Traffic Key shares: K_P (+) K_V = K_TLS             |
|           (Neither party ever learns K_TLS or GHASH key H!)                       |
|                                |                                                  |
|   Step 2: 2PC Garbled Circuit AES-128-GCM Encryption of Request                   |
|           Prover hides Cookie inside Oblivious Transfer (OT) inputs               |
|                                |                                                  |
|                                v  (Standard TLS 1.3 Packet on TCP Port 443)       |
|                     [ UNMODIFIED HTTPS SERVER ]                                   |
|                       Verifies GCM Tag & Returns Signed TLS Response              |
|                                |                                                  |
|   Step 3: Committed Selective Disclosure (VOLE / Quicksilver ZK Proof)            |
|           ├── Prover commits to Ciphertext C & Tag T                              |
|           ├── Prover proves in ZK: JSON["status"] == "active" while redacting PII |
|           └── Notary signs Portable Attestation over X.509 Chain + ZK Commitment! |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Step-by-Step Cryptography Inside `MPC-TLS` (`TLSNotary` Protocol)

1. **Distributed `ECDHE` Key Exchange (`MtA` Protocol)**:
   - When the Server sends its ephemeral `ServerHello` public key $Q_S \in E(\mathbb{F}_p)$, the Prover ($P$) holds secret scalar share $d_P$ and the Notary ($V$) holds secret scalar share $d_V$ such that the client public key sent in `ClientHello` was $Q_C = (d_P + d_V) \cdot G$.
   - $P$ computes $d_P \cdot Q_S = (x_1, y_1)$ and $V$ computes $d_V \cdot Q_S = (x_2, y_2)$. Using **Multiplicative-to-Additive (`MtA`) Oblivious Transfer**, $P$ and $V$ compute additive shares of the `X25519`/`P-256` x-coordinate $Z = Z_P + Z_V \pmod p$ without either party learning the Pre-Master Secret $Z$.
2. **2PC `HKDF-Expand-Label` & `AES-128-GCM` via Garbled Circuits**:
   - $P$ and $V$ evaluate `HKDF-SHA256` and the `AES-128` key schedule inside a boolean **Garbled Circuit (`GC`)** using **Free-XOR** and **Half-Gates** (requiring only 2 ciphertexts per `AND` gate and 0 ciphertexts per `XOR` gate).
   - The resulting 128-bit `server_write_key` $K$ and `client_write_key` are XOR-shared: $K = K_P \oplus K_V$.
3. **2PC `GHASH` Authentication over $\text{GF}(2^{128})$**:
   - In `AES-GCM`, the authentication tag is computed via polynomial evaluation over $\text{GF}(2^{128})$ using $H = \text{AES}_K(0^{128})$.
   - Because $P$ and $V$ only hold shares $H_P \oplus H_V = H$, $P$ cannot forge a valid server response tag! Only the real HTTPS Server (which knows the full $H$ from its side of `ECDHE`) can produce a valid ciphertext and `AES-GCM` tag that passes the joint check.
4. **Selective Redaction via `VOLE` (`Vector Oblivious Linear Evaluation`)**:
   - Once the Server sends the encrypted HTTP response $C$, $P$ and $V$ hold authenticated bit-commitments (`Information-Theoretic MACs` via `SoftSpokenOT`) to the decrypted plaintext $M = C \oplus \text{AES-CTR}_K(\text{IV})$.
   - $P$ can open public substrings (e.g., `HTTP/1.1 200 OK`, `"balance": `) directly while proving range or regex predicates over private substrings in Zero Knowledge (`Quicksilver` / `Groth16`) at < 50 MB RAM cost!

---

## 3. Building a Production `TLSNotary` Rust Prover & Verifier

Here is a complete Rust implementation using the `tlsn-prover` and `tlsn-core` crates (`tlsn v0.1+`) demonstrating how a Prover executes an `MPC-TLS` session against an HTTPS API, redacts the `Authorization: Bearer` header, and emits a portable cryptographic presentation:

```rust
// Cargo.toml dependencies: tlsn-prover, tlsn-core, tokio, tokio-util, hyper
use std::ops::Range;
use tlsn_core::{
    proof::SessionProof,
    transcript::{TranscriptCommitConfigBuilder, TranscriptCommitmentKind},
    Direction,
};
use tlsn_prover::{Prover, ProverConfig};
use tokio::net::TcpStream;
use tokio_util::compat::TokioAsyncReadCompatExt;

pub async fn generate_zktls_api_attestation(
    notary_stream: TcpStream,
    server_domain: &str,
    secret_bearer_token: &str,
) -> anyhow::Result<Vec<u8>> {
    // 1. Configure MPC-TLS circuit limits (max 4 KB sent, 16 KB received)
    let config = ProverConfig::builder()
        .server_name(server_domain)
        .max_sent_data(4096)
        .max_recv_data(16384)
        .build()?;

    // 2. Perform 2PC setup (SoftSpokenOT + Garbled Circuit preprocessing) with Notary
    let prover = Prover::new(config)
        .setup(notary_stream.compat())
        .await?;

    // 3. Connect TCP socket to unmodified target HTTPS server (port 443)
    let client_socket = TcpStream::connect((server_domain, 443)).await?;
    let (mut mpc_tls_conn, prover_fut) = prover.connect(client_socket.compat()).await?;
    let prover_handle = tokio::spawn(prover_fut);

    // 4. Send HTTPS request through the 2PC MPC-TLS tunnel
    let http_req = format!(
        "GET /v1/account/status HTTP/1.1\r\n\
         Host: {server_domain}\r\n\
         Authorization: Bearer {secret_bearer_token}\r\n\
         Accept: application/json\r\n\
         Connection: close\r\n\r\n"
    );
    futures::AsyncWriteExt::write_all(&mut mpc_tls_conn, http_req.as_bytes()).await?;
    futures::AsyncWriteExt::close(&mut mpc_tls_conn).await?;

    let mut response_buf = Vec::new();
    futures::AsyncReadExt::read_to_end(&mut mpc_tls_conn, &mut response_buf).await?;

    // 5. Enter the Zero-Knowledge Notarization & Selective Redaction phase
    let mut prover = prover_handle.await??.start_notarize();
    let sent_len = prover.sent_transcript().data().len();
    let recv_len = prover.recv_transcript().data().len();

    // Locate the byte range of the secret Bearer token so we DO NOT reveal it
    let bearer_offset = http_req.find(secret_bearer_token).unwrap();
    let public_req_prefix: Range<usize> = 0..bearer_offset;
    let public_req_suffix: Range<usize> = (bearer_offset + secret_bearer_token.len())..sent_len;

    let mut builder = TranscriptCommitConfigBuilder::new(prover.transcript());
    builder.commit_sent(&public_req_prefix)?;
    builder.commit_sent(&public_req_suffix)?;
    builder.commit_recv(&(0..recv_len))?;

    prover.transcript_commit(builder.build()?);
    let notarized_session = prover.finalize().await?;

    // 6. Serialize the verifiable proof (contains X.509 cert chain + redacted openings)
    Ok(bincode::serialize(&notarized_session)?)
}
```

---

## 4. Security & Performance Tradeoffs: `MPC-TLS` vs. `DECO` vs. TEE Oracles (`SGX`/`TDX`)

| Web2 Oracle Architecture | Server Changes Required? | Trust Assumption | Bandwidth Overhead per 4 KB API Call | Prover Latency (WAN) | Key Vulnerability Surface |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Proxy `MPC-TLS` (`TLSNotary`)** | **None (100% Standard TLS 1.3)** | Non-collusion of Prover & Notary (`1-of-2`) | `~14 MB – 28 MB` (Garbled Circuits + OT) | `1.1 s – 2.4 s` | Malicious Server + Prover collusion if IP/DNS isn't pinned by Proxy |
| **3-Party Handshake (`DECO` / `PADO`)** | **None** | Non-collusion of Prover & Verifier (`1-of-2`) | `~18 MB – 35 MB` (`VOLE` + `2PC-GCM`) | `1.5 s – 3.1 s` | Requires TLS 1.2/1.3 ciphersuite without ChaCha20 carry blowup |
| **Hardware Enclave Proxy (`Intel TDX` / `SGX`)** | **None** | Hardware vendor root key + microcode TCB | `< 10 KB` (Native TLS speed) | `< 45 ms` | Microarchitectural side-channels (`MMIO`, `Downfall`, silicon TCB) |

By combining **Proxy `MPC-TLS`** (where the Notary also routes the raw TCP socket to verify destination IP/BGP routing and certificate transparency logs) with **Intel TDX / AMD SEV-SNP enclave-hosted Notaries**, engineers achieve defense-in-depth: even if a hardware enclave key were ever compromised, the enclave never sees the user's plaintext OAuth token or redacted PII!
