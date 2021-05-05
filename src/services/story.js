const getApiUrl = () =>
  `${process.env.REACT_APP_CHART_API_URL}/${process.env.REACT_APP_CHART_API_VERSION}`

export const getTopStoryList = () =>
  fetch(`${getApiUrl()}/topstories.json`)
    .then((resp) => resp.json())
    .then((result) => result)
