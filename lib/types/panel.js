var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
/** Service key: the client reaches these methods as `ctx.remote['custom-first-control-prompt-panel']`. */
export const PANEL_SERVICE_KEY = 'custom-first-control-prompt-panel';
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
            _configRead_decorators = [Remote('config-read')];
            _configWrite_decorators = [Remote('config-write')];
            _configClear_decorators = [Remote('config-clear')];
            _configRawImport_decorators = [Remote('config-raw-import')];
            _requestsList_decorators = [Remote('requests-list')];
            _requestsSetPaused_decorators = [Remote('requests-set-paused')];
            _requestsClear_decorators = [Remote('requests-clear')];
            _uiSetDockVisible_decorators = [Remote('ui-set-dock-visible')];
            _previewAssemble_decorators = [Remote('preview-assemble')];
            _templateList_decorators = [Remote('template-list')];
            _templateSave_decorators = [Remote('template-save')];
            _templateDelete_decorators = [Remote('template-delete')];
            _templateApply_decorators = [Remote('template-apply')];
            _injectionToggle_decorators = [Remote('injection-toggle')];
            __esDecorate(this, null, _configRead_decorators, { kind: "method", name: "configRead", static: false, private: false, access: { has: obj => "configRead" in obj, get: obj => obj.configRead }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _configWrite_decorators, { kind: "method", name: "configWrite", static: false, private: false, access: { has: obj => "configWrite" in obj, get: obj => obj.configWrite }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _configClear_decorators, { kind: "method", name: "configClear", static: false, private: false, access: { has: obj => "configClear" in obj, get: obj => obj.configClear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _configRawImport_decorators, { kind: "method", name: "configRawImport", static: false, private: false, access: { has: obj => "configRawImport" in obj, get: obj => obj.configRawImport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _requestsList_decorators, { kind: "method", name: "requestsList", static: false, private: false, access: { has: obj => "requestsList" in obj, get: obj => obj.requestsList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _requestsSetPaused_decorators, { kind: "method", name: "requestsSetPaused", static: false, private: false, access: { has: obj => "requestsSetPaused" in obj, get: obj => obj.requestsSetPaused }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _requestsClear_decorators, { kind: "method", name: "requestsClear", static: false, private: false, access: { has: obj => "requestsClear" in obj, get: obj => obj.requestsClear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uiSetDockVisible_decorators, { kind: "method", name: "uiSetDockVisible", static: false, private: false, access: { has: obj => "uiSetDockVisible" in obj, get: obj => obj.uiSetDockVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewAssemble_decorators, { kind: "method", name: "previewAssemble", static: false, private: false, access: { has: obj => "previewAssemble" in obj, get: obj => obj.previewAssemble }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _templateList_decorators, { kind: "method", name: "templateList", static: false, private: false, access: { has: obj => "templateList" in obj, get: obj => obj.templateList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _templateSave_decorators, { kind: "method", name: "templateSave", static: false, private: false, access: { has: obj => "templateSave" in obj, get: obj => obj.templateSave }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _templateDelete_decorators, { kind: "method", name: "templateDelete", static: false, private: false, access: { has: obj => "templateDelete" in obj, get: obj => obj.templateDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _templateApply_decorators, { kind: "method", name: "templateApply", static: false, private: false, access: { has: obj => "templateApply" in obj, get: obj => obj.templateApply }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _injectionToggle_decorators, { kind: "method", name: "injectionToggle", static: false, private: false, access: { has: obj => "injectionToggle" in obj, get: obj => obj.injectionToggle }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        ring = (__runInitializers(this, _instanceExtraInitializers), []);
        seq = 0;
        paused = true;
        dockVisible = true;
        /** Hot injection toggle; when false the llm/stream listener passes through. */
        injectionEnabled = true;
        /** Name of the last applied template; empty when none. */
        activeTemplate = '';
        /** Composed plugin config snapshot, shown when the profile patch has no row. */
        effective;
        constructor(ctx, effective) {
            super(ctx, 'custom-first-control-prompt-panel');
            this.effective = effective;
            ctx.on('llm/stream', (options, next) => {
                const stream = next();
                if (!this.paused)
                    this.capture(options);
                return stream;
            });
        }
        // ---- capture ----
        capture(options) {
            try {
                const record = options;
                const entry = {
                    id: ++this.seq,
                    time: Date.now(),
                    model: typeof record['model'] === 'string' ? record['model'] : '',
                    provider: typeof record['provider'] === 'string' ? record['provider'] : '',
                    system: typeof record['system'] === 'string' ? record['system'] : '',
                    purpose: typeof record['purpose'] === 'string' ? record['purpose'] : '',
                    messages: [],
                };
                const msgs = Array.isArray(record['messages']) ? record['messages'] : [];
                entry.messages = msgs.map((msg) => {
                    let text = '';
                    const m = typeof msg === 'object' && msg !== null ? msg : undefined;
                    if (typeof m?.['content'] === 'string')
                        text = m['content'];
                    else if (Array.isArray(m?.['content'])) {
                        text = m['content'].map((block) => {
                            if (typeof block === 'string')
                                return block;
                            const b = typeof block === 'object' && block !== null ? block : undefined;
                            return b?.['type'] === 'text' && typeof b['text'] === 'string' ? b['text'] : '';
                        }).join('');
                    }
                    return { role: typeof m?.['role'] === 'string' ? m['role'] : 'unknown', text };
                });
                this.ring.push(entry);
                if (this.ring.length > 30)
                    this.ring.shift();
            }
            catch (error) {
                this.ctx.logger?.warn('custom-first-control-prompt panel request capture failed: %s', String(error));
            }
        }
        // ---- patch file plumbing ----
        async patchPath() {
            const settings = this.ctx.get('settings');
            if (settings !== undefined) {
                try {
                    const doc = await settings.prepareDocument();
                    if (typeof doc === 'string' && doc.length > 0) {
                        const norm = doc.replace(/\\/g, '/');
                        const i = norm.lastIndexOf('/');
                        if (i > 0)
                            return `${norm.slice(0, i)}/profiles/web/cordis.patch.yml`;
                    }
                }
                catch {
                    // fall through to the explicit failure below
                }
            }
            return null;
        }
        writePolicy() {
            const policy = this.ctx.get('sandboxPolicy');
            try {
                return policy?.resolve({ mode: 'danger-full-access' });
            }
            catch {
                return undefined;
            }
        }
        static yamlUnquote(value) {
            let s = value.trim();
            if (s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"')
                s = s.slice(1, -1);
            else if (s.length >= 2 && s[0] === "'" && s[s.length - 1] === "'")
                s = s.slice(1, -1);
            return s.replace(/\\\\/g, '\u0000').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\u0000/g, '\\');
        }
        static yamlScalar(value) {
            return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n')}"`;
        }
        static parseBlock(raw) {
            const out = { found: false, sections: [], history: [], includeSubagents: false };
            if (raw.indexOf('custom-first-control-prompt') < 0)
                return out;
            out.found = true;
            let zone = '';
            let cur = null;
            for (const line of raw.split(/\r?\n/)) {
                const t = line.trim();
                if (t.indexOf('sections:') === 0) {
                    zone = 'sections';
                    cur = null;
                    continue;
                }
                if (t.indexOf('history:') === 0) {
                    zone = 'history';
                    cur = null;
                    continue;
                }
                if (t.indexOf('includeSubagents:') === 0) {
                    zone = '';
                    cur = null;
                }
                if (zone === 'sections') {
                    if (t.indexOf('- name:') === 0) {
                        cur = { name: PanelService.yamlUnquote(t.slice(t.indexOf(':') + 1)), order: 0, text: '', enabled: true };
                        out.sections.push(cur);
                    }
                    else if (cur !== null && 'name' in cur && t.indexOf('order:') === 0) {
                        cur.order = Number(t.slice(t.indexOf(':') + 1));
                    }
                    else if (cur !== null && 'name' in cur && t.indexOf('text:') === 0) {
                        cur.text = PanelService.yamlUnquote(t.slice(t.indexOf(':') + 1));
                    }
                }
                else if (zone === 'history') {
                    if (t.indexOf('- user:') === 0) {
                        cur = { user: PanelService.yamlUnquote(t.slice(t.indexOf(':') + 1)), assistant: '' };
                        out.history.push(cur);
                    }
                    else if (cur !== null && 'assistant' in cur && t.indexOf('assistant:') === 0) {
                        cur.assistant = PanelService.yamlUnquote(t.slice(t.indexOf(':') + 1));
                    }
                }
                else if (zone === '') {
                    const m = t.match(/^includeSubagents:\s*(true|false)/);
                    if (m)
                        out.includeSubagents = m[1] === 'true';
                }
            }
            return out;
        }
        /** Render just the core `custom-first-control-prompt` loader row (4-space indent block). */
        static coreBlock(config) {
            const sections = Array.isArray(config?.sections) ? config.sections : [];
            const history = Array.isArray(config?.history) ? config.history : [];
            const includeSubagents = config?.includeSubagents === true;
            const secBlock = sections.length > 0
                ? sections.map(s => `          - name: ${PanelService.yamlScalar(s.name)}\n            order: ${Number(s.order) || 0}\n            text: ${PanelService.yamlScalar(s.text)}`).join('\n')
                : '';
            const hisBlock = history.length > 0
                ? history.map(p => `          - user: ${PanelService.yamlScalar(p.user)}\n            assistant: ${PanelService.yamlScalar(p.assistant)}`).join('\n')
                : '';
            return '    - id: custom-first-control-prompt\n'
                + "      name: '@wm-coders/dsh-custom-first-control-prompt'\n"
                + '      config:\n'
                + (sections.length > 0 ? `        sections:\n${secBlock}\n` : '        sections: []\n')
                + (history.length > 0 ? `        history:\n${hisBlock}\n` : '        history: []\n')
                + `        includeSubagents: ${includeSubagents ? 'true' : 'false'}\n`;
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
            const secBlock = sections.length > 0
                ? sections.map(s => `    - name: ${PanelService.yamlScalar(s.name)}\n      order: ${Number(s.order) || 0}\n      text: ${PanelService.yamlScalar(s.text)}`).join('\n')
                : '';
            const hisBlock = history.length > 0
                ? history.map(p => `    - user: ${PanelService.yamlScalar(p.user)}\n      assistant: ${PanelService.yamlScalar(p.assistant)}`).join('\n')
                : '';
            return '- id: custom-first-control-prompt\n'
                + '  config:\n'
                + (sections.length > 0 ? `    sections:\n${secBlock}\n` : '    sections: []\n')
                + (history.length > 0 ? `    history:\n${hisBlock}\n` : '    history: []\n')
                + `    includeSubagents: ${includeSubagents ? 'true' : 'false'}\n`;
        }
        static buildPatch(config) {
            return '# Your patch layer for this dsh profile, applied after every bundle layer:\n'
                + '# a top-level YAML array of loader patch entries (id-targeted config\n'
                + '# overrides, disables, and insert lists; `!!js` expressions allowed).\n'
                + PanelService.coreOverrideBlock(config);
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
            const coreIdx = lines.findIndex(l => l.trim() === '- id: custom-first-control-prompt');
            if (coreIdx === -1) {
                if (existingRaw.trim() === '')
                    return PanelService.buildPatch(config);
                // A comment-only file (optionally with a bare `[]`) carries no entries:
                // rebuild it as comments + the override. Appending after a complete
                // YAML document like `[]` would produce an unparseable file, failing
                // the whole web boot.
                const meaningful = lines.map(l => l.trim()).filter(t => t !== '' && !t.startsWith('#'));
                if (meaningful.every(t => t === '[]')) {
                    const head = existingRaw.split(/\r?\n/)
                        .filter(l => l.trim() === '' || l.trim().startsWith('#'))
                        .join('\n').trimEnd();
                    return (head.length > 0 ? head + '\n' : '') + PanelService.coreOverrideBlock(config);
                }
                const sep = existingRaw.endsWith('\n') ? '' : '\n';
                return existingRaw + sep + PanelService.coreOverrideBlock(config);
            }
            const core = PanelService.coreBlock(config);
            const indent = (lines[coreIdx]?.match(/^\s*/)?.[0] ?? '').length;
            // The core block ends at the next same-or-lower-indent `- ` entry (e.g. a
            // sibling `    - id: ui-custom-first-control-prompt`); that entry is kept.
            let end = coreIdx + 1;
            while (end < lines.length) {
                const line = lines[end];
                const trimmed = line.trim();
                if (trimmed.startsWith('- ') && (line.match(/^\s*/)?.[0] ?? '').length <= indent)
                    break;
                end++;
            }
            return [...lines.slice(0, coreIdx), core, ...lines.slice(end)].join('\n');
        }
        async readPatch() {
            const path = await this.patchPath();
            if (path === null) {
                return { ok: false, path: '', raw: '', parsed: PanelService.parseBlock(''), error: 'unable to locate the profile patch file (settings.prepareDocument() returned no path)' };
            }
            const fs = this.ctx.get('fs');
            if (fs === undefined)
                return { ok: false, path, raw: '', parsed: PanelService.parseBlock(''), error: 'fs service unavailable' };
            try {
                const target = await fs.resolve(path);
                const raw = await fs.readText(target);
                const parsed = PanelService.parseBlock(raw);
                // With the bundle layer carrying the row, the profile patch starts out
                // without one; show the composed config so the editor is not blank.
                return { ok: true, path, raw, parsed: parsed.found || this.effective === undefined ? parsed : this.effective, error: '' };
            }
            catch (error) {
                return { ok: false, path, raw: '', parsed: PanelService.parseBlock(''), error: error instanceof Error ? error.message : String(error) };
            }
        }
        async writePatch(raw) {
            const path = await this.patchPath();
            if (path === null) {
                return { ok: false, path: '', error: 'unable to locate the profile patch file (settings.prepareDocument() returned no path)' };
            }
            const fs = this.ctx.get('fs');
            if (fs === undefined)
                return { ok: false, path, error: 'fs service unavailable' };
            try {
                const target = await fs.resolve(path);
                await fs.writeText(target, raw, undefined, undefined, this.writePolicy());
                return { ok: true, path, saved: true, error: '' };
            }
            catch (error) {
                return { ok: false, path, error: error instanceof Error ? error.message : String(error) };
            }
        }
        // ---- Remote surface (the gateway prepends the live Agent authority) ----
        /** Read the profile patch entry. */
        configRead(agent) {
            void agent;
            return this.readPatch();
        }
        /** Write the profile patch entry regenerated from the panel's config view. */
        async configWrite(agent, config) {
            void agent;
            const existing = await this.readPatch();
            return this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : '', config));
        }
        /** Clear the configured prompt content, keeping the plugin installed (and any other patch lines). */
        async configClear(agent) {
            void agent;
            const existing = await this.readPatch();
            return this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : '', {
                found: true, sections: [], history: [], includeSubagents: false,
            }));
        }
        /** Import a raw patch file text wholesale. */
        configRawImport(agent, raw) {
            void agent;
            if (typeof raw !== 'string' || raw.trim() === '') {
                return Promise.resolve({ ok: false, path: '', error: 'raw content is empty; nothing written' });
            }
            return this.writePatch(raw);
        }
        /** Snapshot the captured request ring plus listener state. */
        requestsList(agent) {
            void agent;
            return { requests: this.ring.slice(), paused: this.paused, dockVisible: this.dockVisible, injectionEnabled: this.injectionEnabled, activeTemplate: this.activeTemplate };
        }
        /** Pause or resume request capture. */
        requestsSetPaused(agent, paused) {
            void agent;
            this.paused = paused === true;
            return { requests: this.ring.slice(), paused: this.paused, dockVisible: this.dockVisible, injectionEnabled: this.injectionEnabled, activeTemplate: this.activeTemplate };
        }
        /** Clear the captured request ring. */
        requestsClear(agent) {
            void agent;
            this.ring.length = 0;
            this.seq = 0;
            return { requests: [], paused: this.paused, dockVisible: this.dockVisible, injectionEnabled: this.injectionEnabled, activeTemplate: this.activeTemplate };
        }
        /** Show or hide the composer dock strip. */
        uiSetDockVisible(agent, visible) {
            void agent;
            this.dockVisible = visible === true;
            return { requests: this.ring.slice(), paused: this.paused, dockVisible: this.dockVisible, injectionEnabled: this.injectionEnabled, activeTemplate: this.activeTemplate };
        }
        /** Assemble this plugin's live system-prompt sections for the preview tab. */
        async previewAssemble(agent) {
            void agent;
            const systemPrompt = this.ctx.get('systemPrompt');
            if (systemPrompt === undefined)
                return { sections: [], error: 'systemPrompt service unavailable' };
            try {
                const assembly = await systemPrompt.assemble({});
                const sections = (Array.isArray(assembly?.sections) ? assembly.sections : [])
                    .map(s => ({
                    name: typeof s.name === 'string' ? s.name : '',
                    text: typeof s.text === 'string' ? s.text : '',
                    order: typeof s.order === 'number' ? s.order : 0,
                }))
                    .filter(s => s.name.indexOf('custom-first-control-prompt') === 0);
                return { sections };
            }
            catch (error) {
                return { sections: [], error: error instanceof Error ? error.message : String(error) };
            }
        }
        // ---- template file ----
        /** Resolve the template file path next to the profile patch file. */
        async templatePath() {
            const base = await this.patchPath();
            if (base === null)
                return null;
            const norm = base.replace(/\\/g, '/');
            const i = norm.lastIndexOf('/');
            if (i <= 0)
                return null;
            return `${norm.slice(0, i)}/cfcp-templates.json`;
        }
        /** Read and parse the template file; missing file = empty list (graceful). */
        async readTemplates() {
            const path = await this.templatePath();
            if (path === null)
                return [];
            const fs = this.ctx.get('fs');
            if (fs === undefined)
                return [];
            try {
                const target = await fs.resolve(path);
                const raw = await fs.readText(target);
                const parsed = JSON.parse(raw);
                const arr = Array.isArray(parsed.templates) ? parsed.templates : [];
                return arr.filter((t) => typeof t === 'object' && t !== null
                    && typeof t['name'] === 'string'
                    && Array.isArray(t['sections'])
                    && Array.isArray(t['history']));
            }
            catch {
                return [];
            }
        }
        /** Write templates to the template file. */
        async writeTemplates(templates) {
            const path = await this.templatePath();
            if (path === null)
                return false;
            const fs = this.ctx.get('fs');
            if (fs === undefined)
                return false;
            try {
                const target = await fs.resolve(path);
                await fs.writeText(target, JSON.stringify({ templates }, undefined, 2), undefined, undefined, this.writePolicy());
                return true;
            }
            catch {
                return false;
            }
        }
        /** List saved templates. */
        async templateList(agent) {
            void agent;
            try {
                const templates = await this.readTemplates();
                return { ok: true, templates, error: '' };
            }
            catch (error) {
                return { ok: false, templates: [], error: error instanceof Error ? error.message : String(error) };
            }
        }
        /** Save the current config as a named template (overwrites if name exists). */
        async templateSave(agent, name, config) {
            void agent;
            const trimmed = typeof name === 'string' ? name.trim() : '';
            if (trimmed.length === 0)
                return { ok: false, error: 'template name is empty' };
            const templates = await this.readTemplates();
            const filtered = templates.filter(t => t.name !== trimmed);
            filtered.push({
                name: trimmed,
                sections: config.sections.map(s => ({ name: s.name, order: s.order, text: s.text, enabled: s.enabled })),
                history: config.history.map(p => ({ user: p.user, assistant: p.assistant })),
                includeSubagents: config.includeSubagents,
            });
            const ok = await this.writeTemplates(filtered);
            return { ok, error: ok ? '' : 'failed to write template file' };
        }
        /** Delete a named template. */
        async templateDelete(agent, name) {
            void agent;
            const trimmed = typeof name === 'string' ? name.trim() : '';
            const templates = await this.readTemplates();
            const filtered = templates.filter(t => t.name !== trimmed);
            if (filtered.length === templates.length)
                return { ok: true, error: '' };
            const ok = await this.writeTemplates(filtered);
            return { ok, error: ok ? '' : 'failed to write template file' };
        }
        /** Apply a named template: write its config to the patch file and enable injection. */
        async templateApply(agent, name) {
            void agent;
            const trimmed = typeof name === 'string' ? name.trim() : '';
            const templates = await this.readTemplates();
            const found = templates.find(t => t.name === trimmed);
            if (found === undefined)
                return { ok: false, path: '', error: `template "${trimmed}" not found` };
            const config = {
                found: true,
                sections: found.sections,
                history: found.history,
                includeSubagents: found.includeSubagents,
            };
            const existing = await this.readPatch();
            const result = await this.writePatch(PanelService.mergeCoreBlock(existing.ok ? existing.raw : '', config));
            if (result.ok) {
                this.activeTemplate = trimmed;
                this.injectionEnabled = true;
            }
            return result;
        }
        /** Toggle the hot injection switch. */
        injectionToggle(agent, enabled) {
            void agent;
            this.injectionEnabled = enabled === true;
            return { requests: this.ring.slice(), paused: this.paused, dockVisible: this.dockVisible, injectionEnabled: this.injectionEnabled, activeTemplate: this.activeTemplate };
        }
    };
})();
export { PanelService };
//# sourceMappingURL=panel.js.map