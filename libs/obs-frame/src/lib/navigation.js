import { Box, IconButton, Typography } from '@mui/material'
import styles from './obs-frame.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export function Navigation({ reference, goNext, goPrev, sx }) {
  return (
    <div className={styles['navigation']}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <IconButton variant={'contained'} onClick={goPrev}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <div className={styles['navigation-reference']}>
          <Typography>
            OBS {reference?.story}:{reference.frame}
          </Typography>
        </div>
        <IconButton variant={'contained'} onClick={goNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </div>
  )
}

export default Navigation
