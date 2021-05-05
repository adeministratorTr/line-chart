import { Button, TextField } from '@material-ui/core'

import './style.scss'

function Home() {
  return (
    <div className='home-page'>
      <div className='user-inputs'>
        <TextField
          className='limit-input'
          label='Number of Story'
          type='number'
          variant='outlined'
          helperText='Max 50'
        />
        <Button
          className='limit-button'
          variant='contained'
          color='primary'
        >
          Show Stories Chart
        </Button>
      </div>
    </div>
  )
}

export default Home
