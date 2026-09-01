import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Composer dock strip: a collapsible bar above the message input showing the
 * panel's live request-listening state, template selector, and injection
 * hot-toggle. All state arrives from the Host panel service.
 */
import { useEffect, useState } from 'react';
import { useRequestsPoll } from "./poll.js";
import css from './panel.module.css';
/** One captured request body: system prompt then the message list. */
function RequestBody(props) {
    const { request, t } = props;
    return (_jsxs("div", { className: css['requestBody'], children: [_jsxs("div", { className: css['requestMeta'], children: [_jsxs("span", { children: [t('requestModel'), ": ", request.model || '—'] }), _jsxs("span", { children: [t('requestProvider'), ": ", request.provider || '—'] }), _jsxs("span", { children: [t('requestTime'), ": ", new Date(request.time).toLocaleTimeString()] })] }), request.system.length > 0
                ? (_jsxs(_Fragment, { children: [_jsx("div", { className: css['blockLabel'], children: t('requestSystem') }), _jsx("pre", { className: css['mono'], children: request.system })] }))
                : null, request.messages.length > 0
                ? (_jsxs(_Fragment, { children: [_jsx("div", { className: css['blockLabel'], children: t('requestMessages') }), request.messages.map((message, at) => (_jsxs("pre", { className: css['mono'], children: [_jsx("span", { className: css['role'], children: message.role }), ' ', message.text] }, at)))] }))
                : null] }));
}
/**
 * Render the dock strip. Hidden state (Host-side `dockVisible` false) renders
 * nothing; the strip comes back through the settings section.
 * @param props - composed slot props.
 */
export function Dock(props) {
    const { sessionId, actions, t } = props;
    const [expanded, setExpanded] = useState(false);
    const { view, error, refresh } = useRequestsPoll(actions, sessionId);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [busy, setBusy] = useState(false);
    // Fetch template list on mount.
    useEffect(() => {
        void actions.listTemplates(sessionId).then(result => {
            if (result.ok && result.value.ok) {
                setTemplates(result.value.templates);
            }
        });
    }, [actions, sessionId]);
    if (view !== undefined && !view.dockVisible)
        return null;
    const paused = view?.paused ?? true;
    const injectionEnabled = view?.injectionEnabled ?? true;
    const activeTemplate = view?.activeTemplate ?? '';
    const requests = view?.requests ?? [];
    const latest = requests[requests.length - 1];
    const run = (promise) => {
        setBusy(true);
        void promise.then(() => {
            setBusy(false);
            refresh();
        }).catch(() => { setBusy(false); });
    };
    const refreshTemplates = () => {
        void actions.listTemplates(sessionId).then(result => {
            if (result.ok && result.value.ok) {
                setTemplates(result.value.templates);
            }
        });
    };
    const handleInject = () => {
        if (selectedTemplate.length === 0)
            return;
        run(actions.applyTemplate(sessionId, selectedTemplate).then(() => { refreshTemplates(); }));
    };
    const handleToggleInjection = () => {
        run(actions.toggleInjection(sessionId, !injectionEnabled));
    };
    return (_jsxs("div", { className: css['dock'], children: [_jsxs("div", { className: css['dockHeader'], children: [_jsxs("button", { type: "button", className: css['dockTitle'], onClick: () => { setExpanded(value => !value); }, "aria-expanded": expanded, title: expanded ? t('collapse') : t('expand'), children: [_jsx("span", { children: t('dockLabel') }), _jsx("span", { className: css['count'], title: "build version marker", children: "v0.3.0" }), _jsx("span", { className: paused ? css['badgeOff'] : css['badgeOn'], children: paused ? t('listeningOff') : t('listeningOn') }), _jsxs("span", { className: css['count'], children: [requests.length, " ", t('requests')] })] }), _jsxs("div", { className: css['dockButtons'], children: [_jsxs("select", { className: css['templateSelect'], value: selectedTemplate, onChange: e => { setSelectedTemplate(e.target.value); }, disabled: busy, title: t('templateSelect'), children: [_jsx("option", { value: "", children: t('templateNone') }), templates.map(tpl => (_jsxs("option", { value: tpl.name, children: [tpl.name === activeTemplate ? '★ ' : '', tpl.name] }, tpl.name)))] }), _jsx("button", { type: "button", className: css['injectBtn'], onClick: handleInject, disabled: busy || selectedTemplate.length === 0, title: t('inject'), children: t('inject') }), _jsx("button", { type: "button", className: injectionEnabled ? css['badgeOn'] : css['badgeOff'], onClick: handleToggleInjection, disabled: busy, title: injectionEnabled ? t('injectionOn') : t('injectionOff'), children: injectionEnabled ? t('injectionOn') : t('injectionOff') }), _jsx("button", { type: "button", onClick: () => { run(actions.setPaused(sessionId, !paused)); }, children: paused ? t('start') : t('stop') }), _jsx("button", { type: "button", onClick: () => { run(actions.clearRequests(sessionId)); }, children: t('clear') }), _jsx("button", { type: "button", onClick: () => { run(actions.setDockVisible(sessionId, false)); }, children: t('dockHide') })] })] }), expanded
                ? (_jsxs("div", { className: css['dockBody'], children: [error !== undefined ? _jsx("div", { className: css['error'], children: error }) : null, requests.length === 0
                            ? _jsx("div", { className: css['hint'], children: t('emptyRequests') })
                            : (_jsx("div", { className: css['requestList'], children: requests.map(request => (_jsxs("details", { className: css['requestItem'], open: request === latest, children: [_jsxs("summary", { children: [_jsxs("span", { children: ["#", request.id] }), _jsxs("span", { children: [request.purpose.length > 0 ? `[${request.purpose}] ` : '', request.model || '?', " \u00B7 ", request.messages.length, " ", t('requestMessages')] }), _jsx("span", { children: new Date(request.time).toLocaleTimeString() })] }), _jsx(RequestBody, { request: request, t: t })] }, request.id))) }))] }))
                : null] }));
}
//# sourceMappingURL=Dock.js.map