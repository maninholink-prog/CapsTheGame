const {app,BrowserWindow,protocol,net,Menu,session}=require('electron');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
app.setName('CAPS');
app.setPath('userData',path.join(app.getPath('appData'),'CAPS-Game'));
protocol.registerSchemesAsPrivileged([{scheme:'caps',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
const smoke=process.argv.includes('--caps-smoke');
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
  window=new BrowserWindow({title:'C.A.P.S.',icon:path.join(__dirname,'caps.ico'),width:1440,height:960,minWidth:960,minHeight:700,show:!smoke,backgroundColor:'#0b1419',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
  window.once('ready-to-show',()=>{if(!smoke)window.show();});
  window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  window.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('caps://game/'))event.preventDefault();});
  await window.loadURL('caps://game/index.html');
  if(smoke){
   const text=await window.webContents.executeJavaScript('document.body.innerText');
   const result={ok:text.includes('Sua coleção começa aqui.')||text.includes('SEU PRÓXIMO CAPÍTULO'),title:await window.getTitle(),text};
   require('node:fs').writeFileSync(process.env.CAPS_SMOKE_RESULT||path.join(app.getPath('temp'),'caps-smoke.json'),JSON.stringify(result,null,2));
   app.exit(result.ok?0:1);
  }
 });
 app.on('window-all-closed',()=>app.quit());
}
