import { useState } from 'react'

export default function Admin(){
  const [authOk, setAuthOk] = useState(false)
  const [pass, setPass] = useState('')
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  async function login(e){
    e.preventDefault()
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password: pass }) })
    const j = await res.json()
    if(res.ok) setAuthOk(true)
    else alert(j?.error || 'login failed')
  }

  function handleFile(e){ setFile(e.target.files?.[0] || null) }

  async function upload(e){
    e.preventDefault();
    if(!file) return alert('Selecciona un archivo')
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async ()=>{
      const base64 = reader.result.split(',')[1]
      const payload = { filename: file.name, content: base64, caption }
      const res = await fetch('/api/upload', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const j = await res.json()
      setUploading(false)
      if(res.ok) alert('Subido OK')
      else alert('Error: ' + JSON.stringify(j))
    }
    reader.readAsDataURL(file)
  }

  if(!authOk){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={login} className="p-6 bg-white rounded shadow max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Admin — Login</h2>
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password admin" className="w-full p-2 border mb-3" />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Panel Admin</h1>
        <form onSubmit={upload} className="bg-white p-4 rounded shadow">
          <label className="block mb-2">Archivo</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          <label className="block mt-4">Caption</label>
          <input value={caption} onChange={e=>setCaption(e.target.value)} className="w-full p-2 border" />
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={uploading}>{uploading ? 'Subiendo...' : 'Subir'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
