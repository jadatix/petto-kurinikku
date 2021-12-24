const Input = ({ forHtml, label, state, callback, holder, props }) => {
  return (
    <>
      <div className="relative mb-4">
        <label htmlFor={forHtml} className="conact-label">{label}</label>
        <input value={state} onChange={e => { callback(e.target.value) }}
          placeholder={holder}
          className="contact-input color-animation color-border" required {...props} />
      </div>
    </>
  )
}

export default Input