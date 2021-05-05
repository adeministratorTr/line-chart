import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { Button, TextField } from '@material-ui/core'

import Loading from 'components/Loading'
import { getTopStoryList, getStoryItem } from 'services/story'

import './style.scss'

function Home() {
  const [storyLimit, setStoryLimit] = useState(process.env.REACT_APP_DEFAULT_CHART_COUNT)
  const [chartData, setChartData] = useState([])

  const storyList = useQuery('getTopStoryList', getTopStoryList, {
    enabled: false,
    onSuccess: (data) => {
      data.length = storyLimit
      mapStories(data)
    }
  })

  const storyItem = useMutation((itemId) => getStoryItem(itemId), {
    onSuccess: (data) => {
      addStoryToChart(data)
    }
  })

  function mapStories(data) {
    data.length = storyLimit
    for (let i = 0; i < data.length; i++) {
      storyItem.mutate(data[i])
    }
  }

  function addStoryToChart(story) {
    const newChartData = chartData;
    newChartData.push([story.descendants, story.score])
    setChartData(newChartData)
  }

  const isLoading = storyList.isLoading || storyItem.isLoading

  return (
    <div className='home-page'>
      <div className='user-inputs'>
        <TextField
          label='Number of Story'
          type='number'
          variant='outlined'
          helperText='Max 50'
          value={storyLimit}
          onChange={(e) => setStoryLimit(e.target.value)}
        />
        <Button
          className='limit-button'
          variant='contained'
          color='primary'
          onClick={() => storyList.refetch()}
        >
          Show Stories Chart
        </Button>
        {isLoading && <Loading />}
      </div>
    </div>
  )
}

export default Home
