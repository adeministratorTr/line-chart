import { useState, useMemo } from 'react'
import { Chart } from 'react-charts'
import { useQuery, useMutation } from 'react-query'
import { Button, TextField } from '@material-ui/core'

import Loading from 'components/Loading'
import { getTopStoryList, getStoryItem } from 'services/story'

import './style.scss'

function Home() {
  const [storyLimit, setStoryLimit] = useState(process.env.REACT_APP_DEFAULT_STORY_NUMBER)
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
    for (let i = 0; i < data.length; i++) {
      storyItem.mutate(data[i])
    }
  }

  function addStoryToChart(story) {
    const newChartData = chartData;
    newChartData.push([story.descendants, story.score])
    setChartData(newChartData)
  }

  function handleGetStoriesButtonClick() {
    setChartData([])
    storyList.refetch()
  }

  const data = useMemo(() =>
    [
      {
        label: 'Series 1',
        data: chartData
      },
    ], [chartData]
  )

  const axes = useMemo(() =>
    [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ], []
  )

  const isLoading = storyList.isLoading || storyItem.isLoading

  return (
    <div className='home-page'>
      <div className='user-inputs'>
        <TextField
          label='Number of Story'
          type='number'
          variant='outlined'
          helperText={`Max ${process.env.REACT_APP_MAX_STORY_NUMBER}`}
          value={storyLimit}
          onChange={(e) => setStoryLimit(e.target.value)}
        />
        <Button
          className='limit-button'
          variant='contained'
          color='primary'
          disabled={
            (storyLimit < 1
              || storyLimit > process.env.REACT_APP_MAX_STORY_NUMBER
            )
          }
          onClick={handleGetStoriesButtonClick}
        >
          Show Stories Chart
        </Button>
        {isLoading && <Loading />}
        {!isLoading && chartData.length > 0 &&
          <div className="chart-wrapper">
            <p>Line chart of stories</p>
            <Chart data={data} axes={axes} />
          </div>
        }
      </div>
    </div>
  )
}

export default Home
