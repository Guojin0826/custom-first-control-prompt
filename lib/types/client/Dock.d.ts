/**
 * Composer dock strip: a collapsible bar above the message input showing the
 * panel's live request-listening state, template selector, and injection
 * hot-toggle. All state arrives from the Host panel service.
 */
import type { ReactNode } from 'react';
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { PanelActions } from './actions.ts';
export interface DockProps extends PropsLocale<'cfcp.panel'> {
    /** The session this dock strip belongs to. */
    sessionId: SessionId;
    /** Bound panel verbs. */
    actions: PanelActions;
}
/**
 * Render the dock strip. Hidden state (Host-side `dockVisible` false) renders
 * nothing; the strip comes back through the settings section.
 * @param props - composed slot props.
 */
export declare function Dock(props: DockProps): ReactNode;
//# sourceMappingURL=Dock.d.ts.map