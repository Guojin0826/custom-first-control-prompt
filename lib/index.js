import z from "@deepseek-ai/schemastery";
import { MessageId, createUserMessage, deepFreeze } from "@deepseek-ai/dsh-llm";
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
//#region lib/types/seed.js
/**
* Seed-message construction for custom-first-control-prompt: the request-path
* alternating user/assistant sequence built once per plugin activation and
* shared by every intercepted request.
*/
/** Plugin attribution carried by the injected assistant messages' `source`. */
const SEED_SOURCE = "custom-first-control-prompt";
/**
* Exchange tags the injected texts may not contain case-insensitively. The
* reference exchanges travel as plain message texts; embedding the tag
* grammar would invite the model to re-parse (or forge) exchange markup that
* no longer exists, so plugin load skips such texts with a warning instead.
*/
const TRANSCRIPT_RESERVED_TAGS = [
	"<custom-history",
	"</custom-history>",
	"<exchange>",
	"</exchange>",
	"<user>",
	"</user>",
	"<assistant>",
	"</assistant>"
];
/**
* Build the request-level seed messages: one real alternating user/assistant
* exchange per configured pair, as plain `Message` objects for
* `GenerateOptions.messages`. Built once per plugin activation and shared by
* every intercepted request, keeping the injected prefix byte-identical for
* prefix-cache reuse. These messages never enter the session log — they exist
* only on the request path, so there is no turn structure to conflict with
* the loop's turn numbering and nothing for compaction to shadow. The user
* side carries `kind:'user'` and the assistant side plugin attribution.
* @param pairs - ordered reference exchanges.
* @returns the frozen alternating user/assistant message sequence.
*/
function buildSeedMessages(pairs) {
	const messages = [];
	for (const [index, pair] of pairs.entries()) {
		messages.push(createUserMessage({
			content: [{
				type: "text",
				text: pair.user
			}],
			source: { kind: "user" }
		}));
		messages.push({
			id: MessageId(`${SEED_SOURCE}-intercept-${index}`),
			role: "assistant",
			source: {
				kind: "plugin",
				plugin: SEED_SOURCE
			},
			content: [{
				type: "text",
				text: pair.assistant
			}]
		});
	}
	return deepFreeze(messages);
}
//#endregion
//#region lib/types/panel.js
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/** The web panel management service. */
let PanelService = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _configRead_decorators;
	let _configWrite_decorators;
	let _configClear_decorators;
	let _configRawImport_decorators;
	let _requestsList_decorators;
	let _requestsSetPaused_decorators;
	let _requestsClear_decorators;
	let _uiSetDockVisible_decorators;
	let _previewAssemble_decorators;
	let _templateList_decorators;
	let _templateSave_decorators;
	let _templateDelete_decorators;
	let _templateApply_decorators;
	let _injectionToggle_decorators;
	return class PanelService extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_configRead_decorators = [Remote("config-read")];
			_configWrite_decorators = [Remote("config-write")];
			_configClear_decorators = [Remote("config-clear")];
			_configRawImport_decorators = [Remote("config-raw-import")];
			_requestsList_decorators = [Remote("requests-list")];
			_requestsSetPaused_decorators = [Remote("requests-set-paused")];
			_requestsClear_decorators = [Remote("requests-clear")];
			_uiSetDockVisible_decorators = [Remote("ui-set-dock-visible")];
			_previewAssemble_decorators = [Remote("preview-assemble")];
			_templateList_decorators = [Remote("template-list")];
			_templateSave_decorators = [Remote("template-save")];
			_templateDelete_decorators = [Remote("template-delete")];
			_templateApply_decorators = [Remote("template-apply")];
			_injectionToggle_decorators = [Remote("injection-toggle")];
			__esDecorate(this, null, _configRead_decorators, {
				kind: "method",
				name: "configRead",
				static: false,
				private: false,
				access: {
					has: (obj) => "configRead" in obj,
					get: (obj) => obj.configRead
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _configWrite_decorators, {
				kind: "method",
				name: "configWrite",
				static: false,
				private: false,
				access: {
					has: (obj) => "configWrite" in obj,
					get: (obj) => obj.configWrite
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _configClear_decorators, {
				kind: "method",
				name: "configClear",
				static: false,
				private: false,
				access: {
					has: (obj) => "configClear" in obj,
					get: (obj) => obj.configClear
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _configRawImport_decorators, {
				kind: "method",
				name: "configRawImport",
				static: false,
				private: false,
				access: {
					has: (obj) => "configRawImport" in obj,
					get: (obj) => obj.configRawImport
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _requestsList_decorators, {
				kind: "method",
				name: "requestsList",
				static: false,
				private: false,
				access: {
					has: (obj) => "requestsList" in obj,
					get: (obj) => obj.requestsList
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _requestsSetPaused_decorators, {
				kind: "method",
				name: "requestsSetPaused",
				static: false,
				private: false,
				access: {
					has: (obj) => "requestsSetPaused" in obj,
					get: (obj) => obj.requestsSetPaused
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _requestsClear_decorators, {
				kind: "method",
				name: "requestsClear",
				static: false,
				private: false,
				access: {
					has: (obj) => "requestsClear" in obj,
					get: (obj) => obj.requestsClear
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _uiSetDockVisible_decorators, {
				kind: "method",
				name: "uiSetDockVisible",
				static: false,
				private: false,
				access: {
					has: (obj) => "uiSetDockVisible" in obj,
					get: (obj) => obj.uiSetDockVisible
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _previewAssemble_decorators, {
				kind: "method",
				name: "previewAssemble",
				static: false,
				private: false,
				access: {
					has: (obj) => "previewAssemble" in obj,
					get: (obj) => obj.previewAssemble
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _templateList_decorators, {
				kind: "method",
				name: "templateList",
				static: false,
				private: false,
				access: {
					has: (obj) => "templateList" in obj,
					get: (obj) => obj.templateList
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _templateSave_decorators, {
				kind: "method",
				name: "templateSave",
				static: false,
				private: false,
				access: {
					has: (obj) => "templateSave" in obj,
					get: (obj) => obj.templateSave
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _templateDelete_decorators, {
				kind: "method",
				name: "templateDelete",
				static: false,
				private: false,
				access: {
					has: (obj) => "templateDelete" in obj,
					get: (obj) => obj.templateDelete
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _templateApply_decorators, {
				kind: "method",
				name: "templateApply",
				static: false,
				private: false,
				access: {
					has: (obj) => "templateApply" in obj,
					get: (obj) => obj.templateApply
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _injectionToggle_decorators, {
				kind: "method",
				name: "injectionToggle",
				static: false,
				private: false,
				access: {
					has: (obj) => "injectionToggle" in obj,
					get: (obj) => obj.injectionToggle
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		ring = (__runInitializers(this, _instanceExtraInitializers), []);
		seq = 0;
		paused = true;
		dockVisible = true;
		/** Hot injection toggle; when false the llm/stream listener passes through. */
		injectionEnabled = true;
		/** Name of the last applied template; empty when none. */
		activeTemplate = "";
		/** Composed plugin config snapshot, shown when the profile patch has no row. */
		effective;
		constructor(ctx, effective) {
			super(ctx, "custom-first-control-prompt-panel");
			this.effective = effective;
			ctx.on("llm/stream", (options, next) => {
				const stream = next();
				if (!this.paused) this.capture(options);
				return stream;
			});
		}
		capture(options) {
			try {
				const record = options;
				const entry = {
					id: ++this.seq,
					time: Date.now(),
					model: typeof record["model"] === "string" ? record["model"] : "",
					provider: typeof record["provider"] === "string" ? record["provider"] : "",
					system: typeof record["system"] === "string" ? record["system"] : "",
					purpose: typeof record["purpose"] === "string" ? record["purpose"] : "",
					messages: []
				};
				entry.messages = (Array.isArray(record["messages"]) ? record["messages"] : []).map((msg) => {
					let text = "";
					const m = typeof msg === "object" && msg !== null ? msg : void 0;
					if (typeof m?.["content"] === "string") text = m["content"];
					else if (Array.isArray(m?.["content"])) text = m["content"].map((block) => {
						if (typeof block === "string") return block;
						const b = typeof block === "object" && block !== null ? block : void 0;
						return b?.["type"] === "text" && typeof b["text"] === "string" ? b["text"] : "";
					}).join("");
					return {
						role: typeof m?.["role"] === "string" ? m["role"] : "unknown",
						text
					};
				});
				this.ring.push(entry);
				if (this.ring.length > 30) this.ring.shift();
			} catch (error) {
				this.ctx.logger?.warn("custom-first-control-prompt panel request capture failed: %s", String(error));
			}
		}
		async patchPath() {
			const settings = this.ctx.get("settings");
			if (settings !== void 0) try {
				const doc = await settings.prepareDocument();
				if (typeof doc === "string" && doc.length > 0) {
					const norm = doc.replace(/\\/g, "/");
					const i = norm.lastIndexOf("/");
					if (i > 0) return `${norm.slice(0, i)}/profiles/web/cordis.patch.yml`;
				}
			} catch {}
			return null;
		}
		writePolicy() {
			const policy = this.ctx.get("sandboxPolicy");
			try {
				return policy?.resolve({ mode: "danger-full-access" });
			} catch {
				return;
			}
		}
		static yamlUnquote(value) {
			let s = value.trim();
			if (s.length >= 2 && s[0] === "\"" && s[s.length - 1] === "\"") s = s.slice(1, -1);
			else if (s.length >= 2 && s[0] === "'" && s[s.length - 1] === "'") s = s.slice(1, -1);
			return s.replace(/\\\\/g, "\0").replace(/\\n/g, "\n").replace(/\\"/g, "\"").replace(/\u0000/g, "\\");
		}
		static yamlScalar(value) {
			return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\r?\n/g, "\\n")}"`;
		}
		static parseBlock(raw) {
			const out = {
				found: false,
				sections: [],
				history: [],
				includeSubagents: false
			};
			if (raw.indexOf("custom-first-control-prompt") < 0) return out;
			out.found = true;
			let zone = "";
			let cur = null;
			for (const line of raw.split(/\r?\n/)) {
				const t = line.trim();
				if (t.indexOf("sections:") === 0) {
					zone = "sections";
					cur = null;
					continue;
				}
				if (t.indexOf("history:") === 0) {
					zone = "history";
					cur = null;
					continue;
				}
				if (t.indexOf("includeSubagents:") === 0) {
					zone = "";
					cur = null;
				}
				if (zone === "sections") {
					if (t.indexOf("- name:") === 0) {
						cur = {
							name: PanelService.yamlUnquote(t.slice(t.indexOf(":") + 1)),
							order: 0,
							text: "",
							enabled: true
						};
						out.sections.push(cur);
					} else if (cur !== null && "name" in cur && t.indexOf("order:") === 0) cur.order = Number(t.slice(t.indexOf(":") + 1));
					else if (cur !== null && "name" in cur && t.indexOf("text:") === 0) cur.text = PanelService.yamlUnquote(t.slice(t.indexOf(":") + 1));
				} else if (zone === "history") {
					if (t.indexOf("- user:") === 0) {
						cur = {
							user: PanelService.yamlUnquote(t.slice(t.indexOf(":") + 1)),
							assistant: ""
						};
						out.history.push(cur);
					} else if (cur !== null && "assistant" in cur && t.indexOf("assistant:") === 0) cur.assistant = PanelService.yamlUnquote(t.slice(t.indexOf(":") + 1));
				} else if (zone === "") {
					const m = t.match(/^includeSubagents:\s*(true|false)/);
					if (m) out.includeSubagents = m[1] === "true";
				}
			}
			return out;
		}
		/** Render just the core `custom-first-control-prompt` loader row (4-space indent block). */
		static coreBlock(config) {
			const sections = Array.isArray(config?.sections) ? config.sections : [];
			const history = Array.isArray(config?.history) ? config.history : [];
			const includeSubagents = config?.includeSubagents === true;
			const secBlock = sections.length > 0 ? sections.map((s) => `          - name: ${PanelService.yamlScalar(s.name)}\n            order: ${Number(s.order) || 0}\n            text: ${PanelService.yamlScalar(s.text)}`).join("\n") : "";
			const hisBlock = history.length > 0 ? history.map((p) => `          - user: ${PanelService.yamlScalar(p.user)}\n            assistant: ${PanelService.yamlScalar(p.assistant)}`).join("\n") : "";
			return "    - id: custom-first-control-prompt\n      name: '@wm-coders/dsh-custom-first-control-prompt'\n      config:\n" + (sections.length > 0 ? `        sections:\n${secBlock}\n` : "        sections: []\n") + (history.length > 0 ? `        history:\n${hisBlock}\n` : "        history: []\n") + `        includeSubagents: ${includeSubagents ? "true" : "false"}\n`;
		}
		/**
		* Render the targeted (id-keyed, non-insert) profile-layer override for the
		* core row. The bundle layer (this package's `dsh.bundle` patch) inserts the
		* loader rows; a profile-layer `- insert:` of the same id would duplicate it
		* and fail the whole composition, so the panel always writes overrides.
		*/
		static coreOverrideBlock(config) {
			const sections = Array.isArray(config?.sections) ? config.sections : [];
			const history = Array.isArray(config?.history) ? config.history : [];
			const includeSubagents = config?.includeSubagents === true;
			const secBlock = sections.length > 0 ? sections.map((s) => `    - name: ${PanelService.yamlScalar(s.name)}\n      order: ${Number(s.order) || 0}\n      text: ${PanelService.yamlScalar(s.text)}`).join("\n") : "";
			const hisBlock = history.length > 0 ? history.map((p) => `    - user: ${PanelService.yamlScalar(p.user)}\n      assistant: ${PanelService.yamlScalar(p.assistant)}`).join("\n") : "";
			return "- id: custom-first-control-prompt\n  config:\n" + (sections.length > 0 ? `    sections:\n${secBlock}\n` : "    sections: []\n") + (history.length > 0 ? `    history:\n${hisBlock}\n` : "    history: []\n") + `    includeSubagents: ${includeSubagents ? "true" : "false"}\n`;
		}
		static buildPatch(config) {
			return "# Your patch layer for this dsh profile, applied after every bundle layer:\n# a top-level YAML array of loader patch entries (id-targeted config\n# overrides, disables, and insert lists; `!!js` expressions allowed).\n" + PanelService.coreOverrideBlock(config);
		}
		/**
		* Return `existingRaw` with the core `custom-first-control-prompt` row's
		* config replaced by `config`, preserving every other line — comments, other
		* patch entries, and especially the manually-added panel client row
		* (`ui-custom-first-control-prompt`), which older bundles require and which a
		* blanket overwrite dropped silently (losing the UI). When the file has no
		* core row yet, a targeted id-keyed override is appended (never an `- insert:`
		* block: the bundle layer already carries the row, and a duplicate insert
		* fails the composition).
		*/
		static mergeCoreBlock(existingRaw, config) {
			const lines = existingRaw.split(/\r?\n/);
			const coreIdx = lines.findIndex((l) => l.trim() === "- id: custom-first-control-prompt");
			if (coreIdx === -1) {
				if (existingRaw.trim() === "") return PanelService.buildPatch(config);
				if (lines.map((l) => l.trim()).filter((t) => t !== "" && !t.startsWith("#")).every((t) => t === "[]")) {
					const head = existingRaw.split(/\r?\n/).filter((l) => l.trim() === "" || l.trim().startsWith("#")).join("\n").trimEnd();
					return (head.length > 0 ? head + "\n" : "") + PanelService.coreOverrideBlock(config);
				}
				return existingRaw + (existingRaw.endsWith("\n") ? "" : "\n") + PanelService.coreOverrideBlock(config);
			}
			const core = PanelService.coreBlock(config);
			const indent = (lines[coreIdx]?.match(/^\s*/)?.[0] ?? "").length;
			let end = coreIdx + 1;
			while (end < lines.length) {
				const line = lines[end];
				if (line.trim().startsWith("- ") && (line.match(/^\s*/)?.[0] ?? "").length <= indent) break;
				end++;
			}
			return [
				...lines.slice(0, coreIdx),
				core,
				...lines.slice(end)
			].join("\n");
		}
		async readPatch() {
			const path = await this.patchPath();
			if (path === null) return {
				ok: false,
				path: "",
				raw: "",
				parsed: PanelService.parseBlock(""),
				error: "unable to locate the profile patch file (settings.prepareDocument() returned no path)"
			};
			const fs = this.ctx.get("fs");
			if (fs === void 0) return {
				ok: false,
				path,
				raw: "",
				parsed: PanelService.parseBlock(""),
				error: "fs service unavailable"
			};
			try {
				const target = await fs.resolve(path);
				const raw = await fs.readText(target);
				const parsed = PanelService.parseBlock(raw);
				return {
					ok: true,
					path,
					raw,
					parsed: parsed.found || this.effective === void 0 ? parsed : this.effective,
					error: ""
				};
			} catch (error) {
				return {
					ok: false,
					path,
					raw: "",
					parsed: PanelService.parseBlock(""),
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		async writePatch(raw) {
			const path = await this.patchPath();
			if (path === null) return {
				ok: false,
				path: "",
				error: "unable to locate the profile patch file (settings.prepareDocument() returned no path)"
			};
			const fs = this.ctx.get("fs");
			if (fs === void 0) return {
				ok: false,
				path,
				error: "fs service unavailable"
			};
			try {
				const target = await fs.resolve(path);
				await fs.writeText(target, raw, void 0, void 0, this.writePolicy());
				return {
					ok: true,
					path,
					saved: true,
					error: ""
				};
			} catch (error) {
				return {
					ok: false,
					path,
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		/** Read the profile patch entry. */
		configRead(agent) {
			return this.readPatch();
		}
		/** Write the profile patch entry regenerated from the panel's config view. */
		async configWrite(agent, config) {
			const existing = await this.readPatch();
			return this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : "", config));
		}
		/** Clear the configured prompt content, keeping the plugin installed (and any other patch lines). */
		async configClear(agent) {
			const existing = await this.readPatch();
			return this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : "", {
				found: true,
				sections: [],
				history: [],
				includeSubagents: false
			}));
		}
		/** Import a raw patch file text wholesale. */
		configRawImport(agent, raw) {
			if (typeof raw !== "string" || raw.trim() === "") return Promise.resolve({
				ok: false,
				path: "",
				error: "raw content is empty; nothing written"
			});
			return this.writePatch(raw);
		}
		/** Snapshot the captured request ring plus listener state. */
		requestsList(agent) {
			return {
				requests: this.ring.slice(),
				paused: this.paused,
				dockVisible: this.dockVisible,
				injectionEnabled: this.injectionEnabled,
				activeTemplate: this.activeTemplate
			};
		}
		/** Pause or resume request capture. */
		requestsSetPaused(agent, paused) {
			this.paused = paused === true;
			return {
				requests: this.ring.slice(),
				paused: this.paused,
				dockVisible: this.dockVisible,
				injectionEnabled: this.injectionEnabled,
				activeTemplate: this.activeTemplate
			};
		}
		/** Clear the captured request ring. */
		requestsClear(agent) {
			this.ring.length = 0;
			this.seq = 0;
			return {
				requests: [],
				paused: this.paused,
				dockVisible: this.dockVisible,
				injectionEnabled: this.injectionEnabled,
				activeTemplate: this.activeTemplate
			};
		}
		/** Show or hide the composer dock strip. */
		uiSetDockVisible(agent, visible) {
			this.dockVisible = visible === true;
			return {
				requests: this.ring.slice(),
				paused: this.paused,
				dockVisible: this.dockVisible,
				injectionEnabled: this.injectionEnabled,
				activeTemplate: this.activeTemplate
			};
		}
		/** Assemble this plugin's live system-prompt sections for the preview tab. */
		async previewAssemble(agent) {
			const systemPrompt = this.ctx.get("systemPrompt");
			if (systemPrompt === void 0) return {
				sections: [],
				error: "systemPrompt service unavailable"
			};
			try {
				const assembly = await systemPrompt.assemble({});
				return { sections: (Array.isArray(assembly?.sections) ? assembly.sections : []).map((s) => ({
					name: typeof s.name === "string" ? s.name : "",
					text: typeof s.text === "string" ? s.text : "",
					order: typeof s.order === "number" ? s.order : 0
				})).filter((s) => s.name.indexOf("custom-first-control-prompt") === 0) };
			} catch (error) {
				return {
					sections: [],
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		/** Resolve the template file path next to the profile patch file. */
		async templatePath() {
			const base = await this.patchPath();
			if (base === null) return null;
			const norm = base.replace(/\\/g, "/");
			const i = norm.lastIndexOf("/");
			if (i <= 0) return null;
			return `${norm.slice(0, i)}/cfcp-templates.json`;
		}
		/** Read and parse the template file; missing file = empty list (graceful). */
		async readTemplates() {
			const path = await this.templatePath();
			if (path === null) return [];
			const fs = this.ctx.get("fs");
			if (fs === void 0) return [];
			try {
				const target = await fs.resolve(path);
				const raw = await fs.readText(target);
				const parsed = JSON.parse(raw);
				return (Array.isArray(parsed.templates) ? parsed.templates : []).filter((t) => typeof t === "object" && t !== null && typeof t["name"] === "string" && Array.isArray(t["sections"]) && Array.isArray(t["history"]));
			} catch {
				return [];
			}
		}
		/** Write templates to the template file. */
		async writeTemplates(templates) {
			const path = await this.templatePath();
			if (path === null) return false;
			const fs = this.ctx.get("fs");
			if (fs === void 0) return false;
			try {
				const target = await fs.resolve(path);
				await fs.writeText(target, JSON.stringify({ templates }, void 0, 2), void 0, void 0, this.writePolicy());
				return true;
			} catch {
				return false;
			}
		}
		/** List saved templates. */
		async templateList(agent) {
			try {
				return {
					ok: true,
					templates: await this.readTemplates(),
					error: ""
				};
			} catch (error) {
				return {
					ok: false,
					templates: [],
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		/** Save the current config as a named template (overwrites if name exists). */
		async templateSave(agent, name, config) {
			const trimmed = typeof name === "string" ? name.trim() : "";
			if (trimmed.length === 0) return {
				ok: false,
				error: "template name is empty"
			};
			const filtered = (await this.readTemplates()).filter((t) => t.name !== trimmed);
			filtered.push({
				name: trimmed,
				sections: config.sections.map((s) => ({
					name: s.name,
					order: s.order,
					text: s.text,
					enabled: s.enabled
				})),
				history: config.history.map((p) => ({
					user: p.user,
					assistant: p.assistant
				})),
				includeSubagents: config.includeSubagents
			});
			const ok = await this.writeTemplates(filtered);
			return {
				ok,
				error: ok ? "" : "failed to write template file"
			};
		}
		/** Delete a named template. */
		async templateDelete(agent, name) {
			const trimmed = typeof name === "string" ? name.trim() : "";
			const templates = await this.readTemplates();
			const filtered = templates.filter((t) => t.name !== trimmed);
			if (filtered.length === templates.length) return {
				ok: true,
				error: ""
			};
			const ok = await this.writeTemplates(filtered);
			return {
				ok,
				error: ok ? "" : "failed to write template file"
			};
		}
		/** Apply a named template: write its config to the patch file and enable injection. */
		async templateApply(agent, name) {
			const trimmed = typeof name === "string" ? name.trim() : "";
			const found = (await this.readTemplates()).find((t) => t.name === trimmed);
			if (found === void 0) return {
				ok: false,
				path: "",
				error: `template "${trimmed}" not found`
			};
			const config = {
				found: true,
				sections: found.sections,
				history: found.history,
				includeSubagents: found.includeSubagents
			};
			const existing = await this.readPatch();
			const result = await this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : "", config));
			if (result.ok) {
				this.activeTemplate = trimmed;
				this.injectionEnabled = true;
			}
			return result;
		}
		/** Toggle the hot injection switch. */
		injectionToggle(agent, enabled) {
			this.injectionEnabled = enabled === true;
			return {
				requests: this.ring.slice(),
				paused: this.paused,
				dockVisible: this.dockVisible,
				injectionEnabled: this.injectionEnabled,
				activeTemplate: this.activeTemplate
			};
		}
	};
})();
//#endregion
//#region lib/types/index.js
/** Cordis plugin name, also the plugin attribution on the injected messages. */
const name = "custom-first-control-prompt";
/**
* Required services: the system-prompt registry for sections, plus `llm`
* (request redispatch) and `sessions` (subagent-origin filtering) for the
* request-path seed injection.
*/
const inject = [
	"systemPrompt",
	"llm",
	"sessions"
];
/** Cordis config schema; semantic checks beyond the schema run in {@link apply}. */
const Config = z.object({
	sections: z.array(z.object({
		name: z.string().required(),
		order: z.number().required(),
		enabled: z.boolean().default(true),
		text: z.string().required()
	})).default([]),
	history: z.array(z.object({
		user: z.string().required(),
		assistant: z.string().required()
	})),
	includeSubagents: z.boolean().default(false)
});
/**
* Partition configured sections into mountable entries and per-entry problems.
* A blank name, a duplicate name (first wins), a non-finite order, or an empty
* text is reported and skipped: the configuration is deployment-editable, so a
* bad entry must degrade to "not injected", never fail the plugin tree and take
* the whole deployment down with it.
* @param sections - configured section entries.
* @returns the mountable entries and the human-readable problems for the rest.
*/
function partitionSections(sections) {
	const clean = [];
	const problems = [];
	const seen = /* @__PURE__ */ new Set();
	for (const [index, section] of sections.entries()) {
		if (section.name.trim() === "") {
			problems.push(`sections[${index}].name is blank`);
			continue;
		}
		if (seen.has(section.name)) {
			problems.push(`sections[${index}] reuses name "${section.name}" (first entry wins)`);
			continue;
		}
		seen.add(section.name);
		if (!Number.isFinite(section.order)) {
			problems.push(`sections[${index}].order for "${section.name}" is not a finite number`);
			continue;
		}
		if (section.text.length === 0) {
			problems.push(`sections[${index}].text for "${section.name}" is empty`);
			continue;
		}
		clean.push(section);
	}
	return {
		clean,
		problems
	};
}
/**
* Describe why one reference-history pair must be skipped, or no value when the
* pair is usable.
* @param pair - a configured reference exchange.
* @returns the problem description, or no value when the pair is usable.
*/
function pairProblem(pair) {
	for (const [field, text] of [["user", pair.user], ["assistant", pair.assistant]]) {
		if (text.length === 0) return `${field} text is empty`;
		const lower = text.toLowerCase();
		const tag = TRANSCRIPT_RESERVED_TAGS.find((reserved) => lower.includes(reserved));
		if (tag !== void 0) return `${field} text embeds reserved tag "${tag}"`;
	}
}
/**
* Partition configured history pairs into usable pairs and per-pair problems.
* Same degrade-instead-of-fail contract as {@link partitionSections}: an empty
* side or an embedded reserved exchange tag is skipped with a warning, so a
* bad pair never fails the plugin.
* @param pairs - configured reference exchanges.
* @returns the usable pairs and the human-readable problems for the rest.
*/
function partitionPairs(pairs) {
	const clean = [];
	const problems = [];
	for (const [index, pair] of pairs.entries()) {
		const problem = pairProblem(pair);
		if (problem === void 0) clean.push(pair);
		else problems.push(`history[${index}] ${problem}`);
	}
	return {
		clean,
		problems
	};
}
/**
* Register configured sections and install the request-path seed injection:
* a `llm/stream` waterfall listener that clones every ordinary conversation
* request with the prebuilt alternating seed messages prepended and
* redispatches it through `ctx.llm.stream`.
*
* Loop-built requests are deep-frozen and marker-tagged
* (`markAgentLoopRequest`), and the agent-loop invariant fails any marked
* request whose messages differ from `deriveMessages()` — so the original
* request object is never mutated. The clone carries no loop marker, the
* invariant does not apply to it, and the discarded original is a pure
* `deriveMessages()` projection (nothing unrecoverable is dropped). The seed
* messages never enter the session log: real turn numbering is untouched,
* forks stay ordinary copies, and compaction cannot shadow the reference
* history because it is re-injected on every request.
* @param ctx - plugin context.
* @param config - validated plugin configuration.
*/
function apply(ctx, config) {
	new PanelService(ctx, {
		found: false,
		sections: (config.sections ?? []).map((section) => ({
			name: section.name,
			order: section.order,
			text: section.text,
			enabled: section.enabled !== false
		})),
		history: (config.history ?? []).map((pair) => ({
			user: pair.user,
			assistant: pair.assistant
		})),
		includeSubagents: config.includeSubagents === true
	});
	const panel = ctx.get("custom-first-control-prompt-panel");
	const { clean: mountableSections, problems: sectionProblems } = partitionSections(config.sections ?? []);
	for (const problem of sectionProblems) ctx.logger.warn("skipping a configured section: %s", problem);
	for (const section of mountableSections) {
		if (section.enabled === false) continue;
		ctx.effect(() => ctx.systemPrompt.section({
			name: `${name}:${section.name}`,
			order: section.order,
			text: section.text
		}), `${name}.section(${section.name})`);
	}
	const history = config.history;
	if (history === void 0 || history.length === 0) return;
	const { clean: pairs, problems: pairProblems } = partitionPairs(history);
	for (const problem of pairProblems) ctx.logger.warn("skipping a configured reference-history pair: %s", problem);
	if (pairs.length === 0) return;
	const seedMessages = buildSeedMessages(pairs);
	const reentry = /* @__PURE__ */ new WeakSet();
	ctx.on("llm/stream", (options, next) => {
		if (reentry.has(options)) {
			reentry.delete(options);
			return next();
		}
		if (panel !== void 0 && !panel.injectionEnabled) return next();
		if (options.purpose !== void 0) return next();
		const sessionId = options.sessionId;
		if (sessionId === void 0) return next();
		if (config.includeSubagents !== true && ctx.sessions.get(sessionId)?.header.origin === "subagent") return next();
		const cloned = {
			...options,
			messages: [...seedMessages, ...options.messages]
		};
		reentry.add(cloned);
		return ctx.llm.stream(cloned);
	}, { prepend: true });
}
/**
* No default export: the Loader's `unwrapExports` collapses a module with a
* default export onto `exports.default` (`exports.default ?? exports`), which
* would drop the named `Config` schema (and every other named export). Keep
* `name`, `inject`, `Config`, and `apply` as named exports so the full plugin
* object — schema included — survives the load path.
*/
//#endregion
export { Config, SEED_SOURCE, TRANSCRIPT_RESERVED_TAGS, apply, buildSeedMessages, inject, name };
