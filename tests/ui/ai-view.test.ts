import { describe, expect, it } from 'vitest';
import { createSession, dispatchHuman } from '../../src/ui/session.js';
import { render } from '../../src/ui/render.js';
import { freshDraft, actionCommand } from '../../src/ui/forms.js';

describe('interface contra IA', () => {
  it('não renderiza nomes ou IDs da mão adversária nem oferece seu botão de inspeção', () => {
    const session = createSession(131, 'ai');
    session.viewPlayer = 'p2'; // Even an inconsistent presentation selection cannot expose that hand.
    const html = render(session, freshDraft());
    expect(html).toContain('Mão do Jogador 1');
    expect(html).not.toContain('data-action="view" data-player="p2"');
    for (const card of session.state.players.p2.hand) expect(html).not.toContain(`data-id="${card.instanceId}"`);
    expect(html).not.toContain('Ybew, custo');
  });

  it('durante mulligan automático só oferece informação, sem ação humana de J2', () => {
    const session = dispatchHuman(createSession(131, 'ai'), { type: 'mulligan', player: 'p1', instanceIds: [] });
    const html = render(session, freshDraft());
    expect(html).toContain('A IA está pensando');
    expect(html).not.toContain('data-action="confirm"');
    expect(html).not.toContain('data-action="pass"');
    expect(actionCommand(session, freshDraft())).toBeNull();
  });
});
