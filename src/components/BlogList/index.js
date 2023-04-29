// Write your JS code here
import Loader from 'react-loader-spinner'

import {Component} from 'react'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      topic: eachItem.topic,
      title: eachItem.title,
    }))

    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(item => <BlogItem key={item.id} blogData={item} />)
        )}
      </div>
    )
  }
}

export default BlogList
