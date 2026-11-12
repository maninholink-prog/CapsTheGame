const {app,BrowserWindow,protocol,net,Menu,session,ipcMain}=require('electron');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {createSaveStore}=require('./save-store.cjs');
const {resolveSmokeUserData,waitForSmokeText}=require('./smoke.cjs');
const smoke=process.argv.includes('--caps-smoke');
app.setName('CAPS');
app.setPath('userData',resolveSmokeUserData(app.getPath('appData'),smoke,process.env.CAPS_SMOKE_USER_DATA));
const saves=createSaveStore(app.getPath('userData'));
ipcMain.handle('caps-saves:list',()=>saves.list());
ipcMain.handle('caps-saves:read',(_event,id)=>saves.read(id));
ipcMain.handle('caps-saves:write',(_event,id,raw)=>{if(typeof raw!=='string'||raw.length>50_000_000)throw Error('Save inválido.');return saves.write(id,raw);});
protocol.registerSchemesAsPrivileged([{scheme:'caps',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
if(!app.requestSingleInstanceLock())app.quit();
else {
 let window;
 app.on('second-instance',()=>{if(window){window.show();window.restore();window.focus();}});
 app.whenReady().then(async()=>{
  const root=path.join(__dirname,'dist');
  protocol.handle('caps',request=>{
   const url=new URL(request.url);
   if(url.hostname!=='game')return new Response('Not found',{status:404});
   let file;
   try{file=path.resolve(root,'.'+decodeURIComponent(url.pathname));}catch{return new Response('Bad path',{status:400});}
   if(!file.startsWith(root+path.sep))return new Response('Forbidden',{status:403});
   return net.fetch(pathToFileURL(file).href);
  });
  session.defaultSession.setPermissionRequestHandler((contents,permission,done)=>{
   done(permission==='fullscreen'&&contents===window?.webContents&&contents.getURL().startsWith('caps://game/'));
  });
  Menu.setApplicationMenu(null);
  window=new BrowserWindow({title:'C.A.P.S.',icon:path.join(__dirname,'caps.ico'),width:1440,height:960,minWidth:960,minHeight:700,show:!smoke,backgroundColor:'#0b1419',webPreferences:{preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,contextIsolation:true,sandbox:true}});
  window.once('ready-to-show',()=>{if(!smoke)window.show();});
  window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  window.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('caps://game/'))event.preventDefault();});
  await window.loadURL('caps://game/index.html');
  if(smoke){
   const text=await waitForSmokeText(()=>window.webContents.executeJavaScript('document.body.innerText'));
   const result={ok:text.includes('Sua coleção começa aqui.')||text.includes('SEU PRÓXIMO CAPÍTULO'),title:await window.getTitle(),userData:app.getPath('userData'),text};
   require('node:fs').writeFileSync(process.env.CAPS_SMOKE_RESULT||path.join(app.getPath('temp'),'caps-smoke.json'),JSON.stringify(result,null,2));
   app.exit(result.ok?0:1);
  }
 });
 app.on('window-all-closed',()=>app.quit());
}
