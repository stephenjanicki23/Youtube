import _ from 'lodash'
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Footer from './components/footer'

const API_KEY = 'AIzaSyB-65WPIYwwJYYd-gU4zYjtI1H2o-oT1Bs';



class App extends Component{
   constructor(props){
     super(props);

     this.state = { 
     	      videos: [],
              selectedVideo: null
      };

     this.videoSearch('surfboards');
   }

   videoSearch(term){
    YTSearch({key: API_KEY, term: term},(videos) => {
        this.setState({
           videos:videos,
           selectedVideo: videos[0]
       });
     });


   }


	render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
 return (
     <div> 
   <SearchBar onSearchTermChange =  {videoSearch} />
   <VideoDetail video={this.state.selectedVideo} />
   <VideoList
    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
    videos={this.state.videos} />
    <Footer />
     </div>
 	);
  }
}

ReactDom.render(<App />,document.querySelector('.container'));