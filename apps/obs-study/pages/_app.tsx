import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
} from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to obs-study!</title>
      </Head>
      <main className="app">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: '#0c1b33' }}>
            <Toolbar>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Avatar alt="Open Study App" src="/favicon-96x96.png" />
                </IconButton>
                <p>Open Study App</p>
              </MenuItem>
            </Toolbar>
          </AppBar>
          <Component {...pageProps} />
        </Box>
      </main>
    </>
  )
}

export default CustomApp
