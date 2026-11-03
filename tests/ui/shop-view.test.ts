import {it,expect} from 'vitest';
import {renderRun} from '../../src/ui/run-view.js';
import {createMapRun} from '../../src/run/adventure.js';
import {openShop} from '../../src/run/shops.js';
it('shop renders currency, fixed offers, prices, services and exit, without reroll',()=>{let r=createMapRun(2);r.stage='shop';r.map!.current='merge-event';r.coins=75;r=openShop(r);const html=renderRun(r);expect(html).toContain('Korakacoins');expect(html).toContain('Loja padrão');expect(html).toContain('Comprar');expect(html).toContain('data-action="shop-leave"');expect(html).not.toContain('Reroll');expect(html).toContain('40 Korakacoins');});
it('generic events hidden on map but shop types visible',()=>{const html=renderRun(createMapRun(2));expect(html).toContain('Loja padrão');expect(html).toContain('Loja especializada');expect(html).toContain('Evento desconhecido');expect(html).not.toContain('Visitar Resgate');expect(html).not.toContain('Visitar Descanso');});
