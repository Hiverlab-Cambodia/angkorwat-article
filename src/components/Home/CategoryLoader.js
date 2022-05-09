import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid, Card} from '@material-ui/core'

const CategoryLoader = () => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
      <Skeleton variant='rect' height={200}  animation='wave' />
      </Card>
      </Grid>
  )
}

export default CategoryLoader
