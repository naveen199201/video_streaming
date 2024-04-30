import Feed from './Feed';
import { useSelector } from 'react-redux';
const Homepage = () => {
  const videos = useSelector((state) => state.videos.videos);

  return (
    <div>
      <Feed videos={videos} />
    </div>
  )
}

export default Homepage