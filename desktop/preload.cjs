const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('capsSaves',{
 list:()=>ipcRenderer.invoke('caps-saves:list'),
 read:id=>ipcRenderer.invoke('caps-saves:read',id),
 write:(id,raw)=>ipcRenderer.invoke('caps-saves:write',id,raw)
});
