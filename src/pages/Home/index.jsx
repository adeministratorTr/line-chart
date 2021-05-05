import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button, TextField } from '@material-ui/core'

import { getTopStoryList } from 'services/story'

import './style.scss'

function Home() {
  const [storyLimit, setStoryLimit] = useState(process.env.REACT_APP_DEFAULT_CHART_COUNT)

  const storyList = useQuery('getTopStoryList', getTopStoryList, {
    enabled: false,
    onSuccess: (data) => {
      data.length = storyLimit
      console.log(data) // TODO map story data
    }
  })

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
      </div>
    </div>
  )
}

export default Home
