import {it,expect} from 'vitest';
import {createSession} from '../../src/ui/session.js';
import {freshDraft,chooseBlockUnit,chooseDirectTarget,actionCommand} from '../../src/ui/forms.js';
import {render} from '../../src/ui/render.js';
const unit=(id:string)=>({card:{instanceId:id,definitionId:'damian'},attack:3,health:2,maxHealth:4});
function setup(){const session=createSession(42);session.state.phase='actions';session.state.round=1;session.state.priorityOwner='p1';session.state.players.p1.board=[unit('a'),unit('b')];session.state.players.p2.board=[unit('enemy')];return session;}
it('assigns and removes blockers by clicking attackers and defenders, never duplicates a blocker',()=>{
 const s=setup(),d=freshDraft();s.state.combat={attacker:'p2',stage:'blocking',lanes:[{attackerId:'enemy',blockerId:null,blocked:false,weapons:[]}]};
 expect(chooseBlockUnit(s,d,'p2','enemy')).toBe(true);expect(chooseBlockUnit(s,d,'p1','a')).toBe(true);
 expect(actionCommand(s,d)).toMatchObject({type:'block',assignments:[{attackerId:'enemy',blockerId:'a'}]});
 chooseBlockUnit(s,d,'p1','a');expect(d.blocks).toEqual({});
 s.state.players.p1.board[0].stunnedUntilRound=1;expect(chooseBlockUnit(s,d,'p1','a')).toBe(false);
});
it('selects legal spell targets on the board and replaces single targets',()=>{
 const s=setup(),d=freshDraft();s.state.definitions.test={id:'test',name:'Teste',kind:'spell',cost:0,speed:'fast',target:{kind:'unit',side:'ally',min:1,max:1},effect:{type:'heal',amount:1}};
 s.state.players.p1.hand=[{instanceId:'spell',definitionId:'test'}];d.selectedCardId='spell';
 expect(chooseDirectTarget(s,d,{kind:'unit',player:'p2',instanceId:'enemy'})).toBe(false);
 chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'a'});chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'b'});
 expect(d.targetKeys).toEqual(['unit:p1:b']);expect(render(s,d)).not.toContain('data-field="spell-target"');
 expect(render(s,d)).toContain('ATAQUE ATUAL');expect(render(s,d)).toContain('VIDA ATUAL');
});
it('handles multi-target spells, Nexus targets and equipment by direct selection',()=>{
 const s=setup(),d=freshDraft();s.state.definitions.test={id:'test',kind:'spell',cost:0,speed:'fast',target:{kind:'character',side:'ally',min:1,max:2},effect:{type:'armor',amount:2}};
 s.state.players.p1.hand=[{instanceId:'spell',definitionId:'test'}];d.selectedCardId='spell';
 chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'a'});chooseDirectTarget(s,d,{kind:'nexus',player:'p1'});
 chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'b'});expect(d.targetKeys).toHaveLength(2);
 expect(render(s,d)).toContain('data-action="field-nexus"');
 chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'a'});expect(d.targetKeys).toEqual(['nexus:p1']);
 s.state.players.p1.hand=[{instanceId:'weapon',definitionId:'sword-kylast'}];d.selectedCardId='weapon';
 chooseDirectTarget(s,d,{kind:'unit',player:'p1',instanceId:'b'});expect(d.targetId).toBe('b');expect(actionCommand(s,d)).toMatchObject({targets:[{kind:'unit',player:'p1',instanceId:'b'}]});
});
it('moves a blocker between lanes and ignores direct input on AI turns',()=>{
 const s=setup(),d=freshDraft();s.state.players.p2.board.push(unit('enemy2'));
 s.state.combat={attacker:'p2',stage:'blocking',lanes:['enemy','enemy2'].map(attackerId=>({attackerId,blockerId:null,blocked:false,weapons:[]}))};
 chooseBlockUnit(s,d,'p2','enemy');chooseBlockUnit(s,d,'p1','a');chooseBlockUnit(s,d,'p2','enemy2');chooseBlockUnit(s,d,'p1','a');
 expect(d.blocks).toEqual({enemy2:'a'});
 s.opponentMode='ai';s.state.priorityOwner='p2';expect(chooseBlockUnit(s,d,'p2','enemy')).toBe(false);
});
