import React, { useState, useMemo } from "react";

type ActiveTab = "handshake_split" | "selective_redaction" | "attestation_quote" | "architecture_matrix";
type TargetApi = "github_user" | "stripe_balance" | "bank_wire";

interface JsonField {
	id: string;
	key: string;
	value: string | number | boolean;
	type: "string" | "number" | "boolean";
	category: "auth" | "pii" | "attestation" | "metadata";
	status: "public" | "redacted" | "zk_predicate";
	predicateRule?: string;
}

export default function ZkTlsOracleSimulator() {
	const [activeTab, setActiveTab] = useState<ActiveTab>("selective_redaction");
	const [selectedApi, setSelectedApi] = useState<TargetApi>("stripe_balance");
	const [forgeryAttempted, setForgeryAttempted] = useState<boolean>(false);
	const [copied, setCopied] = useState<boolean>(false);
	const [payloadSizeKb, setPayloadSizeKb] = useState<number>(4);
	const [networkRttMs, setNetworkRttMs] = useState<number>(45);

	// Configurable fields for each API
	const [fieldsState, setFieldsState] = useState<Record<string, "public" | "redacted" | "zk_predicate">>({
		auth_bearer: "redacted",
		id: "redacted",
		account_tier: "public",
		balance_usd: "zk_predicate",
		kyc_verified: "public",
		email: "redacted",
		full_name: "redacted",
		routing_number: "redacted",
		country: "public"
	});

	const toggleFieldStatus = (id: string, nextStatus: "public" | "redacted" | "zk_predicate") => {
		setFieldsState((prev) => ({
			...prev,
			[id]: nextStatus
		}));
	};

	// Schema definitions for the APIs
	const apiDefinitions: Record<TargetApi, { name: string; endpoint: string; host: string; certIssuer: string; fields: JsonField[] }> = {
		stripe_balance: {
			name: "Stripe API (v1/balance)",
			endpoint: "GET /v1/balance",
			host: "api.stripe.com",
			certIssuer: "DigiCert Global Root G2 (X.509 SHA-256)",
			fields: [
				{ id: "auth_bearer", key: "Authorization", value: "Bearer rk_live_9942Af879b29e011cd882...", type: "string", category: "auth", status: fieldsState.auth_bearer || "redacted" },
				{ id: "id", key: "customer_id", value: "cus_P0q92Lxkm104", type: "string", category: "pii", status: fieldsState.id || "redacted" },
				{ id: "full_name", key: "account_holder", value: "Joshua McLaughlin Cox", type: "string", category: "pii", status: fieldsState.full_name || "redacted" },
				{ id: "email", key: "billing_email", value: "joshua@tekromancy.com", type: "string", category: "pii", status: fieldsState.email || "redacted" },
				{ id: "account_tier", key: "enterprise_tier", value: true, type: "boolean", category: "attestation", status: fieldsState.account_tier || "public" },
				{ id: "balance_usd", key: "available_balance_usd", value: 185420.50, type: "number", category: "attestation", status: fieldsState.balance_usd || "zk_predicate", predicateRule: "balance >= $50,000" },
				{ id: "kyc_verified", key: "kyc_passed", value: true, type: "boolean", category: "attestation", status: fieldsState.kyc_verified || "public" },
				{ id: "country", key: "settlement_currency", value: "USD", type: "string", category: "metadata", status: fieldsState.country || "public" }
			]
		},
		github_user: {
			name: "GitHub API (/user)",
			endpoint: "GET /user",
			host: "api.github.com",
			certIssuer: "DigiCert TLS RSA SHA256 2020 CA1",
			fields: [
				{ id: "auth_bearer", key: "Authorization", value: "Bearer ghp_887e0fa19430bcde12f...", type: "string", category: "auth", status: fieldsState.auth_bearer || "redacted" },
				{ id: "id", key: "id", value: 8941203, type: "number", category: "pii", status: fieldsState.id || "redacted" },
				{ id: "full_name", key: "name", value: "Joshua Edward McLaughlin Cox", type: "string", category: "pii", status: fieldsState.full_name || "redacted" },
				{ id: "email", key: "email", value: "djehauti@users.noreply.github.com", type: "string", category: "pii", status: fieldsState.email || "redacted" },
				{ id: "account_tier", key: "site_admin", value: false, type: "boolean", category: "metadata", status: fieldsState.account_tier || "public" },
				{ id: "balance_usd", key: "public_repos", value: 142, type: "number", category: "attestation", status: fieldsState.balance_usd || "zk_predicate", predicateRule: "public_repos >= 50" },
				{ id: "kyc_verified", key: "two_factor_authentication", value: true, type: "boolean", category: "attestation", status: fieldsState.kyc_verified || "public" },
				{ id: "country", key: "company", value: "Tekromancy Cryptographic Systems", type: "string", category: "metadata", status: fieldsState.country || "public" }
			]
		},
		bank_wire: {
			name: "Core Banking Fedwire API",
			endpoint: "GET /api/v3/accounts/corp-settlement",
			host: "fedwire.ny.frb.org",
			certIssuer: "US Federal Reserve System Root CA-4",
			fields: [
				{ id: "auth_bearer", key: "X-Client-MTLS-Token", value: "mTLS_x509_cert_token_99b7...", type: "string", category: "auth", status: fieldsState.auth_bearer || "redacted" },
				{ id: "id", key: "swift_bic", value: "FRB_NY_US_33", type: "string", category: "pii", status: fieldsState.id || "redacted" },
				{ id: "full_name", key: "beneficiary_entity", value: "Tekromancy Research Corp", type: "string", category: "pii", status: fieldsState.full_name || "redacted" },
				{ id: "email", key: "audit_contact", value: "treasury@tekromancy.com", type: "string", category: "pii", status: fieldsState.email || "redacted" },
				{ id: "account_tier", key: "clearing_status", value: "SETTLED", type: "string", category: "attestation", status: fieldsState.account_tier || "public" },
				{ id: "balance_usd", key: "fed_reserve_balance", value: 4500000.00, type: "number", category: "attestation", status: fieldsState.balance_usd || "zk_predicate", predicateRule: "balance >= $1,000,000" },
				{ id: "kyc_verified", key: "finra_kyc_approved", value: true, type: "boolean", category: "attestation", status: fieldsState.kyc_verified || "public" },
				{ id: "country", key: "fdic_insured", value: true, type: "boolean", category: "metadata", status: fieldsState.country || "public" }
			]
		}
	};

	const currentApi = apiDefinitions[selectedApi];

	// Compute proof size, garbled circuit overhead, and execution metrics
	const cryptoMetrics = useMemo(() => {
		const rawBytes = payloadSizeKb * 1024;
		// 1 AES-128 block = 16 bytes = 2,688 AND gates in optimized Half-Gates AES circuit
		const aesBlocks = Math.ceil(rawBytes / 16);
		const andGates = aesBlocks * 2688;
		// Half-Gates requires 2 ciphertexts (32 bytes) per AND gate
		const gcCiphertextMB = (andGates * 32) / (1024 * 1024);
		// SoftSpokenOT / VOLE communication overhead
		const voleOverheadMB = (rawBytes * 128 * 16) / (1024 * 1024 * 8);
		const totalBandwidthMB = Number((gcCiphertextMB + voleOverheadMB + 1.2).toFixed(2));

		// Count opened vs redacted bits
		let openedFields = 0;
		let redactedFields = 0;
		let predicateFields = 0;

		currentApi.fields.forEach((f) => {
			const st = fieldsState[f.id] || f.status;
			if (st === "public") openedFields++;
			else if (st === "redacted") redactedFields++;
			else predicateFields++;
		});

		// Prover & Notary 2PC execution time estimate based on WAN RTT
		// Round trips: Handshake MtA (3 RTT) + Garbled Circuit eval (2 RTT) + VOLE commit (2 RTT)
		const roundTrips = 7;
		const rttLatency = (roundTrips * networkRttMs) / 1000;
		const computationTimeSec = 0.45 + (payloadSizeKb * 0.04);
		const totalLatencySec = Number((rttLatency + computationTimeSec).toFixed(2));

		// Verifiable presentation proof size (X.509 chain + Merkle roots + Schnorr Notary signature)
		const proofSizeBytes = 1240 + (predicateFields * 384);

		return {
			rawBytes,
			andGates,
			gcCiphertextMB: Number(gcCiphertextMB.toFixed(2)),
			totalBandwidthMB,
			openedFields,
			redactedFields,
			predicateFields,
			totalLatencySec,
			proofSizeBytes
		};
	}, [payloadSizeKb, networkRttMs, fieldsState, currentApi]);

	// Build the JSON presentation object
	const verifiableAttestationJson = useMemo(() => {
		const verifiedClaims: Record<string, unknown> = {};
		const commitments: Record<string, string> = {};

		currentApi.fields.forEach((f) => {
			const st = fieldsState[f.id] || f.status;
			if (st === "public") {
				verifiedClaims[f.key] = f.value;
			} else if (st === "zk_predicate") {
				verifiedClaims[f.key] = {
					predicate: f.predicateRule || "range_check_valid",
					zk_proof: "0x7f4e9a3b...[Groth16/Quicksilver 192 bytes]",
					status: "SATISFIED"
				};
				commitments[f.key] = "0x89ab12...[VOLE_BIT_COMMITMENT]";
			} else {
				verifiedClaims[f.key] = "[REDACTED_CONFIDENTIAL]";
				commitments[f.key] = "0x3b89fa...[VOLE_BIT_COMMITMENT]";
			}
		});

		return JSON.stringify(
			{
				attestation_standard: "zkTLS-RFC8446-2PC-v1.4",
				timestamp_utc: "2026-11-02T16:20:00Z",
				target_server: {
					host: currentApi.host,
					x509_root_authority: currentApi.certIssuer,
					cert_fingerprint_sha256: "9E:81:4A:72:1B:5F:20:3C:99:6D:FE:12:34:56:78:9A:BC:DE:F0:12:34:56:78:9A:BC:DE:F0:12:34:56:78:9A",
					tls_version: "TLSv1.3 (RFC 8446)",
					ciphersuite: "TLS_AES_128_GCM_SHA256"
				},
				notary_attestation: {
					notary_identity: "notary.tekromancy.network (Enclave TDX / SGX)",
					notary_public_key: "ed25519:6c5847fa91802e3b8f10...",
					signature_r_s: "0x3045022100e478b0...[VALID_X509_WITNESS]"
				},
				proven_http_request: {
					method: currentApi.endpoint.split(" ")[0],
					path: currentApi.endpoint.split(" ")[1],
					authorization_header: "[REDACTED // 0 BYTES LEAKED TO NOTARY]"
				},
				proven_http_response: {
					http_status: 200,
					verified_claims: verifiedClaims,
					transcript_vole_commitments: commitments
				}
			},
			null,
			2
		);
	}, [currentApi, fieldsState]);

	const handleCopyAttestation = () => {
		navigator.clipboard.writeText(verifiableAttestationJson);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	};

	return (
		<div className="w-full bg-[#0a0e17] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 text-gray-200 font-mono shadow-2xl">
			{/* Top HUD Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-6 gap-4">
				<div>
					<div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-wider mb-1">
						<span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
						<span>ZKTLS // 2PC MPC-TLS 1.3 ORACLE LABORATORY</span>
					</div>
					<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
						Cryptographic Web2 HTTPS Non-Repudiation Simulator
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs rounded">
						ZERO SERVER CHANGES
					</span>
					<span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs rounded">
						HALF-GATES GC
					</span>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-3">
				<button
					type="button"
					onClick={() => setActiveTab("selective_redaction")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "selective_redaction"
							? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					1. Selective Redaction &amp; ZK Claims
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("handshake_split")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "handshake_split"
							? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(34,238,68,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					2. 2PC Key Split &amp; Forgery Trap
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("attestation_quote")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "attestation_quote"
							? "bg-purple-500/20 text-purple-300 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					3. Verifiable JSON Attestation
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("architecture_matrix")}
					className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
						activeTab === "architecture_matrix"
							? "bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
							: "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800"
					}`}
				>
					4. Architecture Comparison
				</button>
			</div>

			{/* TAB 1: SELECTIVE REDACTION & ZK WORKBENCH */}
			{activeTab === "selective_redaction" && (
				<div className="space-y-6">
					{/* Target API Selector */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						{(["stripe_balance", "github_user", "bank_wire"] as TargetApi[]).map((api) => (
							<button
								type="button"
								key={api}
								onClick={() => setSelectedApi(api)}
								className={`p-3 rounded-xl border text-left transition-all ${
									selectedApi === api
										? "bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)]"
										: "bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
								}`}
							>
								<div className="text-xs font-bold text-cyan-400 mb-1">{apiDefinitions[api].name}</div>
								<div className="text-[11px] text-gray-400 truncate">{apiDefinitions[api].endpoint}</div>
								<div className="text-[10px] text-gray-500 mt-1">{apiDefinitions[api].host}</div>
							</button>
						))}
					</div>

					{/* Workbench Instructions */}
					<div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-xs text-cyan-300/90 leading-relaxed">
						<strong>ZK Selective Disclosure Protocol:</strong> The client and notary execute a 2PC session with the unmodified Web2 server. You can freely toggle each JSON response field between <span className="text-emerald-400 font-bold">PUBLIC</span> (revealed in plaintext), <span className="text-red-400 font-bold">REDACTED</span> (hidden via VOLE commitment; 0 bits leaked), or <span className="text-purple-400 font-bold">ZK PREDICATE</span> (proves a mathematical condition without revealing the raw value!).
					</div>

					{/* Field Configuration Table */}
					<div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950/60">
						<div className="px-4 py-2.5 bg-gray-900/80 border-b border-gray-800 text-xs font-bold text-gray-300 flex justify-between items-center">
							<span>TRANSCRIPT FIELD</span>
							<span>ORIGINAL SERVER VALUE</span>
							<span>DISCLOSURE MODE</span>
						</div>
						<div className="divide-y divide-gray-800/80">
							{currentApi.fields.map((field) => {
								const currentStatus = fieldsState[field.id] || field.status;
								return (
									<div key={field.id} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
										<div className="flex items-center gap-2">
											<span className={`w-2 h-2 rounded-full ${
												field.category === "auth" ? "bg-red-400" :
												field.category === "pii" ? "bg-amber-400" :
												field.category === "attestation" ? "bg-emerald-400" : "bg-cyan-400"
											}`} />
											<div>
												<span className="font-bold text-gray-200">{field.key}</span>
												<span className="ml-2 text-[10px] text-gray-500 uppercase tracking-widest">({field.category})</span>
											</div>
										</div>

										<div className="font-mono text-gray-300 bg-black/40 px-2 py-1 rounded max-w-xs truncate text-[11px] border border-gray-800">
											{String(field.value)}
										</div>

										<div className="flex items-center gap-1.5 self-end sm:self-center">
											<button
												type="button"
												onClick={() => toggleFieldStatus(field.id, "public")}
												className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
													currentStatus === "public"
														? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/70"
														: "bg-gray-900 text-gray-500 border border-gray-800 hover:text-gray-300"
												}`}
											>
												Public
											</button>
											<button
												type="button"
												onClick={() => toggleFieldStatus(field.id, "redacted")}
												className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
													currentStatus === "redacted"
														? "bg-red-500/30 text-red-300 border border-red-500/70"
														: "bg-gray-900 text-gray-500 border border-gray-800 hover:text-gray-300"
												}`}
											>
												Redact
											</button>
											{field.type === "number" && (
												<button
													type="button"
													onClick={() => toggleFieldStatus(field.id, "zk_predicate")}
													className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
														currentStatus === "zk_predicate"
															? "bg-purple-500/30 text-purple-300 border border-purple-500/70 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
															: "bg-gray-900 text-gray-500 border border-gray-800 hover:text-gray-300"
													}`}
												>
													ZK Predicate
												</button>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Real-time Redacted Plaintext Preview */}
					<div className="p-4 bg-black/70 border border-gray-800 rounded-xl space-y-2">
						<div className="flex items-center justify-between text-xs text-gray-400">
							<span className="font-bold text-gray-300">// VERIFIER DECRYPTED VIEW (WHAT THE ON-CHAIN ORACLE SEES)</span>
							<span className="text-[11px] text-cyan-400">{cryptoMetrics.openedFields} Open / {cryptoMetrics.redactedFields} Redacted / {cryptoMetrics.predicateFields} ZK</span>
						</div>
						<pre className="text-[11px] font-mono text-emerald-400/90 bg-gray-950 p-3 rounded border border-gray-800/80 overflow-x-auto">
							{`HTTP/1.1 200 OK\r\n` +
							`Date: Mon, 02 Nov 2026 16:20:00 GMT\r\n` +
							`Content-Type: application/json\r\n` +
							`Server: ${currentApi.host}\r\n\r\n` +
							`{\n` +
							currentApi.fields.map(f => {
								const st = fieldsState[f.id] || f.status;
								if (st === "public") {
									return `  "${f.key}": ${JSON.stringify(f.value)}`;
								} else if (st === "zk_predicate") {
									return `  "${f.key}": "[ZK_PROVEN: ${f.predicateRule} // VALUE HIDDEN]"`;
								} else {
									return `  "${f.key}": "[*** REDACTED ***]"`;
								}
							}).join(",\n") +
							`\n}`}
						</pre>
					</div>

					{/* Metrics Bar */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">2PC GC AND Gates</div>
							<div className="text-lg font-bold text-cyan-400">{cryptoMetrics.andGates.toLocaleString()}</div>
							<div className="text-[10px] text-gray-400">AES-128 Half-Gates</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">MPC Comm Bandwidth</div>
							<div className="text-lg font-bold text-emerald-400">{cryptoMetrics.totalBandwidthMB} MB</div>
							<div className="text-[10px] text-gray-400">GC + SoftSpokenOT</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Prover E2E Latency</div>
							<div className="text-lg font-bold text-purple-400">{cryptoMetrics.totalLatencySec} s</div>
							<div className="text-[10px] text-gray-400">{networkRttMs}ms WAN RTT</div>
						</div>
						<div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl">
							<div className="text-[10px] text-gray-500 uppercase">Attestation Proof Size</div>
							<div className="text-lg font-bold text-amber-400">{(cryptoMetrics.proofSizeBytes / 1024).toFixed(2)} KB</div>
							<div className="text-[10px] text-gray-400">Portable Verifier Quote</div>
						</div>
					</div>
				</div>
			)}

			{/* TAB 2: 2PC HANDSHAKE & FORGERY TRAP */}
			{activeTab === "handshake_split" && (
				<div className="space-y-6">
					<div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-xs space-y-3">
						<div className="font-bold text-emerald-400 text-sm">
							Why Standard TLS 1.3 Symmetric Keys Fail Third-Party Non-Repudiation
						</div>
						<p className="text-gray-300 leading-relaxed">
							In standard TLS 1.3, both the Client and Server compute the identical symmetric secret:
							<code className="text-cyan-300 bg-black/60 px-1 py-0.5 rounded mx-1">
								server_write_key = HKDF(PreMasterSecret)
							</code>
							and the polynomial GHASH key:
							<code className="text-cyan-300 bg-black/60 px-1 py-0.5 rounded mx-1">
								H = AES_K(0^128)
							</code>.
							Because the Client knows <span className="text-red-400 font-bold">H</span>, the Client can encrypt any fabricated bank balance or KYC flag and generate a valid 128-bit authentication tag <span className="text-red-400 font-bold">T</span>!
						</p>
					</div>

					{/* 2PC Key Split Visualization */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Prover Side */}
						<div className="p-4 bg-cyan-950/20 border border-cyan-800/50 rounded-xl space-y-3">
							<div className="flex items-center justify-between text-xs border-b border-cyan-800/40 pb-2">
								<span className="font-bold text-cyan-300">PROVER (CLIENT) SHARE</span>
								<span className="text-[10px] bg-cyan-900/50 text-cyan-300 px-1.5 py-0.5 rounded">Untrusted</span>
							</div>
							<div className="space-y-2 text-xs">
								<div className="text-gray-400">Scalar Secret Share:</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-cyan-400 border border-cyan-900/50 break-all">
									d_P = 0x7c49b012f9e4210a5e88d301...
								</div>
								<div className="text-gray-400">AES Key Share (K_P):</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-cyan-400 border border-cyan-900/50 break-all">
									K_P = 0x9a44fc01982bde34...
								</div>
								<div className="text-gray-400">GHASH Subkey Share (H_P):</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-cyan-400 border border-cyan-900/50 break-all">
									H_P = 0x33e8902ffca81210...
								</div>
								<div className="text-[11px] text-emerald-400/90 pt-1">
									Knows HTTP Request (Cookies, OAuth tokens) in local plaintext.
								</div>
							</div>
						</div>

						{/* Notary Side */}
						<div className="p-4 bg-purple-950/20 border border-purple-800/50 rounded-xl space-y-3">
							<div className="flex items-center justify-between text-xs border-b border-purple-800/40 pb-2">
								<span className="font-bold text-purple-300">NOTARY / VERIFIER SHARE</span>
								<span className="text-[10px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded">Attestor</span>
							</div>
							<div className="space-y-2 text-xs">
								<div className="text-gray-400">Scalar Secret Share:</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-purple-400 border border-purple-900/50 break-all">
									d_V = 0x3f119ac089bd34881023fe89...
								</div>
								<div className="text-gray-400">AES Key Share (K_V):</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-purple-400 border border-purple-900/50 break-all">
									K_V = 0x51b80329ff09c122...
								</div>
								<div className="text-gray-400">GHASH Subkey Share (H_V):</div>
								<div className="p-2 bg-black/50 rounded font-mono text-[11px] text-purple-400 border border-purple-900/50 break-all">
									H_V = 0xcc7120a11289fe94...
								</div>
								<div className="text-[11px] text-purple-400/90 pt-1">
									Knows 0 bytes of request plaintext! Evaluates Garbled Circuit only.
								</div>
							</div>
						</div>
					</div>

					{/* Attack Simulation */}
					<div className="p-4 bg-black/60 border border-gray-800 rounded-xl space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-xs font-bold text-gray-300">SIMULATE MALICIOUS CLIENT TRANSCRIPT FORGERY</span>
							<button
								type="button"
								onClick={() => setForgeryAttempted(!forgeryAttempted)}
								className={`px-3 py-1 text-xs font-bold rounded transition-all ${
									forgeryAttempted
										? "bg-red-500/20 text-red-300 border border-red-500"
										: "bg-cyan-500/20 text-cyan-300 border border-cyan-500 hover:bg-cyan-500/30"
								}`}
							>
								{forgeryAttempted ? "Reset Simulation" : "Attempt Forgery Attack"}
							</button>
						</div>

						{forgeryAttempted ? (
							<div className="p-3 bg-red-950/40 border border-red-500/50 rounded-lg text-xs space-y-2">
								<div className="flex items-center gap-2 text-red-400 font-bold">
									<span className="text-base">❌</span>
									<span>CRYPTOGRAPHIC FORGERY ATTACK BLOCKED!</span>
								</div>
								<p className="text-gray-300 leading-relaxed">
									The malicious client altered the response byte stream to claim:
									<code className="text-red-300 bg-black/50 px-1 py-0.5 rounded mx-1">
										&quot;balance_usd&quot;: 99999999.00
									</code>.
									However, in AES-128-GCM, the GHASH tag is:
									<span className="text-cyan-300 block font-mono my-1 pl-2">
										T = (C_1 * H^n + C_2 * H^(n-1) + ... + len * H) + E_K(J_0)
									</span>
									Because the client only holds <code className="text-cyan-300">H_P</code> and has no knowledge of <code className="text-purple-300">H_V</code>, any forged polynomial tag evaluation has an error probability of <code className="text-amber-300">1 - 2^(-128)</code>. The Notary’s 2PC verification circuit rejected the tag check with status <span className="text-red-400 font-bold">`ERR_GHASH_TAG_MISMATCH`</span>!
								</p>
							</div>
						) : (
							<div className="p-3 bg-gray-900/40 border border-gray-800 rounded-lg text-xs text-gray-400 leading-relaxed">
								Click &quot;Attempt Forgery Attack&quot; to see why holding only a 2PC share of the session traffic keys guarantees non-repudiation even when the Prover controls the local operating system, browser, and network stack.
							</div>
						)}
					</div>
				</div>
			)}

			{/* TAB 3: VERIFIABLE JSON ATTESTATION */}
			{activeTab === "attestation_quote" && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-xs font-bold text-white uppercase tracking-wider">
								Portable Verifiable Presentation (JSON-LD / ZK-TLS)
							</div>
							<div className="text-[11px] text-gray-400">
								Cryptographic proof ready for on-chain smart contract or autonomous AI agent verification
							</div>
						</div>
						<button
							type="button"
							onClick={handleCopyAttestation}
							className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
						>
							<span>{copied ? "✓ Copied to Clipboard" : "Copy Attestation JSON"}</span>
						</button>
					</div>

					<div className="relative">
						<pre className="p-4 bg-gray-950 border border-gray-800 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[460px] leading-relaxed">
							{verifiableAttestationJson}
						</pre>
					</div>

					<div className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl text-xs text-gray-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-emerald-400"></span>
							<span>Attestation Signature: Ed25519 (ECDSA P-256 fallback supported)</span>
						</div>
						<div className="text-gray-500 text-[11px]">
							Verification Cost on EVM: ~280k gas (Groth16) / ~85k gas (Schnorr)
						</div>
					</div>
				</div>
			)}

			{/* TAB 4: ARCHITECTURE BENCHMARK */}
			{activeTab === "architecture_matrix" && (
				<div className="space-y-6">
					{/* Interactive Sliders */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
						<div>
							<div className="flex justify-between text-xs mb-1">
								<span className="text-gray-300">HTTPS Payload Size:</span>
								<span className="text-cyan-400 font-bold">{payloadSizeKb} KB</span>
							</div>
							<input
								type="range"
								min="1"
								max="32"
								step="1"
								value={payloadSizeKb}
								onChange={(e) => setPayloadSizeKb(Number(e.target.value))}
								className="w-full accent-cyan-400 cursor-pointer"
							/>
							<div className="flex justify-between text-[10px] text-gray-500 mt-1">
								<span>1 KB (REST)</span>
								<span>16 KB</span>
								<span>32 KB (Large JSON)</span>
							</div>
						</div>

						<div>
							<div className="flex justify-between text-xs mb-1">
								<span className="text-gray-300">WAN Round-Trip Time (RTT):</span>
								<span className="text-purple-400 font-bold">{networkRttMs} ms</span>
							</div>
							<input
								type="range"
								min="5"
								max="200"
								step="5"
								value={networkRttMs}
								onChange={(e) => setNetworkRttMs(Number(e.target.value))}
								className="w-full accent-purple-400 cursor-pointer"
							/>
							<div className="flex justify-between text-[10px] text-gray-500 mt-1">
								<span>5 ms (DC)</span>
								<span>45 ms (Cross-Region)</span>
								<span>200 ms (Global)</span>
							</div>
						</div>
					</div>

					{/* Comparison Table */}
					<div className="border border-gray-800 rounded-xl overflow-x-auto bg-gray-950/60">
						<table className="w-full text-left text-xs">
							<thead>
								<tr className="border-b border-gray-800 bg-gray-900/80 text-gray-400 font-semibold">
									<th className="p-3">ORACLE ARCHITECTURE</th>
									<th className="p-3">SERVER CHANGES</th>
									<th className="p-3">BANDWIDTH PER QUERY</th>
									<th className="p-3">ESTIMATED LATENCY</th>
									<th className="p-3">TRUST ASSUMPTION</th>
									<th className="p-3">VULNERABILITY SURFACE</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-800/80 font-mono text-[11px]">
								<tr className="bg-cyan-950/20 text-cyan-300">
									<td className="p-3 font-bold">
										Proxy MPC-TLS (TLSNotary)
									</td>
									<td className="p-3 text-emerald-400 font-bold">None (RFC 8446)</td>
									<td className="p-3 font-bold text-white">{cryptoMetrics.totalBandwidthMB} MB</td>
									<td className="p-3 font-bold text-white">{cryptoMetrics.totalLatencySec} s</td>
									<td className="p-3 text-gray-300">1-of-2 Non-collusion</td>
									<td className="p-3 text-gray-400">Prover + Server DNS collusion</td>
								</tr>
								<tr className="hover:bg-gray-900/30 text-purple-300">
									<td className="p-3 font-bold">
										3-Party Handshake (DECO / PADO)
									</td>
									<td className="p-3 text-emerald-400 font-bold">None</td>
									<td className="p-3 font-bold text-white">{(cryptoMetrics.totalBandwidthMB * 1.35).toFixed(2)} MB</td>
									<td className="p-3 font-bold text-white">{(cryptoMetrics.totalLatencySec * 1.25).toFixed(2)} s</td>
									<td className="p-3 text-gray-300">1-of-2 Non-collusion</td>
									<td className="p-3 text-gray-400">Cipher suite carry overflow</td>
								</tr>
								<tr className="hover:bg-gray-900/30 text-amber-300">
									<td className="p-3 font-bold">
										Hardware Enclave Proxy (TDX / SGX)
									</td>
									<td className="p-3 text-emerald-400 font-bold">None</td>
									<td className="p-3 font-bold text-emerald-400">&lt; 15 KB</td>
									<td className="p-3 font-bold text-emerald-400">{Math.round(networkRttMs * 1.4 + 20)} ms</td>
									<td className="p-3 text-amber-400">Intel/AMD Silicon Root</td>
									<td className="p-3 text-red-400">Microarchitecture side-channels</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="p-3 bg-gray-900/30 border border-gray-800 rounded-xl text-xs text-gray-400 leading-relaxed">
						<strong className="text-gray-200">Defense-in-Depth Hybrid Architecture:</strong> In high-value institutional workflows, protocols combine <span className="text-cyan-400">Proxy MPC-TLS</span> with <span className="text-amber-400">Intel TDX Enclave-hosted Notaries</span>. Even if the hardware enclave is physically probed or compromised, the Notary possesses zero plaintext bytes of the user&apos;s authentication token or sensitive payload data.
					</div>
				</div>
			)}
		</div>
	);
}
