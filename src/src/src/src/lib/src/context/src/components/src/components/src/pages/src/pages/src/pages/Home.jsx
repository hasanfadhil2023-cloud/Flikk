import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { profile } = useAuth()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    loadVideos()
  }, [])

  async function loadVideos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('videos')
      .select('id, caption, views_count, likes_count, comments_count, created_at, profiles(username, avatar_url)')
      .eq('visibility', 'public')
      .eq('is_hidden', false)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      setErrorMsg(error.message)
    } else {
      setVideos(data ?? [])
    }
    setLoading(false)
  }

  return (
    <div className="screen">
      <div className="brand-mark">
        <span className="dot" />
        <span className="brand-title">مرحباً {profile?.display_name || profile?.username || ''}</span>
      </div>
      <p className="subtitle">هذه نسخة أولية من الفيد — سيتم استبدالها بمشغل فيديو كامل الشاشة.</p>

      {errorMsg && <div className="error-box">{errorMsg}</div>}

      {loading && <div className="center-loader">جارٍ التحميل...</div>}

      {!loading && videos.length === 0 && !errorMsg && (
        <div className="center-loader" style={{ flexDirection: 'column', gap: 8 }}>
          <span>لا توجد فيديوهات بعد.</span>
          <span style={{ fontSize: 13 }}>كن أول من ينشر فيديو!</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {videos.map((v) => (
          <div
            key={v.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 16
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>@{v.profiles?.username}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 10 }}>
              {v.caption || 'بدون وصف'}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
              <span>👁 {v.views_count}</span>
              <span>♥ {v.likes_count}</span>
              <span>💬 {v.comments_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
