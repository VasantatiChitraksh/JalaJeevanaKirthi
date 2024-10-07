
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import StoryGen from './ML/story_gen.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoryGen/>
  </StrictMode>,
)
