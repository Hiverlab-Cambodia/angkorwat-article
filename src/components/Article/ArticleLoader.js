import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid, Card} from '@material-ui/core'

const ArticleLoader = () => {
  return (
    <Grid item xs={12}>
      <Card>
      <Skeleton variant='rect' height={180} animation='wave' />
      <Skeleton variant='text' animation='wave' height={30} />
      <Skeleton variant='text' animation='wave' height={30} />
      </Card>
      </Grid>
  )
}

export default ArticleLoader