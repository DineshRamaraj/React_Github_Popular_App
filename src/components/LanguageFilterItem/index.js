// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachDetails, isActive, onClickChangeContent} = props
  const {id, language} = eachDetails

  const langHeading = isActive
    ? 'language-button lang-border-color'
    : 'language-button'

  const onClickLanguageButton = () => {
    onClickChangeContent(id)
  }

  return (
    <li className="language-each-item">
      <button
        type="button"
        className={langHeading}
        onClick={onClickLanguageButton}
      >
        <p className="language-item-heading">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
