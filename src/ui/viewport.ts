const pages = new Map<string,number>();
const tabs = new Map<string,number>();

export function fitViewport(root:HTMLElement):void {
 root.style.zoom='1';
 const width=window.innerWidth;
 const height=window.innerHeight;
 const scale=Math.min(1,width/Math.max(width,root.scrollWidth),height/Math.max(height,root.scrollHeight));
 root.style.zoom=String(Math.floor(scale*1000)/1000);
}

function button(label:string):HTMLButtonElement {
 const node=document.createElement('button');
 node.type='button';
 node.className='button';
 node.textContent=label;
 return node;
}

export function prepareViewport(root:HTMLElement,screen:string):void {
 const panels=[...root.querySelectorAll<HTMLElement>('[data-view-panel]')];
 if(panels.length>1){
  const nav=document.createElement('nav');
  nav.className='viewport-controls';
  nav.setAttribute('aria-label','Seções do perfil');
  const buttons=panels.map(panel=>button(panel.dataset.viewPanel!));
  const select=(index:number)=>{
   tabs.set(screen,index);
   panels.forEach((panel,i)=>{panel.hidden=i!==index;buttons[i].setAttribute('aria-pressed',String(i===index));});
   fitViewport(root);
  };
  buttons.forEach((node,i)=>{node.onclick=()=>select(i);nav.append(node);});
  panels[0].before(nav);
  select(tabs.get(screen)??0);
 }
 const lists=[
  ['.collection-grid',5,'Itens'],
  ['.ledger tbody',8,'Registros'],
  ['.history-list',5,'Eventos'],
  ['.deck-list ul',8,'Cartas do deck'],
  ['.discard-group',5,'Cartas descartadas'],
 ] as const;
 for(const [selector,size,label] of lists){
  root.querySelectorAll<HTMLElement>(selector).forEach((list,index)=>{
   const items=[...list.children].filter((node):node is HTMLElement=>node instanceof HTMLElement&&node.matches('article,tr,li,button'));
   if(items.length<=size)return;
   const key=screen+selector+index;
   const count=Math.ceil(items.length/size);
   const nav=document.createElement('div');
   nav.className='viewport-controls';
   nav.setAttribute('role','group');
   nav.setAttribute('aria-label',label);
   const previous=button('Anterior'),next=button('Próxima'),status=document.createElement('span');
   status.setAttribute('aria-live','polite');
   let current=Math.min(pages.get(key)??0,count-1);
   const show=(page:number)=>{
    current=page;pages.set(key,page);
    items.forEach((item,i)=>{item.hidden=Math.floor(i/size)!==page;});
    previous.disabled=page===0;next.disabled=page===count-1;
    status.textContent=`${label} · ${page+1}/${count}`;
    fitViewport(root);
   };
   previous.onclick=()=>show(current-1);
   next.onclick=()=>show(current+1);
   nav.append(previous,status,next);
   (list.closest('table')??list).after(nav);
   show(current);
  });
 }
 fitViewport(root);
}
