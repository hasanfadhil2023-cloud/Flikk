import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!USERNAME_REGEX.test(username)) {
      setError('اسم المستخدم يجب أن يكون بالإنجليزية الصغيرة والأرقام فقط (3-20 حرفاً).')
      return
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل.')
      return
    }

    setSubmitting(true)
    const { data, error } = await signUp({ email, password, username, displayName })
    setSubmitting(false)

    if (error) {
      setError(translateError(error.message))
      return
    }

    if (data?.session) {
      navigate('/')
    } else {
      setNeedsConfirmation(true)
    }
  }

  if (needsConfirmation) {
    return (
      <div className="screen-center">
        <div className="brand-mark">
          <span className="dot" />
          <span className="brand-title">تحقق من بريدك</span>
        </div>
        <p className="subtitle">
          أرسلنا رابط تأكيد إلى بريدك الإلكتروني. افتح الرسالة واضغط على الرابط لتفعيل حسابك،
          ثم عد وسجّل دخولك.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ textAlign: 'center' }}>
          الذهاب لتسجيل الدخول
        </Link>
      </div>
    )
  }

  return (
    <div className="screen-center">
      <div className="brand-mark">
        <span className="dot" />
        <span className="brand-title">إنشاء حساب</span>
      </div>
      <p className="subtitle">انضم الآن وابدأ بمشاركة فيديوهاتك.</p>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="displayName">الاسم</label>
          <input
            id="displayName"
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="اسمك الكامل"
          />
        </div>
        <div className="field">
          <label htmlFor="username">اسم المستخدم</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            placeholder="username"
            dir="ltr"
          />
        </div>
        <div className="field">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
            dir="ltr"
          />
        </div>
        <div className="field">
          <label htmlFor="password">كلمة المرور</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6 أحرف على الأقل"
            autoComplete="new-password"
            dir="ltr"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'جارٍ الإنشاء...' : 'إنشاء الحساب'}
        </button>
      </form>

      <div className="link-row">
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </div>
    </div>
  )
}

function translateError(message) {
  if (message.includes('already registered')) {
    return 'هذا البريد الإلكتروني مسجل بالفعل.'
  }
  if (message.includes('duplicate key value') || message.includes('username')) {
    return 'اسم المستخدم هذا مستخدم بالفعل، جرّب اسماً آخر.'
  }
  return message
}
