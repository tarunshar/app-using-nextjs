import React from 'react'
import Card from '@mui/material/Card'
import { Checkbox, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { getStringFromHtml } from 'src/pages/StringHelper'
import { green, grey } from '@mui/material/colors'

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1
}

const imageUrls = [
  'https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=64&q=75',
  'https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-5.png&w=64&q=75',
  'https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-2.png&w=64&q=75',
  'https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-4.png&w=64&q=75',
  'https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-7.png&w=64&q=75'
]

const getRandomIndex = () => Math.floor(Math.random() * imageUrls.length)
const ListItem = props => {
  const { item, thumbnailUrls } = props

  return (
    <Card
      sx={{
        p: 5,
        mb: 4,
        cursor: 'pointer'
      }}
      className='item-hover'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box
          sx={{
            pr: { xs: 0, sm: 4 },
            mb: { xs: 3, sm: 0 },
            maxWidth: '100%',
            textAlign: 'center',
            width: { sm: '8rem', xl: '10rem' }
          }}
        >
          <Box
            sx={{
              mb: 2,
              textAlign: 'center',
              maxHeight: 140,
              minHeight: 140,
              position: 'relative',
              '& img': {
                maxHeight: '100%',
                maxWidth: '100%'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            >
              <img src={imageUrls[getRandomIndex()]} alt='job' />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(100% - 8rem)',
              xl: 'calc(100% - 10rem)'
            },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              mt: -4
            }}
          >
            <Box
              component='h3'
              sx={{
                // fontWeight: Fonts.BOLD,
                fontSize: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 'calc(100% - 40px)'
              }}
            >
              {/* {item.title} */}
              {item.job_title}
            </Box>

            <Box
              component='span'
              sx={{
                ml: 'auto',
                display: 'block',
                textAlign: 'right',
                '& .MuiCheckbox-root': {
                  padding: 3
                }
              }}
            >
              {/* <Checkbox */}
              {item.subscribed ? (
                <>
                  <Tooltip title='SUBSCRIBED'>
                    <DoneAllIcon size='xs' style={{ color: '#0d72bf' }} />
                  </Tooltip>
                </>
              ) : (
                ''
              )}
              {/* /> */}
            </Box>
          </Box>

          <Box
            component='p'
            sx={{
              color: 'text.secondary',
              mb: 5,
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {getStringFromHtml(item.job_des) || 'no content'}
          </Box>

          <Box
            sx={{
              mb: { xs: 3, xl: 5 },
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: { xs: 12, xl: 14 }
            }}
          >
            <Box
              sx={{
                mr: { xs: 2, xl: 4 },
                mb: 1,
                pr: { xs: 2, xl: 4 },
                borderRight: 1,
                borderColor: grey[200]
              }}
            >
              <Box
                component='span'
                sx={{
                  color: 'text.secondary',

                  textTransform: 'uppercase'
                }}
              ></Box>
              <Box
                component='span'
                sx={{
                  ml: 2
                }}
              >
                {item.job_type || 'no content'}
              </Box>
            </Box>
            <Box
              sx={{
                mr: { xs: 2, xl: 4 },
                mb: 1,
                pr: { xs: 2, xl: 4 },
                color: 'text.secondary',
                borderRight: 1,
                borderColor: 'primary.main'
              }}
            >
              <Box component='span'>{item.location || 'no content'}</Box>
            </Box>
            <Box
              sx={{
                mb: 1,

                color: green[600]
              }}
            >
              {item.exp_required || 'no'} experience
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ListItem

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  thumbnailUrls: PropTypes.object
}
