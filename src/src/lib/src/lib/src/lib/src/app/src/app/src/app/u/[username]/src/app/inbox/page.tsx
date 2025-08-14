'use client';
import { useEffect, useState } from 'react';

type Msg = { id:number; body:string; createdAt:string; ipHash?:string|null; userAgent?:string|null; };

export default function Inbox() {
  const [messages,setMessages]=useState<Msg[]>([]);

  useEffect(()=>{ 
    (async()=>{
      const r = await fetch('/api/inbox'); 
      if(!r.ok){ location.href='/'; return; }
      const j = await r.json(); 
      setMessages(j.messages);
    })(); 
  },[]);

  return (
    <main>
      <h2>Votre Inbox</h2>
      <p>Votre lien public : <code>{typeof window!=='undefined' ? `${location.origin}/u/${extractUser()}` : ''}</code></p>
      <button onClick={()=>fetch('/api/logout',{method:'POST'}).then(()=>location.href='/')}>Se déconnecter</button>
      <ul style={{marginTop:16,padding:0,listStyle:'none'}}>
        {messages.map(m=>(
          <li key={m.id} style={{padding:'12px 16px',border:'1px solid #ddd',borderRadius:8,marginBottom:12}}>
            <div style={{fontSize:12,opacity:.7}}>{new Date(m.createdAt).toLocaleString()}</div>
            <p style={{whiteSpace:'pre-wrap'}}>{m.body}</p>
            <div style={{fontSize:11,opacity:.5}}>ip:{m.ipHash} · ua:{m.userAgent}</div>
          </li>
        ))}
      </ul>
    </main>
  );

  function extractUser(){
    try{
      const t = document.cookie.split('; ').find(x=>x.startsWith('ngl_sess='))?.split('=')[1];
      if(!t) return 'me';
      const p = JSON.parse(atob(t.split('.')[1]));
      return p.username;
    }catch{return 'me';}
  }
}
