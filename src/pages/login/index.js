// ** React Imports
import { useEffect, useState } from 'react'
import styles from './login.module.css'
import { toast } from 'react-toastify'

// ** Next Imports
import Link from 'next/link'
import CryptoJS from 'crypto-js'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { Card, CardContent, CardHeader } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import clorosLogo from '../../assets/claros-4.png'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginAction,
  TokenAction,
  tokenData,
  tokenError,
  tokenIsError,
  tokenIsLoading,
  tokenIsSuccess,
  resetTokenAction,
  loginData,
  loginError,
  loginIsError,
  loginIsLoading,
  loginIsSuccess,
  resetCheckTokenValidtyAction,
  resetLoginAction,
  resetRefreshction
} from 'src/redux/features/authSlice'
import Image from 'next/image'
import { getUserDetailsAction, resetgetUserDetailsAction } from 'src/redux/features/userSlice'
import { parseString } from 'xml2js'
import axios from 'axios'
import { borderBottom } from '@mui/system'
import bg1 from '../../assets/bg1.jpg'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@vuexy.com'
}

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: '40px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
  color: 'black'
})

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const data = useSelector(tokenData)
  const isLoading = useSelector(tokenIsLoading)
  const isLoad = useSelector(loginIsLoading)
  const isError = useSelector(tokenIsError)
  const error = useSelector(tokenError)
  const isSuccess = useSelector(tokenIsSuccess)
  const isSuccessLogin = useSelector(loginIsSuccess)
  const isErrorLogin = useSelector(loginIsError)

  useEffect(() => {
    localStorage.clear()
    dispatch(resetRefreshction())
    dispatch(resetCheckTokenValidtyAction())
    dispatch(resetgetUserDetailsAction())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', data?.access)
      localStorage.setItem('username', username)
      localStorage.setItem('refresh_token', data.refresh)
      dispatch(resetTokenAction())
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      dispatch(loginAction(formData))
    } else if (isError) {
      // console.log(error)
      toast(error, { autoClose: 2000, type: 'error' })
      dispatch(resetTokenAction())
    }

    if (isSuccessLogin) {
      router.push('/jobList')
      dispatch(resetLoginAction())
    } else if (isErrorLogin) {
      toast(error, { autoClose: 2000, type: 'error' })
    }
  }, [dispatch, isSuccess, isError, isErrorLogin, isSuccessLogin])

  function encryptFun(password, username) {
    var keybefore = username + 'appolocomputers'
    var ivbefore = username + 'costacloud012014'
    var key = CryptoJS.enc.Latin1.parse(keybefore.substring(0, 16))
    var iv = CryptoJS.enc.Latin1.parse(ivbefore.substring(0, 16))

    var ciphertext = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString()

    return ciphertext
  }

  const onSubmit = e => {
    e.preventDefault()

    //  console.log('encrypted', encryptFun(password, username))
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    dispatch(TokenAction(formData))
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  const [rssData, setRssData] = useState(null)
  const [isRssLoading, setIsRssLoading] = useState(false)
  const [rssIsSuccess, setRssIsSuccess] = useState(false)
  const [rssIsError, setRssIsError] = useState(false)
  const [rssError, setRssError] = useState('')

  const fetchRSSFeed = async () => {
    try {
      const response = await axios.get('/googlenews/rss')
      const xmlData = response.data
      const jsonData = await parseXML(xmlData)

      return jsonData
    } catch (error) {
      console.error('Error fetching RSS feed:', error)

      return error
    }
  }

  const parseXML = xmlData => {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  const fetchData = async () => {
    setIsRssLoading(true)
    try {
      const data = await fetchRSSFeed()
      console.log(data)
      setRssData(data)
      setRssIsSuccess(true)
      setRssIsError(false)
      setRssError('')
    } catch (error) {
      console.log(error)
      setRssIsError(true)
      setRssError(error?.response?.data?.message)
      setRssIsSuccess(false)
      setRssData([])
    } finally {
      setIsRssLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Image src={clorosLogo} alt='claros-logo' width={70} height={70} />
              </div>
              <div>
                <HeaderTitle style={{ fontSize: '2.5rem', color: 'black' }}>WebTechno</HeaderTitle>
              </div>
            </div>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }} color='black'>
                {`Welcome to WebTechno 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'black' }}>Please sign-in to your account</Typography>
            </Box>
            <form autoComplete='off' onSubmit={onSubmit}>
              <Box sx={{ mb: 0 }}>
                <CustomTextField
                  fullWidth
                  autoFocus
                  required
                  label='Username'
                  sx={{ mb: 3 }}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='enter username'
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <CustomTextField
                  fullWidth
                  value={password}
                  label='Password'
                  placeholder='enter password'
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon
                            color='black'
                            fontSize='1.25rem'
                            icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} disabled={isLoading || isLoad}>
                {isLoading || isLoad ? 'Loading...' : 'Login'}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                <Typography href='/register' component={LinkStyled}>
                  Create an account
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
