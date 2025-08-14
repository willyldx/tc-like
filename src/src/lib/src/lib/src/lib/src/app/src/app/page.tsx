'use client';
import { useState } from 'react';

export default function Home() {
  const [username,setU]=useState(''); 
  const [password,setP]=useState('');

  async function register(e:any){ 
    e.preventDefault(); 
    const r = await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    if(r.ok){ alert('Compte créé. Connectez-vous.'); }
    else { const j=await r.json().catch(()=>({})); alert('Erreur: '+(j?.error||r.status)); }
  }

  async function login(e:any){ 
    e.preventDefault(); 
    const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})}); 
    if(r.ok) location.href='/inbox'; else alert('Échec connexion');
  }

  return (
    <main>
      <h1>Anon Q&A</h1>
      <p>Créez un lien public pour recevoir des messages anonymes :</p>
      <code>{typeof window!=='undefined' ? location.origin : ''}/u/&lt;username&gt;</code>

      <form onSubmit={register} style={{marginTop:24}}>
        <h3>Inscription</h3>
        <input placeholder="username" value={username} onChange={e=>setU(e.target.value)} required />
        <input placeholder="password" type="password" value={password} onChange={e=>setP(e.target.value)} required />
        <button type="submit">Créer</button>
      </form>

      <form onSubmit={login} style={{marginTop:24}}>
        <h3>Connexion</h3>
        <input placeholder="username" value={username} onChange={e=>setU(e.target.value)} required />
        <input placeholder="password" type="password" value={password} onChange={e=>setP(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}
