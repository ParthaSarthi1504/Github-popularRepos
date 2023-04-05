// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {tabData, clickingLanguageTab, activeTab} = props
  const {id, language} = tabData

  const onClickLanguage = () => {
    clickingLanguageTab(id)
  }

  const specificDesign = activeTab === id ? 'btn-clicked' : ''

  return (
    <li className="li-item1">
      <button
        type="button"
        className={`btn ${specificDesign}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
