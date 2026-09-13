import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await signIn({ email, password })
    setSubmitting(false)
    if (error) {
      setError(translateError(error.message))
      return
    }
    navigate('/')
  }

  return (
    <div className="screen-center">
      <div className="brand-mark">
        <span className="dot" />
        <span className="brand-title">تسجيل الدخول</span>
      </div>
      <p className="subtitle">أدخل بياناتك للمتابعة إلى حسابك.</p>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit}>
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
            placeholder="••••••••"
            autoComplete="current-password"
            dir="ltr"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'جارٍ الدخول...' : 'دخول'}
        </button>
      </form>

      <div className="link-row">
        ليس لديك حساب؟ <Link to="/signup">أنشئ حساباً جديداً</Link>
      </div>
    </div>
  )
}

function translateError(message) {
  if (message.includes('Invalid login credentials')) {
    return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
  }
  if (message.includes('Email not confirmed')) {
    return 'يجب تأكيد بريدك الإلكتروني أولاً. تحقق من صندوق الوارد.'
  }
  return message
}
