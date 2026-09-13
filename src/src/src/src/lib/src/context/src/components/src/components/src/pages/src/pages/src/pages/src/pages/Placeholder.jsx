export default function Placeholder({ title }) {
  return (
    <div className="screen">
      <div className="brand-mark">
        <span className="dot" />
        <span className="brand-title">{title}</span>
      </div>
      <p className="subtitle">هذه الشاشة قيد الإنشاء وسيتم بناؤها في المرحلة القادمة.</p>
    </div>
  )
}
