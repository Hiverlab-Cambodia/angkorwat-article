import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid, Card} from '@material-ui/core'

const ArticlePageLoader = () => {
  return (
    <Grid item xs={12}>
      <Card style={{backgroundColor: '#1f1f1f'}}>
      <Skeleton variant='rect' height={221} animation='wave' />
     
      <div></div>
    
      <div style={{padding: "10px" }}>
      <Skeleton variant='text' animation='wave' height={50} />
      <div style={{marginBottom:"10px"}}>
      <Skeleton variant='text' animation='wave' height={20} width={200} />
      </div>
      
  
          {
              Array.from({ length: 10 }, (_, index) => (
                <Skeleton variant='text' height={10} animation='wave' style={{marginBottom: "10px",borderRadius:"0"}} />
              ))
          }
      
      </div>

      <div style={{padding: "10px" }}>
      <Skeleton variant='text' animation='wave' height={50} />
      <div style={{marginBottom:"10px"}}>
      <Skeleton variant='text' animation='wave' height={20} width={200} />
      </div>
      
  
          {
              Array.from({ length: 10 }, (_, index) => (
                <Skeleton variant='text' height={10} animation='wave' style={{marginBottom: "10px",borderRadius:"0"}} />
              ))
          }
      
      </div>

      

      
      </Card>
      </Grid>
  )
}

export default ArticlePageLoader