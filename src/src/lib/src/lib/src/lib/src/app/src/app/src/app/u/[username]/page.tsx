'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function SendPage() {
  const { username } = useParams() as { username: string };
  const [body,setBody]=useState(''); 
  const [ok,setOk]=useState(false);

  async function send(e:any){ 
    e.preventDefault();
    const r = await fetch('/api/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username, body})
    });
    setOk(r.ok); 
    if(r.ok) setBody('');
  }

  return (
    <main>
      <h2>Envoyer un message à @{username}</h2>
      <form onSubmit={send}>
        <textarea required maxLength={2000} value={body} onChange={e=>setBody(e.target.value)} rows={6} style={{width:'100%'}} />
        <button type="submit" style={{marginTop:12}}>Envoyer anonymement</button>
      </form>
      {ok && <p>Merci ! Message envoyé ✅</p>}
    </main>
  );
}
