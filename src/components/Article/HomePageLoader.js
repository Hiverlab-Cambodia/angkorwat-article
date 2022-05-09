import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid, Card} from '@material-ui/core'

const HomePageLoader = () => {
  return (
    <Grid item xs={12}>
      <Card style={{backgroundColor: '#1f1f1f'}}>
      <Skeleton variant='rect' height={180} animation='wave' />
     
      <div></div>
      <Skeleton variant='text' animation='wave' height={50} />
      <div></div>
      <Skeleton variant='rect' height={100} animation='wave' />
      <div></div>
      <Skeleton variant='text' animation='wave' height={50} />
      <div style={{padding: "10px" }} >
          {
              Array.from({ length: 6 }, (_, index) => (
                <Skeleton variant='rect' height={140} animation='wave' style={{marginBottom: "10px",borderRadius:"12px"}} />
              ))
          }
      
      </div>

      
      </Card>
      </Grid>
  )
}

export default HomePageLoader