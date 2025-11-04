const fs = require('fs-extra')
const path = require('path')
const mime = require('mime')
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
const BUCKET = process.env.SUPABASE_BUCKET || 'photos'

if(!SUPABASE_URL || !SUPABASE_KEY){
  console.error('Define SUPABASE_URL and SUPABASE_SERVICE_KEY in environment')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function uploadFile(fullPath){
  const stat = await fs.stat(fullPath)
  if(!stat.isFile()) return
  const ext = path.extname(fullPath).toLowerCase()
  if(!['.jpg','.jpeg','.png','.webp'].includes(ext)) return
  const fileName = path.basename(fullPath)
  const dest = `uploads/${Date.now()}-${fileName}`
  console.log('Uploading', fileName, '->', dest)
  const buffer = await fs.readFile(fullPath)
  const contentType = mime.getType(fullPath) || 'application/octet-stream'
  const { data, error } = await supabase.storage.from(BUCKET).upload(dest, buffer, { contentType })
  if(error){
    console.error('Upload error', error)
    return
  }
  const insert = await supabase.from('photos').insert([{ filename: fileName, storage_path: data.path, source: 'facebook-import' }])
  if(insert.error) console.error('DB insert error', insert.error)
  else console.log('Inserted record for', fileName)
}

async function run(){
  const folder = path.resolve(__dirname, '..', 'material', 'Facebook_files')
  if(!await fs.pathExists(folder)){
    console.error('Folder not found:', folder)
    process.exit(1)
  }
  const files = await fs.readdir(folder)
  for(const f of files){
    await uploadFile(path.join(folder, f))
  }
  console.log('Done')
}

run().catch(err=>{ console.error(err); process.exit(1) })
